import { sql, ensureSchema } from "../_lib/db.js";
import { generateOpaqueToken } from "../_lib/session.js";
import { sendJson, methodGuard, getBody } from "../_lib/http.js";

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export default async function handler(req, res) {
  if (!methodGuard(req, res, "POST")) return;
  await ensureSchema();

  const body = getBody(req);
  const token = typeof body.token === "string" ? body.token.trim() : "";
  if (!token) {
    sendJson(res, 400, { error: { message: "A login token is required." } });
    return;
  }

  const rows = await sql`SELECT * FROM feedback_login_tokens WHERE token = ${token} LIMIT 1`;
  const loginToken = rows[0];
  if (!loginToken || loginToken.used_at || new Date(loginToken.expires_at).getTime() < Date.now()) {
    sendJson(res, 401, { error: { message: "This login link is invalid or has expired." } });
    return;
  }

  await sql`UPDATE feedback_login_tokens SET used_at = now() WHERE id = ${loginToken.id}`;

  const email = loginToken.email;
  const existing = await sql`SELECT id FROM feedback_reviewers WHERE email = ${email} LIMIT 1`;
  if (existing[0]) {
    await sql`UPDATE feedback_reviewers SET last_seen_at = now() WHERE id = ${existing[0].id}`;
  } else {
    await sql`INSERT INTO feedback_reviewers (email, last_seen_at) VALUES (${email}, now())`;
  }

  const sessionToken = generateOpaqueToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  await sql`
    INSERT INTO feedback_sessions (token, reviewer_email, expires_at, last_seen_at)
    VALUES (${sessionToken}, ${email}, ${expiresAt}, now())
  `;

  sendJson(res, 200, { sessionToken, email });
}
