import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";
import { isNothing, tryPromise } from "@/lib/fp";
import sql from "@/lib/sql";
import { ContainerClient } from "@azure/storage-blob";

const sasUri = process.env.SAS_URI;
const containerClient = new ContainerClient(sasUri);

export const dynamic = "force-dynamic";
export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const bookId = searchParams.get("book");
    const pageId = searchParams.get("page");
    const sliceId = searchParams.get("slice");

    if (
        isNothing(bookId) ||
        isNaN(parseInt(bookId, 10)) ||
        isNothing(pageId) ||
        isNaN(parseInt(pageId, 10)) ||
        isNothing(sliceId) ||
        isNaN(parseInt(sliceId, 10))
    ) {
        return Response.json(
            {
                error: "InvalidRequestFields",
                message: "one or more fields were invalid"
            },
            { status: 400 }
        );
    }

    const sliceBlobName = `${String(parseInt(bookId)).padStart(6, "0")}_${String(parseInt(pageId) + 1).padStart(6, "0")}_${String(parseInt(sliceId)).padStart(6, "0")}`;

    const blobClient = containerClient.getBlockBlobClient(sliceBlobName);
    const downloadBlockBlobResponse = await blobClient.download();

    return new Response(downloadBlockBlobResponse.readableStreamBody);
}
