// ─────────────────────────────────────────────────────────────────────
// FILE PATH: app/components/premium/CountdownFooter.tsx
// Background: layered dark gradient with animated gold particle rings
// No photo required — looks elegant and loads instantly
// ─────────────────────────────────────────────────────────────────────
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sparkles from "../Sparkles";

const WEDDING_DATE = new Date("2026-05-02T09:00:00Z"); // 12:00 EAT

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    over: false,
  };
}

export function CountdownFooter() {
  const [time, setTime] = useState(getTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days",    value: time.days },
    { label: "Hours",   value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <>
      <style>{`
        @keyframes count-flip {
          0%   { transform: translateY(0);    opacity: 1; }
          45%  { transform: translateY(-12px); opacity: 0; }
          55%  { transform: translateY(12px);  opacity: 0; }
          100% { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      {/* ── COUNTDOWN ── */}
      <section className="relative overflow-hidden isolate px-6 py-[110px]"
        style={{ background: "linear-gradient(160deg,#1a120c 0%,#241810 40%,#1c1510 70%,#100d09 100%)" }}
      >
        <Sparkles color="#c9a97e" />

        {/* ── Botanical SVG flanking — optional if file exists ── */}
        <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none opacity-20"
          style={{
            backgroundImage: "url('/illustrations/premium/footer-botanical.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom center",
            backgroundSize: "contain",
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 mx-auto max-w-[1280px] flex flex-col items-center gap-10 text-center">

          <div className="flex flex-col items-center gap-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              The countdown begins
            </p>
            <h2
              className="text-[clamp(24px,3.5vw,44px)] italic text-white/80"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
            >
              Until we say &ldquo;I Do&rdquo;
            </h2>
          </div>

          {!mounted ? null : time.over ? (
            <p
              className="text-[clamp(28px,5vw,60px)] italic text-[#c9a97e]"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
            >
              We are married! 🎉
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-6 md:gap-16">
              {units.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  {/* Number with subtle border */}
                  <div
                    className="flex items-center justify-center border border-[#c9a97e]/15 bg-white/[0.03]"
                    style={{ width: "clamp(72px,10vw,120px)", height: "clamp(72px,10vw,120px)" }}
                  >
                    <span
                      className="tabular-nums text-[#f7f3ee] leading-none"
                      style={{
                        fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)",
                        fontWeight: 400,
                        fontSize: "clamp(36px,6vw,80px)",
                      }}
                    >
                      {String(value).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.28em] text-white/40">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Separator */}
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-[#c9a97e]/25" />
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#c9a97e]/45">
              02 · May · 2026 · Dar es Salaam
            </p>
            <div className="h-px w-10 bg-[#c9a97e]/25" />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/invitation/rsvp"
              className="bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.22em] px-10 py-4 hover:bg-[#c9a97e] transition-colors duration-300 font-medium"
            >
              RSVP Now
            </Link>
            <a
              href="#gift"
              className="border border-[#c9a97e]/30 text-[#c9a97e]/65 text-[11px] uppercase tracking-[0.22em] px-10 py-4 hover:border-[#c9a97e] hover:text-[#c9a97e] transition-all duration-300"
            >
              Leave a Wish
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#100d09] px-6 py-14">
        <div className="mx-auto max-w-[1280px] flex flex-col items-center gap-7 text-center">

          {/* Monogram */}
          <div
            className="text-[clamp(44px,7vw,76px)] text-[#c9a97e]/35 leading-none"
            style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
          >
            B & W
          </div>

          {/* Ornament */}
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-[#c9a97e]/15" />
            <div className="h-1 w-1 rotate-45 bg-[#c9a97e]/30 shrink-0" />
            <div className="h-1 w-1 rotate-45 bg-[#c9a97e]/50 shrink-0" />
            <div className="h-1 w-1 rotate-45 bg-[#c9a97e]/30 shrink-0" />
            <div className="h-px w-10 bg-[#c9a97e]/15" />
          </div>

          <p className="text-[10px] uppercase tracking-[0.25em] text-white/20">
            02 · May · 2026
          </p>

          <p
            className="max-w-[360px] text-[14px] italic text-white/18"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            &ldquo;And they lived, loved, and laughed — forever.&rdquo;
          </p>

          {/* Quick nav */}
          <div className="flex flex-wrap justify-center gap-5 mt-1">
            {[
              { label: "Home",      href: "#home" },
              { label: "Our Story", href: "#our-story" },
              { label: "Details",   href: "#details" },
              { label: "Gallery",   href: "#gallery" },
              { label: "Gift",      href: "#gift" },
              { label: "RSVP",      href: "/invitation/rsvp" },
              { label: "FAQ",       href: "/invitation/faq" },
            ].map(({ label, href }) => (
              href.startsWith("/") ? (
                <Link key={label} href={href}
                  className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-[#c9a97e]/55 transition-colors duration-300">
                  {label}
                </Link>
              ) : (
                <a key={label} href={href}
                  className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-[#c9a97e]/55 transition-colors duration-300">
                  {label}
                </a>
              )
            ))}
          </div>

          {/* Branding */}
          <div className="mt-3 pt-5 border-t border-white/[0.04] w-full flex flex-col items-center gap-1.5">
            <p className="text-[8px] uppercase tracking-[0.3em] text-white/12">Powered by</p>
            <p
              className="text-[13px] text-[#c9a97e]/20"
              style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic" }}
            >
              Timeless Vows
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
