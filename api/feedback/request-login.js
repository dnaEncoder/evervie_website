import { sql, ensureSchema } from "../_lib/db.js";
import { generateOpaqueToken } from "../_lib/session.js";
import { sendMagicLinkEmail } from "../_lib/email.js";
import { sendJson, methodGuard, getBody, getFrontendUrl } from "../_lib/http.js";

const LOGIN_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const REQUEST_RATE_LIMIT_MS = 60 * 1000;
const isValidEmail = (email) => typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default async function handler(req, res) {
  if (!methodGuard(req, res, "POST")) return;
  await ensureSchema();

  const body = getBody(req);
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isValidEmail(email)) {
    sendJson(res, 400, { error: { message: "A valid email address is required." } });
    return;
  }

  const recentRows = await sql`
    SELECT created_at FROM feedback_login_tokens WHERE email = ${email} ORDER BY created_at DESC LIMIT 1
  `;
  const recent = recentRows[0];
  if (recent && Date.now() - new Date(recent.created_at).getTime() < REQUEST_RATE_LIMIT_MS) {
    sendJson(res, 200, { ok: true });
    return;
  }

  const token = generateOpaqueToken();
  const expiresAt = new Date(Date.now() + LOGIN_TOKEN_TTL_MS).toISOString();
  await sql`
    INSERT INTO feedback_login_tokens (email, token, expires_at) VALUES (${email}, ${token}, ${expiresAt})
  `;

  const link = `${getFrontendUrl(req)}/feedback/verify?token=${token}`;
  await sendMagicLinkEmail({ email, link });

  sendJson(res, 200, { ok: true });
}
