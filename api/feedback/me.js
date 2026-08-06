import { ensureSchema } from "../_lib/db.js";
import { requireReviewer } from "../_lib/session.js";
import { sendJson, methodGuard } from "../_lib/http.js";

export default async function handler(req, res) {
  if (!methodGuard(req, res, "GET")) return;
  await ensureSchema();

  const reviewer = await requireReviewer(req, res);
  if (!reviewer) return;

  sendJson(res, 200, { email: reviewer.email });
}
