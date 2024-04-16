"use client";
import React, { useState } from "react";
import "./page_reader.scss";

export default function PageReader({ bookId, pages }) {
    //const PageReader = ({ pages }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderPage = (pageIndex) => (
        <div key={pageIndex}>
            <img src={pages[pageIndex]} alt={`Page ${pageIndex + 1}`} />
        </div>
    );

    return (
        <div className="page-reader">
            <div className="pages-container">
                {currentPage > 0 && (
                    <img
                        src={pages[currentPage - 1]}
                        alt={`Page ${currentPage}`}
                        className="page"
                    />
                )}
                {currentPage < pages.length && (
                    <img
                        src={pages[currentPage]}
                        alt={`Page ${currentPage + 1}`}
                        className="page"
                    />
                )}
            </div>
            <div className="navigation">
                <button onClick={prevPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage >= pages.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

//export default PageReader();
