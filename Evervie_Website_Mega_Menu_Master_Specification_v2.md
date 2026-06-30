# Evervie Website Mega Menu — Master Design & Development Specification

## 0. Confirmed Primary Navigation

The complete website navigation is:

1. Home
2. About Evervie
3. Portfolio
4. Investor Relations
5. News
6. Careers
7. Connect

Only the following three navigation items have dropdown mega menus:

- About Evervie
- Portfolio
- Investor Relations

The remaining items are direct links and must not open dropdowns:

- Home
- News
- Careers
- Connect

### Desktop Navigation Structure

```text
Home
About Evervie ▼
Portfolio ▼
Investor Relations ▼
News
Careers
Connect
```

### Recommended Routes

```text
Home: /
About Evervie: /about
Portfolio: /portfolio
Investor Relations: /investors
News: /news
Careers: /careers
Connect: /connect
```

The dropdown trigger labels should also be clickable where appropriate, linking to the corresponding top-level landing page.

### Active Navigation State

The active page should use:

- Graphite or black text
- A 2px to 3px underline beneath the label
- Evervie Orange may be used for active dropdown states
- A downward chevron for closed dropdowns
- An upward chevron for an open dropdown

Only one mega menu can be open at a time.

---

## 1. Purpose

This document defines the shared mega menu system for the Evervie website.

The same visual and interaction framework should be used for the three dropdown-enabled navigation items:

1. About Evervie
2. Portfolio
3. Investor Relations

Home, News, Careers, and Connect are direct links and must not use mega menus.

Each mega menu should feel like part of one coherent design system while allowing its own:

- introductory copy
- navigation links
- monochrome icon set
- supporting visual area
- contextual footer or summary strip

The menus are intended primarily for navigation. They should guide users toward deeper pages without attempting to explain every topic inside the dropdown.

---

## 2. Shared Mega Menu Design System

### 2.1 Placement

The mega menu opens directly below the main website header.

Desktop behaviour:

- opens on hover or click
- remains open while the pointer is over the trigger or menu panel
- closes when the user clicks outside
- closes when the user presses `Escape`
- closes when another primary navigation menu opens
- supports keyboard navigation and focus states

Tablet behaviour:

- opens on click
- uses the same desktop panel where space permits
- may reduce supporting visual size and copy length

Mobile behaviour:

- converts into a full-width navigation drawer or accordion
- does not attempt to compress the full desktop mega menu
- prioritises direct page links
- decorative visuals may be removed or simplified

---

### 2.2 Container

The mega menu should appear as one cohesive panel.

Recommended styling:

```css
background: #ffffff;
border: 1px solid rgba(40, 40, 40, 0.10);
border-radius: 20px to 24px;
box-shadow: 0 18px 55px rgba(40, 40, 40, 0.08);
width: 94% to 96% of the main content container;
padding: 30px to 40px;
```

The menu should not look like several unrelated cards. It should feel like one structured interface.

---

### 2.3 Layout

Use a two-column desktop structure.

```text
Mega Menu
├── Introductory / visual column
└── Navigation links column
```

Recommended proportions:

```text
Intro / visual column: 32% to 35%
Navigation column: 65% to 68%
```

A fine vertical divider separates the two areas.

---

### 2.4 Introductory Column

This column gives users quick context for the selected navigation category.

It should contain:

- small uppercase eyebrow
- short section headline
- concise supporting paragraph
- dedicated visual container

The visual container should support:

- transparent PNG
- SVG
- video
- WebGL / Three.js canvas
- future animated brand element

Do not permanently embed the current 3D visual into the component structure. The visual must remain replaceable.

Suggested structure:

```html
<div class="mega-menu-intro">
  <span class="mega-menu-eyebrow">ABOUT EVERVIE</span>
  <h2>Building the healthcare system the world deserves.</h2>
  <p>Short contextual copy.</p>

  <div class="mega-menu-visual">
    <!-- Replaceable visual asset -->
  </div>
</div>
```

---

### 2.5 Navigation Column

The right side contains stacked navigation links.

Each row should include:

```text
[ Monochrome icon tile ] [ Page title + description ] [ Direction arrow ]
```

Recommended row height:

```text
104px to 124px
```

Each row should be fully clickable.

Recommended row styling:

```css
display: grid;
grid-template-columns: 80px minmax(0, 1fr) 32px;
gap: 20px;
align-items: center;
padding: 18px 0;
border-bottom: 1px solid #e4e2e0;
```

The final row should not include a bottom divider.

---

### 2.6 Icon Tiles

Use one icon system across all mega menus.

Recommended treatment:

```css
width: 76px to 84px;
height: 76px to 84px;
border-radius: 18px to 20px;
background: #faf9f8;
border: 1px solid #e4e2e0;
color: #4a4a4a;
```

Icon style:

- monochrome graphite
- outline icons
- rounded stroke endings
- approximately 1.75px to 2px stroke
- no individual icon gradients
- no separate bright colours per menu item
- no heavy shadows
- icon size approximately 30px to 34px

Suitable icon systems:

- Lucide
- Phosphor
- custom SVGs

Use only one icon library across the website.

---

### 2.7 Typography

#### Eyebrow

```text
Uppercase
12px to 13px
Semibold / bold
Wide letter spacing
Evervie Orange
```

#### Intro headline

```text
Large sans-serif or editorial serif depending on final design system
Graphite
Tight line height
Approximately 38px to 48px
```

#### Link title

```text
19px to 22px
Semibold / bold
Graphite
```

#### Link description

```text
14px to 16px
Medium grey
One or two short lines
```

#### Arrow

```text
Simple right arrow
Graphite
22px to 26px
```

---

### 2.8 Colour System

Use the approved Evervie palette.

```text
Canvas: #F4F2F1
Graphite: #282828
Evervie Orange: #FF3C00
Orange Lite: #FF6E2E
Prime Pink: #FF91B4
Prime Solar: #FABE00
White: #FFFFFF
Divider: approximately #E4E2E0
Secondary text: approximately #666666
```

Orange should be limited to:

- active navigation label
- active underline
- eyebrow
- headline punctuation
- hover arrow
- small interaction accents

The navigation links and icon tiles should remain primarily monochrome.

---

## 3. Shared Interaction Behaviour

### 3.1 Opening Animation

Recommended:

```text
Duration: 220ms to 300ms
Opacity: 0 to 1
Translate Y: -8px to 0
Scale: 0.99 to 1
Easing: cubic-bezier(0.22, 1, 0.36, 1)
```

Do not stagger each navigation row.

---

### 3.2 Link Hover State

On hover:

- row background changes to a very light warm grey
- title changes to Evervie Orange
- arrow moves 4px to 6px to the right
- icon tile border becomes slightly darker
- the full row remains clickable

Avoid:

- large coloured backgrounds
- strong scaling
- bright icon backgrounds
- excessive animation

---

### 3.3 Focus State

Each navigation link must support keyboard focus.

Recommended:

```css
outline: 2px solid #FF3C00;
outline-offset: 3px;
border-radius: 12px;
```

---

### 3.4 Active Page State

When the user is currently on a page represented in the menu:

- page title may use Evervie Orange
- arrow may use Evervie Orange
- a thin orange indicator can appear at the left edge of the row

---

## 4. About Evervie Mega Menu

### 4.1 Introductory Content

**Eyebrow**

```text
ABOUT EVERVIE
```

**Headline**

```text
Building the healthcare system the world deserves.
```

**Supporting copy**

```text
We combine deep healthcare expertise with technology and compassion to deliver measurable outcomes at scale.
```

**Visual area**

Use a dedicated visual container for the Evervie bloom or another approved brand visual.

The detailed 3D bloom specification will be added separately.

---

### 4.2 About Evervie Pages

#### 1. Who We Are

**Description**

```text
Get to know Evervie—our story, values, and the purpose that drives us forward.
```

**Recommended icon**

```text
Single person / user outline
```

**Icon search terms**

```text
user outline
person outline
identity profile
```

**Suggested route**

```text
/about/who-we-are
```

---

#### 2. Our Leadership

**Description**

```text
Meet the leaders guiding Evervie with expertise, experience, and heart.
```

**Recommended icon**

```text
Group of two or three people
```

**Icon search terms**

```text
users outline
leadership team
group people outline
```

**Suggested route**

```text
/about/leadership
```

---

#### 3. Mission & Vision

**Description**

```text
Why we exist, where we are going, and the future we are working to create.
```

**Recommended icon**

```text
Target / bullseye / concentric circles
```

**Icon search terms**

```text
target outline
bullseye
focus icon
mission target
```

**Suggested route**

```text
/about/mission-vision
```

---

#### 4. Our Aspiration

**Description**

```text
Our ambition to transform healthcare and improve lives at meaningful scale.
```

**Recommended icon**

```text
Four-point sparkle / star
```

**Icon search terms**

```text
sparkle outline
four point star
aspiration icon
future symbol
```

**Suggested route**

```text
/about/aspiration
```

---

#### 5. Our Governance

**Description**

```text
The principles, practices, and oversight that ensure integrity, accountability, and trust.
```

**Recommended icon**

```text
Shield with checkmark
```

**Icon search terms**

```text
shield check outline
governance icon
compliance shield
verified shield
```

**Suggested route**

```text
/about/governance
```

---

## 5. Portfolio Mega Menu

### 5.1 Introductory Content

**Eyebrow**

```text
PORTFOLIO
```

**Headline**

```text
Focused healthcare platforms for the needs that matter most.
```

**Supporting copy**

```text
Explore Evervie’s specialised healthcare portfolio across renal care, oncology, diagnostics, and the future of elder care.
```

**Visual direction**

The visual area may use:

- an abstract care-network visual
- an Evervie brand element
- a subtle healthcare platform diagram
- a future 3D or animated asset
- a representative patient-care image

Keep the visual secondary to the navigation links.

---

### 5.2 Portfolio Pages

#### 1. Renal Care

**Description**

```text
Explore Evervie’s approach to accessible, continuous, and specialised kidney care.
```

**Recommended icon**

```text
Kidney outline
```

**Icon search terms**

```text
kidney outline
renal care icon
nephrology icon
```

**Suggested route**

```text
/portfolio/renal-care
```

---

#### 2. Oncology

**Description**

```text
Discover a specialist-led approach to coordinated and compassionate cancer care.
```

**Recommended icon**

```text
Medical cross with ribbon, care cell, or oncology ribbon outline
```

**Icon search terms**

```text
oncology outline
cancer care ribbon
medical treatment icon
```

**Suggested route**

```text
/portfolio/oncology
```

---

#### 3. Diagnostics

**Description**

```text
See how reliable diagnostics can support earlier answers and stronger care decisions.
```

**Recommended icon**

```text
Microscope, scan, test tube, or diagnostic pulse
```

**Icon search terms**

```text
microscope outline
diagnostics icon
medical scan outline
test tube outline
```

**Suggested route**

```text
/portfolio/diagnostics
```

---

#### 4. Elder Care — Coming Soon

**Description**

```text
A future-focused care platform designed around dignity, comfort, and support for ageing communities.
```

**Recommended icon**

```text
Heart with supporting hands, home care, or senior person outline
```

**Icon search terms**

```text
elder care outline
senior care icon
hands heart outline
home care icon
```

**Suggested route**

```text
/portfolio/elder-care
```

**Status treatment**

Include a subtle `Coming Soon` badge.

Recommended styling:

```css
font-size: 11px;
text-transform: uppercase;
letter-spacing: 0.08em;
background: #F4F2F1;
border: 1px solid #E4E2E0;
border-radius: 999px;
padding: 4px 8px;
```

The page can remain visible but should not suggest that the vertical is currently operational unless confirmed.

---

#### 5. Individual Company Pages

**Description**

```text
Explore the operating companies, care networks, locations, and impact within the Evervie portfolio.
```

**Recommended icon**

```text
Building network, organisation hierarchy, or linked companies
```

**Icon search terms**

```text
building network outline
organization chart
company hierarchy icon
linked buildings
```

**Suggested route**

```text
/portfolio/companies
```

This page should lead to individual operating-company profiles.

---

## 6. Investor Relations Mega Menu

### 6.1 Introductory Content

**Eyebrow**

```text
INVESTOR RELATIONS
```

**Headline**

```text
Information, performance, and perspective for investors.
```

**Supporting copy**

```text
Access Evervie’s investment overview, financial information, announcements, and investor presentations.
```

**Visual direction**

The visual area may use:

- abstract data or reporting motif
- document stack
- financial timeline
- subtle Evervie brand visual
- annual report cover preview
- monochrome investor communication graphic

Avoid turning the visual into a dashboard. The menu should remain focused on navigation.

---

### 6.2 Investor Relations Pages

#### 1. Investment Overview

**Description**

```text
Understand Evervie’s healthcare platform, portfolio direction, and long-term value proposition.
```

**Recommended icon**

```text
Presentation board, company overview, or strategic compass
```

**Icon search terms**

```text
presentation outline
investment overview icon
strategy compass
company overview
```

**Suggested route**

```text
/investors/overview
```

---

#### 2. Financial Information

**Description**

```text
Access financial results, reports, filings, and other performance information.
```

**Recommended icon**

```text
Bar chart, line chart, or report document
```

**Icon search terms**

```text
financial report outline
bar chart outline
analytics document
results icon
```

**Suggested route**

```text
/investors/financial-information
```

---

#### 3. Announcements

**Description**

```text
View official company announcements, disclosures, and material updates.
```

**Recommended icon**

```text
Megaphone, notification bell, or disclosure document
```

**Icon search terms**

```text
announcement outline
megaphone icon
notification document
company disclosure
```

**Suggested route**

```text
/investors/announcements
```

---

#### 4. Investor Presentations

**Description**

```text
Review presentations covering Evervie’s performance, strategy, and business progress.
```

**Recommended icon**

```text
Presentation screen, slides, or projector board
```

**Icon search terms**

```text
presentation screen outline
slides icon
investor deck
projector board
```

**Suggested route**

```text
/investors/presentations
```

---

## 7. Optional Context Strip

A contextual strip may appear at the bottom of each desktop mega menu.

It should remain secondary and should not overwhelm the page links.

### About Evervie Strip

```text
Everything we do is centred on three outcomes that matter.
Access · Quality · Scale
```

### Portfolio Strip

```text
Four healthcare verticals. One commitment to specialised care at scale.
```

Possible items:

- Renal Care
- Oncology
- Diagnostics
- Elder Care

### Investor Relations Strip

```text
Clear information for informed investor decisions.
```

Possible quick links:

- Latest Annual Report
- Latest Results
- Latest Announcement
- Investor Contact

Use this strip only when the content is current and verified.

---

## 8. Desktop Component Structure

```text
PrimaryNavigation
├── DirectLink — Home
├── DropdownTrigger — About Evervie
├── DropdownTrigger — Portfolio
├── DropdownTrigger — Investor Relations
├── DirectLink — News
├── DirectLink — Careers
├── DirectLink — Connect
│
└── MegaMenuLayer
    ├── AboutMegaMenu
    ├── PortfolioMegaMenu
    └── InvestorRelationsMegaMenu
```

Each mega menu uses the same reusable component structure:

```text
MegaMenuPanel
├── IntroColumn
│   ├── Eyebrow
│   ├── Headline
│   ├── SupportingCopy
│   └── ReplaceableVisual
│
├── NavigationColumn
│   └── MegaMenuLink[]
│
└── OptionalContextStrip
```

Only one mega menu should be open at a time.

Home, News, Careers, and Connect bypass the mega-menu layer and navigate directly to their destination pages.

---

## 9. Recommended Reusable Component API

```tsx
type MegaMenuItem = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType;
  badge?: string;
};

type MegaMenuConfig = {
  id: string;
  triggerLabel: string;
  eyebrow: string;
  headline: string;
  supportingCopy: string;
  visual?: React.ReactNode;
  items: MegaMenuItem[];
  contextStrip?: React.ReactNode;
};
```

Suggested component:

```tsx
<MegaMenu
  config={megaMenuConfigs.about}
/>
```

---

## 10. Recommended Data Structure

```ts
export const megaMenuConfigs = {
  about: {
    id: "about",
    triggerLabel: "About Evervie",
    eyebrow: "ABOUT EVERVIE",
    headline: "Building the healthcare system the world deserves.",
    supportingCopy:
      "We combine deep healthcare expertise with technology and compassion to deliver measurable outcomes at scale.",
    items: [
      {
        title: "Who We Are",
        description:
          "Get to know Evervie—our story, values, and the purpose that drives us forward.",
        href: "/about/who-we-are",
        icon: User
      },
      {
        title: "Our Leadership",
        description:
          "Meet the leaders guiding Evervie with expertise, experience, and heart.",
        href: "/about/leadership",
        icon: Users
      },
      {
        title: "Mission & Vision",
        description:
          "Why we exist, where we are going, and the future we are working to create.",
        href: "/about/mission-vision",
        icon: Target
      },
      {
        title: "Our Aspiration",
        description:
          "Our ambition to transform healthcare and improve lives at meaningful scale.",
        href: "/about/aspiration",
        icon: Sparkles
      },
      {
        title: "Our Governance",
        description:
          "The principles, practices, and oversight that ensure integrity, accountability, and trust.",
        href: "/about/governance",
        icon: ShieldCheck
      }
    ]
  },

  portfolio: {
    id: "portfolio",
    triggerLabel: "Portfolio",
    eyebrow: "PORTFOLIO",
    headline:
      "Focused healthcare platforms for the needs that matter most.",
    supportingCopy:
      "Explore Evervie’s specialised healthcare portfolio across renal care, oncology, diagnostics, and the future of elder care.",
    items: [
      {
        title: "Renal Care",
        description:
          "Explore Evervie’s approach to accessible, continuous, and specialised kidney care.",
        href: "/portfolio/renal-care",
        icon: Kidney
      },
      {
        title: "Oncology",
        description:
          "Discover a specialist-led approach to coordinated and compassionate cancer care.",
        href: "/portfolio/oncology",
        icon: Ribbon
      },
      {
        title: "Diagnostics",
        description:
          "See how reliable diagnostics can support earlier answers and stronger care decisions.",
        href: "/portfolio/diagnostics",
        icon: Microscope
      },
      {
        title: "Elder Care",
        description:
          "A future-focused care platform designed around dignity, comfort, and support for ageing communities.",
        href: "/portfolio/elder-care",
        icon: HandHeart,
        badge: "Coming Soon"
      },
      {
        title: "Individual Company Pages",
        description:
          "Explore the operating companies, care networks, locations, and impact within the Evervie portfolio.",
        href: "/portfolio/companies",
        icon: Network
      }
    ]
  },

  investors: {
    id: "investors",
    triggerLabel: "Investor Relations",
    eyebrow: "INVESTOR RELATIONS",
    headline:
      "Information, performance, and perspective for investors.",
    supportingCopy:
      "Access Evervie’s investment overview, financial information, announcements, and investor presentations.",
    items: [
      {
        title: "Investment Overview",
        description:
          "Understand Evervie’s healthcare platform, portfolio direction, and long-term value proposition.",
        href: "/investors/overview",
        icon: Presentation
      },
      {
        title: "Financial Information",
        description:
          "Access financial results, reports, filings, and other performance information.",
        href: "/investors/financial-information",
        icon: ChartNoAxesCombined
      },
      {
        title: "Announcements",
        description:
          "View official company announcements, disclosures, and material updates.",
        href: "/investors/announcements",
        icon: Megaphone
      },
      {
        title: "Investor Presentations",
        description:
          "Review presentations covering Evervie’s performance, strategy, and business progress.",
        href: "/investors/presentations",
        icon: PanelsTopLeft
      }
    ]
  }
};
```

Icon names above are examples and may vary depending on the selected icon library.

---

## 11. Responsive Behaviour

### Desktop

- full two-column panel
- supporting visual enabled
- descriptions visible
- optional context strip enabled

### Tablet

- reduce intro column width
- reduce visual size
- shorten descriptions where necessary
- navigation links remain stacked
- context strip may wrap into two rows

### Mobile

Use a drawer or accordion.

Recommended structure:

```text
About Evervie
├── Who We Are
├── Our Leadership
├── Mission & Vision
├── Our Aspiration
└── Our Governance

Portfolio
├── Renal Care
├── Oncology
├── Diagnostics
├── Elder Care — Coming Soon
└── Individual Company Pages

Investor Relations
├── Investment Overview
├── Financial Information
├── Announcements
└── Investor Presentations
```

Mobile rules:

- no large visual above the links
- descriptions may be hidden or shortened
- icon size reduced to 24px
- minimum touch target 48px
- clear expand / collapse indicators
- active section remains expanded
- support keyboard and screen-reader navigation

---

## 12. Accessibility Requirements

- use semantic navigation landmarks
- use buttons for menu triggers
- use links for destinations
- add `aria-expanded` to triggers
- add `aria-controls` linking each trigger to its panel
- return focus to the trigger when the menu closes
- allow `Escape` to close the menu
- do not rely only on hover
- maintain visible focus states
- all icon-only elements must include accessible labels or be hidden from screen readers when decorative
- avoid focus trapping unless the menu behaves as a true modal drawer on mobile

---

## 13. Suggested ARIA Structure

```html
<nav aria-label="Primary navigation">
  <button
    aria-expanded="false"
    aria-controls="about-mega-menu"
  >
    About Evervie
  </button>

  <section
    id="about-mega-menu"
    aria-label="About Evervie navigation"
  >
    ...
  </section>
</nav>
```

---

## 14. Development Notes

- generate all menu items from data
- do not create three unrelated hard-coded dropdowns
- support only one open menu at a time
- keep the decorative visual component replaceable
- avoid loading expensive 3D assets before the menu opens
- lazy-load video, canvas, or WebGL visual modules
- ensure links remain available even if the visual fails
- use CSS transitions for panel motion
- avoid heavy JavaScript animation for basic menu opening
- preserve crawlable anchor links in the rendered HTML
- do not hide important routes inside non-semantic click handlers

---

## 15. Acceptance Criteria

The navigation and mega menu system is complete when:

- the primary navigation contains exactly seven items: Home, About Evervie, Portfolio, Investor Relations, News, Careers, and Connect
- only About Evervie, Portfolio, and Investor Relations open mega menus
- Home, News, Careers, and Connect behave as direct links
- About Evervie displays exactly five pages
- Portfolio displays exactly five destinations
- Investor Relations displays exactly four destinations
- all three menus use the same component and visual system
- navigation items remain monochrome
- Evervie Orange is used only as an accent
- each page has a relevant outline icon
- the supporting visual area is replaceable
- only one mega menu opens at a time
- keyboard, click, hover, and touch interactions work
- mobile uses a drawer or accordion layout
- each link has a final route, title, and short description
- decorative visual failure does not block navigation
- the interface is responsive and accessible