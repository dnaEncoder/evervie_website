import { useState, useEffect, useRef } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { User, Users, Target, Sparkles, ShieldCheck, Droplet, HeartPulse, Microscope, HandHeart, Network, Presentation, BarChart3, Megaphone, PanelsTopLeft, ArrowRight, Globe2, UsersRound, Building2, Award, Heart, Mail, ArrowUp, TrendingUp, ChevronRight, Activity } from "lucide-react";

function Linkedin({ size = 16, style, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const menu = [
  ["About Evervie", ["Who We Are", "Our Leadership", "Mission & Vision", "Our Aspiration", "Our Governance"]],
  ["Portfolio", ["Renal Care", "Oncology", "Diagnostics", "Elder Care (Coming Soon)"]],
  ["Investor Relations", ["Investment Overview", "Financial Information", "Announcements", "Investor Presentations"]]
];

const megaMenuConfigs = [
  {
    id: "about",
    triggerLabel: "About Evervie",
    eyebrow: "ABOUT EVERVIE",
    headline: "Building the healthcare system the world deserves.",
    supportingCopy: "We combine deep healthcare expertise with technology and compassion to deliver measurable outcomes at scale.",
    contextStrip: "Everything we do is centred on three outcomes that matter. Access · Quality · Scale",
    items: [
      { title: "Who We Are", description: "Get to know Evervie—our story, values, and the purpose that drives us forward.", route: "/about/who-we-are", icon: User },
      { title: "Our Leadership", description: "Meet the leaders guiding Evervie with expertise, experience, and heart.", route: "/about/leadership", icon: Users },
      { title: "Mission & Vision", description: "Why we exist, where we are going, and the future we are working to create.", route: "/about/mission-vision", icon: Target },
      { title: "Our Aspiration", description: "Our ambition to transform healthcare and improve lives at meaningful scale.", route: "/about/aspiration", icon: Sparkles },
      { title: "Our Governance", description: "The principles, practices, and oversight that ensure integrity, accountability, and trust.", route: "/about/governance", icon: ShieldCheck }
    ]
  },
  {
    id: "portfolio",
    triggerLabel: "Portfolio",
    eyebrow: "PORTFOLIO",
    headline: "Focused healthcare platforms for the needs that matter most.",
    supportingCopy: "Explore Evervie's specialised healthcare portfolio across renal care, oncology, diagnostics, and the future of elder care.",
    contextStrip: "Four healthcare verticals. One commitment to specialised care at scale.",
    items: [
      { title: "Renal Care", description: "Explore Evervie's approach to accessible, continuous, and specialised kidney care.", route: "/portfolio/renal-care", icon: Droplet },
      { title: "Oncology", description: "Discover a specialist-led approach to coordinated and compassionate cancer care.", route: "/portfolio/oncology", icon: HeartPulse },
      { title: "Diagnostics", description: "See how reliable diagnostics can support earlier answers and stronger care decisions.", route: "/portfolio/diagnostics", icon: Microscope },
      { title: "Elder Care", description: "A future-focused care platform designed around dignity, comfort, and support for ageing communities.", route: "/portfolio/elder-care", icon: HandHeart, badge: "Coming Soon" }
    ]
  },
  {
    id: "investors",
    triggerLabel: "Investor Relations",
    eyebrow: "INVESTOR RELATIONS",
    headline: "Information, performance, and perspective for investors.",
    supportingCopy: "Access Evervie's investment overview, financial information, announcements, and investor presentations.",
    items: [
      { title: "Investment Overview", description: "Understand Evervie's healthcare platform, portfolio direction, and long-term value proposition.", route: "/investors/overview", icon: Presentation },
      { title: "Financial Information", description: "Access financial results, reports, filings, and other performance information.", route: "/investors/financial-information", icon: BarChart3 },
      { title: "Announcements", description: "View official company announcements, disclosures, and material updates.", route: "/investors/announcements", icon: Megaphone },
      { title: "Investor Presentations", description: "Review presentations covering Evervie's performance, strategy, and business progress.", route: "/investors/presentations", icon: PanelsTopLeft }
    ]
  }
];

const metrics = [
  ["Countries", "6", "Markets across the healthcare and investment footprint."],
  ["Care Network", "250+", "Care touchpoints across patient-facing services."],
  ["Operating Locations", "80+", "Locations supporting specialized healthcare delivery."],
  ["Years of Commitment", "20+", "Years of healthcare learning and patient service."],
  ["Portfolio Breadth", "4", "Renal care, oncology, diagnostics, and elder care."]
];

const scaleMetrics = [
  { label: "Countries", value: "6", description: "Markets across the healthcare and investment footprint.", icon: Globe2, tone: "pink" },
  { label: "Care Network", value: "250+", description: "Care touchpoints across patient-facing services.", icon: UsersRound, tone: "solar" },
  { label: "Operating Locations", value: "80+", description: "Locations supporting specialized healthcare delivery.", icon: Building2, tone: "pink" },
  { label: "Years of Commitment", value: "20+", description: "Years of healthcare learning and patient service.", icon: Award, tone: "solar" },
  { label: "Portfolio Breadth", value: "4", description: "Renal care, oncology, diagnostics, and elder care.", icon: Heart, tone: "pink" }
];

const purpose = [
  ["01", "Access", "Care should be easier to reach", "Specialized healthcare should not feel distant, difficult, or fragmented. Access begins with being present where care is needed and designing systems that help patients move through care with confidence."],
  ["02", "Quality", "Every care experience should feel worthy of trust", "Quality is built through clinical focus, consistency, and the everyday details that shape how patients and families experience care."],
  ["03", "Scale", "Healthcare platforms must grow with responsibility", "Scale matters when it allows better care to reach more people. Evervie is focused on building platforms that can grow with discipline and create long-term value."]
];

const pillarShapes = ["circle", "diamond", "bloom"];

const verticals = [
  ["Oncology", "Compassionate cancer care with specialist focus", "Timely, trusted, and human-centered care across the patient journey."],
  ["Renal Care", "Supporting patients through every stage of kidney care", "Continuity, clinical support, and accessible specialist kidney care across communities."],
  ["Diagnostics", "Earlier answers for better care decisions", "Diagnostic capabilities that support clarity, confidence, and better care pathways."],
  ["Elder Care · Coming Soon", "Care for an ageing future", "Dignity, comfort, and support for families as care needs evolve."]
];

const regions = [
  ["India", "Core market for specialized care network growth."],
  ["International Reach", "Selective footprint across healthcare and investment markets."],
  ["Priority Expansion", "Focused opportunities across high-need care segments."],
  ["Local Delivery", "Global ambition grounded in community care."]
];

const signposts = [
  ["About Evervie", "Who we are, our leadership, and the mission behind the platform.", "Learn about Evervie"],
  ["Portfolio", "Renal care, oncology, diagnostics, and elder care under one platform.", "Explore the portfolio"],
  ["Investor Centre", "Financial information, announcements, and investor presentations.", "Enter Investor Centre"]
];

const insights = [
  ["Featured insight", "Building specialized healthcare platforms for the next decade of care", "Focused platforms can expand access, strengthen quality, and support patients across the care journey."],
  ["News", "Evervie continues focus on specialized healthcare growth", "Company update on platform development and care network expansion."],
  ["Patient care thinking", "Why continuity matters in complex health journeys", "A care-focused perspective on trust, support, and long-term patient confidence."],
  ["Investor updates", "Latest investor presentation now available", "Access shareholder resources and corporate information."]
];

function Logo() {
  return (
    <Link to="/" className="brand">
      <img src="/evervie-logo.png" alt="Evervie Health" />
    </Link>
  );
}

function Drop({ title, items, styleName }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`drop ${styleName} ${open ? "open" : ""}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(!open)}>{title} <span>⌄</span></button>
      <div className="dropPanel"><strong>{title}</strong>{items.map((item) => <a href="#" key={item}>{item}</a>)}</div>
    </div>
  );
}

function MegaMenu({ config, isOpen, onOpen, onClose, triggerRef }) {
  return (
    <div className="megaMenu" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button ref={triggerRef} className="megaTrigger" aria-expanded={isOpen} aria-controls={`mega-panel-${config.id}`} onClick={() => (isOpen ? onClose() : onOpen())}>
        {config.triggerLabel} <span>⌄</span>
      </button>
      <div className={`megaPanel ${isOpen ? "open" : ""}`} id={`mega-panel-${config.id}`} aria-label={`${config.triggerLabel} navigation`}>
        <div className="megaIntro">
          <div className="eyebrow">{config.eyebrow}</div>
          <h2>{config.headline}</h2>
          <p>{config.supportingCopy}</p>
          <Placeholder text={`${config.triggerLabel} visual`} className="megaVisual" />
        </div>
        <div className="megaNavCol">
          {config.items.map(({ title, description, route, icon: Icon, badge }) => (
            <Link to={route} className="megaRow" key={title}>
              <span className="megaIcon"><Icon size={32} strokeWidth={1.75} /></span>
              <span className="megaRowText"><b>{title}{badge && <span className="megaBadge">{badge}</span>}</b><p>{description}</p></span>
              <ArrowRight className="megaArrow" size={24} />
            </Link>
          ))}
        </div>
        {config.contextStrip && <div className="megaStrip">{config.contextStrip}</div>}
      </div>
    </div>
  );
}

function EditorialNav() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRefs = useRef([]);
  const closeTimer = useRef(null);
  const openMega = (id) => { clearTimeout(closeTimer.current); setOpenMenu(id); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 250); };

  const { pathname } = useLocation();
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (openMenu === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        const i = megaMenuConfigs.findIndex((c) => c.id === openMenu);
        clearTimeout(closeTimer.current);
        setOpenMenu(null);
        triggerRefs.current[i]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  return (
    <header className={`nav navEditorial ${mobileOpen ? "mobileMenuOpen" : ""}`}>
      <div className="navHeaderBar">
        <Logo />
        <button 
          className="mobileToggleBtn" 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
      
      <div className={`navMainContent ${mobileOpen ? "show" : ""}`}>
        <div className="navLinks">
          <NavLink to="/editorial">Home</NavLink>
          {megaMenuConfigs.map((config, i) => (
            <MegaMenu key={config.id} config={config} isOpen={openMenu === config.id}
              onOpen={() => openMega(config.id)} onClose={scheduleClose}
              triggerRef={(el) => (triggerRefs.current[i] = el)} />
          ))}
          <a>News & Insights</a><a>Careers</a><a>Connect</a>
        </div>
        <div className="actions">
          <a className="btnOutline">Enter Investor Centre</a>
          <span className="search">⌕</span>
        </div>
      </div>
    </header>
  );
}

function BentoNav() {
  return (
    <header className="nav navBento">
      <div className="logoBox"><Logo /></div>
      <div className="navLinks">
        <NavLink to="/bento">Home</NavLink>
        {menu.map(([title, items]) => <Drop key={title} title={title} items={items} styleName="bentoDrop" />)}
        <a>News</a><a>Careers</a><a>Connect</a>
      </div>
      <div className="actions"><a className="btn">Partner With Us</a></div>
    </header>
  );
}

function JourneyNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav navJourney">
      <div className="journeyTop">
        <Logo />
        <div className="actions">
          <button className="btnOutline" onClick={() => setOpen(!open)}>Explore Website Menu {open ? "−" : "+"}</button>
          <a className="btn">Enter Investor Centre</a>
        </div>
      </div>
      <div className="journeyLinks">
        <NavLink to="/journey">Home</NavLink><a>About Evervie</a><a>Portfolio</a><a>Investor Relations</a><a>News & Insights</a><a>Careers</a><a>Connect</a>
      </div>
      {open && (
        <div className="journeyMega">
          {menu.map(([title, items]) => (
            <div key={title}><h4>{title}</h4>{items.map((item) => <a href="#" key={item}>{item}</a>)}</div>
          ))}
          <div><h4>Fast Actions</h4><a>Enter Investor Centre</a><a>Start Partnership Conversation</a><a>Connect With Evervie</a></div>
        </div>
      )}
    </header>
  );
}

function Frame({ nav, label, children, brand, footer }) {
  return <div className={`app${brand ? " editorialBrand" : ""}`}><div className="utility">Evervie Health · Wireframe prototype</div>{nav}<div className="label">{label}</div>{children}{footer || <Footer />}</div>;
}

function Footer() {
  return (
    <footer className="footer">
      <div><Logo /><p>Specialized care. Scaled with purpose.</p><p>Evervie Health is building future-focused healthcare platforms across critical areas of care.</p></div>
      <div><h4>About Evervie</h4><a>Who We Are</a><a>Our Leadership</a><a>Mission & Vision</a><a>Our Aspiration</a><a>Our Governance</a></div>
      <div><h4>Portfolio</h4><a>Renal Care</a><a>Oncology</a><a>Diagnostics</a><a>Elder Care</a></div>
      <div><h4>Investor Relations</h4><a>Investment Overview</a><a>Financial Information</a><a>Announcements</a><a>Investor Presentations</a></div>
      <div><h4>News & Careers</h4><a>Featured Insights</a><a>Media Updates</a><a>Careers</a></div>
      <div><h4>Connect</h4><a>Contact Evervie</a><a>Partnership Enquiries</a><a>Investor Contact</a></div>
      <div className="fineprint"><span>© 2026 Evervie Health — Wireframe prototype.</span><span>Privacy Policy · Terms of Use</span></div>
    </footer>
  );
}

const footerNavColumns = [
  { title: "About Evervie", links: megaMenuConfigs[0].items.map((i) => i.title) },
  { title: "Portfolio", links: megaMenuConfigs[1].items.map((i) => i.title) },
  { title: "Investor Relations", links: megaMenuConfigs[2].items.map((i) => i.title) },
  { title: "News & Careers", links: ["Featured Insights", "Media Updates", "Careers"] },
  { title: "Connect", links: ["Contact Evervie", "Partnership Enquiries", "Investor Contact"] }
];

function EditorialFooter() {
  const [openCol, setOpenCol] = useState(null);
  const videoRef = useRef(null);
  useEffect(() => { if (videoRef.current) videoRef.current.playbackRate = 0.3; }, []);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer className="footer editorialFooter">
      <video ref={videoRef} className="footerBgVideo" autoPlay loop muted playsInline src="/media/footer-terrain.mp4" />
      <div className="footerTop">
        <div className="footerBrand">
          <Logo />
          <p className="footerStatement">Specialized care. Scaled with purpose.</p>
          <p>Evervie Health is building future-focused healthcare platforms across critical areas of care.</p>
        </div>
        <div className="newsletterPanel">
          <div className="newsletterHead">
            <span className="newsletterIcon"><Mail size={20} /></span>
            <div><h3>Stay connected with Evervie</h3><p>Get healthcare platform updates, investor news, and company announcements.</p></div>
          </div>
          <form className="newsletterForm" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit">Subscribe <ArrowRight size={16} /></button>
          </form>
        </div>
      </div>
      <div className="footerDivider" />
      <div className="footerNavGrid">
        {footerNavColumns.map((col, i) => (
          <div className={`footerCol ${openCol === i ? "open" : ""}`} key={col.title}>
            <button className="footerColHead" aria-expanded={openCol === i} onClick={() => setOpenCol(openCol === i ? null : i)}>
              <h4>{col.title}</h4>
              <span className="footerColIndicator">{openCol === i ? "−" : "+"}</span>
            </button>
            <div className="footerColLinks"><div>{col.links.map((l) => <a href="#" key={l}>{l}</a>)}</div></div>
          </div>
        ))}
      </div>
      <div className="footerDivider" />
      <div className="footerBottom">
        <div className="footerLegal">
          <span className="copyright">© 2026 Evervie Health. All rights reserved.</span>
          <div className="footerLegalLinks"><a href="#">Privacy Policy</a><a href="#">Terms of Use</a><a href="#">Sitemap</a></div>
          <button className="backToTop" onClick={scrollTop}>Back to top <span className="backToTopCircle"><ArrowUp size={16} /></span></button>
        </div>
      </div>
    </footer>
  );
}

function Placeholder({ text, className = "" }) {
  return <div className={`placeholder ${className}`}><span>{text}</span></div>;
}

function SectionHead({ eyebrow, title, copy }) {
  return <div className="sectionHead"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div><p>{copy}</p></div>;
}

function Metrics({ className = "" }) {
  return <div className={`metrics ${className}`}>{metrics.map(([k, v, c]) => <article key={k}><span className="tag">{k}</span><b>{v}</b><p>{c}</p></article>)}</div>;
}

function ScaleSnapshot() {
  return (
    <section className="scaleSnapshot" aria-label="Evervie scale snapshot">
      {scaleMetrics.map(({ label, value, description, icon: Icon, tone }) => (
        <article className="metricCard" key={label}>
          <div className="metricHeader">
            <span className={`metricIcon metricIcon--${tone}`}><Icon /></span>
            <span className="metricLabel">{label}</span>
          </div>
          <strong className="metricValue">{value}</strong>
          <p className="metricDescription">{description}</p>
        </article>
      ))}
    </section>
  );
}

function GlobalPresence({ mode }) {
  if (mode === "stage") return (
    <section className="section">
      <SectionHead eyebrow="Global presence" title="A map-led story of healthcare reach" copy="The map becomes a stage, with operating footprint cards layered over it." />
      <div className="mapStage"><Placeholder text="Global footprint map" className="stageMap" /><div className="mapOverlay">{regions.map(([t, c]) => <article key={t}><h3>{t}</h3><p>{c}</p></article>)}</div></div>
    </section>
  );
  if (mode === "bento") return (
    <section className="section">
      <SectionHead eyebrow="Global presence" title="A footprint designed around future care demand" copy="The bento structure allows the map to dominate while region notes sit as quick proof cards." />
      <div className="presenceBento"><Placeholder text="Global footprint map" className="bentoMap" /><div className="regionStack">{regions.slice(0, 3).map(([t, c]) => <article key={t}><h3>{t}</h3><p>{c}</p></article>)}</div></div>
    </section>
  );
  return (
    <section className="section">
      <SectionHead eyebrow="Global presence" title="Healthcare reach across markets and communities" copy="A full-width map gives this section more presence and breaks away from a standard split layout." />
      <Placeholder text="Map-led operating footprint" className="fullMap" />
      <div className="regionRibbon">{regions.map(([t, c]) => <article key={t}><h3>{t}</h3><p>{c}</p></article>)}</div>
    </section>
  );
}

function Ethos({ mode }) {
  if (mode === "center") return (
    <section className="section">
      <article className="ethosCenter"><div className="eyebrow">Evervie ethos</div><blockquote>The future of healthcare is built by staying close to patients and thinking generations ahead.</blockquote><p>Every platform we build is part of a larger commitment to help more people access specialized care and raise the standard of care delivery.</p></article>
      <div className="leaderStrip"><Placeholder text="Leadership portrait" /><div><h3>A long-term commitment to care that reaches further</h3><p>Evervie’s belief statement can stand alone as a powerful pause before the content and CTA layers.</p></div><a className="btnOutline">Read our story</a></div>
    </section>
  );
  return (
    <section className={`section ethos ${mode === "bento" ? "ethosBento" : ""}`}>
      <Placeholder text="Leadership portrait" className="portrait" />
      <article><div className="eyebrow">Evervie ethos</div><blockquote>The future of healthcare belongs to organizations that stay close to patients while thinking generations ahead.</blockquote><p>Evervie is built on the belief that better healthcare must be compassionate and scalable. Every platform we build is part of a larger commitment to help more people access specialized care.</p><a className="btnOutline">Read our story</a></article>
    </section>
  );
}

function Insights({ mode }) {
  if (mode === "flow") return (
    <section className="section"><SectionHead eyebrow="Featured insights" title="Updates that move the story forward" copy="A vertical feed layout feels more like a living publication than a static card grid." />
      <div className="insightFlow">{insights.slice(0, 3).map(([tag, title, copy]) => <article key={title}><Placeholder text={tag} /><div><span className="tag">{tag}</span><h3>{title}</h3><p>{copy}</p></div><a className="btnOutline">Read</a></article>)}</div>
    </section>
  );
  if (mode === "bento") return (
    <section className="section"><SectionHead eyebrow="Featured insights" title="Momentum, thinking, and investor communication" copy="A magazine-like insight grid gives the bottom half of the page a stronger content system." />
      <div className="insightBento">{insights.map(([tag, title, copy], i) => <article key={title} className={i === 0 ? "feature" : ""}><Placeholder text={tag} /><div><span className="tag">{tag}</span><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
    </section>
  );
  return (
    <section className="section"><SectionHead eyebrow="Featured insights" title="Ideas, updates, and perspectives from across Evervie" copy="News, patient care thinking, investor updates, and healthcare perspectives can live together in an editorial content block." />
      <div className="insightsEditorial"><article className="featureInsight"><Placeholder text="Featured story" /><div><span className="tag">{insights[0][0]}</span><h3>{insights[0][1]}</h3><p>{insights[0][2]}</p><a className="btnOutline">Read perspective</a></div></article><div className="insightStack">{insights.slice(1).map(([tag, title, copy]) => <article key={title}><span className="tag">{tag}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
    </section>
  );
}

function FinalCta({ route = false }) {
  return <section className={`section final ${route ? "routeFinal" : ""}`}><SectionHead eyebrow="Next steps" title="Explore the company, invest in the vision, or start a conversation" copy="Three clear pathways allow investors, partners, and healthcare stakeholders to move forward without confusion." />
    <div className="ctaGrid"><article><span className="tag">Investors</span><h3>Enter Investor Centre</h3><p>Find reports, announcements, presentations, governance information, and shareholder resources.</p><a className="btn">Enter Investor Centre</a></article><article><span className="tag">Partners</span><h3>Start a Partnership Conversation</h3><p>Connect with Evervie to explore healthcare partnerships, growth conversations, and strategic opportunities.</p><a className="btn">Start a Conversation</a></article><article><span className="tag">General enquiries</span><h3>Connect With Evervie</h3><p>Reach out for media, talent, business, healthcare, or general company enquiries.</p><a className="btn">Contact Evervie</a></article></div>
  </section>;
}

function Pillars() {
  const [open, setOpen] = useState([false, false, false]);
  return (
    <div className="pillars">
      {purpose.map(([n, l, t, c], i) => (
        <div className={`pillar ${open[i] ? "open" : ""}`} key={l}>
          <button className="pillarTrigger" aria-expanded={open[i]} aria-controls={`pillar-detail-${i}`} onClick={() => setOpen(open.map((v, idx) => (idx === i ? !v : v)))}>
            <span className={`pillarShape ${pillarShapes[i]}`} />
            <span className="num">{n}</span>
            <span className="pillarLabel">{l}</span>
          </button>
          <div className="pillarDetail" id={`pillar-detail-${i}`}><div>
            <h3>{t}</h3><p>{c}</p>
            <ul><li>Broader care availability</li><li>Community-led reach</li><li>Long-term value creation</li></ul>
          </div></div>
        </div>
      ))}
    </div>
  );
}

function Signposts() {
  return (
    <section className="section"><SectionHead eyebrow="Explore Evervie" title="Explore more about us" copy="A closer look at who we are, what we build, and how we're funded." />
      <div className="exploreGrid">
        {signposts.map(([title, copy, cta], i) => (
          <article className={`exploreCard ${i === 0 ? "exploreCardLarge" : ""}`} key={title}>
            <div className="exploreCardText">
              <span className="exploreIndex">{String(i + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <a className="btnOutline">{cta}</a>
            </div>
            <Placeholder text={`${title} visual`} className="exploreCardVisual" />
          </article>
        ))}
      </div>
    </section>
  );
}

function Editorial() {
  return <Frame nav={<EditorialNav />} label="Variation 01 · Editorial layered homepage" brand footer={<EditorialFooter />}><main>
    <section className="editorialHero">
      <video className="heroVideoBg" autoPlay muted loop playsInline src="/Evervie_Discs_Web_v1 (1).mp4" />
      <div className="heroStage">
        <div className="editorialHeroGrid"><div><div className="eyebrow">Future-focused healthcare</div><h1>Advancing specialized care for more people, in more places</h1><p className="lead">Evervie is building healthcare platforms that expand access, strengthen quality, and scale care with purpose.</p><p>Across critical areas of care, we bring together focused healthcare expertise, long-term operating discipline, and a patient-first belief in better care delivery.</p><div className="buttonRow"><a className="btn">Explore Our Care Platforms</a>{/* <a className="btnOutline">Enter Investor Centre</a> */}</div></div></div>
      </div>
    </section>
    {/* <section className="editorialHero heroAlt">
      <div className="heroStage">
        <div className="editorialHeroGrid"><div><div className="eyebrow">Future-focused healthcare</div><h1>Advancing specialized care for more people, in more places</h1><p className="lead">Evervie is building healthcare platforms that expand access, strengthen quality, and scale care with purpose.</p><p>Across critical areas of care, we bring together focused healthcare expertise, long-term operating discipline, and a patient-first belief in better care delivery.</p><div className="buttonRow"><a className="btn">Explore Our Care Platforms</a><a className="btnOutline">Enter Investor Centre</a></div></div></div>
      </div>
    </section> */}
    <section className="editorialHeroGradient">
      <video className="heroVideoBg" autoPlay muted loop playsInline src="/Evervie gradient motion.mp4" />
      <div className="heroGradientOverlay" />
      <div className="heroGradientContent">
        <span className="heroGradientEyebrow">Future-focused healthcare</span>
        <h1 className="heroGradientHeadline">Advancing specialized care<br />for more people, in more places</h1>
        <p className="heroGradientLead">Evervie is building healthcare platforms that expand access,<br />strengthen quality, and scale care with purpose.</p>
        <div className="heroGradientActions">
          <a className="heroGradientBtn">Explore Our Care Platforms</a>
          <a className="heroGradientBtnOutline">Enter Investor Centre</a>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="heroWideVisualWrap">
        <img className="heroWideVisual" src="/happy-family.png" alt="Full-width healthcare ecosystem visual" />
      </div>
      <ScaleSnapshot />
    </section>
    {/* <section className="section"><SectionHead eyebrow="Purpose in practice" title="Access, quality, and scale — built into the way care moves" copy="Evervie's brand marks stand in for three commitments — click one to read it in full." /><Pillars /></section> */}
    <section className="wwaPrincipleGrid">
      <div className="wwaPrincipleLeft">
        <div className="wwaPEyebrow"><span className="wwaPEyebrowDot" />Purpose in Practice</div>
        <h2 className="wwaPrincipleHeadline">Access, quality,<br />and scale —<br />built into the<br />way care moves.</h2>
        <p className="wwaPrincipleSub">Three principles, expressed through every care platform Evervie builds.</p>
      </div>
      <article className="wwaPCard wwaPCardAccess">
        <div className="wwaPCardSymbol">
          <img src="/circle-1.svg" alt="" className="wwaPSymbol" />
        </div>
        <div className="wwaPCardBody">
          <span className="wwaPNum">01</span>
          <h3 className="wwaPTitle">Access</h3>
          <hr className="wwaPRule" />
          <p className="wwaPDesc">Broader access to specialised care.</p>
        </div>
        <a className="wwaPArrow wwaPArrowBR"><ArrowRight size={16} /></a>
      </article>
      <article className="wwaPCard wwaPCardQuality">
        <div className="wwaPCardBody">
          <span className="wwaPNum">02</span>
          <h3 className="wwaPTitle">Quality</h3>
          <hr className="wwaPRule" />
          <p className="wwaPDesc">Better delivery,<br />higher standards.</p>
        </div>
        <div className="wwaPSymbolWrap"><img src="/star-1.svg" alt="" /></div>
        <a className="wwaPArrow wwaPArrowBL"><ArrowRight size={16} /></a>
      </article>
      <article className="wwaPCard wwaPCardScale">
        <div className="wwaPCardBody">
          <span className="wwaPNum">03</span>
          <h3 className="wwaPTitle">Scale</h3>
          <hr className="wwaPRule" />
          <p className="wwaPDesc">Stronger platforms,<br />wider reach.</p>
        </div>
        <div className="wwaPSymbolWrap"><img src="/bloom-1.svg" alt="" /></div>
        <a className="wwaPArrow wwaPArrowBL"><ArrowRight size={16} /></a>
      </article>
    </section>
    <Signposts />
  </main></Frame>;
}

function Bento() {
  return <Frame nav={<BentoNav />} label="Variation 02 · Modular bento homepage"><main>
    <section className="bentoHero"><div className="bentoGrid"><article className="bentoMain"><div><div className="eyebrow">Future-focused healthcare</div><h1>Specialized care, built for the next era</h1><p className="lead">Evervie builds healthcare platforms that expand access, strengthen quality, and scale care with purpose.</p><p>Our work is shaped by a patient-first belief in better delivery, stronger systems, and healthcare that can reach further.</p></div><div className="buttonRow"><a className="btn">Explore Care Platforms</a><a className="btnOutline">Enter Investor Centre</a></div></article><Placeholder text="Hero care visual" /><article className="bentoTile"><span className="tag">Care network</span><b>250+</b><p>Care touchpoints across patient-facing services.</p></article><article className="bentoTile"><span className="tag">Locations</span><b>80+</b><p>Operating locations across priority markets.</p></article><article className="bentoTile"><h3>Specialized care. Scaled with purpose</h3><p>A compact promise that makes the page feel more brand-led.</p><a className="btnOutline">Partner With Us</a></article></div></section>
    <section className="section"><SectionHead eyebrow="Purpose in practice" title="Three ideas, one care-building system" copy="A central brand belief block surrounded by the three proof themes." /><div className="coreWheel"><article><span className="tag">Access</span><h3>Care should be easier to reach</h3><p>We build with communities and patients in mind, making specialized healthcare more accessible.</p></article><article className="center"><span className="tag">Evervie promise</span><h3>Access. Quality. Scale</h3><p>Better healthcare is built when reach, trust, and operating discipline move together.</p></article><article><span className="tag">Quality</span><h3>Trust should be felt in every care experience</h3><p>We focus on consistency, continuity, and care environments families can rely on.</p></article><article><span className="tag">Scale</span><h3>Growth should create lasting care value</h3><p>Healthcare platforms must grow responsibly so they can serve more patients and regions.</p></article></div></section>
    <section className="section"><SectionHead eyebrow="Care gateway" title="Four focused pathways into Evervie’s care world" copy="Staggered vertical cards make the section feel less boxy while still showing the complete portfolio overview." /><div className="staggeredCards">{verticals.map(([l, t, c], i) => <article key={l} style={{ marginTop: i % 2 ? 60 : 0 }}><Placeholder text={l} /><div><span className="tag">{l}</span><h3>{t}</h3><p>{c}</p><a>Explore →</a></div></article>)}</div></section>
    <GlobalPresence mode="bento" /><Ethos mode="bento" /><Insights mode="bento" /><FinalCta />
  </main></Frame>;
}

function Journey() {
  return <Frame nav={<JourneyNav />} label="Variation 03 · Journey and hub homepage"><main>
    <section className="journeyHero"><div className="journeyIntro"><div><div className="eyebrow">Future-focused healthcare</div><h1>Care that reaches further, with systems built to last</h1></div><div><p className="lead">Evervie is building specialized healthcare platforms for access, quality, and scale.</p><p>This variation starts with a hub visual that turns the company story into a care ecosystem.</p><div className="buttonRow"><a className="btn">Explore Care Platforms</a><a className="btnOutline">Enter Investor Centre</a></div></div></div><div className="hub"><div className="hubRing">Evervie</div>{["Access", "Quality", "Scale", "Global Focus", "Patient-first"].map((t, i) => <article className={`hubNode n${i + 1}`} key={t}><h4>{t}</h4><p>{i === 0 ? "Care closer to patients." : i === 1 ? "Trust across experiences." : i === 2 ? "Platforms that grow responsibly." : i === 3 ? "Reach across priority markets." : "Healthcare built around people."}</p></article>)}</div></section>
    <section className="section"><SectionHead eyebrow="Scale snapshot" title="Focused reach, presented as a pathway" copy="Metrics become a horizontal evidence path instead of individual static boxes." /><Metrics className="pathMetrics" /></section>
    <section className="section"><SectionHead eyebrow="Purpose in practice" title="How Evervie moves from belief to care delivery" copy="A timeline layout gives the three ideas a progressive narrative." /><div className="timeline">{purpose.map(([n, l, t, c]) => <article key={l}><div className="num">{n}</div><div><span className="tag">{l}</span><h3>{t}</h3><p>{c}</p></div></article>)}</div></section>
    <section className="section"><SectionHead eyebrow="Care gateway" title="A care universe built around focused needs" copy="Orbit-style vertical cards create a different visual rhythm for the care gateway." /><div className="orbit"><div className="orbitCenter"><h3>Evervie Care Platforms</h3></div>{verticals.map(([l, t, c], i) => <article className={`orbitCard o${i + 1}`} key={l}><span className="tag">{l}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>
    <GlobalPresence mode="stage" /><Ethos mode="center" /><Insights mode="flow" /><FinalCta route />
  </main></Frame>;
}

function HomeNav() {
  return (
    <header className="nav navEditorial">
      <Logo />
      <div className="navLinks">
        <NavLink to="/">Home</NavLink>
        {menu.map(([title, items]) => <Drop key={title} title={title} items={items} styleName="editorialDrop" />)}
        <a>News & Insights</a><a>Careers</a><a>Connect</a>
      </div>
      <div className="actions"><a className="btnOutline">Enter Investor Centre</a></div>
    </header>
  );
}

function Home() {
  return <Frame nav={<HomeNav />} label="Homepage wireframe options"><main><section className="comparisonHero"><div className="eyebrow">React Router prototype</div><h1>Three live homepage wireframe directions for Evervie</h1><p>Each route uses the same approved content sections, but explores a different layout aesthetic and a different live navbar treatment with working dropdowns.</p></section><section className="comparisonGrid"><Link to="/editorial"><span className="tag">Variation 01</span><h2>Editorial layered scroll</h2><p>Large editorial hero, full-width visual, metric rail, stepped purpose section, and mosaic care gateway.</p><b>Open variation →</b></Link><Link to="/bento"><span className="tag">Variation 02</span><h2>Modular bento layout</h2><p>Grid-based hero and sections with compact proof points, care cards, and insight modules.</p><b>Open variation →</b></Link><Link to="/journey"><span className="tag">Variation 03</span><h2>Journey and hub layout</h2><p>Hub-style hero, timeline purpose section, orbit care gateway, and stacked CTA routes.</p><b>Open variation →</b></Link></section></main></Frame>;
}

function RouteLoader() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, [pathname]);
  if (!visible) return null;
  return <div className="routeLoader"><video autoPlay muted playsInline onEnded={() => setVisible(false)} src="/media/loader.mp4" /></div>;
}

function InnerPage({ eyebrow, title, lead }) {
  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>
        <section className="innerHero">
          <div className="innerHeroContent">
            <div className="eyebrow">{eyebrow}</div>
            <h1>{title}</h1>
            {lead && <p className="lead">{lead}</p>}
          </div>
        </section>
        <section className="section innerBody">
          <Placeholder text="Page content coming soon" style={{ minHeight: 480 }} />
        </section>
      </main>
    </Frame>
  );
}

function AboutWhoWeAre() {
  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>

        {/* Hero */}
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb">
              <Link to="/editorial">Home</Link>
              <ChevronRight size={13} />
              <span>About Evervie</span>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">Who We Are</span>
            </nav>
            <div className="eyebrow">About Evervie</div>
            <h1>Building healthcare platforms for the needs that matter most.</h1>
            <p className="wwaHeroBody">We are a specialised healthcare platform company focused on expanding access, strengthening quality, and delivering care at meaningful scale.</p>
          </div>
          <img src="/Evervie_PPT_Diamond_v1.png" alt="" className="wwaHeroDiamond" aria-hidden="true" />
        </section>

        {/* Company Statement */}
        <section className="wwaStatement">
          <div className="wwaStatementGrid">
            <div className="wwaStatHead">
              <h2>A healthcare platform built around <span className="highlight">lasting care</span>.</h2>
              <p className="wwaStatCopy">
                Evervie brings together clinical focus, management discipline, and long-term commitment. We build specialised platforms that grow responsibly to create lasting value for patients, professionals, and communities.
              </p>
            </div>
            <div className="wwaStatPrinciples">
              {[
                [Heart, "Patient-first", "Every platform we build starts with what patients actually need."],
                [Building2, "Operating excellence", "Consistent performance across care systems and patient touchpoints."],
                [TrendingUp, "Long-term orientation", "Building platforms that create lasting value for generations ahead."]
              ].map(([Icon, heading, copy]) => (
                <div className="wwaStatPrinciple" key={heading}>
                  <span className="wwaStatPrincipleIcon"><Icon size={18} strokeWidth={2} /></span>
                  <div>
                    <h4>{heading}</h4>
                    <p>{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Purpose in Practice — two-column editorial */}
        <section className="wwaPurpose">
          <div className="wwaPurposeLayout">
            <div className="wwaPurposeIntro">
              <div className="eyebrow">Purpose in Practice</div>
              <h2>How Evervie moves from belief to care delivery.</h2>
              <hr className="wwaPurposeRule" />
              <p className="wwaPurposeBody">We design and scale healthcare platforms that bring access, quality, and scale together—so care reaches further and creates lasting impact.</p>
            </div>
            <div className="wwaPurposeJourney">
              {purpose.map(([n, l, t, c], i) => {
                const accents = [
                  ['/circle-image.png',    '#FABE00'],
                  ['/rectangle-image.png', '#FF91B4'],
                  ['/bloom-image.png',     '#FF3C00'],
                ];
                const [icon, color] = accents[i];
                return (
                  <article className="wwaPurposeRow" key={l} style={{'--accent': color}}>
                    <div className="wwaPurposeShapeMark">
                      <img src={icon} alt="" className="wwaPurposeShape" />
                    </div>
                    <div className="wwaPurposeContent">
                      <span className="wwaPurposeNum">{n}</span>
                      <h3 className="wwaPurposeTitle">{l}</h3>
                      <p className="wwaPurposeStatement">{t}</p>
                      <p className="wwaPurposeDesc">{c}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Focused Platforms */}
        <section className="section">
          <SectionHead
            eyebrow="What Evervie Does"
            title="Four focused pathways into Evervie’s care world"
            copy="Four specialised healthcare verticals, each designed around the particular needs of patients, professionals, and care communities."
          />
          <div className="staggeredCards">
            {verticals.map(([l, t, c], i) => {
              const Icon = i === 0 ? Droplet : i === 1 ? HeartPulse : i === 2 ? Microscope : HandHeart;
              const hasBadge = l.includes("Coming Soon");
              const labelText = hasBadge ? l.split(" · ")[0] : l;
              return (
                <article key={l} style={{ marginTop: i % 2 ? 40 : 0 }}>
                  <div className="staggeredCardVisual">
                    <div className={`staggeredCardGradient tagTone-${i + 1}`}>
                      <Icon size={32} className="staggeredCardIcon" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="staggeredCardContent">
                    <span className="tag">
                      {labelText}
                      {hasBadge && <span className="badge" style={{ marginLeft: 6, opacity: 0.8, fontSize: 10, background: 'rgba(40,40,40,0.06)', padding: '2px 6px', borderRadius: 4 }}>Coming Soon</span>}
                    </span>
                    <h3>{t}</h3>
                    <p>{c}</p>
                    <a className="exploreLink">Explore <ArrowRight size={14} /></a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Who We Serve */}
        <section className="wwaAudience section">
          <div className="wwaAudienceSplit">
            <div className="wwaAudienceHead">
              <div className="eyebrow">Who We Serve</div>
              <h2>Partners in care. Aligned in purpose.</h2>
            </div>
            <div className="wwaAudienceGrid">
              {[
                [UsersRound, "Patients and families", "The reason every platform, process, and performance metric exists."],
                [Activity, "Healthcare professionals", "Clinicians and care teams who deliver care at the frontline."],
                [Network, "Operating partners", "Businesses, institutions, and communities working alongside Evervie."],
                [BarChart3, "Investors and stakeholders", "Partners who believe in long-term value through responsible healthcare."]
              ].map(([Icon, title, desc]) => (
                <div className="wwaAudienceItem" key={title}>
                  <span className="wwaAudienceIcon"><Icon size={22} strokeWidth={1.5} /></span>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Evervie Internal Navigation */}
        <section className="wwaAboutNav section">
          <div className="wwaAboutNavLayout">
            <div className="wwaAboutNavIntro">
              <div className="eyebrow">About Evervie</div>
              <h2>Continue the Evervie story.</h2>
              <p>Explore the people, purpose, and principles behind Evervie Health.</p>
              <Link to="/editorial" className="btnOutline">View all About Evervie</Link>
            </div>
            <div className="wwaAboutBento">
              <Link to="/about/leadership" className="wwaNavFeature">
                <div className="wwaNavFeatureInner">
                  <div className="wwaNavMeta">
                    <span className="wwaNavNum">01</span>
                    <span className="wwaNavNextTag">Next</span>
                  </div>
                  <h3>Our Leadership</h3>
                  <p>Meet the leaders guiding Evervie with expertise, experience, and heart.</p>
                  <span className="wwaNavCta">Meet the team <ArrowRight size={13} /></span>
                </div>
                <Placeholder text="Leadership visual" className="wwaNavFeatureImg" />
              </Link>
              <div className="wwaNavMinorGrid">
                {[
                  { to: "/about/mission-vision", num: "02", title: "Mission & Vision", desc: "Why we exist and where we are going." },
                  { to: "/about/aspiration", num: "03", title: "Our Aspiration", desc: "The ambition behind the platform." },
                  { to: "/about/governance", num: "04", title: "Our Governance", desc: "Integrity, accountability, and trust." }
                ].map(({ to, num, title, desc }) => (
                  <Link to={to} className="wwaNavMinor" key={title}>
                    <span className="wwaNavNum">{num}</span>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                    <ArrowRight size={14} className="wwaNavArrow" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Signposts — News first since we're already on About */}
        <section className="section">
          <SectionHead eyebrow="Explore Evervie" title="News and insights" copy="The latest news, stories, and perspectives from Evervie and across the healthcare sector." />
          <div className="exploreGrid">
            {[
              ["News & Insights", "Stay informed with the latest news, announcements, and thought leadership from Evervie.", "Read the latest",     "/image-1.png"],
              ["Portfolio",       "Renal care, oncology, diagnostics, and elder care under one platform.",                  "Explore the portfolio", "/image-2.png"],
              ["Investor Centre", "Financial information, announcements, and investor presentations.",                       "Enter Investor Centre", "/image-3.png"]
            ].map(([title, copy, cta, img], i) => (
              <article className={`exploreCard ${i === 0 ? "exploreCardLarge" : ""}`} key={title}>
                <div className="exploreCardText">
                  <span className="exploreIndex">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <a className="btnOutline">{cta}</a>
                </div>
                <img src={img} alt="" className="exploreCardVisual" />
              </article>
            ))}
          </div>
        </section>

      </main>
    </Frame>
  );
}
function AboutLeadership() {
  const [activeBoardMember, setActiveBoardMember] = useState(null);

  useEffect(() => {
    if (!activeBoardMember) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveBoardMember(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeBoardMember]);

  const boardMembers = [
    {
      name: "Dr. Marcus Vance",
      designation: "Chairman of the Board",
      photo: "/media/marcus_vance.png",
      shortBio: "Dr. Marcus Vance brings over 25 years of clinical governance and healthcare system management to Evervie, guiding the board with long-term strategic perspective.",
      expandedBio: "Dr. Marcus Vance has spent over two and a half decades leading hospital systems and advising on healthcare policy. Prior to joining Evervie, he served as the Chief Executive of the Vanguard Healthcare Group, where he led a network of 40+ clinical centers. Marcus is dedicated to improving access to specialized care and strengthening clinical governance, ensuring that patient outcomes are at the center of Evervie's growth strategy.",
      expertise: ["Healthcare Systems", "Clinical Governance", "Corporate Strategy"],
      responsibilities: "Chair of Nomination & Governance Committee; Member of Clinical Quality Committee",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Sarah Jenkins",
      designation: "Non-Executive Director",
      photo: "/media/sarah_jenkins.png",
      shortBio: "Sarah has 20 years of experience in healthcare private equity, advising platforms on disciplined growth and corporate finance.",
      expandedBio: "Sarah Jenkins brings 20 years of experience in corporate finance, investment banking, and private equity, specifically focused on healthcare infrastructure. She previously served as Senior Partner at Apex Healthcare Partners, managing a portfolio of specialist clinical facilities. At Evervie, Sarah focuses on financial governance and disciplined capital allocation to support sustainable, long-term scaling.",
      expertise: ["Corporate Finance", "Healthcare M&A", "Risk Management"],
      responsibilities: "Chair of Audit & Risk Committee; Member of Nomination & Governance Committee",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Dr. Elena Rostova",
      designation: "Non-Executive Director",
      photo: "/media/elena_rostova.png",
      shortBio: "A renowned oncologist and quality assurance expert, Dr. Rostova ensures our care processes meet the highest clinical standards.",
      expandedBio: "Dr. Elena Rostova is an accomplished clinical leader and oncologist with over 18 years of clinical and academic experience. She was previously the Director of Quality & Research at the Metropolitan Cancer Center, where she pioneered protocols for patient-centered oncology pathways. At Evervie, Dr. Rostova provides vital oversight to clinical safety, medical protocols, and oncology care quality.",
      expertise: ["Clinical Quality", "Oncology Care Pathways", "Medical Research"],
      responsibilities: "Chair of Clinical Quality Committee",
      linkedin: "https://linkedin.com"
    },
    {
      name: "David Chen",
      designation: "Independent Director",
      photo: "/media/david_chen.png",
      shortBio: "David oversees legal, compliance, and regulatory affairs, ensuring Evervie operates with integrity and absolute transparency.",
      expandedBio: "David Chen specializes in legal oversight, regulatory compliance, and governance within the life sciences and healthcare sectors. He served as General Counsel for Helix Medical Systems for over 15 years. At Evervie, David guides the board on regulatory compliance, ethical operations, and corporate accountability, ensuring that all portfolio companies adhere to the highest standards.",
      expertise: ["Regulatory Compliance", "Healthcare Law", "Corporate Governance"],
      responsibilities: "Chair of Compliance Committee; Member of Audit & Risk Committee",
      linkedin: "https://linkedin.com"
    }
  ];

  const executiveTeam = [
    {
      name: "Arthur Pendelton",
      designation: "Managing Director & CEO",
      bio: "Arthur brings 20+ years of operational healthcare leadership. He was previously Chief Operating Officer of a multi-market specialty care network.",
      expertise: "Operations, Scaling, Strategy",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Maya Lin",
      designation: "Chief Financial Officer",
      bio: "Maya has an extensive background in financial stewardship, corporate treasury, and strategic transactions within public and private health networks.",
      expertise: "Capital Allocation, Treasury, M&A",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Dr. Rajesh Patel",
      designation: "Chief Medical Officer",
      bio: "Dr. Patel is a board-certified physician with deep expertise in clinical quality, safety metrics, and developing clinical education frameworks.",
      expertise: "Patient Safety, Clinical Protocols, Nephrology",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Claire Dupont",
      designation: "Chief Operating Officer",
      bio: "Claire has managed operations for large-scale clinical footprints, focusing on technology integration, care coordination, and clinical workflows.",
      expertise: "Healthcare Operations, Workflow Integration, Tech Enablement",
      linkedin: "https://linkedin.com"
    }
  ];

  const principles = [
    {
      title: "Patient needs guide decisions",
      copy: "Every decision, protocol, and strategic investment starts with a single question: how does this serve the clinical outcome and comfort of the patient?",
      icon: HeartPulse
    },
    {
      title: "Expertise is respected",
      copy: "We empower clinicians and operators with autonomy, recognizing that clinical quality is built on the expertise of frontline healthcare providers.",
      icon: Microscope
    },
    {
      title: "Accountability is shared",
      copy: "Governance is not a checklist—it is an active discipline. We establish clear ownership at every level of our organization to ensure safety and trust.",
      icon: ShieldCheck
    },
    {
      title: "Growth must be responsible",
      copy: "We expand our footprint only where we can preserve clinical quality. Sustainable scale is chosen over rapid, unchecked expansion.",
      icon: TrendingUp
    },
    {
      title: "Transparency builds trust",
      copy: "We share our quality metrics, clinical outcomes, and operating performance openly with patients, families, and stakeholders.",
      icon: Sparkles
    },
    {
      title: "Strong operating companies create lasting impact",
      copy: "We build resilient, self-governing local platforms that can adapt to their communities while benefiting from Evervie's group resources.",
      icon: Building2
    }
  ];

  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>
        {/* Page Hero */}
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb">
              <Link to="/editorial">Home</Link>
              <ChevronRight size={13} />
              <span>About Evervie</span>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">Our Leadership</span>
            </nav>
            <div className="eyebrow">Our Leadership</div>
            <h1>Leadership grounded in experience, responsibility, and care.</h1>
            <p className="wwaHeroBody">Evervie is guided by leaders who bring together healthcare understanding, operating experience, governance discipline, and a shared commitment to building stronger systems of care.</p>
          </div>
          <img src="/Evervie_PPT_Diamond_v1.png" alt="" className="wwaHeroDiamond" aria-hidden="true" />
        </section>

        {/* Leadership Introduction */}
        <section className="wwaStatement">
          <div className="wwaStatementGrid">
            <div className="wwaStatHead">
              <h2>Guiding Evervie with <span className="highlight">long-term perspective</span>.</h2>
              <p className="wwaStatCopy">
                Our leaders combine deep clinical capability with corporate stewardship to build platforms capable of serving patient communities for generations. We believe that robust governance, operational accountability, and medical excellence must grow together to build healthcare platforms that stand the test of time.
              </p>
            </div>
            <div className="wwaStatPrinciples">
              {[
                [Users, "Active Direction", "Our leadership actively steers portfolio companies, aligning strategy with clinical realities on the ground."],
                [Network, "Multi-Disciplinary", "Bringing together a rare blend of medicine, business operations, capital management, and compliance."],
                [ShieldCheck, "Outcome Focused", "Measuring success strictly through patient safety, clinical quality, and long-term organizational accountability."]
              ].map(([Icon, heading, copy]) => (
                <div className="wwaStatPrinciple" key={heading}>
                  <span className="wwaStatPrincipleIcon"><Icon size={18} strokeWidth={2} /></span>
                  <div>
                    <h4>{heading}</h4>
                    <p>{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chairman's Message */}
        <section className="section wwaChairman">
          <div className="wwaChairmanLayout">
            <div className="wwaChairmanVisual">
              <img src="/media/prasad_potluri.png" alt="Prasad V. Potluri, Chairman" className="wwaChairmanImg" />
              <div className="wwaChairmanBadge">
                <h4>Prasad V. Potluri</h4>
                <p>Chairman of the Board</p>
              </div>
            </div>
            <div className="wwaChairmanContent">
              <span className="eyebrow">Message from the Chairman</span>
              <blockquote className="wwaChairmanQuote">
                "Driving innovation in global healthcare through advanced diagnostics, patient-focused care, and strategic partnerships."
              </blockquote>
              <p className="wwaChairmanText">
                At Evervie, we are shaping the future of global healthcare platforms. By combining deep operating discipline with clinical innovation, we are constructing care systems that put the patient's needs and clinical quality above all else. Our long-term orientation drives us to build scalable networks that bring access, consistency, and standardisation to care.
              </p>
              <div className="wwaChairmanExp">
                <h3>Prasad’s Experience</h3>
                <p className="wwaChairmanExpSubtitle">Bringing decades of leadership and expertise to shape innovative healthcare solutions worldwide.</p>
                <div className="wwaChairmanExpGrid">
                  <div className="wwaChairmanExpCard">
                    <span className="wwaChairmanExpNumber">20+ Yrs</span>
                    <p>Leadership in healthcare and diagnostics.</p>
                  </div>
                  <div className="wwaChairmanExpCard">
                    <span className="wwaChairmanExpNumber">Founder</span>
                    <p>Founded PVP’s oncology and medical technology divisions.</p>
                  </div>
                  <div className="wwaChairmanExpCard">
                    <span className="wwaChairmanExpNumber">Global</span>
                    <p>Key driver of international expansion and innovation.</p>
                  </div>
                </div>
              </div>
              <div className="wwaChairmanFooter">
                <span className="wwaChairmanSignature">Prasad V. Potluri</span>
                <span className="wwaChairmanTitle">Chairman & Founder, Evervie Health</span>
              </div>
            </div>
          </div>
        </section>

        {/* Board of Directors */}
        <section className="section wwaBoard">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">Governance</div>
              <h2>Board of Directors</h2>
            </div>
            <p>Our board provides rigorous oversight and strategic guidance, ensuring Evervie operates with integrity, sustainability, and absolute clinical focus.</p>
          </div>

          <div className="wwaBoardGrid">
            {boardMembers.map((member) => (
              <article key={member.name} className="wwaBoardCard" onClick={() => setActiveBoardMember(member)}>
                <div className="wwaBoardCardVisual">
                  <img src={member.photo} alt={member.name} className="wwaBoardCardImg" />
                </div>
                <div className="wwaBoardCardContent">
                  <h3>{member.name}</h3>
                  <span className="wwaBoardCardTitle">{member.designation}</span>
                  <p className="wwaBoardCardShortBio">{member.shortBio}</p>
                  <div className="wwaBoardCardExpertise">
                    {member.expertise.slice(0, 2).map((exp) => (
                      <span key={exp} className="wwaExpertiseTag">{exp}</span>
                    ))}
                  </div>
                  <button className="wwaBoardCardBtn" aria-label={`View biography of ${member.name}`}>
                    View Full Biography <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Executive Leadership */}
        <section className="section wwaExec">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">Operations</div>
              <h2>Executive Leadership</h2>
            </div>
            <p>The operational team responsible for executing Evervie’s platform strategy, scaling care delivery networks, and supporting day-to-day clinical excellence.</p>
          </div>

          <div className="wwaExecGrid">
            {executiveTeam.map((exec) => (
              <article key={exec.name} className="wwaExecCard">
                <div className="wwaExecCardHeader">
                  <div>
                    <h3>{exec.name}</h3>
                    <span className="wwaExecCardTitle">{exec.designation}</span>
                  </div>
                  <a href={exec.linkedin} target="_blank" rel="noopener noreferrer" className="wwaExecLinkedin" aria-label={`${exec.name} LinkedIn Profile`}>
                    <Linkedin size={16} />
                  </a>
                </div>
                <p className="wwaExecCardBio">{exec.bio}</p>
                <div className="wwaExecCardFooter">
                  <span className="wwaExecExpertiseLabel">Focus:</span>
                  <span className="wwaExecExpertiseText">{exec.expertise}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Leadership Philosophy */}
        <section className="section wwaPhilosophy">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">Philosophy</div>
              <h2>How we lead.</h2>
            </div>
            <p>Operational tenets that define our approach to clinical oversight, partnership, and corporate governance.</p>
          </div>

          <div className="wwaPhilosophyGrid">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <article key={p.title} className="wwaPhilosophyCard">
                  <div className="wwaPhilosophyCardHeader">
                    <span className="wwaPhilosophyIcon"><Icon size={22} strokeWidth={1.5} /></span>
                    <span className="wwaPhilosophyNumber">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Replicated Internal Navigation Section */}
        <section className="wwaAboutNav section">
          <div className="wwaAboutNavLayout">
            <div className="wwaAboutNavIntro">
              <div className="eyebrow">About Evervie</div>
              <h2>Continue the Evervie story.</h2>
              <p>Explore the people, purpose, and principles behind Evervie Health.</p>
              <Link to="/editorial" className="btnOutline">View all About Evervie</Link>
            </div>
            <div className="wwaAboutBento">
              <Link to="/about/mission-vision" className="wwaNavFeature">
                <div className="wwaNavFeatureInner">
                  <div className="wwaNavMeta">
                    <span className="wwaNavNum">02</span>
                    <span className="wwaNavNextTag">Next</span>
                  </div>
                  <h3>Mission & Vision</h3>
                  <p>Why we exist, where we are going, and the future we are working to create.</p>
                  <span className="wwaNavCta">Explore our mission <ArrowRight size={13} /></span>
                </div>
                <Placeholder text="Mission & Vision visual" className="wwaNavFeatureImg" />
              </Link>
              <div className="wwaNavMinorGrid">
                {[
                  { to: "/about/who-we-are", num: "01", title: "Who We Are", desc: "Get to know Evervie—our story and values." },
                  { to: "/about/aspiration", num: "03", title: "Our Aspiration", desc: "The ambition behind the platform." },
                  { to: "/about/governance", num: "04", title: "Our Governance", desc: "Integrity, accountability, and trust." }
                ].map(({ to, num, title, desc }) => (
                  <Link to={to} className="wwaNavMinor" key={title}>
                    <span className="wwaNavNum">{num}</span>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                    <ArrowRight size={14} className="wwaNavArrow" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Signposts */}
        <section className="section">
          <SectionHead eyebrow="Explore Evervie" title="News and insights" copy="The latest news, stories, and perspectives from Evervie and across the healthcare sector." />
          <div className="exploreGrid">
            {[
              ["News & Insights", "Stay informed with the latest news, announcements, and thought leadership from Evervie.", "Read the latest",     "/image-1.png"],
              ["Portfolio",       "Renal care, oncology, diagnostics, and elder care under one platform.",                  "Explore the portfolio", "/image-2.png"],
              ["Investor Centre", "Financial information, announcements, and investor presentations.",                       "Enter Investor Centre", "/image-3.png"]
            ].map(([title, copy, cta, img], i) => (
              <article className={`exploreCard ${i === 0 ? "exploreCardLarge" : ""}`} key={title}>
                <div className="exploreCardText">
                  <span className="exploreIndex">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <a className="btnOutline">{cta}</a>
                </div>
                <img src={img} alt="" className="exploreCardVisual" />
              </article>
            ))}
          </div>
        </section>

      </main>

      {/* Expanded Profile Modal Dialog */}
      {activeBoardMember && (
        <div className="wwaModalOverlay" onClick={() => setActiveBoardMember(null)} role="dialog" aria-modal="true" aria-labelledby="modal-member-name">
          <div className="wwaModal" onClick={(e) => e.stopPropagation()}>
            <button className="wwaModalCloseBtn" onClick={() => setActiveBoardMember(null)} aria-label="Close modal">×</button>
            <div className="wwaModalLayout">
              <div className="wwaModalLeft">
                <img src={activeBoardMember.photo} alt={activeBoardMember.name} className="wwaModalImg" />
                <div className="wwaModalMeta">
                  <h2 id="modal-member-name">{activeBoardMember.name}</h2>
                  <span className="wwaModalTitle">{activeBoardMember.designation}</span>
                  <a href={activeBoardMember.linkedin} target="_blank" rel="noopener noreferrer" className="wwaModalLinkedin">
                    <Linkedin size={16} style={{ marginRight: 6 }} /> LinkedIn Profile
                  </a>
                </div>
              </div>
              <div className="wwaModalRight">
                <div className="wwaModalSection">
                  <h4>Biography</h4>
                  <p className="wwaModalBioText">{activeBoardMember.expandedBio}</p>
                </div>
                
                <div className="wwaModalDivider" />

                <div className="wwaModalSection">
                  <h4>Areas of Expertise</h4>
                  <div className="wwaModalExpertiseTags">
                    {activeBoardMember.expertise.map((exp) => (
                      <span key={exp} className="wwaExpertiseTag">{exp}</span>
                    ))}
                  </div>
                </div>

                <div className="wwaModalDivider" />

                <div className="wwaModalSection">
                  <h4>Committee & Governance Responsibilities</h4>
                  <p className="wwaModalResponsibilities">{activeBoardMember.responsibilities}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Frame>
  );
}
function AboutMissionVision() {
  return <InnerPage eyebrow="About Evervie" title="Mission & Vision" lead="Why we exist, where we are going, and the future we are working to create." />;
}
function AboutAspiration() {
  return <InnerPage eyebrow="About Evervie" title="Our Aspiration" lead="Our ambition to transform healthcare and improve lives at meaningful scale." />;
}
function AboutGovernance() {
  return <InnerPage eyebrow="About Evervie" title="Our Governance" lead="The principles, practices, and oversight that ensure integrity, accountability, and trust." />;
}

export default function App() {
  return <><RouteLoader /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/editorial" element={<Editorial />} />
    <Route path="/bento" element={<Bento />} />
    <Route path="/journey" element={<Journey />} />
    <Route path="/about/who-we-are" element={<AboutWhoWeAre />} />
    <Route path="/about/leadership" element={<AboutLeadership />} />
    <Route path="/about/mission-vision" element={<AboutMissionVision />} />
    <Route path="/about/aspiration" element={<AboutAspiration />} />
    <Route path="/about/governance" element={<AboutGovernance />} />
  </Routes></>;
}
