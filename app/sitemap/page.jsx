"use client";
import { useState } from "react";

const GOLD = "#C9A96E";
const GOLD_LIGHT = "#E8D4AA";
const GOLD_DARK = "#8B6914";
const DARK = "#3D3D3D";
const CHARCOAL = "#2A2A2A";
const CREAM = "#F5F0E8";
const CREAM_DARK = "#EDE5D5";
const MUTED = "#888";

const S = {
  root: { minHeight: "100vh", background: CREAM, padding: "40px 24px 80px", fontFamily: "'Georgia', serif" },
  header: { textAlign: "center", marginBottom: 52 },
  eyebrow: { fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: GOLD, fontWeight: 700, marginBottom: 12, fontFamily: "sans-serif" },
  h1: { fontSize: 30, color: DARK, lineHeight: 1.25, fontFamily: "Georgia, serif", marginBottom: 8 },
  h1em: { color: GOLD, fontStyle: "italic" },
  sub: { fontSize: 12, color: MUTED, fontFamily: "sans-serif", fontWeight: 400 },
  legend: { display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 44 },
  legendItem: { display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 600, color: DARK, fontFamily: "sans-serif" },
  legendDot: { width: 10, height: 10, borderRadius: "50%", border: "1.5px solid rgba(0,0,0,0.1)" },
  zoneWrap: { marginBottom: 44 },
  zoneHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18 },
  zoneNum: { width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white", flexShrink: 0, fontFamily: "sans-serif" },
  zoneTitle: { fontSize: 20, color: DARK, fontFamily: "Georgia, serif" },
  zoneDesc: { fontSize: 11, color: MUTED, marginLeft: "auto", fontFamily: "sans-serif" },
  divider: { border: "none", borderTop: `1px solid ${CREAM_DARK}`, margin: "32px 0" },
  tabBar: { display: "flex", gap: 4, background: "white", padding: 4, borderRadius: 10, border: `1px solid ${CREAM_DARK}`, marginBottom: 20, width: "fit-content", flexWrap: "wrap" },
  tab: (active) => ({ padding: "6px 14px", borderRadius: 7, fontSize: 11, fontWeight: 600, color: active ? "white" : MUTED, background: active ? DARK : "transparent", cursor: "pointer", fontFamily: "sans-serif", transition: "all 0.2s" }),
  navSection: { background: "white", borderRadius: 14, padding: 20, marginBottom: 10, border: `1px solid ${CREAM_DARK}` },
  navLabel: { fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: GOLD, fontWeight: 700, marginBottom: 14, fontFamily: "sans-serif" },
  navBar: (bg) => ({ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", padding: "9px 14px", borderRadius: 9, background: bg }),
  navLogo: { fontFamily: "Georgia, serif", fontSize: 13, color: GOLD, marginRight: 6, flexShrink: 0 },
  navDivider: { width: 1, height: 14, background: "rgba(255,255,255,0.1)", margin: "0 5px" },
  navItem: { padding: "4px 9px", borderRadius: 5, fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.7)", cursor: "pointer", fontFamily: "sans-serif", whiteSpace: "nowrap" },
  navCta: { padding: "4px 13px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: GOLD, color: "white", marginLeft: "auto", fontFamily: "sans-serif", whiteSpace: "nowrap" },
  navCtaSec: { padding: "4px 13px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: "transparent", border: "1px solid rgba(201,169,110,0.4)", color: GOLD, fontFamily: "sans-serif" },
  navNote: { marginTop: 10, fontSize: 11, color: MUTED, lineHeight: 1.7, fontFamily: "sans-serif" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 12 },
  card: (type) => {
    const bgs = { marketing: ["white", CREAM_DARK], guest: ["#FFF8EE", "#F0D9A8"], planner: ["#EEF2F5", "#C8D8E8"], admin: ["#F0F5EC", "#C2D9B8"], auth: ["#F5F0F8", "#D8C8E8"] };
    const [bg, border] = bgs[type] || bgs.marketing;
    return { background: bg, border: `1.5px solid ${border}`, borderRadius: 12, padding: 16, cursor: "default" };
  },
  cardUrl: (type) => {
    const styles = { marketing: ["#EDE5D5", GOLD_DARK], guest: ["#F5E8C8", "#8B6414"], planner: ["#D5E4F0", "#2A5A7A"], admin: ["#D0E8C8", "#2A5A2A"], auth: ["#E8D5F5", "#5A2A7A"] };
    const [bg, color] = styles[type] || styles.marketing;
    return { fontSize: 9, fontFamily: "monospace", padding: "3px 6px", borderRadius: 4, display: "inline-block", marginBottom: 9, fontWeight: 700, background: bg, color };
  },
  cardTitle: { fontFamily: "Georgia, serif", fontSize: 14, color: DARK, marginBottom: 5, lineHeight: 1.3 },
  cardMeta: { fontSize: 10, color: MUTED, fontWeight: 400, lineHeight: 1.55, fontFamily: "sans-serif" },
  tags: { display: "flex", flexWrap: "wrap", gap: 4, marginTop: 9 },
  tag: (type) => {
    const styles = { auth: ["#EDE5F5", "#7A4A9A"], public: ["#E5F0E5", "#2A6A2A"], isr: ["#E5EEF5", "#2A5A8A"], protected: ["#F5EAE5", "#8A3A1A"], rt: ["#FFF3DC", "#8A5A00"] };
    const [bg, color] = styles[type] || styles.public;
    return { fontSize: 9, padding: "2px 6px", borderRadius: 10, fontWeight: 700, background: bg, color, fontFamily: "sans-serif" };
  },
  sections: { marginTop: 9, display: "flex", flexDirection: "column", gap: 4 },
  sectionItem: { display: "flex", alignItems: "flex-start", gap: 6, fontSize: 10, color: "#555", fontFamily: "sans-serif", lineHeight: 1.4 },
  sectionDot: { width: 5, height: 5, borderRadius: "50%", background: GOLD_LIGHT, flexShrink: 0, marginTop: 4 },
  states: { display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" },
  statePill: (t) => {
    const s = { pending: ["#FEF3CD", "#856404"], confirmed: ["#D1F0DA", "#166534"], declined: ["#F8D7DA", "#721C24"] };
    const [bg, color] = s[t];
    return { fontSize: 9, padding: "2px 8px", borderRadius: 20, fontWeight: 700, background: bg, color, fontFamily: "sans-serif" };
  },
  apiTable: { background: "white", borderRadius: 14, padding: 20, border: `1px solid ${CREAM_DARK}` },
  apiRow: { display: "flex", gap: 14, alignItems: "flex-start", padding: "9px 0", borderBottom: `1px solid ${CREAM_DARK}` },
  methodBadge: (m) => {
    const s = { POST: ["#E8F5E8", "#1A6A1A"], PATCH: ["#FFF3DC", "#8A5A00"], GET: ["#E8EEF8", "#1A3A6A"] };
    const [bg, color] = s[m] || s.GET;
    return { fontSize: 9, fontWeight: 700, padding: "3px 6px", borderRadius: 4, minWidth: 40, textAlign: "center", background: bg, color, fontFamily: "sans-serif", flexShrink: 0 };
  },
  authBadge: (a) => {
    const s = { None: ["#E5F0E5", "#2A6A2A"], Planner: ["#E5EEF5", "#1A4A7A"], Admin: ["#F5EAE5", "#6A1A1A"] };
    const [bg, color] = s[a] || s.None;
    return { fontSize: 9, padding: "2px 7px", borderRadius: 10, fontWeight: 700, background: bg, color, fontFamily: "sans-serif", whiteSpace: "nowrap", flexShrink: 0, marginTop: 2 };
  },
  flowSection: { background: "white", borderRadius: 14, padding: 20, border: `1px solid ${CREAM_DARK}` },
  flowTitle: { fontFamily: "Georgia, serif", fontSize: 16, color: DARK, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 },
  flowTitleSpan: { fontFamily: "sans-serif", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: MUTED },
  flowSteps: { display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: 2 },
  flowStep: { display: "flex", flexDirection: "column", alignItems: "center", gap: 5 },
  flowNode: (t) => {
    const s = { guest: ["#FFF3DC", "#8B5A00", "#F5D88A"], planner: ["#E8F0F8", "#1A4A7A", "#B8D0E8"], admin: ["#EAF5E8", "#1A5A1A", "#B8D8B0"], system: [CREAM_DARK, GOLD_DARK, GOLD_LIGHT] };
    const [bg, color, border] = s[t] || s.system;
    return { padding: "7px 10px", borderRadius: 7, fontSize: 10, fontWeight: 600, textAlign: "center", lineHeight: 1.3, minWidth: 78, background: bg, color, border: `1.5px solid ${border}`, fontFamily: "sans-serif", whiteSpace: "pre-line" };
  },
  flowArrow: { display: "flex", alignItems: "center", paddingTop: 10, color: GOLD_LIGHT, fontSize: 14, flexShrink: 0 },
  flowSub: { fontSize: 9, color: MUTED, textAlign: "center", maxWidth: 78, fontFamily: "sans-serif", lineHeight: 1.4 },
  flowNote: { marginTop: 16, padding: "10px 14px", background: "#FFF8EE", borderRadius: 8, fontSize: 11, color: "#8B5A00", lineHeight: 1.7, fontFamily: "sans-serif" },
  footer: { textAlign: "center", marginTop: 52, paddingTop: 28, borderTop: `1px solid ${CREAM_DARK}` },
};

const Dot = () => <div style={S.sectionDot} />;
const Tag = ({ type, children }) => <span style={S.tag(type)}>{children}</span>;
const Divider = () => <hr style={S.divider} />;

const PageCard = ({ type, url, title, meta, tags, sections, extra }) => (
  <div style={S.card(type)}>
    <div style={S.cardUrl(type)}>{url}</div>
    <div style={S.cardTitle}>{title}</div>
    <div style={S.cardMeta}>{meta}</div>
    {tags && <div style={S.tags}>{tags.map((t, i) => <Tag key={i} type={t.type}>{t.label}</Tag>)}</div>}
    {sections && <div style={S.sections}>{sections.map((s, i) => <div key={i} style={S.sectionItem}><Dot />{s}</div>)}</div>}
    {extra}
  </div>
);

const FlowDiagram = ({ steps }) => (
  <div style={S.flowSteps}>
    {steps.map((s, i) => s === null ? (
      <div key={i} style={S.flowArrow}>→</div>
    ) : (
      <div key={i} style={S.flowStep}>
        <div style={S.flowNode(s.type)}>{s.node}</div>
        <div style={S.flowSub}>{s.sub}</div>
      </div>
    ))}
  </div>
);

export default function SiteMap() {
  const [navTab, setNavTab] = useState("marketing");
  const [flowTab, setFlowTab] = useState("guest");

  return (
    <div style={S.root}>
      {/* HEADER */}
      <div style={S.header}>
        <div style={S.eyebrow}>Timeless Vows · UX Architecture</div>
        <h1 style={S.h1}>Site Map & <em style={S.h1em}>Navigation System</em></h1>
        <p style={S.sub}>Complete page inventory · Route structure · Navigation patterns · User flows</p>
      </div>

      {/* LEGEND */}
      <div style={S.legend}>
        {[["#E8E8E8","Marketing Site"],["#F5E8C8","Guest Experience"],["#D5E4F0","Planner Portal"],["#D0E8C8","Internal Admin"],["#E8D5F5","Auth Screens"]].map(([c,l]) => (
          <div key={l} style={S.legendItem}><div style={{...S.legendDot, background: c}} />{l}</div>
        ))}
      </div>

      {/* ── NAVIGATION ── */}
      <div style={S.zoneWrap}>
        <div style={S.zoneHeader}>
          <div style={{...S.zoneNum, background: GOLD}}>N</div>
          <div style={S.zoneTitle}>Navigation System</div>
          <div style={S.zoneDesc}>3 distinct navigation contexts</div>
        </div>
        <div style={S.tabBar}>
          {[["marketing","Marketing Site"],["dashboard","Planner Dashboard"],["admin","Internal Admin"]].map(([id,label]) => (
            <div key={id} style={S.tab(navTab===id)} onClick={() => setNavTab(id)}>{label}</div>
          ))}
        </div>

        {navTab === "marketing" && (
          <div style={S.navSection}>
            <div style={S.navLabel}>Primary Navigation · Marketing Site · timelessvows.co.tz</div>
            <div style={S.navBar(CHARCOAL)}>
              <span style={S.navLogo}>Timeless Vows</span>
              <div style={S.navDivider}/>
              {["How It Works","Features","Pricing","For Planners","FAQ"].map(item => <span key={item} style={S.navItem}>{item}</span>)}
              <span style={S.navCta}>Get Started →</span>
            </div>
            <div style={S.navNote}><strong style={{color:DARK}}>Scroll behaviour:</strong> Transparent overlay → solid dark on scroll · Logo always visible · CTA links to WhatsApp (wa.me/255...) · Mobile: hamburger + full-screen overlay · All links are smooth-scroll anchors — single-page architecture</div>
          </div>
        )}
        {navTab === "dashboard" && (
          <div style={S.navSection}>
            <div style={S.navLabel}>Planner Dashboard Navigation · /dashboard/[slug]</div>
            <div style={S.navBar("#1E2329")}>
              <span style={S.navLogo}>Timeless Vows</span>
              <div style={S.navDivider}/>
              <span style={{...S.navItem, color: GOLD}}>John & Amina <span style={{fontSize:9,padding:"1px 5px",borderRadius:8,background:"rgba(201,169,110,0.15)",color:GOLD,marginLeft:4}}>Live</span></span>
              <div style={S.navDivider}/>
              {["Guests","Stats","Export .xlsx"].map(i => <span key={i} style={S.navItem}>{i}</span>)}
              <div style={{marginLeft:"auto",display:"flex",gap:6}}>
                <span style={S.navCtaSec}>Share Link ↗</span>
                <span style={S.navItem}>Sign Out</span>
              </div>
            </div>
            <div style={S.navNote}><strong style={{color:DARK}}>Auth-protected:</strong> Supabase session required · Email must match weddings.planner_email · Middleware redirects to /login if unauthed · Wedding name shown with Live badge · Share Link copies /w/[slug] with toast · Export triggers SheetJS download</div>
          </div>
        )}
        {navTab === "admin" && (
          <div style={S.navSection}>
            <div style={S.navLabel}>Internal Admin Navigation · /admin (Operator Only)</div>
            <div style={S.navBar("#1A1F16")}>
              <span style={{...S.navLogo, color:"#B8D8B0"}}>Timeless Vows Admin</span>
              <div style={S.navDivider}/>
              <span style={{...S.navItem, color:"#B8D8B0"}}>All Weddings</span>
              <span style={S.navItem}>+ New Wedding</span>
              <div style={{marginLeft:"auto",display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:10,color:"#666",padding:"4px 8px",fontFamily:"sans-serif"}}>admin@timelessvows.co.tz</span>
                <span style={S.navItem}>Sign Out</span>
              </div>
            </div>
            <div style={S.navNote}><strong style={{color:DARK}}>Admin role only:</strong> Custom Supabase claim check · Regular planner JWT cannot access · Separate login at /admin/login · Green accent scheme to distinguish from planner portal</div>
          </div>
        )}
      </div>

      <Divider/>

      {/* ── MARKETING SITE ── */}
      <div style={S.zoneWrap}>
        <div style={S.zoneHeader}>
          <div style={{...S.zoneNum, background: DARK}}>01</div>
          <div style={S.zoneTitle}>Marketing Site</div>
          <div style={S.zoneDesc}>Public · No auth required</div>
        </div>
        <div style={S.grid}>
          <PageCard type="marketing" url="/" title="Landing Page" meta="Main marketing page. Single-page scroll. All sections are anchor links." tags={[{type:"public",label:"Public"},{type:"isr",label:"SSG"}]} sections={["#hero — Names, photo, CTA buttons","#problem — JPEG pain point","#features — What's included","#card — Confirmation card explainer","#comparison — vs Canva / manual","#how-it-works — 5 steps","#dashboard — Planner view preview","#pricing — 3 tiers in TZS","#planners — B2B section","#testimonials — Social proof","#faq — Accordion","#cta — Final WhatsApp CTA"]} />
          <PageCard type="marketing" url="/demo" title="Sample Invitation" meta="Live demo using a fictional couple. Identical to a real /w/[slug] page. Full guest experience including RSVP and card." tags={[{type:"public",label:"Public"},{type:"isr",label:"SSG"}]} sections={["Full invitation page (all sections)","Working RSVP form (demo mode — no DB write)","Demo card redirect after submit","'This is a demo' banner at top","CTA: Get your own invitation →"]} />
          <PageCard type="marketing" url="/contact" title="Contact / Get Started" meta="For visitors who don't click the WhatsApp CTA. Simple contact options." tags={[{type:"public",label:"Public"},{type:"isr",label:"Static"}]} sections={["WhatsApp deep link (primary CTA)","Instagram link","Simple inquiry form (optional)","Expected response time displayed"]} />
        </div>
      </div>

      <Divider/>

      {/* ── GUEST EXPERIENCE ── */}
      <div style={S.zoneWrap}>
        <div style={S.zoneHeader}>
          <div style={{...S.zoneNum, background:"#C9A040"}}>02</div>
          <div style={S.zoneTitle}>Guest Experience</div>
          <div style={S.zoneDesc}>Public · No auth · Mobile-first</div>
        </div>
        <div style={S.grid}>
          <PageCard type="guest" url="/w/[slug]" title="Invitation Page" meta="The main shareable wedding invitation. Unique per wedding. ISR revalidates every 60s for fast load and live updates." tags={[{type:"public",label:"Public"},{type:"isr",label:"ISR 60s"}]} sections={["Preloader — full-screen animation (once/session via sessionStorage)","Hero — couple photo, names, wedding date","Countdown — live JS timer","Programme — vertical timeline from JSONB","Venue — name, address, Google Maps iframe","Dress Code — themed styled block","Contribution — M-Pesa number + tap-to-copy","RSVP section — embedded form (final section)","Floating RSVP sticky button (mobile)"]} />
          <PageCard type="guest" url="/w/[slug]#rsvp" title="RSVP Form" meta="Embedded as the final section of the invitation. Also reachable via the floating CTA button. Same URL, anchor scroll." tags={[{type:"public",label:"Public"}]} sections={["Full Name — text input (required)","Phone — TZ format +255 validation","Attending — Yes / No radio","Seats — number 1–10 (if attending = Yes)","Pledge amount TZS — optional","POST /api/rsvp on submit","Redirect → /card/[guestId]","Duplicate phone returns existing record"]} />
          <PageCard type="guest" url="/card/[guestId]" title="Guest Card Page" meta="Personalised card shown after RSVP. No login. Three visual states based on rsvp_status. Shareable, bookmarkable URL." tags={[{type:"public",label:"Public"},{type:"isr",label:"SSR"}]} sections={["Guest name — large, prominent","Couple names + date + venue","Theme-coloured card design","Timeless Vows watermark","Status badge (3 states)","Download as PNG — html2canvas","Download as PDF — html2canvas + jsPDF"]} extra={<div style={S.states}><span style={S.statePill("pending")}>⏳ Pending</span><span style={S.statePill("confirmed")}>✓ Confirmed</span><span style={S.statePill("declined")}>✕ Declined</span></div>} />
        </div>
      </div>

      <Divider/>

      {/* ── PLANNER PORTAL ── */}
      <div style={S.zoneWrap}>
        <div style={S.zoneHeader}>
          <div style={{...S.zoneNum, background:"#3A6A9A"}}>03</div>
          <div style={S.zoneTitle}>Planner Portal</div>
          <div style={S.zoneDesc}>Auth-protected · planner_email must match Supabase session</div>
        </div>
        <div style={S.grid}>
          <PageCard type="auth" url="/login" title="Planner Login" meta="Email + password via Supabase Auth. Redirect destination preserved in URL for post-login navigation." tags={[{type:"auth",label:"Unauthed only"}]} sections={["Email input","Password input","Sign In → Supabase Auth","Error state: invalid credentials","Forgot password → reset email","Redirect to /dashboard/[slug] on success"]} />
          <PageCard type="planner" url="/dashboard/[slug]" title="Planner Dashboard" meta="Main command centre. Real-time updates via Supabase Realtime subscription on the guests table." tags={[{type:"protected",label:"Auth Required"},{type:"rt",label:"Realtime"}]} sections={["Top bar: wedding name + Share link button","Stats row — 4 cards: RSVPs / Confirmed / Seats / Pledged","Guest table: name, phone, seats, pledge, contribution toggle, status, actions","Filter: All / Pending / Confirmed / Declined","Search by name or phone","Confirm button → PATCH /api/guests/[id]/confirm","Contribution toggle → PATCH /api/guests/[id]/contribution","View Card → opens /card/[guestId] new tab","Phone → opens WhatsApp chat","Export .xlsx → GET /api/export/[slug] + SheetJS"]} />
        </div>
      </div>

      <Divider/>

      {/* ── INTERNAL ADMIN ── */}
      <div style={S.zoneWrap}>
        <div style={S.zoneHeader}>
          <div style={{...S.zoneNum, background:"#3A7A3A"}}>04</div>
          <div style={S.zoneTitle}>Internal Admin Panel</div>
          <div style={S.zoneDesc}>Operator only · Admin Supabase role claim required</div>
        </div>
        <div style={S.grid}>
          <PageCard type="admin" url="/admin" title="Wedding List" meta="All weddings across the platform. Status control, quick actions, entry point for all admin work." tags={[{type:"protected",label:"Admin Only"}]} sections={["Table: slug, couple names, date, status, planner email, guest count","Status pills: Draft / Review / Published","Preview → opens /w/[slug] in new tab","Edit → /admin/[slug]/edit","Status change dropdown per row","+ New Wedding → /admin/new","Filter by status"]} />
          <PageCard type="admin" url="/admin/new" title="Create Wedding" meta="Full form to set up a new wedding record. Populates the weddings table." tags={[{type:"protected",label:"Admin Only"}]} sections={["Bride & groom names","Slug (auto-gen from names + editable)","Wedding date & time","Venue name, address, map URL","Dress code","Programme builder — add / remove / reorder rows","Contribution details (name + number)","Cover photo upload → Supabase Storage","Theme colour picker","Planner email (grants dashboard access)","POST /api/admin/weddings on save"]} />
          <PageCard type="admin" url="/admin/[slug]/edit" title="Edit Wedding" meta="Same form as Create, pre-populated. Used during client review cycle for change requests." tags={[{type:"protected",label:"Admin Only"}]} sections={["All fields from Create Wedding","Status control: Draft → Review → Published","Preview button (opens /w/[slug])","PATCH /api/admin/weddings/[slug]","Replace cover photo","Danger zone: delete wedding (confirm modal)"]} />
        </div>
      </div>

      <Divider/>

      {/* ── API ROUTES ── */}
      <div style={S.zoneWrap}>
        <div style={S.zoneHeader}>
          <div style={{...S.zoneNum, background:"#5A5A5A"}}>05</div>
          <div style={S.zoneTitle}>API Routes</div>
          <div style={S.zoneDesc}>Next.js App Router · Node.js</div>
        </div>
        <div style={S.apiTable}>
          {[
            {method:"POST", route:"/api/rsvp", auth:"None", desc:"Submit RSVP · create guest record · return guestId · dedup by phone+wedding"},
            {method:"GET", route:"/api/card/[guestId]", auth:"None", desc:"Fetch guest + wedding data for card page render"},
            {method:"PATCH", route:"/api/guests/[guestId]/confirm", auth:"Planner", desc:"Set rsvp_status = confirmed · confirmed_at = now() · triggers Realtime update"},
            {method:"PATCH", route:"/api/guests/[guestId]/contribution", auth:"Planner", desc:"Toggle contribution_received boolean"},
            {method:"GET", route:"/api/dashboard/[slug]", auth:"Planner", desc:"Fetch all guests for a wedding · planner email must match session"},
            {method:"GET", route:"/api/export/[slug]", auth:"Planner", desc:"Return guest JSON for SheetJS client-side .xlsx export"},
            {method:"POST", route:"/api/admin/weddings", auth:"Admin", desc:"Create new wedding record · admin role claim required"},
            {method:"PATCH", route:"/api/admin/weddings/[slug]", auth:"Admin", desc:"Update wedding fields or status (draft / review / published)"},
            {method:"GET", route:"/api/admin/weddings", auth:"Admin", desc:"List all weddings with guest counts and status"},
          ].map((api,i) => (
            <div key={i} style={{...S.apiRow, borderBottom: i < 8 ? `1px solid ${CREAM_DARK}` : "none"}}>
              <span style={S.methodBadge(api.method)}>{api.method}</span>
              <span style={{fontFamily:"monospace",fontSize:11,color:DARK,minWidth:240,paddingTop:2,flexShrink:0}}>{api.route}</span>
              <span style={S.authBadge(api.auth)}>{api.auth}</span>
              <span style={{fontSize:11,color:MUTED,lineHeight:1.55,fontFamily:"sans-serif"}}>{api.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider/>

      {/* ── USER FLOWS ── */}
      <div style={S.zoneWrap}>
        <div style={S.zoneHeader}>
          <div style={{...S.zoneNum, background:GOLD_DARK}}>06</div>
          <div style={S.zoneTitle}>Key User Flows</div>
          <div style={S.zoneDesc}>End-to-end per user role</div>
        </div>
        <div style={S.tabBar}>
          {[["guest","Guest Journey"],["planner","Planner Journey"],["admin","Admin Journey"]].map(([id,label]) => (
            <div key={id} style={S.tab(flowTab===id)} onClick={() => setFlowTab(id)}>{label}</div>
          ))}
        </div>

        {flowTab === "guest" && (
          <div style={S.flowSection}>
            <div style={S.flowTitle}>Guest Journey <span style={S.flowTitleSpan}>WhatsApp link → confirmed card</span></div>
            <FlowDiagram steps={[
              {node:"Receives\nWhatsApp link",type:"guest",sub:"Shared by couple"},
              null,
              {node:"/w/[slug]\nInvitation",type:"system",sub:"Views all details"},
              null,
              {node:"Taps RSVP\nbutton",type:"guest",sub:"Scroll or sticky CTA"},
              null,
              {node:"Fills\nRSVP form",type:"guest",sub:"Name, phone, seats"},
              null,
              {node:"POST\n/api/rsvp",type:"system",sub:"Guest record created"},
              null,
              {node:"/card/[id]\nPending Card",type:"system",sub:"Immediate redirect"},
              null,
              {node:"Downloads\nPNG or PDF",type:"guest",sub:"Optional — shareable"},
            ]}/>
            <div style={S.flowNote}><strong>After planner confirms:</strong> Guest revisits /card/[guestId] → card shows Confirmed state with green badge → Guest re-downloads confirmed version</div>
          </div>
        )}
        {flowTab === "planner" && (
          <div style={S.flowSection}>
            <div style={S.flowTitle}>Planner Journey <span style={S.flowTitleSpan}>Login → confirmed guest list + export</span></div>
            <FlowDiagram steps={[
              {node:"Receives\ndashboard link",type:"planner",sub:"From Daily Vows team"},
              null,
              {node:"/login\nEmail + PW",type:"system",sub:"Supabase Auth"},
              null,
              {node:"/dashboard\nGuest Overview",type:"system",sub:"Stats + table"},
              null,
              {node:"Reviews\nRSVPs live",type:"planner",sub:"Realtime sub"},
              null,
              {node:"Toggles\ncontribution",type:"planner",sub:"PATCH /contribution"},
              null,
              {node:"Clicks\nConfirm",type:"planner",sub:"PATCH /confirm"},
              null,
              {node:"Card upgrades\nto Confirmed",type:"system",sub:"Guest sees it live"},
              null,
              {node:"Exports\n.xlsx",type:"planner",sub:"SheetJS download"},
            ]}/>
          </div>
        )}
        {flowTab === "admin" && (
          <div style={S.flowSection}>
            <div style={S.flowTitle}>Admin Journey <span style={S.flowTitleSpan}>Inquiry → published handover</span></div>
            <FlowDiagram steps={[
              {node:"Client inquiry\nWhatsApp/IG",type:"admin",sub:"Package + payment"},
              null,
              {node:"Sends\nonboarding form",type:"admin",sub:"Tally / Google Form"},
              null,
              {node:"/admin/new\nCreate Wedding",type:"system",sub:"POST /api/admin"},
              null,
              {node:"Status →\nReview",type:"admin",sub:"Shares preview link"},
              null,
              {node:"Client requests\nchanges",type:"admin",sub:"Edit in /admin/edit"},
              null,
              {node:"Client approves\nStatus → Live",type:"admin",sub:"PATCH status field"},
              null,
              {node:"Sends 2 links\nto client",type:"admin",sub:"Invitation + Dashboard"},
            ]}/>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={S.footer}>
        <div style={{fontFamily:"Georgia,serif",fontSize:15,color:GOLD,marginBottom:5}}>Timeless Vows</div>
        <div style={{fontSize:9,color:MUTED,letterSpacing:1,fontFamily:"sans-serif"}}>UX SITE MAP · V1.0 · MARCH 2026</div>
      </div>
    </div>
  );
}