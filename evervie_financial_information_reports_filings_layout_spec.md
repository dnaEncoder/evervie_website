# Evervie Financial Information Page
## Reports & Filings — Layout and Content Specification

## 1. Page Purpose

The Financial Information page should function as a clear, searchable document library for Evervie’s investor reports, financial results, statutory filings, and shareholder information.

The primary user journey is:

```text
Select a document category
→ find the relevant year or reporting period
→ review available documents
→ view or download the required file
```

The page should prioritise document discovery and access. It should not present financial performance charts, selected financial highlights, or interpreted financial data.

---

## 2. Overall Page Layout

Use a two-column page structure on desktop:

```text
[ Vertical category navigation ] [ Active document archive ]
```

Suggested proportions:

```text
Left navigation: 20–24%
Main content area: 76–80%
```

The left side acts as the permanent category navigator.

The right side displays the title, description, search tools, filters, and report list for the currently selected category.

The layout should feel like one continuous document library rather than a collection of individual cards.

---

## 3. Global Header

Use the existing Evervie website header.

The Investor Relations navigation item should appear active.

The page should sit within the following hierarchy:

```text
Home / Investor Relations / Financial Information
```

The global header and footer should follow the components already used across the Evervie website.

---

## 4. Left-Side Category Navigation

### Section introduction

At the top of the left column, include:

```text
Financial Information

Reports
& Filings
```

The first line identifies the parent section.

The larger title communicates the function of the page.

A divider should separate the title from the document categories.

### Category navigation

Display the financial-information categories vertically.

Current categories may include:

1. Annual Reports
2. Financial Results
3. Shareholding Pattern
4. Other Statutory Information
5. Subsidiary Companies
6. Communication to Shareholders
7. MGT 9 & Annual Return
8. Credit Rating
9. Postal Ballot
10. Notices & Announcements
11. Employee Stock Option Plan
12. Others

Each category row should contain:

```text
Icon
Category name
Optional arrow or document count
```

The complete row should be clickable.

The active category should have a clear selected state.

Avoid enclosing every category inside an individual card. Use spacing, alignment, an active indicator, and subtle dividers to structure the navigation.

### Sidebar behaviour

The sidebar should support a long category list without compressing the navigation.

Recommended behaviour:

- The category navigation may remain sticky while the document list scrolls.
- The category list may scroll independently when it exceeds the viewport height.
- Category names should wrap when necessary.
- Do not reduce the font size or row height to force all items into one viewport.

An optional help link can appear at the bottom:

```text
Need help finding something?

Contact Investor Relations
```

---

## 5. Active Category Header

The main content area begins with the currently selected category.

Example:

```text
Annual Reports
```

Below the heading, include a short category description.

Example:

```text
Explore Evervie’s annual reports for a comprehensive overview of performance, strategy, governance, and progress over the years.
```

Use a wide editorial heading area:

```text
[ Category title and description ] [ Search and filters ]
```

On narrower screens, the search and filters can move below the heading.

---

## 6. Search, Filter, and Sorting Controls

Place the controls near the top of the active archive.

The controls should only show options relevant to the selected category.

### Common controls

```text
Search documents
Financial year
Reporting period
Document type
Newest first / Oldest first
```

### Annual Reports controls

```text
Search reports
Financial year
Newest first / Oldest first
```

### Financial Results controls

```text
Search documents
Financial year
Quarter
Standalone / Consolidated
Audited / Unaudited
Newest first / Oldest first
```

### Shareholding Pattern controls

```text
Financial year
Quarter or reporting month
Newest first / Oldest first
```

### Notices and Announcements controls

```text
Search announcements
Announcement category
Date range
Newest first / Oldest first
```

Do not show unnecessary controls when the selected category contains only a small number of documents.

---

## 7. Document Archive Structure

Documents should appear vertically from newest to oldest.

Recommended hierarchy:

```text
Latest or featured document
Recent documents
Historical archive
```

Use two levels of presentation:

1. Expanded rows for the latest or most important reports
2. Compact rows for older reports

This prevents the page from becoming visually repetitive while keeping the full archive accessible.

---

## 8. Expanded Report Rows

Use larger editorial rows for the newest reports.

Recommended layout:

```text
[ Report thumbnail ] [ Report information ] [ View or download action ]
```

### Report thumbnail

The visual area may contain:

- Annual-report cover
- Uploaded report thumbnail
- PDF preview
- Generic document placeholder

The layout should still work when no thumbnail is available.

### Report information

Each expanded report may display:

```text
Latest or Featured label
Document title
Short description
Financial year
Reporting period
Publication date
File format
File size
Revision status, when relevant
```

Example:

```text
Latest

FY 2024–25 Annual Report

A comprehensive overview of Evervie’s performance,
strategy, governance, and progress.

Financial Year: 2024–25
Format: PDF
File Size: 11.2 MB
Published: 28 July 2025
```

Only display information that is available. Missing fields should be omitted rather than replaced with placeholder text.

### Report action

The action area can include:

```text
View Report
Download PDF
Open Filing
View on Exchange
```

The entire report row may be clickable, but the download action should remain clearly visible and accessible.

---

## 9. Compact Historical Report Rows

Older reports should use a simpler list structure.

Recommended layout:

```text
Document title | Financial year | Format | File size | Download
```

Example:

```text
FY 2021–22 Annual Report | 2021–22 | PDF | 7.6 MB | Download PDF
```

For categories that require more detail:

```text
Reporting period | Document title | Publication date | Format | Action
```

Use horizontal dividers between rows.

Do not place every historical report inside its own large card.

---

## 10. Annual Reports Layout

The Annual Reports category should show one principal annual report for each financial year.

Recommended document flow:

```text
Featured latest annual report
Recent annual reports
Older annual reports in compact rows
```

Each annual-report entry may include:

```text
Cover image
Financial year
Report title
Short description
Publication date
PDF size
View report
Download PDF
```

Related documents can appear beneath the relevant annual report where available:

- Standalone Financial Statements
- Consolidated Financial Statements
- AGM Notice
- Corporate Governance Report
- Business Responsibility Report
- Other annual statutory documents

These should be visually grouped under the relevant financial year.

---

## 11. Financial Results Layout

The Financial Results category should focus on access to reporting documents rather than financial highlights.

Use the following hierarchy:

```text
Financial Year
└── Quarter or reporting period
    └── Available documents
```

Example:

```text
FY 2025–26

Q1
- Unaudited Financial Results
- Limited Review Report
- Board Meeting Outcome
- Newspaper Publication

Q2
- Unaudited Financial Results
- Limited Review Report
- Board Meeting Outcome

Q3
- Financial Results
- Review Report
- Board Outcome

Q4 / Annual
- Audited Financial Results
- Auditor’s Report
- Board Outcome
```

The financial year can be presented as:

- An accordion
- A vertical timeline
- A year selector followed by quarter sections

Each quarter should contain document rows rather than performance cards or charts.

---

## 12. Shareholding Pattern Layout

Organise the Shareholding Pattern category by financial year and reporting period.

Example:

```text
FY 2025–26

June 2025
September 2025
December 2025
March 2026
```

Each row may display:

```text
Reporting period
Document title
Filing date
Available format
Download action
```

Where both PDF and XBRL formats are available, show both actions clearly.

---

## 13. Other Statutory Information Layout

This category may contain multiple subcategories.

Possible subcategories include:

- Corporate Governance Reports
- Related-Party Transaction Disclosures
- Secretarial Compliance Reports
- Reconciliation of Share Capital Audit
- Voting Results
- Scrutiniser Reports
- Board and Committee Information
- Familiarisation Programmes
- Policy Disclosures
- Material Subsidiary Information

Use a subcategory selector above the document list when needed.

The selected subcategory should display a chronological list of relevant documents.

---

## 14. Notices and Announcements Layout

The Notices and Announcements category should use a chronological document list.

Each row may include:

```text
Date
Announcement type
Document title
One-line description
View or download action
```

Example:

```text
29 July 2026

Board Meeting Outcome

Outcome of the Board Meeting held on 29 July 2026

View Filing
Download PDF
```

The description should remain factual and concise.

---

## 15. Document Loading and Pagination

The archive must support any number of reports.

Recommended options:

```text
Load more
Page-based pagination
Year-group loading
```

A “View more reports” action should appear only when additional documents are available.

Avoid loading the complete historical archive at once when the category contains a large number of documents.

---

## 16. Loading, Empty, and Error States

### Loading state

Show simple structural placeholders for:

- Category title
- Search controls
- Report rows

Do not show fake years, filenames, or reports.

### Empty category

```text
No documents are currently available in this category.
```

Optional action:

```text
Return to Annual Reports
```

### No search results

```text
No documents match the selected search or filters.
```

Include:

```text
Reset filters
```

### Error state

```text
We were unable to load these documents.

Please try again.
```

Include a retry action.

---

## 17. Responsive Behaviour

### Desktop

Use:

```text
Persistent vertical category navigation
Large active-content area
Search and filters beside the category title
Expanded recent reports
Compact historical archive rows
```

The category navigation can remain sticky below the global header.

### Tablet

The category navigation can become:

- A narrower vertical sidebar, or
- A horizontal scrollable category navigation above the report list

Expanded document rows can use:

```text
[ Thumbnail ] [ Report information ]
              [ Download action ]
```

### Mobile

Replace the permanent left navigation with:

```text
Financial Information

[ Select document category ▼ ]
```

The category selector may open as a dropdown, drawer, or full-screen navigation sheet.

Each report should stack vertically:

```text
Thumbnail
Document title
Description
Metadata
View / Download action
```

Compact report rows should also stack their metadata beneath the title.

Do not force a desktop table layout into the mobile viewport.

---

## 18. Content Behaviour

The layout should adapt to the information available.

Examples:

- Long document titles should wrap naturally.
- Missing descriptions should not leave empty spaces.
- Missing file sizes should be omitted.
- Reports without thumbnails should use a simple fallback graphic.
- Multiple documents from the same year should remain grouped.
- Revised documents should clearly display their current status.
- Superseded documents should not appear as the current filing.
- Categories with only one document should not display unnecessary filters.
- Categories with hundreds of documents should support pagination or progressive loading.

---

## 19. Backend Content Note

All report-related information—including categories, titles, financial years, reporting periods, descriptions, thumbnails, file formats, file sizes, publication dates, and document links—must be populated dynamically from the existing backend or CMS.

The frontend should define only:

- Page structure
- Category navigation
- Document presentation
- Search and filter interface
- Responsive behaviour
- Loading, empty, and error states

No report-specific information should be hardcoded into the frontend.

---

## 20. Recommended Component Structure

```text
FinancialInformationPage
├── GlobalHeader
├── FinancialInformationLayout
│   ├── CategoryNavigation
│   │   ├── SectionHeading
│   │   ├── CategoryList
│   │   └── InvestorHelpLink
│   │
│   └── DocumentArchive
│       ├── CategoryHeader
│       ├── SearchAndFilters
│       ├── ExpandedRecentReports
│       │   └── ExpandedReportRow
│       ├── HistoricalReportArchive
│       │   └── CompactReportRow
│       ├── PaginationOrLoadMore
│       └── ArchiveState
│           ├── LoadingState
│           ├── EmptyState
│           ├── NoResultsState
│           └── ErrorState
└── GlobalFooter
```

---

## 21. Final Desktop Wireframe

```text
GLOBAL HEADER

┌─────────────────────────────┬──────────────────────────────────────────────┐
│ FINANCIAL INFORMATION       │ ANNUAL REPORTS                              │
│                             │ Category description                        │
│ Reports                     │                                              │
│ & Filings                   │ Search reports | Year | Newest first        │
│                             │                                              │
│ Annual Reports              │ ┌──────────────────────────────────────────┐ │
│ Financial Results           │ │ Thumbnail | Latest Annual Report | Action│ │
│ Shareholding Pattern        │ └──────────────────────────────────────────┘ │
│ Other Statutory Information │                                              │
│ Subsidiary Companies        │ ┌──────────────────────────────────────────┐ │
│ Communication to            │ │ Thumbnail | Recent Annual Report | Action│ │
│ Shareholders                │ └──────────────────────────────────────────┘ │
│ MGT 9 & Annual Return       │                                              │
│ Credit Rating               │ Document title | Year | Format | Download   │
│ Postal Ballot               │ Document title | Year | Format | Download   │
│ Notices & Announcements     │ Document title | Year | Format | Download   │
│ Employee Stock Option Plan  │ Document title | Year | Format | Download   │
│ Others                      │                                              │
│                             │ View more reports / Pagination               │
└─────────────────────────────┴──────────────────────────────────────────────┘

GLOBAL FOOTER
```

The final experience should feel like a structured, professional investor document library: category-driven on the left, chronological and searchable on the right, with every report presented clearly and retrieved dynamically from the backend.
