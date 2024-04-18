/**
 * Processes a PDF.
 * @param {string} id
 * @returns {Promise}
 */
export async function beginProcessPdf(id) {
    console.log(id);
    const res = await fetch("http://host.docker.internal:5000/process", {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({
            id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.status != 200) {
        console.error(await res.json());
        return false;
    }

    return true;
}
