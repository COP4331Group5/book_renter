import StoreBody from "../components/store/store_body";
import sql from "@/lib/sql";
import { tryPromise } from "@/lib/fp";

export const metadata = {
    title: "Novel Nest - Store"
};

export default async function Store() {
    const fetchBooksResult = await tryPromise(
        sql`SELECT * FROM books WHERE pdf_status = 'completed' LIMIT 10 OFFSET 0`
    );

    if (fetchBooksResult.isErr) {
        throw new Error("could not fetch books");
    }
    const books = fetchBooksResult.unwrap();

    return (
        <div className="container flex-col">
            <StoreBody books={books} />
        </div>
    );
}
