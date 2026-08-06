const COOKIE_NAME = "evervie_feedback_session";
const COOKIE_MAX_AGE_DAYS = 30;

export function getSessionToken() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setSessionToken(token) {
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

export function clearSessionToken() {
  document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
}
