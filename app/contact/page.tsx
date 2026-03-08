"use client";

import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
// IMPORT YOUR COMPONENTS HERE IF YOU HAVE THEM EXTRACTED:
// import Navbar from "@/components/Navbar"; 
// import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────────────────────────
   TIMELESS VOWS — Contact / Inquiry Page
   Route: /contact
─────────────────────────────────────────────────────────────────── */

const PACKAGES = [
  { id: "starter",  label: "Starter",  price: "TZS 150,000", desc: "Invitation · RSVP · Pending Card" },
  { id: "standard", label: "Standard", price: "TZS 250,000", desc: "Everything + Confirmed Card", popular: true },
  { id: "premium",  label: "Premium",  price: "TZS 400,000", desc: "Fully custom + Account Manager" },
  { id: "unsure",   label: "Not sure yet", price: "", desc: "Help me choose" },
];

const CITIES = ["Dar es Salaam", "Zanzibar", "Arusha", "Mwanza", "Dodoma", "Moshi", "Other"];

function useFadeIn(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
        { threshold: 0.1 }
      );
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);
  return [ref, visible];
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    bride: "", groom: "",
    wedding_date: "", city: "", guests: "", package: "", message: "", referral: ""
  });
  const [step, setStep]           = useState(1); 
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [touched, setTouched]     = useState<Record<string, boolean>>({});

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const touch = (k: string) => setTouched(t => ({ ...t, [k]: true }));

  const step1Valid = form.name && form.phone;
  const step2Valid = form.wedding_date && form.city && form.package;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In production: POST /api/inquiries
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const whatsappMsg = encodeURIComponent(
    `Hello Timeless Vows! 👋\nI'd like to enquire about a wedding invitation.\n\nNames: ${form.bride || "—"} & ${form.groom || "—"}\nDate: ${form.wedding_date || "TBD"}\nCity: ${form.city || "TBD"}\nPackage: ${form.package || "Not sure yet"}\n\nLooking forward to hearing from you!`
  );

  const [heroRef, heroVisible] = useFadeIn(100);
  const [formRef, formVisible] = useFadeIn(200);

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", minHeight: "100vh", background: "#F6F2EE", display: "flex", flexDirection: "column" }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── scrollbar ── */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F6F2EE; }
        ::-webkit-scrollbar-thumb { background: #D4CCBD; border-radius: 2px; }

        /* ── page fade ── */
        @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes shimmer  {
          0%,100% { background-position: 200% center; }
          50%      { background-position: 0% center; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes confetti {
          0%   { transform: translateY(0) rotate(0deg) scale(1); opacity:1; }
          100% { transform: translateY(-80px) rotate(720deg) scale(0); opacity:0; }
        }

        .fade-up   { opacity:0; animation: fadeUp   0.7s ease both; }
        .fade-left { opacity:0; animation: fadeLeft 0.7s ease both; }

        /* ── inputs ── */
        .tv-input {
          width: 100%; padding: 13px 16px;
          border: 1px solid #D4CCBD; border-radius: 2px;
          font-family: 'Manrope', sans-serif; font-size: 14px;
          background: #fff; color: #231F20;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }
        .tv-input:focus { border-color: #8E6C4A; box-shadow: 0 0 0 3px rgba(142,108,74,0.1); }
        .tv-input::placeholder { color: #C4B99A; }
        .tv-input.error { border-color: #dc2626; }

        /* ── package cards ── */
        .pkg-card {
          border: 1px solid #D4CCBD; border-radius: 2px; padding: 14px 16px;
          cursor: pointer; transition: all 0.2s; background: #fff;
          position: relative; overflow: hidden;
        }
        .pkg-card:hover  { border-color: #8E6C4A; background: rgba(142,108,74,0.03); }
        .pkg-card.active { border-color: #8E6C4A; background: rgba(142,108,74,0.06); box-shadow: 0 0 0 1px #8E6C4A; }

        .step-dot {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; transition: all 0.3s;
        }

        .submit-btn {
          width: 100%; padding: 16px;
          background: #8E6C4A; color: #F7F3EE;
          border: none; border-radius: 2px; cursor: pointer;
          font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 600;
          letter-spacing: -0.01em; transition: background 0.2s, transform 0.1s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .submit-btn:hover:not(:disabled) { background: #7A5A38; transform: translateY(-1px); }
        .submit-btn:disabled { background: #C4B99A; cursor: not-allowed; }

        .wa-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 24px; border-radius: 2px;
          background: #25D366; color: #fff;
          border: none; cursor: pointer; font-family: 'Manrope', sans-serif;
          font-size: 14px; font-weight: 600; text-decoration: none;
          transition: background 0.2s, transform 0.1s;
        }
        .wa-btn:hover { background: #1ebe5b; transform: translateY(-1px); }

        .gold-line {
          background: linear-gradient(90deg, transparent 0%, #C9A96E 20%, #D7B980 50%, #C9A96E 80%, transparent 100%);
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }

        select.tv-input { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238E6C4A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
        textarea.tv-input { resize: none; min-height: 100px; line-height: 1.6; }
        
        /* ── RESPONSIVE LAYOUT (Adjusted for external Navbar/Footer) ── */
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr;
          /* Assumes your landing page navbar is roughly 80px tall */
          padding-top: 80px; 
          flex-grow: 1;
        }
        .left-panel {
          background: #231F20;
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .right-panel {
          padding: 40px 24px 80px;
        }

        @media (min-width: 1024px) {
          .contact-layout {
            grid-template-columns: 1fr 1fr;
          }
          .left-panel {
            position: sticky;
            /* Sticky top accounts for the 80px Navbar so it doesn't tuck underneath */
            top: 80px; 
            /* Height is viewport minus the Navbar */
            height: calc(100vh - 80px);
            padding: 64px 56px;
            overflow-y: auto;
          }
          .right-panel {
            padding: 64px 52px 80px;
          }
        }
      `}} />

      {/* ── LANDING PAGE NAVBAR ─────────────────────────────── */}
      {/* <Navbar /> */}
      {/* PASTE YOUR LANDING PAGE NAVBAR CODE HERE IF NOT USING A COMPONENT */}


      {/* ── HERO SPLIT LAYOUT ───────────────────────────────── */}
      <div className="contact-layout">

        {/* LEFT PANEL — dark editorial */}
        <div ref={heroRef as any} className="left-panel" style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.8s ease 0.1s" }}>
          {/* Grid bg */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(199,161,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(199,161,94,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

          <div style={{ position: "relative" }}>
            <div className="fade-up" style={{ animationDelay: "0.2s", fontSize: 10, letterSpacing: "0.3em", color: "#8E6C4A", textTransform: "uppercase", fontWeight: 600, marginBottom: 28 }}>
              Begin Your Story
            </div>
            <h1 className="fade-up" style={{ animationDelay: "0.35s", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(36px, 3.5vw, 52px)", color: "#D4CCBD", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 28 }}>
              Let's create something<br />
              <em style={{ color: "#C9A96E", fontStyle: "italic" }}>truly unforgettable.</em>
            </h1>
            <div className="fade-up gold-line" style={{ animationDelay: "0.5s", height: 1, width: 64, marginBottom: 28 }} />
            <p className="fade-up" style={{ animationDelay: "0.6s", fontSize: 14, color: "#D4CCBD", opacity: 0.65, lineHeight: 1.85, marginBottom: 40, maxWidth: 360 }}>
              Tell us about your day and we'll be in touch within a few hours — usually on WhatsApp. Most invitations are ready within 48 hours of approval.
            </p>

            <div className="fade-up" style={{ animationDelay: "0.75s" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8E6C4A", textTransform: "uppercase", fontWeight: 600, marginBottom: 18 }}>What happens next</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { n: "01", t: "We review your enquiry",       d: "Usually within 2–4 hours" },
                  { n: "02", t: "You get a WhatsApp from us",   d: "We confirm details & send the form" },
                  { n: "03", t: "We build your invitation",     d: "Preview link in 48 hours" },
                  { n: "04", t: "You approve & share",          d: "One link. That's all." },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 0", borderBottom: i < 3 ? "1px solid rgba(212,204,189,0.08)" : "none" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#8E6C4A", opacity: 0.7, minWidth: 24, paddingTop: 2 }}>{s.n}</div>
                    <div>
                      <div style={{ fontSize: 13, color: "#D4CCBD", fontWeight: 500, marginBottom: 2 }}>{s.t}</div>
                      <div style={{ fontSize: 11, color: "#D4CCBD", opacity: 0.4 }}>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fade-up" style={{ animationDelay: "1s", position: "relative", paddingTop: 32, borderTop: "1px solid rgba(212,204,189,0.12)" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8E6C4A", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Prefer to chat directly?</div>
            <a href={`https://wa.me/255XXXXXXXXX?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{ marginBottom: 16 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Open WhatsApp
            </a>
            <div style={{ fontSize: 11, color: "#D4CCBD", opacity: 0.35, lineHeight: 1.7 }}>
              timelessvows.co.tz<br />
              Dar es Salaam, Tanzania
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — form */}
        <div ref={formRef as any} className="right-panel" style={{ opacity: formVisible ? 1 : 0, transition: "opacity 0.8s ease 0.3s" }}>
          {submitted ? (
            <SuccessState name={form.name} whatsappMsg={whatsappMsg} />
          ) : (
            <div>
              <StepIndicator step={step} />
              <form onSubmit={handleSubmit} style={{ marginTop: 40 }}>

                {/* ── STEP 1: Your Details ── */}
                {step === 1 && (
                  <div className="fade-up" style={{ animationDelay: "0.1s" }}>
                    <SectionTitle n="01" title="Your Details" sub="Tell us who you are so we can reach you." />
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <Field label="Your Full Name *" error={touched.name && !form.name}>
                        <input className={`tv-input${touched.name && !form.name ? " error" : ""}`}
                          placeholder="e.g. Amina Khalid" value={form.name} onChange={e => set("name", e.target.value)} onBlur={() => touch("name")} />
                      </Field>
                      <Field label="WhatsApp Number *" hint="We'll reach you here first" error={touched.phone && !form.phone}>
                        <div style={{ position: "relative" }}>
                          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#8E6C4A", fontWeight: 600 }}>+255</div>
                          <input className={`tv-input${touched.phone && !form.phone ? " error" : ""}`} style={{ paddingLeft: 50 }} placeholder="712 345 678" type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} onBlur={() => touch("phone")} />
                        </div>
                      </Field>
                      <Field label="Email Address" hint="Optional — for sending your invoice">
                        <input className="tv-input" placeholder="your@email.com" type="email" value={form.email} onChange={e => set("email", e.target.value)} />
                      </Field>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <Field label="Bride's Name"><input className="tv-input" placeholder="Her name" value={form.bride} onChange={e => set("bride", e.target.value)} /></Field>
                        <Field label="Groom's Name"><input className="tv-input" placeholder="His name" value={form.groom} onChange={e => set("groom", e.target.value)} /></Field>
                      </div>
                    </div>
                    <StepNav onNext={() => setStep(2)} nextDisabled={!step1Valid} nextLabel="Next: Wedding Details →" />
                  </div>
                )}

                {/* ── STEP 2: Wedding Details ── */}
                {step === 2 && (
                  <div className="fade-up" style={{ animationDelay: "0.1s" }}>
                    <SectionTitle n="02" title="Wedding Details" sub="Help us understand your day." />
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <Field label="Wedding Date *" error={touched.wedding_date && !form.wedding_date}>
                          <input className={`tv-input${touched.wedding_date && !form.wedding_date ? " error" : ""}`} type="date" value={form.wedding_date} min={new Date().toISOString().split("T")[0]} onChange={e => set("wedding_date", e.target.value)} onBlur={() => touch("wedding_date")} />
                        </Field>
                        <Field label="City / Location *" error={touched.city && !form.city}>
                          <select className={`tv-input${touched.city && !form.city ? " error" : ""}`} value={form.city} onChange={e => set("city", e.target.value)} onBlur={() => touch("city")}>
                            <option value="">Select city…</option>
                            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </Field>
                      </div>
                      <Field label="Estimated Guest Count">
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {["Under 50", "50–100", "100–200", "200–400", "400+"].map(opt => (
                            <button key={opt} type="button" onClick={() => set("guests", opt)} style={{ padding: "8px 14px", border: `1px solid ${form.guests === opt ? "#8E6C4A" : "#D4CCBD"}`, borderRadius: 2, background: form.guests === opt ? "rgba(142,108,74,0.08)" : "#fff", cursor: "pointer", fontSize: 12, fontFamily: "'Manrope', sans-serif", fontWeight: 500, color: form.guests === opt ? "#8E6C4A" : "#303235", transition: "all 0.15s" }}>{opt}</button>
                          ))}
                        </div>
                      </Field>
                      <Field label="Which package interests you? *" error={touched.package && !form.package}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          {PACKAGES.map(pkg => (
                            <div key={pkg.id} className={`pkg-card${form.package === pkg.id ? " active" : ""}`} onClick={() => { set("package", pkg.id); touch("package"); }}>
                              {pkg.popular && <div style={{ position: "absolute", top: 10, right: 12, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#F7F3EE", background: "#8E6C4A", padding: "2px 7px", borderRadius: 1 }}>POPULAR</div>}
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${form.package === pkg.id ? "#8E6C4A" : "#D4CCBD"}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                                  {form.package === pkg.id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#8E6C4A" }} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 600, fontSize: 14, color: "#231F20" }}>{pkg.label}</span>{pkg.price && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#8E6C4A", fontWeight: 400 }}>{pkg.price}</span>}</div>
                                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{pkg.desc}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Field>
                    </div>
                    <StepNav onBack={() => setStep(1)} onNext={() => setStep(3)} nextDisabled={!step2Valid} nextLabel="Next: Your Message →" />
                  </div>
                )}

                {/* ── STEP 3: Message ── */}
                {step === 3 && (
                  <div className="fade-up" style={{ animationDelay: "0.1s" }}>
                    <SectionTitle n="03" title="Anything Else?" sub="Tell us what you have in mind for your invitation." />
                    <div style={{ background: "#231F20", borderRadius: 4, padding: "18px 20px", marginBottom: 24, border: "1px solid rgba(199,161,94,0.12)" }}>
                      <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8E6C4A", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Your enquiry summary</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {[
                          { k: "Contact",  v: form.name },
                          { k: "Phone",    v: `+255 ${form.phone}` },
                          { k: "Couple",   v: form.bride && form.groom ? `${form.bride} & ${form.groom}` : "—" },
                          { k: "Date",     v: form.wedding_date ? new Date(form.wedding_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "—" },
                          { k: "City",     v: form.city || "—" },
                          { k: "Package",  v: PACKAGES.find(p => p.id === form.package)?.label || "—" },
                        ].map(({ k, v }) => (
                          <div key={k}>
                            <div style={{ fontSize: 10, color: "#8E6C4A", opacity: 0.6, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{k}</div>
                            <div style={{ fontSize: 13, color: "#D4CCBD", fontWeight: 500 }}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      <Field label="Your Message" hint="Theme colours, special requests, questions — anything helps">
                        <textarea className="tv-input" placeholder="e.g. We'd like a dark theme with gold accents. Our wedding colours are emerald and gold…" value={form.message} onChange={e => set("message", e.target.value)} style={{ minHeight: 120 }} />
                      </Field>
                      <Field label="How did you hear about us?">
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {["Instagram", "WhatsApp", "Friend/Family", "Google", "Wedding planner", "Other"].map(opt => (
                            <button key={opt} type="button" onClick={() => set("referral", opt)} style={{ padding: "7px 12px", border: `1px solid ${form.referral === opt ? "#8E6C4A" : "#D4CCBD"}`, borderRadius: 2, background: form.referral === opt ? "rgba(142,108,74,0.08)" : "#fff", cursor: "pointer", fontSize: 11, fontFamily: "'Manrope', sans-serif", fontWeight: 500, color: form.referral === opt ? "#8E6C4A" : "#303235", transition: "all 0.15s" }}>{opt}</button>
                          ))}
                        </div>
                      </Field>
                    </div>
                    <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
                      <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? (<><svg width="16" height="16" viewBox="0 0 16 16" style={{ animation: "spin 0.8s linear infinite" }}><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none"/><path d="M8 2 A6 6 0 0 1 14 8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>Sending your enquiry…</>) : (<>Send Enquiry →</>)}
                      </button>
                    </div>
                    <button type="button" onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "#9ca3af", fontSize: 12, cursor: "pointer", marginTop: 16, fontFamily: "'Manrope', sans-serif" }}>← Back</button>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>

      {/* ── FAQ STRIP ─────────────────────────────────────────── */}
      {!submitted && (
        <div style={{ background: "#fff", borderTop: "1px solid #EAEDF0", padding: "64px 48px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#8E6C4A", textTransform: "uppercase", fontWeight: 600, marginBottom: 32 }}>Quick Answers</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 32 }}>
              {[
                { q: "How fast will you respond?",     a: "Usually within 2–4 hours on WhatsApp. During peak periods, within 12 hours." },
                { q: "Do I need technical knowledge?", a: "None at all. You fill a simple form. We build everything. You just review and share." },
                { q: "Can I see a sample first?",      a: "Yes — visit timelessvows.co.tz/demo for a live sample invitation." },
              ].map(({ q, a }) => (
                <div key={q} style={{ borderTop: "1px solid #EAEDF0", paddingTop: 20 }}>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 16, color: "#231F20", marginBottom: 10 }}>{q}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>{a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── LANDING PAGE FOOTER ─────────────────────────────── */}
      {/* <Footer /> */}
      {/* PASTE YOUR LANDING PAGE FOOTER CODE HERE IF NOT USING A COMPONENT */}
      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}

/* ── Helper Components ────────────────────────────────────────── */

function StepIndicator({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 8 }}>
      {[1, 2, 3].map((n, i) => (
        <div key={n} style={{ display: "flex", alignItems: "center" }}>
          <div className="step-dot" style={{
            background: step >= n ? "#231F20" : "#F6F2EE",
            border: `1.5px solid ${step >= n ? "#8E6C4A" : "#D4CCBD"}`,
            color: step >= n ? "#C9A96E" : "#9ca3af",
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600, fontSize: 13,
          }}>
            {step > n ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : n}
          </div>
          {i < 2 && (
            <div style={{ width: 40, height: 1, background: step > n ? "#8E6C4A" : "#EAEDF0", transition: "background 0.3s" }} />
          )}
        </div>
      ))}
      <div style={{ marginLeft: 14, fontSize: 12, color: "#8E6C4A", fontWeight: 500 }}>
        Step {step} of 3
      </div>
    </div>
  );
}

function SectionTitle({ n, title, sub }: { n: string, title: string, sub: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#C9A96E", opacity: 0.7 }}>{n}</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 28, color: "#231F20", letterSpacing: "-0.01em" }}>{title}</h2>
      </div>
      <p style={{ fontSize: 13, color: "#9ca3af" }}>{sub}</p>
    </div>
  );
}

function Field({ label, hint, error, children }: { label: string, hint?: string, error?: boolean, children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: error ? "#dc2626" : "#8E6C4A", textTransform: "uppercase", marginBottom: 8 }}>
        {label}
        {hint && <span style={{ fontWeight: 400, letterSpacing: 0, textTransform: "none", color: "#9ca3af", marginLeft: 8, fontSize: 11 }}>{hint}</span>}
      </label>
      {children}
      {error && <div style={{ fontSize: 11, color: "#dc2626", marginTop: 5 }}>This field is required</div>}
    </div>
  );
}

function StepNav({ onBack, onNext, nextDisabled, nextLabel }: { onBack?: () => void, onNext: () => void, nextDisabled: boolean, nextLabel: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
      {onBack ? (
        <button type="button" onClick={onBack}
          style={{ background: "none", border: "none", color: "#9ca3af", fontSize: 13, cursor: "pointer", fontFamily: "'Manrope', sans-serif", padding: "8px 0" }}>
          ← Back
        </button>
      ) : <div />}
      <button type="button" onClick={onNext} disabled={nextDisabled}
        style={{ padding: "12px 28px", background: nextDisabled ? "#F6F2EE" : "#231F20", color: nextDisabled ? "#C4B99A" : "#D4CCBD", border: `1px solid ${nextDisabled ? "#D4CCBD" : "#231F20"}`, borderRadius: 2, cursor: nextDisabled ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Manrope', sans-serif", letterSpacing: "-0.01em", transition: "all 0.2s" }}>
        {nextLabel}
      </button>
    </div>
  );
}

function SuccessState({ name, whatsappMsg }: { name: string, whatsappMsg: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 480, textAlign: "center", padding: "40px 0" }}>
      <div style={{ position: "relative", width: 80, height: 80, marginBottom: 32 }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "1px solid rgba(199,161,94,0.3)",
            animation: `confetti 1.2s ease ${i * 0.2}s both`,
            transform: `scale(${i})`,
          }} />
        ))}
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#231F20", border: "1.5px solid #C9A96E", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 36, color: "#231F20", letterSpacing: "-0.02em", marginBottom: 12, animation: "fadeUp 0.6s ease 0.3s both", opacity: 0 }}>
        Asante, {name.split(" ")[0]}!
      </div>
      <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.8, maxWidth: 380, marginBottom: 32, animation: "fadeUp 0.6s ease 0.5s both", opacity: 0 }}>
        We've received your enquiry and will be in touch on WhatsApp within a few hours. We can't wait to start building your invitation.
      </div>
    </div>
  );
}