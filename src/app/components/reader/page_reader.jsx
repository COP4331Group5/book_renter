"use client";
import React, { useRef, useState } from "react";
import "./page_reader.scss";
import dynamic from "next/dynamic";
import { isSomething } from "@/lib/fp";

const BookPage = dynamic(() => import("./book_page"), { ssr: false });

export default function PageReader({ bookId, numPages, sliceCounts }) {
    //const PageReader = ({ pages }) => {
    const [currentPage, setCurrentPage] = useState(0);

    class PageCache {
        #cache;

        constructor() {
            this.#cache = {};
        }

        load(page) {
            if (this.cache(page)) {
                this.cache(page + 1);
                this.cache(page + 2);
                return this.#cache[page];
            }
            return Promise.resolve();
        }

        cache(page) {
            if (page < 0 || page >= numPages) {
                return false;
            }

            if (isSomething(this.#cache[page])) {
                return true;
            }

            let requests = [];
            for (let i = 0; i < sliceCounts[page]; i++) {
                let req = fetch(
                    `/api/v1/reader/get_slice?book=${bookId}&page=${page}&slice=${i}`
                )
                    .then((response) => response.blob())
                    .then((blob) => URL.createObjectURL(blob));

                requests.push(req);
            }

            this.#cache[page] = Promise.all(requests);
            return true;
        }
    }

    const cache = useRef(new PageCache());

    const nextPage = () => {
        if (currentPage < numPages - 1) {
            console.log(`next: ${currentPage + 1}`);
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            console.log(`prev: ${currentPage - 1}`);
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="page-reader">
            <div className="pages-container">
                <BookPage cache={cache} pageId={currentPage} />
            </div>
            <div className="navigation">
                <button onClick={prevPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage >= numPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
