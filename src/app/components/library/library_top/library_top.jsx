import { cookies } from "next/headers";
import React from "react";

const LibraryTop = () => {
    const cookieStore = cookies();

    let displayName = cookieStore.get("display_name");

    return (
        <div className="flex items-center justify-between">
            <h1 className="text-4xl">
                {displayName.value}'s Novel Nest Library
            </h1>
        </div>
    );
};

export default LibraryTop;
