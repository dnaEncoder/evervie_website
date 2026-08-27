import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { SITE_URL, DEFAULT_META, STATIC_ROUTES } from "../../seo/routes.js";

function setMetaTag(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function applyDocumentMeta({ title, description, canonicalPath }) {
  document.title = title;
  setMetaTag("description", description);
  setCanonical(`${SITE_URL}${canonicalPath}`);
}

// Keeps document.title/description/canonical in sync on client-side
// <Link> navigation, for every static route — dynamic news/career detail
// pages set their own meta once their fetched content resolves.
export function SeoSync() {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = STATIC_ROUTES[pathname];
    if (route) {
      applyDocumentMeta({
        title: route.title,
        description: route.description,
        canonicalPath: route.canonicalPath || pathname,
      });
    } else if (!/^\/(news-insights|careers)\/[^/]+\/?$/.test(pathname)) {
      applyDocumentMeta({
        title: DEFAULT_META.title,
        description: DEFAULT_META.description,
        canonicalPath: pathname,
      });
    }
  }, [pathname]);

  return null;
}
