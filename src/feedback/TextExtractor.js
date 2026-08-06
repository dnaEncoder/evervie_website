export function hashString(input) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

const BLOCK_SELECTOR = "h1,h2,h3,h4,h5,p,li,blockquote,figcaption";
const HEADING_SELECTOR = "h1,h2,h3";

export function assignSectionIds(rootEl) {
  const sections = Array.from(rootEl.querySelectorAll("section"));
  sections.forEach((el, i) => {
    if (!el.id) el.id = `fbsec-${i}`;
  });
}

function sectionInfoFor(node) {
  const sectionEl = node.closest("section");
  if (!sectionEl) return { sectionId: null, sectionLabel: "Other" };

  const heading = sectionEl.querySelector(HEADING_SELECTOR);
  const sectionLabel = heading ? heading.textContent.replace(/\s+/g, " ").trim().slice(0, 120) : "Untitled section";
  return { sectionId: sectionEl.id || null, sectionLabel };
}

export function extractTextBlocks(containerEl, pagePath) {
  const nodes = Array.from(containerEl.querySelectorAll(BLOCK_SELECTOR));
  const blocks = [];
  let index = 0;

  for (const node of nodes) {
    if (node.closest("header, footer")) continue;
    if (node.querySelector(BLOCK_SELECTOR)) continue; // skip containers that hold their own blocks (e.g. li > p)

    const text = node.textContent.replace(/\s+/g, " ").trim();
    if (!text) continue;

    const tag = node.tagName.toLowerCase();
    const anchorId = hashString(`${pagePath}|${tag}|${index}|${text.slice(0, 80)}`);
    const { sectionId, sectionLabel } = sectionInfoFor(node);
    blocks.push({ anchorId, tag, text, index, sectionId, sectionLabel });
    index += 1;
  }

  return blocks;
}
