import { sql, ensureSchema } from "../_lib/db.js";
import { requireReviewer } from "../_lib/session.js";
import { sendNewCommentNotification } from "../_lib/email.js";
import { sendJson, methodGuard, getBody, getFrontendUrl } from "../_lib/http.js";

function mapComment(row) {
  return {
    documentId: String(row.id),
    reviewerEmail: row.reviewer_email,
    pagePath: row.page_path,
    pageLabel: row.page_label,
    mode: row.mode,
    anchorId: row.anchor_id,
    elementLabel: row.element_label,
    textSnapshot: row.text_snapshot,
    note: row.note,
    status: row.status,
    x: row.x == null ? null : Number(row.x),
    y: row.y == null ? null : Number(row.y),
    createdAt: row.created_at,
  };
}

export default async function handler(req, res) {
  if (!methodGuard(req, res, ["GET", "POST"])) return;
  await ensureSchema();

  const reviewer = await requireReviewer(req, res);
  if (!reviewer) return;

  if (req.method === "GET") {
    const pagePath = typeof req.query?.pagePath === "string" ? req.query.pagePath : undefined;
    const rows = pagePath
      ? await sql`SELECT * FROM feedback_comments WHERE page_path = ${pagePath} ORDER BY created_at ASC`
      : await sql`SELECT * FROM feedback_comments ORDER BY created_at ASC`;
    sendJson(res, 200, { comments: rows.map(mapComment) });
    return;
  }

  const body = getBody(req);
  const pagePath = typeof body.pagePath === "string" ? body.pagePath : "";
  const mode = body.mode === "element" || body.mode === "copy" ? body.mode : "";
  const note = typeof body.note === "string" ? body.note.trim() : "";

  if (!pagePath || !mode || !note) {
    sendJson(res, 400, { error: { message: "pagePath, mode, and note are required." } });
    return;
  }

  const pageLabel = typeof body.pageLabel === "string" ? body.pageLabel : null;
  const anchorId = typeof body.anchorId === "string" ? body.anchorId : null;
  const elementLabel = typeof body.elementLabel === "string" ? body.elementLabel : null;
  const textSnapshot = typeof body.textSnapshot === "string" ? body.textSnapshot : null;
  const x = typeof body.x === "number" ? body.x : null;
  const y = typeof body.y === "number" ? body.y : null;

  const rows = await sql`
    INSERT INTO feedback_comments
      (reviewer_email, page_path, page_label, mode, anchor_id, element_label, text_snapshot, note, status, x, y)
    VALUES
      (${reviewer.email}, ${pagePath}, ${pageLabel}, ${mode}, ${anchorId}, ${elementLabel}, ${textSnapshot}, ${note}, 'open', ${x}, ${y})
    RETURNING *
  `;
  const created = mapComment(rows[0]);

  await sendNewCommentNotification({ comment: created, frontendUrl: getFrontendUrl(req) });

  sendJson(res, 200, { comment: created });
}
