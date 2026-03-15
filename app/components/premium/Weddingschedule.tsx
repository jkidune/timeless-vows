"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";

interface ScheduleItem {
  time:        string;
  title:       string;
  description: string;
  icon:        string;  // SVG path
  iconAlt:     string;
  w:           number;
  h:           number;
  emoji:       string;
}

interface Props {
  // Optional DB schedule — falls back to defaults if not provided
  weddingDate?: Date;
}

const DEFAULT_SCHEDULE: ScheduleItem[] = [
  {
    time: "12:00", title: "The Ceremony",
    description: "Witness the beginning of our forever as we exchange vows in a sacred celebration of love.",
    icon: "/illustrations/premium/icon-ceremony.svg", iconAlt: "Rings icon", w: 88, h: 84, emoji: "💍",
  },
  {
    time: "14:30", title: "Capturing Memories",
    description: "While we slip away to frame our first moments, please enjoy the beautiful surroundings.",
    icon: "/illustrations/premium/icon-photos.svg", iconAlt: "Camera icon", w: 82, h: 85, emoji: "📸",
  },
  {
    time: "17:00", title: "The Reception",
    description: "Sip and savour amidst laughter and joy as we welcome you to the evening's festivities.",
    icon: "/illustrations/premium/icon-reception.svg", iconAlt: "Reception icon", w: 98, h: 89, emoji: "🥂",
  },
  {
    time: "19:00", title: "The Celebration",
    description: "Revel in a sumptuous feast, heartfelt toasts, dancing, and endless merriment.",
    icon: "/illustrations/premium/icon-celebration.svg", iconAlt: "Music icon", w: 88, h: 86, emoji: "🎉",
  },
];

// ── Confetti ───────────────────────────────────────────────────────────
interface Particle { id: number; x: number; y: number; color: string; size: number; angle: number; speed: number; }
const CONFETTI_COLORS = ["#f7f3ee","#c9a97e","#eaba99","#e1c6ab","#ffffff","#bb8e73","#a8795b","#ffe4c4","#ffd700"];

function useConfetti() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const counterRef = useRef(0);
  const burst = useCallback((originX: number, originY: number) => {
    const count = 28;
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: ++counterRef.current * 100 + i, x: originX, y: originY,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: Math.random() * 7 + 4,
      angle: (360 / count) * i + Math.random() * 20 - 10,
      speed: Math.random() * 80 + 50,
    }));
    setParticles((p) => [...p, ...newParticles]);
    setTimeout(() => { setParticles((p) => p.filter((x) => !newParticles.find((n) => n.id === x.id))); }, 1000);
  }, []);
  return { particles, burst };
}

export function WeddingSchedule({ weddingDate }: Props) {
  // Schedule is always the design default for now — 
  // to make it DB-driven add scheduleJson prop and parse it here
  const SCHEDULE = DEFAULT_SCHEDULE;

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { particles, burst } = useConfetti();

  const handleCardClick = (e: React.MouseEvent, _idx: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  return (
    <>
      <style>{`
        @keyframes sched-fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes confetti-fly { 0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:1} 100%{transform:translate(var(--tx),var(--ty)) rotate(var(--tr)) scale(0.4);opacity:0} }
        @keyframes circle-pulse { 0%,100%{opacity:0.06;transform:scale(1)} 50%{opacity:0.12;transform:scale(1.04)} }
        .sched-card { animation: sched-fadeUp 0.8s ease forwards; opacity: 0; }
        .confetti-particle { position:fixed; pointer-events:none; z-index:9999; border-radius:2px; animation:confetti-fly 1s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
        .circle-pulse { animation: circle-pulse 4s ease-in-out infinite; }
      `}</style>

      {particles.map((p) => (
        <div key={p.id} className="confetti-particle"
          style={{
            left: p.x, top: p.y, width: p.size, height: p.size, backgroundColor: p.color,
            // @ts-expect-error — CSS custom properties
            "--tx": `${Math.cos((p.angle * Math.PI) / 180) * p.speed}px`,
            "--ty": `${Math.sin((p.angle * Math.PI) / 180) * p.speed - 40}px`,
            "--tr": `${Math.random() * 720 - 360}deg`,
          }}
        />
      ))}

      <section id="details" className="relative overflow-hidden bg-[#a8795b] px-6 py-[100px]">

        {/* Decorative circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="circle-pulse absolute -left-24 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-white/15" style={{ animationDelay: "0s" }} />
          <div className="circle-pulse absolute -left-12 top-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full border border-white/10" style={{ animationDelay: "0.5s" }} />
          <div className="circle-pulse absolute -right-24 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-white/15" style={{ animationDelay: "1s" }} />
          <div className="circle-pulse absolute -right-12 top-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full border border-white/10" style={{ animationDelay: "1.5s" }} />
          <div className="circle-pulse absolute left-1/2 -translate-x-1/2 -top-20 h-[280px] w-[280px] rounded-full border border-white/8" style={{ animationDelay: "2s" }} />
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle,#f7f3ee,transparent 70%)" }} />
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle,#f7f3ee,transparent 70%)" }} />
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"url('/illustrations/premium/schedule-pattern.svg')", backgroundRepeat:"repeat", backgroundSize:"400px", opacity:0.05 }} />

        <div className="relative mx-auto max-w-[1280px]">
          <div className="flex flex-col items-center gap-16">

            <div className="flex flex-col items-center gap-5 text-center">
              <p className="text-[13px] font-semibold uppercase tracking-[1.3px] text-[#eaba99]">Ratiba ya Harusi</p>
              <h2 className="max-w-[478px] text-[clamp(36px,5vw,64px)] leading-[1.0] text-white"
                style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontWeight: 400 }}>
                Wedding Day Schedule
              </h2>
              <div className="flex items-center gap-4">
                <div className="h-px w-10 bg-white/20" />
                <div className="h-1.5 w-1.5 rotate-45 bg-[#eaba99]/60 shrink-0" />
                <div className="h-px w-10 bg-white/20" />
              </div>
            </div>

            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SCHEDULE.map((item, i) => {
                const isHovered = hoveredIdx === i;
                return (
                  <article key={item.time}
                    className="sched-card relative flex flex-col items-center gap-6 text-center cursor-pointer select-none"
                    style={{ animationDelay: `${i * 0.12}s` }}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={(e) => handleCardClick(e, i)}
                  >
                    <div className="absolute inset-0 rounded-none transition-all duration-400"
                      style={{
                        background: isHovered ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0)",
                        border: isHovered ? "1px solid rgba(255,255,255,0.20)" : "1px solid transparent",
                        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                        borderRadius: "2px",
                      }}
                    />

                    <div className="relative flex flex-col items-center gap-6 p-6 w-full">
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative transition-transform duration-400"
                          style={{ width: item.w, height: item.h, transform: isHovered ? "scale(1.10)" : "scale(1)", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
                          <Image src={item.icon} alt={item.iconAlt} fill className="object-contain" />
                        </div>
                        <div style={{ opacity:isHovered?1:0, transform:isHovered?"translateY(0) scale(1)":"translateY(8px) scale(0.5)", transition:"all 0.3s ease", fontSize:"22px", lineHeight:1, position:"absolute", top:"4px", right:"16px" }}>
                          {item.emoji}
                        </div>
                        <p className="text-[clamp(32px,4vw,48px)] leading-none text-[#eee6db]"
                          style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)" }}>
                          {item.time}
                        </p>
                      </div>
                      <div className="h-px bg-white/20 transition-all duration-500" style={{ width: isHovered ? "60px" : "48px" }} />
                      <div className="flex flex-col items-center gap-3">
                        <h3 className="text-[clamp(18px,2vw,24px)] italic leading-[1.3] text-[#eee1d4] transition-colors duration-300"
                          style={{ fontFamily: "'Cormorant Garamond',serif", color: isHovered ? "#f7f3ee" : "#eee1d4" }}>
                          {item.title}
                        </h3>
                        <p className="max-w-[266px] text-[14px] leading-[1.7] text-[#eaba99] transition-colors duration-300"
                          style={{ color: isHovered ? "#f0dac4" : "#eaba99" }}>
                          {item.description}
                        </p>
                      </div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 transition-all duration-300"
                        style={{ opacity: isHovered ? 1 : 0 }}>
                        Click to celebrate ✦
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}