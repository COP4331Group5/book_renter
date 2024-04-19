"use server";
import { tryPromise } from "@/lib/fp";
import sql from "@/lib/sql";
import styles from "./billing_history.module.scss";

export default async function BillingHistory({ userId }) {
    const rentals = (
        await tryPromise(
            sql`SELECT r.rental_length, r.created, b.title, b.author FROM rentals AS r JOIN books AS b ON b.id = r.book_id WHERE r.user_id = ${userId} `
        )
    )
        .inspectErr((err) => console.error(err))
        .map((rows) => {
            const tableRows = rows.map((row, i) => {
                return (
                    <tr key={i}>
                        <td>{row.title}</td>
                        <td>{row.author}</td>
                        <td>{row.created.toString()}</td>
                        <td>
                            {row.rental_length} month
                            {row.rental_length > 1 ? "s" : ""}
                        </td>
                    </tr>
                );
            });

            return (
                <table key="table" id={styles.table}>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Rental Start Date</th>
                        <th>Rental Duration</th>
                    </tr>
                    {tableRows}
                </table>
            );
        })
        .unwrapOr(<p>Billing history is unavailable.</p>);

    return <div>{rentals}</div>;
}
