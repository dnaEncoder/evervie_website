import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFeedbackSession } from "./FeedbackSessionContext.jsx";

export default function FeedbackLoginPage() {
  const { requestLogin, isAuthed, email, logout } = useFeedbackSession();
  const [inputEmail, setInputEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputEmail.trim()) return;
    setState("sending");
    setError("");
    try {
      await requestLogin(inputEmail.trim());
      setState("sent");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setState("error");
    }
  }

  return (
    <div className="feedbackAuthPage">
      <div className="feedbackAuthCard">
        <p className="eyebrow">Evervie feedback</p>
        {isAuthed ? (
          <>
            <h1>You're logged in</h1>
            <p>Signed in as {email}. Browse the site and click the feedback pill to leave notes.</p>
            <div className="feedbackAuthActions">
              <Link className="btn" to="/">
                Go to site
              </Link>
              <Link className="btnOutline" to="/feedback/copy">
                Copy tracker
              </Link>
              <button type="button" className="feedbackLinkButton" onClick={logout}>
                Log out
              </button>
            </div>
          </>
        ) : state === "sent" ? (
          <>
            <h1>Check your inbox</h1>
            <p>
              We've sent a login link to <strong>{inputEmail}</strong>. Open it on this device to start your
              feedback session.
            </p>
          </>
        ) : (
          <>
            <h1>Feedback session</h1>
            <p>Enter your email and we'll send you a one-time login link.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                className="feedbackAuthInput"
              />
              <button type="submit" className="btn" disabled={state === "sending"}>
                {state === "sending" ? "Sending…" : "Send login link"}
              </button>
            </form>
            {state === "error" && <p className="feedbackAuthError">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
