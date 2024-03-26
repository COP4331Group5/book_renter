"use client";

import { useEffect, useState } from "react";
import bookData from "./book_data";
import BookCard from "./book_card";

export default function StoreBody() {
    const [allbooks, setAllBooks] = useState(true);
    const [fiction, setFiction] = useState(true);
    const [nonfiction, setNonFiction] = useState(true);
    const [bseller, setBSeller] = useState(true);

    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        let filtered = bookData.filter(book => {
            if (allbooks) {
                return true;
            } else {
                if (fiction && book.book_type === "Fiction") return true;
                if (nonfiction && book.book_type === "Nonfiction") return true;
                if (bseller && book.bestseller) return true;

                return false;
            }
        });

        setFilteredBooks(filtered);
    }, [allbooks, fiction, nonfiction, bseller]);

    return (
        <div className="flex flex-row h-full w-full max-w-6xl mx-auto overflow-y-auto">
            <div className="flex flex-col flex-shrink-0 w-[200px] h-fit my-2 ml-2 p-2 rounded-md bg-gray-800">
                <h2>Filters</h2>
                <div className="flex flex-row gap-2">
                    <input type="checkbox" name="allbooks" onChange={(e) => setAllBooks(e.target.checked)} defaultChecked />
                    <p>All Books</p>
                </div>
                <div className="flex flex-row gap-2">
                    <input type="checkbox" name="fiction" onChange={(e) => setFiction(e.target.checked)} disabled={allbooks} defaultChecked />
                    <p>Fiction</p>
                </div>
                <div className="flex flex-row gap-2">
                    <input type="checkbox" name="nonfiction" onChange={(e) => setNonFiction(e.target.checked)} disabled={allbooks} defaultChecked />
                    <p>Non-Fiction</p>
                </div>
                <div className="flex flex-row gap-2">
                    <input type="checkbox" name="bseller" onChange={(e) => setBSeller(e.target.checked)} disabled={allbooks} defaultChecked />
                    <p>Best Sellers</p>
                </div>
            </div>
            <div className="flex flex-row flex-wrap overflow-auto">
                {
                    filteredBooks.map((book, i) => <BookCard key={i} data={book} />)
                }
            </div>
        </div>
    );
}
