import { workerData } from "node:worker_threads";
import { ContainerClient } from "@azure/storage-blob";
import sql from "./sql.js";
import { tryPromise } from "./fp.js";
import { PDFDocument } from "pdf-lib";
import { readFile } from "node:fs/promises";
import * as pdfjsLib from "pdfjs-dist";
import Canvas from "canvas";

async function main() {
    const sasUri = process.env.SAS_URI;
    const watermarkImageBytes = await readFile("./novel_nest.png");

    const id = workerData;
    let selectBlobResult = (
        await tryPromise(sql`SELECT blob_name FROM books WHERE id = ${id}`)
    ).map((rows) => rows[0].blob_name);

    if (selectBlobResult.isErr) {
        console.error(selectBlobResult.unwrapErr());
        process.exit(1);
    }

    const blobName = selectBlobResult.unwrap();

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

    const watermarkedPdf = await pdfjsLib.getDocument({
        data: await pdf.save()
    }).promise;

    console.log(`Number of pages: ${watermarkedPdf.numPages}`);

    const SLICE_SIZE = 5;
    for (let i = 1; i < watermarkedPdf.numPages + 1; i++) {
        let page = await watermarkedPdf.getPage(i);

        const viewport = page.getViewport({ scale: 1 });
        console.log(
            `Rendering page ${i} (${viewport.width} x ${viewport.height})`
        );

        const canvas = Canvas.createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext("2d");

        await page.render({ canvasContext: context, viewport }).promise;

        for (let y = 0; y < Math.ceil(canvas.height / SLICE_SIZE); y++) {
            const newCanvas = Canvas.createCanvas(canvas.width, SLICE_SIZE);
            const newContext = newCanvas.getContext("2d");

            newContext.drawImage(
                canvas,
                0,
                y * SLICE_SIZE,
                canvas.width,
                SLICE_SIZE,
                0,
                0,
                newCanvas.width,
                newCanvas.height
            );

            const sliceBytes = newCanvas.toBuffer("image/png");
            const sliceBlobName = `${String(id).padStart(6, "0")}_${String(i).padStart(6, "0")}_${String(y).padStart(6, "0")}`;
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
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally((_) => process.exit(0));
