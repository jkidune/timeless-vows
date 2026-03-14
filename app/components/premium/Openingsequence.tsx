// ─────────────────────────────────────────────────────────────────────
// FILE PATH: app/components/premium/OpeningSequence.tsx
// ─────────────────────────────────────────────────────────────────────
"use client";

import { useState, useRef, useEffect } from "react";

type Phase = "gate" | "fading" | "done";

interface Props {
  onComplete: () => void;
}

export function OpeningSequence({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("gate");
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("tv_intro_seen")) {
      setPhase("done");
      onComplete();
    }
  }, [onComplete]);

  const handleEnter = () => {
    setPhase("fading");
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.35;
    }
    setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("tv_intro_seen", "1");
      onComplete();
    }, 2200);
  };

  if (!mounted || phase === "done") return null;

  return (
    <>
      <style>{`
        @keyframes tv-fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tv-a1 { animation: tv-fadeUp 1.2s ease forwards 0.3s; opacity: 0; }
        .tv-a2 { animation: tv-fadeUp 1.2s ease forwards 0.55s; opacity: 0; }
        .tv-a3 { animation: tv-fadeUp 1.4s ease forwards 0.8s; opacity: 0; }
        .tv-a4 { animation: tv-fadeUp 1.2s ease forwards 1.0s; opacity: 0; }
        .tv-a5 { animation: tv-fadeUp 1.2s ease forwards 1.2s; opacity: 0; }
        .tv-a6 { animation: tv-fadeUp 1.0s ease forwards 1.5s; opacity: 0; }
      `}</style>

      <div
        className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
        style={{ pointerEvents: phase === "fading" ? "none" : "auto" }}
      >
        {/* Background video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: phase === "fading" ? 0 : 1,
            transition: "opacity 1.4s ease-in-out",
          }}
        >
          <source src="/videos/premium/opening.mp4" type="video/mp4" />
        </video>

        {/* Dark cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg,rgba(20,15,10,0.72) 0%,rgba(20,15,10,0.42) 45%,rgba(20,15,10,0.80) 100%)",
            opacity: phase === "fading" ? 0 : 1,
            transition: "opacity 0.9s ease-in-out",
          }}
        />

        {/* White fade-to-parchment overlay */}
        <div
          className="absolute inset-0 bg-[#f7f3ee]"
          style={{
            opacity: phase === "fading" ? 1 : 0,
            transition: "opacity 2.2s ease-in-out",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col items-center gap-5 text-center px-6"
          style={{
            opacity: phase === "fading" ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        >
          <p className="tv-a1 text-[10px] font-medium tracking-[0.35em] uppercase text-white/50">
            A Wedding Invitation
          </p>

          <p className="tv-a2 text-[12px] tracking-[0.25em] uppercase text-white/65">
            02 · May · 2026
          </p>

          <h1
            className="tv-a3 text-[clamp(52px,10vw,130px)] text-white leading-none"
            style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontWeight: 400 }}
          >
            Barke & William
          </h1>

          {/* Gold ornament */}
          <div className="tv-a4 flex items-center gap-4">
            <div className="h-px w-14" style={{ background: "linear-gradient(to right, transparent, rgba(201,169,126,0.7))" }} />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]/80 shrink-0" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e] shrink-0" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]/80 shrink-0" />
            <div className="h-px w-14" style={{ background: "linear-gradient(to left, transparent, rgba(201,169,126,0.7))" }} />
          </div>

          <button
            onClick={handleEnter}
            className="tv-a5 mt-2 border border-white/35 text-white text-[10px] tracking-[0.35em] uppercase px-14 py-4 hover:bg-white/10 hover:border-white/60 transition-all duration-300"
          >
            Enter
          </button>

          <p className="tv-a6 text-[9px] tracking-[0.2em] uppercase text-white/25">
            Dar es Salaam, Tanzania
          </p>
        </div>
      </div>
    </>
  );
}