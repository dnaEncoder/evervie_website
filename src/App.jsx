import { useState, useEffect, useRef } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { User, Users, Target, Sparkles, ShieldCheck, Droplet, HeartPulse, Microscope, HandHeart, Network, Presentation, BarChart3, Megaphone, PanelsTopLeft, ArrowRight, Globe2, UsersRound, Building2, Award, Heart, Mail, ArrowUp } from "lucide-react";

const menu = [
  ["About Evervie", ["Who We Are", "Our Leadership", "Mission & Vision", "Our Aspiration", "Our Governance"]],
  ["Portfolio", ["Renal Care", "Oncology", "Diagnostics", "Elder Care (Coming Soon)", "Individual Company Pages"]],
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
      { title: "Elder Care", description: "A future-focused care platform designed around dignity, comfort, and support for ageing communities.", route: "/portfolio/elder-care", icon: HandHeart, badge: "Coming Soon" },
      { title: "Individual Company Pages", description: "Explore the operating companies, care networks, locations, and impact within the Evervie portfolio.", route: "/portfolio/companies", icon: Network }
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
  ["Renal Care", "Supporting patients through every stage of kidney care", "Continuity, clinical support, and accessible specialist kidney care across communities."],
  ["Oncology", "Compassionate cancer care with specialist focus", "Timely, trusted, and human-centered care across the patient journey."],
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
          {config.items.map(({ title, description, icon: Icon, badge }) => (
            <a href="#" className="megaRow" key={title}>
              <span className="megaIcon"><Icon size={32} strokeWidth={1.75} /></span>
              <span className="megaRowText"><b>{title}{badge && <span className="megaBadge">{badge}</span>}</b><p>{description}</p></span>
              <ArrowRight className="megaArrow" size={24} />
            </a>
          ))}
        </div>
        {config.contextStrip && <div className="megaStrip">{config.contextStrip}</div>}
      </div>
    </div>
  );
}

function EditorialNav() {
  const [openMenu, setOpenMenu] = useState(null);
  const triggerRefs = useRef([]);
  const closeTimer = useRef(null);
  const openMega = (id) => { clearTimeout(closeTimer.current); setOpenMenu(id); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 250); };
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
    <header className="nav navEditorial">
      <Logo />
      <div className="navLinks">
        <NavLink to="/editorial">Home</NavLink>
        {megaMenuConfigs.map((config, i) => (
          <MegaMenu key={config.id} config={config} isOpen={openMenu === config.id}
            onOpen={() => openMega(config.id)} onClose={scheduleClose}
            triggerRef={(el) => (triggerRefs.current[i] = el)} />
        ))}
        <a>News & Insights</a><a>Careers</a><a>Connect</a>
      </div>
      <div className="actions"><a className="btnOutline">Enter Investor Centre</a><span className="search">⌕</span></div>
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
  useEffect(() => { if (videoRef.current) videoRef.current.playbackRate = 0.6; }, []);
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
      <div className="heroStage">
        <div className="editorialHeroGrid"><div><div className="eyebrow">Future-focused healthcare</div><h1>Advancing specialized care for more people, in more places</h1><p className="lead">Evervie is building healthcare platforms that expand access, strengthen quality, and scale care with purpose.</p><p>Across critical areas of care, we bring together focused healthcare expertise, long-term operating discipline, and a patient-first belief in better care delivery.</p><div className="buttonRow"><a className="btn">Explore Our Care Platforms</a>{/* <a className="btnOutline">Enter Investor Centre</a> */}</div></div></div>
      </div>
    </section>
    <section className="editorialHero heroAlt">
      <div className="heroStage">
        <div className="editorialHeroGrid"><div><div className="eyebrow">Future-focused healthcare</div><h1>Advancing specialized care for more people, in more places</h1><p className="lead">Evervie is building healthcare platforms that expand access, strengthen quality, and scale care with purpose.</p><p>Across critical areas of care, we bring together focused healthcare expertise, long-term operating discipline, and a patient-first belief in better care delivery.</p><div className="buttonRow"><a className="btn">Explore Our Care Platforms</a><a className="btnOutline">Enter Investor Centre</a></div></div></div>
      </div>
    </section>
    <section className="section">
      <img className="heroWideVisual" src="/media/hero-wide-visual.png" alt="Full-width healthcare ecosystem visual" />
      <ScaleSnapshot />
    </section>
    {/* <section className="section"><SectionHead eyebrow="Purpose in practice" title="Access, quality, and scale — built into the way care moves" copy="Evervie's brand marks stand in for three commitments — click one to read it in full." /><Pillars /></section> */}
    <section className="section"><img className="ethosVariant" src="/ethos-3.jpg" alt="Access, quality, and scale presented as an orbital diagram around the Evervie mark" /></section>
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

export default function App() {
  return <><RouteLoader /><Routes><Route path="/" element={<Home />} /><Route path="/editorial" element={<Editorial />} /><Route path="/bento" element={<Bento />} /><Route path="/journey" element={<Journey />} /></Routes></>;
}
