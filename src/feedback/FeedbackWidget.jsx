import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useFeedbackSession } from "./FeedbackSessionContext.jsx";
import { createComment, deleteComment, listPageComments, updateCommentStatus } from "../lib/feedbackApi.js";

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

const INLINE_SELECTION_TAGS = new Set([
  "SPAN", "A", "STRONG", "EM", "B", "I", "SMALL", "CODE", "MARK", "ABBR", "TIME", "SUB", "SUP", "U", "S",
]);
const ATOMIC_SELECTION_TAGS = new Set(["IMG", "PICTURE", "SVG", "VIDEO", "CANVAS", "IFRAME"]);

// DevTools-Inspect-Element-style target resolution: climbs from the literal
// click/hover target up through inline-display ancestors until it reaches
// the nearest block-level element. This makes different reviewers' clicks
// on the same visual block (a paragraph, a card, a link inside body copy)
// converge on the same element - and therefore the same anchorId - instead
// of each landing on whichever inline sub-node happened to be under the
// cursor.
function resolveSelectableElement(target) {
  let node = target;
  if (!node || node === document.body) return node;
  if (ATOMIC_SELECTION_TAGS.has(node.tagName)) return node;

  let depth = 0;
  while (node && node !== document.body && depth < 12) {
    if (ATOMIC_SELECTION_TAGS.has(node.tagName)) return node;
    let display = "";
    try {
      display = window.getComputedStyle(node).display;
    } catch {
      display = "";
    }
    if (!INLINE_SELECTION_TAGS.has(node.tagName) && display !== "inline") return node;
    const parent = node.parentElement;
    if (!parent || parent === document.body) return node;
    node = parent;
    depth += 1;
  }
  return node;
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

// The exact-match hash above breaks whenever an unrelated section is
// added/removed anywhere above an anchor, since every element's DOM path
// index below the edit shifts even though the anchored content itself
// didn't move. Fall back to matching on the stored text snapshot alone
// (same-page, same visible text) before giving up and using the stale
// click-time x/y percentage, which is only accurate if the page's overall
// height hasn't changed since the note was left.
function buildTextMap(pagePath) {
  const map = new Map();
  const all = document.body.querySelectorAll("*");
  for (const el of all) {
    if (el.closest("[data-feedback-ui]")) continue;
    const textSnapshot = (el.textContent || "").trim().slice(0, 160);
    if (!textSnapshot) continue;
    const key = `${pagePath}|${textSnapshot}`;
    if (!map.has(key)) map.set(key, el);
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
  const [pinsVisible, setPinsVisible] = useState(true);
  const [comments, setComments] = useState([]);
  const [pending, setPending] = useState(null); // { clientX, clientY, x, y, anchorId, elementLabel, textSnapshot }
  const [viewing, setViewing] = useState(null); // { key, clientX, clientY }
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pinPositions, setPinPositions] = useState({});
  const [orphaned, setOrphaned] = useState(() => new Set());
  const [hover, setHover] = useState(null); // { left, top, width, height, label }
  const [threadNote, setThreadNote] = useState("");
  const [threadSubmitting, setThreadSubmitting] = useState(false);
  const [threadSubmitError, setThreadSubmitError] = useState("");
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const anchorGroups = useMemo(() => {
    const map = new Map();
    for (const c of comments) {
      const key = c.anchorId || `doc:${c.documentId}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(c);
    }
    for (const group of map.values()) {
      group.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    }
    return map;
  }, [comments]);
  const anchorGroupsRef = useRef(anchorGroups);
  anchorGroupsRef.current = anchorGroups;

  const viewingGroup = viewing ? anchorGroups.get(viewing.key) || [] : [];

  useEffect(() => {
    if (viewing && (!anchorGroups.has(viewing.key) || anchorGroups.get(viewing.key).length === 0)) {
      setViewing(null);
    }
  }, [viewing, anchorGroups]);

  useEffect(() => {
    setThreadNote("");
    setThreadSubmitError("");
  }, [viewing?.key]);

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
    if (!comments.length) {
      setPinPositions({});
      setOrphaned(new Set());
      return;
    }

    const anchorMap = buildAnchorMap(pagePath);
    let textMap = null; // built lazily - most groups resolve via anchorMap
    const maxLeft = document.documentElement.scrollWidth;
    const maxTop = document.documentElement.scrollHeight;

    // One pin per element, not one pin per note: group comments sharing an
    // anchorId (the element a reviewer selected) before resolving a
    // position, so multiple notes on the same element render as a single
    // pin instead of one pin each.
    const groups = new Map();
    for (const c of comments) {
      const key = c.anchorId || `doc:${c.documentId}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(c);
    }

    const raw = [];
    const nextOrphaned = new Set();
    for (const [key, group] of groups) {
      const anchorId = group[0].anchorId;
      let el = anchorId ? anchorMap.get(anchorId) : null;
      if (!el && group[0].textSnapshot) {
        if (!textMap) textMap = buildTextMap(pagePath);
        el = textMap.get(`${pagePath}|${group[0].textSnapshot}`) || null;
      }
      if (el) {
        const rect = el.getBoundingClientRect();
        raw.push({
          key,
          // getBoundingClientRect() follows CSS transforms (e.g. the map's
          // 3D tilt), which can place an anchor's rect far outside the
          // document - clamp so one stray pin can't blow up the page's
          // scrollable area.
          left: Math.min(Math.max(rect.left + window.scrollX + 4, 0), maxLeft),
          top: Math.min(Math.max(rect.top + window.scrollY + 4, 0), maxTop),
        });
      } else {
        // The element this thread was left on couldn't be found on the page
        // anymore (content removed/restructured) - flag it so the reviewer
        // can spot and clean it up, and fall back to the stale page-relative
        // click position as a best-effort guess at where to still show it.
        for (const c of group) nextOrphaned.add(c.documentId);
        const fallback = group.find((c) => c.x != null && c.y != null);
        if (fallback) {
          raw.push({
            key,
            left: Math.min(Math.max((fallback.x / 100) * maxLeft, 0), maxLeft),
            top: Math.min(Math.max((fallback.y / 100) * maxTop, 0), maxTop),
          });
        }
      }
    }

    // Secondary safety net, not the primary grouping mechanism: if two
    // genuinely different elements' pins still land within one pin's
    // width/height of each other (e.g. a tight row of small icons), nudge
    // one sideways so both stay clickable.
    const PIN_SPACING = 22;
    const placed = [];
    const next = {};
    for (const p of raw) {
      let left = p.left;
      const top = p.top;
      let guard = 0;
      while (
        placed.some((q) => Math.abs(q.left - left) < PIN_SPACING && Math.abs(q.top - top) < PIN_SPACING) &&
        guard < 60
      ) {
        left = Math.min(left + PIN_SPACING, maxLeft);
        guard += 1;
      }
      placed.push({ left, top });
      next[p.key] = { left, top };
    }

    setPinPositions(next);
    setOrphaned(nextOrphaned);
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

      const target = resolveSelectableElement(e.target);
      const textSnapshot = (target.textContent || "").trim().slice(0, 160);
      const elementLabel = nearestHeadingText(target) || target.tagName.toLowerCase();
      const anchorId = hashString(`${pagePath}|${domPathFor(target)}|${textSnapshot.slice(0, 80)}`);
      const x = (e.pageX / document.documentElement.scrollWidth) * 100;
      const y = (e.pageY / document.documentElement.scrollHeight) * 100;

      const existingGroup = anchorGroupsRef.current.get(anchorId);
      if (existingGroup && existingGroup.length) {
        setViewing({ key: anchorId, clientX: e.clientX, clientY: e.clientY });
        return;
      }

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

  useEffect(() => {
    if (!isAuthed || !mode || pagePath === "/feedback/copy") {
      setHover(null);
      return undefined;
    }

    let raf = null;

    function handleMove(e) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (e.target.closest("[data-feedback-ui]")) {
          setHover(null);
          return;
        }
        const el = resolveSelectableElement(e.target);
        if (!el || el === document.body) {
          setHover(null);
          return;
        }
        const rect = el.getBoundingClientRect();
        const textSnapshot = (el.textContent || "").trim().slice(0, 160);
        const anchorId = hashString(`${pagePath}|${domPathFor(el)}|${textSnapshot.slice(0, 80)}`);
        const group = anchorGroupsRef.current.get(anchorId);
        const openCount = group ? group.filter((c) => c.status !== "resolved").length : 0;
        setHover({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          label: openCount > 0 ? `${openCount} note${openCount === 1 ? "" : "s"} · click to view` : "Click to comment",
        });
      });
    }

    function handleLeave() {
      setHover(null);
    }

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
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

  async function handleAddToThread(e, template) {
    e.preventDefault();
    if (!threadNote.trim() || !template) return;
    setThreadSubmitting(true);
    setThreadSubmitError("");
    try {
      const created = await createComment(token, {
        pagePath,
        pageLabel: document.title || pagePath,
        mode: "element",
        anchorId: template.anchorId,
        elementLabel: template.elementLabel,
        textSnapshot: template.textSnapshot,
        note: threadNote.trim(),
        x: template.x,
        y: template.y,
      });
      setComments((prev) => [...prev, created]);
      setThreadNote("");
    } catch (err) {
      setThreadSubmitError(err.message || "Could not save this note.");
    } finally {
      setThreadSubmitting(false);
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

  async function handleDelete(comment) {
    try {
      await deleteComment(token, comment.documentId);
      setComments((prev) => prev.filter((c) => c.documentId !== comment.documentId));
    } catch {
      // Leave the checklist as-is; the reviewer can retry the click.
    }
  }

  async function handleCleanupOrphaned() {
    const targets = comments.filter((c) => orphaned.has(c.documentId));
    if (!targets.length) return;
    const ok = window.confirm(
      `Delete ${targets.length} note${targets.length === 1 ? "" : "s"} whose element could not be found on this page?`
    );
    if (!ok) return;
    const ids = new Set(targets.map((c) => c.documentId));
    await Promise.allSettled(targets.map((c) => deleteComment(token, c.documentId)));
    setComments((prev) => prev.filter((c) => !ids.has(c.documentId)));
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

          <button
            type="button"
            className={`feedbackMenuItem${pinsVisible ? "" : " feedbackMenuItem--muted"}`}
            onClick={() => setPinsVisible((v) => !v)}
          >
            <span>Show pins on page</span>
            <span className="feedbackMenuItemState">{pinsVisible ? "On" : "Off"}</span>
          </button>

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
            className={`feedbackMenuItem${notesOpen ? " feedbackMenuItem--active" : ""}`}
            onClick={() => setNotesOpen((o) => !o)}
          >
            <span>Page notes</span>
            <span className="feedbackMenuItemState">{comments.length}</span>
          </button>

          {notesOpen && (
            <div className="feedbackMenuNotes">
              {orphaned.size > 0 && (
                <button type="button" className="feedbackNotesCleanup" onClick={handleCleanupOrphaned}>
                  Clean up {orphaned.size} orphaned
                </button>
              )}
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
                        <p className="feedbackNotesElement">
                          {c.elementLabel || "Selected element"}
                          {orphaned.has(c.documentId) && (
                            <span className="feedbackNotesOrphanBadge">Not found on page</span>
                          )}
                        </p>
                        <p className="feedbackNotesNote">{c.note}</p>
                        <p className="feedbackViewMeta">
                          {c.reviewerEmail}
                          {c.createdAt ? ` · ${new Date(c.createdAt).toLocaleDateString()}` : ""}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="feedbackNotesDelete"
                        aria-label="Delete note"
                        title="Delete note"
                        onClick={() => handleDelete(c)}
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      <div className="feedbackModeToggleWrap">
        <button
          type="button"
          className={`feedbackModeToggle${mode ? " feedbackModeToggle--on" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
        >
          Feedback{mode ? " · On" : ""}
        </button>
        {mode && (
          <button
            type="button"
            className="feedbackModeClose"
            aria-label="Turn off feedback mode"
            title="Turn off feedback mode"
            onClick={(e) => {
              e.stopPropagation();
              setMode(false);
            }}
          >
            &times;
          </button>
        )}
      </div>

      {pinsVisible &&
        createPortal(
          <div className="feedbackPinLayer" data-feedback-ui>
            {Array.from(anchorGroups.entries()).map(([key, group]) => {
              const openCount = group.filter((c) => c.status !== "resolved").length;
              if (openCount === 0) return null;
              const pos = pinPositions[key];
              if (!pos) return null;
              return (
                <div
                  key={key}
                  className="feedbackPin"
                  style={{ left: pos.left, top: pos.top }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewing({ key, clientX: e.clientX, clientY: e.clientY });
                  }}
                >
                  {openCount}
                </div>
              );
            })}
          </div>,
          document.body
        )}

      {mode &&
        hover &&
        !pending &&
        !viewing &&
        createPortal(
          <div
            className="feedbackHoverHighlight"
            data-feedback-ui
            style={{ left: hover.left, top: hover.top, width: hover.width, height: hover.height }}
          >
            <span className="feedbackHoverHighlightLabel">{hover.label}</span>
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
        viewingGroup.length > 0 &&
        createPortal(
          <div className="feedbackPopoverBackdrop" data-feedback-ui onClick={() => setViewing(null)}>
            <div
              className="feedbackPopover feedbackViewPopover"
              style={{ left: viewing.clientX, top: viewing.clientY }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="feedbackPopoverLabel">{viewingGroup[0].elementLabel || "Selected element"}</p>
              <ul className="feedbackThreadList">
                {viewingGroup.map((c) => (
                  <li
                    key={c.documentId}
                    className={`feedbackNotesItem${c.status === "resolved" ? " feedbackNotesItem--done" : ""}`}
                  >
                    <label className="feedbackNotesCheck">
                      <input
                        type="checkbox"
                        checked={c.status === "resolved"}
                        onChange={() => handleToggleStatus(c)}
                      />
                    </label>
                    <div className="feedbackNotesBody">
                      <p className="feedbackNotesNote">{c.note}</p>
                      <p className="feedbackViewMeta">
                        {c.reviewerEmail}
                        {c.createdAt ? ` · ${new Date(c.createdAt).toLocaleDateString()}` : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="feedbackNotesDelete"
                      aria-label="Delete note"
                      title="Delete note"
                      onClick={() => handleDelete(c)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>

              <form className="feedbackThreadAddForm" onSubmit={(e) => handleAddToThread(e, viewingGroup[0])}>
                <textarea
                  placeholder="Add another note on this element…"
                  value={threadNote}
                  onChange={(e) => setThreadNote(e.target.value)}
                  rows={2}
                />
                {threadSubmitError && <p className="feedbackAuthError">{threadSubmitError}</p>}
                <div className="feedbackPopoverActions">
                  <button type="button" className="feedbackLinkButton" onClick={() => setViewing(null)}>
                    Close
                  </button>
                  <button type="submit" className="btn" disabled={threadSubmitting || !threadNote.trim()}>
                    {threadSubmitting ? "Saving…" : "Add note"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
