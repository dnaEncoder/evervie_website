import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useFeedbackSession } from "./FeedbackSessionContext.jsx";
import { createComment, listPageComments } from "../lib/feedbackApi.js";
import { assignSectionIds, extractTextBlocks } from "./TextExtractor.js";
import { FEEDBACK_TRACKED_PAGES } from "../App.jsx";

function OffscreenExtractor({ page, onExtracted }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    let settled = false;
    let debounceTimer = null;
    const hardTimeout = setTimeout(finish, 4000);

    function finish() {
      if (settled) return;
      settled = true;
      clearTimeout(hardTimeout);
      clearTimeout(debounceTimer);
      observer.disconnect();
      assignSectionIds(el);
      onExtracted(extractTextBlocks(el, page.path));
    }

    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(finish, 400);
    });
    observer.observe(el, { childList: true, subtree: true, characterData: true });
    debounceTimer = setTimeout(finish, 400);

    return () => {
      settled = true;
      clearTimeout(hardTimeout);
      clearTimeout(debounceTimer);
      observer.disconnect();
    };
  }, [page, onExtracted]);

  return createPortal(
    <div
      ref={containerRef}
      style={{ position: "absolute", left: "-9999px", top: 0, width: "1200px", pointerEvents: "none" }}
    >
      <page.Component />
    </div>,
    document.body
  );
}

function groupBlocksBySection(blocks) {
  const groups = [];
  const bySection = new Map();
  for (const block of blocks) {
    const key = block.sectionId || "other";
    let group = bySection.get(key);
    if (!group) {
      group = { sectionId: block.sectionId, sectionLabel: block.sectionLabel, blocks: [] };
      bySection.set(key, group);
      groups.push(group);
    }
    group.blocks.push(block);
  }
  return groups;
}

function PageOutline({ page, token }) {
  const [blocks, setBlocks] = useState(null);
  const [comments, setComments] = useState([]);
  const [noteDrafts, setNoteDrafts] = useState({});
  const [submittingId, setSubmittingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    listPageComments(token, page.path)
      .then((list) => {
        if (!cancelled) setComments(list.filter((c) => c.mode === "copy"));
      })
      .catch(() => {
        if (!cancelled) setComments([]);
      });
    return () => {
      cancelled = true;
    };
  }, [token, page.path]);

  async function handleSubmit(block) {
    const note = (noteDrafts[block.anchorId] || "").trim();
    if (!note) return;
    setSubmittingId(block.anchorId);
    try {
      const created = await createComment(token, {
        pagePath: page.path,
        pageLabel: page.label,
        mode: "copy",
        anchorId: block.anchorId,
        textSnapshot: block.text.slice(0, 160),
        note,
      });
      setComments((prev) => [...prev, created]);
      setNoteDrafts((prev) => ({ ...prev, [block.anchorId]: "" }));
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err.message || "Could not save this note.");
    } finally {
      setSubmittingId(null);
    }
  }

  if (blocks === null) {
    return (
      <>
        <OffscreenExtractor page={page} onExtracted={setBlocks} />
        <p>Loading copy…</p>
      </>
    );
  }

  if (blocks.length === 0) {
    return <p>No copy blocks found on this page.</p>;
  }

  const groups = groupBlocksBySection(blocks);
  let sectionNumber = 0;

  return (
    <div>
      {groups.map((group) => {
        const number = group.sectionId ? ++sectionNumber : null;
        return (
          <div className="feedbackSectionGroup" key={group.sectionId || "other"}>
            <p className="feedbackSectionGroupHeader">
              {number != null && <span className="feedbackSectionNumber">{number}.</span>}
              {group.sectionLabel}
            </p>

            {group.blocks.map((block) => {
              const threadComments = comments.filter((c) => c.anchorId === block.anchorId);
              return (
                <div className="feedbackOutlineBlock" key={block.anchorId}>
                  <p className="feedbackOutlineTag">{block.tag}</p>
                  <p className="feedbackOutlineText">{block.text}</p>

                  {threadComments.length > 0 && (
                    <div className="feedbackCommentThread">
                      {threadComments.map((c) => (
                        <div className="feedbackCommentItem" key={c.documentId}>
                          <p className="feedbackCommentMeta">
                            {c.reviewerEmail} · {new Date(c.createdAt).toLocaleDateString()}
                          </p>
                          {c.note}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="feedbackOutlineForm">
                    <textarea
                      placeholder="Suggest a copy change…"
                      value={noteDrafts[block.anchorId] || ""}
                      onChange={(e) =>
                        setNoteDrafts((prev) => ({ ...prev, [block.anchorId]: e.target.value }))
                      }
                    />
                    <button
                      type="button"
                      className="btn"
                      disabled={submittingId === block.anchorId || !(noteDrafts[block.anchorId] || "").trim()}
                      onClick={() => handleSubmit(block)}
                    >
                      {submittingId === block.anchorId ? "Saving…" : "Save"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function FeedbackCopyTracker() {
  const { isAuthed, token } = useFeedbackSession();
  const [openPath, setOpenPath] = useState(null);

  if (!isAuthed) {
    return (
      <div className="feedbackAuthPage">
        <div className="feedbackAuthCard">
          <p className="eyebrow">Evervie feedback</p>
          <h1>Log in to view the copy tracker</h1>
          <p>You need an active feedback session to leave copy notes.</p>
          <div className="feedbackAuthActions">
            <Link className="btn" to="/feedback">
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feedbackTrackerAccordion">
      <p className="eyebrow">Evervie feedback</p>
      <h1>Copy tracker</h1>
      <p>Expand a page to see its copy top-to-bottom and leave wording notes on any block.</p>

      {FEEDBACK_TRACKED_PAGES.map((page) => {
        const isOpen = openPath === page.path;
        return (
          <div className="feedbackTrackerItem" key={page.path}>
            <button
              type="button"
              className="feedbackTrackerItemHeader"
              onClick={() => setOpenPath(isOpen ? null : page.path)}
            >
              <span>{page.label}</span>
              <span>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="feedbackTrackerItemBody">
                <PageOutline page={page} token={token} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
