import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL (or POSTGRES_URL) env var is required");
}

export const sql = neon(connectionString);

let schemaReady = false;

export async function ensureSchema() {
  if (schemaReady) return;

  await sql`
    CREATE TABLE IF NOT EXISTS feedback_login_tokens (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      used_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS feedback_login_tokens_email_idx ON feedback_login_tokens (email)`;

  await sql`
    CREATE TABLE IF NOT EXISTS feedback_reviewers (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      last_seen_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS feedback_sessions (
      id SERIAL PRIMARY KEY,
      token TEXT UNIQUE NOT NULL,
      reviewer_email TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      last_seen_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS feedback_comments (
      id SERIAL PRIMARY KEY,
      reviewer_email TEXT NOT NULL,
      page_path TEXT NOT NULL,
      page_label TEXT,
      mode TEXT NOT NULL,
      anchor_id TEXT,
      element_label TEXT,
      text_snapshot TEXT,
      note TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'open',
      x NUMERIC,
      y NUMERIC,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS feedback_comments_page_path_idx ON feedback_comments (page_path)`;

  schemaReady = true;
}
