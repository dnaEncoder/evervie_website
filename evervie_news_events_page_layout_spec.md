# Evervie News & Events Page
## Visual Layout and Content Specification

## 1. Page Purpose

The News & Events page should function as a central destination for:

- Upcoming investor events and webinars
- Recent event highlights
- Past event recordings
- Presentation materials
- Keynote sessions
- Earnings calls
- Investor communications connected to events

The primary user journey is:

```text
Discover a featured event or update
→ Review upcoming events
→ Add an event to the calendar
→ Browse past sessions
→ Watch recordings or access related presentations
```

The page should prioritise chronological access and clear event information rather than behaving like a general article feed.

---

## 2. Overall Page Flow

```text
Global Header
Breadcrumb
Featured News / Past Event Hero
Upcoming Events & Webinars
Past Events & Webinar Library
Investor Updates Subscription
Global Footer
```

The page should move from prominent and timely information at the top to a structured historical archive below.

---

## 3. Global Header

Use the existing Evervie website header.

The active navigation item should indicate the relevant parent section, such as:

```text
Newsroom
```

or:

```text
Investors
```

depending on where this page sits within the final sitemap.

Recommended breadcrumb:

```text
Home / Investors / News & Events
```

---

## 4. Featured News and Event Hero

### Layout

Use a large two-column composition:

```text
[ Left editorial introduction ]    [ Right featured event ]
```

The section should occupy a substantial portion of the first viewport.

### Left content area

Contains:

```text
Eyebrow
Large headline
Introductory paragraph
Previous / next controls
```

Example structure:

```text
NEWS & EVENTS

Past Events & Webinars:
Releases

From quarterly earnings calls to strategy deep-dives, our past events offer valuable perspectives into Evervie’s direction and performance.

Relive the sessions through on-demand videos, presentation materials, and concise summaries.
```

The heading can use a controlled line break so that the first and second phrases read as one editorial statement.

### Carousel controls

Place two compact circular controls beneath the introduction:

```text
Previous
Next
```

These controls change the featured event displayed on the right. Only the featured content area should update.

### Right featured area

The right column contains:

1. A short introductory line above the visual
2. A large featured image
3. An information overlay near the bottom of the image

Example supporting line:

```text
Catch up on recent investor events, keynote presentations, and live webinars. Explore highlights, watch recordings, and revisit key discussions.
```

### Featured event information

The image overlay contains:

```text
Event category
Event title
Short summary
Event date
Watch recording / Read more action
```

Example:

```text
INVESTOR DAY

Investor Day 2024: Strategic Growth Highlights

Revisit key sessions covering Evervie’s platform direction, operating progress, market outlook, and long-term priorities.

Watch recording
```

The complete featured image area can be clickable.

---

## 5. Upcoming Events & Webinars

### Section header

Use a wide editorial heading row:

```text
[ Section title ]                         [ View all upcoming events ]
```

Suggested heading:

```text
Upcoming Events & Webinars
```

The link on the right opens the complete events calendar or listing.

### Events layout

Display the next three upcoming events in a horizontal row on desktop:

```text
[ Event 01 ] [ Event 02 ] [ Event 03 ]
```

Each event module contains:

1. Event image
2. Date and time overlay
3. Event type
4. Event title
5. Short description
6. Add-to-calendar action
7. Directional arrow

### Event image area

A slim overlay along the lower edge of the image contains:

```text
Event date                       Event time
```

Example:

```text
20 September 2026                4:00 PM IST
```

### Event information

Below the image:

```text
Event type
Event title
One- or two-line summary
```

Example:

```text
UPCOMING EARNINGS CALL

Q2 FY 2026–27 Earnings Call

Discussion of quarterly financial results, operating developments, and management commentary.
```

### Event actions

The footer of each event module contains:

```text
Add to calendar
Arrow / View event
```

The add-to-calendar action should provide supported calendar options or an `.ics` file.

The arrow opens the event detail page.

### Full calendar action

Place a centred action below the event row:

```text
Explore Full Calendar
```

This opens a complete chronological listing of future events.

---

## 6. Past Events & Webinar Library

### Overall layout

Use an asymmetric split:

```text
[ Left library introduction ]    [ Right searchable event archive ]
```

Recommended desktop proportions:

```text
Left introduction: approximately 25–30%
Right archive: approximately 70–75%
```

### Left introduction

Contains:

```text
Section heading
Short supporting paragraph
View all past events action
```

Example:

```text
Past Events &
Webinar Library

Watch recordings and review presentation materials from previous investor interactions.

View all past events
```

The introduction can remain sticky while users scroll through a long archive on desktop.

### Archive controls

At the top of the right area, include:

```text
Event type filter
Year filter
Search events
```

Possible event types:

- Investor Day
- Earnings Call
- Investor Webinar
- Keynote
- Strategic Update
- Conference Presentation
- Media Interaction
- Other Events

The available options should reflect the actual event information available.

### Past-event row

Each event appears as a horizontal editorial row:

```text
[ Thumbnail ] [ Event information ] [ Event resources ]
```

### Event information area

Contains:

```text
Event category
Event title
Event date
Short event summary
```

Example:

```text
INVESTOR DAY

Investor Day 2024: Strategic Growth Highlights

18 July 2024

Keynote presentations and panel discussions covering financial performance, portfolio direction, and growth priorities.
```

### Event resource actions

The right side of each row contains only the resources available for that event.

Possible actions:

```text
Watch recording
View presentation
Download transcript
Read summary
View photographs
```

Do not display inactive actions when a resource is unavailable.

### Row separators

Use horizontal dividers between archive entries.

Avoid placing every archived event inside a large independent card. The archive should behave like a structured chronological list.

### Archive loading

Place a progressive-loading action beneath the list:

```text
Load more events
```

Pagination may be used when the archive becomes extensive.

---

## 7. Optional News and Release Integration

If this page will also include company news, add a compact news layer between the hero and Upcoming Events.

Recommended structure:

```text
Latest Releases

Featured release                       Two recent release rows
```

Each release includes:

```text
Category
Publication date
Headline
Short summary
Read more
```

Do not duplicate the full Newsroom archive. Show only a small number of recent or event-related releases and direct users to the main Newsroom.

This section can be omitted when a separate Newsroom page already covers the same content.

---

## 8. Stay Informed Section

Use a full-width subscription band near the bottom of the page.

### Layout

```text
[ Heading and description ]    [ Email field and submit action ]
```

Suggested content:

```text
Stay informed

Subscribe to receive investor updates, event invitations, presentations, and official announcements.
```

The form contains:

```text
Email address field
Subscribe action
```

Optional subscription preferences can appear after submission:

- Investor events
- Financial results
- Announcements
- Investor presentations
- All investor updates

---

## 9. Footer

Use the existing Evervie global footer.

The footer can include:

- Evervie logo
- About Evervie links
- Portfolio links
- Investor Centre links
- Newsroom
- Careers
- Contact
- Privacy Policy
- Terms of Use
- Sitemap
- Copyright
- Scroll-to-top control

The News & Events page should not introduce a separate footer design.

---

## 10. Event Detail Information

Each upcoming or archived event should be capable of linking to an event detail page.

The detail page may contain:

```text
Event category
Event title
Date
Start time
End time
Time zone
Location or online platform
Event status
Event description
Speaker information
Agenda
Registration link
Calendar link
Recording
Presentation
Transcript
Related announcement
Related financial results
```

Only show information that exists for the selected event.

---

## 11. Interaction Notes

### Featured hero

- Previous and next controls rotate featured events.
- Slide transitions should remain restrained.
- The featured image and text should update together.
- Avoid automatic rotation unless it pauses on hover and respects reduced-motion settings.

### Upcoming event

- The complete event module can open the event detail page.
- Add-to-calendar remains a separate action.
- Past events should not show add-to-calendar actions.

### Archive

- Filters update the archive without reloading the full page.
- Search should match event title, category, year, and description.
- Resource links should open or download the correct material directly.

---

## 12. Responsive Behaviour

### Desktop

```text
Two-column featured hero
Three-column upcoming-event row
Left introduction + right archive
Horizontal event rows
```

### Tablet

```text
Featured hero retains two columns where possible
Upcoming events become two columns
Archive introduction moves above the event list
Resource actions remain aligned to the right
```

### Mobile

Stack the page vertically:

```text
Breadcrumb
Hero introduction
Featured event
Carousel controls
Upcoming event modules
Full calendar action
Past-events introduction
Filters
Archive rows
Subscription
Footer
```

On mobile:

- Upcoming events display one per row or in a swipeable sequence.
- Filters can open inside a drawer.
- Archive actions move beneath the event information.
- Image overlays must remain readable.
- Event times should always include the time zone.
- The featured image should not contain excessive overlaid copy.

---

## 13. Content Behaviour

The layout should adapt to the information available.

- Events without images should use a neutral visual fallback.
- Events without recordings should not show “Watch recording.”
- Events without presentations should not reserve empty action space.
- Long titles should wrap naturally.
- Cancelled events should display a clear status.
- Completed events should move from Upcoming to the Past Events library.
- Event date and time should use a consistent display format.
- Online and in-person events should be distinguishable.
- Events spanning multiple days should display a date range.
- Time zones should always be included for live events.

---

## 14. Backend Content Note

All event and news information—including titles, categories, dates, times, images, summaries, speakers, event status, registration links, recordings, presentation files, transcripts, and related resources—should be populated dynamically from the existing backend or CMS.

The frontend should define only:

- Page structure
- Event presentation
- Filters and search
- Carousel interaction
- Calendar interaction
- Responsive behaviour
- Loading, empty, and error states

No event-specific content should be hardcoded into the frontend.

---

## 15. Recommended Component Structure

```text
NewsAndEventsPage
├── GlobalHeader
├── Breadcrumb
├── FeaturedEventsHero
│   ├── HeroIntroduction
│   ├── CarouselControls
│   └── FeaturedEvent
├── OptionalLatestReleases
├── UpcomingEventsSection
│   ├── SectionHeader
│   ├── UpcomingEventList
│   │   └── UpcomingEventItem
│   └── FullCalendarLink
├── PastEventsLibrary
│   ├── LibraryIntroduction
│   ├── EventFilters
│   ├── EventArchive
│   │   └── PastEventRow
│   └── LoadMoreOrPagination
├── InvestorSubscription
└── GlobalFooter
```

---

## 16. Desktop Wireframe

```text
GLOBAL HEADER

BREADCRUMB

┌──────────────────────────────────────────────────────────────────────┐
│ FEATURED NEWS & EVENTS HERO                                         │
│                                                                      │
│ [ Eyebrow                  ] [ Supporting intro                      ]│
│ [ Large headline          ] [ Large featured event image            ]│
│ [ Supporting description ] [ Event title + summary + action overlay ]│
│ [ Previous / Next         ]                                         │
└──────────────────────────────────────────────────────────────────────┘


UPCOMING EVENTS & WEBINARS                         View all upcoming events

┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ Event image      │ │ Event image      │ │ Event image      │
│ Date / Time      │ │ Date / Time      │ │ Date / Time      │
│ Event type       │ │ Event type       │ │ Event type       │
│ Event title      │ │ Event title      │ │ Event title      │
│ Description      │ │ Description      │ │ Description      │
│ Calendar / Arrow │ │ Calendar / Arrow │ │ Calendar / Arrow │
└──────────────────┘ └──────────────────┘ └──────────────────┘

                         Explore Full Calendar


┌──────────────────────┬───────────────────────────────────────────────┐
│ PAST EVENTS &        │ Event Type | Year | Search                   │
│ WEBINAR LIBRARY      │                                               │
│                      │ Thumbnail | Event details | Resources        │
│ Supporting copy      │ --------------------------------------------  │
│                      │ Thumbnail | Event details | Resources        │
│ View all past events │ --------------------------------------------  │
│                      │ Thumbnail | Event details | Resources        │
│                      │                                               │
│                      │               Load more events               │
└──────────────────────┴───────────────────────────────────────────────┘


STAY INFORMED
[ Subscription copy ]                      [ Email field / Submit ]

GLOBAL FOOTER
```

The final page should feel like a complete investor-events destination: a prominent featured story at the top, a clear schedule of future interactions, and a searchable resource library for everything that has already taken place.
