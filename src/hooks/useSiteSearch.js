import { useEffect, useState } from "react";

import { STATIC_ROUTES, getSitemapStaticPaths } from "../../seo/routes.js";
import { getBlogPosts } from "../lib/newsApi.js";
import { searchFinancialDocuments, searchInvestorNews, searchInvestorEvents } from "../lib/investorApi.js";

const EVENT_TYPE_LABELS = {
  results: "Results",
  "earnings-call": "Earnings Call",
  "analyst-meeting": "Analyst Meeting",
  "investor-meeting": "Investor Meeting",
  agm: "Annual General Meeting",
  conference: "Conference",
  webcast: "Webcast",
  other: "Other",
};

function formatDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function searchPages(query) {
  const q = query.toLowerCase();
  return getSitemapStaticPaths()
    .map((path) => ({ path, meta: STATIC_ROUTES[path] }))
    .filter(({ meta }) => {
      const title = (meta?.title || "").toLowerCase();
      const description = (meta?.description || "").toLowerCase();
      return title.includes(q) || description.includes(q);
    })
    .slice(0, 6)
    .map(({ path, meta }) => ({
      id: `page-${path}`,
      title: (meta?.title || path).replace(/\s*\|\s*Evervie$/, ""),
      snippet: meta?.description,
      href: path,
      external: false,
    }));
}

async function searchNewsAndEvents(query) {
  const [blogResult, events] = await Promise.all([
    getBlogPosts({ search: query, pageSize: 5 }).catch(() => ({ items: [] })),
    searchInvestorEvents(query, 4).catch(() => []),
  ]);

  const articles = (blogResult?.items || []).map((post) => ({
    id: `article-${post.id}`,
    title: post.title,
    snippet: post.subtitle,
    meta: formatDate(post.publicationDate),
    href: `/news-insights/${post.slug}`,
    external: false,
  }));

  const eventResults = events.map((event) => ({
    id: `event-${event.id}`,
    title: event.title,
    snippet: EVENT_TYPE_LABELS[event.eventType] || event.eventType,
    meta: formatDate(event.startAt),
    href: "/investor-centre/announcements",
    external: false,
  }));

  return [...articles, ...eventResults];
}

async function searchReports(query) {
  const docs = await searchFinancialDocuments(query, 5).catch(() => []);
  return docs.map((doc) => ({
    id: `report-${doc.id}`,
    title: doc.title,
    snippet: [doc.financialYear, doc.reportingPeriod].filter(Boolean).join(" · "),
    href: `/investor-centre/financial-information?category=${encodeURIComponent(doc.category)}`,
    external: false,
  }));
}

async function searchAnnouncements(query) {
  const items = await searchInvestorNews(query, 5).catch(() => []);
  return items.map((item) => ({
    id: `announcement-${item.id}`,
    title: item.title,
    snippet: item.excerpt,
    meta: formatDate(item.publicationDate),
    href: item.externalUrl || "/investor-centre/announcements",
    external: !!item.externalUrl,
  }));
}

// Debounced, category-split site search: static pages searched client-side,
// investor content (reports, news-articles, events) and blog posts searched
// live against Strapi. Self-contained (owns its own state/effects), mirroring
// the useDownloadGate() modal-hook pattern already used in src/App.jsx.
export function useSiteSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [groups, setGroups] = useState({ pages: [], reports: [], newsEvents: [], announcements: [] });

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 350);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setStatus("idle");
      setGroups({ pages: [], reports: [], newsEvents: [], announcements: [] });
      return;
    }

    let cancelled = false;
    setStatus("loading");

    Promise.allSettled([
      Promise.resolve(searchPages(debouncedQuery)),
      searchReports(debouncedQuery),
      searchNewsAndEvents(debouncedQuery),
      searchAnnouncements(debouncedQuery),
    ]).then(([pages, reports, newsEvents, announcements]) => {
      if (cancelled) return;
      setGroups({
        pages: pages.status === "fulfilled" ? pages.value : [],
        reports: reports.status === "fulfilled" ? reports.value : [],
        newsEvents: newsEvents.status === "fulfilled" ? newsEvents.value : [],
        announcements: announcements.status === "fulfilled" ? announcements.value : [],
      });
      setStatus("loaded");
    });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return { query, setQuery, status, groups };
}
