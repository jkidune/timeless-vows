"use client";

import { useState, useRef, useEffect } from "react";

type Phase = "gate" | "fading" | "done";

interface Props {
  onComplete:    () => void;
  coupleNames?:  string;   // e.g. "Barke & William"
  weddingDate?:  Date;
  location?:     string;   // e.g. "Dar es Salaam, Tanzania"
  videoUrl?:     string;   // Cloudinary or local path
}

export function OpeningSequence({
  onComplete,
  coupleNames  = "Barke & William",
  weddingDate  = new Date("2026-05-02"),
  location     = "Dar es Salaam, Tanzania",
  videoUrl     = "/videos/premium/opening.mp4",
}: Props) {
  const [phase,      setPhase]      = useState<Phase>("gate");
  const [mounted,    setMounted]    = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Format: "02 · May · 2026"
  const d = new Date(weddingDate);
  const dateLabel = [
    String(d.getDate()).padStart(2, "0"),
    d.toLocaleString("en-GB", { month: "long" }),
    d.getFullYear(),
  ].join(" · ");

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("tv_intro_seen")) {
      setPhase("done");
      onComplete();
      return;
    }

    const t = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 300);

    return () => clearTimeout(t);
  }, [onComplete]);

  const handleEnter = () => {
    setPhase("fading");
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
        @keyframes tv-shimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .tv-a1 { animation: tv-fadeUp 1.2s ease forwards 0.3s;  opacity: 0; }
        .tv-a2 { animation: tv-fadeUp 1.2s ease forwards 0.55s; opacity: 0; }
        .tv-a3 { animation: tv-fadeUp 1.4s ease forwards 0.8s;  opacity: 0; }
        .tv-a4 { animation: tv-fadeUp 1.2s ease forwards 1.0s;  opacity: 0; }
        .tv-a5 { animation: tv-fadeUp 1.2s ease forwards 1.2s;  opacity: 0; }
        .tv-a6 { animation: tv-fadeUp 1.0s ease forwards 1.5s;  opacity: 0; }
        .tv-shimmer-bg {
          background: linear-gradient(
            135deg,
            #1a110a 0%,
            #2c1d12 20%,
            #3d2b1f 40%,
            #1c1510 60%,
            #2a1e15 80%,
            #1a110a 100%
          );
          background-size: 400% 400%;
          animation: tv-shimmer 8s ease infinite;
        }
      `}</style>

      <div
        className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
        style={{ pointerEvents: phase === "fading" ? "none" : "auto" }}
      >
        {/* Fallback gradient — always visible until video loads */}
        <div
          className="tv-shimmer-bg absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: videoReady ? 0 : 1 }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity: 0.4,
          }}
        />

        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: videoReady && phase !== "fading" ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          }}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg,rgba(20,15,10,0.70) 0%,rgba(20,15,10,0.38) 50%,rgba(20,15,10,0.78) 100%)",
            opacity: phase === "fading" ? 0 : 1,
            transition: "opacity 1s ease",
          }}
        />

        {/* Parchment fade-out */}
        <div
          className="absolute inset-0 bg-[#f7f3ee] pointer-events-none"
          style={{
            opacity: phase === "fading" ? 1 : 0,
            transition: "opacity 2.2s ease-in-out",
          }}
        />

        {/* Gate content */}
        <div
          className="relative z-10 flex flex-col items-center gap-5 text-center px-6 w-full max-w-[900px]"
          style={{
            opacity: phase === "fading" ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        >
          <p className="tv-a1 text-[10px] font-medium tracking-[0.35em] uppercase text-white/50">
            A Wedding Invitation
          </p>

          {/* Date — from prop */}
          <p className="tv-a2 text-[12px] tracking-[0.25em] uppercase text-white/65">
            {dateLabel}
          </p>

          {/* Couple names — from prop */}
          <h1
            className="tv-a3 text-[clamp(52px,10vw,130px)] text-white leading-none"
            style={{
              fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)",
              fontWeight: 400,
            }}
          >
            {coupleNames}
          </h1>

          {/* Gold ornament */}
          <div className="tv-a4 flex items-center gap-4">
            <div className="h-px w-14" style={{ background: "linear-gradient(to right,transparent,rgba(201,169,126,0.7))" }} />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]/80 shrink-0" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e] shrink-0" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]/80 shrink-0" />
            <div className="h-px w-14" style={{ background: "linear-gradient(to left,transparent,rgba(201,169,126,0.7))" }} />
          </div>

          <button
            onClick={handleEnter}
            className="tv-a5 mt-2 border border-white/35 text-white text-[10px] tracking-[0.35em] uppercase px-14 py-4 hover:bg-white/10 hover:border-white/60 transition-all duration-300"
          >
            Enter
          </button>

          {/* Location — from prop */}
          <p className="tv-a6 text-[9px] tracking-[0.2em] uppercase text-white/25">
            {location}
          </p>
        </div>
      </div>
    </>
  );
}