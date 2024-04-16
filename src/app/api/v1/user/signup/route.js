import { ajv, emailRegex } from "@/lib/validate";
import { tryPromise } from "@/lib/fp";
import sql from "@/lib/sql";
import argon2 from "argon2";
import { createSession, createSessionCookies } from "../session";

/** @type {(x: any) => boolean} */
const validate = ajv.compile({
    properties: {
        display: { type: "string" },
        email: { type: "string" },
        password: { type: "string" }
    }
});

/**
 * Signup a user.
 *
 * Success Response:
 * - Cookies `session` and `session_exists`
 *
 * Error Responses:
 * - `InvalidJSON`: The request payload was not valid JSON.
 * - `ValidationError`: The request payload was the wrong shape.
 * - `InvalidEmail`: Invalid `email` field.
 * - `DisplayTooLong`: `display` field is too long.
 * - `PasswordTooShort`: `password` field is too short.
 * - `CheckFailed`: Could not check if the user already exists.
 * - `UserAlreadyExists`: A user with the provided email already exists.
 * - `PasshashFailed`: For some reason, the password could not be hashed.
 * - `UserCreationFailed`: For some reason, the user could not be created.
 * - `SessionCreationFailed`: For some reason, the session could not be created.
 *
 * @param {Request} request
 * @returns {Response}
 */
export async function POST(request) {
    let json = await tryPromise(request.json());

    if (json.isErr) {
        console.log(json.unwrapErr());
        return Response.json(
            {
                error: "InvalidJSON",
                message: "invalid JSON"
            },
            { status: 400 }
        );
    }

    let form = json.unwrap();

    // Validate JSON form (shape, email, size).
    if (!validate(form)) {
        return Response.json(
            {
                error: "ValidationError",
                message: validate.errors[0].message
            },
            { status: 400 }
        );
    }

    if (!emailRegex.test(form.email)) {
        return Response.json(
            {
                error: "InvalidEmail",
                message: "email is invalid"
            },
            { status: 400 }
        );
    }

    if (form.display.length > 80) {
        return Response.json(
            {
                error: "DisplayTooLong",
                message: "display name exceeds 80 characters"
            },
            { status: 400 }
        );
    }

    if (form.password.length < 8) {
        return Response.json(
            {
                error: "PasswordTooShort",
                message: "password is less than 8 characters"
            },
            { status: 400 }
        );
    }

    // Check to see if there is already a user with that email.
    let checkResult = await tryPromise(
        sql`SELECT COUNT(1) FROM users WHERE email = ${form.email}`
    );

    if (checkResult.isErr) {
        return Response.json(
            {
                error: "CheckFailed",
                message: "was not able to check if a user exists"
            },
            { status: 500 }
        );
    }

    if (checkResult.unwrap()[0].count == 1) {
        return Response.json(
            {
                error: "UserAlreadyExists",
                message: "a user with the provided email already exists"
            },
            { status: 409 }
        );
    }

    // Generate the hash (argon2 automatically generates salt).
    let passhash = await tryPromise(argon2.hash(form.password));

    if (passhash.isErr) {
        console.log(passhash.unwrapErr());
        return Response.json(
            {
                error: "PasshashFailed",
                message: "could not hash password"
            },
            { status: 500 }
        );
    }

    // TODO: send confirmation email to make sure the email exists.

    let user = {
        email: form.email,
        display: form.display,
        passhash: passhash.unwrap(),
        "is_admin": false
    };

    let createUserResult = (
        await tryPromise(
            sql`INSERT INTO users ${sql(
                user,
                "email",
                "display",
                "passhash",
                "is_admin"
            )} RETURNING id`
        )
    ).map((rows) => rows[0].id);

    if (createUserResult.isErr) {
        console.log(createUserResult.unwrapErr());
        return Response.json(
            {
                error: "UserCreationFailed",
                message: "could not create user"
            },
            { status: 500 }
        );
    }

    // Create a new session.
    let createSessionResult = await createSession(
        sql,
        createUserResult.unwrap()
    );

    if (createSessionResult.isErr) {
        console.log(createSessionResult.unwrapErr());
        return Response.json(
            {
                error: "SessionCreationFailed",
                message: "could not create session"
            },
            { status: 500 }
        );
    }

    // Create the cookie headers.
    let headers = createSessionCookies(
        createSessionResult.unwrap(),
        form.display,
        form.email
    );

    return new Response(null, { status: 200, headers });
}
