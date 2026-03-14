"use client";
import { useState } from "react";

const FONTS_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');`;

// ─── Design Tokens ───────────────────────────────────────────────────────────
const tokens = {
  colors: {
    "Brand": [
      { name: "Warm Brown", var: "--color-brand", hex: "#8E6C4A", usage: "CTAs, labels, accents, borders" },
      { name: "Rich Gold", var: "--color-gold", hex: "#D7B980", usage: "Feature text, dividers, highlights" },
      { name: "Soft Gold", var: "--color-gold-light", hex: "#C9A96E", usage: "Alternate accent" },
    ],
    "Backgrounds": [
      { name: "Dark Canvas", var: "--color-bg-dark", hex: "#222222", usage: "Hero, dark sections" },
      { name: "Near Black", var: "--color-footer", hex: "#231F20", usage: "Footer background" },
      { name: "Warm Cream", var: "--color-bg-light", hex: "#F6F2EE", usage: "Problem, pricing, CTA sections" },
      { name: "Off White", var: "--color-bg-white", hex: "#F7F3EE", usage: "FAQ items, cards on light" },
    ],
    "Text": [
      { name: "Dark Text", var: "--color-text-dark", hex: "#303235", usage: "Body copy on light backgrounds" },
      { name: "Near Black", var: "--color-text-darkest", hex: "#231F20", usage: "Headlines on light bg" },
      { name: "Muted Parchment", var: "--color-text-muted", hex: "#D4CCBD", usage: "Body copy on dark backgrounds" },
      { name: "Pure White", var: "--color-text-white", hex: "#F7F3EE", usage: "Buttons, nav on dark" },
    ],
    "UI": [
      { name: "Card Border", var: "--color-card-border", hex: "rgba(140,140,140,0.4)", usage: "Card/pill borders" },
      { name: "Card Fill", var: "--color-card-fill", hex: "rgba(196,196,196,0.1)", usage: "Subtle card backgrounds" },
      { name: "Separator", var: "--color-separator", hex: "#EAEDF0", usage: "Horizontal rules, lines" },
      { name: "Char Coal", var: "--color-grid", hex: "#383838", usage: "Grid lines, decorative" },
    ],
  },
  typography: [
    {
      role: "Display / Hero",
      fontFamily: "'Cormorant Garamond', serif",
      figmaFont: "FONTSPRING DEMO - Montas Light",
      weight: 300,
      size: "64px",
      lineHeight: "68px",
      letterSpacing: "-0.02em",
      usage: "Hero headline, full-width marquee statements",
      sample: "Your wedding starts with the first impression.",
    },
    {
      role: "Section Heading",
      fontFamily: "'Cormorant Garamond', serif",
      figmaFont: "FONTSPRING DEMO - Montas Light",
      weight: 300,
      size: "36px",
      lineHeight: "38px",
      letterSpacing: "-0.02em",
      usage: "Section titles, feature headings",
      sample: "Everything in one beautiful link.",
    },
    {
      role: "Card / Feature Title",
      fontFamily: "'Instrument Serif', serif",
      figmaFont: "Instrument Serif",
      weight: 400,
      style: "italic",
      size: "24px",
      lineHeight: "31px",
      usage: "Feature card headings, sub-labels",
      sample: "Personalised Invitation Page",
    },
    {
      role: "Price Display",
      fontFamily: "'Manrope', sans-serif",
      figmaFont: "Manrope",
      weight: 600,
      size: "32px",
      lineHeight: "44px",
      letterSpacing: "-0.02em",
      usage: "Pricing, large numeric data",
      sample: "TZS 250,000",
    },
    {
      role: "Body Copy",
      fontFamily: "'Manrope', sans-serif",
      figmaFont: "Manrope",
      weight: 400,
      size: "16px",
      lineHeight: "22px",
      letterSpacing: "-0.02em",
      usage: "Paragraphs, descriptions",
      sample: "A beautiful digital invitation. Real-time RSVPs. A personalised confirmation card every guest keeps.",
    },
    {
      role: "Feature Body",
      fontFamily: "'Manrope', sans-serif",
      figmaFont: "Manrope",
      weight: 500,
      size: "14px",
      lineHeight: "19px",
      usage: "Card body text, supporting copy",
      sample: "A stunning, mobile-first invitation built around you — your names, your photo, your story.",
    },
    {
      role: "Section Label",
      fontFamily: "'Manrope', sans-serif",
      figmaFont: "Manrope",
      weight: 600,
      size: "12px",
      lineHeight: "16px",
      letterSpacing: "0.13em",
      textTransform: "uppercase",
      usage: "Pill labels, section tags",
      sample: "WHAT'S INCLUDED",
    },
    {
      role: "FAQ / UI Medium",
      fontFamily: "'Manrope', sans-serif",
      figmaFont: "Manrope",
      weight: 500,
      size: "18px",
      lineHeight: "31px",
      usage: "FAQ questions, comparison rows",
      sample: "Do I need to know anything technical?",
    },
  ],
  spacing: [
    { name: "Section Padding", value: "100px", usage: "Top & bottom padding for all major sections" },
    { name: "Container Max Width", value: "1280px", usage: "Max width of content container" },
    { name: "Container Padding", value: "24px", usage: "Horizontal padding within containers" },
    { name: "Content Gap", value: "38.69px", usage: "Gap between major content blocks" },
    { name: "Card Gap", value: "20px", usage: "Gap between cards in a row" },
    { name: "Section Grid Gap", value: "39px", usage: "Gap between grid sections" },
    { name: "Text Block Gap", value: "16px", usage: "Gap between heading and body text" },
    { name: "Feature Item Gap", value: "8px", usage: "Gap between feature list items" },
    { name: "Pill Padding", value: "8px 7px", usage: "Internal padding for pill/badge labels" },
    { name: "Button Padding (sm)", value: "8px 20px", usage: "Nav-level CTA buttons" },
    { name: "Button Padding (lg)", value: "14px 32px", usage: "Hero & section CTA buttons" },
  ],
  radius: [
    { name: "Border Radius (micro)", value: "1px", usage: "Buttons, pills — crisp, barely-there rounding" },
    { name: "Border Radius (card)", value: "2px", usage: "Cards, FAQ items" },
    { name: "Border Radius (image)", value: "5px", usage: "Photo elements" },
  ],
};

// ─── Contrast Checker ────────────────────────────────────────────────────────
function getLuminance(hex) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}
function getContrast(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  if (l1 === null || l2 === null) return null;
  const bright = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return ((bright + 0.05) / (dark + 0.05)).toFixed(2);
}

const contrastPairs = [
  { fg: "#8E6C4A", bg: "#F6F2EE", label: "Brand on Cream", use: "Section labels, borders" },
  { fg: "#F7F3EE", bg: "#8E6C4A", label: "White on Brand", use: "Primary button text" },
  { fg: "#D4CCBD", bg: "#222222", label: "Parchment on Dark", use: "Body on hero/dark sections" },
  { fg: "#303235", bg: "#F6F2EE", label: "Dark Text on Cream", use: "Body copy on light sections" },
  { fg: "#231F20", bg: "#F6F2EE", label: "Near Black on Cream", use: "Headings on light sections" },
  { fg: "#D7B980", bg: "#222222", label: "Gold on Dark", use: "Feature text on dark cards" },
  { fg: "#8E6C4A", bg: "#222222", label: "Brand on Dark", use: "Accents on dark background" },
  { fg: "#D4CCBD", bg: "#231F20", label: "Parchment on Footer", use: "Footer body text" },
];

function ContrastBadge({ ratio }) {
  if (!ratio) return null;
  const r = parseFloat(ratio);
  let label, bg, color;
  if (r >= 7) { label = "AAA"; bg = "#166534"; color = "#fff"; }
  else if (r >= 4.5) { label = "AA"; bg = "#15803d"; color = "#fff"; }
  else if (r >= 3) { label = "AA Large"; bg = "#ca8a04"; color = "#fff"; }
  else { label = "Fail"; bg = "#dc2626"; color = "#fff"; }
  return (
    <span style={{ background: bg, color, fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 3, letterSpacing: "0.05em", fontFamily: "'Manrope', sans-serif" }}>
      {ratio}:1 · {label}
    </span>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS = ["Colors", "Typography", "Spacing", "Components", "Accessibility", "Fonts", "Usage"];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BrandGuidelines() {
  const [activeSection, setActiveSection] = useState("Colors");
  const [copiedToken, setCopiedToken] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);

  const copy = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: "#F6F2EE", minHeight: "100vh", color: "#303235" }}>
      <style>{`
        ${FONTS_IMPORT}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } 
        ::-webkit-scrollbar-track { background: #F6F2EE; }
        ::-webkit-scrollbar-thumb { background: #D4CCBD; border-radius: 3px; }
        .token-copy:hover { opacity: 1 !important; cursor: pointer; }
        .nav-item:hover { color: #8E6C4A !important; }
        .swatch:hover .swatch-copy { opacity: 1 !important; }
        .comp-btn:hover { opacity: 0.85 !important; }
      `}</style>

      {/* ── Header ── */}
      <header style={{ background: "#231F20", color: "#F7F3EE", padding: "40px 48px 36px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#8E6C4A", fontWeight: 600, marginBottom: 12, textTransform: "uppercase" }}>Brand Identity System</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#D4CCBD" }}>
            Timeless Vows
          </h1>
          <p style={{ marginTop: 10, color: "#8E6C4A", fontSize: 14, fontWeight: 400 }}>
            Design Language & Component Guidelines · v1.0
          </p>
        </div>
        <div style={{ textAlign: "right", fontSize: 12, color: "#D4CCBD", opacity: 0.5, lineHeight: 1.8 }}>
          <div>timelessvows.co.tz</div>
          <div>Dar es Salaam, Tanzania</div>
          <div>March 2026</div>
        </div>
      </header>

      {/* ── Sticky Nav ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "#F7F3EE", borderBottom: "1px solid #EAEDF0", padding: "0 48px", display: "flex", gap: 4, overflowX: "auto" }}>
        {NAV_ITEMS.map(item => (
          <button key={item} className="nav-item"
            onClick={() => setActiveSection(item)}
            style={{
              background: "none", border: "none", padding: "14px 16px", fontSize: 13, fontWeight: activeSection === item ? 600 : 400,
              color: activeSection === item ? "#8E6C4A" : "#303235",
              borderBottom: activeSection === item ? "2px solid #8E6C4A" : "2px solid transparent",
              cursor: "pointer", whiteSpace: "nowrap", transition: "color 0.15s", fontFamily: "'Manrope', sans-serif", letterSpacing: "-0.01em"
            }}>
            {item}
          </button>
        ))}
      </nav>

      {/* ── Content ── */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 48px 100px" }}>

        {/* ════ COLORS ════ */}
        {activeSection === "Colors" && (
          <section>
            <SectionTitle label="COLOR TOKENS" title="The Palette" subtitle="Every colour in the Timeless Vows system, extracted directly from Figma CSS. Click any swatch to copy the hex." />
            {Object.entries(tokens.colors).map(([group, swatches]) => (
              <div key={group} style={{ marginBottom: 48 }}>
                <h3 style={{ fontSize: 11, letterSpacing: "0.15em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 20 }}>{group}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
                  {swatches.map(sw => (
                    <div key={sw.name} className="swatch" onClick={() => copy(sw.hex)}
                      style={{ background: "#fff", border: "1px solid #EAEDF0", borderRadius: 8, overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.2s" }}>
                      <div style={{ height: 72, background: sw.hex, position: "relative" }}>
                        <div className="swatch-copy" style={{ opacity: 0, position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 600, transition: "opacity 0.2s" }}>
                          {copiedToken === sw.hex ? "✓ Copied!" : "Copy hex"}
                        </div>
                      </div>
                      <div style={{ padding: "12px 14px" }}>
                        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{sw.name}</div>
                        <div style={{ fontSize: 12, color: "#8E6C4A", fontFamily: "monospace", marginBottom: 6 }}>{sw.hex}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.4 }}>{sw.usage}</div>
                        <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 6, fontFamily: "monospace" }}>{sw.var}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Dark vs Light Preview */}
            <h3 style={{ fontSize: 11, letterSpacing: "0.15em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 20, marginTop: 16 }}>Context Preview</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#222222", padding: 32, borderRadius: 8 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.13em", color: "#8E6C4A", fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>HERO SECTION</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: "#D4CCBD", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 12 }}>Your wedding starts with<br/>the first impression.</div>
                <div style={{ fontSize: 14, color: "#D4CCBD", lineHeight: 1.6, marginBottom: 20, opacity: 0.8 }}>A beautiful digital invitation. Real-time RSVPs. A personalised confirmation card every guest keeps.</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ background: "#8E6C4A", color: "#F7F3EE", padding: "8px 20px", fontSize: 14, fontWeight: 500, borderRadius: 1, letterSpacing: "-0.02em" }}>Get Your Invitation</div>
                  <div style={{ border: "1px solid #8E6C4A", color: "#D4CCBD", padding: "8px 20px", fontSize: 14, fontWeight: 500, borderRadius: 1 }}>View a Sample</div>
                </div>
              </div>
              <div style={{ background: "#F6F2EE", padding: 32, borderRadius: 8, border: "1px solid #EAEDF0" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.13em", color: "#8E6C4A", fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>LIGHT SECTION</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: "#231F20", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 12 }}>A card they&apos;ll<br/>actually keep.</div>
                <div style={{ fontSize: 14, color: "#303235", lineHeight: 1.6, marginBottom: 20 }}>Every guest receives a personalised digital card the moment they RSVP — with their name, your wedding details.</div>
                <div style={{ background: "#8E6C4A", color: "#F7F3EE", padding: "8px 20px", fontSize: 14, fontWeight: 500, borderRadius: 1, display: "inline-block", letterSpacing: "-0.02em" }}>Get Your Invitation</div>
              </div>
            </div>
          </section>
        )}

        {/* ════ TYPOGRAPHY ════ */}
        {activeSection === "Typography" && (
          <section>
            <SectionTitle label="TYPE SYSTEM" title="Typography Scale" subtitle="Every text style defined in Figma, mapped to accessible Google Font equivalents." />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {tokens.typography.map((t, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #EAEDF0", borderRadius: 8, padding: "24px 28px", display: "grid", gridTemplateColumns: "200px 1fr 180px", gap: 24, alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "#8E6C4A", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>{t.role}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.5 }}>
                      <div>{t.size} / {t.lineHeight}</div>
                      <div>weight {t.weight}{t.style === "italic" ? " · italic" : ""}</div>
                      {t.letterSpacing && <div>ls {t.letterSpacing}</div>}
                    </div>
                  </div>
                  <div style={{ fontFamily: t.fontFamily, fontSize: t.size === "64px" ? 36 : t.size, fontWeight: t.weight, fontStyle: t.style || "normal", lineHeight: 1.2, letterSpacing: t.letterSpacing, textTransform: t.textTransform, color: "#231F20", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: t.size === "64px" ? "nowrap" : "normal" }}>
                    {t.sample}
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.6 }}>
                    <div style={{ fontWeight: 600, color: "#303235", marginBottom: 2 }}>{t.fontFamily.split(",")[0].replace(/'/g, "")}</div>
                    <div style={{ color: "#8E6C4A", marginBottom: 4 }}>Figma: {t.figmaFont}</div>
                    <div>{t.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ════ SPACING ════ */}
        {activeSection === "Spacing" && (
          <section>
            <SectionTitle label="LAYOUT TOKENS" title="Spacing & Grid" subtitle="Spacing values extracted from the Figma layout. Consistent use of these keeps all sections harmonious." />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
              {tokens.spacing.map(s => (
                <div key={s.name} onClick={() => copy(s.value)}
                  style={{ background: "#fff", border: "1px solid #EAEDF0", borderRadius: 8, padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 3 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>{s.usage}</div>
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 13, background: "#F6F2EE", padding: "4px 10px", borderRadius: 4, color: "#8E6C4A", fontWeight: 600 }}>
                    {copiedToken === s.value ? "✓" : s.value}
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 11, letterSpacing: "0.15em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 20 }}>Border Radius</h3>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {tokens.radius.map(r => (
                <div key={r.name} style={{ background: "#fff", border: "1px solid #EAEDF0", borderRadius: 8, padding: "20px 24px", flex: "1 1 200px" }}>
                  <div style={{ width: 48, height: 48, background: "#8E6C4A", borderRadius: r.value, marginBottom: 12 }}></div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{r.name}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 13, color: "#8E6C4A", marginBottom: 4 }}>{r.value}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>{r.usage}</div>
                </div>
              ))}
            </div>

            {/* Grid system */}
            <h3 style={{ fontSize: 11, letterSpacing: "0.15em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 20, marginTop: 48 }}>Grid System</h3>
            <div style={{ background: "#fff", border: "1px solid #EAEDF0", borderRadius: 8, padding: 28 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 8, marginBottom: 24 }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ height: 40, background: "rgba(142, 108, 74, 0.15)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#8E6C4A", fontWeight: 600 }}>{i + 1}</div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {["Landing Page", "Problem / CTA", "Confirmation Card"].map(label => (
                  <div key={label} style={{ background: "rgba(142, 108, 74, 0.08)", borderRadius: 4, padding: "12px 16px", fontSize: 12, color: "#8E6C4A", fontWeight: 500 }}>{label}<br /><span style={{ fontSize: 11, opacity: 0.7 }}>4 columns each</span></div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: "#9ca3af", lineHeight: 1.8 }}>
                <strong style={{ color: "#303235" }}>Layout canvas:</strong> 1512px · <strong style={{ color: "#303235" }}>Content container:</strong> 1280px · <strong style={{ color: "#303235" }}>Inner content:</strong> 1232px (with 24px padding)
              </div>
            </div>
          </section>
        )}

        {/* ════ COMPONENTS ════ */}
        {activeSection === "Components" && (
          <section>
            <SectionTitle label="COMPONENT LIBRARY" title="UI Components" subtitle="Every reusable component in Timeless Vows, built to match Figma specs." />

            {/* Buttons */}
            <ComponentSection title="Buttons">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", marginBottom: 20 }}>
                <button className="comp-btn" style={{ background: "#8E6C4A", color: "#F7F3EE", border: "1px solid #8E6C4A", borderRadius: 1, padding: "8px 20px", fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: "-0.02em", cursor: "pointer" }}>Get Your Invitation</button>
                <button className="comp-btn" style={{ background: "transparent", color: "#D4CCBD", border: "1px solid #8E6C4A", borderRadius: 1, padding: "8px 20px", fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: "-0.02em", cursor: "pointer" }}>View a Sample</button>
                <button className="comp-btn" style={{ background: "#8E6C4A", color: "#F7F3EE", border: "1px solid #8E6C4A", borderRadius: 1, padding: "14px 32px", fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: 18, letterSpacing: "-0.02em", cursor: "pointer" }}>Get Started on WhatsApp</button>
              </div>
              <div style={{ background: "#222222", padding: 24, borderRadius: 6, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#D4CCBD", opacity: 0.5, marginRight: 8, letterSpacing: "0.1em" }}>ON DARK:</span>
                <button className="comp-btn" style={{ background: "#8E6C4A", color: "#F7F3EE", border: "1px solid #8E6C4A", borderRadius: 1, padding: "8px 20px", fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: "-0.02em", cursor: "pointer" }}>Get Your Invitation</button>
                <button className="comp-btn" style={{ background: "transparent", color: "#D4CCBD", border: "1px solid #8E6C4A", borderRadius: 1, padding: "8px 20px", fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: "-0.02em", cursor: "pointer" }}>View a Sample</button>
              </div>
              <TokenSpec items={[
                { k: "Primary BG", v: "#8E6C4A" }, { k: "Primary Text", v: "#F7F3EE" },
                { k: "Secondary Border", v: "1px solid #8E6C4A" }, { k: "Border Radius", v: "1px" },
                { k: "Font", v: "Manrope 500" }, { k: "Letter Spacing", v: "-0.02em" },
              ]} />
            </ComponentSection>

            {/* Pills */}
            <ComponentSection title="Section Pills / Badges">
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
                {["WHAT'S INCLUDED", "PRICING", "CONFIRMATION CARD", "PROBLEM STATEMENT", "FAQ", "Begin Your Story"].map(label => (
                  <div key={label} style={{ border: "1px solid rgba(48, 50, 53, 0.4)", borderRadius: 1, padding: "8px 7px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: 12, lineHeight: "16px", letterSpacing: "0.13em", color: "#8E6C4A", textTransform: "uppercase" }}>{label}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#222222", padding: 20, borderRadius: 6, display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["HERO SECTION", "FEATURES", "HOW IT WORKS"].map(label => (
                  <div key={label} style={{ border: "1px solid rgba(196, 196, 196, 0.4)", borderRadius: 1, padding: "8px 12px" }}>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.13em", color: "#D4CCBD", textTransform: "uppercase" }}>{label}</span>
                  </div>
                ))}
              </div>
              <TokenSpec items={[
                { k: "Border", v: "1px solid rgba(48,50,53,0.4) / rgba(140,140,140,0.4)" },
                { k: "Padding", v: "8px 7px" }, { k: "Border Radius", v: "1px" },
                { k: "Font", v: "Manrope 600, 12px" }, { k: "Letter Spacing", v: "0.13em" }, { k: "Color", v: "#8E6C4A" },
              ]} />
            </ComponentSection>

            {/* Feature Cards */}
            <ComponentSection title="Feature Cards">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                {[
                  { title: "Personalised Invitation Page", sub: "Unique link · Your photo & names · Live countdown", body: "A stunning, mobile-first invitation built around you — your names, your photo, your story. Every detail designed to feel like it was made for your day." },
                  { title: "RSVP & Digital Cards", sub: "RSVP form · Personalised Pending Card · Confirmed Card", body: "Guests confirm their attendance in seconds. Each one instantly receives a personalised card with their details and status." },
                ].map((c, i) => (
                  <div key={i} style={{ background: "rgba(196,196,196,0.1)", border: "1px solid rgba(140,140,140,0.4)", borderRadius: 2, padding: "20px 10px" }}>
                    <div style={{ padding: "0 12px", marginBottom: 16 }}>
                      <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 24, lineHeight: "31px", color: "#D4CCBD", marginBottom: 6 }}>{c.title}</div>
                      <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12, lineHeight: "16px", letterSpacing: "-0.02em", color: "#8E6C4A" }}>{c.sub}</div>
                    </div>
                    <div style={{ padding: "0 12px", fontFamily: "'Manrope', sans-serif", fontSize: 14, fontWeight: 500, lineHeight: "19px", color: "#D7B980" }}>{c.body}</div>
                  </div>
                ))}
              </div>
            </ComponentSection>

            {/* FAQ Accordion */}
            <ComponentSection title="FAQ Accordion">
              {[
                { q: "Do I need to know anything technical?", a: "Not at all. You fill in a simple form and we build everything for you. You review it on your phone via a preview link. No technical knowledge needed." },
                { q: "How do guests receive their confirmation card?", a: "The moment a guest submits their RSVP, they receive a link to their personalised pending card. Once your planner confirms them, their card upgrades to a green Confirmed badge — downloadable as PNG or PDF." },
                { q: "Can I update the details after my invitation is live?", a: "Yes. Minor updates are included in all plans. Major redesigns are available based on your plan's revision allowance." },
              ].map((item, i) => (
                <div key={i} style={{ borderBottom: "1px solid #8E6C4A", marginBottom: 2 }}>
                  <div style={{ background: "#F7F3EE", borderRadius: 2, padding: "23px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: 18, lineHeight: "31px", color: "#231F20" }}>{item.q}</span>
                    <span style={{ fontSize: 20, color: "#8E6C4A", transform: faqOpen === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                  </div>
                  {faqOpen === i && (
                    <div style={{ padding: "4px 24px 20px", background: "#F7F3EE", fontFamily: "'Manrope', sans-serif", fontSize: 16, lineHeight: "22px", color: "#303235" }}>{item.a}</div>
                  )}
                </div>
              ))}
            </ComponentSection>

            {/* Pricing Card */}
            <ComponentSection title="Pricing Cards">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {[
                  { tier: "Starter", price: "TZS 150,000", desc: "The essentials, beautifully done.", bar: "#8E6C4A", features: ["Invitation page", "RSVP form", "Pending Card", "Basic dashboard", "Live for 3 months"] },
                  { tier: "Standard", price: "TZS 250,000", desc: "Everything in Starter, plus Confirmed Cards.", bar: "#303235", popular: true, features: ["Everything in Starter", "Confirmed Card", "Priority build (24h)", "2 rounds of revisions", "Live for 6 months"] },
                  { tier: "Premium", price: "TZS 400,000", desc: "Fully custom experience with account manager.", bar: "#8E6C4A", features: ["Custom theme colour", "Unlimited revisions", "WhatsApp account manager", "Live for 12 months", "Priority day support"] },
                ].map((p, i) => (
                  <div key={i} style={{ background: "rgba(196,196,196,0.1)", border: "1px solid rgba(140,140,140,0.4)", borderRadius: 2, padding: "28px 10px", position: "relative", overflow: "hidden" }}>
                    <div style={{ height: 4, background: p.bar, position: "absolute", top: 0, left: 0, right: 0 }}></div>
                    <div style={{ padding: "0 10px", marginBottom: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 24, color: "#8E6C4A" }}>{p.tier}</span>
                        {p.popular && <span style={{ background: "#8E6C4A", color: "#F7F3EE", fontSize: 8, fontWeight: 500, padding: "2px 5px", borderRadius: 1, letterSpacing: "-0.01em" }}>MOST POPULAR</span>}
                      </div>
                      <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: 28, letterSpacing: "-0.02em", color: "#303235", marginBottom: 8 }}>{p.price}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#383838", lineHeight: 1.4 }}>{p.desc}</div>
                    </div>
                    <div style={{ padding: "0 10px", marginTop: 16 }}>
                      {p.features.map(f => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderTop: "1px solid rgba(140,140,140,0.15)" }}>
                          <span style={{ color: "#8E6C4A", fontSize: 14 }}>✓</span>
                          <span style={{ fontSize: 13, color: "#8E6C4A", fontWeight: 400 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ComponentSection>
          </section>
        )}

        {/* ════ ACCESSIBILITY ════ */}
        {activeSection === "Accessibility" && (
          <section>
            <SectionTitle label="A11Y AUDIT" title="Accessibility & Contrast" subtitle="WCAG 2.1 contrast ratios for every colour pairing used across Timeless Vows. AA (4.5:1) required for normal text, 3:1 for large text (18px+ or 14px+ bold)." />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
              {contrastPairs.map(pair => {
                const ratio = getContrast(pair.fg, pair.bg);
                return (
                  <div key={pair.label} style={{ background: "#fff", border: "1px solid #EAEDF0", borderRadius: 8, overflow: "hidden" }}>
                    <div style={{ background: pair.bg, padding: "24px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: pair.fg, fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: 18 }}>Aa — Sample Text</span>
                    </div>
                    <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{pair.label}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af" }}>{pair.use}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af", fontFamily: "monospace", marginTop: 2 }}>{pair.fg} on {pair.bg}</div>
                      </div>
                      <ContrastBadge ratio={ratio} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Accessibility recommendations */}
            <h3 style={{ fontSize: 11, letterSpacing: "0.15em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 20 }}>⚠ Recommendations</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  severity: "warn",
                  title: "#8E6C4A on #F6F2EE fails AA for small text (~3.5:1)",
                  fix: "Use this pairing only for large text (18px+) or bold 14px+ — labels, section tags, and decorative elements. For body copy on cream, use #303235 or #231F20 instead. Alternatively, darken brand to #7A5A38 for AA compliance.",
                },
                {
                  severity: "warn",
                  title: "#D7B980 (Rich Gold) on #F6F2EE — insufficient for text",
                  fix: "Rich Gold (#D7B980) should never be used as readable text on light backgrounds. Reserve it for feature card body on dark (#222222 bg) only, where it passes ~3.8:1 for large text.",
                },
                {
                  severity: "ok",
                  title: "#303235 on #F6F2EE — passes AA at ~10:1",
                  fix: "This is your safe body text pairing on light sections. Use it for all paragraph copy, FAQ answers, and pricing descriptions.",
                },
                {
                  severity: "ok",
                  title: "#F7F3EE on #8E6C4A (button text) — passes AA at ~3.9:1",
                  fix: "This passes for large text. Since buttons use 16px+ Manrope 500, this is compliant. For smaller text in buttons, consider pure white (#FFFFFF) instead of off-white.",
                },
                {
                  severity: "tip",
                  title: "Add focus styles to all interactive elements",
                  fix: "Buttons and FAQ items need a visible :focus ring. Recommended: outline: 2px solid #D7B980; outline-offset: 2px; — the gold colour works well as a focus indicator on both light and dark backgrounds.",
                },
                {
                  severity: "tip",
                  title: "Reduce motion for accessibility",
                  fix: "Any entrance animations or card reveals should respect @media (prefers-reduced-motion: reduce). Framer Motion's useReducedMotion() hook handles this automatically.",
                },
              ].map((item, i) => (
                <div key={i} style={{ background: item.severity === "warn" ? "#fffbeb" : item.severity === "ok" ? "#f0fdf4" : "#eff6ff", border: `1px solid ${item.severity === "warn" ? "#fde68a" : item.severity === "ok" ? "#bbf7d0" : "#bfdbfe"}`, borderRadius: 8, padding: "16px 20px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 16, marginTop: 1 }}>{item.severity === "warn" ? "⚠️" : item.severity === "ok" ? "✅" : "💡"}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{item.fix}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ════ FONTS ════ */}
        {activeSection === "Fonts" && (
          <section>
            <SectionTitle label="FONT STRATEGY" title="Typography Recommendations" subtitle="Montas Light is a paid/demo font — here's our recommended Google Fonts strategy to keep the same feel without licensing issues." />

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                {
                  role: "Display / Headings (replaces Montas Light)",
                  recommended: "Cormorant Garamond",
                  import: "family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400",
                  why: "Near-identical vibe to Montas — ultra-light, elegant, editorial. Designed for fashion & luxury brands. Same hairline strokes, refined contrast, and high-end feel. Free on Google Fonts.",
                  sample: "Your wedding starts with the first impression.",
                  fontFamily: "'Cormorant Garamond', serif",
                  alt: "DM Serif Display",
                  altWhy: "Slightly more structured, great for the section headlines. More approachable but still premium.",
                },
                {
                  role: "Card Titles (Instrument Serif — keep as-is)",
                  recommended: "Instrument Serif",
                  import: "family=Instrument+Serif:ital@0;1",
                  why: "Instrument Serif is free on Google Fonts and already in the Figma. Beautiful, modern serif with graceful italics. Perfect for the card title role. Keep this one.",
                  sample: "Personalised Invitation Page",
                  fontFamily: "'Instrument Serif', serif",
                  italicSample: true,
                  alt: null,
                },
                {
                  role: "Body / UI (Manrope — keep as-is)",
                  recommended: "Manrope",
                  import: "family=Manrope:wght@300;400;500;600;700",
                  why: "Manrope is already in the Figma and is a superb geometric sans. Clean, modern, and works at every size from 12px labels to 32px pricing. Keep this one.",
                  sample: "A beautiful digital invitation. Real-time RSVPs. A personalised confirmation card every guest keeps.",
                  fontFamily: "'Manrope', sans-serif",
                  alt: null,
                },
              ].map((f, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #EAEDF0", borderRadius: 8, padding: 28 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "#8E6C4A", fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>{f.role}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24, alignItems: "start" }}>
                    <div>
                      <div style={{ fontFamily: f.fontFamily, fontSize: 32, fontWeight: 300, fontStyle: f.italicSample ? "italic" : "normal", color: "#231F20", lineHeight: 1.2, marginBottom: 16, letterSpacing: "-0.02em" }}>{f.sample}</div>
                      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, marginBottom: 12 }}>{f.why}</p>
                      {f.alt && <div style={{ fontSize: 12, color: "#9ca3af" }}>Alternate: <strong style={{ color: "#303235" }}>{f.alt}</strong> — {f.altWhy}</div>}
                    </div>
                    <div style={{ background: "#F6F2EE", borderRadius: 6, padding: 16 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>{f.recommended}</div>
                      <div style={{ background: "#231F20", borderRadius: 4, padding: "10px 12px", marginBottom: 10 }}>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#8E6C4A", lineHeight: 1.6, wordBreak: "break-all" }}>{`@import url('https://fonts.googleapis.com/css2?${f.import}&display=swap');`}</div>
                      </div>
                      <button onClick={() => copy(`@import url('https://fonts.googleapis.com/css2?${f.import}&display=swap');`)}
                        style={{ width: "100%", background: "#8E6C4A", color: "#F7F3EE", border: "none", borderRadius: 2, padding: "8px", fontSize: 12, fontFamily: "'Manrope', sans-serif", fontWeight: 500, cursor: "pointer" }}>
                        {copiedToken?.includes(f.import) ? "✓ Copied!" : "Copy @import"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Combined import */}
            <div style={{ background: "#231F20", borderRadius: 8, padding: 28, marginTop: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "#8E6C4A", fontWeight: 600, textTransform: "uppercase", marginBottom: 14 }}>Combined Google Fonts Import</div>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: "#D4CCBD", lineHeight: 1.8, wordBreak: "break-all", marginBottom: 16 }}>
                {`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700&display=swap');`}
              </div>
              <button onClick={() => copy(`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700&display=swap');`)}
                style={{ background: "#8E6C4A", color: "#F7F3EE", border: "none", borderRadius: 2, padding: "10px 20px", fontSize: 14, fontFamily: "'Manrope', sans-serif", fontWeight: 500, cursor: "pointer" }}>
                {copiedToken?.includes("Cormorant") ? "✓ Copied!" : "Copy Full Import"}
              </button>
            </div>
          </section>
        )}

        {/* ════ USAGE ════ */}
        {activeSection === "Usage" && (
          <section>
            <SectionTitle label="BRAND RULES" title="Do's & Don'ts" subtitle="Guidelines for maintaining brand consistency across all Timeless Vows touchpoints." />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <h3 style={{ fontSize: 11, letterSpacing: "0.15em", fontWeight: 600, color: "#166534", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>✅ Do</h3>
                {[
                  "Use Cormorant Garamond 300 (Light) for all display headings",
                  "Use letter-spacing: -0.02em on all headings",
                  "Use Instrument Serif italic for card titles only",
                  "Use border-radius: 1px on buttons — never round pills",
                  "Always pair the gold #D7B980 as feature text on dark (#222) backgrounds only",
                  "Use the pill component to label every section with UPPERCASE tracking text",
                  "Maintain 100px vertical padding between all major sections",
                  "Use #303235 for all body copy on cream/light backgrounds",
                  "Keep the CTA button at #8E6C4A with #F7F3EE text consistently",
                  "Keep card borders at rgba(140,140,140,0.4) — subtle, never harsh",
                  "Use 1512px as full-bleed width, 1280px as content container",
                ].map((rule, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "10px 14px", background: "#f0fdf4", borderRadius: 6, marginBottom: 8, fontSize: 13, lineHeight: 1.6, color: "#374151", border: "1px solid #bbf7d0" }}>
                    <span style={{ color: "#16a34a", flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 style={{ fontSize: 11, letterSpacing: "0.15em", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>❌ Don&apos;t</h3>
                {[
                  "Never use Inter as body font in the product UI — it's only in the Figma footer",
                  "Never use border-radius > 5px — this brand is architectural, not bubbly",
                  "Don't use gold (#D7B980) as readable body text on light backgrounds",
                  "Don't mix font weights in the same heading (no mixed bold + light)",
                  "Never use the brand brown (#8E6C4A) as a background colour for large areas",
                  "Don't use drop shadows — the brand relies on borders and transparency",
                  "Never use full black (#000000) for backgrounds — use #231F20 or #222222",
                  "Don't use bright white (#FFFFFF) as a background — only #F6F2EE or #F7F3EE",
                  "Never increase border-radius on buttons — the 1px is intentional",
                  "Don't use font-weight 700 (bold) for display/heading text — always 300 Light",
                  "Never use #8E6C4A as small body text on cream — it fails WCAG AA",
                ].map((rule, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "10px 14px", background: "#fff1f2", borderRadius: 6, marginBottom: 8, fontSize: 13, lineHeight: 1.6, color: "#374151", border: "1px solid #fecdd3" }}>
                    <span style={{ color: "#dc2626", flexShrink: 0, marginTop: 1 }}>✗</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tailwind CSS Variables */}
            <h3 style={{ fontSize: 11, letterSpacing: "0.15em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 20, marginTop: 48 }}>Tailwind Config Snippet</h3>
            <div style={{ background: "#231F20", borderRadius: 8, padding: 28 }}>
              <button onClick={() => copy(`// tailwind.config.js\ncolors: {\n  brand: {\n    brown: '#8E6C4A',\n    gold: '#D7B980',\n    'gold-light': '#C9A96E',\n  },\n  surface: {\n    dark: '#222222',\n    footer: '#231F20',\n    cream: '#F6F2EE',\n    white: '#F7F3EE',\n    border: 'rgba(140,140,140,0.4)',\n    card: 'rgba(196,196,196,0.1)',\n  },\n  text: {\n    dark: '#303235',\n    darkest: '#231F20',\n    muted: '#D4CCBD',\n    light: '#F7F3EE',\n  }\n}`)} style={{ float: "right", background: "#8E6C4A", color: "#F7F3EE", border: "none", borderRadius: 2, padding: "6px 14px", fontSize: 11, fontFamily: "'Manrope', sans-serif", cursor: "pointer", fontWeight: 500 }}>Copy</button>
              <pre style={{ fontFamily: "monospace", fontSize: 12, color: "#D4CCBD", lineHeight: 1.8, overflowX: "auto" }}>{`// tailwind.config.js
colors: {
  brand: {
    brown: '#8E6C4A',
    gold: '#D7B980',
    'gold-light': '#C9A96E',
  },
  surface: {
    dark: '#222222',
    footer: '#231F20',
    cream: '#F6F2EE',
    white: '#F7F3EE',
    border: 'rgba(140,140,140,0.4)',
    card: 'rgba(196,196,196,0.1)',
  },
  text: {
    dark: '#303235',
    darkest: '#231F20',
    muted: '#D4CCBD',
    light: '#F7F3EE',
  }
}`}</pre>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// ─── Helper Components ────────────────────────────────────────────────────────
function SectionTitle({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 11, letterSpacing: "0.18em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 48, letterSpacing: "-0.02em", color: "#231F20", lineHeight: 1.1, marginBottom: 14 }}>{title}</h2>
      <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 680, lineHeight: 1.7 }}>{subtitle}</p>
      <div style={{ width: 48, height: 1, background: "#D7B980", marginTop: 20 }}></div>
    </div>
  );
}

function ComponentSection({ title, children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h3 style={{ fontSize: 11, letterSpacing: "0.15em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 20 }}>{title}</h3>
      <div style={{ background: "#fff", border: "1px solid #EAEDF0", borderRadius: 8, padding: 28 }}>{children}</div>
    </div>
  );
}

function TokenSpec({ items }) {
  return (
    <div style={{ marginTop: 20, borderTop: "1px solid #EAEDF0", paddingTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
      {items.map(item => (
        <div key={item.k} style={{ background: "#F6F2EE", borderRadius: 4, padding: "4px 10px", fontSize: 11, color: "#374151" }}>
          <span style={{ color: "#8E6C4A", fontWeight: 600 }}>{item.k}:</span> <span style={{ fontFamily: "monospace" }}>{item.v}</span>
        </div>
      ))}
    </div>
  );
}
