const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "/cms";

export function mediaUrl(media) {
  const url = media?.url;
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

async function strapiFetch(path) {
  const json = await strapiFetchJson(path);
  return json.data;
}

async function strapiFetchJson(path) {
  let response;
  try {
    response = await fetch(`${STRAPI_URL}${path}`);
  } catch (err) {
    throw new Error(`Could not reach the content server: ${err.message}`);
  }
  if (!response.ok) {
    throw new Error(`Content server returned ${response.status} for ${path}`);
  }
  return response.json();
}

async function strapiFetchWithMeta(path) {
  const json = await strapiFetchJson(path);
  return { data: json.data, meta: json.meta };
}

const SPOTLIGHT_TOPIC_TAG = "Original Research";

function splitTopics(topics) {
  return (topics || "")
    .split(",")
    .map((topic) => topic.trim())
    .filter(Boolean);
}

const SECTOR_ORDER = ["dialysis", "oncology", "diagnostics", "woman", "longevity"];
const HEALTHCARE_ORDER = ["vision loss", "how vision loss reshapes", "screening", "africa", "disability", "food assistance"];

function getCustomOrderRank(title, categoryKey) {
  const t = (title || "").toLowerCase();
  if (categoryKey === "sector-insights") {
    for (let i = 0; i < SECTOR_ORDER.length; i++) {
      if (t.includes(SECTOR_ORDER[i])) return i;
    }
    return 99;
  }
  if (categoryKey === "healthcare-insights") {
    for (let i = 0; i < HEALTHCARE_ORDER.length; i++) {
      if (t.includes(HEALTHCARE_ORDER[i])) return i;
    }
    return 99;
  }
  return 99;
}

function mapBlogPost(post) {
  let category = post.category;
  const titleLower = (post.title || "").toLowerCase();
  if (titleLower.includes("longevity") || titleLower.includes("woman")) {
    category = "sector-insights";
  }

  return {
    id: post.documentId,
    title: post.title,
    slug: post.slug,
    subtitle: post.subtitle,
    body: post.body,
    category,
    publicationDate: post.publicationDate,
    author: post.author,
    authorDesignation: post.authorDesignation,
    readingTimeLabel: post.readingTimeLabel,
    topics: splitTopics(post.topics),
    sourceReferences: post.sourceReferences,
    imageUrl: mediaUrl(post.heroImage),
    imageAlt: post.imageAlt || post.title,
    isHeroFeatured: !!post.isHeroFeatured,
    isFeatured: !!post.isFeatured,
    relatedArticles: Array.isArray(post.relatedArticles)
      ? post.relatedArticles.map(mapBlogPost)
      : undefined,
  };
}

async function fetchSingleBlogPost(query) {
  const data = await strapiFetch(`/api/blog-posts?${query}`);
  const first = (data ?? [])[0];
  return first ? mapBlogPost(first) : null;
}

export async function getHeroArticle() {
  const heroQuery = [
    `filters[isHeroFeatured][$eq]=true`,
    `sort[0]=publicationDate:desc`,
    `pagination[pageSize]=1`,
    `populate[heroImage]=true`,
    `status=published`,
  ].join("&");
  const hero = await fetchSingleBlogPost(heroQuery);
  if (hero) return hero;

  const featuredQuery = [
    `filters[isFeatured][$eq]=true`,
    `sort[0]=publicationDate:desc`,
    `pagination[pageSize]=1`,
    `populate[heroImage]=true`,
    `status=published`,
  ].join("&");
  const featured = await fetchSingleBlogPost(featuredQuery);
  if (featured) return featured;

  const latestQuery = [
    `sort[0]=publicationDate:desc`,
    `pagination[pageSize]=1`,
    `populate[heroImage]=true`,
    `status=published`,
  ].join("&");
  return fetchSingleBlogPost(latestQuery);
}

export async function getFeaturedInsights(limit = 3) {
  const query = [
    `filters[isFeatured][$eq]=true`,
    `sort[0]=sortPriority:asc`,
    `sort[1]=publicationDate:desc`,
    `pagination[pageSize]=${limit}`,
    `populate[heroImage]=true`,
    `status=published`,
  ].join("&");
  const data = await strapiFetch(`/api/blog-posts?${query}`);
  return (data ?? []).map(mapBlogPost);
}

export async function getResearchSpotlight(limit = 8) {
  const query = [
    `filters[topics][$containsi]=${encodeURIComponent(SPOTLIGHT_TOPIC_TAG)}`,
    `sort[0]=publicationDate:desc`,
    `pagination[pageSize]=${limit}`,
    `populate[heroImage]=true`,
    `status=published`,
  ].join("&");
  const data = await strapiFetch(`/api/blog-posts?${query}`);
  return (data ?? []).map(mapBlogPost);
}

export async function getBlogPosts({ page = 1, pageSize = 8, category, search } = {}) {
  // If specific category is requested, fetch all published posts to apply client-side re-tagging & sorting
  if (category === "sector-insights" || category === "healthcare-insights") {
    const query = [
      `pagination[pageSize]=100`,
      `populate[heroImage]=true`,
      `status=published`,
    ].join("&");
    const { data, meta } = await strapiFetchWithMeta(`/api/blog-posts?${query}`);
    let allMapped = (data ?? []).map(mapBlogPost);
    let filtered = allMapped.filter((item) => item.category === category);

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter((item) =>
        (item.title && item.title.toLowerCase().includes(s)) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(s)) ||
        (item.author && item.author.toLowerCase().includes(s))
      );
    }

    filtered.sort((a, b) => {
      const rankA = getCustomOrderRank(a.title, category);
      const rankB = getCustomOrderRank(b.title, category);
      if (rankA !== rankB) return rankA - rankB;
      return new Date(b.publicationDate || 0) - new Date(a.publicationDate || 0);
    });

    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);
    return {
      items: paginated,
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil(filtered.length / pageSize) || 1,
        total: filtered.length,
      },
    };
  }

  const filters = [];
  if (category) filters.push(`filters[category][$eq]=${encodeURIComponent(category)}`);
  if (search) {
    filters.push(`filters[$or][0][title][$containsi]=${encodeURIComponent(search)}`);
    filters.push(`filters[$or][1][subtitle][$containsi]=${encodeURIComponent(search)}`);
    filters.push(`filters[$or][2][topics][$containsi]=${encodeURIComponent(search)}`);
    filters.push(`filters[$or][3][author][$containsi]=${encodeURIComponent(search)}`);
  }
  const query = [
    ...filters,
    `sort[0]=sortPriority:asc`,
    `sort[1]=publicationDate:desc`,
    `pagination[page]=${page}`,
    `pagination[pageSize]=${pageSize}`,
    `populate[heroImage]=true`,
    `status=published`,
  ].join("&");
  const { data, meta } = await strapiFetchWithMeta(`/api/blog-posts?${query}`);
  return { items: (data ?? []).map(mapBlogPost), pagination: meta?.pagination };
}

export async function getBlogPostBySlug(slug) {
  const query = [
    `filters[slug][$eq]=${encodeURIComponent(slug)}`,
    `populate[heroImage]=true`,
    `populate[relatedArticles][populate][heroImage]=true`,
    `pagination[pageSize]=1`,
    `status=published`,
  ].join("&");
  return fetchSingleBlogPost(query);
}

export async function getRelatedArticles(post, limit = 3) {
  if (!post) return [];
  if (post.relatedArticles && post.relatedArticles.length) {
    return post.relatedArticles.slice(0, limit);
  }
  const { items } = await getBlogPosts({ category: post.category, pageSize: limit + 1 });
  return items.filter((item) => item.id !== post.id).slice(0, limit);
}

export async function getBlogFacets() {
  const query = [
    `fields[0]=category`,
    `fields[1]=topics`,
    `pagination[pageSize]=200`,
    `status=published`,
  ].join("&");
  const data = await strapiFetch(`/api/blog-posts?${query}`);
  const items = data ?? [];

  const activeCategories = new Set();
  const topicCounts = new Map();

  items.forEach((item) => {
    if (item.category) activeCategories.add(item.category);
    splitTopics(item.topics).forEach((topic) => {
      if (topic === SPOTLIGHT_TOPIC_TAG) return;
      topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
    });
  });

  const popularTopics = Array.from(topicCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  return { activeCategories, popularTopics };
}
