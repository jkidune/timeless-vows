"use client";

import { useEffect, useState } from "react";

interface Props {
  visible: boolean;
  partner1?:     string;
  partner2?:     string;
  weddingDate?:  Date;
  heroImageUrl?: string;
  inviteText?:   string;
}

export function PremiumHero({
  visible,
  partner1     = "Barke",
  partner2     = "William",
  weddingDate  = new Date("2026-05-02"),
  heroImageUrl,
  inviteText   = "We would like to invite you to celebrate with us the most special day of our lives. It would be an honor to have you present at this important moment.",
}: Props) {
  const [animate, setAnimate] = useState(false);

  // Format: "02 • MAY • 2026"
  const d = new Date(weddingDate);
  const formattedDate = [
    String(d.getDate()).padStart(2, "0"),
    d.toLocaleString("en-GB", { month: "short" }).toUpperCase(),
    d.getFullYear(),
  ].join(" • ");

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimate(true), 200);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const scrollToStory = () => {
    const el = document.getElementById("our-story");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes hero-pulse-line {
          0%, 100% { opacity: 0.35; transform: scaleY(1); }
          50%       { opacity: 0.8;  transform: scaleY(1.2); }
        }
        .hero-scroll-line {
          animation: hero-pulse-line 2.2s ease-in-out infinite;
        }
      `}</style>

      <section
        id="home"
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImageUrl ?? "/images/premium/hero-bg.jpg"}')` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg,rgba(35,31,32,0.18) 0%,rgba(48,50,53,0.32) 100%)",
              mixBlendMode: "multiply",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top,rgba(20,15,10,0.28) 0%,transparent 50%)" }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1280px] px-6 flex flex-col items-center"
          style={{ minHeight: "100svh" }}>

          <div className="flex-1" />

          <div className="flex flex-col items-center gap-5 text-center">

            {/* Date */}
            <p
              className="text-[clamp(12px,1.4vw,18px)] font-semibold uppercase tracking-[0.2em] text-white"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 1s ease, transform 1s ease",
              }}
            >
              {formattedDate}
            </p>

            {/* Names */}
            <h1
              className="text-[clamp(56px,12.5vw,190px)] text-[#f7f3ee] leading-[0.92] tracking-[-0.01em]"
              style={{
                fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)",
                fontWeight: 400,
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(28px)",
                transition: "opacity 1.2s ease, transform 1.2s ease",
                transitionDelay: "0.15s",
              }}
            >
              {partner1} & {partner2}
            </h1>

            {/* Gold ornament */}
            <div
              className="flex items-center gap-4 my-1"
              style={{
                opacity: animate ? 1 : 0,
                transition: "opacity 1s ease",
                transitionDelay: "0.3s",
              }}
            >
              <div className="h-px w-12" style={{ background: "linear-gradient(to right,transparent,rgba(201,169,126,0.7))" }} />
              <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]/80 shrink-0" />
              <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e] shrink-0" />
              <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]/80 shrink-0" />
              <div className="h-px w-12" style={{ background: "linear-gradient(to left,transparent,rgba(201,169,126,0.7))" }} />
            </div>

            {/* Invite text */}
            <p
              className="max-w-[680px] text-[clamp(15px,1.8vw,22px)] italic leading-[1.6] text-white"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 1.2s ease, transform 1.2s ease",
                transitionDelay: "0.4s",
              }}
            >
              {inviteText}
            </p>
          </div>

          <div className="flex-1" style={{ minHeight: "clamp(60px,8vh,120px)" }} />

          <button
            onClick={scrollToStory}
            className="flex flex-col items-center gap-3 mb-10 group"
            style={{
              opacity: animate ? 1 : 0,
              transition: "opacity 1.2s ease",
              transitionDelay: "0.8s",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Scroll to story"
          >
            <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/55 group-hover:text-white/80 transition-colors duration-300">
              Scroll Down
            </p>
            <div
              className="hero-scroll-line w-px bg-gradient-to-b from-white/50 to-transparent group-hover:from-white/80 transition-all duration-300"
              style={{ height: "48px" }}
            />
          </button>
        </div>
      </section>
    </>
  );
}