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
