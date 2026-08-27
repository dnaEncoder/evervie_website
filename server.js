import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import comments from "./api/feedback/comments.js";
import me from "./api/feedback/me.js";
import requestLogin from "./api/feedback/request-login.js";
import verifyLogin from "./api/feedback/verify-login.js";
import captureLead from "./api/leads/capture.js";
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
