const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

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

function mapCareerOpening(job) {
  return {
    id: job.documentId,
    title: job.title,
    slug: job.slug,
    department: job.department,
    location: job.location,
    employmentType: job.employmentType,
    workArrangement: job.workArrangement,
    experienceLevel: job.experienceLevel,
    datePosted: job.datePosted,
    applicationDeadline: job.applicationDeadline,
    roleOverview: job.roleOverview,
    responsibilities: job.responsibilities,
    requiredQualifications: job.requiredQualifications,
    preferredQualifications: job.preferredQualifications,
    whatEvervieOffers: job.whatEvervieOffers,
    applyUrl: job.applyUrl,
  };
}

async function fetchSingleCareerOpening(query) {
  const data = await strapiFetch(`/api/career-openings?${query}`);
  const first = (data ?? [])[0];
  return first ? mapCareerOpening(first) : null;
}

export async function getCareerOpenings({ page = 1, pageSize = 8, department, location, search } = {}) {
  const filters = [];
  if (department) filters.push(`filters[department][$eq]=${encodeURIComponent(department)}`);
  if (location) filters.push(`filters[location][$eq]=${encodeURIComponent(location)}`);
  if (search) {
    filters.push(`filters[$or][0][title][$containsi]=${encodeURIComponent(search)}`);
    filters.push(`filters[$or][1][department][$containsi]=${encodeURIComponent(search)}`);
    filters.push(`filters[$or][2][location][$containsi]=${encodeURIComponent(search)}`);
  }
  const query = [
    ...filters,
    `sort[0]=sortPriority:asc`,
    `sort[1]=datePosted:desc`,
    `pagination[page]=${page}`,
    `pagination[pageSize]=${pageSize}`,
    `status=published`,
  ].join("&");
  const { data, meta } = await strapiFetchWithMeta(`/api/career-openings?${query}`);
  return { items: (data ?? []).map(mapCareerOpening), pagination: meta?.pagination };
}

export async function getCareerOpeningBySlug(slug) {
  const query = [
    `filters[slug][$eq]=${encodeURIComponent(slug)}`,
    `pagination[pageSize]=1`,
    `status=published`,
  ].join("&");
  return fetchSingleCareerOpening(query);
}

export async function getRelatedOpenings(job, limit = 3) {
  if (!job) return [];
  const { items } = await getCareerOpenings({ department: job.department, pageSize: limit + 1 });
  return items.filter((item) => item.id !== job.id).slice(0, limit);
}

export async function getCareerFacets() {
  const query = [
    `fields[0]=department`,
    `fields[1]=location`,
    `pagination[pageSize]=200`,
    `status=published`,
  ].join("&");
  const data = await strapiFetch(`/api/career-openings?${query}`);
  const items = data ?? [];

  const activeDepartments = new Set();
  const activeLocations = new Set();

  items.forEach((item) => {
    if (item.department) activeDepartments.add(item.department);
    if (item.location) activeLocations.add(item.location);
  });

  return { activeDepartments, activeLocations };
}
