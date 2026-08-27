// Shared SEO route metadata. Plain ESM, no React/DOM/Node-only APIs —
// imported both by the Vite client bundle (src/App.jsx) and directly by
// server.js on the production host. Keep it dependency-free.

export const SITE_URL = "https://everviehealth.in";
export const SITE_NAME = "Evervie";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/evervie-logo.png`;

export const DEFAULT_META = {
  title: "Evervie | Specialty Healthcare Platforms",
  description:
    "Evervie builds and scales specialty healthcare platforms across renal care, oncology, and diagnostics, expanding access to quality care across the globe.",
  ogType: "website",
};

// path -> { title, description, ogType?, noindex?, canonicalPath? }
export const STATIC_ROUTES = {
  "/": {
    title: "Evervie | Specialty Healthcare Platforms",
    description:
      "Evervie builds and scales specialty healthcare platforms across renal care, oncology, and diagnostics, expanding access to quality care across the globe.",
  },
  "/editorial": {
    title: "Evervie | Specialty Healthcare Platforms",
    description:
      "Evervie builds and scales specialty healthcare platforms across renal care, oncology, and diagnostics, expanding access to quality care across the globe.",
    canonicalPath: "/",
  },
  "/about/who-we-are": {
    title: "Who We Are | Evervie",
    description:
      "Evervie is a healthcare group focused on expanding access, strengthening quality, and delivering specialty care at meaningful scale.",
  },
  "/about/leadership": {
    title: "Our Leadership | Evervie",
    description:
      "Meet the executive leadership and board of directors guiding Evervie's healthcare platforms with clinical expertise and long-term stewardship.",
  },
  "/about/mission-vision": {
    title: "Mission & Vision | Evervie",
    description:
      "Evervie's mission is to build healthcare platforms that deliver focused specialty care with consistency, trust, and long-term value.",
  },
  "/about/aspiration": {
    title: "Our Aspiration | Evervie",
    description:
      "Our ambition to transform healthcare and improve lives at meaningful scale across the communities Evervie serves.",
  },
  "/about/governance": {
    title: "Our Governance | Evervie",
    description:
      "The principles, practices, and oversight that ensure integrity, accountability, and trust across Evervie's healthcare platforms.",
  },
  "/portfolio/renal-care": {
    title: "Renal Care | 7Med — Evervie",
    description:
      "7Med delivers accessible, continuous, and specialty kidney care across India. Explore Evervie's renal care platform.",
  },
  "/portfolio/oncology": {
    title: "Oncology | Optimus Oncology — Evervie",
    description:
      "Optimus Oncology delivers coordinated, expert cancer care closer to home. Explore Evervie's oncology platform and radiation oncology network.",
  },
  "/portfolio/diagnostics": {
    title: "Diagnostics | Medilabs — Evervie",
    description:
      "Medilabs delivers precise pathology, radiology, and home-collection diagnostics. Explore Evervie's diagnostics platform.",
  },
  "/investor-centre": {
    title: "Investor Centre | Evervie",
    description:
      "Financial information, announcements, and investor presentations for Evervie's specialty healthcare platforms.",
  },
  "/investors/overview": {
    title: "Investor Centre | Evervie",
    description:
      "Financial information, announcements, and investor presentations for Evervie's specialty healthcare platforms.",
    canonicalPath: "/investor-centre",
  },
  "/investor-centre/investment-overview": {
    title: "Investment Overview | Evervie Investor Centre",
    description:
      "Explore Evervie's healthcare platform growth, strategy, and business progress across renal care, oncology, and diagnostics.",
  },
  "/investor-centre/financial-information": {
    title: "Financial Information | Evervie Investor Centre",
    description:
      "Access Evervie's financial reports, annual and quarterly disclosures, and corporate financial information.",
  },
  "/investor-centre/announcements": {
    title: "News & Announcements | Evervie Investor Centre",
    description:
      "Corporate announcements, investor updates, and news from Evervie's specialty healthcare platforms.",
  },
  "/investor-centre/presentations": {
    title: "Investor Presentations | Evervie Investor Centre",
    description:
      "Browse Evervie's business presentations, financial performance overview decks, and strategy documents.",
  },
  "/news-insights": {
    title: "News & Insights | Evervie",
    description:
      "News, perspectives, and updates from Evervie and across the specialty healthcare sector.",
  },
  "/careers": {
    title: "Careers | Evervie",
    description:
      "Explore open roles at Evervie and help build healthcare platforms that expand access, quality, and scale.",
  },
  "/connect": {
    title: "Connect | Evervie",
    description:
      "Get in touch with Evervie. Find our office addresses, email contacts, and phone numbers.",
  },
  "/feedback": {
    title: "Evervie",
    description: "Evervie",
    noindex: true,
  },
  "/feedback/verify": {
    title: "Evervie",
    description: "Evervie",
    noindex: true,
  },
  "/feedback/copy": {
    title: "Evervie",
    description: "Evervie",
    noindex: true,
  },
};

export const NEWS_ARTICLE_PATTERN = /^\/news-insights\/([^/]+)\/?$/;
export const CAREER_PATTERN = /^\/careers\/([^/]+)\/?$/;

export function getStaticMeta(pathname) {
  return STATIC_ROUTES[pathname] || null;
}

// Every static route worth listing in a sitemap (excludes noindex routes
// and routes that only exist as an alias/canonical redirect target).
export function getSitemapStaticPaths() {
  return Object.entries(STATIC_ROUTES)
    .filter(([, meta]) => !meta.noindex && !meta.canonicalPath)
    .map(([path]) => path);
}
