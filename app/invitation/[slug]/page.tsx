"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";

/* ─────────────────────────────────────────────────────────────────────────────
   TIMELESS VOWS — Premium Invitation Page
   Couple: William George Mattao (Kinyemi) & Barke Semkiwa
───────────────────────────────────────────────────────────────────────────── */

const WEDDING = {
  groom: "William",
  bride: "Barke",
  dateDisplay: "02 May 2026",
  dateDisplayFull: "Saturday, 02 May 2026",
  targetDate: new Date("2026-05-02T14:00:00"),
  venue: "Dar es Salaam",
  programme: [
    { time: "12:00", label: "Mapokezi ya Wageni", eng: "Guest Arrival & Reception", icon: "🌸" },
    { time: "13:00", label: "Ibada ya Ndoa", eng: "Wedding Ceremony", icon: "💍" },
    { time: "14:30", label: "Picha za Ukumbusho", eng: "Photography Session", icon: "📸" },
    { time: "15:00", label: "Chakula cha Mchana", eng: "Wedding Luncheon", icon: "🍽️" },
    { time: "17:00", label: "Burudani & Muziki", eng: "Entertainment & Music", icon: "🎶" },
    { time: "20:00", label: "Kata Keki", eng: "Cake Cutting", icon: "🎂" },
    { time: "20:30", label: "Mwisho wa Sherehe", eng: "End of Celebrations", icon: "✨" },
  ],
  contributions: {
    intro: "Mchango wako ni baraka kubwa kwetu. Tunashukuru kwa upendo wako.",
    deadline: "15 April 2026",
    accounts: [
      { method: "CRDB Bank", number: "0152349021800", name: "Tayamika Mattao", icon: "🏦" },
      { method: "SELCOM / M-Pesa", number: "0762744714", name: "Tayamika Mattao", icon: "📱" },
      { method: "Airtel Money", number: "0784679300", name: "Lucy Chigudulu", icon: "📲" },
    ],
  }
};

const DRESS_PALETTE = [
  { name: "Charcoal Slate",  hex: "#5C5C5C", role: "Bwana / Gentlemen" },
  { name: "Sage Moss",       hex: "#7C8F74", role: "Bibi / Ladies" },
  { name: "Ivory White",     hex: "#F4F1EC", role: "Accents / Flowers" },
  { name: "Midnight Black",  hex: "#1E1E1E", role: "Shoes / Details" },
];

const CURTAIN_COLOR = "#1a1410";
const foldGradient = (base: string) => {
  const lighten = (hex: string, amt: number) => {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, ((n >> 16) & 255) + amt);
    const g = Math.min(255, ((n >> 8) & 255) + amt);
    const b = Math.min(255, ((n >> 0) & 255) + amt);
    return `rgb(${r},${g},${b})`;
  };
  const darken = (hex: string, amt: number) => lighten(hex, -amt);
  const l1 = lighten(base, 28); const l2 = lighten(base, 14);
  const d1 = darken(base, 22);  const d2 = darken(base, 38);
  return `linear-gradient(90deg, ${d2} 0%, ${l1} 3%, ${base} 6%, ${d1} 11%, ${l2} 16%, ${base} 20%, ${d2} 26%, ${l1} 30%, ${base} 34%, ${d1} 40%, ${l2} 45%, ${base} 50%, ${d2} 56%, ${l1} 61%, ${base} 65%, ${d1} 72%, ${l2} 78%, ${base} 83%, ${d2} 88%, ${l1} 93%, ${d1} 100%)`;
};

// ── Hooks ────────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      const diff = targetDate.getTime() - new Date().getTime();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible] as const;
}

// ── MAIN COMPONENT ───────────────────────────────────────────────
export default function InvitationPage() {
  const [opened, setOpened] = useState(false);
  const [phase, setPhase] = useState("idle");
  const countdown = useCountdown(WEDDING.targetDate);
  const [copied, setCopied] = useState<string | null>(null);
  const [scratchedCount, setScratchedCount] = useState(0);

  useEffect(() => {
    if (scratchedCount === 3) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, [scratchedCount]);

  const [rsvpState, setRsvpState] = useState({ 
    name: "", phone: "", seats: "1", attending: "", pledge: "", note: "", submitted: false, loading: false 
  });

  const programmeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: programmeRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    setTimeout(() => { setPhase("open"); setOpened(true); }, 1800);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpState(s => ({ ...s, loading: true }));
    setTimeout(() => setRsvpState(s => ({ ...s, loading: false, submitted: true })), 1800);
  };

  return (
    <div style ={{ fontFamily: "'Manrope', sans-serif", background: "#0e0c0a", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .curtain-left, .curtain-right {
          position: fixed; top: 0; bottom: 0; width: 50%; z-index: 9999;
          will-change: transform; transition: transform 1.6s cubic-bezier(0.68, -0.05, 0.27, 1.05);
        }
        .curtain-left  { left: 0;  transform-origin: left center; }
        .curtain-right { right: 0; transform-origin: right center; }
        .curtain-left.opening  { transform: translateX(-100%); }
        .curtain-right.opening { transform: translateX(100%); transition-delay: 0.06s; }
        .curtain-left.open  { transform: translateX(-100%); display: none; }
        .curtain-right.open { transform: translateX(100%); display: none; }

        .rope {
          position: absolute; bottom: 42%; width: 28px; height: 28px;
          border-radius: 50%; border: 3px solid #C9A96E;
          background: radial-gradient(circle at 35% 35%, #e8c97a, #8B6914);
          box-shadow: 0 2px 8px rgba(0,0,0,0.6), inset 0 1px 3px rgba(255,240,180,0.4);
          z-index: 10;
        }
        .tassel { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .tassel-cord { width: 2px; height: 18px; background: linear-gradient(180deg, #C9A96E, #8B6914); }
        .tassel-fringe { width: 18px; height: 12px; display: flex; gap: 2px; justify-content: center; }
        .tassel-fringe span { width: 2px; background: linear-gradient(180deg, #C9A96E, transparent); border-radius: 0 0 1px 1px; animation: swing 2s ease-in-out infinite; }
        .tassel-fringe span:nth-child(2) { animation-delay: 0.15s; height: 14px; }
        .tassel-fringe span:nth-child(3) { animation-delay: 0.3s;  height: 11px; }
        .tassel-fringe span:nth-child(4) { animation-delay: 0.1s;  height: 13px; }
        @keyframes swing { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }

        .valance {
          position: fixed; top: 0; left: 0; right: 0; height: 52px; z-index: 10000;
          background: linear-gradient(180deg, #0e0a07 0%, #1f1710 60%, #2a1f14 100%);
          border-bottom: 1px solid rgba(199,161,94,0.3);
          transition: transform 1s ease 1s;
        }
        .valance.open { transform: translateY(-100%); }

        @keyframes ripple { 0% { transform: scale(0.85); opacity: 0.7; } 100% { transform: scale(1.8); opacity: 0; } }
        .ripple-ring { position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid rgba(199,161,94,0.6); animation: ripple 1.8s ease-out infinite; }
        .ripple-ring:nth-child(2) { animation-delay: 0.6s; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-section { opacity: 0; transform: translateY(32px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .fade-section.visible { opacity: 1; transform: translateY(0); }

        .rsvp-input {
          width: 100%; padding: 14px 16px; border: 1px solid #D4CCBD; border-radius: 2px;
          font-family: 'Manrope', sans-serif; font-size: 15px; background: #fff; color: #231F20;
          transition: border-color 0.2s; outline: none;
        }
        .rsvp-input:focus { border-color: #8E6C4A; }
        .rsvp-label { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; color: #8E6C4A; text-transform: uppercase; margin-bottom: 8px; display: block; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════
          CURTAIN OVERLAY (Only visible initially)
      ════════════════════════════════════════════════════════════ */}
      <div className={`valance ${phase === "open" ? "open" : ""}`}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 9, letterSpacing: "0.3em", color: "rgba(199,161,94,0.7)", textTransform: "uppercase", fontWeight: 600 }}>Timeless Vows</div>
      </div>

      <div className={`curtain-left ${phase}`}>
        <div style={{ position: "absolute", inset: 0, background: foldGradient(CURTAIN_COLOR), boxShadow: "inset -20px 0 40px rgba(0,0,0,0.5)" }} />
        <div className="rope" style={{ right: 8 }}><div className="tassel"><div className="tassel-cord" /><div className="tassel-fringe"><span/><span/><span/><span/></div></div></div>
      </div>
      <div className={`curtain-right ${phase}`}>
        <div style={{ position: "absolute", inset: 0, background: foldGradient(CURTAIN_COLOR), transform: "scaleX(-1)", boxShadow: "inset 20px 0 40px rgba(0,0,0,0.5)" }} />
        <div className="rope" style={{ left: 8 }}><div className="tassel"><div className="tassel-cord" /><div className="tassel-fringe"><span/><span/><span/><span/></div></div></div>
      </div>

      {phase === "idle" && (
        <div onClick={handleOpen} style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10001, cursor: "pointer", textAlign: "center" }}>
          <div style={{ position: "relative", width: 72, height: 72, margin: "0 auto 16px" }}>
            <div className="ripple-ring" /><div className="ripple-ring" />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(30, 22, 14, 0.7)", border: "1.5px solid rgba(199,161,94,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 24 }}>✨</span>
            </div>
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(199,161,94,0.75)", textTransform: "uppercase", fontWeight: 600 }}>Tap to open</div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO
      ════════════════════════════════════════════════════════════ */}
      <section style={{ height: "100svh", position: "relative", background: "#231F20", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(199,161,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(199,161,94,0.05) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: "radial-gradient(circle, rgba(199,161,94,0.09) 0%, transparent 70%)" }} />
        
        <div style={{ position: "relative", textAlign: "center", padding: "0 24px" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.32em", color: "#8E6C4A", textTransform: "uppercase", marginBottom: 28, fontWeight: 600, animation: opened ? "fadeUp 0.7s ease 0.5s both" : "none" }}>
            You are cordially invited to celebrate the wedding of
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(56px, 14vw, 100px)", color: "#D4CCBD", lineHeight: 0.95, letterSpacing: "-0.02em", animation: opened ? "fadeUp 0.8s ease 0.7s both" : "none" }}>
            {WEDDING.groom}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(24px, 5vw, 36px)", color: "#C9A96E", letterSpacing: "0.08em", margin: "8px 0", animation: opened ? "fadeUp 0.7s ease 0.85s both" : "none" }}>
            &amp;
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(56px, 14vw, 100px)", color: "#D4CCBD", lineHeight: 0.95, letterSpacing: "-0.02em", animation: opened ? "fadeUp 0.8s ease 0.95s both" : "none" }}>
            {WEDDING.bride}
          </div>
          <div style={{ marginTop: 36, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(15px, 2.5vw, 19px)", color: "#C9A96E", opacity: 0.8, animation: opened ? "fadeUp 0.7s ease 1.15s both" : "none", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
            We would like to invite you to celebrate with us the most special day of our lives. It would be an honor to have you present at this important moment.
          </div>
          
          <div className="flex flex-col items-center" style={{ marginTop: 32, transform: "translateY(0.420252px)", animation: opened ? "fadeUp 0.7s ease 1.35s both" : "none" }}>
            <p className="font-display text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "#8E6C4A" }}>Scroll</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8E6C4A" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: 3-CIRCLE SCRATCH DATE REVEAL
      ════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ background: "#F6F2EE", padding: "100px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 12 }}>
              The Date
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 6vw, 48px)", color: "#231F20", marginBottom: 8, letterSpacing: "-0.02em" }}>
              Scratch to discover the date
            </h2>
            <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 18, color: "#8E6C4A", marginBottom: 48 }}>
              Use your finger or mouse to reveal
            </p>
            
            <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
              <ScratchCircle revealText="02" label="Day" onReveal={() => setScratchedCount(prev => prev + 1)} />
              <ScratchCircle revealText="May" label="Month" onReveal={() => setScratchedCount(prev => prev + 1)} />
              <ScratchCircle revealText="2026" label="Year" onReveal={() => setScratchedCount(prev => prev + 1)} />
            </div>

          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: COUNTDOWN & VENUE (Combined)
      ════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ background: "#231F20", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ position: "relative", padding: "60px 24px" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 12 }}>Until the Big Day</div>
            <div style={{ display: "flex", gap: "clamp(16px, 4vw, 48px)", justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hours" },
                { value: countdown.minutes, label: "Minutes" },
                { value: countdown.seconds, label: "Seconds" },
              ].map(({ value, label }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(48px, 10vw, 80px)", color: "#C9A96E", lineHeight: 1 }}>
                    {String(value ?? "—").padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#D4CCBD", opacity: 0.5, textTransform: "uppercase", marginTop: 8, fontWeight: 600 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* Venue Section Appended Directly Below Countdown */}
      <FadeSection>
        <section style={{ background: "#fff", padding: "80px 24px 100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8E6C4A", fontWeight: 600 }}>
              The celebration will take place at
            </p>
          </div>
          
          <div style={{ position: "relative", maxWidth: "600px", width: "100%", marginBottom: "40px" }}>
            <div style={{ position: "absolute", top: "-10px", right: "-10px", zIndex: 10 }}>
              <div style={{ padding: "8px 16px", borderRadius: "999px", background: "#8E6C4A", boxShadow: "0 4px 12px rgba(142,108,74,0.3)", maxWidth: "150px", textAlign: "center" }}>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", letterSpacing: "0.05em", color: "#fff", lineHeight: 1.2, display: "block" }}>
                  Extra: custom illustration of your venue
                </span>
              </div>
            </div>
            {/* The Custom Venue Illustration */}
            <img src="/venue-illustration.png" alt="Venue Illustration" style={{ width: "100%", height: "auto", borderRadius: "4px" }} />
          </div>

          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 6vw, 48px)", letterSpacing: "0.02em", color: "#231F20", fontWeight: 300 }}>
              Johari Rotana Hotel
            </h2>
          </div>

          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8E6C4A", marginBottom: "4px" }}>
              Sokoine Drive, 1234
            </p>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8E6C4A" }}>
              Dar es Salaam, Tanzania
            </p>
          </div>

          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 4vw, 32px)", letterSpacing: "0.02em", color: "#231F20" }}>
              {WEDDING.dateDisplayFull}
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "clamp(28px, 5vw, 36px)", color: "#8E6C4A" }}>
              Reception to Follow
            </p>
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: TRIM-PATH PROGRAMME TIMELINE (Stretched layout)
      ════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ background: "#F6F2EE", padding: "100px 24px" }}>
          <div style={{ maxWidth: 650, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.18em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 12 }}>Mpango wa Siku</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 5vw, 48px)", color: "#231F20", letterSpacing: "-0.02em" }}>
                The Wedding Programme
              </h2>
            </div>
            
            <div ref={programmeRef} style={{ position: "relative", paddingBottom: 20 }}>
              <div style={{ position: "absolute", left: 24, top: 10, bottom: 10, width: 2, background: "rgba(142,108,74,0.15)", borderRadius: 2 }} />
              <motion.div style={{ position: "absolute", left: 24, top: 10, width: 2, height: lineHeight, background: "#8E6C4A", borderRadius: 2, transformOrigin: "top" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {WEDDING.programme.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 24, alignItems: "center", position: "relative", zIndex: 10, width: "100%" }}>
                    <div style={{ width: 50, height: 50, background: "#fff", borderRadius: "50%", border: "2px solid #8E6C4A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    {/* Flex container pushing time to the far right */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed rgba(142,108,74,0.2)", paddingBottom: "12px" }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 16, color: "#231F20" }}>{item.label}</div>
                        <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 15, color: "#7C8F74", marginTop: 2 }}>{item.eng}</div>
                      </div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#8E6C4A", fontWeight: 400, flexShrink: 0, paddingLeft: 16 }}>
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: DRESS CODE (Custom Integration)
      ════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ background: "#fff", padding: "100px 24px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.22em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Manrope', sans-serif" }}>Mavazi</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 6vw, 52px)", color: "#231F20", letterSpacing: "-0.02em", marginBottom: 12 }}>
                Dress Code
              </h2>
              <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 18, color: "#7C8F74" }}>
                Elegant &amp; Formal — Mavazi ya Starehe na Rasmi
              </p>
              <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #C9A96E, transparent)", margin: "24px auto 0" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, alignItems: "start" }}>
              
              {/* Left: photo + colour palette */}
              <div>
                <div style={{
                  borderRadius: 4, overflow: "hidden", position: "relative",
                  border: "1px solid rgba(142,108,74,0.15)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                  aspectRatio: "3/4",
                  background: "#e8e4de",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {/* The Custom Dress Code Illustration */}
                  <img
                    src="/dresscode-illustration.png"
                    alt="Dress code inspiration — formal wedding attire"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                  />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "linear-gradient(0deg, rgba(35,31,32,0.85), transparent)" }}>
                    <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 14, color: "#D4CCBD" }}>
                      Inspiration attire
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
                  {DRESS_PALETTE.map((c, i) => (
                    <div key={i} style={{ background: "#F6F2EE", border: "1px solid #EAEDF0", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: 44, background: c.hex }} />
                      <div style={{ padding: "8px 10px" }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#231F20", marginBottom: 1 }}>{c.name}</div>
                        <div style={{ fontSize: 10, color: "#8E6C4A", fontFamily: "monospace" }}>{c.hex}</div>
                        <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{c.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: rules + attire breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <AttireCard
                  emoji="👔"
                  title="Bwana — Gentlemen"
                  color="#5C5C5C"
                  colorName="Charcoal Slate"
                  items={[
                    "Suit ya rangi ya charcoal au navy",
                    "Tie ya rangi ya sage green au ivory",
                    "Viatu vya leather visivyo vya michezo",
                    "Charcoal or navy suit",
                    "Sage green or ivory tie",
                    "Leather dress shoes"
                  ]}
                />
                <AttireCard
                  emoji="👗"
                  title="Bibi — Ladies"
                  color="#7C8F74"
                  colorName="Sage Moss"
                  items={[
                    "Gauni au sketi ya urefu wa chini / sherehe",
                    "Rangi zinazokubalika: sage, ivory, champagne, navy",
                    "Epuka rangi nyeupe kabisa",
                    "Formal gown or midi dress",
                    "Sage, ivory, champagne or navy palette",
                    "Please avoid pure white"
                  ]}
                />

                <div style={{ padding: "16px 18px", background: "rgba(124,143,116,0.08)", border: "1px solid rgba(124,143,116,0.25)", borderLeft: "3px solid #7C8F74", borderRadius: "0 4px 4px 0" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#7C8F74", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Note</div>
                  <p style={{ fontSize: 13, color: "#303235", lineHeight: 1.7 }}>
                    Smart casual inakubalika kwa watoto wadogo.<br />
                    <em style={{ color: "#6b7280" }}>Smart casual accepted for young children.</em>
                  </p>
                </div>

                <div style={{ background: "#231F20", borderRadius: 4, padding: "16px 18px" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8E6C4A", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Approved palette</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["#5C5C5C","#7C8F74","#F4F1EC","#1E1E1E","#C9A96E","#8E6C4A"].map(hex => (
                      <div key={hex} title={hex} style={{ flex: 1, height: 28, background: hex, borderRadius: 2, border: "1px solid rgba(255,255,255,0.06)" }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    {["Charcoal","Sage","Ivory","Black","Gold","Bronze"].map(n => (
                      <div key={n} style={{ flex: 1, fontSize: 8, color: "#D4CCBD", opacity: 0.4, textAlign: "center", letterSpacing: "0.05em" }}>{n}</div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: CONTRIBUTIONS
      ════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ background: "#231F20", padding: "100px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 5vw, 48px)", color: "#D4CCBD", marginBottom: 24 }}>
              Gifts &amp; Contributions
            </h2>
            <p style={{ fontSize: 15, color: "#D4CCBD", opacity: 0.7, lineHeight: 1.8, marginBottom: 40 }}>
              {WEDDING.contributions.intro} <br/> Tafadhali tuma mchango wako kabla ya {WEDDING.contributions.deadline}.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {WEDDING.contributions.accounts.map((acct, i) => (
                <div key={i} style={{ background: "rgba(199,161,94,0.06)", border: "1px solid rgba(199,161,94,0.2)", borderRadius: 4, padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 11, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 4 }}>{acct.method}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 20, color: "#D4CCBD" }}>{acct.number}</div>
                    <div style={{ fontSize: 13, color: "#D4CCBD", opacity: 0.6 }}>{acct.name}</div>
                  </div>
                  <button onClick={() => copyToClipboard(acct.number, acct.method)} style={{ background: copied === acct.method ? "#166534" : "#8E6C4A", color: "#F7F3EE", border: "none", borderRadius: 2, padding: "10px 20px", fontSize: 13, fontWeight: 600 }}>
                    {copied === acct.method ? "Copied!" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: RSVP FORM
      ════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ background: "#F6F2EE", padding: "100px 24px" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.18em", fontWeight: 600, color: "#8E6C4A", textTransform: "uppercase", marginBottom: 12 }}>Confirm Your Attendance</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 5vw, 48px)", color: "#231F20", letterSpacing: "-0.02em", marginBottom: 12 }}>
                Will you join us?
              </h2>
              <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 16, color: "#8E6C4A" }}>
                Tafadhali thibitisha uwepo wako
              </p>
            </div>

            {rsvpState.submitted ? (
              <div style={{ textAlign: "center", padding: "60px 24px", animation: "fadeUp 0.6s ease both", background: "#fff", borderRadius: 4, border: "1px solid #EAEDF0" }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>💌</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 36, color: "#231F20", marginBottom: 12 }}>
                  Asante sana!
                </h3>
                <p style={{ fontSize: 15, color: "#303235", lineHeight: 1.7 }}>
                  Thank you, your RSVP has been received.<br />
                  Your personalised card will arrive shortly.
                </p>
                <div style={{ marginTop: 20, fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "#8E6C4A", fontSize: 16 }}>
                  With love, {WEDDING.groom} &amp; {WEDDING.bride}
                </div>
              </div>
            ) : (
              <form onSubmit={handleRsvp} style={{ display: "flex", flexDirection: "column", gap: 20, background: "#fff", padding: "32px", borderRadius: 4, border: "1px solid #EAEDF0", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
                <div>
                  <label className="rsvp-label">Full Name *</label>
                  <input className="rsvp-input" placeholder="Jina lako kamili" required
                    value={rsvpState.name} onChange={e => setRsvpState(s => ({ ...s, name: e.target.value }))} />
                </div>
                <div>
                  <label className="rsvp-label">Phone Number (for your card)</label>
                  <input className="rsvp-input" placeholder="e.g. 0712 345 678" type="tel" required
                    value={rsvpState.phone} onChange={e => setRsvpState(s => ({ ...s, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="rsvp-label">Will you attend? *</label>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[
                      { value: "yes", label: "✓ Yes, I'll be there!", emoji: "🎉" },
                      { value: "no", label: "✗ Can't make it", emoji: "😔" },
                    ].map(opt => (
                      <button key={opt.value} type="button"
                        onClick={() => setRsvpState(s => ({ ...s, attending: opt.value }))}
                        style={{ flex: 1, padding: "14px", border: `1px solid ${rsvpState.attending === opt.value ? "#8E6C4A" : "#D4CCBD"}`, borderRadius: 2, background: rsvpState.attending === opt.value ? "rgba(142,108,74,0.1)" : "#fff", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: 13, fontWeight: 500, color: rsvpState.attending === opt.value ? "#8E6C4A" : "#303235", transition: "all 0.2s" }}>
                        {opt.emoji} {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label className="rsvp-label">Number of seats</label>
                    <select className="rsvp-input" value={rsvpState.seats}
                      onChange={e => setRsvpState(s => ({ ...s, seats: e.target.value }))}>
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={String(n)}>{n} {n === 1 ? "seat" : "seats"}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="rsvp-label">Pledge (TZS)</label>
                    <input className="rsvp-input" placeholder="Optional" type="number"
                      value={rsvpState.pledge} onChange={e => setRsvpState(s => ({ ...s, pledge: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="rsvp-label">Message for the couple</label>
                  <textarea className="rsvp-input" placeholder="Bariki maneno yako / Share your blessings…" rows={3}
                    style={{ resize: "none" }}
                    value={rsvpState.note} onChange={e => setRsvpState(s => ({ ...s, note: e.target.value }))} />
                </div>
                <button type="submit" disabled={rsvpState.loading || !rsvpState.attending || !rsvpState.name || !rsvpState.phone}
                  style={{ padding: "16px", background: rsvpState.loading ? "#9ca3af" : "#8E6C4A", color: "#F7F3EE", border: "none", borderRadius: 2, fontSize: 16, fontWeight: 600, fontFamily: "'Manrope', sans-serif", letterSpacing: "-0.01em", cursor: rsvpState.loading || !rsvpState.attending || !rsvpState.name || !rsvpState.phone ? "not-allowed" : "pointer", transition: "all 0.2s", marginTop: 8 }}>
                  {rsvpState.loading ? "Sending…" : "Confirm Attendance →"}
                </button>
                <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", lineHeight: 1.6 }}>
                  You will receive a personalised digital pending card immediately after submitting.
                </p>
              </form>
            )}
          </div>
        </section>
      </FadeSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: THANK YOU
      ════════════════════════════════════════════════════════════ */}
      <FadeSection>
        <section style={{ background: "#231F20", padding: "120px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(199,161,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(199,161,94,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: "#8E6C4A", marginBottom: 24, letterSpacing: "0.1em" }}>
              — Thank You —
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 7vw, 56px)", color: "#D4CCBD", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 32 }}>
              For joining us on<br />this special day.
            </h2>
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #C9A96E, transparent)", margin: "0 auto 32px" }} />
            <p style={{ fontSize: 14, color: "#D4CCBD", opacity: 0.6, lineHeight: 1.9, marginBottom: 40 }}>
              Your presence is the best gift we could receive.<br />
              Uwepo wako ndio zawadi bora zaidi kwetu.
            </p>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 8vw, 60px)", fontWeight: 300, color: "#C9A96E", letterSpacing: "-0.02em" }}>
              {WEDDING.groom} &amp; {WEDDING.bride}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ── Footer ── */}
      <footer style={{ background: "#1a1718", padding: "24px", textAlign: "center", borderTop: "1px solid rgba(199,161,94,0.1)" }}>
        <div style={{ fontSize: 11, color: "#8E6C4A", letterSpacing: "0.12em", opacity: 0.7 }}>
          Crafted with love by <strong>Timeless Vows</strong> · timelessvows.co.tz
        </div>
      </footer>

    </div>
  );
}

// ── Components ───────────────────────────────────────────────────

function AttireCard({ emoji, title, color, colorName, items }: { emoji: string, title: string, color: string, colorName: string, items: string[] }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #EAEDF0", borderRadius: 4, overflow: "hidden" }}>
      <div style={{ background: color, height: 4 }} />
      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 2, background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{emoji}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#231F20" }}>{title}</div>
            <div style={{ fontSize: 11, color, fontFamily: "monospace" }}>{colorName}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {items.map((item, i) => {
            const isEnglish = i >= items.length / 2;
            const isDivider = i === items.length / 2;
            return (
              <div key={i} style={{ 
                display: "flex", gap: 8, alignItems: "flex-start", 
                fontSize: 12, color: !isEnglish ? "#303235" : "#6b7280",
                fontStyle: isEnglish ? "italic" : "normal",
                borderTop: isDivider ? "1px dashed #EAEDF0" : "none",
                paddingTop: isDivider ? 8 : 0,
                marginTop: isDivider ? 4 : 0,
                lineHeight: 1.5 
              }}>
                <span style={{ color, flexShrink: 0, marginTop: 2 }}>·</span>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FadeSection({ children }: { children: React.ReactNode }) {
  const [ref, visible] = useFadeIn();
  return <div ref={ref as any} className={`fade-section${visible ? " visible" : ""}`}>{children}</div>;
}

function ScratchCircle({ revealText, label, onReveal }: { revealText: string, label: string, onReveal?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const revealedRef = useRef(false);
  const size = 120; 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#D7B980");
    gradient.addColorStop(0.5, "#8E6C4A");
    gradient.addColorStop(1, "#C9A96E");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨", size / 2, size / 2);
  }, [size]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched || revealedRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2); 
    ctx.fill();

    if (Math.random() > 0.96) {
      revealedRef.current = true;
      setIsScratched(true);
      if (onReveal) onReveal();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <div style={{ position: "relative", width: size, height: size, borderRadius: "50%", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(142,108,74,0.2)" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, color: "#8E6C4A", fontWeight: 400 }}>
          {revealText}
        </div>
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          style={{
            position: "absolute", top: 0, left: 0, touchAction: "none", cursor: "pointer",
            opacity: isScratched ? 0 : 1, transition: "opacity 0.8s ease",
            pointerEvents: isScratched ? "none" : "auto"
          }}
          onPointerDown={(e) => { setIsDrawing(true); handlePointerMove(e); }}
          onPointerMove={handlePointerMove}
          onPointerUp={() => setIsDrawing(false)}
          onPointerLeave={() => setIsDrawing(false)}
        />
      </div>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8E6C4A", textTransform: "uppercase", fontWeight: 600, opacity: isScratched ? 1 : 0.4, transition: "opacity 0.8s ease" }}>
        {label}
      </div>
    </div>
  );
}