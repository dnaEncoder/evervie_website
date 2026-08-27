// Server-only SEO rendering: resolves per-request metadata (including a
// live Strapi lookup for dynamic news/career slugs) and injects it into
// the pre-built dist/index.html before it's sent to the client.
//
// Imported only by server.js (plain Node, no bundler) — uses global fetch
// (Node 18+) and process.env, not import.meta.env.

import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_META,
  STATIC_ROUTES,
  NEWS_ARTICLE_PATTERN,
  CAREER_PATTERN,
  getStaticMeta,
} from "./routes.js";

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

function mediaUrl(media) {
  const url = media?.url;
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(str, max) {
  if (!str || str.length <= max) return str;
  return `${str.slice(0, max - 1).trimEnd()}…`;
}

async function resolveNewsArticle(slug) {
  const query = [
    `filters[slug][$eq]=${encodeURIComponent(slug)}`,
    `populate[heroImage]=true`,
    `pagination[pageSize]=1`,
    `status=published`,
  ].join("&");
  const json = await strapiFetchJson(`/api/blog-posts?${query}`);
  const post = json?.data?.[0];
  if (!post) return null;

  const description = truncate(post.subtitle || stripHtml(post.body), 160);
  const image = mediaUrl(post.heroImage) || DEFAULT_OG_IMAGE;

  return {
    status: 200,
    title: `${post.title} | Evervie News & Insights`,
    description: description || DEFAULT_META.description,
    canonical: `${SITE_URL}/news-insights/${slug}`,
    ogType: "article",
    ogImage: image,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: description || undefined,
      image: image ? [image] : undefined,
      datePublished: post.publicationDate || undefined,
      author: post.author ? { "@type": "Person", name: post.author } : undefined,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE },
      },
      mainEntityOfPage: `${SITE_URL}/news-insights/${slug}`,
    },
  };
}

async function resolveCareerOpening(slug) {
  const query = [
    `filters[slug][$eq]=${encodeURIComponent(slug)}`,
    `pagination[pageSize]=1`,
    `status=published`,
  ].join("&");
  const json = await strapiFetchJson(`/api/career-openings?${query}`);
  const job = json?.data?.[0];
  if (!job) return null;

  const description = truncate(stripHtml(job.roleOverview), 160);

  return {
    status: 200,
    title: `${job.title} | Careers at Evervie`,
    description: description || DEFAULT_META.description,
    canonical: `${SITE_URL}/careers/${slug}`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: job.title,
      description: stripHtml(job.roleOverview) || job.title,
      datePosted: job.datePosted || undefined,
      validThrough: job.applicationDeadline || undefined,
      employmentType: job.employmentType
        ? job.employmentType.toUpperCase().replace(/[\s-]+/g, "_")
        : undefined,
      hiringOrganization: {
        "@type": "Organization",
        name: SITE_NAME,
        sameAs: SITE_URL,
        logo: DEFAULT_OG_IMAGE,
      },
      jobLocation: job.location
        ? {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "IN" },
          }
        : undefined,
    },
  };
}

export async function resolveMeta(pathname) {
  const staticMeta = getStaticMeta(pathname);
  if (staticMeta) {
    return {
      status: 200,
      title: staticMeta.title,
      description: staticMeta.description,
      canonical: `${SITE_URL}${staticMeta.canonicalPath || pathname}`,
      ogType: staticMeta.ogType || "website",
      ogImage: DEFAULT_OG_IMAGE,
      noindex: !!staticMeta.noindex,
      jsonLd: null,
    };
  }

  const newsMatch = pathname.match(NEWS_ARTICLE_PATTERN);
  if (newsMatch) {
    const resolved = await resolveNewsArticle(newsMatch[1]);
    if (resolved) return resolved;
    return notFoundMeta(pathname);
  }

  const careerMatch = pathname.match(CAREER_PATTERN);
  if (careerMatch) {
    const resolved = await resolveCareerOpening(careerMatch[1]);
    if (resolved) return resolved;
    return notFoundMeta(pathname);
  }

  return notFoundMeta(pathname);
}

function notFoundMeta(pathname) {
  return {
    status: 404,
    title: "Page Not Found | Evervie",
    description: DEFAULT_META.description,
    canonical: `${SITE_URL}${pathname}`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
    noindex: true,
    jsonLd: null,
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function injectMeta(html, meta) {
  const withTitle = html.replace(
    /<title>.*?<\/title>/s,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  const robots = meta.noindex ? "noindex, nofollow" : "index, follow";
  const description = escapeHtml(meta.description);
  const title = escapeHtml(meta.title);

  const headBlock = [
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${meta.canonical}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    `<meta property="og:image" content="${meta.ogImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${meta.ogImage}" />`,
    meta.jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  return withTitle.replace("<!--SEO_HEAD-->", headBlock);
}
