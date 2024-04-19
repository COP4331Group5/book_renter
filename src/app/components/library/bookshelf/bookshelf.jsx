"use server";
import { tryPromise } from "@/lib/fp";
import "./bookshelf.scss";

import CoverBtn from "@components/input/cover_btn/cover_btn";
import sql from "@/lib/sql";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";

export default async function Bookshelf() {
    const cookieStore = cookies();
    const sessionResult = await getSession(cookieStore);

    if (sessionResult.isErr) {
        return <></>;
    }

    const session = sessionResult.unwrap();

    const getRentalsResult = (
        await tryPromise(
            sql`SELECT b.id, b.title FROM rentals AS r JOIN books AS b ON b.id = r.book_id WHERE r.user_id = ${session.userId} AND r.expry > NOW()`
        )
    ).map((rows) => {
        return rows.map((row, i) => (
            <CoverBtn
                key={i}
                name={row.title}
                img="https://placehold.co/400x600"
                href={`/read/${row.id}`}
            />
        ));
    });

    if (getRentalsResult.isErr) {
        console.error(getRentalsResult.unwrapErr());
        return <></>;
    }

    const rentals = getRentalsResult.unwrap();

    return (
        <div>
            <div className="basis-full">
                <div className="section">{rentals}</div>
            </div>
        </div>
    );
}
