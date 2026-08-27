// Server-only sitemap.xml generator: static routes plus a live-fetched
// list of published blog-post and career-opening slugs from Strapi.

import { SITE_URL, getSitemapStaticPaths } from "./routes.js";

const STRAPI_URL = process.env.VITE_STRAPI_URL || "https://admin.everviehealth.in";
const STRAPI_TIMEOUT_MS = 3000;

async function strapiFetchJson(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), STRAPI_TIMEOUT_MS);
  try {
    const response = await fetch(`${STRAPI_URL}${path}`, { signal: controller.signal });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchAllSlugs(resource) {
  const query = [`fields[0]=slug`, `pagination[pageSize]=200`, `status=published`].join("&");
  const json = await strapiFetchJson(`/api/${resource}?${query}`);
  const data = json?.data;
  if (!Array.isArray(data)) return [];
  return data.map((item) => item.slug).filter(Boolean);
}

function urlEntry(loc) {
  return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
}

export async function generateSitemap() {
  const staticEntries = getSitemapStaticPaths().map((path) => urlEntry(`${SITE_URL}${path}`));

  const [newsSlugs, careerSlugs] = await Promise.all([
    fetchAllSlugs("blog-posts"),
    fetchAllSlugs("career-openings"),
  ]);

  const newsEntries = newsSlugs.map((slug) => urlEntry(`${SITE_URL}/news-insights/${slug}`));
  const careerEntries = careerSlugs.map((slug) => urlEntry(`${SITE_URL}/careers/${slug}`));

  const entries = [...staticEntries, ...newsEntries, ...careerEntries].join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}
