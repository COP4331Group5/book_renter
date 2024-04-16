"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminBody from "../components/admin/admin_body";
import { Maybe, tryPromise } from "@/lib/fp";
import sql from "@/lib/sql";

export default async function Admin() {
    const cookieStore = cookies();

    /** @type {Maybe<RequestCookie>} */
    const sessionToken = new Maybe(cookieStore.get("session"));

    if (sessionToken.isNone) {
        redirect("/login");
    }

    const session = sessionToken.map((x) => x.value).unwrap();

    let selectSessionResult = (
        await tryPromise(
            sql`SELECT user_id FROM sessions WHERE id = ${session}`
        )
    ).map((rows) => rows[0].user_id);

    if (selectSessionResult.isErr) {
        redirect("/login");
    }

    let selectUserResult = (
        await tryPromise(
            sql`SELECT is_admin FROM users WHERE id = ${selectSessionResult.unwrap()}`
        )
    ).map((rows) => rows[0].is_admin);

    if (selectUserResult.isErr || !selectUserResult.unwrap()) {
        redirect("/login");
    }

    return (
        <div className="container">
            <AdminBody />
        </div>
    );
}
