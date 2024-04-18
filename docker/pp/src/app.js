import express from "express";
import sql from "./sql.js";
import { Maybe, tryPromise } from "./fp.js";
import { Worker } from "worker_threads";

const app = express();
const port = 5000;

app.use(express.json());

app.post("/process", async (req, res) => {
    const id = req.body.id;
    console.log(req.body);

    const selectBlobResult = (
        await tryPromise(sql`SELECT pdf_status FROM books WHERE id = ${id}`)
    ).map((rows) => new Maybe(rows[0]).map((x) => x.pdf_status));

    if (selectBlobResult.isErr) {
        console.log(selectBlobResult.unwrapErr());
        res.status(500).send({ message: "Could not check database" });
        return;
    }

    const status = selectBlobResult.unwrap();

    if (status.isNone) {
        res.status(400).send({ message: "Book does not exist" });
        return;
    }

    if (status.unwrap() === "completed") {
        res.status(400).send({ message: "Book has already been processed" });
        return;
    }

    beginProcessing(id);

    res.status(200).send({ message: "Started processing the book" });
});

function beginProcessing(id) {
    const worker = new Worker(new URL("./worker.js", import.meta.url), {
        workerData: id,
        env: { "SAS_URI": process.env.SAS_URI }
    });
    worker.on("error", (e) => {
        console.error(`Worker had error: ${e}`);
        sql`UPDATE books SET pdf_status = 'failed' WHERE id = ${id}`.catch(
            (e) => console.error(e)
        );
    });
    worker.on("exit", (code) => {
        console.log(`Worker exited with: ${code}`);
        if (code !== 0) {
            sql`UPDATE books SET pdf_status = 'failed' WHERE id = ${id}`.catch(
                (e) => console.error(e)
            );
        }
    });
}

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
