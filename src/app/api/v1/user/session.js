import postgres from "postgres";
import { tryPromise, Result } from "@/lib/fp";

/**
 * Generates a new session for a user.
 * @param {postgres.Sql | postgres.TransactionSql} sql
 * @param {number} userId
 * @returns {Promise<Result<string, Error>>}
 */
export async function createSession(sql, userId) {
    return (
        await tryPromise(
            sql`INSERT INTO sessions (user_id) VALUES (${userId}) RETURNING id`
        )
    ).map((rows) => rows[0].id);
}

/**
 * Generates cookie headers for new sessions.
 * @param {string} sessionToken
 * @param {string} displayName
 * @param {string} emailAddress
 * @returns {Headers}
 */
export function createSessionCookies(sessionToken, displayName, emailAddress) {
    let headers = new Headers();
    // TODO: add max age to cookies.

    // Session token, which is used to authenticate requests.
    headers.append(
        "SET-COOKIE",
        `session=${sessionToken};path=/;samesite=strict;httponly`
    );
    // Allows the client to know that the session cookie is set.
    headers.append("SET-COOKIE", `session_exists=;path=/;samesite=strict`);
    // Display name, which can be used by SSR to populate name fields.
    headers.append(
        "SET-COOKIE",
        `display_name=${displayName};path=/;samesite=strict`
    );
    // Email address, which can be used by SSR to populate email fields.
    headers.append(
        "SET-COOKIE",
        `email_address=${emailAddress};path=/;samesite=strict`
    );

    return headers;
}
