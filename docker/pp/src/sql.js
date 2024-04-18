import postgres from "postgres";

const sql = postgres(
    "postgres://postgres:example@host.docker.internal:5432/book_renter"
);
export default sql;
