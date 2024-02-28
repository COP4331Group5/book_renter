import React from "react";
import Bookshelf from "./bookshelf/bookshelf.jsx";
import LibraryTop from "./library_top/library_top.jsx";

export default function LibraryBody() {
    return (
        <div className="h-full w-10/12 overflow-auto p-8">
            <LibraryTop />

            <div className="mt-8 flex items-start gap-8">
                <Bookshelf />
            </div>
        </div>
    );
}
