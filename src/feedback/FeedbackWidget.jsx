import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useFeedbackSession } from "./FeedbackSessionContext.jsx";
import { createComment, listPageComments, updateCommentStatus } from "../lib/feedbackApi.js";

function hashString(input) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

function nearestHeadingText(el) {
  let node = el;
  while (node && node !== document.body) {
    if (/^H[1-6]$/.test(node.tagName)) return node.textContent.trim().slice(0, 120);
    let sibling = node.previousElementSibling;
    while (sibling) {
      if (/^H[1-6]$/.test(sibling.tagName)) return sibling.textContent.trim().slice(0, 120);
      sibling = sibling.previousElementSibling;
    }
    node = node.parentElement;
  }
  return "";
}

function domPathFor(el) {
  const parts = [];
  let node = el;
  let depth = 0;
  while (node && node !== document.body && depth < 8) {
    const parent = node.parentElement;
    const index = parent ? Array.from(parent.children).indexOf(node) : 0;
    parts.unshift(`${node.tagName}:${index}`);
    node = parent;
    depth += 1;
  }
  return parts.join(">");
}

// Re-derive the anchorId hash for every live element so a stored comment can be
// re-attached to the exact node it was left on, instead of trusting stale
// page-relative x/y percentages that drift whenever the page reflows.
function buildAnchorMap(pagePath) {
  const map = new Map();
  const all = document.body.querySelectorAll("*");
  for (const el of all) {
    if (el.closest("[data-feedback-ui]")) continue;
    const textSnapshot = (el.textContent || "").trim().slice(0, 160);
    const hash = hashString(`${pagePath}|${domPathFor(el)}|${textSnapshot.slice(0, 80)}`);
    if (!map.has(hash)) map.set(hash, el);
  }
  return map;
}

export default function FeedbackWidget() {
  const { isAuthed, token, email, logout } = useFeedbackSession();
  const location = useLocation();
  const pagePath = location.pathname;

  const [mode, setMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [pending, setPending] = useState(null); // { clientX, clientY, x, y, anchorId, elementLabel, textSnapshot }
  const [viewing, setViewing] = useState(null); // { comment, clientX, clientY }
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [overlaySize, setOverlaySize] = useState({ width: 0, height: 0 });
  const [pinPositions, setPinPositions] = useState({});
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    if (!menuOpen) return undefined;
    function handleOutsideClick(e) {
      if (!e.target.closest("[data-feedback-ui]")) setMenuOpen(false);
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  function toggleMode() {
    setMode((m) => {
      const next = !m;
      if (next) setMenuOpen(false);
      return next;
    });
  }

  function handleLogout() {
    setMenuOpen(false);
    setMode(false);
    logout();
  }

  useEffect(() => {
    if (!isAuthed) return;
    let cancelled = false;
    listPageComments(token, pagePath)
      .then((list) => {
        if (!cancelled) setComments(list.filter((c) => c.mode === "element"));
      })
      .catch(() => {
        if (!cancelled) setComments([]);
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthed, token, pagePath]);

  const recomputeOverlay = useCallback(() => {
    setOverlaySize({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    });

    if (!comments.length) {
      setPinPositions({});
      return;
    }

    const anchorMap = buildAnchorMap(pagePath);
    const next = {};
    for (const c of comments) {
      const el = c.anchorId ? anchorMap.get(c.anchorId) : null;
      if (el) {
        const rect = el.getBoundingClientRect();
        next[c.documentId] = {
          left: rect.left + window.scrollX + 4,
          top: rect.top + window.scrollY + 4,
        };
      } else if (c.x != null && c.y != null) {
        // Fall back to the stored page-relative click position if the
        // original element can no longer be found (e.g. content changed).
        next[c.documentId] = {
          left: (c.x / 100) * document.documentElement.scrollWidth,
          top: (c.y / 100) * document.documentElement.scrollHeight,
        };
      }
    }
    setPinPositions(next);
  }, [comments, pagePath]);

  useEffect(() => {
    if (!isAuthed) return undefined;
    recomputeOverlay();
    // Content that loads async (fonts, images, CMS-fetched sections) can shift
    // layout after the first paint, so re-measure a beat later and again once
    // web fonts settle.
    const timer = setTimeout(recomputeOverlay, 600);
    if (document.fonts?.ready) document.fonts.ready.then(recomputeOverlay);

    let debounceTimer = null;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(recomputeOverlay, 300);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    window.addEventListener("resize", recomputeOverlay);
    return () => {
      clearTimeout(timer);
      clearTimeout(debounceTimer);
      observer.disconnect();
      window.removeEventListener("resize", recomputeOverlay);
    };
  }, [isAuthed, recomputeOverlay]);

  useEffect(() => {
    if (pagePath === "/feedback/copy") setMode(false);
    setViewing(null);
  }, [pagePath]);

  useEffect(() => {
    if (!isAuthed || !mode || pagePath === "/feedback/copy") return undefined;

    function handleClick(e) {
      if (e.target.closest("[data-feedback-ui]")) return;
      e.preventDefault();
      e.stopPropagation();

      const target = e.target;
      const textSnapshot = (target.textContent || "").trim().slice(0, 160);
      const elementLabel = nearestHeadingText(target) || target.tagName.toLowerCase();
      const anchorId = hashString(`${pagePath}|${domPathFor(target)}|${textSnapshot.slice(0, 80)}`);
      const x = (e.pageX / document.documentElement.scrollWidth) * 100;
      const y = (e.pageY / document.documentElement.scrollHeight) * 100;

      setPending({
        clientX: e.clientX,
        clientY: e.clientY,
        x,
        y,
        anchorId,
        elementLabel,
        textSnapshot,
      });
      setNote("");
      setSubmitError("");
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isAuthed, mode, pagePath]);

  async function handleSubmitNote(e) {
    e.preventDefault();
    if (!note.trim() || !pending) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const created = await createComment(token, {
        pagePath,
        pageLabel: document.title || pagePath,
        mode: "element",
        anchorId: pending.anchorId,
        elementLabel: pending.elementLabel,
        textSnapshot: pending.textSnapshot,
        note: note.trim(),
        x: pending.x,
        y: pending.y,
      });
      setComments((prev) => [...prev, created]);
      setPending(null);
      setNote("");
    } catch (err) {
      setSubmitError(err.message || "Could not save this note.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggleStatus(comment) {
    const nextStatus = comment.status === "resolved" ? "open" : "resolved";
    try {
      const updated = await updateCommentStatus(token, comment.documentId, nextStatus);
      setComments((prev) => prev.map((c) => (c.documentId === comment.documentId ? updated : c)));
    } catch {
      // Leave the checklist as-is; the reviewer can retry the click.
    }
  }

  const onCopyTracker = pagePath === "/feedback/copy";
  if (!isAuthed || pagePath === "/feedback" || pagePath === "/feedback/verify") return null;

  return (
    <div className="feedbackWidgetRoot" data-feedback-ui>
      {menuOpen && (
        <div className="feedbackMenuPanel">
          <div className="feedbackMenuHeader">
            <span className="feedbackMenuEmail" title={email}>
              {email}
            </span>
            <button type="button" className="feedbackLinkButton" onClick={handleLogout}>
              Log out
            </button>
          </div>

          {!onCopyTracker && (
            <button
              type="button"
              className={`feedbackMenuItem${mode ? " feedbackMenuItem--active" : ""}`}
              onClick={toggleMode}
            >
              <span>Feedback mode</span>
              <span className="feedbackMenuItemState">{mode ? "On" : "Off"}</span>
            </button>
          )}

          {onCopyTracker ? (
            <div className="feedbackMenuItem feedbackMenuItem--muted">
              <span>Copy tracker</span>
              <span className="feedbackMenuItemState">Here</span>
            </div>
          ) : (
            <Link className="feedbackMenuItem" to="/feedback/copy" onClick={() => setMenuOpen(false)}>
              <span>Copy tracker</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}

          <button
            type="button"
            className="feedbackMenuItem"
            onClick={() => {
              setNotesOpen(true);
              setMenuOpen(false);
            }}
          >
            <span>Page notes</span>
            <span className="feedbackMenuItemState">{comments.length}</span>
          </button>
        </div>
      )}

      <button
        type="button"
        className={`feedbackModeToggle${mode ? " feedbackModeToggle--on" : ""}`}
        onClick={() => setMenuOpen((o) => !o)}
      >
        Feedback{mode ? " · On" : ""}
      </button>

      {createPortal(
        <div
          className="feedbackPinLayer"
          data-feedback-ui
          style={{ width: overlaySize.width, height: overlaySize.height }}
        >
          {comments.map((c, i) => {
            if (c.status === "resolved") return null;
            const pos = pinPositions[c.documentId];
            if (!pos) return null;
            return (
              <div
                key={c.documentId || i}
                className="feedbackPin"
                style={{ left: pos.left, top: pos.top }}
                onClick={(e) => {
                  e.stopPropagation();
                  setViewing({ comment: c, clientX: e.clientX, clientY: e.clientY });
                }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>,
        document.body
      )}

      {pending &&
        createPortal(
          <div className="feedbackPopoverBackdrop" data-feedback-ui onClick={() => setPending(null)}>
            <form
              className="feedbackPopover"
              style={{ left: pending.clientX, top: pending.clientY }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmitNote}
            >
              <p className="feedbackPopoverLabel">{pending.elementLabel || "Selected element"}</p>
              <textarea
                autoFocus
                placeholder="What should change here?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
              {submitError && <p className="feedbackAuthError">{submitError}</p>}
              <div className="feedbackPopoverActions">
                <button type="button" className="feedbackLinkButton" onClick={() => setPending(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn" disabled={submitting || !note.trim()}>
                  {submitting ? "Saving…" : "Save note"}
                </button>
              </div>
            </form>
          </div>,
          document.body
        )}

      {viewing &&
        createPortal(
          <div className="feedbackPopoverBackdrop" data-feedback-ui onClick={() => setViewing(null)}>
            <div
              className="feedbackPopover feedbackViewPopover"
              style={{ left: viewing.clientX, top: viewing.clientY }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="feedbackPopoverLabel">{viewing.comment.elementLabel || "Selected element"}</p>
              <p className="feedbackViewNote">{viewing.comment.note}</p>
              <p className="feedbackViewMeta">
                {viewing.comment.reviewerEmail}
                {viewing.comment.createdAt ? ` · ${new Date(viewing.comment.createdAt).toLocaleDateString()}` : ""}
              </p>
              <div className="feedbackPopoverActions">
                <button type="button" className="feedbackLinkButton" onClick={() => setViewing(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {notesOpen &&
        createPortal(
          <div className="feedbackPopoverBackdrop" data-feedback-ui onClick={() => setNotesOpen(false)}>
            <div className="feedbackNotesPanel" onClick={(e) => e.stopPropagation()}>
              <div className="feedbackNotesHeader">
                <p className="feedbackPopoverLabel">Page notes</p>
                <button type="button" className="feedbackLinkButton" onClick={() => setNotesOpen(false)}>
                  Close
                </button>
              </div>
              {comments.length === 0 ? (
                <p className="feedbackNotesEmpty">No notes on this page yet.</p>
              ) : (
                <ul className="feedbackNotesList">
                  {comments.map((c, i) => (
                    <li
                      key={c.documentId || i}
                      className={`feedbackNotesItem${c.status === "resolved" ? " feedbackNotesItem--done" : ""}`}
                    >
                      <label className="feedbackNotesCheck">
                        <input
                          type="checkbox"
                          checked={c.status === "resolved"}
                          onChange={() => handleToggleStatus(c)}
                        />
                        <span className="feedbackNotesNumber">{i + 1}</span>
                      </label>
                      <div className="feedbackNotesBody">
                        <p className="feedbackNotesElement">{c.elementLabel || "Selected element"}</p>
                        <p className="feedbackNotesNote">{c.note}</p>
                        <p className="feedbackViewMeta">
                          {c.reviewerEmail}
                          {c.createdAt ? ` · ${new Date(c.createdAt).toLocaleDateString()}` : ""}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
