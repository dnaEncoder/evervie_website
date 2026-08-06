export function hashString(input) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

const BLOCK_SELECTOR = "h1,h2,h3,h4,h5,p,li,blockquote,figcaption";

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
    blocks.push({ anchorId, tag, text, index });
    index += 1;
  }

  return blocks;
}
