async function feedbackFetch(path, { method = "GET", token, body } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new Error(`Could not reach content server: ${err.message}`);
  }

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    const message = json?.error?.message || `Content server returned ${response.status} for ${path}`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return json;
}

export function requestLoginLink(email) {
  return feedbackFetch("/api/feedback/request-login", { method: "POST", body: { email } });
}

export function verifyLoginToken(token) {
  return feedbackFetch("/api/feedback/verify-login", { method: "POST", body: { token } });
}

export function getSessionEmail(sessionToken) {
  return feedbackFetch("/api/feedback/me", { token: sessionToken });
}

export async function listPageComments(sessionToken, pagePath) {
  const json = await feedbackFetch(`/api/feedback/comments?pagePath=${encodeURIComponent(pagePath)}`, {
    token: sessionToken,
  });
  return json.comments || [];
}

export async function createComment(sessionToken, comment) {
  const json = await feedbackFetch("/api/feedback/comments", {
    method: "POST",
    token: sessionToken,
    body: comment,
  });
  return json.comment;
}
