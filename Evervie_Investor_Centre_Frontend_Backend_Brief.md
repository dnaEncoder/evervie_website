# Evervie Investor Centre — Frontend Design and Backend Integration Brief

## Document Purpose

This document defines the implementation requirements for selected sections of the Evervie Investor Centre.

It is divided into two parts:

1. **Frontend Design and Development**
2. **Backend and Strapi CMS Integration**

The frontend must remain visually consistent with the existing Evervie website, while all dynamic content must be retrieved from Strapi rather than manually inserted into components.

---

# Part 1 — Frontend Design and Development

## 1. Page Section Order

The Investor Centre page should contain the following sections:

1. Investor Centre opening fold
2. Investment Overview
3. Investor Navigation
4. Four Pillars
5. Financial Reports
6. News and Events
7. Existing website footer

The Four Pillars section already has an approved design and should be reused rather than redesigned.

---

## 2. Shared Frontend Principles

### Reuse Existing Components

The coding agent should reuse or extend existing website components wherever possible, including:

- Global header and navigation
- Typography components
- Section labels and eyebrow headings
- Directional text links
- Carousel controls
- Report cards
- News cards
- Event metadata rows
- Footer
- Existing responsive containers and spacing rules

Do not create a separate visual system for the Investor Centre.

### Avoid Repeated Boxed Layouts

The page should not feel like a sequence of unrelated card grids.

Use a varied composition across the page:

- Centred editorial introduction
- Open asymmetric navigation
- Carousel-based metric presentation
- Existing Four Pillars section
- Horizontal report carousel
- Featured news composition
- Upcoming-events timeline

Use containers only where they improve usability or hierarchy.

### Content Hierarchy

Each section must have:

- One clear section purpose
- One dominant heading
- Limited supporting text
- A clear primary interaction
- No unnecessary duplicate actions

---

## 3. Investment Overview Section

### Purpose

Present a concise investment proposition and communicate Evervie’s operating scale through an interactive metric carousel.

This section should feel like a visual overview, not a conventional statistics grid.

### Introductory Content

Centre the section introduction within the page container.

**Eyebrow**

> Investment Overview

**Headline**

> Focused care,  
> built for meaningful growth.

**Supporting Copy**

> A healthcare platform built to expand access, elevate quality, and deliver enduring impact.

**Inline Link**

> Explore the full investment overview →

Use the existing Evervie directional-link treatment rather than a filled button.

### Metric Carousel

Place a wide horizontal carousel below the introduction.

#### Active Metric

The current metric occupies the large centre position.

It should contain:

- Small supporting icon
- Large metric value
- Short uppercase label
- Optional one-line supporting statement
- Restrained abstract background treatment
- No photography
- No long description

Example:

```text
12
STATES
```

#### Adjacent Metric Previews

The previous and next items should remain partially visible.

They should:

- Be smaller than the active item
- Use reduced visual emphasis
- Show only icon, value, and label
- Be partially cropped by the carousel viewport
- Indicate that additional metrics can be explored

#### Controls

Include:

- Previous arrow
- Next arrow
- Pagination indicators
- Touch drag and swipe
- Keyboard navigation
- Optional automatic rotation

Automatic rotation requirements:

- Change every 6–8 seconds
- Pause on hover
- Pause when controls receive focus
- Pause after manual interaction
- Respect `prefers-reduced-motion`

### Portfolio Verticals Row

Below the carousel, display:

- Renal Care
- Oncology
- Diagnostics
- Elder Care

Each item should contain:

- Existing portfolio icon
- Vertical name
- Optional route to the corresponding portfolio page

Use open spacing and dividers rather than individual cards.

### Responsive Behaviour

#### Desktop

- Display the active metric centrally
- Show both adjacent metric previews
- Keep all four portfolio verticals in one row

#### Tablet

- Show the active metric and one adjacent preview
- Reduce spacing between portfolio items

#### Mobile

- Show one main metric and a partial next-slide preview
- Convert portfolio verticals to a two-column grid or horizontal scroller

---

## 4. Investor Navigation Section

### Purpose

Help visitors move directly to the major Investor Centre areas without using a conventional equal-card grid.

### Introductory Content

Align the introduction to the left.

**Eyebrow**

> Explore Investor Relations

**Heading**

> Find the information you need.

**Supporting Copy**

> Understand Evervie, review financial information, access official disclosures, and browse investor presentations.

Keep the supporting text within a controlled reading width.

### Desktop Composition

Use an asymmetric editorial layout.

#### Primary Route

Investment Overview occupies the larger left area.

Include:

- Oversized number `01`
- Route title
- Short description
- Inline destination link

Example:

```text
01

Investment Overview

Explore Evervie’s healthcare platform, portfolio direction,
operating model, strategic priorities, and approach to
long-term value creation.

View Investment Overview →
```

#### Secondary Routes

Place the remaining routes in a vertical list on the right:

- `02` Financial Information
- `03` Announcements
- `04` Investor Presentations

Each route row should include:

- Number
- Title
- One concise description
- Directional link
- Horizontal divider

Do not place the routes inside rounded cards.

### Interaction

The complete route area should be clickable.

On hover or keyboard focus:

- Emphasise the route title
- Animate or extend the underline
- Shift the arrow slightly
- Avoid heavy background fills

### Responsive Behaviour

#### Tablet

- Retain the primary route hierarchy where possible
- Reduce the gap between left and right areas

#### Mobile

- Stack all routes in order
- Preserve numbering
- Use clear dividers
- Maintain large touch targets

---

## 5. Four Pillars Section

Reuse the already approved Four Pillars section.

Do not redesign the section unless specifically requested.

The four pillar entries should remain CMS-driven where possible, but the current frontend visual structure should be preserved.

---

## 6. Financial Reports Section

### Purpose

Provide a quick view of the latest reports while allowing visitors to move between:

1. Annual Reports
2. Quarterly Results
3. Company Presentations

This section is a preview. The complete archive remains on dedicated pages.

### Section Header

Use one horizontal header row.

**Left**

> Financial Reports

**Centre**

Accessible category tabs:

```text
Annual Reports | Quarterly Results | Company Presentations
```

**Right**

Context-sensitive archive link:

- View all annual reports →
- View all quarterly results →
- View all company presentations →

The label and destination must update with the selected category.

### Category Toggle Behaviour

Implement this control as an accessible tab system.

Requirements:

- `role="tablist"`
- `role="tab"` for each category
- `aria-selected`
- Left and right arrow-key navigation
- No full-page reload
- Preserve focus when content changes
- Announce content updates appropriately
- Return the carousel to the first item when switching categories
- Cache previously loaded categories in memory

### Report Carousel

#### Desktop

Display approximately four or five items, depending on available width.

#### Tablet

Display two complete report cards and part of the next.

#### Mobile

Display one complete card and part of the next.

### Report Item Content

Each report item should contain:

- Report cover thumbnail
- Financial year or reporting period
- Report title
- Publication date
- Optional document type
- Download icon
- View or download action

Example:

```text
FY 2025–26

Integrated Annual Report

Published 30 May 2026

Download PDF
```

### Download Behaviour

The download action should:

- Download the original file
- Communicate file type
- Communicate file size when available
- Use a descriptive accessible label

Example:

```text
Download Evervie Annual Report 2025–26, PDF
```

### Missing Content States

**No Reports**

> No documents are currently available in this category.

**API Error**

> Financial documents could not be loaded. Please try again.

Include a retry action.

**Missing Cover**

Use a consistent frontend document placeholder. Do not display broken image states.

---

## 7. News and Events Section

### Purpose

Show only the latest investor-relevant news and upcoming events.

The section should provide a quick snapshot and route users to complete archives.

### Section Introduction

Centre the section introduction.

**Eyebrow**

> News & Events

**Heading**

> Stay updated. Stay informed.

**Supporting Copy**

> Key developments and upcoming engagements that drive our journey forward.

Keep the supporting copy to no more than two short lines.

### Desktop Composition

Use a balanced two-column layout:

- Left: Latest News
- Right: Upcoming Events

Separate the two areas with a subtle vertical divider.

The two columns should feel related while using different content-presentation systems.

### 7.1 Latest News

#### Section Header

Display:

- Latest News
- View all news →

#### Featured Article

The latest or editorially featured article receives the dominant layout.

Include:

- Large feature image
- Publication date
- Headline
- Short summary
- Directional action

The image should occupy approximately half the feature area.

Keep the summary concise.

#### Secondary News Items

Below the featured article, show two compact rows.

Each row includes:

- Small thumbnail
- Publication date
- Headline
- Arrow action

Do not repeat summaries in the compact rows.

#### Interaction

The complete article item should be clickable.

Hover and keyboard-focus states should:

- Emphasise the headline
- Shift the arrow slightly
- Avoid large decorative animations

### 7.2 Upcoming Events

#### Section Header

Display:

- Upcoming Events
- View all events →

#### Timeline Structure

Use a vertical timeline to connect event entries.

Each event should contain:

- Event-category indicator
- Event-type label
- Event title
- Date
- Time
- Time zone
- Format or location
- Directional action

Example:

```text
RESULTS

Q1 FY27 Results Announcement

28 July 2026
10:00 AM IST
Webcast
```

#### Supported Event Types

- Results
- Earnings Call
- Analyst Meeting
- Investor Meeting
- Annual General Meeting
- Conference
- Webcast
- Other

#### Event Ordering

Show:

- Current and future events only
- Sorted by start date and time in ascending order
- Limited to the next three events

Do not manually order these entries in the frontend.

#### Event States

The frontend may derive:

- Upcoming
- Live now
- Completed

from the event start and end values.

#### Empty State

> No upcoming investor events have been announced.

Where relevant, provide a route to past events.

### 7.3 Optional Subscription Strip

Implement the subscription strip only when an actual mailing-list or notification service is available.

**Heading**

> Never miss an update

**Supporting Copy**

> Subscribe to receive the latest investor news and event notifications.

**Action**

> Subscribe for updates →

Do not create a non-functional button.

---

## 8. Shared Frontend States

### Loading States

Use section-specific skeletons:

- Metric carousel skeleton
- Report-cover skeletons
- News image and copy skeletons
- Event timeline skeletons

Do not use a full-page spinner.

### Error Handling

Each dynamic section should fail independently.

An error in News should not prevent Reports or Events from loading.

### Accessibility

- Maintain semantic heading order
- Ensure all controls are keyboard accessible
- Use correct tab semantics
- Provide alternative text for images
- Display file types and download purposes
- Display event time zones
- Pause automatic movement during interaction
- Honour reduced-motion preferences
- Use visible focus states
- Keep touch targets large enough for mobile use

---

# Part 2 — Backend and Strapi CMS Integration

## 1. Backend Objective

Strapi must be the single source of truth for all dynamic Investor Centre content.

The frontend must not require a code update when editors publish:

- A new annual report
- A new quarterly result
- A new company presentation
- A new investor news item
- A new investor event
- A new or updated investment metric

The intended workflow is:

```text
Editor creates or updates content in Strapi
→ uploads images or documents
→ saves as draft
→ reviews the entry
→ publishes the entry
→ frontend retrieves the latest published data
→ Investor Centre preview updates automatically
```

---

## 2. Strapi Content Types

### 2.1 Collection Type — `financial-document`

Use one collection type for all financial-document categories.

```ts
type FinancialDocument = {
  title: string;
  slug: string;
  category:
    | "annual-report"
    | "quarterly-result"
    | "company-presentation";
  financialYear?: string;
  reportingPeriod?: string;
  publicationDate: string;
  summary?: string;
  coverImage?: Media;
  documentFile?: Media;
  externalUrl?: string;
  fileType?: string;
  fileSizeLabel?: string;
  isFeatured: boolean;
  showOnInvestorCentre: boolean;
  sortPriority?: number;
  revisionStatus?: "original" | "revised" | "superseded";
  supersedes?: FinancialDocument;
};
```

#### Validation Rules

- Require either `documentFile` or `externalUrl`
- Do not expose upload filenames as visible report titles
- Require `publicationDate`
- Require `category`
- Store the reporting period separately from publication date
- Preserve revised and superseded-document relationships

#### Sorting Rules

Default sorting:

1. `sortPriority`, where deliberately supplied
2. `publicationDate` descending

---

### 2.2 Collection Type — `news-article`

```ts
type NewsArticle = {
  title: string;
  slug: string;
  excerpt: string;
  body: RichText;
  publicationDate: string;
  category?: string;
  featuredImage?: Media;
  imageAlt?: string;
  externalUrl?: string;
  isFeatured: boolean;
  showOnInvestorCentre: boolean;
  relatedDocuments?: FinancialDocument[];
};
```

#### Content Rules

- Store image alternative text separately
- Use the editorial excerpt in previews
- Do not truncate the complete article body in the frontend
- Only published entries should appear publicly
- Use `showOnInvestorCentre` to exclude unrelated newsroom content

#### Investor Centre Selection Logic

Retrieve:

- One manually featured article, where available
- Otherwise the newest article
- Two additional recent articles
- Only entries where `showOnInvestorCentre = true`

---

### 2.3 Collection Type — `investor-event`

```ts
type InvestorEvent = {
  title: string;
  slug: string;
  eventType:
    | "results"
    | "earnings-call"
    | "analyst-meeting"
    | "investor-meeting"
    | "agm"
    | "conference"
    | "webcast"
    | "other";
  summary?: string;
  startAt: string;
  endAt?: string;
  timezone: string;
  attendanceMode: "physical" | "virtual" | "hybrid";
  venue?: string;
  webcastUrl?: string;
  registrationUrl?: string;
  relatedDocument?: FinancialDocument;
  showOnInvestorCentre: boolean;
  isFeatured: boolean;
};
```

#### Event Rules

- Store date and time in machine-readable ISO datetime format
- Store the event time zone explicitly
- Sort upcoming events by `startAt`
- Do not rely on editor-controlled ordering
- Use start and end values to derive event state
- Do not require manual status updates after an event ends

#### Investor Centre Selection Logic

Retrieve:

```text
Events where showOnInvestorCentre = true
AND startAt is equal to or later than the current time
ORDER BY startAt ascending
LIMIT 3
```

---

### 2.4 Collection Type — `investor-metric`

```ts
type InvestorMetric = {
  label: string;
  value: string;
  supportingText?: string;
  icon?: Media;
  source?: string;
  reportingDate?: string;
  order: number;
  isActive: boolean;
  showOnInvestorCentre: boolean;
};
```

#### Metric Rules

Editors should be able to:

- Add a metric
- Remove a metric
- Update its value
- Update its label
- Add supporting copy
- Upload or select an icon
- Control its order
- Activate or deactivate it
- Add a source
- Add a reporting date

The carousel should be fully driven by active CMS entries.

---

### 2.5 Repeatable Component — `investor-navigation-item`

```ts
type InvestorNavigationItem = {
  number: string;
  title: string;
  description: string;
  linkLabel: string;
  linkUrl: string;
  order: number;
  isActive: boolean;
};
```

This component should be used inside the Investor Centre page single type.

---

### 2.6 Single Type — `investor-centre-page`

```ts
type InvestorCentrePage = {
  investmentEyebrow: string;
  investmentHeadline: string;
  investmentSupportingCopy: string;
  investmentLinkLabel: string;
  investmentLinkUrl: string;

  navigationEyebrow: string;
  navigationHeadline: string;
  navigationSupportingCopy: string;
  navigationItems: InvestorNavigationItem[];

  reportsHeading: string;
  reportsDefaultCategory:
    | "annual-report"
    | "quarterly-result"
    | "company-presentation";
  reportsItemLimit: number;
  annualReportsArchiveUrl: string;
  quarterlyResultsArchiveUrl: string;
  presentationsArchiveUrl: string;

  newsEventsEyebrow: string;
  newsEventsHeadline: string;
  newsEventsSupportingCopy: string;
  newsItemLimit: number;
  eventItemLimit: number;
  newsArchiveUrl: string;
  eventsArchiveUrl: string;

  subscriptionEnabled: boolean;
  subscriptionHeading?: string;
  subscriptionCopy?: string;
  subscriptionActionLabel?: string;
  subscriptionActionUrl?: string;
};
```

---

## 3. Draft and Publish

Enable Draft and Publish for:

- Financial documents
- News articles
- Investor events
- Investor metrics
- Investor Centre page settings

The production frontend should retrieve published content only.

Editors must be able to prepare and review entries before publication.

---

## 4. Media Management

### Financial Documents

Store:

- Report cover image
- Original downloadable document
- File type
- File size label
- Accessible document title

### News

Store:

- Featured image
- Alternative text
- Optional external URL

### Metrics

Store:

- Icon media or icon identifier
- Supporting source data

### Media URL Handling

The frontend data layer should normalise Strapi media URLs so that components never depend on raw Strapi response shapes.

---

## 5. API Strategy

Choose one API method and use it consistently:

- Strapi REST API, or
- Strapi GraphQL plugin

The section components should not call Strapi directly.

Create a shared repository or API-service layer.

### Required Functions

```ts
getInvestorCentrePage()
getInvestorMetrics()
getFinancialDocuments(category, limit)
getLatestInvestorNews(limit)
getUpcomingInvestorEvents(limit)
```

The data layer should:

- Build queries
- Populate media and relationships
- Normalise responses
- Convert media URLs
- Handle errors
- Apply caching
- Return typed frontend objects

---

## 6. Illustrative REST Query Shapes

### Annual Reports

```text
/api/financial-documents
?filters[category][$eq]=annual-report
&filters[showOnInvestorCentre][$eq]=true
&sort[0]=publicationDate:desc
&pagination[pageSize]=5
&populate[coverImage]=true
&populate[documentFile]=true
&status=published
```

### Quarterly Results

```text
/api/financial-documents
?filters[category][$eq]=quarterly-result
&filters[showOnInvestorCentre][$eq]=true
&sort[0]=publicationDate:desc
&pagination[pageSize]=5
&populate[coverImage]=true
&populate[documentFile]=true
&status=published
```

### Company Presentations

```text
/api/financial-documents
?filters[category][$eq]=company-presentation
&filters[showOnInvestorCentre][$eq]=true
&sort[0]=publicationDate:desc
&pagination[pageSize]=5
&populate[coverImage]=true
&populate[documentFile]=true
&status=published
```

### Latest Investor News

```text
/api/news-articles
?filters[showOnInvestorCentre][$eq]=true
&sort[0]=publicationDate:desc
&pagination[pageSize]=3
&populate[featuredImage]=true
&status=published
```

### Upcoming Events

```text
/api/investor-events
?filters[showOnInvestorCentre][$eq]=true
&filters[startAt][$gte]=CURRENT_ISO_DATETIME
&sort[0]=startAt:asc
&pagination[pageSize]=3
&status=published
```

These are illustrative patterns. Generate final queries through the project’s shared query utility.

---

## 7. Frontend Data Contracts

Normalise Strapi responses into stable frontend types.

### Report Preview

```ts
type ReportPreview = {
  id: string;
  title: string;
  category:
    | "annual-report"
    | "quarterly-result"
    | "company-presentation";
  financialYear?: string;
  reportingPeriod?: string;
  publicationDate: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  documentUrl?: string;
  externalUrl?: string;
  fileType?: string;
  fileSizeLabel?: string;
};
```

### News Preview

```ts
type NewsPreview = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publicationDate: string;
  imageUrl?: string;
  imageAlt?: string;
  isFeatured: boolean;
};
```

### Event Preview

```ts
type EventPreview = {
  id: string;
  title: string;
  slug: string;
  eventType: string;
  startAt: string;
  endAt?: string;
  timezone: string;
  attendanceMode: "physical" | "virtual" | "hybrid";
  venue?: string;
  webcastUrl?: string;
  registrationUrl?: string;
};
```

### Metric Preview

```ts
type MetricPreview = {
  id: string;
  label: string;
  value: string;
  supportingText?: string;
  iconUrl?: string;
  source?: string;
  reportingDate?: string;
  order: number;
};
```

---

## 8. Caching and Revalidation

The site should not require a manual deployment whenever Strapi content changes.

Use the framework’s cache invalidation or revalidation mechanism.

Recommended workflow:

```text
Strapi content is published
→ webhook or CMS event triggers frontend revalidation
→ affected Investor Centre sections are refreshed
→ updated content becomes visible
```

At minimum, revalidate:

- Investor Centre page
- Financial Reports archive
- News archive
- Events archive
- Related report or article detail pages

If webhook-based revalidation is not available, use a controlled time-based revalidation strategy.

---

## 9. Data Loading Strategy

### Initial Page Load

Fetch:

- Investor Centre page settings
- Investor metrics
- Default Financial Reports category
- Latest investor news
- Upcoming investor events

### Financial Report Tabs

Load the default category on initial render.

For other categories:

- Fetch on first selection
- Cache the response in memory
- Avoid repeated API calls during the same session

### Server and Client Responsibilities

Prefer server-side or server-component retrieval for:

- Page settings
- Initial metric data
- Default report category
- Initial news and events

Use client-side state for:

- Carousel interactions
- Financial Report tab switching
- Previously loaded category caching
- Pagination and slider controls

---

## 10. Error and Fallback Behaviour

Each section must handle errors independently.

### Investment Metrics

If metric data fails:

- Hide carousel controls
- Display a restrained fallback message
- Do not break the section introduction

### Financial Reports

If the selected category fails:

- Keep the tab controls visible
- Show a retry action
- Allow users to select another category

### News

If no featured image exists:

- Use a standard image placeholder
- Preserve the article layout

### Events

If no future events exist:

> No upcoming investor events have been announced.

Do not display expired events as upcoming.

---

## 11. CMS Editorial Requirements

Editors should be able to complete all common updates without developer support.

They must be able to:

- Publish a new annual report
- Publish quarterly results
- Publish a company presentation
- Upload report covers and PDF files
- Publish investor news
- Select a featured news item
- Add an upcoming event
- Update event time or webcast URL
- Add or update a metric
- Hide content from the Investor Centre without deleting it
- Update section headings and supporting copy
- Update archive destinations

---

## 12. Completion Criteria

### Frontend Completion

The frontend is complete when:

- All specified sections match the approved layout logic
- Existing website components are reused where possible
- Financial Report categories switch without a page reload
- Carousels work with keyboard, mouse, and touch
- Mobile and tablet layouts are complete
- Loading, empty, and error states are implemented
- No dynamic content is hard-coded
- Accessibility requirements are satisfied

### Backend Completion

The backend integration is complete when:

- All required Strapi content types exist
- Draft and Publish is enabled
- Required validation rules are applied
- Media and document uploads work
- Investor Centre queries return populated media
- The frontend consumes normalised data
- New content appears without frontend code changes
- Published content automatically refreshes through revalidation
- Editors can manage reports, news, events, and metrics independently
