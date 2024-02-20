import React from "react";
import "../Library/libraryBody.css";
import Bookshelf from "./Bookshelf/Bookshelf.jsx";
import LibraryTop from "./LibraryTop/LibraryTop.jsx";

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
