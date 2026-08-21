export async function submitDownloadLead({ name, email, company, documentSlug, documentTitle, documentCategory }) {
  let response;
  try {
    response = await fetch("/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, documentSlug, documentTitle, documentCategory }),
    });
  } catch (err) {
    throw new Error(`Could not reach server: ${err.message}`);
  }

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    const message = json?.error?.message || `Server returned ${response.status}`;
    throw new Error(message);
  }
  return json.lead;
}
