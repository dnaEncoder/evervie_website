import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Readable } from "stream";

import comments from "./api/feedback/comments.js";
import me from "./api/feedback/me.js";
import requestLogin from "./api/feedback/request-login.js";
import verifyLogin from "./api/feedback/verify-login.js";
import captureLead from "./api/leads/capture.js";
import submitCareerApplication from "./api/careers/submit.js";
import { resolveMeta, injectMeta } from "./seo/render.js";
import { generateSitemap } from "./seo/sitemap.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "dist");
const indexHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

const app = express();
app.use(express.json());

app.all("/api/feedback/comments", comments);
app.all("/api/feedback/me", me);
app.all("/api/feedback/request-login", requestLogin);
app.all("/api/feedback/verify-login", verifyLogin);
app.all("/api/leads/capture", captureLead);
app.all("/api/careers/submit", submitCareerApplication);

const STRAPI_ORIGIN = process.env.VITE_STRAPI_URL || "https://admin.everviehealth.in";

// Reverse-proxies browser-facing Strapi reads (content API + uploaded media)
// through our own domain so the CMS's admin subdomain is never exposed in
// API calls or document download links.
app.use("/cms", async (req, res) => {
  const upstreamUrl = `${STRAPI_ORIGIN}${req.url}`;
  let upstream;
  try {
    upstream = await fetch(upstreamUrl, { method: req.method });
  } catch (err) {
    res.status(502).json({ error: { message: "Could not reach content server." } });
    return;
  }

  res.status(upstream.status);
  const contentType = upstream.headers.get("content-type");
  const contentLength = upstream.headers.get("content-length");
  const cacheControl = upstream.headers.get("cache-control");
  if (contentType) res.setHeader("content-type", contentType);
  if (contentLength) res.setHeader("content-length", contentLength);
  if (cacheControl) res.setHeader("cache-control", cacheControl);

  if (!upstream.body) {
    res.end();
    return;
  }
  Readable.fromWeb(upstream.body).pipe(res);
});

app.get("/sitemap.xml", async (req, res) => {
  const xml = await generateSitemap();
  res.type("application/xml").send(xml);
});

// index:false so "/" and every other route fall through to the
// resolveMeta/injectMeta handler below instead of being served as a
// plain static file with no per-route metadata.
app.use(express.static(distDir, { index: false }));

app.use(async (req, res) => {
  const meta = await resolveMeta(req.path);
  const html = injectMeta(indexHtml, meta);
  res.status(meta.status).send(html);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Evervie server listening on :${port}`);
});
