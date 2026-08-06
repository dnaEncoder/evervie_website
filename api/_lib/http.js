export function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

export function methodGuard(req, res, methods) {
  const allowed = Array.isArray(methods) ? methods : [methods];
  if (!allowed.includes(req.method)) {
    res.setHeader("Allow", allowed.join(", "));
    sendJson(res, 405, { error: { message: `Method ${req.method} not allowed` } });
    return false;
  }
  return true;
}

export function getBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

export function getFrontendUrl(req) {
  const host = req.headers.host || "localhost:3000";
  const isLocalhost = /^(localhost|127\.0\.0\.1)/.test(host);
  const proto = req.headers["x-forwarded-proto"] || (isLocalhost ? "http" : "https");
  return `${proto}://${host}`;
}
