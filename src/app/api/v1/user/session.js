import crypto from "crypto";

export function generate_session() {
    let session_id = crypto.randomBytes(16).toString("hex");
}
