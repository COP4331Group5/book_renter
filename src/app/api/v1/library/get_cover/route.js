import { isNothing, tryPromise } from "@/lib/fp";
import { ContainerClient } from "@azure/storage-blob";

const sasUri = process.env.SAS_URI;
const containerClient = new ContainerClient(sasUri);

export const dynamic = "force-dynamic";
export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const bookId = searchParams.get("book");

    if (isNothing(bookId) || isNaN(parseInt(bookId, 10))) {
        return Response.json(
            {
                error: "InvalidRequestFields",
                message: "one or more fields were invalid"
            },
            { status: 400 }
        );
    }

    const sliceBlobName = `${String(parseInt(bookId)).padStart(6, "0")}_cover`;

    const blobClient = containerClient.getBlockBlobClient(sliceBlobName);
    const downloadBlockBlobResponse = await blobClient.download();

    return new Response(downloadBlockBlobResponse.readableStreamBody);
}
