# Strapi CMS Migration Plan: Notices & Announcements

> **Purpose**: This guide outlines the work completed on the frontend for Evervie's Notices & Announcements, documents all scraped and static document files, and provides step-by-step instructions for an external SSH agent to migrate all announcement data directly into the Strapi CMS backend.

---

## 1. Overview of What Has Been Done

1. **Scraped Historical Announcements (2016 – 2025)**:
   - Scraped **163 notices, AGM outcomes, board meeting intimations, and stock exchange disclosures** from [pvpglobal.com/notices-announcements](https://www.pvpglobal.com/notices-announcements/).
   - Parsed titles, financial years, ISO publication dates, and original PDF URLs.

2. **Added 2026 AGM Disclosures**:
   - Included 2 recent 2026 local PDFs currently in the `/public/` directory:
     - `Scrutinizer Report - 35th Annual General Meeting` (`/Scrutinizer_Report.pdf`)
     - `Notice of the 35th Annual General Meeting` (`/Notice_of_the_35th_Annual_General_Meeting.pdf`)

3. **Frontend Integration (Temporary Fallback)**:
   - Compiled all 165 records into [`src/lib/announcementsData.js`](file:///Users/suhasmuttamsetty/Desktop/Website%20Projects/Evervie_website/src/lib/announcementsData.js) and [`scraped_notices_announcements.json`](file:///Users/suhasmuttamsetty/Desktop/Website%20Projects/Evervie_website/scraped_notices_announcements.json).
   - Configured [`src/lib/investorApi.js`](file:///Users/suhasmuttamsetty/Desktop/Website%20Projects/Evervie_website/src/lib/investorApi.js) so that if Strapi returns empty or unreachable results, the UI seamlessly falls back to the full dataset.

---

## 2. Where to Find the Announcement Data & Files

All scraped datasets and local files are stored in the project workspace:

| Document / Dataset | File Location | Description |
| :--- | :--- | :--- |
| **Complete Scraped Dataset (JSON)** | [`scraped_notices_announcements.json`](file:///Users/suhasmuttamsetty/Desktop/Website%20Projects/Evervie_website/scraped_notices_announcements.json) | 163 scraped records (2016–2025) with `id`, `title`, `category`, `financialYear`, `publicationDate`, `documentUrl`, `fileType`, `fileSizeLabel`. |
| **Full Export Array (JS)** | [`src/lib/announcementsData.js`](file:///Users/suhasmuttamsetty/Desktop/Website%20Projects/Evervie_website/src/lib/announcementsData.js) | Combined 165 records array (2016–2026) exported as `ALL_ANNOUNCEMENTS`. |
| **2026 AGM Notice PDF** | [`public/Notice_of_the_35th_Annual_General_Meeting.pdf`](file:///Users/suhasmuttamsetty/Desktop/Website%20Projects/Evervie_website/public/Notice_of_the_35th_Annual_General_Meeting.pdf) | Local PDF file for the 35th AGM Notice (505 KB). |
| **2026 Scrutinizer Report PDF** | [`public/Scrutinizer_Report.pdf`](file:///Users/suhasmuttamsetty/Desktop/Website%20Projects/Evervie_website/public/Scrutinizer_Report.pdf) | Local PDF file for the 35th AGM Scrutinizer Report (24 MB). |
| **Other Investor Documents (JSON)** | [`all_pvp_investor_documents.json`](file:///Users/suhasmuttamsetty/Desktop/Website%20Projects/Evervie_website/all_pvp_investor_documents.json) | Historical Annual Reports & Shareholding Patterns (2009–2026). |

---

## 3. Strapi Schema Target (`financial-documents`)

When inserting records into Strapi CMS via the REST API or node script, use the **`financial-document`** Content Type.

### Field Mapping Reference

| Frontend Key | Strapi API Field | Type | Example Value |
| :--- | :--- | :--- | :--- |
| `title` | `title` | String (Required) | `"NOTICE FOR 34TH ANNUAL GENERAL MEETING"` |
| `category` | `category` | String/Enumeration | `"notice-announcement"` |
| `financialYear` | `financialYear` | String | `"2025"` or `"2024"` |
| `publicationDate` | `publicationDate` | DateTime (ISO 8601) | `"2025-09-01T00:00:00.000Z"` |
| `externalUrl` / `documentUrl` | `externalUrl` | String (URL) | `"https://www.pvpglobal.com/wp-content/uploads/2025/09/Intimationnoticepvpfinalsigned.pdf"` |
| `documentFile` | `documentFile` | Media / Relation | Attached Strapi Media file (for local PDFs like 2026 AGM Notice) |
| `fileType` | `fileType` | String | `"PDF"` |
| `showOnInvestorCentre` | `showOnInvestorCentre` | Boolean | `true` |
| `publishedAt` | `publishedAt` | DateTime / Status | Publish entry immediately (`status="published"`) |

---

## 4. Step-by-Step Instructions for SSH / Strapi Agent

To migrate these announcements directly into Strapi, the SSH agent should follow these steps on the Strapi backend server:

### Step 1: Upload Local PDFs to Strapi Media Library
Upload the two local PDF files located in `/public/`:
1. `Notice_of_the_35th_Annual_General_Meeting.pdf`
2. `Scrutinizer_Report.pdf`

Note down their Strapi `documentId` or media upload `id`s.

### Step 2: Ingest Scraped Announcements via Strapi REST API or Direct Seeding Script

Run a Node.js or Python seeding script on the server using Strapi's API endpoint:
`POST /api/financial-documents`

#### Sample Python Seeding Script
```python
import json
import urllib.request

STRAPI_API_URL = "http://localhost:1337/api/financial-documents" # Adjust port/host as needed
API_TOKEN = "YOUR_STRAPI_API_TOKEN" # Optional API token if auth enabled

with open("scraped_notices_announcements.json", "r") as f:
    items = json.load(f)

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_TOKEN}"
}

for item in items:
    payload = {
        "data": {
            "title": item["title"],
            "category": "notice-announcement",
            "financialYear": item["financialYear"],
            "publicationDate": item["publicationDate"],
            "externalUrl": item["documentUrl"],
            "fileType": item.get("fileType", "PDF"),
            "fileSizeLabel": item.get("fileSizeLabel", "PDF"),
            "showOnInvestorCentre": True,
            "publishedAt": item["publicationDate"]
        }
    }
    
    req = urllib.request.Request(
        STRAPI_API_URL, 
        data=json.dumps(payload).encode("utf-8"), 
        headers=headers, 
        method="POST"
    )
    
    try:
        res = urllib.request.urlopen(req)
        print(f"Created: {item['title']}")
    except Exception as e:
        print(f"Error creating {item['title']}: {e}")
```

### Step 3: Shift Non-CMS Governance Policies to Strapi
In addition to announcements, the static governance policies currently listed in [`src/App.jsx`](file:///Users/suhasmuttamsetty/Desktop/Website%20Projects/Evervie_website/src/App.jsx#L4544) (`GOVERNANCE_POLICY_DOCS`) can also be added as entries under the category `governance-policy` in Strapi so all compliance documents are managed dynamically through the CMS.

---

## 5. Verification Checklist

- [ ] Execute Strapi seeding script to populate all 165 `financial-document` entries.
- [ ] Confirm entries appear under Content Manager -> Financial Documents in Strapi Admin.
- [ ] Test API endpoint `GET /api/financial-documents?filters[category][$eq]=notice-announcement&pagination[pageSize]=500` returns all entries.
- [ ] On the frontend, verify that the Announcements page displays entries dynamically from Strapi without hitting fallbacks.
