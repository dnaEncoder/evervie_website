const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

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

function mapReport(doc) {
  return {
    id: doc.documentId,
    title: doc.title,
    category: doc.category,
    financialYear: doc.financialYear,
    reportingPeriod: doc.reportingPeriod,
    publicationDate: doc.publicationDate,
    coverImageUrl: mediaUrl(doc.coverImage),
    coverImageAlt: doc.title,
    documentUrl: mediaUrl(doc.documentFile),
    externalUrl: doc.externalUrl,
    fileType: doc.fileType,
    fileSizeLabel: doc.fileSizeLabel,
  };
}

function mapNews(article) {
  return {
    id: article.documentId,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    publicationDate: article.publicationDate,
    category: article.category,
    imageUrl: mediaUrl(article.featuredImage),
    imageAlt: article.imageAlt || article.title,
    externalUrl: article.externalUrl,
    isFeatured: !!article.isFeatured,
  };
}

function mapEvent(event) {
  const relatedDoc = event.relatedDocument;
  return {
    id: event.documentId,
    title: event.title,
    slug: event.slug,
    eventType: event.eventType,
    summary: event.summary,
    startAt: event.startAt,
    endAt: event.endAt,
    timezone: event.timezone,
    attendanceMode: event.attendanceMode,
    venue: event.venue,
    webcastUrl: event.webcastUrl,
    registrationUrl: event.registrationUrl,
    isFeatured: !!event.isFeatured,
    relatedDocument: relatedDoc
      ? {
          title: relatedDoc.title,
          documentUrl: mediaUrl(relatedDoc.documentFile),
          externalUrl: relatedDoc.externalUrl,
          fileType: relatedDoc.fileType,
        }
      : null,
  };
}

export async function getInvestorCentrePage() {
  const data = await strapiFetch(
    "/api/investor-centre-page?populate[navigationItems]=true&status=published"
  );
  return data ?? null;
}

export async function getFinancialDocuments(category, limit = 5) {
  const query = [
    `filters[category][$eq]=${encodeURIComponent(category)}`,
    `filters[showOnInvestorCentre][$eq]=true`,
    `sort[0]=sortPriority:asc`,
    `sort[1]=publicationDate:desc`,
    `pagination[pageSize]=${limit}`,
    `populate[coverImage]=true`,
    `populate[documentFile]=true`,
    `status=published`,
  ].join("&");
  const data = await strapiFetch(`/api/financial-documents?${query}`);
  return (data ?? []).map(mapReport);
}

export async function getLatestInvestorNews(limit = 3) {
  const query = [
    `filters[showOnInvestorCentre][$eq]=true`,
    `sort[0]=publicationDate:desc`,
    `pagination[pageSize]=${limit}`,
    `populate[featuredImage]=true`,
    `status=published`,
  ].join("&");
  const data = await strapiFetch(`/api/news-articles?${query}`);
  return (data ?? []).map(mapNews);
}

export async function getUpcomingInvestorEvents(limit = 3) {
  const query = [
    `filters[showOnInvestorCentre][$eq]=true`,
    `filters[startAt][$gte]=${encodeURIComponent(new Date().toISOString())}`,
    `sort[0]=startAt:asc`,
    `pagination[pageSize]=${limit}`,
    `populate[relatedDocument][populate][documentFile]=true`,
    `status=published`,
  ].join("&");
  const data = await strapiFetch(`/api/investor-events?${query}`);
  return (data ?? []).map(mapEvent);
}

export async function getFeaturedNews(limit = 5) {
  const query = [
    `filters[showOnInvestorCentre][$eq]=true`,
    `filters[isFeatured][$eq]=true`,
    `sort[0]=publicationDate:desc`,
    `pagination[pageSize]=${limit}`,
    `populate[featuredImage]=true`,
    `status=published`,
  ].join("&");
  const data = await strapiFetch(`/api/news-articles?${query}`);
  return (data ?? []).map(mapNews);
}

export async function getFeaturedPastEvents(limit = 5) {
  const query = [
    `filters[showOnInvestorCentre][$eq]=true`,
    `filters[isFeatured][$eq]=true`,
    `filters[startAt][$lt]=${encodeURIComponent(new Date().toISOString())}`,
    `sort[0]=startAt:desc`,
    `pagination[pageSize]=${limit}`,
    `populate[relatedDocument][populate][documentFile]=true`,
    `status=published`,
  ].join("&");
  const data = await strapiFetch(`/api/investor-events?${query}`);
  return (data ?? []).map(mapEvent);
}

export async function getPastInvestorEvents({ page = 1, pageSize = 8, eventType, year, search } = {}) {
  const filters = [
    `filters[showOnInvestorCentre][$eq]=true`,
    `filters[startAt][$lt]=${encodeURIComponent(new Date().toISOString())}`,
  ];
  if (eventType) filters.push(`filters[eventType][$eq]=${encodeURIComponent(eventType)}`);
  if (year) {
    filters.push(`filters[startAt][$gte]=${encodeURIComponent(`${year}-01-01T00:00:00.000Z`)}`);
    filters.push(`filters[startAt][$lte]=${encodeURIComponent(`${year}-12-31T23:59:59.999Z`)}`);
  }
  if (search) {
    filters.push(`filters[$or][0][title][$containsi]=${encodeURIComponent(search)}`);
    filters.push(`filters[$or][1][summary][$containsi]=${encodeURIComponent(search)}`);
  }
  const query = [
    ...filters,
    `sort[0]=startAt:desc`,
    `pagination[page]=${page}`,
    `pagination[pageSize]=${pageSize}`,
    `populate[relatedDocument][populate][documentFile]=true`,
    `status=published`,
  ].join("&");
  const { data, meta } = await strapiFetchWithMeta(`/api/investor-events?${query}`);
  return { items: (data ?? []).map(mapEvent), pagination: meta?.pagination };
}

export async function searchFinancialDocuments(query, limit = 5) {
  const params = [
    `filters[showOnInvestorCentre][$eq]=true`,
    `filters[title][$containsi]=${encodeURIComponent(query)}`,
    `sort[0]=publicationDate:desc`,
    `pagination[pageSize]=${limit}`,
    `populate[documentFile]=true`,
    `status=published`,
  ].join("&");
  const data = await strapiFetch(`/api/financial-documents?${params}`);
  return (data ?? []).map(mapReport);
}

export async function searchInvestorNews(query, limit = 5) {
  const params = [
    `filters[showOnInvestorCentre][$eq]=true`,
    `filters[$or][0][title][$containsi]=${encodeURIComponent(query)}`,
    `filters[$or][1][excerpt][$containsi]=${encodeURIComponent(query)}`,
    `sort[0]=publicationDate:desc`,
    `pagination[pageSize]=${limit}`,
    `populate[featuredImage]=true`,
    `status=published`,
  ].join("&");
  const data = await strapiFetch(`/api/news-articles?${params}`);
  return (data ?? []).map(mapNews);
}

export async function searchInvestorEvents(query, limit = 4) {
  const params = [
    `filters[showOnInvestorCentre][$eq]=true`,
    `filters[$or][0][title][$containsi]=${encodeURIComponent(query)}`,
    `filters[$or][1][summary][$containsi]=${encodeURIComponent(query)}`,
    `sort[0]=startAt:desc`,
    `pagination[pageSize]=${limit}`,
    `populate[relatedDocument][populate][documentFile]=true`,
    `status=published`,
  ].join("&");
  const data = await strapiFetch(`/api/investor-events?${params}`);
  return (data ?? []).map(mapEvent);
}
