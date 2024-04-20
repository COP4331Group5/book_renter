import { None, Some, tryPromise } from "@/lib/fp";
import sql from "@/lib/sql";
import SubscribeBody from "@components/subscribe/subscribe_body";
import { redirect } from "next/navigation";

export default async function Store({ searchParams }) {
    const bookId = parseInt(searchParams.book);

    if (isNaN(bookId)) {
        redirect("/store");
    }

    const bookResult = (
        await tryPromise(
            sql`SELECT title, author FROM books WHERE id = ${bookId}`
        )
    )
        .ok()
        .mapFilter((rows) => {
            if (rows.length < 1) {
                return None;
            }

            return Some([rows[0].title, rows[0].author]);
        });

    if (bookResult.isNone) {
        redirect("/store");
    }

    const [title, author] = bookResult.unwrap();

    return <SubscribeBody title={title} author={author} bookId={bookId} />;
}
