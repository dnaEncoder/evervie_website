import { sql, ensureSchema } from "../_lib/db.js";
import { sendCareerApplicationEmails } from "../_lib/email.js";
import { sendJson, methodGuard, getBody } from "../_lib/http.js";

export default async function handler(req, res) {
  if (!methodGuard(req, res, ["POST"])) return;

  let dbAvailable = true;
  try {
    await ensureSchema();
  } catch (err) {
    console.warn("db connection warning in career submission handler:", err.message);
    dbAvailable = false;
  }

  const body = getBody(req);
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email) {
    sendJson(res, 400, {
      error: { message: "Name and email are required fields." },
    });
    return;
  }

  let application = {
    id: String(Date.now()),
    name,
    email,
    role,
    message,
    createdAt: new Date().toISOString(),
  };

  if (dbAvailable) {
    try {
      const rows = await sql`
        INSERT INTO career_applications
          (name, email, role, message)
        VALUES
          (${name}, ${email}, ${role}, ${message})
        RETURNING *
      `;
      if (rows && rows[0]) {
        application = {
          id: String(rows[0].id),
          name: rows[0].name,
          email: rows[0].email,
          role: rows[0].role,
          message: rows[0].message,
          createdAt: rows[0].created_at,
        };
      }
    } catch (err) {
      console.error("Failed to save career application to db:", err.message);
    }
  }

  // Trigger branded emails (talent@everviehealth.com notification & applicant confirmation)
  await sendCareerApplicationEmails({ application });

  sendJson(res, 200, { ok: true, application });
}
