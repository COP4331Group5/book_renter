import postgres from "postgres";

const sql = postgres("postgres://postgres:example@172.20.0.2:5432/book_renter");
export default sql;
