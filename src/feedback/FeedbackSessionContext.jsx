import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getSessionEmail, requestLoginLink, verifyLoginToken } from "../lib/feedbackApi.js";
import { clearSessionToken, getSessionToken, setSessionToken } from "../lib/feedbackSession.js";

const FeedbackSessionContext = createContext(null);

export function FeedbackSessionProvider({ children }) {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | authed | anonymous

  useEffect(() => {
    const existing = getSessionToken();
    if (!existing) {
      setStatus("anonymous");
      return;
    }
    getSessionEmail(existing)
      .then((data) => {
        setToken(existing);
        setEmail(data.email);
        setStatus("authed");
      })
      .catch(() => {
        clearSessionToken();
        setStatus("anonymous");
      });
  }, []);

  const requestLogin = useCallback((requestEmail) => requestLoginLink(requestEmail), []);

  const completeLogin = useCallback(async (loginToken) => {
    const data = await verifyLoginToken(loginToken);
    setSessionToken(data.sessionToken);
    setToken(data.sessionToken);
    setEmail(data.email);
    setStatus("authed");
    return data;
  }, []);

  const logout = useCallback(() => {
    clearSessionToken();
    setToken(null);
    setEmail(null);
    setStatus("anonymous");
  }, []);

  const value = useMemo(
    () => ({ token, email, status, isAuthed: status === "authed", requestLogin, completeLogin, logout }),
    [token, email, status, requestLogin, completeLogin, logout]
  );

  return <FeedbackSessionContext.Provider value={value}>{children}</FeedbackSessionContext.Provider>;
}

export function useFeedbackSession() {
  const ctx = useContext(FeedbackSessionContext);
  if (!ctx) throw new Error("useFeedbackSession must be used within FeedbackSessionProvider");
  return ctx;
}
