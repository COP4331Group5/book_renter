import { NextRequest, NextResponse } from "next/server";
import { Maybe, tryPromise } from "@/lib/fp";
import { beginProcessPdf } from "@/lib/pp";
import sql from "@/lib/sql";
import { ulid } from "ulid";
const { ContainerClient } = require("@azure/storage-blob");

const sasUri = process.env.SAS_URI;
const containerClient = new ContainerClient(sasUri);

/**
 * Publish a book.
 * @param {NextRequest} request
 * @returns {NextResponse}
 */
export async function POST(request) {
    const data = await request.formData();
    /** @type {Maybe<File>} */
    const file = new Maybe(data.get("file"));
    /** @type {Maybe<string>} */
    const filename = new Maybe(data.get("filename"));
    /** @type {Maybe<string>} */
    const title = new Maybe(data.get("title"));
    /** @type {Maybe<string>} */
    const author = new Maybe(data.get("author"));

    if (file.isNone || filename.isNone || title.isNone || author.isNone) {
        return Response.json(
            {
                error: "BadRequestForm",
                message: "the request form did not have the required fields"
            },
            { status: 400 }
        );
    }

    const bytes = await file.unwrap().arrayBuffer();
    const name = `${ulid()}_${filename}`;

    const blobClient = containerClient.getBlockBlobClient(name);
    // TODO: Change to tryPromise
    await blobClient.uploadData(bytes, {
        blobHTTPHeaders: { blobContentType: "application/pdf" }
    });

    let book = {
        "title": title.unwrap(),
        "author": author.unwrap(),
        "blob_name": name,
        "pdf_status": "processing"
    };

    let createBookResult = (
        await tryPromise(
            sql`INSERT INTO books ${sql(
                book,
                "title",
                "author",
                "blob_name",
                "pdf_status"
            )} RETURNING id`
        )
    ).map((rows) => rows[0].id);

    if (createBookResult.isErr) {
        console.log(createBookResult.unwrapErr());
        return Response.json(
            {
                error: "BookCreationFailed",
                message: "could not create book"
            },
            { status: 500 }
        );
    }

    beginProcessPdf(name);

    return Response.json({}, { status: 200 });
}
