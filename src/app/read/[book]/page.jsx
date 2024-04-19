import { Maybe, None, Some, tryPromise } from "@/lib/fp";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import PageReader from "../../components/reader/page_reader";
import "../../components/reader/page_reader.scss";
import sql from "@/lib/sql";
import { getSession } from "@/lib/auth";

export const metadata = {
    title: "Novel Nest - Reader"
};

export default async function Reader({ params }) {
    const cookieStore = cookies();
    const sessionResult = await getSession(cookieStore);

    let bookId = parseInt(params.book, 10);

    if (isNaN(bookId)) {
        console.log("Not a number.");
        redirect("/dashboard");
    }

    if (sessionResult.isErr) {
        redirect(`/login?read=${bookId}`);
    }

    const session = sessionResult.unwrap();

    const rentalResult = (
        await tryPromise(
            sql`SELECT rental_length, created FROM rentals WHERE user_id = ${session.userId} AND book_id = ${bookId}`
        )
    ).map((rows) => {
        if (rows.length < 1) {
            return false;
        }

        const months = rows[0].rental_length;
        /** @type {Date} */
        let created = rows[0].created;
        const now = new Date();

        if (isNaN(months)) {
            return false;
        }

        let expry = new Date(created);
        expry.setMonth(created.getMonth() + months);

        return expry > now;
    });

    if (rentalResult.isErr || !rentalResult.unwrap()) {
        console.error(rentalResult.toString());
        redirect(`/store?buy=${bookId}`);
    }

    const selectPagesResult = (
        await tryPromise(
            sql`SELECT num_pages, pdf_status FROM books WHERE id = ${bookId}`
        )
    )
        .ok()
        .mapFilter((rows) => {
            if (rows.length < 1) {
                return None;
            }

            return Some([rows[0].num_pages, rows[0].pdf_status]);
        });

    if (selectPagesResult.isNone) {
        redirect("/dashboard");
    }

    const [numPages, pdfStatus] = selectPagesResult.unwrap();

    if (pdfStatus !== "completed") {
        console.log("Not completed.");
        redirect("/dashboard");
    }

    const countResult = (
        await tryPromise(
            sql`SELECT slice_count, page_num FROM pages WHERE book_id = ${bookId} ORDER BY page_num ASC`
        )
    ).map((rows) => {
        rows.sort((a, b) => a.page_num - b.page_num);
        return rows.map((row) => row.slice_count);
    });

    let sliceCounts = countResult.unwrap();

    return (
        <PageReader
            bookId={bookId}
            numPages={numPages}
            sliceCounts={sliceCounts}
        />
    );
}
