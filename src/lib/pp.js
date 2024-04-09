import { tryPromise } from "./fp";

const { Worker } = require("node:worker_threads");

/**
 * Processes a PDF.
 * @param {string} id
 * @returns {Promise}
 */
export function beginProcessPdf(id) {
    const worker = new Worker("./pp_worker.js", {
        workerData: id
    });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
        if (code !== 0) {
            sql`UPDATE books SET pdf_status = 'failed' WHERE id = ${id}`.catch(
                (e) => console.error(e)
            );
        } else {
            sql`UPDATE books SET pdf_status = 'completed' WHERE id = ${id}`.catch(
                (e) => console.error(e)
            );
        }
    });
}
