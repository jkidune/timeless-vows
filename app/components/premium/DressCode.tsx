// ─────────────────────────────────────────────────────────────────────
// FILE PATH: app/components/premium/DressCode.tsx
// Gift transfer details have been moved to GiftWishes.tsx
// ─────────────────────────────────────────────────────────────────────
"use client";

const LADIES_SWATCHES = [
  { hex: "#E1C6AB", name: "Champagne" },
  { hex: "#CDA991", name: "Blush Sand" },
  { hex: "#BB8E73", name: "Warm Nude" },
  { hex: "#A8795B", name: "Bronze" },
  { hex: "#8B5E3C", name: "Burnt Sienna" },
  { hex: "#C1440E", name: "Terracotta" },
];

export function DressCode() {
  return (
    <section id="dress-code" className="bg-[#f7f3ee] px-6 py-[100px]">
      <div className="mx-auto max-w-[1280px]">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a8795b]">
            Dress Code
          </p>
          <h2
            className="text-[clamp(32px,4vw,56px)] text-[#482612]"
            style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
          >
            Come dressed in elegance
          </h2>
          <p
            className="max-w-[480px] text-[17px] italic text-[#b9927a]"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            We invite you to dress in a way that reflects the joy and beauty of this occasion.
          </p>
        </div>

        {/* Two dark panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3px]">

          {/* ── LADIES PANEL ── */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#2A1F18] to-[#3D2B1F] p-10 lg:p-14 flex flex-col gap-8 border border-[#c9a97e]/10">
            <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-[#c9a97e]/8 pointer-events-none" />
            <div className="absolute -right-4  -top-4  h-36 w-36 rounded-full border border-[#c9a97e]/6 pointer-events-none" />

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a97e]/70 mb-3">For the Ladies</p>
              <h3
                className="text-[clamp(28px,3vw,44px)] text-[#f7f3ee] leading-tight"
                style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
              >
                Garden Party<br />Elegance
              </h3>
            </div>

            <p
              className="text-[16px] italic text-[#e7d3bc]/75 leading-[1.75]"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
            >
              Floral and flowing silhouettes in warm earth tones — champagne, nude, blush,
              burnt sienna, and terracotta. Long gowns and midi-length dresses are equally welcome.
            </p>

            {/* Swatches */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a97e]/50 mb-3">Suggested palette</p>
              <div className="flex items-center gap-3 flex-wrap">
                {LADIES_SWATCHES.map((s) => (
                  <div key={s.hex} className="group relative">
                    <div
                      className="h-9 w-9 rounded-full border-2 border-white/15 transition-transform duration-200 group-hover:scale-110 cursor-default"
                      style={{ background: s.hex }}
                      title={s.name}
                    />
                    <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] text-[#c9a97e]/50 tracking-[0.05em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="border-l-2 border-[#a8795b]/40 pl-4 bg-white/[0.03] py-3 pr-3">
              <p className="text-[12px] italic text-[#e7d3bc]/55 leading-[1.7]">
                Heels are welcome, but the venue has garden areas — block heels or elegant flats are
                perfectly appropriate. White and ivory are reserved for the bride.
              </p>
            </div>

            {/* What to avoid */}
            <div className="mt-auto pt-6 border-t border-[#c9a97e]/15">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#c9a97e]/50 mb-3">Please avoid</p>
              <div className="flex flex-wrap gap-2">
                {["White / Ivory", "Off-White", "Very Casual Attire", "Sneakers"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 border border-[#c9a97e]/15 text-[#e7d3bc]/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── GENTS PANEL ── */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1C1713] to-[#242018] p-10 lg:p-14 flex flex-col gap-8 border border-[#c9a97e]/8">
            <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-[#c9a97e]/6 pointer-events-none" />

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a97e]/70 mb-3">For the Gentlemen</p>
              <h3
                className="text-[clamp(28px,3vw,44px)] text-[#f7f3ee] leading-tight"
                style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
              >
                Classic<br />Black Suit
              </h3>
            </div>

            <p
              className="text-[16px] italic text-[#e7d3bc]/75 leading-[1.75]"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
            >
              A sharp black suit is required for all gentlemen. Whether paired with a white shirt
              and black tie, or a crisp ivory shirt and pocket square — the formality of the
              evening calls for your finest.
            </p>

            {/* Colour guide */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a97e]/50 mb-3">Colour guide</p>
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { hex: "#1C1713", name: "Black Suit" },
                  { hex: "#2C2C2C", name: "Charcoal" },
                  { hex: "#F7F3EE", name: "White Shirt" },
                  { hex: "#C9A97E", name: "Gold Detail" },
                ].map((s) => (
                  <div key={s.hex} className="group relative">
                    <div
                      className="h-9 w-9 rounded-full border-2 border-white/15 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: s.hex }}
                      title={s.name}
                    />
                    <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] text-[#c9a97e]/50 tracking-[0.05em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {s.name}
                    </span>
                  </div>
                ))}
                <span className="text-[10px] text-[#c9a97e]/40 ml-2 italic">
                  Black · white or ivory shirt
                </span>
              </div>
            </div>

            {/* Notes */}
            <div className="border-l-2 border-[#a8795b]/40 pl-4 bg-white/[0.03] py-3 pr-3">
              <p className="text-[12px] italic text-[#e7d3bc]/55 leading-[1.7]">
                A black bow tie or long tie is preferred. A gold or champagne pocket square to
                coordinate with your partner&apos;s ensemble is a beautiful touch.
              </p>
            </div>

            <div className="flex-1" />

            {/* Link to gift section */}
            <div className="mt-auto pt-6 border-t border-[#c9a97e]/15">
              <p
                className="text-[15px] italic text-[#e7d3bc]/55 leading-[1.7]"
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
              >
                Your presence is our greatest gift. If you wish to honour us further,
                kindly find our gift details in the section below.
              </p>
              <a
                href="#gift"
                className="inline-block mt-4 text-[11px] uppercase tracking-[0.2em] text-[#c9a97e]/60 border-b border-[#c9a97e]/30 pb-0.5 hover:text-[#c9a97e] hover:border-[#c9a97e] transition-colors duration-300"
              >
                Gift & Wishes ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}