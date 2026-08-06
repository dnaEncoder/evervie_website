import { useState, useEffect, useRef } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useSearchParams, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { User, Users, Target, Sparkles, ShieldCheck, Droplet, HeartPulse, Microscope, HandHeart, Network, Presentation, BarChart3, Megaphone, PanelsTopLeft, ArrowRight, Globe2, UsersRound, Building2, Award, Heart, Mail, ArrowUp, TrendingUp, ChevronLeft, ChevronRight, Activity, Home as HomeIcon, MapPin, Download, FileText, Newspaper, Calendar, Clock, Video, Bell, Search, ChevronDown, SlidersHorizontal, Inbox, AlertCircle, CalendarPlus, ExternalLink, X, PieChart, ClipboardList, CheckSquare, Folder, Briefcase } from "lucide-react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getInvestorCentrePage, getFinancialDocuments, getLatestInvestorNews, getUpcomingInvestorEvents, getFeaturedNews, getFeaturedPastEvents, getPastInvestorEvents } from "./lib/investorApi.js";
import { getHeroArticle, getFeaturedInsights, getBlogPosts, getBlogPostBySlug, getRelatedArticles, getBlogFacets } from "./lib/newsApi.js";
import { getCareerOpenings, getCareerOpeningBySlug, getRelatedOpenings, getCareerFacets } from "./lib/careersApi.js";
import FeedbackLoginPage from "./feedback/FeedbackLoginPage.jsx";
import FeedbackVerifyPage from "./feedback/FeedbackVerifyPage.jsx";
import FeedbackWidget from "./feedback/FeedbackWidget.jsx";
import FeedbackCopyTracker from "./feedback/FeedbackCopyTracker.jsx";

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
  ["About Evervie", ["Who We Are", "Our Leadership", "Mission & Vision", "Our Governance · Coming Soon"]],
  ["Portfolio", ["Renal Care", "Oncology", "Diagnostics", "Elder Care · Coming Soon"]],
  ["Investor Relations", ["Investor Centre", "Financial Information", "Announcements", "Investor Presentations"]]
];

const megaMenuConfigs = [
  {
    id: "about",
    triggerLabel: "About Evervie",
    image: "/image-1.png",
    eyebrow: "ABOUT EVERVIE",
    headline: "Building the healthcare system the world deserves.",
    supportingCopy: "We combine deep healthcare expertise with technology and compassion to deliver measurable outcomes at scale.",
    contextStrip: "Everything we do is centred on three outcomes that matter. Access · Quality · Scale",
    items: [
      { title: "Who we are", description: "Get to know Evervie—our story, values, and the purpose that drives us forward.", route: "/about/who-we-are", icon: User },
      { title: "Our leadership", description: "Meet the leaders guiding Evervie with expertise, experience, and heart.", route: "/about/leadership", icon: Users },
      { title: "Mission & vision", description: "Why we exist, where we are going, and the future we are working to create.", route: "/about/mission-vision", icon: Target },
      { title: "Our governance", description: "The principles, practices, and oversight that ensure integrity, accountability, and trust.", route: "#", icon: ShieldCheck, badge: "Coming soon" }
    ]
  },
  {
    id: "portfolio",
    triggerLabel: "Portfolio",
    image: "/image-2.png",
    eyebrow: "OUR PORTFOLIO",
    headline: "Delivering specialized care across critical verticals.",
    supportingCopy: "Evervie builds dedicated operating platforms in renal care, oncology, diagnostics, and elder care.",
    contextStrip: "Explore our specialty brands. 7Med India · Optimus Oncology · Medilabs",
    items: [
      { title: "Renal care", description: "Learn about 7Med India—our dedicated renal care platform across India.", route: "/portfolio/renal-care", icon: Droplet },
      { title: "Oncology", description: "Explore Optimus Oncology—coordinated, expert cancer care closer to home.", route: "/portfolio/oncology", icon: HeartPulse },
      { title: "Diagnostics", description: "Discover Medilabs—precise pathology, radiology, and wellness screenings.", route: "/portfolio/diagnostics", icon: Microscope },
      { title: "Elder care", description: "A concept care model designed around healthy ageing, security, and comfort.", route: "#", icon: HandHeart, badge: "Coming soon" }
    ]
  },
  {
    id: "investors",
    triggerLabel: "Investor relations",
    image: "/image-3.png",
    eyebrow: "INVESTOR RELATIONS",
    headline: "Information, performance, and perspective for investors.",
    supportingCopy: "Access Evervie's investor centre, financial information, and announcements.",
    items: [
      { title: "Investor centre", description: "Access information about Evervie's healthcare platform, financial performance, and disclosures.", route: "/investor-centre", icon: Presentation },
      { title: "Financial information", description: "Access financial results, reports, filings, and other performance information.", route: "/investor-centre/financial-information", icon: BarChart3 },
      { title: "Announcements", description: "View official company announcements, disclosures, and material updates.", route: "/investor-centre/announcements", icon: Megaphone }
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
  ["Elder Care", "Care for an ageing future", "Dignity, comfort, and support for families as care needs evolve."]
];

const regions = [
  ["India", "Core market for specialized care network growth."],
  ["International Reach", "Selective footprint across healthcare and investment markets."],
  ["Priority Expansion", "Focused opportunities across high-need care segments."],
  ["Local Delivery", "Global ambition grounded in community care."]
];

const presenceLocations = [
  {
    company: "7Med India",
    vertical: "Renal Care",
    logo: "/7med_logo_No Background.png",
    colorHex: "#FF3C00",
    cities: [
      { city: "Delhi", coordinates: [28.6139, 77.2090] },
      { city: "Moradabad", coordinates: [28.8386, 78.7733] },
      { city: "Varanasi", coordinates: [25.3176, 82.9739] },
      { city: "Mau", coordinates: [25.9417, 83.5611] }
    ]
  },
  {
    company: "Optimus Oncology",
    vertical: "Oncology",
    logo: "/OPTIMUS LOGO.JPG",
    colorHex: "#C850A0",
    cities: [
      { city: "Latur", coordinates: [18.4088, 76.5604] },
      { city: "Akola", coordinates: [20.7002, 77.0082] },
      { city: "Solapur", coordinates: [17.6599, 75.9064] },
      { city: "Dhule", coordinates: [20.9020, 74.7749] },
      { city: "Pimpri-Chinchwad", coordinates: [18.6298, 73.7997] }
    ]
  },
  {
    company: "Medilabs",
    vertical: "Diagnostics",
    logo: "/Medilabs logo.webp",
    colorHex: "#FABE00",
    cities: [
      { city: "Chennai", coordinates: [13.0827, 80.2707] },
      { city: "Coimbatore", coordinates: [11.0168, 76.9558] },
      { city: "Madurai", coordinates: [9.9252, 78.1198] },
      { city: "Trichy", coordinates: [10.7905, 78.7047] },
      { city: "Salem", coordinates: [11.6643, 78.1460] }
    ]
  }
];

const signposts = [
  ["About Evervie", "Who we are, our leadership, and the mission behind the platform.", "Learn about Evervie", "/news_insights_editorial.png"],
  ["Portfolio", "Renal care, oncology, diagnostics, and elder care under one platform.", "Explore the portfolio", "/image-2.png"],
  ["Investor Centre", "Financial information, announcements, and investor presentations.", "Enter Investor Centre", "/image-3.png"]
];

const insights = [
  ["Featured insight", "Building specialized healthcare platforms for the next decade of care", "Focused platforms can expand access, strengthen quality, and support patients across the care journey."],
  ["News", "Evervie continues focus on specialized healthcare growth", "Company update on platform development and care network expansion."],
  ["Patient care thinking", "Why continuity matters in complex health journeys", "A care-focused perspective on trust, support, and long-term patient confidence."],
  ["Investor updates", "Latest investor presentation now available", "Access shareholder resources and corporate information."]
];

function EyebrowSymbol() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="eyebrowSymbol">
      <img src="/circle-1.svg" alt="" className={`eyebrowSymbolIcon ${index === 0 ? "active" : ""}`} />
      <img src="/star-1.svg" alt="" className={`eyebrowSymbolIcon ${index === 1 ? "active" : ""}`} />
      <img src="/bloom-1.svg" alt="" className={`eyebrowSymbolIcon ${index === 2 ? "active" : ""}`} />
    </span>
  );
}

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
      <div className="dropPanel">
        <strong>{title}</strong>
        {items.map((item) => {
          const hasBadge = item.includes(" · Coming Soon");
          const label = hasBadge ? item.replace(" · Coming Soon", "") : item;
          return (
            <a href="#" key={item} style={hasBadge ? { opacity: 0.7, pointerEvents: 'none' } : {}}>
              {label}
              {hasBadge && <span className="badge" style={{ marginLeft: 6, opacity: 0.8, fontSize: 10, background: 'rgba(40,40,40,0.06)', padding: '2px 6px', borderRadius: 4, fontWeight: 500, color: '#666' }}>Coming Soon</span>}
            </a>
          );
        })}
      </div>
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
          {config.image ? (
            <img src={config.image} alt="" className="megaVisual" style={{ objectFit: "cover", borderRadius: "12px", marginTop: "16px" }} />
          ) : (
            <Placeholder text={`${config.triggerLabel} visual`} className="megaVisual" />
          )}
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
          <NavLink to="/">Home</NavLink>
          {megaMenuConfigs.map((config, i) => (
            <MegaMenu key={config.id} config={config} isOpen={openMenu === config.id}
              onOpen={() => openMega(config.id)} onClose={scheduleClose}
              triggerRef={(el) => (triggerRefs.current[i] = el)} />
          ))}
          <Link to="/news-insights">News & Insights</Link><Link to="/careers">Careers</Link><a>Connect</a>
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
        <Link to="/news-insights">News</Link><Link to="/careers">Careers</Link><a>Connect</a>
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
        <NavLink to="/journey">Home</NavLink><a>About Evervie</a><a>Portfolio</a><a>Investor Relations</a><Link to="/news-insights">News & Insights</Link><Link to="/careers">Careers</Link><a>Connect</a>
      </div>
      {open && (
        <div className="journeyMega">
          {menu.map(([title, items]) => (
            <div key={title}><h4>{title}</h4>{items.map((item) => <a href="#" key={item}>{item}</a>)}</div>
          ))}
          <div><h4>Fast actions</h4><a>Enter investor centre</a><a>Start partnership conversation</a><a>Connect with Evervie</a></div>
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
      <div>
        <h4>About Evervie</h4>
        <Link to="/about/who-we-are">Who we are</Link>
        <Link to="/about/leadership">Our leadership</Link>
        <Link to="/about/mission-vision">Mission & vision</Link>
        <Link to="#" style={{ opacity: 0.7, cursor: 'default' }} onClick={e => e.preventDefault()}>Our governance <span style={{ fontSize: 10, background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4, marginLeft: 4, fontWeight: 500, color: '#666' }}>Coming soon</span></Link>
      </div>
      <div>
        <h4>Portfolio</h4>
        <Link to="/portfolio/renal-care">Renal care</Link>
        <Link to="/portfolio/oncology">Oncology</Link>
        <Link to="/portfolio/diagnostics">Diagnostics</Link>
        <Link to="#" style={{ opacity: 0.7, cursor: 'default' }} onClick={e => e.preventDefault()}>Elder care <span style={{ fontSize: 10, background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4, marginLeft: 4, fontWeight: 500, color: '#666' }}>Coming soon</span></Link>
      </div>
      <div><h4>Investor relations</h4><Link to="/investor-centre">Investor centre</Link><Link to="/investor-centre/financial-information">Financial information</Link><Link to="/investor-centre/announcements">Announcements</Link><Link to="/investor-centre/presentations">Investor presentations</Link></div>
      <div><h4>News & careers</h4><Link to="/news-insights">Featured insights</Link><a href="#">Media updates</a><Link to="/careers">Careers</Link></div>
      <div><h4>Connect</h4><a href="#">Contact Evervie</a><a href="#">Partnership enquiries</a><a href="#">Investor contact</a></div>
      <div className="fineprint"><span>© 2026 Evervie Health — Wireframe prototype.</span><span>Privacy Policy · Terms of Use</span></div>
    </footer>
  );
}

const footerNavColumns = [
  { 
    title: "About Evervie", 
    links: megaMenuConfigs[0].items.map((i) => ({ title: i.title, to: i.route || "#", badge: i.badge })) 
  },
  { 
    title: "Portfolio", 
    links: megaMenuConfigs[1].items.map((i) => ({ title: i.title, to: i.route || "#", badge: i.badge })) 
  },
  { 
    title: "Investor Relations", 
    links: megaMenuConfigs[2].items.map((i) => ({ title: i.title, to: i.route || "#", badge: i.badge })) 
  },
  { 
    title: "News & Careers",
    links: [
      { title: "Featured Insights", to: "/news-insights" },
      { title: "Media Updates", to: "#" },
      { title: "Careers", to: "/careers" }
    ] 
  },
  { 
    title: "Connect", 
    links: [
      { title: "Contact Evervie", to: "#" },
      { title: "Partnership Enquiries", to: "#" },
      { title: "Investor Contact", to: "#" }
    ] 
  }
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
            <div className="footerColLinks">
              <div>
                {col.links.map((l) => (
                  <Link to={l.to} key={l.title} style={l.badge ? { opacity: 0.7, cursor: 'default' } : {}} onClick={l.badge ? e => e.preventDefault() : undefined}>
                    {l.title}
                    {l.badge && <span className="badge" style={{ marginLeft: 6, opacity: 0.8, fontSize: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', padding: '2px 6px', borderRadius: 4, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{l.badge}</span>}
                  </Link>
                ))}
              </div>
            </div>
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
  return <div className="sectionHead"><div><div className="eyebrow"><EyebrowSymbol />{eyebrow}</div><h2>{title}</h2></div><p>{copy}</p></div>;
}

function Metrics({ className = "" }) {
  return <div className={`metrics ${className}`}>{metrics.map(([k, v, c]) => <article key={k}><span className="tag">{k}</span><b>{v}</b><p>{c}</p></article>)}</div>;
}

function CompanySnapshot() {
  return (
    <div className="companySnapshot">
      <div className="ssIntro">
        <div className="eyebrow"><EyebrowSymbol />Scale Snapshot</div>
        <h2 className="ssHeadline">Built to reach further. Built to last.</h2>
        <p className="ssBody">A growing healthcare platform with operating presence across markets, care networks, and specialised verticals — expanding with discipline and purpose.</p>
        <div className="ssCallout">
          <span className="ssCalloutIcon"><TrendingUp size={16} strokeWidth={1.5} /></span>
          <p className="ssCalloutText">Committed to expanding access to specialised care where it matters most.</p>
        </div>
      </div>
      <div className="ssPanel">
        <div className="ssMetricRow">
          {scaleMetrics.filter(m => m.label !== "Care Network").map(({ label, value, description, icon: Icon, tone }) => (
            <article className="metricCard" key={label}>
              <div className="metricHeader">
                <span className={`metricIcon metricIcon--${tone}`}><Icon /></span>
                <span className="metricLabel">{label}</span>
              </div>
              <strong className="metricValue">{value}</strong>
              <p className="metricDescription">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompanySnapshotWithMap() {
  const navigate = useNavigate();
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch("/india_states.geojson")
      .then(res => res.json())
      .then(data => setGeoJsonData(data))
      .catch(err => console.error("Failed to load GeoJSON:", err));
  }, []);

  const sevenMedStates = ["Delhi", "Haryana", "Rajasthan", "Uttar Pradesh", "Uttarakhand", "Bihar", "Jharkhand"];
  const optimusStates = ["Maharashtra"];
  const medilabsStates = ["Tamil Nadu"];

  const getStateStyle = (feature) => {
    const name = feature.properties.NAME_1;
    const normalized = name === "Uttaranchal" ? "Uttarakhand" : name;
    if (sevenMedStates.includes(normalized))
      return { fillColor: "rgba(255,60,0,0.14)", stroke: true, weight: 1, opacity: 1, color: "rgba(255,60,0,0.45)", fillOpacity: 1 };
    if (optimusStates.includes(normalized))
      return { fillColor: "rgba(200,80,160,0.16)", stroke: true, weight: 1, opacity: 1, color: "rgba(200,80,160,0.45)", fillOpacity: 1 };
    if (medilabsStates.includes(normalized))
      return { fillColor: "rgba(250,190,0,0.18)", stroke: true, weight: 1, opacity: 1, color: "rgba(200,150,0,0.45)", fillOpacity: 1 };
    return { fillColor: "url(#pres-diagonal-stripes)", stroke: true, weight: 1, opacity: 1, color: "#d2ccc6", fillOpacity: 1 };
  };

  const onEachFeature = (feature, layer) => {
    const name = feature.properties.NAME_1;
    const normalized = name === "Uttaranchal" ? "Uttarakhand" : name;
    const is7med = sevenMedStates.includes(normalized);
    const isOptimus = optimusStates.includes(normalized);
    const isMedilabs = medilabsStates.includes(normalized);
    if (is7med || isOptimus || isMedilabs) {
      const label = is7med ? "7Med India · Renal Care" : isOptimus ? "Optimus Oncology" : "Medilabs · Diagnostics";
      const accent = is7med ? "#FF3C00" : isOptimus ? "#C850A0" : "#B08800";
      layer.bindTooltip(
        `<div style="font-family:inherit;font-size:12px;padding:4px 8px;"><strong style="color:${accent};display:block;margin-bottom:2px;">${label}</strong><span>${normalized}</span></div>`,
        { sticky: true, direction: "auto", opacity: 0.95 }
      );
    }
  };

  // Logo card markers (one per company, at primary city — first city in array)
  const logoIcons = typeof window !== "undefined"
    ? presenceLocations.map(({ colorHex, logo, company }) => new L.DivIcon({
      html: `<div class="presenceLogoPin" style="border-color:${colorHex};"><img src="${logo}" alt="${company}" /><div class="presencePinDot" style="background:${colorHex};"></div></div>`,
      className: "presencePinWrap",
      iconSize: null,
      iconAnchor: [65, 62],
      popupAnchor: [0, -64]
    }))
    : [];

  // Small dot markers for secondary cities
  const dotIcons = typeof window !== "undefined"
    ? presenceLocations.map(({ colorHex }) => new L.DivIcon({
      html: `<div style="width:10px;height:10px;border-radius:50%;background:${colorHex};border:2px solid #fff;box-shadow:0 1px 5px ${colorHex}88;"></div>`,
      className: "",
      iconSize: [10, 10],
      iconAnchor: [5, 5],
      popupAnchor: [0, -8]
    }))
    : [];

  return (
    <div className="companySnapshotMap">
      <div className="csmLeft">
        <div className="ssIntro">
          <div className="eyebrow"><EyebrowSymbol />Our Presence</div>
          <h2 className="ssHeadline">Built to reach further. Built to last.</h2>
          <p className="ssBody">A growing healthcare platform with operating presence across markets, care networks, and specialised verticals — expanding with discipline and purpose.</p>
          <div className="ssCallout">
            <span className="ssCalloutIcon"><TrendingUp size={16} strokeWidth={1.5} /></span>
            <p className="ssCalloutText">Committed to expanding access to specialised care where it matters most.</p>
          </div>
        </div>
        <div className="ssPanel">
          <div className="ssMetricRow">
            {scaleMetrics.filter(m => m.label !== "Care Network").map(({ label, value, description, icon: Icon, tone }) => (
              <article className="metricCard" key={label}>
                <div className="metricHeader">
                  <span className={`metricIcon metricIcon--${tone}`}><Icon /></span>
                  <span className="metricLabel">{label}</span>
                </div>
                <strong className="metricValue">{value}</strong>
                <p className="metricDescription">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="csmRight">
        <div className="mapContainerWrapper">
          <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
            <defs>
              <pattern id="pres-diagonal-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#eae6e1" strokeWidth="1.5" />
              </pattern>
            </defs>
          </svg>
          {geoJsonData && (
            <MapContainer
              center={[20.5, 80.0]}
              zoom={5.2}
              zoomSnap={0.1}
              scrollWheelZoom={false}
              doubleClickZoom={false}
              dragging={false}
              zoomControl={false}
              attributionControl={false}
              touchZoom={false}
              boxZoom={false}
              keyboard={false}
            >
              <GeoJSON data={geoJsonData} style={getStateStyle} onEachFeature={onEachFeature} />
              {presenceLocations.map(({ company, vertical, cities, colorHex }, idx) =>
                cities.map(({ city, coordinates }, cityIdx) => {
                  const isPrimary = cityIdx === 0;
                  const route = vertical === "Renal Care" ? "/portfolio/renal-care" : vertical === "Oncology" ? "/portfolio/oncology" : "/portfolio/diagnostics";
                  return isPrimary ? (
                    <Marker
                      key={`${company}-${city}`}
                      position={coordinates}
                      icon={logoIcons[idx]}
                      eventHandlers={{
                        click: () => {
                          navigate(route);
                        }
                      }}
                    >
                      <Popup>
                        <div className="presencePopup">
                          <img src={presenceLocations[idx].logo} alt={company} className="presencePopupLogo" />
                          <div className="presencePopupInfo">
                            <strong>{company}</strong>
                            <span className="presencePopupVertical">{vertical}</span>
                            <span className="presencePopupCity">{city}</span>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ) : (
                    <Marker key={`${company}-${city}`} position={coordinates} icon={dotIcons[idx]}>
                      <Tooltip permanent direction="right" offset={[8, 0]} className="custom-map-label">
                        {city}
                      </Tooltip>
                      <Popup>
                        <div style={{ fontFamily: 'inherit', fontSize: 13, lineHeight: 1.4, padding: 4 }}>
                          <strong style={{ color: colorHex, fontSize: 14, display: 'block', marginBottom: 4 }}>{company}</strong>
                          <span style={{ fontWeight: 700 }}>{city}</span><br />
                          <span style={{ color: '#666', marginTop: 4, display: 'block' }}>{vertical}</span>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })
              )}
            </MapContainer>
          )}
          <div className="mapLegendBox">
            <h4>Evervie presence</h4>
            {presenceLocations.map(({ company, vertical, colorHex }) => (
              <div className="legendItem" key={company}>
                <span className="legendColorBox" style={{ background: colorHex + "28", border: `1.5px solid ${colorHex}` }} />
                <div>
                  <strong>{company}</strong>
                  <p>{vertical}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
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
    <div className="ctaGrid"><article><span className="tag">Investors</span><h3>Enter investor centre</h3><p>Find reports, announcements, presentations, governance information, and shareholder resources.</p><a className="btn">Enter investor centre</a></article><article><span className="tag">Partners</span><h3>Start a partnership conversation</h3><p>Connect with Evervie to explore healthcare partnerships, growth conversations, and strategic opportunities.</p><a className="btn">Start a conversation</a></article><article><span className="tag">General enquiries</span><h3>Connect with Evervie</h3><p>Reach out for media, talent, business, healthcare, or general company enquiries.</p><a className="btn">Contact Evervie</a></article></div>
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
        {signposts.map(([title, copy, cta, img], i) => (
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
  );
}

function Editorial() {
  return <Frame nav={<EditorialNav />} label="Variation 01 · Editorial layered homepage" brand footer={<EditorialFooter />}><main>
    {/* <section className="editorialHero">
      <img className="heroCurcleReveal" src="/Evervie_PPT_Curcle_v1.png" alt="" />
      <div className="heroStage">
        <div className="editorialHeroGrid"><div><div className="eyebrow">Future-focused healthcare</div><h1>Advancing specialized care for more people, in more places</h1><p className="lead">Evervie is building healthcare platforms that expand access, strengthen quality, and scale care with purpose.</p><p>Across critical areas of care, we bring together focused healthcare expertise, long-term operating discipline, and a patient-first belief in better care delivery.</p><div className="buttonRow"><a className="btn">Explore Our Care Platforms</a></div></div></div>
      </div>
    </section> */}
    <section className="editorialHero hero3dAsset">
      <img className="hero3dBg" src="/hero-section-image-background.png" alt="" />
      <div className="heroStage">
        <div className="editorialHeroGrid"><div><div className="eyebrow"><EyebrowSymbol />Future-focused healthcare</div><h1>Providing high-quality specialty care for the underserved</h1><p className="lead">Evervie is building healthcare platforms that expand access, strengthen quality, and scale care with purpose.</p><p>Evervie Health builds and scales exceptional operating companies, globally. We back founder-led healthcare businesses with majority capital, the expertise to scale and long-term support</p><div className="buttonRow"><a className="btn">Explore Our Care Platforms</a>{/* <a className="btnOutline">Enter Investor Centre</a> */}</div></div></div>
      </div>
    </section>
    {/* <section className="editorialHero heroVideoSplit">
      <div className="heroStage">
        <div className="editorialHeroGrid heroVidGrid">
          <div className="heroVidLeft">
            <div className="eyebrow">Future-focused healthcare</div>
            <h1>Advancing specialized care for more people, in more places</h1>
            <p className="lead">Evervie is building healthcare platforms that expand access, strengthen quality, and scale care with purpose.</p>
            <p>Across critical areas of care, we bring together focused healthcare expertise, long-term operating discipline, and a patient-first belief in better care delivery.</p>
            <div className="buttonRow"><a className="btn">Explore Our Care Platforms</a></div>
          </div>
          <div className="heroVidRight">
            <video autoPlay muted loop playsInline src="/trimmed-logo-anmation-video.mp4" className="heroVidAsset" />
          </div>
        </div>
      </div>
    </section> */}
    {/* <section className="editorialHero heroBgStyle2">
      <div className="heroStage">
        <div className="editorialHeroGrid heroSplitGrid">
          <div className="heroSplitLeft">
            <div className="eyebrow">Future-focused healthcare</div>
            <h1>Advancing specialized care for more people, in more places</h1>
          </div>
          <div className="heroSplitRight">
            <p className="lead">Evervie is building healthcare platforms that expand access, strengthen quality, and scale care with purpose.</p>
            <p>Across critical areas of care, we bring together focused healthcare expertise, long-term operating discipline, and a patient-first belief in better care delivery.</p>
            <div className="buttonRow"><a className="btn">Explore Our Care Platforms</a></div>
          </div>
        </div>
      </div>
    </section> */}
    {/* <section className="editorialHero heroAlt">
      <div className="heroStage">
        <div className="editorialHeroGrid"><div><div className="eyebrow">Future-focused healthcare</div><h1>Advancing specialized care for more people, in more places</h1><p className="lead">Evervie is building healthcare platforms that expand access, strengthen quality, and scale care with purpose.</p><p>Across critical areas of care, we bring together focused healthcare expertise, long-term operating discipline, and a patient-first belief in better care delivery.</p><div className="buttonRow"><a className="btn">Explore Our Care Platforms</a><a className="btnOutline">Enter Investor Centre</a></div></div></div>
      </div>
    </section> */}
    {/* <section className="editorialHeroGradient">
      <video className="heroVideoBg" autoPlay muted loop playsInline src="/Evervie_Gradient_AE_!6x9.mp4" />
      <div className="heroGradientOverlay" />
      <div className="heroGradientContent">
        <span className="heroGradientEyebrow">Future-focused healthcare</span>
        <h1 className="heroGradientHeadline">Advancing specialized care<br />for more people, in more places</h1>
        <p className="heroGradientLead">Evervie is building healthcare platforms that expand access,<br />strengthen quality, and scale care with purpose.</p>
        <div className="heroGradientActions">
          <a className="btn">Explore Our Care Platforms</a>
          <a className="btnOutline">Enter Investor Centre</a>
        </div>
      </div>
    </section> */}
    <section className="editorialAboutSection">
      <div className="editorialAboutContainer">
        <div className="editorialAboutVisual">
          <img src="/Evervie_1583.jpg" alt="Evervie Leadership Group" className="editorialAboutImg editorialAboutImg--default" />
          <img src="/Evervie_1599.jpg" alt="Evervie Leadership Group Alternate" className="editorialAboutImg editorialAboutImg--hover" />
          <div className="editorialAboutImageOverlay">
            <span className="editorialAboutImageCaption">Evervie Leadership Team & Partners</span>
          </div>
        </div>
        <div className="editorialAboutContent">
          <div className="eyebrow"><EyebrowSymbol />About Evervie</div>
          <h2 className="editorialAboutHeadline">Led by vision. Built for lasting care.</h2>
          
          <p className="editorialAboutLead">
            Evervie’s mission is to build, deliver, and scale global specialty care. Under the guidance of our leadership team, we are shaping a future where high-quality specialty care is never distant or fragmented, but present, dependable, and accessible to communities worldwide.
          </p>

          <div className="editorialAboutMessage">
            <blockquote className="editorialAboutQuote">
              "We construct care systems that put the patient's needs and clinical quality above all else, combining deep operating discipline with clinical innovation."
            </blockquote>
          </div>

          <div className="editorialAboutPillars">
            <div className="editorialAboutPillar">
              <h4>Clinical quality</h4>
              <p>Constructing care systems that prioritize patient outcomes, clinical quality, and consistent care standards above all else.</p>
            </div>
            <div className="editorialAboutPillar">
              <h4>Operating discipline</h4>
              <p>Driving long-term platform strategy and scaling dependable healthcare networks with efficiency and purpose.</p>
            </div>
            <div className="editorialAboutPillar">
              <h4>Strategic partnerships</h4>
              <p>Driving global innovation through advanced diagnostics, patient-focused specialist care, and trusted collaborations.</p>
            </div>
          </div>

          <div className="editorialAboutActions">
            <Link to="/about/leadership" className="btn">Meet our leadership</Link>
            <Link to="/about/mission-vision" className="btnOutline">Our mission & vision</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="section">
      <CompanySnapshotWithMap />
    </section>
    <Signposts />
  </main></Frame>;
}

function Bento() {
  return <Frame nav={<BentoNav />} label="Variation 02 · Modular bento homepage"><main>
    <section className="bentoHero"><div className="bentoGrid"><article className="bentoMain"><div><div className="eyebrow"><EyebrowSymbol />Future-focused healthcare</div><h1>Specialized care, built for the next era</h1><p className="lead">Evervie builds healthcare platforms that expand access, strengthen quality, and scale care with purpose.</p><p>Our work is shaped by a patient-first belief in better delivery, stronger systems, and healthcare that can reach further.</p></div><div className="buttonRow"><a className="btn">Explore Care Platforms</a><a className="btnOutline">Enter Investor Centre</a></div></article><Placeholder text="Hero care visual" /><article className="bentoTile"><span className="tag">Care network</span><b>250+</b><p>Care touchpoints across patient-facing services.</p></article><article className="bentoTile"><span className="tag">Locations</span><b>80+</b><p>Operating locations across priority markets.</p></article><article className="bentoTile"><h3>Specialized care. Scaled with purpose</h3><p>A compact promise that makes the page feel more brand-led.</p><a className="btnOutline">Partner With Us</a></article></div></section>
    <section className="section"><SectionHead eyebrow="Purpose in practice" title="Three ideas, one care-building system" copy="A central brand belief block surrounded by the three proof themes." /><div className="coreWheel"><article><span className="tag">Access</span><h3>Care should be easier to reach</h3><p>We build with communities and patients in mind, making specialized healthcare more accessible.</p></article><article className="center"><span className="tag">Evervie promise</span><h3>Access. Quality. Scale</h3><p>Better healthcare is built when reach, trust, and operating discipline move together.</p></article><article><span className="tag">Quality</span><h3>Trust should be felt in every care experience</h3><p>We focus on consistency, continuity, and care environments families can rely on.</p></article><article><span className="tag">Scale</span><h3>Growth should create lasting care value</h3><p>Healthcare platforms must grow responsibly so they can serve more patients and regions.</p></article></div></section>
    <section className="section"><SectionHead eyebrow="Care gateway" title="Four focused pathways into Evervie’s care world" copy="Staggered vertical cards make the section feel less boxy while still showing the complete portfolio overview." /><div className="staggeredCards">{verticals.map(([l, t, c], i) => {
      const path = i === 0 ? "/portfolio/oncology" : i === 1 ? "/portfolio/renal-care" : i === 2 ? "/portfolio/diagnostics" : "/portfolio/elder-care";
      return (
        <article key={l} style={{ marginTop: i % 2 ? 60 : 0 }}>
          <Placeholder text={l} />
          <div>
            <span className="tag">{l}</span>
            <h3>{t}</h3>
            <p>{c}</p>
            <Link to={path}>Explore →</Link>
          </div>
        </article>
      );
    })}</div></section>
    <GlobalPresence mode="bento" /><Ethos mode="bento" /><Insights mode="bento" /><FinalCta />
  </main></Frame>;
}

function Journey() {
  return <Frame nav={<JourneyNav />} label="Variation 03 · Journey and hub homepage"><main>
    <section className="journeyHero"><div className="journeyIntro"><div><div className="eyebrow"><EyebrowSymbol />Future-focused healthcare</div><h1>Care that reaches further, with systems built to last</h1></div><div><p className="lead">Evervie is building specialized healthcare platforms for access, quality, and scale.</p><p>This variation starts with a hub visual that turns the company story into a care ecosystem.</p><div className="buttonRow"><a className="btn">Explore care platforms</a><a className="btnOutline">Enter investor centre</a></div></div></div><div className="hub"><div className="hubRing">Evervie</div>{["Access", "Quality", "Scale", "Global Focus", "Patient-first"].map((t, i) => <article className={`hubNode n${i + 1}`} key={t}><h4>{t}</h4><p>{i === 0 ? "Care closer to patients." : i === 1 ? "Trust across experiences." : i === 2 ? "Platforms that grow responsibly." : i === 3 ? "Reach across priority markets." : "Healthcare built around people."}</p></article>)}</div></section>
    <section className="section"><SectionHead eyebrow="Scale snapshot" title="Focused reach, presented as a pathway" copy="Metrics become a horizontal evidence path instead of individual static boxes." /><Metrics className="pathMetrics" /></section>
    <section className="section"><SectionHead eyebrow="Purpose in practice" title="How Evervie moves from belief to care delivery" copy="A timeline layout gives the three ideas a progressive narrative." /><div className="timeline">{purpose.map(([n, l, t, c]) => <article key={l}><div className="num">{n}</div><div><span className="tag">{l}</span><h3>{t}</h3><p>{c}</p></div></article>)}</div></section>
    <section className="section"><SectionHead eyebrow="Care gateway" title="A care universe built around focused needs" copy="Orbit-style vertical cards create a different visual rhythm for the care gateway." /><div className="orbit"><div className="orbitCenter"><h3>Evervie care platforms</h3></div>{verticals.map(([l, t, c], i) => <article className={`orbitCard o${i + 1}`} key={l}><span className="tag">{l}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>
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
        <Link to="/news-insights">News & Insights</Link><Link to="/careers">Careers</Link><a>Connect</a>
      </div>
      <div className="actions"><a className="btnOutline">Enter Investor Centre</a></div>
    </header>
  );
}

function Home() {
  return <Frame nav={<HomeNav />} label="Homepage wireframe options"><main><section className="comparisonHero"><div className="eyebrow"><EyebrowSymbol />React Router prototype</div><h1>Three live homepage wireframe directions for Evervie</h1><p>Each route uses the same approved content sections, but explores a different layout aesthetic and a different live navbar treatment with working dropdowns.</p></section><section className="comparisonGrid"><Link to="/editorial"><span className="tag">Variation 01</span><h2>Editorial layered scroll</h2><p>Large editorial hero, full-width visual, metric rail, stepped purpose section, and mosaic care gateway.</p><b>Open variation →</b></Link><Link to="/bento"><span className="tag">Variation 02</span><h2>Modular bento layout</h2><p>Grid-based hero and sections with compact proof points, care cards, and insight modules.</p><b>Open variation →</b></Link><Link to="/journey"><span className="tag">Variation 03</span><h2>Journey and hub layout</h2><p>Hub-style hero, timeline purpose section, orbit care gateway, and stacked CTA routes.</p><b>Open variation →</b></Link></section></main></Frame>;
}

function RouteLoader() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setVisible(true);
    setClosing(false);
    const closeTimer = setTimeout(() => setClosing(true), 3000);
    const hideTimer = setTimeout(() => setVisible(false), 3400);
    return () => { clearTimeout(closeTimer); clearTimeout(hideTimer); };
  }, [pathname]);
  if (!visible) return null;
  return (
    <div className={`routeLoader${closing ? " routeLoaderClosing" : ""}`}>
      <div className="loaderIcons">
        <span className="loaderSlot">
          <span className="loaderCircleGrey" />
          <span className="loaderCircleColor loaderCircleColor--gold" />
          <img className="loaderIconImg" src="/circle-1.svg" alt="" />
        </span>
        <span className="loaderSlot">
          <span className="loaderCircleGrey" />
          <span className="loaderCircleColor loaderCircleColor--pink" />
          <img className="loaderIconImg" src="/star-1.svg" alt="" />
        </span>
        <span className="loaderSlot">
          <span className="loaderCircleGrey" />
          <span className="loaderCircleColor loaderCircleColor--orange" />
          <img className="loaderIconImg" src="/bloom-1.svg" alt="" />
        </span>
      </div>
    </div>
  );
}

function InnerPage({ eyebrow, title, lead }) {
  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <div className="eyebrow"><EyebrowSymbol />{eyebrow}</div>
            <h1>{title}</h1>
            {lead && <p className="wwaHeroBody">{lead}</p>}
          </div>
          <img src="/Evervie_PPT_Diamond_v1.png" alt="" className="wwaHeroDiamond" aria-hidden="true" />
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
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <span>About Evervie</span>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">Who We Are</span>
            </nav>
            <div className="eyebrow"><EyebrowSymbol />About Evervie</div>
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
                  ['/circle-image.png', '#FABE00'],
                  ['/rectangle-image.png', '#FF91B4'],
                  ['/bloom-image.png', '#FF3C00'],
                ];
                const [icon, color] = accents[i];
                return (
                  <article className="wwaPurposeRow" key={l} style={{ '--accent': color }}>
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



        {/* Focused Platforms (Orange Theme with custom SVGs) */}
        <section className="section">
          <SectionHead
            eyebrow="Specialised Care"
            title="Four pillars of dedicated care platforms"
            copy="Every pathway is designed to unify clinical excellence, operational systems, and patient compassion under a singular orange-themed identity."
          />
          <div className="staggeredCards">
            {verticals.map(([l, t, c], i) => {
              const svgIcon = i === 0 ? "/oncology.svg" : i === 1 ? "/renal-cre.svg" : i === 2 ? "/diagnostics.svg" : "/elder-care.svg";
              const hasBadge = l.includes("Coming Soon");
              const labelText = hasBadge ? l.split(" · ")[0] : l;
              const path = i === 0 ? "/portfolio/oncology" : i === 1 ? "/portfolio/renal-care" : i === 2 ? "/portfolio/diagnostics" : "/portfolio/elder-care";
              return (
                <article key={l} style={{ marginTop: i % 2 ? 40 : 0 }}>
                  <div className="staggeredCardVisual">
                    <div className="staggeredCardGradient tagTone-1">
                      <img src={svgIcon} alt={labelText} className="staggeredCardIcon" style={{ width: 105, height: 105, objectFit: 'contain' }} />
                    </div>
                  </div>
                  <div className="staggeredCardContent">
                    <span className="tag">
                      {labelText}
                      {hasBadge && <span className="badge" style={{ marginLeft: 6, opacity: 0.8, fontSize: 10, background: 'rgba(40,40,40,0.06)', padding: '2px 6px', borderRadius: 4 }}>Coming Soon</span>}
                    </span>
                    <h3>{t}</h3>
                    <p>{c}</p>
                    <Link to={path} className="exploreLink">Explore <ArrowRight size={14} /></Link>
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
              <Link to="/" className="btnOutline">View all About Evervie</Link>
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
                  { to: "#", num: "03", title: "Our Governance", desc: "Integrity, accountability, and trust.", badge: "Coming Soon" }
                ].map(({ to, num, title, desc, badge }) => (
                  <Link to={to} className="wwaNavMinor" key={title} onClick={badge ? e => e.preventDefault() : undefined} style={badge ? { opacity: 0.7, cursor: 'default' } : {}}>
                    <span className="wwaNavNum">{num}</span>
                    <h4>{title}{badge && <span className="badge" style={{ marginLeft: 6, opacity: 0.8, fontSize: 10, background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4, fontWeight: 500, color: '#666' }}>{badge}</span>}</h4>
                    <p>{desc}</p>
                    {!badge && <ArrowRight size={14} className="wwaNavArrow" />}
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
              ["News & Insights", "Stay informed with the latest news, announcements, and thought leadership from Evervie.", "Read the latest", "/news_insights_editorial.png", "/news-insights"],
              ["Portfolio", "Renal care, oncology, diagnostics, and elder care under one platform.", "Explore the portfolio", "/image-2.png", null],
              ["Investor Centre", "Financial information, announcements, and investor presentations.", "Enter Investor Centre", "/image-3.png", null]
            ].map(([title, copy, cta, img, to], i) => (
              <article className={`exploreCard ${i === 0 ? "exploreCardLarge" : ""}`} key={title}>
                <div className="exploreCardText">
                  <span className="exploreIndex">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  {to ? <Link to={to} className="btnOutline">{cta}</Link> : <a className="btnOutline">{cta}</a>}
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
      name: "Prasad V. Potluri",
      designation: "Chairman & Managing Director",
      photo: "/PVP_0425.jpg",
      shortBio: "Serial entrepreneur with an approximately $800M+ transaction track record; led the company's BSE/NSE listing.",
      expandedBio: "Prasad V. Potluri is a serial entrepreneur with an approximately $800M+ transaction track record across healthcare and related sectors. He led Evervie's listing on the BSE and NSE, bringing disciplined capital strategy and long-term platform thinking to every stage of the company's growth. As Chairman & Managing Director, he sets the strategic direction for the group and its healthcare verticals.",
      expertise: ["Corporate Strategy", "Capital Markets", "Healthcare Platforms"],
      responsibilities: "Chairman of the Board; Managing Director",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Dr. Ellen Feehan",
      designation: "Chief Executive Officer",
      photo: "/leadership_ellen.jpg",
      shortBio: "Former McKinsey Partner across the UK, EU, US and APAC; surgeon; founded the McKinsey Health Institute's Healthy Longevity initiative.",
      expandedBio: "Dr. Ellen Feehan brings a rare combination of clinical expertise and global management consulting experience. A trained surgeon and former McKinsey Partner with cross-continental leadership, she founded the McKinsey Health Institute's Healthy Longevity initiative before joining Evervie as Chief Executive Officer.",
      expertise: ["Healthcare Strategy", "Global Operations", "Longevity & Wellness"],
      responsibilities: "Chief Executive Officer",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Dr. Neeraja Nagarajan",
      designation: "Chief Operating Officer",
      photo: "/leadership_neeraja.jpg",
      shortBio: "Physician-scientist with experience at Brigham and Women's Hospital/Harvard and Johns Hopkins; former McKinsey Associate Partner; published in The Lancet, BMJ and JAMA.",
      expandedBio: "Dr. Neeraja Nagarajan is a physician-scientist whose clinical and research experience spans Brigham and Women's Hospital, Harvard, and Johns Hopkins. A former McKinsey Associate Partner, her work has been published in The Lancet, BMJ and JAMA. She leads Evervie's operational delivery as Chief Operating Officer.",
      expertise: ["Clinical Operations", "Health Systems", "Research & Evidence"],
      responsibilities: "Chief Operating Officer",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Raghu Chaitanya",
      designation: "Chief Financial Officer",
      photo: "/leadership_raghu.jpg",
      shortBio: "Experienced in corporate finance, treasury and governance; leads group finance, capital planning and lender relationships.",
      expandedBio: "Raghu Chaitanya brings deep experience in corporate finance, treasury management and governance. As Chief Financial Officer, he leads Evervie's group finance function, overseeing capital planning, lender relationships and financial governance across the portfolio.",
      expertise: ["Corporate Finance", "Treasury", "Capital Planning"],
      responsibilities: "Chief Financial Officer",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Dr. Varshini Varadaraj",
      designation: "Group Medical Director",
      photo: "/leadership_varshini.jpg",
      shortBio: "MPH in epidemiology and biostatistics from Johns Hopkins; Johns Hopkins faculty researcher; responsible for clinical quality and outcomes across the organisation's pillars.",
      expandedBio: "Dr. Varshini Varadaraj holds an MPH in epidemiology and biostatistics from Johns Hopkins, where she also serves as a faculty researcher. As Group Medical Director, she is responsible for clinical quality and outcomes measurement across all of Evervie's care verticals.",
      expertise: ["Epidemiology", "Clinical Quality", "Outcomes Research"],
      responsibilities: "Group Medical Director",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Dr. Sruthi Sivamurugan",
      designation: "Director of Marketing & Business Development",
      photo: "/leadership_shruti.jpg",
      shortBio: "Physician and hospital owner-operator based in Chennai; has first-hand experience in hospital P&L management, marketing and business development.",
      expandedBio: "Dr. Sruthi Sivamurugan is a physician and hospital owner-operator based in Chennai, bringing first-hand experience in hospital P&L management, marketing and business development to Evervie's growth strategy as Director of Marketing & Business Development.",
      expertise: ["Healthcare Marketing", "Hospital Operations", "Business Development"],
      responsibilities: "Director of Marketing & Business Development",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Dr. Niranjani Nagarajan",
      designation: "Director of Clinical Innovation",
      photo: "/leadership_niranjani.jpg",
      shortBio: "Physician-scientist with experience at the University of Michigan and Johns Hopkins; involved in multi-country, NIH-funded programmes across India, the US and Africa.",
      expandedBio: "Dr. Niranjani Nagarajan is a physician-scientist with experience at the University of Michigan and Johns Hopkins. She has been involved in multi-country, NIH-funded research programmes spanning India, the US and Africa, and leads clinical innovation strategy at Evervie.",
      expertise: ["Clinical Innovation", "Global Health", "NIH Research Programmes"],
      responsibilities: "Director of Clinical Innovation",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Anjali Menon",
      designation: "Lead of Innovation",
      photo: "/leadership_anjali.jpg",
      shortBio: "Former McKinsey professional; previously worked with Flagship Pioneering and W Health Ventures, building healthcare ventures from the ground up.",
      expandedBio: "Anjali Menon is a former McKinsey professional who has built healthcare ventures from the ground up at Flagship Pioneering and W Health Ventures. As Lead of Innovation at Evervie, she drives the identification and development of new platform opportunities within the group.",
      expertise: ["Healthcare Ventures", "Innovation Strategy", "New Platform Development"],
      responsibilities: "Lead of Innovation",
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
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <span>About Evervie</span>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">Our Leadership</span>
            </nav>
            <div className="eyebrow"><EyebrowSymbol />Our Leadership</div>
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
              <img src="/PVP_0474.jpg" alt="Prasad V. Potluri, Chairman & Managing Director" className="wwaChairmanImg" />
              <div className="wwaChairmanBadge">
                <h4>Prasad V. Potluri</h4>
                <p>Chairman & Managing Director</p>
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
                <h3>Prasad’s experience</h3>
                <p className="wwaChairmanExpSubtitle">Bringing decades of leadership and expertise to shape innovative healthcare solutions worldwide.</p>
                <div className="wwaChairmanExpGrid">
                  <div className="wwaChairmanExpCard">
                    <span className="wwaChairmanExpNumber">$800M+</span>
                    <p>Transaction track record across healthcare and related sectors.</p>
                  </div>
                  <div className="wwaChairmanExpCard">
                    <span className="wwaChairmanExpNumber">Serial</span>
                    <p>Entrepreneur who founded and scaled multiple healthcare platforms.</p>
                  </div>
                  <div className="wwaChairmanExpCard">
                    <span className="wwaChairmanExpNumber">Listed</span>
                    <p>Led the company’s listing on both BSE and NSE.</p>
                  </div>
                </div>
              </div>
              <div className="wwaChairmanFooter">
                <span className="wwaChairmanSignature">Prasad V. Potluri</span>
                <span className="wwaChairmanTitle">Chairman & Managing Director, Evervie Health</span>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Leadership */}
        <section className="section wwaBoard">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">Leadership</div>
              <h2>Executive leadership</h2>
            </div>
            <p>The team responsible for executing Evervie's platform strategy, scaling care delivery networks, and driving clinical excellence across every vertical.</p>
          </div>

          <div className="wwaBoardGrid">
            {boardMembers.map((member) => (
              <article key={member.name} className="wwaBoardCard" onClick={() => setActiveBoardMember(member)}>
                <div className="wwaBoardCardVisual">
                  {member.photo
                    ? <img src={member.photo} alt={member.name} className="wwaBoardCardImg" />
                    : <Placeholder text={member.name} className="wwaBoardCardImg" />}
                </div>
                <div className="wwaBoardCardContent">
                  <h3>{member.name}</h3>
                  <span className="wwaBoardCardTitle">{member.designation}</span>
                  <p className="wwaBoardCardShortBio">{member.shortBio}</p>
                  <button className="wwaBoardCardBtn" aria-label={`View biography of ${member.name}`}>
                    View Full Biography <ArrowRight size={13} />
                  </button>
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
              <Link to="/" className="btnOutline">View all About Evervie</Link>
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
                  { to: "#", num: "03", title: "Our Governance", desc: "Integrity, accountability, and trust.", badge: "Coming Soon" }
                ].map(({ to, num, title, desc, badge }) => (
                  <Link to={to} className="wwaNavMinor" key={title} onClick={badge ? e => e.preventDefault() : undefined} style={badge ? { opacity: 0.7, cursor: 'default' } : {}}>
                    <span className="wwaNavNum">{num}</span>
                    <h4>{title}{badge && <span className="badge" style={{ marginLeft: 6, opacity: 0.8, fontSize: 10, background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4, fontWeight: 500, color: '#666' }}>{badge}</span>}</h4>
                    <p>{desc}</p>
                    {!badge && <ArrowRight size={14} className="wwaNavArrow" />}
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
              ["News & Insights", "Stay informed with the latest news, announcements, and thought leadership from Evervie.", "Read the latest", "/news_insights_editorial.png", "/news-insights"],
              ["Portfolio", "Renal care, oncology, diagnostics, and elder care under one platform.", "Explore the portfolio", "/image-2.png", null],
              ["Investor Centre", "Financial information, announcements, and investor presentations.", "Enter Investor Centre", "/image-3.png", null]
            ].map(([title, copy, cta, img, to], i) => (
              <article className={`exploreCard ${i === 0 ? "exploreCardLarge" : ""}`} key={title}>
                <div className="exploreCardText">
                  <span className="exploreIndex">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  {to ? <Link to={to} className="btnOutline">{cta}</Link> : <a className="btnOutline">{cta}</a>}
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
                <div className="wwaModalImgContainer">
                  {activeBoardMember.photo
                    ? <img src={activeBoardMember.photo} alt={activeBoardMember.name} className="wwaModalImg" />
                    : <Placeholder text={activeBoardMember.name} className="wwaModalImg" />}
                </div>
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
                  <h4>Areas of expertise</h4>
                  <div className="wwaModalExpertiseTags">
                    {activeBoardMember.expertise.map((exp) => (
                      <span key={exp} className="wwaExpertiseTag">{exp}</span>
                    ))}
                  </div>
                </div>

                <div className="wwaModalDivider" />

                <div className="wwaModalSection">
                  <h4>Committee & governance responsibilities</h4>
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
  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>

        {/* Hero */}
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <span>About Evervie</span>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">Mission & Vision</span>
            </nav>
            <div className="eyebrow"><EyebrowSymbol />Mission & Vision</div>
            <h1>A clearer purpose for a healthier future.</h1>
            <p className="wwaHeroBody">Evervie exists to expand access to specialised care, strengthen the quality of healthcare delivery, and build platforms capable of creating meaningful impact over time.</p>
          </div>
          <img src="/Evervie_PPT_Diamond_v1.png" alt="" className="wwaHeroDiamond" aria-hidden="true" />
        </section>

        {/* Mission & Vision Statement */}
        <section className="mvStatement">
          <div className="mvStatementInner">
            <div className="mvStatHead">
              <div className="eyebrow">Mission & Vision</div>
              <h2>What guides us today, and what shapes tomorrow.</h2>
              <p className="mvStatSubline">Our mission defines what we are building now. Our vision defines the future we are working toward.</p>
            </div>
            <div className="mvStatGrid">
              <div className="mvBlock mvMission">
                <div className="mvBlockIconWrap"><Target size={24} strokeWidth={1.5} /></div>
                <span className="mvLabel">Our Mission</span>
                <h3 className="mvSubheading">Why we exist.</h3>
                <p className="mvBlockStatement">To build, deliver and scale global specialty care.</p>
                <p className="mvBlockCopy">Evervie's mission is to build healthcare platforms that can deliver focused specialty care with consistency, trust, and long-term operating strength.</p>
              </div>
              <div className="mvStatDivider" aria-hidden="true" />
              <div className="mvBlock mvVision">
                <div className="mvBlockIconWrap"><Sparkles size={24} strokeWidth={1.5} /></div>
                <span className="mvLabel">Our Vision</span>
                <h3 className="mvSubheading">The future we are working toward.</h3>
                <p className="mvBlockStatement">More people, more places — care that's actually there.</p>
                <p className="mvBlockCopy">Evervie's vision is a future where specialty care is not distant or fragmented, but present, dependable, and accessible to more communities across the world.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Purpose in Practice */}
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
                  ['/circle-image.png', '#FABE00'],
                  ['/rectangle-image.png', '#FF91B4'],
                  ['/bloom-image.png', '#FF3C00'],
                ];
                const [icon, color] = accents[i];
                return (
                  <article className="wwaPurposeRow" key={l} style={{ '--accent': color }}>
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

        {/* About Evervie Navigation */}
        <section className="wwaAboutNav section">
          <div className="wwaAboutNavLayout">
            <div className="wwaAboutNavIntro">
              <div className="eyebrow">About Evervie</div>
              <h2>Continue the Evervie story.</h2>
              <p>Explore the people, purpose, and principles behind Evervie Health.</p>
              <Link to="/" className="btnOutline">View all About Evervie</Link>
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
                  { to: "#", num: "03", title: "Our Governance", desc: "Integrity, accountability, and trust.", badge: "Coming Soon" }
                ].map(({ to, num, title, desc, badge }) => (
                  <Link to={to} className="wwaNavMinor" key={title} onClick={badge ? e => e.preventDefault() : undefined} style={badge ? { opacity: 0.7, cursor: 'default' } : {}}>
                    <span className="wwaNavNum">{num}</span>
                    <h4>{title}{badge && <span className="badge" style={{ marginLeft: 6, opacity: 0.8, fontSize: 10, background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4, fontWeight: 500, color: '#666' }}>{badge}</span>}</h4>
                    <p>{desc}</p>
                    {!badge && <ArrowRight size={14} className="wwaNavArrow" />}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
    </Frame>
  );
}
function AboutAspiration() {
  return <InnerPage eyebrow="About Evervie" title="Our Aspiration" lead="Our ambition to transform healthcare and improve lives at meaningful scale." />;
}
function AboutGovernance() {
  return <InnerPage eyebrow="About Evervie" title="Our Governance" lead="The principles, practices, and oversight that ensure integrity, accountability, and trust." />;
}

const portfolioList = [
  {
    name: "Renal Care",
    path: "/portfolio/renal-care",
    title: "Renal Care Platform",
    desc: "Accessible, continuous, and specialised kidney care services.",
    num: "01",
    img: "/renal_care_hero.png"
  },
  {
    name: "Oncology",
    path: "/portfolio/oncology",
    title: "Oncology Platform",
    desc: "Coordinated, compassionate, and expert cancer care closer to home.",
    num: "02",
    img: "/oncology_hero_patient_care.png"
  },
  {
    name: "Diagnostics",
    path: "/portfolio/diagnostics",
    title: "Diagnostics Platform",
    desc: "Reliable pathology, radiology, and home care collection models.",
    num: "03",
    img: "/diagnostics_hero_lab.png"
  },
  {
    name: "Elder Care",
    path: "/portfolio/elder-care",
    title: "Elder Care Platform",
    desc: "Dignified, comfortable, and coordinated care for senior living.",
    num: "04",
    img: "/grandmother_and_child_in_warm_embrace.png"
  }
];

function PortfolioNavSection({ currentVertical }) {
  const navigate = useNavigate();
  const currentIndex = portfolioList.findIndex(p => p.name === currentVertical);
  const nextIndex = (currentIndex + 1) % portfolioList.length;
  const nextPlatform = portfolioList[nextIndex];

  return (
    <section className="wwaAboutNav section">
      <div className="wwaAboutNavLayout">
        <div className="wwaAboutNavIntro">
          <div className="eyebrow">Portfolio Verticals</div>
          <h2>Explore our specialty platforms.</h2>
          <p>Evervie builds and scales dedicated care platforms designed around patients and communities.</p>
          <Link to="/" className="btnOutline">Back to Homepage</Link>
        </div>
        <div className="wwaAboutBento">
          <Link to={nextPlatform.path} className="wwaNavFeature">
            <div className="wwaNavFeatureInner">
              <div className="wwaNavMeta">
                <span className="wwaNavNum">{nextPlatform.num}</span>
                <span className="wwaNavNextTag">Next Vertical</span>
              </div>
              <h3>{nextPlatform.title}</h3>
              <p>{nextPlatform.desc}</p>
              <span className="wwaNavCta">Explore Platform <ArrowRight size={13} /></span>
            </div>
            <img src={nextPlatform.img} alt={nextPlatform.title} className="wwaNavFeatureImg" style={{ width: '100%', objectFit: 'cover' }} />
          </Link>
          <div className="wwaNavMinorGrid">
            {[
              { to: "/about/who-we-are", num: "01", title: "Who We Are", desc: "Get to know Evervie—our story, values, and the purpose that drives us forward." },
              { to: "/investor-centre", num: "02", title: "Investor Centre", desc: "Access information about Evervie's platform, financial performance, and disclosures." },
              { to: "/news-insights", num: "03", title: "Insights & News", desc: "Access our latest announcements, news, and healthcare reports." }
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
  );
}

const galleryData = {
  "Renal Care": {
    eyebrow: "Care in Action",
    title: "Inside our dialysis centres.",
    desc: "A visual overview of our modern dialysis suites, medical facilities, and community health services.",
    items: [
      { img: "/7Med/7med-epitome-kidney-urology-institute-exterior.jpg", title: "Epitome Kidney & Urology Institute", desc: "A state-of-the-art specialty center delivering world-class tertiary renal treatments." },
      { img: "/7Med/7med-aiims-dialysis-unit-nurses-station.png", title: "AIIMS Dialysis Unit Nurses Station", desc: "Highly monitored care desks ensuring safety and rapid clinical response." },
      { img: "/7Med/7med-doctor-nurse-patient-consultation.jpg", title: "Nephrologist Consultation", desc: "Patient-first medical advisory panels mapping personalized recovery plans." },
      { img: "/7Med/7med-nurse-patient-bedside-care.jpg", title: "Compassionate Bedside Care", desc: "Continuous patient monitoring and warm, expert nursing care throughout dialysis sessions." },
      { img: "/7Med/7med-ct-scan-diagnostic-imaging.jpg", title: "Diagnostic Imaging Suite", desc: "Advanced imaging units supporting detailed structural and vascular assessments." },
      { img: "/7Med/7med-epitome-hospital-staff-group-photo.jpg", title: "Epitome Hospital Clinical Team", desc: "Our dedicated network of nephrologists, dialysis nurses, and patient care coordinators." }
    ]
  },
  "Oncology": {
    eyebrow: "Inside the Platform",
    title: "Specialized cancer care settings.",
    desc: "A closer look at our patient-centric oncology centres, medical consultation rooms, and care coordination.",
    items: [
      { img: "/oncology_clinical_team.png", title: "Specialist Tumour Board", desc: "Our collaborative network of super-specialists reviewing complex patient clinical pathways." },
      { img: "/oncology_hero_patient_care.png", title: "Chemotherapy Suite", desc: "Premium, comfortable environment ensuring high clinical safety during cancer treatments." },
      { img: "/clinical_excellence.png", title: "Interdisciplinary Oncology", desc: "Joint clinical oversight panels mapping patient-centric recoveries across centres." }
    ]
  },
  "Diagnostics": {
    eyebrow: "Inside the Labs",
    title: "Advanced diagnostics networks.",
    desc: "A glimpse of our NABL-standard pathology labs, modern imaging equipment, and home sample collection services.",
    items: [
      { img: "/medilabs-diagnostics-image-01.png", title: "NABL-Compliant Pathology Lab", desc: "A fully automated diagnostics floor equipped with multi-parameter analyzers and dedicated specialist stations." },
      { img: "/medilabs-diagnostics-image-06.png", title: "Radiology & Imaging Suite", desc: "Advanced CT imaging supports earlier and more confident clinical care decisions." },
      { img: "/medilabs-diagnostics-image-03.png", title: "Immunoassay Testing Systems", desc: "High-throughput immunoassay platforms delivering accurate hormone, infectious disease, and tumour marker results." },
      { img: "/medilabs-diagnostics-image-04.png", title: "Quality-Controlled Reporting", desc: "Trained technologists validate every result on-screen before it reaches a clinician." },
      { img: "/medilabs-diagnostics-image-05.png", title: "Automated Sample Processing", desc: "Robotic sample carousels enable consistent, high-volume testing with minimal turnaround time." },
      { img: "/medilabs-diagnostics-image-02.png", title: "Precision Sample Handling", desc: "Every sample is barcoded, tracked, and loaded for automated analysis to minimize manual handling errors." }
    ]
  },
  "Elder Care": {
    eyebrow: "Platform Concepts",
    title: "Dignified senior living visual concepts.",
    desc: "Visualizations and operational concepts guiding our geriatric healthcare and senior support systems.",
    items: [
      { img: "/grandmother_and_child_in_warm_embrace.png", title: "Dignified Care Environments", desc: "Living spaces designed around cognitive support, daily warmth, and senior comfort." },
      { img: "/happy-family.png", title: "Active Ageing Centers", desc: "Planned spaces encouraging physical mobility, nutrition, and social inclusion." },
      { img: "/community_impact.png", title: "Geriatric Support Network", desc: "Centralized emergency coordination linked to senior wearable safety trackers." }
    ]
  }
};

function PortfolioGallery({ currentVertical }) {
  const data = galleryData[currentVertical];
  if (!data) return null;

  return (
    <section className="portfolioGallerySection">
      <div className="portfolioGalleryLayout">
        <div className="portfolioGalleryHead">
          <div className="eyebrow">{data.eyebrow}</div>
          <h2>{data.title}</h2>
          <p>{data.desc}</p>
        </div>
        <div className="portfolioGalleryGrid">
          {data.items.map((item, idx) => {
            const isFeature = idx === 0;
            return (
              <div key={idx} className={`galleryItem ${isFeature ? 'featureItem' : ''}`}>
                <img src={item.img} alt={item.title} className="galleryItemImg" />
                <div className="galleryOverlay">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Portfolio Vertical Reusable Template
function PortfolioVertical({
  eyebrow = "Our Portfolio",
  title,
  subtitle,
  intro,
  heroImage,
  heroBgImage,
  metrics = [],
  platform = {},
  footprint = {},
  network = {},
  careExperience = [],
  closing = {},
  footprintIcon = Globe2,
  networkIcon = Network
}) {
  const ClosingIcon = closing.icon || Droplet;
  const FootprintIcon = footprintIcon;
  const NetworkIcon = networkIcon;

  // Leaflet dynamic GeoJSON loading
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [mapViewMode, setMapViewMode] = useState("2D");
  const dialysisStates = footprint.mapData ? footprint.mapData.dialysisStates : [];

  useEffect(() => {
    if (footprint.mapData) {
      fetch("/india_states.geojson")
        .then((res) => res.json())
        .then((data) => setGeoJsonData(data))
        .catch((err) => console.error("Error loading GeoJSON data:", err));
    }
  }, [footprint.mapData]);

  // Leaflet custom styling rules
  const getStateStyle = (feature) => {
    const stateName = feature.properties.NAME_1;
    const isHighlighted = dialysisStates.includes(stateName) || (stateName === "Uttaranchal" && dialysisStates.includes("Uttarakhand"));

    return {
      fillColor: isHighlighted ? "url(#active-stripes)" : "url(#diagonal-stripes)",
      stroke: true,
      weight: 1,
      opacity: 1.0,
      color: isHighlighted ? "rgba(255, 60, 0, 0.7)" : "#d2ccc6",
      fillOpacity: 1.0
    };
  };

  const onEachFeature = (feature, layer) => {
    const stateName = feature.properties.NAME_1;
    const isHighlighted = dialysisStates.includes(stateName) || (stateName === "Uttaranchal" && dialysisStates.includes("Uttarakhand"));
    const displayName = stateName === "Uttaranchal" ? "Uttarakhand" : stateName;

    if (isHighlighted) {
      layer.bindTooltip(`
        <div style="font-family: inherit; font-size: 12px; padding: 4px 8px;">
          <strong>${displayName}</strong><br/>
          Dialysis Centre Footprint<br/><span style="color:var(--evervie-orange);font-weight:600;">Part of 20-centre network</span>
        </div>
      `, {
        sticky: true,
        direction: "auto",
        opacity: 0.95
      });
    }

    layer.on({
      mouseover: (e) => {
        if (!isHighlighted) return;
        const l = e.target;
        l.setStyle({
          fillOpacity: 0.9,
          fillColor: "url(#evervie-map-gradient)",
          stroke: true,
          weight: 1.5,
          color: "var(--evervie-orange)"
        });
      },
      mouseout: (e) => {
        if (!isHighlighted) return;
        const l = e.target;
        l.setStyle(getStateStyle(feature));
      }
    });
  };

  // Custom marker DivIcon avoiding Vite asset bundler paths
  const customMarkerIcon = typeof window !== "undefined" ? new L.DivIcon({
    html: `<div style="
      background-color: var(--evervie-orange);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      box-shadow: 0 0 8px rgba(255, 60, 0, 0.6);
    "></div>`,
    className: "custom-leaflet-marker",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8]
  }) : null;

  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>
        {/* Header and Breadcrumb & Hero */}
        <section 
          className={`wwaHero ${heroBgImage ? 'hasBgImage' : ''}`}
          style={heroBgImage ? { backgroundImage: `url(${heroBgImage})` } : {}}
        >
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <span>Our Portfolio</span>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">{title}</span>
            </nav>
            <div className="eyebrow"><EyebrowSymbol />{eyebrow}</div>
            <h1>{title}</h1>
            <p className="heroGradientLead" style={{ fontWeight: 600, color: 'var(--graphite)', marginBottom: 16 }}>{subtitle}</p>
            <p className="wwaHeroBody" style={{ margin: 0 }}>{intro}</p>
          </div>
          {!heroBgImage && heroImage && (
            <img src={heroImage} alt="" className="wwaHeroDiamond" aria-hidden="true" style={{ opacity: 0.85 }} />
          )}
        </section>

        {/* Impact Metrics Strip */}
        {metrics.length > 0 && (
          <section className="metricsStrip">
            {metrics.map((m, index) => {
              const MetricIcon = m.icon;
              return (
                <article className="metricCard" key={index}>
                  <div className="metricHeader">
                    <span className={`metricIcon metricIcon--${m.tone || 'orange'}`}>
                      <MetricIcon size={20} />
                    </span>
                    <span className="metricLabel">{m.label}</span>
                  </div>
                  <strong className="metricValue">{m.number}</strong>
                  <p className="metricDescription">{m.desc}</p>
                </article>
              );
            })}
          </section>
        )}

        {/* Platform Introduction Section */}
        {platform.name && (
          <section className="platformSection">
            <div className="platformLayout">
              <div className="platformLeft">
                <div className="eyebrow">{platform.label || "Our Operating Platform"}</div>
                <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, margin: '8px 0 20px 0', color: 'var(--graphite)' }}>{platform.name}</h2>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--muted)', marginBottom: 32 }}>{platform.desc}</p>
                {platform.ctaText && (
                  <a href={platform.ctaLink || "#"} className="btn">
                    {platform.ctaText}
                  </a>
                )}
              </div>
              <div className="platformRight">
                {platform.logo ? (
                  platform.logo
                ) : (
                  <div className="platformLogoBox">
                    <span className="platformLogoText">{platform.name}</span>
                    <span className="platformLogoSub">An Evervie Platform</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Operating Footprint and Clinical Network Section */}
        {footprint.mapData ? (
          <section className="footprintSection">
            <div className="footprintLayout">
              <div className="leftFootprintSummary">
                <div className="eyebrow" style={{ color: 'var(--evervie-orange)', marginBottom: 8 }}>EVERVIE RENAL CARE</div>
                <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, margin: '0 0 16px 0', color: 'var(--graphite)', letterSpacing: '-0.02em' }}>{footprint.title || "Operating Footprint"}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', marginBottom: 40 }}>{footprint.desc || "Renal care reach across dialysis centres and hospitals in India."}</p>

                <div className="footprintMetricBlock">
                  <div className="footprintMetricHeader">
                    <div className="footprintMetricIcon">
                      <Building2 size={22} />
                    </div>
                    <div>
                      <strong className="footprintMetricNumber">{footprint.dialysisCount || 20}</strong>
                      <span className="footprintMetricLabel">Dialysis Centres</span>
                    </div>
                  </div>
                  <div className="footprintMetricBody">
                    <strong>Across {footprint.statesCount || 7} states:</strong>
                    <div className="chipGrid">
                      {(footprint.statesList || "Delhi, Haryana, Rajasthan, Uttar Pradesh, Uttarakhand, Bihar, Jharkhand").split(",").map((s, i) => (
                        <div className="cityChip" key={i}><MapPin size={13} />{s.trim()}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="footprintMetricDivider" />

                <div className="footprintMetricBlock">
                  <div className="footprintMetricHeader">
                    <div className="footprintMetricIcon">
                      <HeartPulse size={22} />
                    </div>
                    <div>
                      <strong className="footprintMetricNumber">{network.hospitalCount || 4}</strong>
                      <span className="footprintMetricLabel">Hospitals</span>
                    </div>
                  </div>
                  <div className="footprintMetricBody">
                    <strong>Located in:</strong>
                    <div className="chipGrid">
                      {(network.citiesList || "Delhi, Moradabad, Varanasi, Mau").split(",").map((c, i) => (
                        <div className="cityChip" key={i}><MapPin size={13} />{c.trim()}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`mapContainerWrapper ${mapViewMode === "3D" ? "map3DMode" : ""}`}>
                {/* SVG pattern definitions for vector map styling */}
                <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                  <defs>
                    <pattern id="diagonal-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="8" stroke="#eae6e1" strokeWidth="1.5" />
                    </pattern>
                    <pattern id="diagonal-stripes-hover" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="8" stroke="#d2ccc6" strokeWidth="2" />
                    </pattern>
                    <pattern id="active-stripes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255, 60, 0, 0.45)" strokeWidth="2.5" />
                    </pattern>
                    <linearGradient id="evervie-map-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff91b4" />
                      <stop offset="40%" stopColor="#ff3c00" />
                      <stop offset="100%" stopColor="#fabe00" />
                    </linearGradient>
                  </defs>
                </svg>


                {geoJsonData && (
                  <MapContainer
                    center={mapViewMode === "3D" ? [27.0, 81.3] : (footprint.mapCenter || [27.0, 83.5])}
                    zoom={mapViewMode === "3D" ? 5.1 : (footprint.mapZoom || 5.3)}
                    zoomSnap={0.1}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                    dragging={false}
                    zoomControl={false}
                    attributionControl={false}
                    touchZoom={false}
                    boxZoom={false}
                    keyboard={false}
                  >
                    <GeoJSON
                      data={geoJsonData}
                      style={getStateStyle}
                      onEachFeature={onEachFeature}
                    />
                    {footprint.hospitalsList && footprint.hospitalsList.map((h, i) => (
                      <Marker
                        key={i}
                        position={h.coordinates}
                        icon={customMarkerIcon}
                      >
                        <Tooltip permanent direction="right" offset={[10, 0]} className="custom-map-label">
                          {h.city}
                        </Tooltip>
                        <Popup>
                          <div style={{ fontFamily: 'inherit', fontSize: '13px', lineHeight: '1.4', padding: '4px' }}>
                            <strong style={{ color: 'var(--evervie-orange)', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Hospital Location</strong>
                            <span style={{ fontWeight: 700 }}>{h.city}, {h.state}</span><br />
                            <span style={{ color: '#666', marginTop: '4px', display: 'block' }}>Part of Evervie’s renal care hospital network.</span>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}

                {/* Map Legend */}
                <div className="mapLegendBox">
                  <h4>Map Legend</h4>
                  <div className="legendItem">
                    <span className="legendColorBox" style={{ background: "rgba(255, 60, 0, 0.25)", border: "1px solid var(--evervie-orange)" }}></span>
                    <div>
                      <strong>Dialysis Centre Footprint</strong>
                      <p>States with dialysis centre presence</p>
                    </div>
                  </div>
                  <div className="legendItem">
                    <span className="legendMarkerDot"></span>
                    <div>
                      <strong>Hospital Locations</strong>
                      <p>Cities with Evervie renal care hospitals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="footprintSection">
            <div className="footprintLayout" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="footprintCol">
                <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <FootprintIcon size={14} strokeWidth={2.5} style={{ color: 'var(--evervie-orange)' }} />
                  <span>{footprint.title || "Operating Footprint"}</span>
                </div>
                {footprint.items && footprint.items.map((item, idx) => (
                  <div className="footprintCard" key={idx}>
                    <div className="footprintCardHeader">
                      <h4>{item.heading}</h4>
                      <span className="footprintCardIndex">0{idx + 1}</span>
                    </div>
                    <p style={{ marginTop: 8 }}>{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="footprintCol">
                <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <NetworkIcon size={14} strokeWidth={2.5} style={{ color: 'var(--evervie-orange)' }} />
                  <span>{network.title || "Clinical Network"}</span>
                </div>
                {network.items && network.items.map((item, idx) => (
                  <div className="footprintCard" key={idx}>
                    <div className="footprintCardHeader">
                      <h4>{item.heading}</h4>
                      <span className="footprintCardIndex">0{idx + 1}</span>
                    </div>
                    <p style={{ marginTop: 8 }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Clinical Network Section */}
        <section className="clinicalNetworkSection">
          <div className="clinicalNetworkLayout">
            {/* Left Column */}
            <div className="clinicalNetworkIntro">
              <div className="eyebrow">{title === "Elder Care" ? "CARE MODEL" : "CLINICAL NETWORK"}</div>
              <h2 className="clinicalNetworkHeading">
                {title === "Elder Care" ? (
                  <>
                    A coordinated<br />
                    care model<br />
                    built for seniors.
                  </>
                ) : (
                  <>
                    A strong network<br />
                    behind better<br />
                    renal care.
                  </>
                )}
              </h2>
              <p className="clinicalNetworkDesc">
                {title === "Elder Care" ? (
                  "Our elder care platform brings together specialized clinical oversight and integrated emergency support."
                ) : (
                  "Our renal care platform is supported by specialist expertise and trained care teams."
                )}
              </p>

              {/* Custom crafted editorial connected network visual */}
              <div className="clinicalNetworkVisual" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 500 300" width="100%" height="100%" style={{ overflow: 'visible' }}>
                  <defs>
                    <radialGradient id="network-glow-orange" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="var(--evervie-orange)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="var(--evervie-orange)" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Translucent circular or cellular forms */}
                  <circle cx="250" cy="150" r="110" fill="url(#network-glow-orange)" />
                  <circle cx="250" cy="150" r="90" fill="none" stroke="rgba(255, 60, 0, 0.04)" strokeWidth="1" />
                  
                  {/* Outer cellular shapes */}
                  <circle cx="160" cy="110" r="65" fill="rgba(255, 255, 255, 0.3)" stroke="rgba(230, 226, 220, 0.5)" strokeWidth="1.5" />
                  <circle cx="340" cy="180" r="75" fill="rgba(255, 255, 255, 0.25)" stroke="rgba(230, 226, 220, 0.5)" strokeWidth="1.5" />
                  <circle cx="210" cy="200" r="55" fill="rgba(255, 255, 255, 0.3)" stroke="rgba(230, 226, 220, 0.5)" strokeWidth="1.5" />

                  {/* Fine network connections */}
                  <g stroke="rgba(60, 59, 57, 0.08)" strokeWidth="1">
                    <line x1="160" y1="110" x2="250" y2="150" />
                    <line x1="340" y1="180" x2="250" y2="150" />
                    <line x1="210" y1="200" x2="250" y2="150" />
                    <line x1="160" y1="110" x2="210" y2="200" />
                    <line x1="340" y1="180" x2="210" y2="200" />
                    <line x1="160" y1="110" x2="300" y2="80" />
                    <line x1="250" y1="150" x2="300" y2="80" />
                    <line x1="340" y1="180" x2="300" y2="80" />
                    <line x1="160" y1="110" x2="100" y2="170" />
                    <line x1="210" y1="200" x2="100" y2="170" />
                  </g>

                  {/* Primary Orange connection lines */}
                  <g stroke="rgba(255, 60, 0, 0.2)" strokeWidth="1.5">
                    <line x1="250" y1="150" x2="160" y2="110" strokeDasharray="3 3" />
                    <line x1="250" y1="150" x2="340" y2="180" strokeDasharray="3 3" />
                    <line x1="210" y1="200" x2="160" y2="110" />
                  </g>

                  {/* Connection Node Circles */}
                  <circle cx="250" cy="150" r="18" fill="#FFFDFB" stroke="rgba(255, 60, 0, 0.15)" strokeWidth="1" />
                  <circle cx="250" cy="150" r="6" fill="var(--evervie-orange)" />

                  <circle cx="160" cy="110" r="12" fill="#FFFDFB" stroke="rgba(230, 226, 220, 0.8)" strokeWidth="1.5" />
                  <circle cx="160" cy="110" r="4.5" fill="var(--evervie-orange)" />

                  <circle cx="340" cy="180" r="14" fill="#FFFDFB" stroke="rgba(230, 226, 220, 0.8)" strokeWidth="1.5" />
                  <circle cx="340" cy="180" r="4.5" fill="var(--evervie-orange)" />

                  <circle cx="210" cy="200" r="10" fill="#FFFDFB" stroke="rgba(230, 226, 220, 0.8)" strokeWidth="1.5" />
                  <circle cx="210" cy="200" r="4" fill="var(--evervie-orange)" />

                  {/* Secondary/Ambient connection points */}
                  <circle cx="300" cy="80" r="3" fill="var(--evervie-orange)" opacity="0.6" />
                  <circle cx="100" cy="170" r="3.5" fill="var(--evervie-orange)" opacity="0.5" />
                  <circle cx="390" cy="120" r="2.5" fill="var(--evervie-orange)" opacity="0.4" />
                </svg>
              </div>
            </div>

            {/* Right Column */}
            <div className="clinicalNetworkMetrics">
              {/* Metric Block 01 */}
              <div className="clinicalMetricBlock">
                <div className="clinicalMetricNumber">01</div>
                <div className="clinicalMetricDivider" />
                <div className="clinicalMetricContent">
                  <h3>
                    {title === "Elder Care" ? "Geriatric Specialization" : "20 Nephrologists"}
                  </h3>
                  <div className="clinicalMetricAccent" />
                  <p>
                    {title === "Elder Care" ? (
                      "Designated medical directors specializing in geriatric care to oversee resident wellness and medicine."
                    ) : (
                      "Associated super-specialist nephrologists guiding our clinical standards, treatments, and pathways."
                    )}
                  </p>
                </div>
              </div>

              {/* Metric Block 02 */}
              <div className="clinicalMetricBlock">
                <div className="clinicalMetricNumber">02</div>
                <div className="clinicalMetricDivider" />
                <div className="clinicalMetricContent">
                  <h3>
                    {title === "Elder Care" ? "Emergency Integration" : "350+ Trained Personnel"}
                  </h3>
                  <div className="clinicalMetricAccent" />
                  <p>
                    {title === "Elder Care" ? (
                      "Connected ambulance and hospital networks to guarantee immediate response and care coordination."
                    ) : (
                      "Skilled nurses and dialysis technicians delivering professional and compassionate daily care."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact / Care Experience Section */}
        {careExperience.length > 0 && (
          <section className="careExpSection">
            <div className="sectionHead" style={{ margin: 0 }}>
              <div>
                <div className="eyebrow">Impact & Care</div>
                <h2>Delivering care that actually matters.</h2>
              </div>
              <p>How we measure clinical excellence, access, and daily dedication across the vertical.</p>
            </div>
            <div className="careExpGrid">
              {careExperience.map((exp, idx) => (
                <div className="careExpCard" key={idx}>
                  {exp.image ? (
                    <div className="careExpImageWrapper">
                      <img src={exp.image} alt={exp.heading} className="careExpImage" />
                    </div>
                  ) : (
                    exp.icon && (
                      <div className="careExpIcon">
                        {(() => {
                          const ExpIcon = exp.icon;
                          return <ExpIcon size={18} strokeWidth={2.5} />;
                        })()}
                      </div>
                    )
                  )}
                  <h3>{exp.heading}</h3>
                  <p>{exp.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <PortfolioGallery currentVertical={title} />

        <PortfolioNavSection currentVertical={title} />

        {/* Closing CTA Section */}
        <section className="portfolioClosing">
          <div className="portfolioClosingBox">
            <div className="portfolioClosingIcon">
              <ClosingIcon size={24} />
            </div>
            <div className="portfolioClosingText">
              <h3>{closing.statement || "Building the future of care."}</h3>
              <p>{closing.supporting || "With strong foundations, we expand access, quality, and impact."}</p>
            </div>
            <Link to={closing.ctaLink || "/"} className="btnOutline">
              {closing.ctaText || "Explore Our Portfolio"}
            </Link>
          </div>
        </section>

      </main>
    </Frame>
  );
}

// Renal Care Page Component
function RenalCare() {
  const metrics = [
    { icon: Building2, label: "Dialysis Centres", number: "20", desc: "Dialysis centres across 7 states", tone: "orange" },
    { icon: Users, label: "Hospitals", number: "4", desc: "Hospitals in 4 cities", tone: "solar" },
    { icon: Activity, label: "Dialysis Sessions", number: "10 Lakh+", desc: "High-quality dialysis sessions delivered since 2013", tone: "pink" },
    { icon: UsersRound, label: "Patients Served", number: "25,000+", desc: "Patients served across hospitals", tone: "orange" },
    { icon: Globe2, label: "Outreach Patients", number: "2,500+", desc: "Patients reached through community outreach and OPD camps", tone: "solar" }
  ];

  const platform = {
    label: "Our Renal Care Platform",
    name: "7Med India",
    desc: "7Med India is Evervie’s dedicated renal care platform, delivering accessible and high-quality dialysis services across North and East India. Partnering with leading nephrologists and hospitals, 7Med provides patient-first kidney care that combines clinical discipline with compassionate treatment.",
    ctaText: "Explore 7Med India",
    ctaLink: "#",
    logo: (
      <img
        src="/7med_logo_No Background.png"
        alt="7Med India Logo"
        style={{ maxWidth: '350px', width: '100%', height: 'auto', display: 'block' }}
      />
    )
  };

  const footprint = {
    title: "Operating Footprint",
    desc: "Renal care reach across dialysis centres and hospitals in India.",
    dialysisCount: 20,
    statesCount: 7,
    statesList: "Delhi, Haryana, Rajasthan, Uttar Pradesh, Uttarakhand, Bihar, and Jharkhand",
    mapCenter: [27.0, 83.5],
    mapZoom: 5.3,
    mapData: {
      dialysisStates: [
        "Delhi",
        "Haryana",
        "Rajasthan",
        "Uttar Pradesh",
        "Uttarakhand",
        "Bihar",
        "Jharkhand"
      ]
    },
    hospitalsList: [
      { city: "Delhi", state: "Delhi", coordinates: [28.6139, 77.2090] },
      { city: "Moradabad", state: "Uttar Pradesh", coordinates: [28.8386, 78.7733] },
      { city: "Varanasi", state: "Uttar Pradesh", coordinates: [25.3176, 82.9739] },
      { city: "Mau", state: "Uttar Pradesh", coordinates: [25.9417, 83.5611] }
    ]
  };

  const network = {
    title: "Clinical Network",
    hospitalCount: 4,
    citiesList: "Delhi, Moradabad, Varanasi, and Mau"
  };

  const careExperience = [
    { image: "/patient_first_care.png", heading: "Patient-First Care", desc: "Safe, effective, and compassionate kidney care tailored around patient schedules and long-term health." },
    { image: "/clinical_excellence.png", heading: "Clinical Excellence", desc: "Nephrologist-led expertise, clinical protocols, and trained care teams ensuring the highest treatment quality." },
    { image: "/accessible_care.png", heading: "Accessible Care", desc: "Strategic footprint expansion across multiple states to bring renal care closer to under-served communities." },
    { image: "/community_impact.png", heading: "Community Impact", desc: "Organizing regular free outreach programs, diagnostics checks, and local OPD camps for early detection." }
  ];

  const closing = {
    icon: Droplet,
    statement: "Building the future of kidney care in India.",
    supporting: "With strong foundations and a patient-first approach, we continue to expand access, quality, and impact.",
    ctaText: "Explore Our Portfolio",
    ctaLink: "/"
  };

  return (
    <PortfolioVertical
      title="Renal Care"
      subtitle="Specialised kidney care platforms built around accessibility, clinical focus, and long-term continuity."
      intro="Evervie’s renal care vertical is dedicated to addressing the growing demand for trusted dialysis services and comprehensive kidney care. Through modern operating platforms and expert care teams, we bring continuous support to patients and families."
      heroImage="/renal_care_hero.png"
      heroBgImage="/7Med/7med-aiims-dialysis-unit-nurses-station.png"
      metrics={metrics}
      platform={platform}
      footprint={footprint}
      network={network}
      careExperience={careExperience}
      closing={closing}
    />
  );
}

// Oncology Page Component
function Oncology() {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch("/india_states.geojson")
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error("Error loading GeoJSON data:", err));
  }, []);

  const mapCenter = [19.6, 75.8];
  const mapZoom = 6.4;
  const highlightedStates = ["Maharashtra"];

  const getStateStyle = (feature) => {
    const stateName = feature.properties.NAME_1;
    const isHighlighted = highlightedStates.includes(stateName);

    return {
      fillColor: isHighlighted ? "url(#active-stripes)" : "url(#diagonal-stripes)",
      stroke: true,
      weight: 1,
      opacity: 1.0,
      color: isHighlighted ? "rgba(255, 60, 0, 0.7)" : "#d2ccc6",
      fillOpacity: 1.0
    };
  };

  const onEachFeature = (feature, layer) => {
    const stateName = feature.properties.NAME_1;
    const isHighlighted = highlightedStates.includes(stateName);

    if (isHighlighted) {
      layer.bindTooltip(`
        <div style="font-family: inherit; font-size: 12px; padding: 4px 8px;">
          <strong>${stateName}</strong><br/>
          Active Footprint<br/><span style="color:var(--evervie-orange);font-weight:600;">Maharashtra Expansion Hub</span>
        </div>
      `, {
        sticky: true,
        direction: "auto",
        opacity: 0.95
      });
    }

    layer.on({
      mouseover: (e) => {
        if (!isHighlighted) return;
        const l = e.target;
        l.setStyle({
          fillOpacity: 0.9,
          fillColor: "url(#evervie-map-gradient)",
          stroke: true,
          weight: 1.5,
          color: "var(--evervie-orange)"
        });
      },
      mouseout: (e) => {
        if (!isHighlighted) return;
        const l = e.target;
        l.setStyle(getStateStyle(feature));
      }
    });
  };

  const customMarkerIcon = typeof window !== "undefined" ? new L.DivIcon({
    html: `<div style="
      background-color: var(--evervie-orange);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      box-shadow: 0 0 8px rgba(255, 60, 0, 0.6);
    "></div>`,
    className: "custom-leaflet-marker",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8]
  }) : null;

  const facilities = [
    { city: "Latur", coordinates: [18.4088, 76.5604] },
    { city: "Akola", coordinates: [20.7002, 77.0082] },
    { city: "Solapur", coordinates: [17.6599, 75.9064] },
    { city: "Dhule", coordinates: [20.9020, 74.7749] },
    { city: "Pimpri-Chinchwad (Pune)", coordinates: [18.6298, 73.7997] }
  ];

  const expertisePathway = [
    { icon: Microscope, title: "Early Detection & Screening", desc: "Screening and early detection support for better treatment readiness." },
    { icon: Activity, title: "Diagnostics", desc: "Diagnostic services that support accurate and timely clinical decisions." },
    { icon: Droplet, title: "Medical Oncology & Chemotherapy", desc: "Evidence-based treatment planning and systemic cancer care." },
    { icon: Target, title: "Radiation Oncology", desc: "Radiation treatment capabilities supported by modern oncology facilities." },
    { icon: Sparkles, title: "Targeted Therapy & Immunotherapy", desc: "Advanced treatment approaches for more personalised cancer care." },
    { icon: HandHeart, title: "Supportive Care & Rehabilitation", desc: "Support for healing, recovery, and patient well-being." },
    { icon: Award, title: "Survivorship Programs", desc: "Long-term guidance and support beyond active treatment." }
  ];

  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main className="oncologyPage">
        {/* Hero Section */}
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <span>Our Portfolio</span>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">Oncology</span>
            </nav>
            <div className="eyebrow"><EyebrowSymbol />OUR PORTFOLIO</div>
            <h1>Oncology</h1>
            <p className="heroGradientLead" style={{ fontWeight: 600, color: 'var(--graphite)', marginBottom: 16 }}>
              Comprehensive cancer care.<br />Closer to home.
            </p>
            <p className="wwaHeroBody" style={{ margin: 0 }}>
              Optimus Oncology is a rapidly growing oncology healthcare organisation focused on making advanced cancer care accessible across India, especially in Tier-2 and Tier-3 cities.
            </p>
          </div>
          <img
            src="/oncology_hero_patient_care.png"
            alt=""
            className="wwaHeroDiamond"
            aria-hidden="true"
            style={{ opacity: 0.85 }}
          />
        </section>

        {/* Impact Metrics Strip */}
        <section className="metricsStrip oncologyMetrics">
          <article className="metricCard">
            <div className="metricHeader">
              <span className="metricIcon metricIcon--orange">
                <Target size={20} />
              </span>
              <span className="metricLabel">Radiotherapy Treatments</span>
            </div>
            <strong className="metricValue">20,000+</strong>
            <p className="metricDescription">Radiotherapy treatments delivered supporting patients throughout their recovery journey.</p>
          </article>
          <article className="metricCard">
            <div className="metricHeader">
              <span className="metricIcon metricIcon--orange">
                <Activity size={20} />
              </span>
              <span className="metricLabel">Oncology Consultations</span>
            </div>
            <strong className="metricValue">50,000+</strong>
            <p className="metricDescription">Oncology consultations provided ensuring precise treatment pathways and clinical clarity.</p>
          </article>
        </section>

        {/* Platform Introduction Section */}
        <section className="platformSection">
          <div className="platformLayout">
            <div className="platformLeft">
              <div className="eyebrow">OUR ONCOLOGY PLATFORM</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, margin: '8px 0 20px 0', color: 'var(--graphite)' }}>Optimus Oncology</h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--muted)', marginBottom: 32 }}>
                Optimus Oncology is Evervie’s dedicated oncology platform, focused on making advanced and comprehensive cancer care accessible across India. Founded and led by renowned oncologists from Tata Memorial Centre, the platform integrates diagnostics, medical oncology, radiation oncology, and supportive care to bring patient-first clinical standards closer to home, especially in under-served regions.
              </p>
              <a href="#clinical-network" className="btn">
                Explore Clinical Network
              </a>
            </div>
            <div className="platformRight">
              <img
                src="/OPTIMUS LOGO.JPG"
                alt="Optimus Oncology Logo"
                style={{ maxWidth: '350px', width: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
              />
            </div>
          </div>
        </section>

        {/* Our Expertise Section */}
        <section className="oncologyExpertiseSection">
          <div className="oncologyExpertiseLayout">
            <div className="oncologyExpertiseIntro">
              <div className="eyebrow">OUR EXPERTISE</div>
              <h2 className="oncologyExpertiseHeading">Advanced care.<br />Delivered with expertise and compassion.</h2>
              <p className="oncologyExpertiseDesc">
                From early detection to advanced treatment and recovery support, Optimus Oncology brings together integrated cancer-care capabilities across every stage of the patient journey.
              </p>
            </div>
            <div className="oncologyExpertisePathway">
              {expertisePathway.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div className="oncologyPathwayStep" key={idx}>
                    <div className="oncologyStepProgress">
                      <div className="oncologyStepDot">
                        <StepIcon size={16} />
                      </div>
                      {idx < expertisePathway.length - 1 && <div className="oncologyStepLine" />}
                    </div>
                    <div className="oncologyStepContent">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Operating Footprint Section */}
        <section className="footprintSection">
          <div className="footprintLayout">
            <div className="leftFootprintSummary">
              <div className="eyebrow" style={{ color: 'var(--evervie-orange)', marginBottom: 8 }}>OUR FOOTPRINT</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, margin: '0 0 16px 0', color: 'var(--graphite)', letterSpacing: '-0.02em' }}>Expanding access across Maharashtra.</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', marginBottom: 40 }}>
                Comprehensive cancer centres across Maharashtra, with radiation oncology facilities in key cities.
              </p>

              <div className="footprintMetricBlock" style={{ marginTop: '12px', width: '100%' }}>
                <div className="oncologyLocationHeader">Radiation oncology facilities in:</div>
                <div className="oncologyLocationList">
                  {facilities.map((f, i) => (
                    <div className="cityChip" key={i}>
                      <MapPin size={13} />
                      {f.city}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mapContainerWrapper">
              {/* SVG Pattern Definition for map stripes */}
              <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                <defs>
                  <pattern id="diagonal-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#eae6e1" strokeWidth="1.5" />
                  </pattern>
                  <pattern id="diagonal-stripes-hover" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#d2ccc6" strokeWidth="2" />
                  </pattern>
                  <pattern id="active-stripes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255, 60, 0, 0.45)" strokeWidth="2.5" />
                  </pattern>
                  <linearGradient id="evervie-map-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff91b4" />
                    <stop offset="40%" stopColor="#ff3c00" />
                    <stop offset="100%" stopColor="#fabe00" />
                  </linearGradient>
                </defs>
              </svg>

              {geoJsonData && (
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  zoomSnap={0.1}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  dragging={false}
                  zoomControl={false}
                  attributionControl={false}
                  touchZoom={false}
                  boxZoom={false}
                  keyboard={false}
                >
                  <GeoJSON
                    data={geoJsonData}
                    style={getStateStyle}
                    onEachFeature={onEachFeature}
                  />
                  {facilities.map((f, i) => (
                    <Marker
                      key={i}
                      position={f.coordinates}
                      icon={customMarkerIcon}
                    >
                      <Tooltip permanent direction="right" offset={[10, 0]} className="custom-map-label">
                        {f.city.split(" (")[0]}
                      </Tooltip>
                      <Popup>
                        <div style={{ fontFamily: 'inherit', fontSize: '13px', lineHeight: '1.4', padding: '4px' }}>
                          <strong style={{ color: 'var(--evervie-orange)', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Radiation Oncology Facility</strong>
                          <span style={{ fontWeight: 700 }}>{f.city}</span><br />
                          <span style={{ color: '#666', marginTop: '4px', display: 'block' }}>Part of Optimus Oncology's care network.</span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>
        </section>

        {/* Clinical Network & Expansion Section */}
        <section id="clinical-network" className="oncologyNetworkExpansionSection">
          <div className="oncologyNetworkExpansionLayout">
            {/* 6A. Clinical Network */}
            <div className="oncologyNetworkBlock">
              <div className="eyebrow">OUR CLINICAL NETWORK</div>
              <h2 className="oncologyBlockHeading">Expertise that makes a difference.</h2>
              <div className="oncologyNetworkList">
                <div className="oncologyNetworkItem">
                  <div className="oncologyNetworkDot" />
                  <p>Founded and led by five renowned oncologists from Tata Memorial Centre.</p>
                </div>
                <div className="oncologyNetworkItem">
                  <div className="oncologyNetworkDot" />
                  <p>Team of 15+ experienced oncologists and cancer specialists.</p>
                </div>
              </div>
              <div className="oncologyNetworkImageWrapper">
                <img src="/oncology_clinical_team.png" alt="Optimus Oncology team of doctors" />
              </div>
            </div>

            {/* 6B. Expansion Plan */}
            <div className="oncologyExpansionBlock">
              <div className="eyebrow">OUR EXPANSION PLAN</div>
              <h2 className="oncologyBlockHeading">Building the future of cancer care.</h2>
              <p className="oncologyExpansionText">
                Expansion target of 50 cancer centres across India within the next five years.
              </p>

              {/* Symbolic growth map / India expansion visual */}
              <div className="oncologyExpansionVisual">
                <svg viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="expansion-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                      <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                    </pattern>
                    <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--evervie-orange)" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="var(--evervie-orange)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--evervie-orange)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="var(--evervie-orange)" />
                    </linearGradient>
                    <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Grid Background */}
                  <rect width="100%" height="100%" fill="url(#expansion-grid)" rx="10" />

                  {/* Horizontal Guideline */}
                  <line x1="50" y1="280" x2="450" y2="280" stroke="var(--line-soft)" strokeWidth="1.5" />
                  <line x1="50" y1="180" x2="450" y2="180" stroke="var(--line-soft)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="50" y1="80" x2="450" y2="80" stroke="var(--line-soft)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />

                  {/* Area Under Curve */}
                  <path
                    d="M 50 280 C 120 255, 200 190, 270 145 C 330 110, 390 75, 430 60 L 430 280 Z"
                    fill="url(#area-gradient)"
                  />

                  {/* Glowing line overlay */}
                  <path
                    d="M 50 280 C 120 255, 200 190, 270 145 C 330 110, 390 75, 430 60"
                    stroke="var(--evervie-orange)"
                    strokeWidth="8"
                    strokeOpacity="0.25"
                    filter="url(#glow-filter)"
                    strokeLinecap="round"
                  />

                  {/* Main Curve */}
                  <path
                    d="M 50 280 C 120 255, 200 190, 270 145 C 330 110, 390 75, 430 60"
                    stroke="url(#line-gradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Year 1 Hub */}
                  <circle cx="120" cy="255" r="14" fill="var(--evervie-orange)" opacity="0.12" />
                  <circle cx="120" cy="255" r="7" fill="none" stroke="var(--evervie-orange)" strokeWidth="1.5" />
                  <circle cx="120" cy="255" r="3.5" fill="var(--evervie-orange)" />
                  <g transform="translate(90, 205)">
                    <rect x="0" y="0" width="60" height="24" rx="5" fill="#ffffff" stroke="var(--line-soft)" strokeWidth="1" />
                    <text x="30" y="15" fill="var(--graphite)" fontSize="9" fontWeight="700" textAnchor="middle">10 Centres</text>
                  </g>

                  {/* Year 3 Hub */}
                  <circle cx="270" cy="145" r="18" fill="var(--evervie-orange)" opacity="0.12" />
                  <circle cx="270" cy="145" r="9" fill="none" stroke="var(--evervie-orange)" strokeWidth="1.5" />
                  <circle cx="270" cy="145" r="4.5" fill="var(--evervie-orange)" />
                  <g transform="translate(240, 95)">
                    <rect x="0" y="0" width="60" height="24" rx="5" fill="#ffffff" stroke="var(--line-soft)" strokeWidth="1" />
                    <text x="30" y="15" fill="var(--graphite)" fontSize="9" fontWeight="700" textAnchor="middle">25 Centres</text>
                  </g>

                  {/* Year 5 Hub */}
                  <circle cx="430" cy="60" r="24" fill="var(--evervie-orange)" opacity="0.15" />
                  <circle cx="430" cy="60" r="12" fill="none" stroke="var(--evervie-orange)" strokeWidth="2" />
                  <circle cx="430" cy="60" r="6" fill="var(--evervie-orange)" />
                  <g transform="translate(370, 10)">
                    <rect x="0" y="0" width="90" height="28" rx="6" fill="var(--graphite)" />
                    <text x="45" y="17" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">50 CENTRES</text>
                  </g>

                  {/* Grid X Axis Labels */}
                  <text x="120" y="305" fill="var(--muted)" fontSize="9.5" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">YEAR 1</text>
                  <text x="270" y="305" fill="var(--muted)" fontSize="9.5" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">YEAR 3</text>
                  <text x="430" y="305" fill="var(--muted)" fontSize="9.5" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">YEAR 5</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="mvStatement">
          <div className="mvStatementInner">
            <div className="mvStatHead">
              <div className="eyebrow">Vision & Mission</div>
              <h2>Coordinated and compassionate cancer care.</h2>
              <p className="mvStatSubline">Our mission defines our patient-centric operations today. Our vision defines the reach we are building for tomorrow.</p>
            </div>
            <div className="mvStatGrid">
              <div className="mvBlock mvMission">
                <div className="mvBlockIconWrap"><Target size={24} strokeWidth={1.5} /></div>
                <span className="mvLabel">Our Mission</span>
                <h3 className="mvSubheading">Why we exist.</h3>
                <p className="mvBlockStatement">Technologically advanced, patient-centric cancer care.</p>
                <p className="mvBlockCopy">To develop and operate technologically advanced, patient-centric cancer centres that deliver comprehensive, affordable, and high-quality oncology services closer to home.</p>
              </div>
              <div className="mvStatDivider" aria-hidden="true" />
              <div className="mvBlock mvVision">
                <div className="mvBlockIconWrap"><Sparkles size={24} strokeWidth={1.5} /></div>
                <span className="mvLabel">Our Vision</span>
                <h3 className="mvSubheading">The future we are working toward.</h3>
                <p className="mvBlockStatement">India's most trusted oncology network.</p>
                <p className="mvBlockCopy">To become India’s most trusted oncology network by making comprehensive cancer care accessible to every patient, irrespective of geography.</p>
              </div>
            </div>
          </div>
        </section>

        <PortfolioGallery currentVertical="Oncology" />

        <PortfolioNavSection currentVertical="Oncology" />

        {/* Closing CTA Section */}
        <section className="portfolioClosing">
          <div className="portfolioClosingBox">
            <div className="portfolioClosingIcon">
              <Target size={24} />
            </div>
            <div className="portfolioClosingText">
              <h3>Better cancer care. Closer to every community.</h3>
              <p>Explore how Evervie is building specialised healthcare platforms across critical areas of care.</p>
            </div>
            <Link to="/" className="btnOutline">
              Explore Our Portfolio
            </Link>
          </div>
        </section>
      </main>
    </Frame>
  );
}

// Diagnostics Placeholder Page Component
// Diagnostics Page Component
function Diagnostics() {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch("/india_states.geojson")
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error("Error loading GeoJSON data:", err));
  }, []);

  const mapCenter = [11.0, 78.5];
  const mapZoom = 6.8;
  const highlightedStates = ["Tamil Nadu"];

  const getStateStyle = (feature) => {
    const stateName = feature.properties.NAME_1;
    const isHighlighted = highlightedStates.includes(stateName);

    return {
      fillColor: isHighlighted ? "url(#active-stripes)" : "url(#diagonal-stripes)",
      stroke: true,
      weight: 1,
      opacity: 1.0,
      color: isHighlighted ? "rgba(255, 60, 0, 0.7)" : "#d2ccc6",
      fillOpacity: 1.0
    };
  };

  const onEachFeature = (feature, layer) => {
    const stateName = feature.properties.NAME_1;
    const isHighlighted = highlightedStates.includes(stateName);

    if (isHighlighted) {
      layer.bindTooltip(`
        <div style="font-family: inherit; font-size: 12px; padding: 4px 8px;">
          <strong>${stateName}</strong><br/>
          Active Footprint<br/><span style="color:var(--evervie-orange);font-weight:600;">Medilabs Tamil Nadu Hub</span>
        </div>
      `, {
        sticky: true,
        direction: "auto",
        opacity: 0.95
      });
    }

    layer.on({
      mouseover: (e) => {
        if (!isHighlighted) return;
        const l = e.target;
        l.setStyle({
          fillOpacity: 0.9,
          fillColor: "url(#evervie-map-gradient)",
          stroke: true,
          weight: 1.5,
          color: "var(--evervie-orange)"
        });
      },
      mouseout: (e) => {
        if (!isHighlighted) return;
        const l = e.target;
        l.setStyle(getStateStyle(feature));
      }
    });
  };

  const customMarkerIcon = typeof window !== "undefined" ? new L.DivIcon({
    html: `<div style="
      background-color: var(--evervie-orange);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      box-shadow: 0 0 8px rgba(255, 60, 0, 0.6);
    "></div>`,
    className: "custom-leaflet-marker",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8]
  }) : null;

  const facilities = [
    { city: "Chennai", coordinates: [13.0827, 80.2707] },
    { city: "Coimbatore", coordinates: [11.0168, 76.9558] },
    { city: "Madurai", coordinates: [9.9252, 78.1198] },
    { city: "Trichy", coordinates: [10.7905, 78.7047] },
    { city: "Salem", coordinates: [11.6643, 78.1460] }
  ];

  const servicesPathway = [
    { icon: Microscope, title: "Clinical Pathology & Biochemistry", desc: "Advanced hematology, pathology, biochemistry, and specialized test menu exceeding 1,500 tests." },
    { icon: Activity, title: "Radiology & Advanced Imaging", desc: "Diagnostic centers equipped with modern CT scans, ultrasound, and state-of-the-art diagnostic imaging." },
    { icon: Heart, title: "Preventive Health Screening", desc: "Comprehensive, customized wellness checks for early risk assessment and health monitoring." },
    { icon: HomeIcon, title: "Home Sample Collection", desc: "Reliable, sterile sample collection services from the comfort and safety of your home across Tamil Nadu." },
    { icon: Building2, title: "Hospital Laboratory Management", desc: "Comprehensive management services for clinics and hospitals, delivering high-throughput and quality accuracy." },
    { icon: UsersRound, title: "Corporate Wellness Programs", desc: "Specialized preventive screening packages, health talks, and diagnostics for corporate workforces." }
  ];

  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main className="diagnosticsPage">
        {/* Hero Section */}
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <span>Our Portfolio</span>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">Diagnostics</span>
            </nav>
            <div className="eyebrow"><EyebrowSymbol />OUR PORTFOLIO</div>
            <h1>Diagnostics</h1>
            <p className="heroGradientLead" style={{ fontWeight: 600, color: 'var(--graphite)', marginBottom: 16 }}>
              Reliable diagnostics.<br />Bedrock of care decisions.
            </p>
            <p className="wwaHeroBody" style={{ margin: 0 }}>
              Medilabs specializes in pathology, radiology, and preventive screening, delivering precise healthcare diagnostics that form the foundation of clinical recovery.
            </p>
          </div>
          <img
            src="/medilabs-diagnostics-image-03.png"
            alt=""
            className="wwaHeroDiamond"
            aria-hidden="true"
            style={{ opacity: 0.85 }}
          />
        </section>

        {/* Impact Metrics Strip */}
        <section className="metricsStrip oncologyMetrics">
          <article className="metricCard">
            <div className="metricHeader">
              <span className="metricIcon metricIcon--orange">
                <Users size={20} />
              </span>
              <span className="metricLabel">Patients Served</span>
            </div>
            <strong className="metricValue">10 Lakh+</strong>
            <p className="metricDescription">Over 10,00,000 happy customers served with accurate and reliable clinical diagnostic reports.</p>
          </article>
          <article className="metricCard">
            <div className="metricHeader">
              <span className="metricIcon metricIcon--orange">
                <Building2 size={20} />
              </span>
              <span className="metricLabel">Diagnostic Centres</span>
            </div>
            <strong className="metricValue">50+</strong>
            <p className="metricDescription">Widespread presence across Chennai and Tamil Nadu ensuring convenient local care access.</p>
          </article>
          <article className="metricCard">
            <div className="metricHeader">
              <span className="metricIcon metricIcon--orange">
                <Microscope size={20} />
              </span>
              <span className="metricLabel">Test Menu</span>
            </div>
            <strong className="metricValue">1,500+</strong>
            <p className="metricDescription">Vast menu of routine pathology and complex tests tailored for clinics, hospitals, and patients.</p>
          </article>
          <article className="metricCard">
            <div className="metricHeader">
              <span className="metricIcon metricIcon--orange">
                <Activity size={20} />
              </span>
              <span className="metricLabel">Radiology Imaging</span>
            </div>
            <strong className="metricValue">CT & Scan</strong>
            <p className="metricDescription">Equipped with CT scan, ultrasound, and clinical imaging systems for complete diagnostic clarity.</p>
          </article>
        </section>

        {/* Platform Introduction Section */}
        <section className="platformSection">
          <div className="platformLayout">
            <div className="platformLeft">
              <div className="eyebrow">OUR DIAGNOSTICS PLATFORM</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, margin: '8px 0 20px 0', color: 'var(--graphite)' }}>Medilabs</h2>
              <p style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--evervie-orange)', fontWeight: 700, margin: '-10px 0 16px 0' }}>
                A Unit of Biohygea Global Private Limited
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--muted)', marginBottom: 32 }}>
                Medilabs is a premier diagnostics provider specializing in pathology, radiology, preventive health screening, home sample collection, hospital laboratory management, and corporate wellness programs. By operating a robust diagnostic network equipped with state-of-the-art automated testing and imaging capabilities, Medilabs delivers precise clinical insights for hospitals, clinics, corporate clients, and individual patients across Tamil Nadu.
              </p>
              <a href="#clinical-network" className="btn">
                Explore Clinical Network
              </a>
            </div>
            <div className="platformRight">
              <img
                src="/Medilabs logo.webp"
                alt="Medilabs Logo"
                style={{ maxWidth: '350px', width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* Services Pathway Section */}
        <section className="diagnosticsExpertiseSection">
          <div className="oncologyExpertiseLayout">
            <div className="oncologyExpertiseIntro">
              <div className="eyebrow">OUR SERVICES</div>
              <h2 className="oncologyExpertiseHeading">Comprehensive diagnostic solutions.</h2>
              <p className="oncologyExpertiseDesc">
                From simple blood profiles to complex imaging assays, Medilabs coordinates diagnostic resources to support clinicians with absolute accuracy.
              </p>
            </div>
            <div className="oncologyExpertisePathway">
              {servicesPathway.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div className="oncologyPathwayStep" key={idx}>
                    <div className="oncologyStepProgress">
                      <div className="oncologyStepDot">
                        <StepIcon size={16} />
                      </div>
                      {idx < servicesPathway.length - 1 && <div className="oncologyStepLine" />}
                    </div>
                    <div className="oncologyStepContent">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Operating Footprint Section */}
        <section className="footprintSection">
          <div className="footprintLayout">
            <div className="leftFootprintSummary">
              <div className="eyebrow" style={{ color: 'var(--evervie-orange)', marginBottom: 8 }}>OUR FOOTPRINT</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, margin: '0 0 16px 0', color: 'var(--graphite)', letterSpacing: '-0.02em' }}>Tamil Nadu diagnostic network</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', marginBottom: 40 }}>
                Medilabs operates centers and home collection networks across key cities of Tamil Nadu, ensuring sample management and diagnostics access.
              </p>

              <div className="footprintMetricBlock" style={{ marginTop: '12px', width: '100%' }}>
                <div className="oncologyLocationHeader">Active cities in Tamil Nadu:</div>
                <div className="oncologyLocationList">
                  {facilities.map((f, i) => (
                    <div className="cityChip" key={i}>
                      <MapPin size={13} />
                      {f.city}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mapContainerWrapper">
              {/* SVG Pattern Definition for map stripes */}
              <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                <defs>
                  <pattern id="diagonal-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#eae6e1" strokeWidth="1.5" />
                  </pattern>
                  <pattern id="diagonal-stripes-hover" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#d2ccc6" strokeWidth="2" />
                  </pattern>
                  <pattern id="active-stripes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255, 60, 0, 0.45)" strokeWidth="2.5" />
                  </pattern>
                  <linearGradient id="evervie-map-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff91b4" />
                    <stop offset="40%" stopColor="#ff3c00" />
                    <stop offset="100%" stopColor="#fabe00" />
                  </linearGradient>
                </defs>
              </svg>

              {geoJsonData && (
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  zoomSnap={0.1}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  dragging={false}
                  zoomControl={false}
                  attributionControl={false}
                  touchZoom={false}
                  boxZoom={false}
                  keyboard={false}
                >
                  <GeoJSON
                    data={geoJsonData}
                    style={getStateStyle}
                    onEachFeature={onEachFeature}
                  />
                  {facilities.map((f, i) => (
                    <Marker
                      key={i}
                      position={f.coordinates}
                      icon={customMarkerIcon}
                    >
                      <Tooltip permanent direction="right" offset={[10, 0]} className="custom-map-label">
                        {f.city}
                      </Tooltip>
                      <Popup>
                        <div style={{ fontFamily: 'inherit', fontSize: '13px', lineHeight: '1.4', padding: '4px' }}>
                          <strong style={{ color: 'var(--evervie-orange)', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Medilabs Hub</strong>
                          <span style={{ fontWeight: 700 }}>{f.city} Center</span><br />
                          <span style={{ color: '#666', marginTop: '4px', display: 'block' }}>Providing pathology, home sample collection, and radiology.</span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>
        </section>

        {/* Clinical Network Section */}
        <section id="clinical-network" className="diagnosticsNetworkExpansionSection">
          <div className="oncologyNetworkExpansionLayout">
            {/* Clinical Network */}
            <div className="oncologyNetworkBlock">
              <div className="eyebrow">OUR CLINICAL NETWORK</div>
              <h2 className="oncologyBlockHeading">Precision guided by diagnostic experts.</h2>
              <div className="oncologyNetworkList">
                <div className="oncologyNetworkItem">
                  <div className="oncologyNetworkDot" />
                  <p>Certified clinical pathologists, laboratory technicians, and biochemists.</p>
                </div>
                <div className="oncologyNetworkItem">
                  <div className="oncologyNetworkDot" />
                  <p>400+ logistics partners managing cold-chain integrity and rapid turnaround times.</p>
                </div>
              </div>
              <div className="oncologyNetworkImageWrapper">
                <img src="/diagnostics_clinical_team.png" alt="Medilabs team of pathologists and lab technicians" />
              </div>
            </div>

            {/* Expansion Plan */}
            <div className="oncologyExpansionBlock">
              <div className="eyebrow">OUR EXPANSION TARGET</div>
              <h2 className="oncologyBlockHeading">Deeper diagnostic penetration.</h2>
              <p className="oncologyExpansionText">
                Medilabs is consistently expanding its footprint across secondary and tertiary towns of Tamil Nadu to bring NABL-standard quality reporting.
              </p>

              {/* Symbolic growth map / Tamil Nadu expansion visual */}
              <div className="oncologyExpansionVisual">
                <svg viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="diagnostics-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                      <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                    </pattern>
                    <linearGradient id="diag-area-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--evervie-orange)" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="var(--evervie-orange)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="diag-line-gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--evervie-orange)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="var(--evervie-orange)" />
                    </linearGradient>
                    <filter id="diag-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <rect width="100%" height="100%" fill="url(#diagnostics-grid)" rx="10" />

                  <line x1="50" y1="280" x2="450" y2="280" stroke="var(--line-soft)" strokeWidth="1.5" />
                  <line x1="50" y1="180" x2="450" y2="180" stroke="var(--line-soft)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="50" y1="80" x2="450" y2="80" stroke="var(--line-soft)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />

                  <path
                    d="M 50 280 C 120 255, 200 200, 270 160 C 330 120, 390 85, 430 70 L 430 280 Z"
                    fill="url(#diag-area-gradient)"
                  />

                  <path
                    d="M 50 280 C 120 255, 200 200, 270 160 C 330 120, 390 85, 430 70"
                    stroke="var(--evervie-orange)"
                    strokeWidth="8"
                    strokeOpacity="0.25"
                    filter="url(#diag-glow-filter)"
                    strokeLinecap="round"
                  />

                  <path
                    d="M 50 280 C 120 255, 200 200, 270 160 C 330 120, 390 85, 430 70"
                    stroke="url(#diag-line-gradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Year 1 Hub */}
                  <circle cx="120" cy="255" r="14" fill="var(--evervie-orange)" opacity="0.12" />
                  <circle cx="120" cy="255" r="7" fill="none" stroke="var(--evervie-orange)" strokeWidth="1.5" />
                  <circle cx="120" cy="255" r="3.5" fill="var(--evervie-orange)" />
                  <g transform="translate(90, 205)">
                    <rect x="0" y="0" width="65" height="24" rx="5" fill="#ffffff" stroke="var(--line-soft)" strokeWidth="1" />
                    <text x="32.5" y="15" fill="var(--graphite)" fontSize="9" fontWeight="700" textAnchor="middle">15 Centres</text>
                  </g>

                  {/* Year 3 Hub */}
                  <circle cx="270" cy="160" r="18" fill="var(--evervie-orange)" opacity="0.12" />
                  <circle cx="270" cy="160" r="9" fill="none" stroke="var(--evervie-orange)" strokeWidth="1.5" />
                  <circle cx="270" cy="160" r="4.5" fill="var(--evervie-orange)" />
                  <g transform="translate(240, 110)">
                    <rect x="0" y="0" width="65" height="24" rx="5" fill="#ffffff" stroke="var(--line-soft)" strokeWidth="1" />
                    <text x="32.5" y="15" fill="var(--graphite)" fontSize="9" fontWeight="700" textAnchor="middle">35 Centres</text>
                  </g>

                  {/* Year 5 Hub */}
                  <circle cx="430" cy="70" r="24" fill="var(--evervie-orange)" opacity="0.15" />
                  <circle cx="430" cy="70" r="12" fill="none" stroke="var(--evervie-orange)" strokeWidth="2" />
                  <circle cx="430" cy="70" r="6" fill="var(--evervie-orange)" />
                  <g transform="translate(370, 20)">
                    <rect x="0" y="0" width="90" height="28" rx="6" fill="var(--graphite)" />
                    <text x="45" y="17" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">50 CENTRES</text>
                  </g>

                  <text x="120" y="305" fill="var(--muted)" fontSize="9.5" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">YEAR 1</text>
                  <text x="270" y="305" fill="var(--muted)" fontSize="9.5" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">YEAR 3</text>
                  <text x="430" y="305" fill="var(--muted)" fontSize="9.5" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">YEAR 5</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="mvStatement">
          <div className="mvStatementInner">
            <div className="mvStatHead">
              <div className="eyebrow">Vision & Mission</div>
              <h2>Our commitment to precise, reliable diagnosis.</h2>
              <p className="mvStatSubline">Our mission defines our clinical focus today. Our vision defines the network we are building for tomorrow.</p>
            </div>
            <div className="mvStatGrid">
              <div className="mvBlock mvMission">
                <div className="mvBlockIconWrap"><Target size={24} strokeWidth={1.5} /></div>
                <span className="mvLabel">Our Mission</span>
                <h3 className="mvSubheading">Why we exist.</h3>
                <p className="mvBlockStatement">Precise, timely, and trusted diagnostic services.</p>
                <p className="mvBlockCopy">To deliver precise, timely diagnostic services with advanced pathology, radiology, and home care collection models that form the bedrock of clinical decisions.</p>
              </div>
              <div className="mvStatDivider" aria-hidden="true" />
              <div className="mvBlock mvVision">
                <div className="mvBlockIconWrap"><Sparkles size={24} strokeWidth={1.5} /></div>
                <span className="mvLabel">Our Vision</span>
                <h3 className="mvSubheading">The future we are working toward.</h3>
                <p className="mvBlockStatement">Tamil Nadu's most trusted diagnostics network.</p>
                <p className="mvBlockCopy">To be Tamil Nadu's most trusted diagnostics network by making reliable, high-quality, and preventive health screenings accessible to every community.</p>
              </div>
            </div>
          </div>
        </section>

        <PortfolioGallery currentVertical="Diagnostics" />

        <PortfolioNavSection currentVertical="Diagnostics" />

        {/* Closing CTA Section */}
        <section className="portfolioClosing">
          <div className="portfolioClosingBox">
            <div className="portfolioClosingIcon">
              <Microscope size={24} />
            </div>
            <div className="portfolioClosingText">
              <h3>Precision testing for better clinical choices.</h3>
              <p>Explore how Evervie is building specialised healthcare platforms across critical areas of care.</p>
            </div>
            <Link to="/" className="btnOutline">
              Explore Our Portfolio
            </Link>
          </div>
        </section>
      </main>
    </Frame>
  );
}

// Elder Care Placeholder Page Component
function ElderCare() {
  const metrics = [
    { icon: Building2, label: "Planned Homes", number: "6", desc: "Modern senior living spaces in development", tone: "orange" },
    { icon: Users, label: "Care Planners", number: "15+", desc: "Super-specialist geriatric care professionals", tone: "solar" },
    { icon: Activity, label: "Home Visits", number: "Coming", desc: "Coordinated home healthcare visits planned", tone: "pink" },
    { icon: UsersRound, label: "Support Network", number: "Planned", desc: "24/7 emergency coordination systems", tone: "orange" },
    { icon: Globe2, label: "Launch Window", number: "2027", desc: "Scheduled vertical launch and first center opening", tone: "solar" }
  ];

  const platform = {
    label: "Future Platform Concept",
    name: "Evervie Elder Care",
    desc: "Our elder care platform is designed around comfort, dignity, and specialized care. As ageing demographics require more integrated support, Evervie is developing a comprehensive care model that blends assisted living, home healthcare, and community activities into a trusted system.",
    ctaText: "Register Interest",
    ctaLink: "#",
    logo: (
      <div className="platformLogoBox">
        <span className="platformLogoText">Elder Care</span>
      </div>
    )
  };

  const footprint = {
    title: "Planned Footprint",
    items: [
      { heading: "6 Planned Communities", detail: "Initial sites selected for development in metropolitan areas with high demand for senior services." },
      { heading: "Home Healthcare Network", detail: "Partnerships in progress with certified home care providers for seamless in-home clinical support." }
    ]
  };

  const network = {
    title: "Planned Care Model",
    items: [
      { heading: "Geriatric Specialization", detail: "Designated medical directors specializing in geriatric care to oversee resident wellness and medicine." },
      { heading: "Emergency Integration", detail: "Connected ambulance and hospital networks to guarantee immediate response and care coordination." }
    ]
  };

  const careExperience = [
    { icon: Heart, heading: "Dignity & Comfort", desc: "Creating positive living environments that respect individual independence while offering full support." },
    { icon: Award, heading: "Geriatric Medicine", desc: "Focused clinical pathways address cognitive wellness, physical mobility, and nutritional balance." },
    { icon: Globe2, heading: "Connected Security", desc: "Wearable safety monitors and health trackers linked to centralized emergency response systems." },
    { icon: UsersRound, heading: "Community Support", desc: "Encouraging social inclusion through regular group activities, wellness seminars, and outings." }
  ];

  return (
    <PortfolioVertical
      title="Elder Care"
      subtitle="Dignified, comfortable, and coordinated care for ageing communities."
      intro="Our elder care vertical is a future-focused platform designed around the clinical, physical, and emotional needs of elderly individuals and their families."
      heroImage="/grandmother_and_child_in_warm_embrace.png"
      metrics={metrics}
      platform={platform}
      footprint={footprint}
      network={network}
      careExperience={careExperience}
      closing={{
        icon: HandHeart,
        statement: "Envisioning the future of senior living.",
        supporting: "Building platforms that respect dignity and support families.",
        ctaText: "Explore Our Portfolio",
        ctaLink: "/"
      }}
    />
  );
}

// ==========================================================================
// Investor Centre Data & Component Implementations
// ==========================================================================

const investorMetrics = [
  { id: "verticals", label: "Healthcare Verticals", value: "4 Verticals", description: "Renal Care, Oncology, Diagnostics, and Elder Care platforms.", icon: Activity, source: "Evervie Platform Data", lastUpdated: "Q2 FY26" },
  { id: "presence", label: "Operating Presence", value: "12 States", description: "Operational footprint across key Indian states.", icon: Globe2, source: "Geographic Directory", lastUpdated: "July 2026" },
  { id: "network", label: "Care Network", value: "30+ Centres", description: "Hospitals, dialysis centers, and diagnostic labs.", icon: Building2, source: "Clinical Register", lastUpdated: "July 2026" },
  { id: "listed", label: "Market Discipline", value: "NSE / BSE Listing", description: "Planned public listing with complete regulatory compliance.", icon: TrendingUp, source: "Corporate Filings", lastUpdated: "July 2026" }
];

function InvestorMetricCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % investorMetrics.length);
    }, 6000);

    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setIsPaused(true);
    setActiveIndex((prev) => (prev - 1 + investorMetrics.length) % investorMetrics.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setIsPaused(true);
    setActiveIndex((prev) => (prev + 1) % investorMetrics.length);
  };

  const handleDotClick = (idx, e) => {
    if (e) e.stopPropagation();
    setIsPaused(true);
    setActiveIndex(idx);
  };

  return (
    <div 
      className="metricCarouselContainer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="metricCarouselViewport">
        <div 
          className="metricCarouselTrack" 
          style={{ 
            "--slide-index": activeIndex,
            transform: `translateX(calc(var(--slide-offset) - var(--slide-index) * var(--slide-width)))`
          }}
        >
          {investorMetrics.map((item, idx) => {
            const Icon = item.icon;
            const isActive = idx === activeIndex;
            return (
              <div 
                key={item.id} 
                className={`metricCarouselSlide ${isActive ? "active" : ""}`}
                onClick={(e) => !isActive && handleDotClick(idx, e)}
              >
                <div className="metricCarouselSlideContent">
                  <div className="metricSlideIcon">
                    <Icon size={24} />
                  </div>
                  <strong className="metricSlideValue">{item.value}</strong>
                  <span className="metricSlideLabel">{item.label}</span>
                  <p className="metricSlideDesc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="metricCarouselControls">
        <button 
          onClick={handlePrev} 
          className="carouselControlBtn prev" 
          aria-label="Previous Metric"
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="carouselIndicators">
          {investorMetrics.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => handleDotClick(idx, e)}
              className={`carouselIndicatorDot ${idx === activeIndex ? "active" : ""}`}
              aria-label={`Go to metric ${idx + 1}`}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            />
          ))}
        </div>

        <button 
          onClick={handleNext} 
          className="carouselControlBtn next" 
          aria-label="Next Metric"
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Financial Reports & News/Events — Strapi-backed sections
// --------------------------------------------------------------------------

const REPORT_CATEGORIES = [
  { key: "annual-report", label: "Annual Reports", archiveField: "annualReportsArchiveUrl", archiveLabel: "View all annual reports" },
  { key: "quarterly-result", label: "Quarterly Results", archiveField: "quarterlyResultsArchiveUrl", archiveLabel: "View all quarterly results" },
  { key: "company-presentation", label: "Company Presentations", archiveField: "presentationsArchiveUrl", archiveLabel: "View all company presentations" }
];

// Financial Information page — one entry per financial-document category enum value.
const FINANCIAL_INFO_CATEGORIES = [
  {
    key: "annual-report",
    label: "Annual Reports",
    description: "Explore Evervie's annual reports for a comprehensive overview of performance, strategy, governance, and progress over the years.",
    icon: FileText,
    filters: ["search", "financialYear", "sort"],
  },
  {
    key: "quarterly-result",
    label: "Financial Results",
    description: "Access quarterly and annual financial results, review reports, and board meeting outcomes.",
    icon: BarChart3,
    filters: ["search", "financialYear", "reportingPeriod", "sort"],
  },
  {
    key: "shareholding-pattern",
    label: "Shareholding Pattern",
    description: "Review Evervie's shareholding pattern filings by financial year and reporting quarter.",
    icon: PieChart,
    filters: ["financialYear", "reportingPeriod", "sort"],
  },
  {
    key: "other-statutory-info",
    label: "Other Statutory Information",
    description: "Corporate governance reports and other statutory disclosures filed by Evervie.",
    icon: ShieldCheck,
    filters: ["search", "financialYear", "sort"],
  },
  {
    key: "subsidiary-companies",
    label: "Subsidiary Companies",
    description: "Statements and disclosures relating to Evervie's subsidiary companies.",
    icon: Building2,
    filters: ["search", "financialYear", "sort"],
  },
  {
    key: "shareholder-communication",
    label: "Communication to Shareholders",
    description: "Letters, notices, and other communications sent to Evervie's shareholders.",
    icon: Mail,
    filters: ["search", "financialYear", "sort"],
  },
  {
    key: "mgt9-annual-return",
    label: "MGT 9 & Annual Return",
    description: "Annual return filings (MGT-7/MGT-9) submitted by Evervie for each financial year.",
    icon: ClipboardList,
    filters: ["search", "financialYear", "sort"],
  },
  {
    key: "credit-rating",
    label: "Credit Rating",
    description: "Credit rating updates and rationale reports for Evervie.",
    icon: Award,
    filters: ["search", "financialYear", "sort"],
  },
  {
    key: "postal-ballot",
    label: "Postal Ballot",
    description: "Postal ballot notices and results for shareholder resolutions.",
    icon: CheckSquare,
    filters: ["search", "financialYear", "sort"],
  },
  {
    key: "notice-announcement",
    label: "Notices & Announcements",
    description: "Board meeting outcomes and other stock exchange notices and announcements.",
    icon: Megaphone,
    filters: ["search", "financialYear", "sort"],
  },
  {
    key: "esop",
    label: "Employee Stock Option Plan",
    description: "Disclosures relating to Evervie's Employee Stock Option Plan (ESOP).",
    icon: Users,
    filters: ["search", "financialYear", "sort"],
  },
  {
    key: "others",
    label: "Others",
    description: "Other investor documents that do not fall under a specific category above.",
    icon: Folder,
    filters: ["search", "sort"],
  },
];

// News & Insights page — one entry per blog-post category enum value.
const NEWS_INSIGHTS_CATEGORIES = [
  { key: "evervie-perspectives", label: "Evervie Perspectives" },
  { key: "market-trends", label: "Market Trends" },
  { key: "healthcare-insights", label: "Healthcare Insights" },
  { key: "sector-insights", label: "Sector Insights" },
  { key: "economy", label: "Economy" },
  { key: "policy-regulation", label: "Policy & Regulation" },
  { key: "sustainability", label: "Sustainability" },
  { key: "company-updates", label: "Company Updates" },
];

const NEWS_INSIGHTS_CATEGORY_LABELS = Object.fromEntries(NEWS_INSIGHTS_CATEGORIES.map((c) => [c.key, c.label]));

// Careers page — one entry per career-opening department enum value.
const CAREER_DEPARTMENTS = [
  { key: "healthcare-operations", label: "Healthcare Operations" },
  { key: "clinical-services", label: "Clinical Services" },
  { key: "finance", label: "Finance" },
  { key: "investments", label: "Investments" },
  { key: "investor-relations", label: "Investor Relations" },
  { key: "strategy", label: "Strategy" },
  { key: "business-development", label: "Business Development" },
  { key: "technology", label: "Technology" },
  { key: "data-analytics", label: "Data and Analytics" },
  { key: "marketing-communications", label: "Marketing and Communications" },
  { key: "legal-compliance", label: "Legal and Compliance" },
  { key: "human-resources", label: "Human Resources" },
  { key: "administration", label: "Administration" },
  { key: "portfolio-operations", label: "Portfolio Operations" },
];

const CAREER_DEPARTMENT_LABELS = Object.fromEntries(CAREER_DEPARTMENTS.map((d) => [d.key, d.label]));

const EMPLOYMENT_TYPE_LABELS = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

const WORK_ARRANGEMENT_LABELS = {
  onsite: "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

const EXPERIENCE_LEVEL_LABELS = {
  "entry-level": "Entry-level",
  "mid-level": "Mid-level",
  "senior-level": "Senior-level",
  executive: "Executive",
};

const EVENT_TYPE_LABELS = {
  results: "Results",
  "earnings-call": "Earnings Call",
  "analyst-meeting": "Analyst Meeting",
  "investor-meeting": "Investor Meeting",
  agm: "Annual General Meeting",
  conference: "Conference",
  webcast: "Webcast",
  other: "Other"
};

const EVENT_TYPE_ICONS = {
  results: Calendar,
  "earnings-call": TrendingUp,
  "analyst-meeting": Users,
  "investor-meeting": Users,
  agm: Users,
  conference: Presentation,
  webcast: Video,
  other: Calendar
};

const EVENT_TYPE_ACCENTS = {
  results: "orange",
  "earnings-call": "solar",
  "analyst-meeting": "pink",
  "investor-meeting": "pink",
  agm: "pink",
  conference: "orange",
  webcast: "solar",
  other: "graphite"
};

const TIMEZONE_ABBREVIATIONS = { "Asia/Kolkata": "IST", "Asia/Calcutta": "IST" };

function formatDisplayDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function formatEventDateTime(startAt, timezone) {
  if (!startAt) return { date: "", time: "" };
  const d = new Date(startAt);
  if (Number.isNaN(d.getTime())) return { date: "", time: "" };
  const tz = timezone || "Asia/Kolkata";
  const date = d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: tz });
  const time = d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", timeZone: tz });
  return { date, time };
}

function attendanceLabel(event) {
  if (event.attendanceMode === "virtual") return event.webcastUrl ? "Webcast" : "Virtual";
  if (event.attendanceMode === "hybrid") return event.venue ? `Hybrid · ${event.venue}` : "Hybrid";
  return event.venue || "In person";
}

function FinancialReportsSection({ page }) {
  const defaultCategory = page?.reportsDefaultCategory || "annual-report";
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [cache, setCache] = useState({});
  const [status, setStatus] = useState({});
  const trackRef = useRef(null);
  const tabRefs = useRef({});

  const limit = page?.reportsItemLimit || 5;

  const loadCategory = (category) => {
    setStatus((prev) => ({ ...prev, [category]: "loading" }));
    getFinancialDocuments(category, limit)
      .then((reports) => {
        setCache((prev) => ({ ...prev, [category]: reports }));
        setStatus((prev) => ({ ...prev, [category]: "loaded" }));
      })
      .catch(() => {
        setStatus((prev) => ({ ...prev, [category]: "error" }));
      });
  };

  useEffect(() => {
    if (!cache[activeCategory] && status[activeCategory] !== "loading") {
      loadCategory(activeCategory);
    }
    if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: "auto" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const handleTabKeyDown = (e, idx) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const nextIdx = e.key === "ArrowRight"
      ? (idx + 1) % REPORT_CATEGORIES.length
      : (idx - 1 + REPORT_CATEGORIES.length) % REPORT_CATEGORIES.length;
    const nextCategory = REPORT_CATEGORIES[nextIdx].key;
    setActiveCategory(nextCategory);
    tabRefs.current[nextCategory]?.focus();
  };

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".reportCard");
    const cardWidth = card ? card.getBoundingClientRect().width + 20 : 300;
    track.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  const activeMeta = REPORT_CATEGORIES.find((c) => c.key === activeCategory);
  const archiveUrl = (page && activeMeta && page[activeMeta.archiveField]) || "/investor-centre/financial-information";
  const reports = cache[activeCategory] || [];
  const currentStatus = status[activeCategory] || "loading";

  return (
    <section className="section financialReportsSection">
      <div style={{ maxWidth: '1312px', margin: '0 auto', padding: '0 64px' }}>
        <div className="reportsHeaderRow">
          <h2>{page?.reportsHeading || "Financial Reports"}</h2>

          <div className="reportsTabList" role="tablist" aria-label="Financial report categories">
            {REPORT_CATEGORIES.map((cat, idx) => (
              <button
                key={cat.key}
                ref={(el) => (tabRefs.current[cat.key] = el)}
                role="tab"
                id={`reports-tab-${cat.key}`}
                aria-selected={activeCategory === cat.key}
                aria-controls={`reports-panel-${cat.key}`}
                tabIndex={activeCategory === cat.key ? 0 : -1}
                className={`reportsTab ${activeCategory === cat.key ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.key)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <Link to={archiveUrl} className="routeLink reportsArchiveLink">
            {activeMeta?.archiveLabel} <ArrowRight size={14} />
          </Link>
        </div>

        <div
          className="reportCarouselContainer"
          role="tabpanel"
          id={`reports-panel-${activeCategory}`}
          aria-labelledby={`reports-tab-${activeCategory}`}
        >
          {currentStatus === "loading" && (
            <div className="reportCarouselTrack">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="reportCard reportCardSkeleton" aria-hidden="true" />
              ))}
            </div>
          )}

          {currentStatus === "error" && (
            <div className="reportsStateMessage">
              <p>Financial documents could not be loaded. Please try again.</p>
              <button className="btnOutline" onClick={() => loadCategory(activeCategory)}>Retry</button>
            </div>
          )}

          {currentStatus === "loaded" && reports.length === 0 && (
            <div className="reportsStateMessage">
              <p>No documents are currently available in this category.</p>
            </div>
          )}

          {currentStatus === "loaded" && reports.length > 0 && (
            <>
              <button className="carouselControlBtn prev" onClick={() => scrollByCard(-1)} aria-label="Previous reports">
                <ChevronLeft size={20} />
              </button>

              <div className="reportCarouselTrack" ref={trackRef}>
                {reports.map((report) => (
                  <div className="reportCard" key={report.id}>
                    <div className="reportCardCover">
                      {report.coverImageUrl ? (
                        <img src={report.coverImageUrl} alt={report.coverImageAlt} />
                      ) : (
                        <div className="reportCardCoverPlaceholder"><FileText size={28} strokeWidth={1.25} /></div>
                      )}
                    </div>
                    <div className="reportCardBody">
                      <span className="reportCardPeriod">
                        {report.financialYear ? `FY ${report.financialYear}` : ""}
                        {report.reportingPeriod ? ` · ${report.reportingPeriod}` : ""}
                      </span>
                      <h3 className="reportCardTitle">{report.title}</h3>
                      <div className="reportCardDate">
                        Published {formatDisplayDate(report.publicationDate)}
                        {report.fileType ? ` · ${report.fileType}` : ""}
                      </div>
                    </div>
                    <a
                      href={report.documentUrl || report.externalUrl || "#"}
                      className="reportCardDownload"
                      download
                      aria-label={`Download ${report.title}${report.fileType ? `, ${report.fileType}` : ""}`}
                    >
                      <Download size={16} />
                      <span>{report.fileSizeLabel ? `Download · ${report.fileSizeLabel}` : "Download"}</span>
                    </a>
                  </div>
                ))}
              </div>

              <button className="carouselControlBtn next" onClick={() => scrollByCard(1)} aria-label="Next reports">
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function NewsAndEventsSection({ page }) {
  const [newsStatus, setNewsStatus] = useState("loading");
  const [news, setNews] = useState([]);
  const [eventsStatus, setEventsStatus] = useState("loading");
  const [events, setEvents] = useState([]);

  const newsLimit = page?.newsItemLimit || 3;
  const eventLimit = page?.eventItemLimit || 3;

  const loadNews = () => {
    setNewsStatus("loading");
    getLatestInvestorNews(newsLimit)
      .then((items) => { setNews(items); setNewsStatus("loaded"); })
      .catch(() => setNewsStatus("error"));
  };

  const loadEvents = () => {
    setEventsStatus("loading");
    getUpcomingInvestorEvents(eventLimit)
      .then((items) => { setEvents(items); setEventsStatus("loaded"); })
      .catch(() => setEventsStatus("error"));
  };

  useEffect(() => { loadNews(); }, []);
  useEffect(() => { loadEvents(); }, []);

  const featured = news.find((n) => n.isFeatured) || news[0];
  const secondary = news.filter((n) => n.id !== featured?.id).slice(0, 2);

  const newsArchiveUrl = page?.newsArchiveUrl || "/investor-centre/announcements";
  const eventsArchiveUrl = page?.eventsArchiveUrl || "/investor-centre/announcements";

  return (
    <section className="section newsEventsSection">
      <div style={{ maxWidth: '1312px', margin: '0 auto', padding: '0 64px' }}>
        <div className="sectionHead" style={{ display: 'block', textAlign: 'center', marginBottom: '48px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <EyebrowSymbol />{page?.newsEventsEyebrow || "News & Events"}
          </div>
          <h2>{page?.newsEventsHeadline || "Stay updated. Stay informed."}</h2>
          <p style={{ maxWidth: '560px', margin: '16px auto 0' }}>
            {page?.newsEventsSupportingCopy || "Key developments and upcoming engagements that drive our journey forward."}
          </p>
        </div>

        <div className="newsEventsLayout">
          {/* Latest News */}
          <div className="newsColumn">
            <div className="newsEventsColHeader">
              <h3>Latest news</h3>
              <Link to={newsArchiveUrl} className="routeLink">View all news <ArrowRight size={14} /></Link>
            </div>

            {newsStatus === "loading" && (
              <div className="newsSkeleton" aria-hidden="true">
                <div className="featuredArticleSkeleton" />
                <div className="newsCompactRowSkeleton" />
                <div className="newsCompactRowSkeleton" />
              </div>
            )}

            {newsStatus === "error" && (
              <div className="reportsStateMessage">
                <p>News could not be loaded. Please try again.</p>
                <button className="btnOutline" onClick={loadNews}>Retry</button>
              </div>
            )}

            {newsStatus === "loaded" && !featured && (
              <div className="reportsStateMessage"><p>No investor news is currently available.</p></div>
            )}

            {newsStatus === "loaded" && featured && (
              <>
                <Link to={newsArchiveUrl} className="featuredArticle">
                  <div className="featuredArticleImage">
                    {featured.imageUrl ? (
                      <img src={featured.imageUrl} alt={featured.imageAlt} />
                    ) : (
                      <div className="featuredArticleImagePlaceholder"><Newspaper size={28} strokeWidth={1.25} /></div>
                    )}
                  </div>
                  <div className="featuredArticleBody">
                    <span className="featuredArticleDate">{formatDisplayDate(featured.publicationDate)}</span>
                    <h4>{featured.title}</h4>
                    <p>{featured.excerpt}</p>
                    <span className="routeLink">Read more <ArrowRight size={14} /></span>
                  </div>
                </Link>

                {secondary.map((item) => (
                  <Link to={newsArchiveUrl} className="newsCompactRow" key={item.id}>
                    <div className="newsCompactThumb">
                      {item.imageUrl ? <img src={item.imageUrl} alt={item.imageAlt} /> : <Newspaper size={16} strokeWidth={1.25} />}
                    </div>
                    <div className="newsCompactBody">
                      <span className="newsCompactDate">{formatDisplayDate(item.publicationDate)}</span>
                      <h5>{item.title}</h5>
                    </div>
                    <ArrowRight size={14} className="newsCompactArrow" />
                  </Link>
                ))}
              </>
            )}
          </div>

          <div className="newsEventsDivider" aria-hidden="true" />

          {/* Upcoming Events */}
          <div className="eventsColumn">
            <div className="newsEventsColHeader">
              <h3>Upcoming events</h3>
              <Link to={eventsArchiveUrl} className="routeLink">View all events <ArrowRight size={14} /></Link>
            </div>

            {eventsStatus === "loading" && (
              <div className="eventsSkeleton" aria-hidden="true">
                <div className="eventTimelineItemSkeleton" />
                <div className="eventTimelineItemSkeleton" />
              </div>
            )}

            {eventsStatus === "error" && (
              <div className="reportsStateMessage">
                <p>Events could not be loaded. Please try again.</p>
                <button className="btnOutline" onClick={loadEvents}>Retry</button>
              </div>
            )}

            {eventsStatus === "loaded" && events.length === 0 && (
              <div className="reportsStateMessage">
                <p>No upcoming investor events have been announced.</p>
                <Link to={eventsArchiveUrl} className="routeLink">View past events <ArrowRight size={14} /></Link>
              </div>
            )}

            {eventsStatus === "loaded" && events.length > 0 && (
              <div className="eventsTimeline">
                {events.map((event) => {
                  const { date, time } = formatEventDateTime(event.startAt, event.timezone);
                  const EventIcon = EVENT_TYPE_ICONS[event.eventType] || Calendar;
                  const accent = EVENT_TYPE_ACCENTS[event.eventType] || "orange";
                  return (
                    <Link
                      to={eventsArchiveUrl}
                      className="eventTimelineItem"
                      key={event.id}
                      aria-label={`${event.title} — ${date}, view details`}
                    >
                      <span className={`eventTimelineDot eventTimelineDot--${accent}`} aria-hidden="true">
                        <EventIcon size={20} />
                      </span>
                      <div className="eventTimelineContent">
                        <span className={`eventTypeTag eventTypeTag--${accent}`}>{EVENT_TYPE_LABELS[event.eventType] || event.eventType}</span>
                        <h4>{event.title}</h4>
                        <div className="eventMeta">
                          <span><Calendar size={13} /> {date}</span>
                          <span><Clock size={13} /> {time} {TIMEZONE_ABBREVIATIONS[event.timezone] || event.timezone}</span>
                          <span>{event.attendanceMode === "virtual" ? <Video size={13} /> : <MapPin size={13} />} {attendanceLabel(event)}</span>
                        </div>
                      </div>
                      <span className="eventTimelineArrow" aria-hidden="true"><ArrowRight size={16} /></span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {page?.subscriptionEnabled && (
          <div className="subscriptionStrip">
            <span className="subscriptionIcon" aria-hidden="true"><Bell size={20} /></span>
            <div className="subscriptionText">
              <h3>{page.subscriptionHeading || "Never miss an update"}</h3>
              <p>{page.subscriptionCopy || "Subscribe to receive the latest investor news and event notifications."}</p>
            </div>
            <a href={page.subscriptionActionUrl || "#"} className="subscriptionBtn">{page.subscriptionActionLabel || "Subscribe for updates"} <ArrowRight size={14} /></a>
          </div>
        )}
      </div>
    </section>
  );
}

function InvestorRelationsNavSection({ showBorder = true }) {
  return (
    <section className="section navSection" style={showBorder ? { borderTop: '1px solid var(--line-soft)', paddingTop: '100px', paddingBottom: '100px' } : {}}>
      <div style={{ maxWidth: '1312px', margin: '0 auto', padding: '0 64px' }}>
        <div className="navSectionIntro">
          <div className="eyebrow"><EyebrowSymbol />Explore Investor Relations</div>
          <h2>Find the information you need.</h2>
          <p className="navSectionIntroCopy">
            Understand Evervie, review financial information, access official disclosures, and browse investor presentations.
          </p>
        </div>

        <div className="navSectionLayout">
          {/* Primary Route Left */}
          <Link to="/investor-centre/investment-overview" className="navRouteCard primaryRoute">
            <span className="routeNum">01</span>
            <div className="routeMain">
              <h3>Investment overview</h3>
              <p>
                Explore Evervie’s healthcare platform, portfolio direction, operating model, strategic priorities, and approach to long-term value creation.
              </p>
              <span className="routeLink">View investment overview <ArrowRight size={14} /></span>
            </div>
          </Link>

          {/* Secondary Routes Right */}
          <div className="secondaryRoutesList">
            {[
              { num: "02", title: "Financial information", path: "/investor-centre/financial-information", desc: "Access financial results, annual reports, shareholding information, statutory filings, and shareholder communications.", cta: "Explore financial information" },
              { num: "03", title: "Announcements", path: "/investor-centre/announcements", desc: "Review stock-exchange filings, board outcomes, shareholder notices, and other material updates.", cta: "View announcements" },
              { num: "04", title: "Investor presentations", path: "/investor-centre/presentations", desc: "Access presentations covering Evervie’s portfolio, business performance, and strategic priorities.", cta: "Browse presentations" }
            ].map((route) => (
              <Link to={route.path} className="navRouteCard secondaryRoute" key={route.num}>
                <div className="routeHeader">
                  <span className="routeNum">{route.num}</span>
                  <div className="routeMain">
                    <h3>{route.title}</h3>
                    <p>{route.desc}</p>
                    <span className="routeLink">{route.cta} <ArrowRight size={14} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InvestorCentre() {
  const [investorPage, setInvestorPage] = useState(null);

  useEffect(() => {
    getInvestorCentrePage()
      .then((data) => setInvestorPage(data))
      .catch(() => setInvestorPage(null));
  }, []);

  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>
        {/* Section 1: Hero Opening Fold */}
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">Investor Centre</span>
            </nav>
            <div className="eyebrow"><EyebrowSymbol />Investor Centre</div>
            <h1>
              Clarity for today.<br />
              Perspective for the long term.
            </h1>
            <p className="wwaHeroBody">
              Access information about Evervie’s healthcare platform, financial performance, regulatory disclosures, and strategic direction.
              <br /><br />
              Evervie is committed to transparent communication, responsible governance, and timely access to information for shareholders and stakeholders.
            </p>
          </div>
          <img src="/Evervie_PPT_Diamond_v1.png" alt="" className="wwaHeroDiamond" aria-hidden="true" />
        </section>

        {/* Section 2: Investment Overview */}
        <section className="section" style={{ padding: '80px 0' }}>
          <div style={{ maxWidth: '1312px', margin: '0 auto', padding: '0 64px' }}>
            <div className="sectionHead" style={{ display: 'block', textAlign: 'center', marginBottom: '48px' }}>
              <div className="eyebrow" style={{ justifyContent: 'center' }}>
                <EyebrowSymbol />Investment Overview
              </div>
              <h2>Focused care,<br />built for meaningful growth.</h2>
              <p style={{ maxWidth: '680px', margin: '16px auto' }}>
                A healthcare platform built to expand access, elevate quality, and deliver enduring impact.
              </p>
            </div>

            {/* Metric Carousel */}
            <InvestorMetricCarousel />

            {/* Portfolio Verticals Row */}
            <div className="portfolioVerticalsRow">
              {[
                { label: "Access", icon: "/circle-1.svg" },
                { label: "Quality", icon: "/star-1.svg" },
                { label: "Scale", icon: "/bloom-1.svg" }
              ].flatMap((item, i) => {
                const element = (
                  <div className="pvRowItem" key={item.label}>
                    <img src={item.icon} alt="" className="pvRowIcon" style={{ width: 26, height: 26, objectFit: 'contain' }} />
                    <span className="pvRowName">{item.label}</span>
                  </div>
                );
                return i > 0 
                  ? [<span className="pvRowDivider" key={`div-${item.label}`} />, element]
                  : [element];
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Investor Navigation */}
        <InvestorRelationsNavSection showBorder={false} />

        {/* Section 4: Portfolio Direction */}
        {/* Focused Platforms (Orange Theme with custom SVGs) */}
        <section className="section">
          <SectionHead
            eyebrow="Specialised Care"
            title="Four pillars of dedicated care platforms"
            copy="Every pathway is designed to unify clinical excellence, operational systems, and patient compassion under a singular orange-themed identity."
          />
          <div className="staggeredCards">
            {verticals.map(([l, t, c], i) => {
              const svgIcon = i === 0 ? "/oncology.svg" : i === 1 ? "/renal-cre.svg" : i === 2 ? "/diagnostics.svg" : "/elder-care.svg";
              const hasBadge = l.includes("Coming Soon");
              const labelText = hasBadge ? l.split(" · ")[0] : l;
              const path = i === 0 ? "/portfolio/oncology" : i === 1 ? "/portfolio/renal-care" : i === 2 ? "/portfolio/diagnostics" : "/portfolio/elder-care";
              return (
                <article key={l} style={{ marginTop: i % 2 ? 40 : 0 }}>
                  <div className="staggeredCardVisual">
                    <div className="staggeredCardGradient tagTone-1">
                      <img src={svgIcon} alt={labelText} className="staggeredCardIcon" style={{ width: 105, height: 105, objectFit: 'contain' }} />
                    </div>
                  </div>
                  <div className="staggeredCardContent">
                    <span className="tag">
                      {labelText}
                      {hasBadge && <span className="badge" style={{ marginLeft: 6, opacity: 0.8, fontSize: 10, background: 'rgba(40,40,40,0.06)', padding: '2px 6px', borderRadius: 4 }}>Coming Soon</span>}
                    </span>
                    <h3>{t}</h3>
                    <p>{c}</p>
                    <Link to={path} className="exploreLink">Explore <ArrowRight size={14} /></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>


        {/* Section 5: Financial Reports */}
        <FinancialReportsSection page={investorPage} />

        {/* Section 6: News and Events */}
        <NewsAndEventsSection page={investorPage} />

        {/* Final Routing Section (supplementary, not part of the brief's section order) */}
        <section className="portfolioClosing">
          <div className="portfolioClosingBox">
            <div className="portfolioClosingIcon">
              <TrendingUp size={24} />
            </div>
            <div className="portfolioClosingText">
              <h3>Looking for a specific investor document?</h3>
              <p>Browse financial information, official announcements, and presentations through the complete Investor Centre archive.</p>
            </div>
            <Link to="/investor-centre/financial-information" className="btnOutline">
              Browse the document archive
            </Link>
          </div>
        </section>
      </main>
    </Frame>
  );
}

// Subpage template
function InvestorSubPage({ title, lead }) {
  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb" style={{ marginBottom: '24px' }}>
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <Link to="/investor-centre">Investor Centre</Link>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">{title}</span>
            </nav>
            <div className="eyebrow">Investor Relations</div>
            <h1>{title}</h1>
            {lead && <p className="wwaHeroBody" style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>{lead}</p>}
          </div>
          <img src="/Evervie_PPT_Diamond_v1.png" alt="" className="wwaHeroDiamond" aria-hidden="true" />
        </section>
        <section className="section innerBody">
          <Placeholder text={`${title} archive details coming soon`} style={{ minHeight: 480 }} />
        </section>
        <InvestorRelationsNavSection />
      </main>
    </Frame>
  );
}

// Subpage instances
function InvestmentOverview() {
  return <InvestorSubPage title="Investment Overview" lead="Explore Evervie’s healthcare platform growth, strategy, and business progress." />;
}

// --------------------------------------------------------------------------
// Financial Information — document library (category nav + archive)
// --------------------------------------------------------------------------

function FinCategoryNav({ categories, activeKey, onSelect }) {
  const [indicatorStyle, setIndicatorStyle] = useState({ transform: 'translateY(0)', height: '0px', opacity: 0 });
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      const activeBtn = listRef.current.querySelector('.finCategoryItem.active');
      if (activeBtn) {
        setIndicatorStyle({
          transform: `translateY(${activeBtn.offsetTop}px)`,
          height: `${activeBtn.offsetHeight}px`,
          opacity: 1
        });
      }
    }
  }, [activeKey, categories]);

  return (
    <div className="finCategoryNav">
      <div className="finCategoryNavIntro">
        <span className="finCategoryNavEyebrow">Financial information</span>
        <h2 className="finCategoryNavTitle">Reports &amp; filings</h2>
      </div>
      <div className="finCategorySelectWrap">
        <label htmlFor="finCategorySelect" className="srOnly">Select document category</label>
        <select
          id="finCategorySelect"
          className="finCategorySelect"
          value={activeKey}
          onChange={(e) => onSelect(e.target.value)}
        >
          {categories.map((cat) => <option key={cat.key} value={cat.key}>{cat.label}</option>)}
        </select>
        <ChevronDown size={16} className="finCategorySelectIcon" aria-hidden="true" />
      </div>
      <div className="finCategoryList" ref={listRef} role="tablist" aria-label="Financial information categories">
        <div className="finCategoryIndicator" style={indicatorStyle} />
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.key === activeKey;
          return (
            <button
              key={cat.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`finCategoryItem ${isActive ? "active" : ""}`}
              onClick={() => onSelect(cat.key)}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FinExpandedRow({ doc }) {
  return (
    <article className="finExpandedRow">
      <div className="finRowCover">
        {doc.coverImageUrl
          ? <img src={doc.coverImageUrl} alt={doc.coverImageAlt || doc.title} />
          : <div className="reportCardCoverPlaceholder"><FileText size={28} strokeWidth={1.25} /></div>}
      </div>
      <div className="finRowBody">
        {(doc.financialYear || doc.reportingPeriod) && (
          <span className="finRowMeta">
            {doc.financialYear ? `FY ${doc.financialYear}` : ""}
            {doc.reportingPeriod ? ` · ${doc.reportingPeriod}` : ""}
          </span>
        )}
        <h3 className="finRowTitle">{doc.title}</h3>
        <div className="finRowDetails">
          {doc.publicationDate && <span>Published {formatDisplayDate(doc.publicationDate)}</span>}
          {doc.fileType && <span>{doc.fileType}</span>}
          {doc.fileSizeLabel && <span>{doc.fileSizeLabel}</span>}
        </div>
      </div>
      <a
        href={doc.documentUrl || doc.externalUrl || "#"}
        className="finRowAction"
        download
        aria-label={`Download ${doc.title}${doc.fileType ? `, ${doc.fileType}` : ""}`}
      >
        <Download size={16} />
        <span>{doc.fileSizeLabel ? `Download · ${doc.fileSizeLabel}` : "Download"}</span>
      </a>
    </article>
  );
}

// Clusters an already-sorted list of docs into contiguous same-financialYear
// groups (docs with no financialYear fall into a single trailing ungrouped
// bucket with year: null). When groupByQuarter is true, each year's docs are
// further split into contiguous same-reportingPeriod sub-groups.
function groupDocsByYear(docs, groupByQuarter) {
  const groups = [];
  for (const doc of docs) {
    const year = doc.financialYear || null;
    let group = groups[groups.length - 1];
    if (!group || group.year !== year) {
      group = { year, docs: [] };
      groups.push(group);
    }
    group.docs.push(doc);
  }
  if (!groupByQuarter) return groups;

  return groups.map((group) => {
    const quarters = [];
    for (const doc of group.docs) {
      const period = doc.reportingPeriod || null;
      let quarter = quarters[quarters.length - 1];
      if (!quarter || quarter.period !== period) {
        quarter = { period, docs: [] };
        quarters.push(quarter);
      }
      quarter.docs.push(doc);
    }
    return { ...group, quarters };
  });
}

function FinCompactRow({ doc }) {
  return (
    <div className="finCompactRow">
      <span className="finCompactTitle">{doc.title}</span>
      <span className="finCompactMeta">{doc.reportingPeriod || ""}</span>
      <span className="finCompactMeta">{doc.fileType || ""}</span>
      <span className="finCompactMeta">{doc.fileSizeLabel || ""}</span>
      <a
        href={doc.documentUrl || doc.externalUrl || "#"}
        className="finCompactDownload"
        download
        aria-label={`Download ${doc.title}${doc.fileType ? `, ${doc.fileType}` : ""}`}
      >
        <Download size={14} />
        <span>Download</span>
      </a>
    </div>
  );
}

function FinDocumentArchive({ category }) {
  const [status, setStatus] = useState("loading");
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [financialYear, setFinancialYear] = useState("all");
  const [reportingPeriod, setReportingPeriod] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(8);

  const load = () => {
    setStatus("loading");
    getFinancialDocuments(category.key, 50)
      .then((docs) => { setDocuments(docs); setStatus("loaded"); })
      .catch(() => setStatus("error"));
  };

  useEffect(() => {
    setSearch("");
    setFinancialYear("all");
    setReportingPeriod("all");
    setSortOrder("newest");
    setVisibleCount(8);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category.key]);

  const financialYears = Array.from(new Set(documents.map((d) => d.financialYear).filter(Boolean))).sort().reverse();
  const reportingPeriods = Array.from(new Set(documents.map((d) => d.reportingPeriod).filter(Boolean))).sort();

  const filtered = documents
    .filter((doc) => {
      if (search && !doc.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (financialYear !== "all" && doc.financialYear !== financialYear) return false;
      if (reportingPeriod !== "all" && doc.reportingPeriod !== reportingPeriod) return false;
      return true;
    })
    .slice()
    .sort((a, b) => {
      const da = new Date(a.publicationDate).getTime() || 0;
      const db = new Date(b.publicationDate).getTime() || 0;
      return sortOrder === "newest" ? db - da : da - db;
    });

  const resetFilters = () => {
    setSearch("");
    setFinancialYear("all");
    setReportingPeriod("all");
  };

  const expandedCount = Math.min(2, filtered.length);
  const expandedItems = filtered.slice(0, expandedCount);
  const compactItemsAll = filtered.slice(expandedCount);
  const compactItems = compactItemsAll.slice(0, visibleCount);
  const hasMore = compactItemsAll.length > compactItems.length;
  const filtersVisible = status === "loaded" && documents.length > 0 && category.filters.length > 0;
  const compactGroups = groupDocsByYear(compactItems, category.key === "quarterly-result");

  return (
    <div className="finDocumentArchive">
      <div className="finArchiveHeader">
        <h2>{category.label}</h2>
        <p className="finArchiveDesc">{category.description}</p>
      </div>

      {filtersVisible && (
        <div className="finFilters">
          {category.filters.includes("search") && (
            <div className="finFilterField finSearchField">
              <Search size={15} aria-hidden="true" />
              <input
                type="text"
                placeholder={`Search ${category.label.toLowerCase()}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label={`Search ${category.label.toLowerCase()}`}
              />
            </div>
          )}
          {category.filters.includes("financialYear") && financialYears.length > 1 && (
            <div className="finFilterField">
              <select value={financialYear} onChange={(e) => setFinancialYear(e.target.value)} aria-label="Filter by financial year">
                <option value="all">All financial years</option>
                {financialYears.map((y) => <option key={y} value={y}>FY {y}</option>)}
              </select>
              <ChevronDown size={14} aria-hidden="true" />
            </div>
          )}
          {category.filters.includes("reportingPeriod") && reportingPeriods.length > 1 && (
            <div className="finFilterField">
              <select value={reportingPeriod} onChange={(e) => setReportingPeriod(e.target.value)} aria-label="Filter by reporting period">
                <option value="all">All periods</option>
                {reportingPeriods.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown size={14} aria-hidden="true" />
            </div>
          )}
          {category.filters.includes("sort") && (
            <div className="finFilterField">
              <SlidersHorizontal size={14} aria-hidden="true" />
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} aria-label="Sort documents">
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          )}
        </div>
      )}

      {status === "loading" && (
        <div className="finLoadingSkeleton" aria-hidden="true">
          {[1, 2, 3].map((i) => <div key={i} className="finSkeletonRow" />)}
        </div>
      )}

      {status === "error" && (
        <div className="finStateMessage finErrorState">
          <AlertCircle size={28} strokeWidth={1.25} />
          <p>We were unable to load these documents.<br />Please try again.</p>
          <button className="btnOutline" onClick={load}>Retry</button>
        </div>
      )}

      {status === "loaded" && documents.length === 0 && (
        <div className="finStateMessage finEmptyState">
          <Inbox size={28} strokeWidth={1.25} />
          <p>No documents are currently available in this category.</p>
        </div>
      )}

      {status === "loaded" && documents.length > 0 && filtered.length === 0 && (
        <div className="finStateMessage finEmptyState">
          <Inbox size={28} strokeWidth={1.25} />
          <p>No documents match the selected search or filters.</p>
          <button className="btnOutline" onClick={resetFilters}>Reset filters</button>
        </div>
      )}

      {status === "loaded" && filtered.length > 0 && (
        <>
          <div className="finExpandedRows">
            {expandedItems.map((doc) => <FinExpandedRow key={doc.id} doc={doc} />)}
          </div>
          {compactGroups.map((group, groupIndex) => (
            <div className="finYearGroup" key={group.year || `no-year-${groupIndex}`}>
              {group.year && <h3 className="finYearHeading">FY {group.year}</h3>}
              {group.quarters ? (
                group.quarters.map((quarter, quarterIndex) => (
                  <div className="finQuarterGroup" key={quarter.period || `no-quarter-${quarterIndex}`}>
                    {quarter.period && <h4 className="finQuarterHeading">{quarter.period}</h4>}
                    <div className="finCompactRows">
                      {quarter.docs.map((doc) => <FinCompactRow key={doc.id} doc={doc} />)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="finCompactRows">
                  {group.docs.map((doc) => <FinCompactRow key={doc.id} doc={doc} />)}
                </div>
              )}
            </div>
          ))}
          {hasMore && (
            <button className="btnOutline finLoadMore" onClick={() => setVisibleCount((n) => n + 8)}>
              Load more reports
            </button>
          )}
        </>
      )}
    </div>
  );
}

function FinancialInformation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedKey = searchParams.get("category");
  const activeCategory = FINANCIAL_INFO_CATEGORIES.find((c) => c.key === requestedKey) || FINANCIAL_INFO_CATEGORIES[0];

  const selectCategory = (key) => {
    setSearchParams(key === FINANCIAL_INFO_CATEGORIES[0].key ? {} : { category: key });
  };

  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb" style={{ marginBottom: '24px' }}>
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <Link to="/investor-centre">Investor Centre</Link>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">Financial Information</span>
            </nav>
            <div className="eyebrow">Investor Relations</div>
            <h1>Financial Information</h1>
            <p className="wwaHeroBody" style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
              Access Evervie's financial results, annual reports, filings, and disclosures.
            </p>
          </div>
          <img src="/Evervie_PPT_Diamond_v1.png" alt="" className="wwaHeroDiamond" aria-hidden="true" />
        </section>
        <section className="innerBody finInfoSection">
          <div className="finInfoLayout">
            <FinCategoryNav categories={FINANCIAL_INFO_CATEGORIES} activeKey={activeCategory.key} onSelect={selectCategory} />
            <FinDocumentArchive key={activeCategory.key} category={activeCategory} />
          </div>
        </section>
        <InvestorRelationsNavSection />
      </main>
    </Frame>
  );
}

// --------------------------------------------------------------------------
// News & Events — featured hero, upcoming events, past events archive
// --------------------------------------------------------------------------

function buildIcsFile(event) {
  const escapeIcs = (str) => (str || "").replace(/[\\;,]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
  const toIcsDate = (iso) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };
  const start = toIcsDate(event.startAt);
  const fallbackEnd = new Date(new Date(event.startAt).getTime() + 60 * 60 * 1000).toISOString();
  const end = toIcsDate(event.endAt || fallbackEnd);
  const location = event.attendanceMode === "virtual" ? (event.webcastUrl || "Virtual") : (event.venue || "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Evervie//Investor Centre//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}@evervie.com`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    event.summary ? `DESCRIPTION:${escapeIcs(event.summary)}` : "",
    location ? `LOCATION:${escapeIcs(location)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

function EventVisualFallback({ eventType, size = "md" }) {
  const Icon = EVENT_TYPE_ICONS[eventType] || Calendar;
  const accent = EVENT_TYPE_ACCENTS[eventType] || "orange";
  return (
    <div className={`neEventFallback neEventFallback--${accent} neEventFallback--${size}`} aria-hidden="true">
      <Icon size={size === "lg" ? 40 : 22} strokeWidth={1.25} />
    </div>
  );
}

function FeaturedHero() {
  const [status, setStatus] = useState("loading");
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const load = () => {
    setStatus("loading");
    Promise.all([getFeaturedNews(6), getFeaturedPastEvents(6)])
      .then(([news, events]) => {
        const merged = [
          ...news.map((n) => ({ kind: "news", date: n.publicationDate, data: n })),
          ...events.map((e) => ({ kind: "event", date: e.startAt, data: e })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));
        setItems(merged);
        setActiveIndex(0);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => { load(); }, []);

  if (status === "loading") {
    return (
      <section className="neHero" aria-hidden="true">
        <div className="neHeroSkeleton" />
      </section>
    );
  }

  if (status === "error" || items.length === 0) return null;

  const active = items[activeIndex];
  const goTo = (dir) => setActiveIndex((idx) => (idx + dir + items.length) % items.length);

  const isNews = active.kind === "news";
  const item = active.data;
  const dateLabel = formatDisplayDate(isNews ? item.publicationDate : item.startAt);
  const categoryLabel = isNews ? (item.category || "News") : (EVENT_TYPE_LABELS[item.eventType] || item.eventType);
  const summary = isNews ? item.excerpt : item.summary;
  const actionUrl = isNews ? item.externalUrl : (item.webcastUrl || item.registrationUrl);
  const actionLabel = isNews ? "Read more" : (item.webcastUrl ? "Watch recording" : "View details");

  return (
    <section className="neHero">
      <div className="neHeroLeft">
        <h2 className="neHeroHeadline">Past events & webinars:<br />releases</h2>
        <p className="neHeroIntro">
          From quarterly earnings calls to strategy deep-dives, our past events offer valuable perspectives into Evervie’s direction and performance. Relive the sessions through on-demand videos, presentation materials, and concise summaries.
        </p>
        {items.length > 1 && (
          <div className="neCarouselControls">
            <button className="carouselControlBtn prev" onClick={() => goTo(-1)} aria-label="Previous featured item"><ChevronLeft size={18} /></button>
            <button className="carouselControlBtn next" onClick={() => goTo(1)} aria-label="Next featured item"><ChevronRight size={18} /></button>
          </div>
        )}
      </div>
      <div className="neHeroRight">
        <p className="neHeroRightIntro">Catch up on recent investor events, keynote presentations, and live webinars. Explore highlights, watch recordings, and revisit key discussions.</p>
        <div className="neFeaturedPanel">
          {isNews && item.imageUrl ? (
            <img src={item.imageUrl} alt={item.imageAlt || item.title} />
          ) : (
            <div className="neFeaturedFallback"><EventVisualFallback eventType={isNews ? undefined : item.eventType} size="lg" /></div>
          )}
          <div className="neFeaturedOverlay">
            <span className="neFeaturedCategory">{categoryLabel}</span>
            <h3>{item.title}</h3>
            {summary && <p>{summary}</p>}
            <div className="neFeaturedMeta">
              <span>{dateLabel}</span>
              {actionUrl && (
                <a href={actionUrl} target="_blank" rel="noopener noreferrer" className="neFeaturedAction">
                  {actionLabel} <ArrowRight size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UpcomingEventsSection() {
  const [status, setStatus] = useState("loading");
  const [events, setEvents] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const load = () => {
    setStatus("loading");
    getUpcomingInvestorEvents(50)
      .then((items) => { setEvents(items); setStatus("loaded"); })
      .catch(() => setStatus("error"));
  };

  useEffect(() => { load(); }, []);

  const visible = expanded ? events : events.slice(0, 3);

  return (
    <section className="neUpcomingSection">
      <div className="neSectionHeader">
        <h2>Upcoming events & webinars</h2>
      </div>

      {status === "loading" && (
        <div className="neUpcomingRow" aria-hidden="true">
          {[1, 2, 3].map((i) => <div key={i} className="neUpcomingCard neUpcomingCardSkeleton" />)}
        </div>
      )}

      {status === "error" && (
        <div className="finStateMessage finErrorState">
          <AlertCircle size={22} />
          <p>Events could not be loaded. Please try again.</p>
          <button className="btnOutline" onClick={load}>Retry</button>
        </div>
      )}

      {status === "loaded" && events.length === 0 && (
        <div className="finStateMessage finEmptyState">
          <Inbox size={22} />
          <p>No upcoming investor events have been announced.</p>
        </div>
      )}

      {status === "loaded" && events.length > 0 && (
        <>
          <div className="neUpcomingRow">
            {visible.map((event) => {
              const { date, time } = formatEventDateTime(event.startAt, event.timezone);
              const EventIcon = EVENT_TYPE_ICONS[event.eventType] || Calendar;
              const accent = EVENT_TYPE_ACCENTS[event.eventType] || "orange";
              const linkUrl = event.webcastUrl || event.registrationUrl;
              return (
                <div className="neUpcomingCard" key={event.id}>
                  <div className={`neUpcomingImage neUpcomingImage--${accent}`}>
                    <EventIcon size={28} strokeWidth={1.25} />
                    <div className="neUpcomingDateOverlay">
                      <span>{date}</span>
                      <span>{time} {TIMEZONE_ABBREVIATIONS[event.timezone] || event.timezone}</span>
                    </div>
                  </div>
                  <div className="neUpcomingBody">
                    <span className={`eventTypeTag eventTypeTag--${accent}`}>{EVENT_TYPE_LABELS[event.eventType] || event.eventType}</span>
                    <h3>{event.title}</h3>
                    {event.summary && <p>{event.summary}</p>}
                  </div>
                  <div className="neUpcomingActions">
                    <a className="neCalendarBtn" href={buildIcsFile(event)} download={`${event.slug || "event"}.ics`}>
                      <CalendarPlus size={15} /> Add to calendar
                    </a>
                    {linkUrl && (
                      <a className="neUpcomingArrow" href={linkUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open link for ${event.title}`}>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {events.length > 3 && (
            <div className="neExploreCalendarWrap">
              <button className="btnOutline neExploreCalendarBtn" onClick={() => setExpanded((v) => !v)}>
                {expanded ? "Show fewer events" : "Explore Full Calendar"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function PastEventRow({ event }) {
  const EventIcon = EVENT_TYPE_ICONS[event.eventType] || Calendar;
  const accent = EVENT_TYPE_ACCENTS[event.eventType] || "orange";
  const doc = event.relatedDocument;
  const docUrl = doc?.documentUrl || doc?.externalUrl;

  return (
    <div className="nePastRow">
      <div className={`neEventFallback neEventFallback--${accent}`} aria-hidden="true">
        <EventIcon size={22} strokeWidth={1.25} />
      </div>
      <div className="nePastRowInfo">
        <span className={`eventTypeTag eventTypeTag--${accent}`}>{EVENT_TYPE_LABELS[event.eventType] || event.eventType}</span>
        <h3>{event.title}</h3>
        <span className="nePastRowDate">{formatDisplayDate(event.startAt)}</span>
        {event.summary && <p className="nePastRowSummary">{event.summary}</p>}
      </div>
      <div className="nePastRowResources">
        {event.webcastUrl && (
          <a href={event.webcastUrl} target="_blank" rel="noopener noreferrer" className="routeLink">
            <Video size={14} /> Watch recording
          </a>
        )}
        {docUrl && (
          <a href={docUrl} target="_blank" rel="noopener noreferrer" className="routeLink">
            <FileText size={14} /> View presentation
          </a>
        )}
      </div>
    </div>
  );
}

function PastEventsLibrary() {
  const [status, setStatus] = useState("loading");
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ eventType: "", year: "", search: "" });
  const [searchInput, setSearchInput] = useState("");

  const load = (targetPage, activeFilters, append) => {
    setStatus("loading");
    getPastInvestorEvents({ page: targetPage, pageSize: 8, ...activeFilters })
      .then(({ items: newItems, pagination: meta }) => {
        setItems((prev) => (append ? [...prev, ...newItems] : newItems));
        setPagination(meta);
        setPage(targetPage);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => { load(1, filters, false); }, [filters]);

  useEffect(() => {
    const t = setTimeout(() => {
      setFilters((prev) => (prev.search === searchInput ? prev : { ...prev, search: searchInput }));
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const resetFilters = () => {
    setSearchInput("");
    setFilters({ eventType: "", year: "", search: "" });
  };

  const hasActiveFilters = !!(filters.eventType || filters.year || filters.search);
  const hasMore = pagination && page < pagination.pageCount;
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - i);

  return (
    <section className="nePastLibrary">
      <div className="nePastIntro">
        <h2>Past events &<br />webinar library</h2>
        <p>Watch recordings and review presentation materials from previous investor interactions.</p>
      </div>

      <div className="nePastArchive">
        <div className="finFilters">
          <div className="finFilterField">
            <select value={filters.eventType} onChange={(e) => setFilters((prev) => ({ ...prev, eventType: e.target.value }))} aria-label="Filter by event type">
              <option value="">All event types</option>
              {Object.entries(EVENT_TYPE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </div>
          <div className="finFilterField">
            <select value={filters.year} onChange={(e) => setFilters((prev) => ({ ...prev, year: e.target.value }))} aria-label="Filter by year">
              <option value="">All years</option>
              {yearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </div>
          <div className="finFilterField finSearchField">
            <Search size={15} aria-hidden="true" />
            <input type="text" placeholder="Search events" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} aria-label="Search past events" />
          </div>
        </div>

        {status === "loading" && page === 1 && (
          <div className="finLoadingSkeleton" aria-hidden="true">
            {[1, 2, 3].map((i) => <div key={i} className="finSkeletonRow" />)}
          </div>
        )}

        {status === "error" && (
          <div className="finStateMessage finErrorState">
            <AlertCircle size={22} />
            <p>We were unable to load these events. Please try again.</p>
            <button className="btnOutline" onClick={() => load(1, filters, false)}>Retry</button>
          </div>
        )}

        {status === "loaded" && items.length === 0 && hasActiveFilters && (
          <div className="finStateMessage finEmptyState">
            <Inbox size={22} />
            <p>No events match the selected search or filters.</p>
            <button className="btnOutline" onClick={resetFilters}>Reset filters</button>
          </div>
        )}

        {status === "loaded" && items.length === 0 && !hasActiveFilters && (
          <div className="finStateMessage finEmptyState">
            <Inbox size={22} />
            <p>No past events are currently available.</p>
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className="nePastRows">
              {items.map((event) => <PastEventRow event={event} key={event.id} />)}
            </div>

            {hasMore && (
              <div className="finLoadMore">
                <button className="btnOutline" onClick={() => load(page + 1, filters, true)} disabled={status === "loading"}>
                  {status === "loading" ? "Loading…" : "Load more events"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function StayInformedBand({ page }) {
  return (
    <div className="subscriptionStrip">
      <span className="subscriptionIcon" aria-hidden="true"><Bell size={20} /></span>
      <div className="subscriptionText">
        <h3>{page?.subscriptionHeading || "Never miss an update"}</h3>
        <p>{page?.subscriptionCopy || "Subscribe to receive investor updates, event invitations, presentations, and official announcements."}</p>
      </div>
      <a href={page?.subscriptionActionUrl || "#"} className="subscriptionBtn">{page?.subscriptionActionLabel || "Subscribe for updates"} <ArrowRight size={14} /></a>
    </div>
  );
}

function NewsAndEvents() {
  const [investorPage, setInvestorPage] = useState(null);

  useEffect(() => {
    getInvestorCentrePage()
      .then((data) => setInvestorPage(data))
      .catch(() => setInvestorPage(null));
  }, []);

  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb" style={{ marginBottom: '24px' }}>
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <Link to="/investor-centre">Investor Centre</Link>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">News & Events</span>
            </nav>
            <div className="eyebrow"><EyebrowSymbol />Investor Relations</div>
            <h1>News & Events</h1>
            <p className="wwaHeroBody" style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
              Stay current with Evervie's investor events, webinars, and official announcements.
            </p>
          </div>
          <img src="/Evervie_PPT_Diamond_v1.png" alt="" className="wwaHeroDiamond" aria-hidden="true" />
        </section>
        <section className="innerBody neInfoSection">
          <FeaturedHero />
          <UpcomingEventsSection />
          <PastEventsLibrary />
          <StayInformedBand page={investorPage} />
        </section>
        <InvestorRelationsNavSection />
      </main>
    </Frame>
  );
}

function InvestorPresentations() {
  return <InvestorSubPage title="Investor Presentations" lead="Browse business presentations, financial performance overview decks, and strategy documents." />;
}

// --------------------------------------------------------------------------
// News & Insights — editorial hero, featured insights, article archive, detail
// --------------------------------------------------------------------------

function EditorialHero({ searchInput, onSearchChange }) {
  const [status, setStatus] = useState("loading");
  const [hero, setHero] = useState(null);

  useEffect(() => {
    setStatus("loading");
    getHeroArticle()
      .then((item) => { setHero(item); setStatus("loaded"); })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <section className="neHero" aria-hidden="true">
        <div className="neHeroSkeleton" />
      </section>
    );
  }

  if (status === "error" || !hero) return null;

  const categoryLabel = NEWS_INSIGHTS_CATEGORY_LABELS[hero.category] || hero.category;

  return (
    <section className="neHero">
      <div className="neHeroLeft">
        <h2 className="neHeroHeadline">Perspectives that<br />shape our thinking</h2>
        <p className="neHeroIntro">
          Editorial coverage of the trends, decisions, and ideas shaping healthcare access and Evervie's platforms.
        </p>
        <div className="newsIntroSearch">
          <Search size={16} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search articles, topics, authors…"
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search News & Insights"
          />
        </div>
      </div>
      <div className="neHeroRight">
        <p className="neHeroRightIntro">{hero.subtitle || "Our latest editorial pick."}</p>
        <Link to={`/news-insights/${hero.slug}`} className="neFeaturedPanel">
          {hero.imageUrl ? (
            <img src={hero.imageUrl} alt={hero.imageAlt || hero.title} />
          ) : (
            <div className="neFeaturedFallback"><Newspaper size={40} strokeWidth={1.25} /></div>
          )}
          <div className="neFeaturedOverlay">
            <span className="neFeaturedCategory">{categoryLabel}</span>
            <h3>{hero.title}</h3>
            {hero.subtitle && <p>{hero.subtitle}</p>}
            <div className="neFeaturedMeta">
              <span>{formatDisplayDate(hero.publicationDate)}</span>
              <span className="neFeaturedAction">Read more <ArrowRight size={14} /></span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

function FeaturedInsightCard({ post }) {
  const categoryLabel = NEWS_INSIGHTS_CATEGORY_LABELS[post.category] || post.category;
  return (
    <Link to={`/news-insights/${post.slug}`} className="newsFeaturedCard">
      <div className="newsFeaturedCardMedia">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.imageAlt || post.title} />
        ) : (
          <div className="newsFeaturedCardFallback"><Newspaper size={28} strokeWidth={1.25} /></div>
        )}
      </div>
      <div className="newsFeaturedCardBody">
        <span className="newsFeaturedCardCategory">{categoryLabel}</span>
        <h3>{post.title}</h3>
        {post.subtitle && <p>{post.subtitle}</p>}
        <div className="newsFeaturedCardMeta">
          <span>{formatDisplayDate(post.publicationDate)}</span>
          {post.readingTimeLabel && <span>{post.readingTimeLabel}</span>}
        </div>
      </div>
    </Link>
  );
}

function FeaturedInsights() {
  const [status, setStatus] = useState("loading");
  const [items, setItems] = useState([]);

  useEffect(() => {
    setStatus("loading");
    getFeaturedInsights(3)
      .then((posts) => { setItems(posts); setStatus("loaded"); })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <section className="newsFeaturedSection" aria-hidden="true">
        <div className="newsFeaturedGrid">
          {[1, 2, 3].map((i) => <div key={i} className="newsFeaturedCard newsFeaturedCardSkeleton" />)}
        </div>
      </section>
    );
  }

  if (status === "error" || items.length === 0) return null;

  return (
    <section className="newsFeaturedSection">
      <div className="neSectionHeader">
        <h2>Featured Insights</h2>
      </div>
      <div className="newsFeaturedGrid">
        {items.map((post) => <FeaturedInsightCard post={post} key={post.id} />)}
      </div>
    </section>
  );
}

function ArticleRow({ post }) {
  const categoryLabel = NEWS_INSIGHTS_CATEGORY_LABELS[post.category] || post.category;
  return (
    <Link to={`/news-insights/${post.slug}`} className="newsArticleRow">
      <div className="newsRowMedia">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.imageAlt || post.title} />
        ) : (
          <div className="newsRowFallback"><Newspaper size={22} strokeWidth={1.25} /></div>
        )}
      </div>
      <div className="newsRowBody">
        <span className="newsRowCategory">{categoryLabel}</span>
        <h3 className="newsRowTitle">{post.title}</h3>
        {post.subtitle && <p className="newsRowSummary">{post.subtitle}</p>}
        <div className="newsRowMeta">
          {post.author && <span>{post.author}</span>}
          <span>{formatDisplayDate(post.publicationDate)}</span>
          {post.readingTimeLabel && <span>{post.readingTimeLabel}</span>}
        </div>
      </div>
      <ArrowRight size={16} className="newsRowArrow" aria-hidden="true" />
    </Link>
  );
}

function ArticleArchive({ category, search, activeCategories, onCategoryChange, onResetFilters }) {
  const [status, setStatus] = useState("loading");
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  const load = (targetPage, append) => {
    setStatus("loading");
    getBlogPosts({ page: targetPage, pageSize: 8, category, search })
      .then(({ items: newItems, pagination: meta }) => {
        setItems((prev) => (append ? [...prev, ...newItems] : newItems));
        setPagination(meta);
        setPage(targetPage);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => { load(1, false); }, [category, search]);

  const hasActiveFilters = !!(category || search);
  const hasMore = pagination && page < pagination.pageCount;
  const visibleCategories = NEWS_INSIGHTS_CATEGORIES.filter((c) => activeCategories?.has(c.key));

  return (
    <div className="newsArchive">
      <div className="neSectionHeader">
        <h2>Latest Articles</h2>
      </div>

      {visibleCategories.length > 0 && (
        <div className="newsTopicChips">
          <button className={`newsTopicChip${!category ? " newsTopicChipActive" : ""}`} onClick={() => onCategoryChange("")}>
            All
          </button>
          {visibleCategories.map((c) => (
            <button
              key={c.key}
              className={`newsTopicChip${category === c.key ? " newsTopicChipActive" : ""}`}
              onClick={() => onCategoryChange(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {status === "loading" && page === 1 && (
        <div className="finLoadingSkeleton" aria-hidden="true">
          {[1, 2, 3].map((i) => <div key={i} className="finSkeletonRow" />)}
        </div>
      )}

      {status === "error" && (
        <div className="finStateMessage finErrorState">
          <AlertCircle size={22} />
          <p>We were unable to load these articles. Please try again.</p>
          <button className="btnOutline" onClick={() => load(1, false)}>Retry</button>
        </div>
      )}

      {status === "loaded" && items.length === 0 && hasActiveFilters && (
        <div className="finStateMessage finEmptyState">
          <Inbox size={22} />
          <p>No articles match the selected search or filters.</p>
          <button className="btnOutline" onClick={onResetFilters}>Reset filters</button>
        </div>
      )}

      {status === "loaded" && items.length === 0 && !hasActiveFilters && (
        <div className="finStateMessage finEmptyState">
          <Inbox size={22} />
          <p>No articles are currently available.</p>
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="newsArticleRows">
            {items.map((post) => <ArticleRow post={post} key={post.id} />)}
          </div>

          {hasMore && (
            <div className="finLoadMore">
              <button className="btnOutline" onClick={() => load(page + 1, true)} disabled={status === "loading"}>
                {status === "loading" ? "Loading…" : "Load more articles"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ContentSidebar({ facets, onTopicClick }) {
  return (
    <aside className="newsSidebar">
      <div className="newsSidebarModule">
        <h4>Popular topics</h4>
        <div className="newsSidebarTopics">
          {facets.popularTopics.length > 0 ? (
            facets.popularTopics.map((topic) => (
              <button key={topic.name} className="newsTopicTag" onClick={() => onTopicClick(topic.name)}>
                {topic.name}
              </button>
            ))
          ) : (
            <p className="newsSidebarEmpty">Topics will appear here as articles are published.</p>
          )}
        </div>
      </div>
      <div className="newsSidebarModule">
        <h4>About news & insights</h4>
        <p>
          Editorial perspectives, market context, and company updates from across Evervie's care platforms —
          written for investors, partners, and anyone following the future of specialised healthcare.
        </p>
        <Link to="/about/who-we-are" className="routeLink">Learn more about Evervie <ArrowRight size={14} /></Link>
      </div>
      <div className="newsSidebarModule newsSidebarSubscribe">
        <h4>Stay updated</h4>
        <p>Get new articles and insights delivered to your inbox.</p>
        <form className="newsSidebarForm" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" aria-label="Email address" required />
          <button type="submit" className="btn">Subscribe</button>
        </form>
      </div>
    </aside>
  );
}

function NewsletterBand() {
  return (
    <section className="newsNewsletterBand">
      <div className="newsNewsletterContent">
        <Mail size={22} aria-hidden="true" />
        <div>
          <h3>Never miss an insight</h3>
          <p>Subscribe to receive new articles, market perspectives, and company updates from Evervie.</p>
        </div>
      </div>
      <form className="newsNewsletterForm" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="Enter your email address" aria-label="Email address" required />
        <button type="submit" className="btn">Subscribe</button>
      </form>
    </section>
  );
}

function NewsInsights() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const search = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(search);
  const [facets, setFacets] = useState({ activeCategories: new Set(), popularTopics: [] });

  useEffect(() => {
    getBlogFacets().then(setFacets).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (searchInput) next.set("q", searchInput); else next.delete("q");
        return next;
      }, { replace: true });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const selectCategory = (key) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (key) next.set("category", key); else next.delete("category");
      return next;
    });
  };

  const resetFilters = () => {
    setSearchInput("");
    setSearchParams({});
  };

  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb" style={{ marginBottom: '24px' }}>
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">News & Insights</span>
            </nav>
            <div className="eyebrow"><EyebrowSymbol />Newsroom</div>
            <h1>News & Insights</h1>
            <p className="wwaHeroBody" style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
              Perspectives, market context, and updates from across Evervie's care platforms.
            </p>
          </div>
          <img src="/Evervie_PPT_Diamond_v1.png" alt="" className="wwaHeroDiamond" aria-hidden="true" />
        </section>
        <section className="innerBody newsInsightsSection">
          <EditorialHero searchInput={searchInput} onSearchChange={setSearchInput} />
          <FeaturedInsights />
          <div className="newsLatestLayout">
            <ArticleArchive
              category={category}
              search={search}
              activeCategories={facets.activeCategories}
              onCategoryChange={selectCategory}
              onResetFilters={resetFilters}
            />
            <ContentSidebar facets={facets} onTopicClick={setSearchInput} />
          </div>
          <NewsletterBand />
        </section>
      </main>
    </Frame>
  );
}

function ArticleDetail() {
  const { slug } = useParams();
  const [status, setStatus] = useState("loading");
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [siblings, setSiblings] = useState([]);

  useEffect(() => {
    setStatus("loading");
    setPost(null);
    setRelated([]);
    setSiblings([]);
    getBlogPostBySlug(slug)
      .then((item) => {
        if (!item) { setStatus("notfound"); return; }
        setPost(item);
        setStatus("loaded");
        window.scrollTo(0, 0);
        getRelatedArticles(item, 3).then(setRelated).catch(() => setRelated([]));
        getBlogPosts({ category: item.category, pageSize: 50 }).then(({ items }) => setSiblings(items)).catch(() => setSiblings([]));
      })
      .catch(() => setStatus("error"));
  }, [slug]);

  if (status === "loading") {
    return (
      <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
        <main>
          <section className="innerBody">
            <div className="finLoadingSkeleton" aria-hidden="true"><div className="finSkeletonRow" /></div>
          </section>
        </main>
      </Frame>
    );
  }

  if (status === "error" || status === "notfound" || !post) {
    return (
      <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
        <main>
          <section className="innerBody">
            <div className="finStateMessage finEmptyState">
              <Inbox size={22} />
              <p>This article could not be found.</p>
              <Link to="/news-insights" className="btnOutline">Back to News & Insights</Link>
            </div>
          </section>
        </main>
      </Frame>
    );
  }

  const categoryLabel = NEWS_INSIGHTS_CATEGORY_LABELS[post.category] || post.category;
  const idx = siblings.findIndex((s) => s.id === post.id);
  const prevArticle = idx > 0 ? siblings[idx - 1] : null;
  const nextArticle = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb" style={{ marginBottom: '24px' }}>
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <Link to="/news-insights">News & Insights</Link>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">{post.title}</span>
            </nav>
            <div className="eyebrow"><EyebrowSymbol />{categoryLabel}</div>
            <h1>{post.title}</h1>
            {post.subtitle && <p className="wwaHeroBody" style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>{post.subtitle}</p>}
            <div className="newsArticleByline">
              {post.author && <span>{post.author}{post.authorDesignation ? `, ${post.authorDesignation}` : ""}</span>}
              <span>{formatDisplayDate(post.publicationDate)}</span>
              {post.readingTimeLabel && <span>{post.readingTimeLabel}</span>}
            </div>
          </div>
          <img src="/Evervie_PPT_Diamond_v1.png" alt="" className="wwaHeroDiamond" aria-hidden="true" />
        </section>

        <section className="innerBody newsArticleDetail">
          {post.imageUrl && (
            <div className="newsArticleHeroImage">
              <img src={post.imageUrl} alt={post.imageAlt || post.title} />
            </div>
          )}

          <article className="newsArticleBody">
            <ReactMarkdown>{post.body}</ReactMarkdown>

            {post.sourceReferences && (
              <div className="newsArticleSources">
                <h4>Sources & references</h4>
                <p>{post.sourceReferences}</p>
              </div>
            )}

            <div className="newsArticleShare">
              <span>Share this article</span>
              <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`} aria-label="Share via email">
                <Mail size={16} />
              </a>
              <button type="button" onClick={() => navigator.clipboard?.writeText(shareUrl)} aria-label="Copy article link">
                <ExternalLink size={16} />
              </button>
            </div>

            {(prevArticle || nextArticle) && (
              <div className="newsArticlePrevNext">
                {prevArticle ? (
                  <Link to={`/news-insights/${prevArticle.slug}`} className="newsPrevNextLink newsPrevLink">
                    <ChevronLeft size={16} />
                    <div><span>Previous</span><p>{prevArticle.title}</p></div>
                  </Link>
                ) : <span />}
                {nextArticle && (
                  <Link to={`/news-insights/${nextArticle.slug}`} className="newsPrevNextLink newsNextLink">
                    <div><span>Next</span><p>{nextArticle.title}</p></div>
                    <ChevronRight size={16} />
                  </Link>
                )}
              </div>
            )}
          </article>

          {related.length > 0 && (
            <div className="newsRelatedSection">
              <div className="neSectionHeader"><h2>Related articles</h2></div>
              <div className="newsRelatedGrid">
                {related.map((item) => <FeaturedInsightCard post={item} key={item.id} />)}
              </div>
            </div>
          )}
        </section>

        <NewsletterBand />
      </main>
    </Frame>
  );
}

// Careers — hero, opportunities, open positions, job detail
// --------------------------------------------------------------------------

const CAREER_OPPORTUNITY_MODULES = [
  { icon: Sparkles, title: "Innovative Environment", copy: "Work on healthcare challenges that matter, with the freedom to bring new ideas forward." },
  { icon: UsersRound, title: "Collaborative Culture", copy: "Join a team that values open thinking, mutual respect, and shared ownership of outcomes." },
  { icon: TrendingUp, title: "Career Growth", copy: "Build your career alongside a platform that is scaling across multiple healthcare verticals." },
  { icon: Globe2, title: "Global Impact", copy: "Contribute to work that is shaping access to care for communities across India." },
];

function CareersHero() {
  const scrollToPositions = () => {
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.focus({ preventScroll: true });
    }
  };

  return (
    <section className="wwaHero careersHero">
      <div className="wwaHeroLeft">
        <nav className="wwaBreadcrumb" aria-label="breadcrumb" style={{ marginBottom: '24px' }}>
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <span className="wwaBreadActive">Careers</span>
        </nav>
        <div className="eyebrow"><EyebrowSymbol />Careers</div>
        <h1>Building a healthier<br />tomorrow, together</h1>
        <p className="wwaHeroBody" style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
          At Evervie, we are creating lasting impact across healthcare. Join a team committed to innovation, collaboration, and better outcomes for the communities we serve.
        </p>
        <button type="button" className="btn" onClick={scrollToPositions} style={{ marginTop: '28px' }}>
          Explore opportunities <ArrowRight size={16} />
        </button>
      </div>
      <img src="/Evervie_PPT_Diamond_v1.png" alt="" className="wwaHeroDiamond" aria-hidden="true" />
    </section>
  );
}

function CareerOpportunities() {
  return (
    <section className="careerOppSection">
      <div className="neSectionHeader">
        <h2>Opportunities to make a difference</h2>
        <p>A few reasons our team chooses to build their careers at Evervie.</p>
      </div>
      <div className="careerOppGrid">
        {CAREER_OPPORTUNITY_MODULES.map(({ icon: Icon, title, copy }) => (
          <div className="careerOppCard" key={title}>
            <Icon size={26} strokeWidth={1.5} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function JobRow({ job }) {
  const departmentLabel = CAREER_DEPARTMENT_LABELS[job.department] || job.department;
  const employmentLabel = EMPLOYMENT_TYPE_LABELS[job.employmentType] || job.employmentType;
  return (
    <Link to={`/careers/${job.slug}`} className="careersJobRow">
      <span className="careersJobIcon"><Briefcase size={18} strokeWidth={1.5} /></span>
      <span className="careersJobBody">
        <span className="careersJobTitle">{job.title}</span>
        <span className="careersJobMeta">
          <span>{departmentLabel}</span>
          <span>{job.location}</span>
          <span>{employmentLabel}</span>
        </span>
      </span>
      <ArrowRight size={16} className="careersJobArrow" aria-hidden="true" />
    </Link>
  );
}

function OpenPositionsSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const department = searchParams.get("department") || "";
  const location = searchParams.get("location") || "";
  const search = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(search);
  const [facets, setFacets] = useState({ activeDepartments: new Set(), activeLocations: new Set() });
  const [status, setStatus] = useState("loading");
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCareerFacets().then(setFacets).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (searchInput) next.set("q", searchInput); else next.delete("q");
        return next;
      }, { replace: true });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const load = (targetPage, append) => {
    setStatus("loading");
    getCareerOpenings({ page: targetPage, pageSize: 8, department, location, search })
      .then(({ items: newItems, pagination: meta }) => {
        setItems((prev) => (append ? [...prev, ...newItems] : newItems));
        setPagination(meta);
        setPage(targetPage);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => { load(1, false); }, [department, location, search]);

  const selectDepartment = (key) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (key) next.set("department", key); else next.delete("department");
      return next;
    });
  };

  const selectLocation = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set("location", value); else next.delete("location");
      return next;
    });
  };

  const resetFilters = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const hasActiveFilters = !!(department || location || search);
  const hasMore = pagination && page < pagination.pageCount;
  const visibleDepartments = CAREER_DEPARTMENTS.filter((d) => facets.activeDepartments?.has(d.key));
  const locations = Array.from(facets.activeLocations || []).sort();

  return (
    <section id="open-positions" tabIndex={-1} className="careersOpenPositions">
      <div className="neSectionHeader">
        <h2>Open positions</h2>
        <p>Explore current opportunities and find your next chapter at Evervie.</p>
      </div>

      <div className="finFilters">
        {visibleDepartments.length > 0 && (
          <div className="finFilterField">
            <select value={department} onChange={(e) => selectDepartment(e.target.value)} aria-label="Filter by department">
              <option value="">All departments</option>
              {visibleDepartments.map((d) => <option key={d.key} value={d.key}>{d.label}</option>)}
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </div>
        )}
        {locations.length > 0 && (
          <div className="finFilterField">
            <select value={location} onChange={(e) => selectLocation(e.target.value)} aria-label="Filter by location">
              <option value="">All locations</option>
              {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </div>
        )}
        <div className="finFilterField finSearchField">
          <Search size={15} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search open positions"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search open positions"
          />
        </div>
      </div>

      {status === "loading" && page === 1 && (
        <div className="finLoadingSkeleton" aria-hidden="true">
          {[1, 2, 3].map((i) => <div key={i} className="finSkeletonRow" />)}
        </div>
      )}

      {status === "error" && (
        <div className="finStateMessage finErrorState">
          <AlertCircle size={28} strokeWidth={1.25} />
          <p>We were unable to load open positions.<br />Please try again.</p>
          <button className="btnOutline" onClick={() => load(1, false)}>Retry</button>
        </div>
      )}

      {status === "loaded" && items.length === 0 && !hasActiveFilters && (
        <div className="finStateMessage finEmptyState">
          <Inbox size={28} strokeWidth={1.25} />
          <p>There are currently no open positions.<br />You are welcome to share your profile with our talent team for future opportunities.</p>
          <a className="btnOutline" href="mailto:careers@evervie.com?subject=Profile%20Submission">Submit Your Profile</a>
        </div>
      )}

      {status === "loaded" && items.length === 0 && hasActiveFilters && (
        <div className="finStateMessage finEmptyState">
          <Inbox size={28} strokeWidth={1.25} />
          <p>No positions match the selected search or filters.</p>
          <button className="btnOutline" onClick={resetFilters}>Reset filters</button>
        </div>
      )}

      {status === "loaded" && items.length > 0 && (
        <>
          <div className="careersJobList">
            {items.map((job) => <JobRow key={job.id} job={job} />)}
          </div>
          {hasMore && (
            <div className="finLoadMore">
              <button className="btnOutline" onClick={() => load(page + 1, true)} disabled={status === "loading"}>
                {status === "loading" ? "Loading…" : "Load more positions"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function RecruitmentCTA() {
  return (
    <section className="careersCTA">
      <div className="careersCTAContent">
        <div>
          <h3>Ready to make an impact?</h3>
          <p>We are always looking for passionate people who want to help shape a healthier tomorrow.</p>
        </div>
        <a href="#open-positions" className="btn">Join our team <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

function CareersPage() {
  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>
        <CareersHero />
        <section className="innerBody careersSection">
          <CareerOpportunities />
          <OpenPositionsSection />
        </section>
        <RecruitmentCTA />
      </main>
    </Frame>
  );
}

function CareerDetail() {
  const { slug } = useParams();
  const [status, setStatus] = useState("loading");
  const [job, setJob] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    setStatus("loading");
    setJob(null);
    setRelated([]);
    getCareerOpeningBySlug(slug)
      .then((item) => {
        if (!item) { setStatus("notfound"); return; }
        setJob(item);
        setStatus("loaded");
        window.scrollTo(0, 0);
        getRelatedOpenings(item, 3).then(setRelated).catch(() => setRelated([]));
      })
      .catch(() => setStatus("error"));
  }, [slug]);

  if (status === "loading") {
    return (
      <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
        <main>
          <section className="innerBody">
            <div className="finLoadingSkeleton" aria-hidden="true"><div className="finSkeletonRow" /></div>
          </section>
        </main>
      </Frame>
    );
  }

  if (status === "error" || status === "notfound" || !job) {
    return (
      <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
        <main>
          <section className="innerBody">
            <div className="finStateMessage finEmptyState">
              <Inbox size={22} />
              <p>This position could not be found.</p>
              <Link to="/careers" className="btnOutline">Back to Careers</Link>
            </div>
          </section>
        </main>
      </Frame>
    );
  }

  const departmentLabel = CAREER_DEPARTMENT_LABELS[job.department] || job.department;
  const employmentLabel = EMPLOYMENT_TYPE_LABELS[job.employmentType] || job.employmentType;
  const workArrangementLabel = job.workArrangement ? WORK_ARRANGEMENT_LABELS[job.workArrangement] : null;
  const experienceLabel = job.experienceLevel ? EXPERIENCE_LEVEL_LABELS[job.experienceLevel] : null;
  const applyHref = job.applyUrl || `mailto:careers@evervie.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`;
  const applyIsExternal = !!job.applyUrl && !job.applyUrl.startsWith("mailto:");
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Frame nav={<EditorialNav />} brand footer={<EditorialFooter />}>
      <main>
        <section className="wwaHero">
          <div className="wwaHeroLeft">
            <nav className="wwaBreadcrumb" aria-label="breadcrumb" style={{ marginBottom: '24px' }}>
              <Link to="/">Home</Link>
              <ChevronRight size={13} />
              <Link to="/careers">Careers</Link>
              <ChevronRight size={13} />
              <span className="wwaBreadActive">{job.title}</span>
            </nav>
            <div className="eyebrow"><EyebrowSymbol />{departmentLabel}</div>
            <h1>{job.title}</h1>
            <div className="careersDetailMeta">
              <span><MapPin size={14} />{job.location}</span>
              <span><Briefcase size={14} />{employmentLabel}</span>
              {workArrangementLabel && <span>{workArrangementLabel}</span>}
              {experienceLabel && <span>{experienceLabel}</span>}
              <span><Calendar size={14} />Posted {formatDisplayDate(job.datePosted)}</span>
              {job.applicationDeadline && <span>Apply by {formatDisplayDate(job.applicationDeadline)}</span>}
            </div>
          </div>
          <img src="/Evervie_PPT_Diamond_v1.png" alt="" className="wwaHeroDiamond" aria-hidden="true" />
        </section>

        <section className="innerBody newsArticleDetail careersDetail">
          <div className="careersApplyBar">
            <a href={applyHref} target={applyIsExternal ? "_blank" : undefined} rel={applyIsExternal ? "noreferrer" : undefined} className="btn">
              Apply Now
            </a>
            <div className="newsArticleShare">
              <span>Share this role</span>
              <a href={`mailto:?subject=${encodeURIComponent(job.title)}&body=${encodeURIComponent(shareUrl)}`} aria-label="Share via email">
                <Mail size={16} />
              </a>
              <button type="button" onClick={() => navigator.clipboard?.writeText(shareUrl)} aria-label="Copy role link">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>

          <article className="newsArticleBody">
            {job.roleOverview && (<><h4>Role overview</h4><ReactMarkdown>{job.roleOverview}</ReactMarkdown></>)}
            {job.responsibilities && (<><h4>Responsibilities</h4><ReactMarkdown>{job.responsibilities}</ReactMarkdown></>)}
            {job.requiredQualifications && (<><h4>Required qualifications</h4><ReactMarkdown>{job.requiredQualifications}</ReactMarkdown></>)}
            {job.preferredQualifications && (<><h4>Preferred qualifications</h4><ReactMarkdown>{job.preferredQualifications}</ReactMarkdown></>)}
            {job.whatEvervieOffers && (<><h4>What Evervie offers</h4><ReactMarkdown>{job.whatEvervieOffers}</ReactMarkdown></>)}
            <p className="careersEqualOpportunity">Evervie Health is an equal-opportunity employer. We welcome applications from all qualified candidates regardless of background, identity, or circumstance.</p>
          </article>

          {related.length > 0 && (
            <div className="newsRelatedSection">
              <div className="neSectionHeader"><h2>Related openings</h2></div>
              <div className="careersJobList">
                {related.map((item) => <JobRow key={item.id} job={item} />)}
              </div>
            </div>
          )}
        </section>

        <RecruitmentCTA />
      </main>
    </Frame>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const FEEDBACK_TRACKED_PAGES = [
  { path: "/", label: "Home", Component: Editorial },
  { path: "/about/who-we-are", label: "About — Who We Are", Component: AboutWhoWeAre },
  { path: "/about/leadership", label: "About — Leadership", Component: AboutLeadership },
  { path: "/about/mission-vision", label: "About — Mission & Vision", Component: AboutMissionVision },
  { path: "/about/aspiration", label: "About — Aspiration", Component: AboutAspiration },
  { path: "/about/governance", label: "About — Governance", Component: AboutGovernance },
  { path: "/portfolio/renal-care", label: "Portfolio — Renal Care", Component: RenalCare },
  { path: "/portfolio/oncology", label: "Portfolio — Oncology", Component: Oncology },
  { path: "/portfolio/diagnostics", label: "Portfolio — Diagnostics", Component: Diagnostics },
  { path: "/portfolio/elder-care", label: "Portfolio — Elder Care", Component: ElderCare },
  { path: "/investor-centre", label: "Investor Centre", Component: InvestorCentre },
  { path: "/investor-centre/investment-overview", label: "Investor Centre — Investment Overview", Component: InvestmentOverview },
  { path: "/investor-centre/financial-information", label: "Investor Centre — Financial Information", Component: FinancialInformation },
  { path: "/investor-centre/announcements", label: "Investor Centre — News & Events", Component: NewsAndEvents },
  { path: "/investor-centre/presentations", label: "Investor Centre — Presentations", Component: InvestorPresentations },
  { path: "/news-insights", label: "News & Insights", Component: NewsInsights },
  { path: "/careers", label: "Careers", Component: CareersPage },
];

export default function App() {
  return <><ScrollToTop /><RouteLoader /><FeedbackWidget /><Routes>
    <Route path="/" element={<Editorial />} />
    <Route path="/editorial" element={<Editorial />} />
    {/* Hidden variation routes for now */}
    {/* <Route path="/bento" element={<Bento />} /> */}
    {/* <Route path="/journey" element={<Journey />} /> */}
    <Route path="/about/who-we-are" element={<AboutWhoWeAre />} />
    <Route path="/about/leadership" element={<AboutLeadership />} />
    <Route path="/about/mission-vision" element={<AboutMissionVision />} />
    <Route path="/about/aspiration" element={<AboutAspiration />} />
    <Route path="/about/governance" element={<AboutGovernance />} />
    <Route path="/portfolio/renal-care" element={<RenalCare />} />
    <Route path="/portfolio/oncology" element={<Oncology />} />
    <Route path="/portfolio/diagnostics" element={<Diagnostics />} />
    <Route path="/portfolio/elder-care" element={<ElderCare />} />
    <Route path="/investor-centre" element={<InvestorCentre />} />
    <Route path="/investors/overview" element={<InvestorCentre />} />
    <Route path="/investor-centre/investment-overview" element={<InvestmentOverview />} />
    <Route path="/investor-centre/financial-information" element={<FinancialInformation />} />
    <Route path="/investor-centre/announcements" element={<NewsAndEvents />} />
    <Route path="/investor-centre/presentations" element={<InvestorPresentations />} />
    <Route path="/news-insights" element={<NewsInsights />} />
    <Route path="/news-insights/:slug" element={<ArticleDetail />} />
    <Route path="/careers" element={<CareersPage />} />
    <Route path="/careers/:slug" element={<CareerDetail />} />
    <Route path="/feedback" element={<FeedbackLoginPage />} />
    <Route path="/feedback/verify" element={<FeedbackVerifyPage />} />
    <Route path="/feedback/copy" element={<FeedbackCopyTracker />} />
  </Routes></>;
}
