import { getSession } from "@/lib/auth";
import { ajv, emailRegex } from "@/lib/validate";
import { tryPromise } from "@/lib/fp";
import sql from "@/lib/sql";
import { cookies } from "next/headers";

/** @type {(x: any) => boolean} */
const validate = ajv.compile({
    properties: {
        name: { type: "string" },
        address: { type: "string" },
        email: { type: "string" },
        cardNum: { type: "string" },
        expiry: { type: "string" },
        cvv: { type: "uint16" },
        months: { type: "uint16" },
        bookId: { type: "uint16" }
    }
});

export async function POST(request) {
    const cookieStore = cookies();
    const sessionResult = await getSession(cookieStore);

    if (sessionResult.isErr) {
        return sessionResult.unwrapErr();
    }

    const session = sessionResult.unwrap();

    let json = await tryPromise(request.json());

    if (json.isErr) {
        console.log(json.unwrapErr());
        return Response.json(
            {
                error: "InvalidJSON",
                message: "invalid JSON"
            },
            { status: 400 }
        );
    }

    let form = json.unwrap();

    // Validate JSON form (shape, email, size).
    if (!validate(form)) {
        console.error("Bad form");
        return Response.json(
            {
                error: "ValidationError",
                message: validate.errors[0].message
            },
            { status: 400 }
        );
    }

    if (!emailRegex.test(form.email)) {
        console.error("Bad email");
        return Response.json(
            {
                error: "InvalidEmail",
                message: "email is invalid"
            },
            { status: 400 }
        );
    }

    if (form.months > 6 || form.months < 1) {
        console.error("Bad months");
        return Response.json(
            {
                error: "BadMonths",
                message: "months should be within 1-6"
            },
            { status: 400 }
        );
    }

    const rentalForm = {
        "user_id": session.userId,
        "book_id": form.bookId,
        "rental_length": form.months
    };

    const insertResult = await tryPromise(
        sql`INSERT INTO rentals ${sql(rentalForm, "user_id", "book_id", "rental_length")}`
    );

    if (insertResult.isErr) {
        console.error(insertResult.unwrapErr());
        return Response.json(
            {
                error: "RentalFailed",
                message: "internal error"
            },
            { status: 400 }
        );
    }

    return new Response();
}
