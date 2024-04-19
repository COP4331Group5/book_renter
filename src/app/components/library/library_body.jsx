import React from "react";
import Bookshelf from "./bookshelf/bookshelf.jsx";
import LibraryTop from "./library_top/library_top.jsx";
import { cookies } from "next/headers.js";
import { isNothing } from "@/lib/fp";

export default function LibraryBody() {
    const cookieStore = cookies();
    let sessionExists = cookieStore.get("session_exists");

    if (isNothing(sessionExists)) {
        redirect("/login");
    }

    return (
        <div className="h-full w-10/12 overflow-auto p-8">
            <LibraryTop />

            <div className="mt-8 flex items-start gap-8">
                <Bookshelf />
            </div>
        </div>
    );
}
