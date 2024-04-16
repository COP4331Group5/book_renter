import { Maybe, Result, Ok, Err, tryPromise } from "@/lib/fp";
import sql from "@/lib/sql";

/**
 * @typedef {Object} Session
 * @property {Number} id
 * @property {Number} userId
 * @property {Date} created
 */

/**
 * Get the session from a cookie.
 * @param {import("next/dist/server/web/spec-extension/adapters/request-cookies").ReadonlyRequestCookies} cookies
 * @returns {Promise<Result<Session, Response>>}
 */
export async function getSession(cookies) {
    /** @type {Maybe<RequestCookie>} */
    const sessionToken = new Maybe(cookies.get("session"));

    if (sessionToken.isNone) {
        return Err(
            Response.json(
                {
                    error: "MissingSessionToken",
                    message: "the request headers didn't have session token"
                },
                { status: 401 }
            )
        );
    }

    const session = sessionToken.map((x) => x.value).unwrap();

    let selectUserResult = (
        await tryPromise(sql`SELECT * FROM sessions WHERE id = ${session}`)
    )
        .mapFilter((rows) => {
            if (rows.length < 1) {
                return Err(
                    Response.json(
                        {
                            error: "InvalidSessionToken",
                            message: "the session token doesn't exist"
                        },
                        { status: 401 }
                    )
                );
            }

            return Ok({
                id: rows[0].id,
                userId: rows[0].user_id,
                created: rows[0].created
            });
        })
        .mapErr((_) => {
            return Response.json(
                {
                    error: "InvalidSessionToken",
                    message: "the session token doesn't exist"
                },
                { status: 401 }
            );
        });

    return selectUserResult;
}
