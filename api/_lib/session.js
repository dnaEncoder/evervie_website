import crypto from "crypto";
import { sql, ensureSchema } from "./db.js";
import { sendJson } from "./http.js";

export function generateOpaqueToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function resolveReviewer(req) {
  await ensureSchema();

  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return null;

  const rows = await sql`SELECT * FROM feedback_sessions WHERE token = ${token} LIMIT 1`;
  const session = rows[0];
  if (!session) return null;
  if (new Date(session.expires_at).getTime() < Date.now()) return null;

  await sql`UPDATE feedback_sessions SET last_seen_at = now() WHERE id = ${session.id}`;

  return { email: session.reviewer_email, sessionId: session.id };
}

export async function requireReviewer(req, res) {
  const reviewer = await resolveReviewer(req);
  if (!reviewer) {
    sendJson(res, 401, { error: { message: "A valid feedback session is required." } });
    return null;
  }
  return reviewer;
}
