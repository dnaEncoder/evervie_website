import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import comments from "./api/feedback/comments.js";
import me from "./api/feedback/me.js";
import requestLogin from "./api/feedback/request-login.js";
import verifyLogin from "./api/feedback/verify-login.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "dist");

const app = express();
app.use(express.json());

app.all("/api/feedback/comments", comments);
app.all("/api/feedback/me", me);
app.all("/api/feedback/request-login", requestLogin);
app.all("/api/feedback/verify-login", verifyLogin);

app.use(express.static(distDir));
app.use((req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Evervie server listening on :${port}`);
});
