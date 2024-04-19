import { NextRequest, NextResponse } from "next/server";
import { Maybe, tryPromise } from "@/lib/fp";
import { beginProcessPdf } from "@/lib/pp";
import { cookies } from "next/headers";
import sql from "@/lib/sql";
import { ulid } from "ulid";
import { ContainerClient } from "@azure/storage-blob";
import { PDFDocument } from "pdf-lib";

const sasUri = process.env.SAS_URI;
const containerClient = new ContainerClient(sasUri);
const sasCovers = process.env.SAS_COVERS;
const coversClient = new ContainerClient(sasCovers);

async function pdfToImage(pdfBytes) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const firstPage = pdfDoc.getPage(0); // Get the first page
  const pngImage = await firstPage.asPng({ scale: 1.0 }); // Convert to PNG image

  return pngImage;
}

async function uploadImage(imageBytes, imageName) {
  const imageBlobClient = coversClient.getBlockBlobClient(imageName);
  await imageBlobClient.uploadData(imageBytes, {
    blobHTTPHeaders: { blobContentType: "image/png" },
  });
}

/**
 * Publish a book.
 * @param {NextRequest} request
 * @returns {NextResponse}
 */
export async function POST(request) {
  const cookieStore = cookies();

  /** @type {Maybe<RequestCookie>} */
  const sessionToken = new Maybe(cookieStore.get("session"));

  if (sessionToken.isNone) {
    return Response.json(
      {
        error: "MissingSessionToken",
        message: "the request headers didn't have session token",
      },
      { status: 401 },
    );
  }

  const session = sessionToken.map((x) => x.value).unwrap();

  let selectUserResult = (
    await tryPromise(sql`SELECT user_id FROM sessions WHERE id = ${session}`)
  ).map((rows) => rows[0].user_id);

  if (selectUserResult.isErr) {
    return Response.json(
      {
        error: "InvalidSessionToken",
        message: "the session token doesn't exist",
      },
      { status: 401 },
    );
  }

  let userId = selectUserResult.unwrap();

  let selectAdminResult = (
    await tryPromise(sql`SELECT is_admin FROM users WHERE id = ${userId}`)
  ).map((rows) => rows[0].is_admin);

  if (selectAdminResult.isErr) {
    return Response.json(
      {
        error: "InternalError",
        message: "issue resolving user",
      },
      { status: 500 },
    );
  }

  if (selectAdminResult.unwrap() !== true) {
    return Response.json(
      {
        error: "NotAuthorized",
        message: "the user is not an admin",
      },
      { status: 401 },
    );
  }

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
        message: "the request form did not have the required fields",
      },
      { status: 400 },
    );
  }

  if (
    title.unwrap().length > 128 ||
    title.unwrap().length < 1 ||
    author.unwrap().length > 128 ||
    author.unwrap().length < 1
  ) {
    return Response.json(
      {
        error: "BadFieldLayout",
        message: "the request form fields were invalid",
      },
      { status: 400 },
    );
  }

  const bytes = await file.unwrap().arrayBuffer();
  const name = `${ulid()}_${filename.unwrap()}`;

  const blobClient = containerClient.getBlockBlobClient(name);
  // TODO: Change to tryPromise
  await blobClient.uploadData(bytes, {
    blobHTTPHeaders: { blobContentType: "application/pdf" },
  });

  const imageBytes = await pdfToImage(bytes);
  const imageBlobName = `${ulid()}_cover.png`;
  await uploadImage(imageBytes, imageBlobName);

  let book = {
    title: title.unwrap(),
    author: author.unwrap(),
    blob_name: name,
    cover_image_name: imageBlobName,
    pdf_status: "processing",
    num_pages: 0,
  };

  let createBookResult = (
    await tryPromise(
      sql`INSERT INTO books ${sql(
        book,
        "title",
        "author",
        "blob_name",
        "cover_image_name",
        "pdf_status",
        "num_pages",
      )} RETURNING id`,
    )
  ).map((rows) => rows[0].id);

  if (createBookResult.isErr) {
    console.log(createBookResult.unwrapErr());
    return Response.json(
      {
        error: "BookCreationFailed",
        message: "could not create book",
      },
      { status: 500 },
    );
  }

  const started = await beginProcessPdf(createBookResult.unwrap());

  if (!started) {
    return Response.json(
      {
        error: "BookProcessingFailed",
        message: "could not start processing the book",
      },
      { status: 500 },
    );
  }

  return Response.json({}, { status: 200 });
}
