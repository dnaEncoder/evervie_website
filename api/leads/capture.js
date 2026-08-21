import { sql, ensureSchema } from "../_lib/db.js";
import { sendNewLeadNotification } from "../_lib/email.js";
import { sendJson, methodGuard, getBody } from "../_lib/http.js";

function mapLead(row) {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    company: row.company,
    documentSlug: row.document_slug,
    documentTitle: row.document_title,
    documentCategory: row.document_category,
    createdAt: row.created_at,
  };
}

export default async function handler(req, res) {
  if (!methodGuard(req, res, ["POST"])) return;
  await ensureSchema();

  const body = getBody(req);
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" && body.company.trim() ? body.company.trim() : null;
  const documentSlug = typeof body.documentSlug === "string" ? body.documentSlug : "";
  const documentTitle = typeof body.documentTitle === "string" ? body.documentTitle : "";
  const documentCategory = typeof body.documentCategory === "string" ? body.documentCategory : "";

  if (!name || !email || !documentSlug || !documentTitle || !documentCategory) {
    sendJson(res, 400, {
      error: { message: "name, email, documentSlug, documentTitle, and documentCategory are required." },
    });
    return;
  }

  const rows = await sql`
    INSERT INTO download_leads
      (name, email, company, document_slug, document_title, document_category)
    VALUES
      (${name}, ${email}, ${company}, ${documentSlug}, ${documentTitle}, ${documentCategory})
    RETURNING *
  `;
  const created = mapLead(rows[0]);

  await sendNewLeadNotification({ lead: created });

  sendJson(res, 200, { lead: created });
}
