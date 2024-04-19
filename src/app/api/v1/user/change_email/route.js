import { ajv, emailRegex } from "@/lib/validate";
import { tryPromise } from "@/lib/fp";
import { cookies } from "next/headers";
import sql from "@/lib/sql";
import { getSession } from "@/lib/auth";

/** @type {(x: any) => boolean} */
const validate = ajv.compile({
    properties: {
        email: { type: "string" }
    }
});

/**
 * @param {Request} request
 * @returns {Response}
 */
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
        return Response.json(
            {
                error: "ValidationError",
                message: validate.errors[0].message
            },
            { status: 400 }
        );
    }

    if (!emailRegex.test(form.email)) {
        return Response.json(
            {
                error: "InvalidEmail",
                message: "email is invalid"
            },
            { status: 400 }
        );
    }

    const updateResult = await tryPromise(
        sql`UPDATE users SET email = ${form.email} WHERE id = ${session.userId}`
    );

    if (updateResult.isErr) {
        return Response.json(
            {
                error: "UpdateEmailFailed",
                message: "email may not be unique"
            },
            { status: 500 }
        );
    }

    let headers = new Headers();
    headers.append(
        "SET-COOKIE",
        `email_address=${form.email};path=/;samesite=strict`
    );

    return new Response(null, {
        status: 200,
        headers
    });
}
