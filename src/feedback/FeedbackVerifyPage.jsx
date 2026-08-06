import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useFeedbackSession } from "./FeedbackSessionContext.jsx";

export default function FeedbackVerifyPage() {
  const [searchParams] = useSearchParams();
  const { completeLogin } = useFeedbackSession();
  const [state, setState] = useState("verifying"); // verifying | done | error
  const [error, setError] = useState("");
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const token = searchParams.get("token");
    if (!token) {
      setState("error");
      setError("This login link is missing its token.");
      return;
    }

    completeLogin(token)
      .then(() => setState("done"))
      .catch((err) => {
        setState("error");
        setError(err.message || "This login link is invalid or has expired.");
      });
  }, [searchParams, completeLogin]);

  return (
    <div className="feedbackAuthPage">
      <div className="feedbackAuthCard">
        <p className="eyebrow">Evervie feedback</p>
        {state === "verifying" && <h1>Verifying your link…</h1>}
        {state === "done" && (
          <>
            <h1>You're in</h1>
            <p>Your feedback session is active. Browse the site and click the feedback pill to leave notes.</p>
            <div className="feedbackAuthActions">
              <Link className="btn" to="/">
                Go to site
              </Link>
              <Link className="btnOutline" to="/feedback/copy">
                Copy tracker
              </Link>
            </div>
          </>
        )}
        {state === "error" && (
          <>
            <h1>Link didn't work</h1>
            <p>{error}</p>
            <div className="feedbackAuthActions">
              <Link className="btn" to="/feedback">
                Request a new link
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
