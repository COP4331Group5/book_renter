import React from "react";
import styles from "./listing.module.scss";
import Image from "next/image";

import CoverBtn from "@components/input/cover_btn/cover_btn";
import SeeAllBtn from "@components/input/see_all_btn/see_all_btn";

import sql from "@/lib/sql";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";
import { tryPromise } from "@/lib/fp";

// Imported images
import img4 from "@public/assets/classics/img5.jpg";
import img5 from "@public/assets/classics/img5.jpg";
import img6 from "@public/assets/classics/img5.jpg";

export default async function Listing() {
    const cookieStore = cookies();
    const sessionResult = await getSession(cookieStore);

    if (sessionResult.isErr) {
        return <></>;
    }

    const session = sessionResult.unwrap();

    const getRentalsResult = (
        await tryPromise(
            sql`SELECT b.id, b.title FROM rentals AS r JOIN books AS b ON b.id = r.book_id WHERE r.user_id = ${session.userId} AND r.expry > NOW() LIMIT 5`
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
        <div className="basis-full">
            <div className="flex items-center justify-between">
                <h1>My Library</h1>
                <SeeAllBtn href="/library" />
            </div>

            <div id={styles.library}>{rentals}</div>
        </div>
    );
}
