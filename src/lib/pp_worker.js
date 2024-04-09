const { workerData } = require("node:worker_threads");
const { ContainerClient } = require("@azure/storage-blob");
const { default: sql } = require("./sql");
const { tryPromise } = require("./fp");
const { PDFDocument } = require("pdf-lib");
const { readFile } = require("node:fs/promises");
const pdfjsLib = require("pdfjs-dist");
const ulid = require("ulid");
var Canvas = require("canvas");
var Clipper = require("image-clipper");
Clipper.configure("canvas", Canvas);

const sasUri = process.env.SAS_URI;
const watermarkImageBytes = await readFile("@assets/public/logo.png");

const id = workerData;
let selectBlobResult = (
    await tryPromise(
        sql`SELECT blob_name, pdf_status FROM books WHERE id = ${id}`
    )
).map((rows) => [rows[0].blob_name, rows[0].pdf_status]);

if (selectBlobResult.isErr) {
    console.error(selectBlobResult.unwrapErr());
    process.exit(1);
}

const [blobName, pdfStatus] = selectBlobResult.unwrap();

if (pdfStatus != "processing") {
    console.error("PDF is not currently processing");
    process.exit(1);
}

const containerClient = new ContainerClient(sasUri);
const blobClient = containerClient.getBlockBlobClient(blobName);

async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on("error", reject);
    });
}

const downloadBlockBlobResponse = await blobClient.download();
const pdfBytes = await streamToBuffer(
    downloadBlockBlobResponse.readableStreamBody
);

let pdf = await PDFDocument.load(pdfBytes);

let pages = pdf.getPages();

const pdfImage = await pdf.embedPng(watermarkImageBytes);

for (let page of pages) {
    let { width, height } = page.getSize();

    page.drawImage(pdfImage, {
        x: width * 0.25,
        y: height * 0.25,
        width: width * 0.5,
        height: height * 0.5,
        opacity: 0.3
    });
}

const watermarkedPdf = await pdfjsLib.getDocument({ data: await pdf.save() })
    .promise;

const SLICE_SIZE = 5;
await sql.begin(async (sql) => {
    for (let i = 0; i < watermarkedPdf.numPages; i++) {
        let page = await watermarkedPdf.getPage(i);

        const viewport = page.getViewport({ scale: 1 });

        const canvas = Canvas.createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext("2d");

        await page.render({ canvasContext: context, viewport }).promise;

        let newImageBytes = canvas.toBuffer("image/png");

        let clipper = Clipper(newImageBytes);

        for (let y = 0; y < viewport.height; y++) {
            clipper.crop(0, y * SLICE_SIZE, viewport.width, SLICE_SIZE);
            const canvas = clipper.getCanvas();
            const sliceBytes = canvas.toBuffer("image/png");
            const sliceBlobName = `${id}_${i}_${y}`;
            const sliceBlobClient =
                containerClient.getBlockBlobClient(sliceBlobName);
            await sliceBlobClient.uploadData(sliceBytes, {
                blobHTTPHeaders: { blobContentType: "image/png" }
            });

            const image = {
                "book_id": id,
                "page_num": i,
                "slice_num": y,
                "blob_name": sliceBlobName
            };

            const createImageResult = await tryPromise(
                sql`INSERT INTO images ${sql(
                    image,
                    "book_id",
                    "page_num",
                    "slice_num",
                    "blob_name"
                )}`
            );

            if (createImageResult.isErr) {
                throw new Error("Could not create image");
            }

            clipper.reset();
        }
    }
});
