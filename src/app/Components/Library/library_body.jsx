import React from "react";
import "../library/library_body.scss";
import Bookshelf from "./bookshelf/bookshelf.jsx";
import LibraryTop from "./library_top/library_top.jsx";

const LibraryBody = () => {
    return (
        <div className="mainContent">
            <LibraryTop />

            <div className="bottom flex">
                <Bookshelf />
            </div>
        </div>
    );
};

export default LibraryBody;
