import { ajv, email_regex } from "@/lib/validate";
import { Ok, Err, tryPromise } from "@/lib/fp";
import sql from "@/lib/sql";
import argon2 from "argon2";

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
 * - `TransactionFailed`: For some reason, it was not possible to do a transaction.
 * - `UserCreationFailed`: For some reason, the user could not be created.
 * @param {Request} request
 * @returns {Response}
 */
export async function POST(request) {
    let json = await tryPromise(request.json());
    return await json.match({
        Ok: async (form) => {
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

            if (!email_regex.test(form.email)) {
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
            let check_result = await tryPromise(
                sql`SELECT COUNT(1) FROM users WHERE email = ${form.email}`
            );

            if (check_result.is_err) {
                return Response.json(
                    {
                        error: "CheckFailed",
                        message: "was not able to check if a user exists"
                    },
                    { status: 500 }
                );
            }

            if (check_result.unwrap()[0].count == 1) {
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

            if (passhash.is_err) {
                console.log(passhash.unwrap_err());
                return Response.json(
                    {
                        error: "PasshashFailed",
                        message: "could not hash password"
                    },
                    { status: 500 }
                );
            }

            // TODO: send confirmation email to make sure the email exists.

            const session_result = (
                await tryPromise(
                    sql.begin(async (sql) => {
                        let user = {
                            email: form.email,
                            display: form.display,
                            passhash: passhash.unwrap()
                        };

                        let create_user_result = await tryPromise(
                            sql`INSERT INTO users ${sql(
                                user,
                                "email",
                                "display",
                                "passhash"
                            )} RETURNING id`
                        );

                        if (create_user_result.is_err) {
                            console.log(create_user_result.unwrap_err());
                            return Err(
                                Response.json(
                                    {
                                        error: "UserCreationFailed",
                                        message: "could not create user"
                                    },
                                    { status: 500 }
                                )
                            );
                        }

                        let session = {
                            user_id: create_user_result.unwrap()[0].id
                        };

                        let create_session_result = await tryPromise(
                            sql`INSERT INTO sessions ${sql(
                                session,
                                "user_id"
                            )} RETURNING id`
                        );

                        if (create_session_result.is_err) {
                            console.log(create_session_result.unwrap_err());
                            return Err(
                                Response.json(
                                    {
                                        error: "SessionCreationFailed",
                                        message: "could not create session"
                                    },
                                    { status: 500 }
                                )
                            );
                        }

                        return Ok(create_session_result.unwrap()[0].id);
                    })
                )
            )
                .map_err((err) => {
                    console.log(err);
                    return Response.json(
                        {
                            error: "TransactionFailed",
                            message: "could not complete transaction"
                        },
                        { status: 500 }
                    );
                })
                .flatten();

            if (session_result.is_err) {
                return session_result.unwrap_err();
            }

            // Create the cookie headers.
            let headers = new Headers();

            // TODO: add max age to cookies.

            // This one is the session token, which is used to authenticate requests.
            headers.append(
                "SET-COOKIE",
                `session=${session_result.unwrap()};path=/;samesite=strict;httponly`
            );
            // This one allows the client to know that the cookie is set.
            headers.append(
                "SET-COOKIE",
                `session_exists=;path=/;samesite=strict`
            );

            return new Response(null, { status: 200, headers });
        },
        Err: async (err) => {
            console.log(err);
            return Response.json(
                {
                    error: "InvalidJSON",
                    message: "invalid JSON"
                },
                { status: 400 }
            );
        }
    });
}
