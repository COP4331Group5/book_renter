import postgres from "postgres";

const sql = postgres(
    "postgres://postgres:example@host.docker.internal:5432/book_renter",
    {
        types: {
            bigint: postgres.BigInt
        },
        "idle_timeout": 20,
        "max_lifetime": 60 * 30
    }
);
export default sql;
