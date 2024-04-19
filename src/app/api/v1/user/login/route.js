import { ajv, emailRegex } from "@/lib/validate";
import sql from "@/lib/sql";
import { tryPromise } from "@/lib/fp";
import argon2 from "argon2";
import { createSession, createSessionCookies } from "../session";

/** @type {(x: any) => boolean} */
const validate = ajv.compile({
    properties: {
        email: { type: "string" },
        password: { type: "string" }
    }
});

const badCredentials = Response.json(
    {
        error: "IncorrectEmailOrPassword",
        message: "either the username or password were wrong"
    },
    { status: 401 }
);

/**
 * Login a user.
 *
 * Success Response:
 * - Cookies `session` and `session_exists`
 *
 * Error Responses:
 * - `InvalidJSON`: The request payload was not valid JSON.
 * - `ValidationError`: The request payload was the wrong shape.
 * - `InvalidEmail`: Invalid `email` field.
 * - `CheckFailed`: Could not check if the user already exists.
 * - `VerificationFailed`: Could not check if the credentials are correct.
 * - `IncorrectEmailOrPassword`: The credentials were incorrect.
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

    if (form.password.length < 8) {
        return badCredentials.clone();
    }

    // Get the password hash.
    let userResult = await tryPromise(
        sql`SELECT id, display, passhash FROM users WHERE email = ${form.email}`
    );

    if (userResult.isErr) {
        console.log(userResult.unwrapErr());
        return Response.json(
            {
                error: "CheckFailed",
                message: "unable to check if user exists"
            },
            { status: 500 }
        );
    }

    let user = userResult
        .ok()
        .filter((rows) => rows.length == 1)
        .map((rows) => {
            return {
                userId: rows[0].id,
                display: rows[0].display,
                passhash: rows[0].passhash
            };
        });

    if (user.isNone) {
        return badCredentials.clone();
    }

    let { userId, display, passhash } = user.unwrap();

    // Verify the password.
    let verifyResult = await tryPromise(argon2.verify(passhash, form.password));

    if (verifyResult.isErr) {
        console.log(verifyResult.unwrapErr());
        return Response.json(
            {
                error: "VerificationFailed",
                message: "unable to verify the credentials"
            },
            { status: 500 }
        );
    }

    if (!verifyResult.unwrap()) {
        return badCredentials.clone();
    }

    // Create a new session.
    let createSessionResult = await createSession(sql, userId);

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
        display,
        form.email
    );

    return new Response(null, { status: 200, headers });
}
