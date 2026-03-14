// ─────────────────────────────────────────────────────────────────────
// FILE PATH: app/components/premium/GiftWishes.tsx
// Left panel: gift transfer details with copy buttons
// Right panel: wish message form
// ─────────────────────────────────────────────────────────────────────
"use client";

import { useState, useCallback } from "react";

// ── UPDATE THESE DETAILS ─────────────────────────────────────────────
const GIFT_ACCOUNTS = {
  mobile: {
    label: "SELCOM",
    name: "Tayamika Mattao",
    number: "+255 762 744 714",
    note: "Send to number · use your name as reference",
  },
  bank: {
    label: "Bank Transfer",
    name: "Tayamika Mattao",
    bank: "CRDB Bank Tanzania",
    account: "0152349021800",
    branch: "Dar es Salaam Branch",
  },
};
// ────────────────────────────────────────────────────────────────────

type WishType = "Heartfelt Blessing" | "A Gift is Coming 🎁" | "Words of Wisdom" | "Prayer & Blessing" | "Just a Big Hug 🤍";
interface Wish { name: string; type: WishType | ""; message: string; from: string; }

// ── Copy button ──────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] border px-2.5 py-1.5 transition-all duration-300"
      style={{
        borderColor: copied ? "rgba(201,169,126,0.6)" : "rgba(201,169,126,0.25)",
        color: copied ? "#c9a97e" : "rgba(201,169,126,0.5)",
        background: copied ? "rgba(201,169,126,0.08)" : "transparent",
      }}
      title={`Copy ${text}`}
    >
      {copied ? (
        <>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <rect x="4" y="1" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            <rect x="1" y="4" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" fill="rgba(42,31,24,0.6)"/>
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────
export function GiftWishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [form, setForm] = useState<Wish>({ name: "", type: "", message: "", from: "" });
  const [phase, setPhase] = useState<"form" | "sent">("form");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.name.trim() || !form.message.trim()) {
      setError("Please fill in your name and message.");
      return;
    }
    setError("");
    setWishes((prev) => [form, ...prev]);
    setPhase("sent");
  };

  const handleReset = () => {
    setForm({ name: "", type: "", message: "", from: "" });
    setPhase("form");
  };

  const inputClass =
    "w-full bg-white border border-[#c9a97e]/30 text-[#482612] placeholder-[#b9927a]/40 px-4 py-3.5 text-[14px] outline-none focus:border-[#a8795b] focus:ring-2 focus:ring-[#a8795b]/10 transition-all duration-300";

  return (
    <>
      <style>{`
        @keyframes wishSlide {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .wish-card { animation: wishSlide 0.5s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
      `}</style>

      <section id="gift" className="bg-white px-6 py-[100px]">
        <div className="mx-auto max-w-[1280px]">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-14 gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a8795b]">
              Gift & Wishes
            </p>
            <h2
              className="text-[clamp(32px,4vw,56px)] text-[#482612]"
              style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
            >
              Share your love & wishes
            </h2>
            <p
              className="max-w-[520px] text-[17px] italic text-[#b9927a]"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
            >
              Your presence is the greatest gift. But if your heart has words or a token of love
              to share, Barke &amp; William would treasure them always.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#c9a97e]/20">

            {/* ── LEFT: Gift transfer details + submitted wishes ── */}
            <div className="bg-[#f7f3ee] p-10 lg:p-12 flex flex-col gap-10 border-r border-[#c9a97e]/15">

              {/* Gift transfer */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-5 bg-[#c9a97e]/50" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a8795b]">
                    Gift Transfer Details
                  </p>
                </div>

                <p
                  className="text-[15px] italic text-[#b9927a] leading-[1.7] mb-6"
                  style={{ fontFamily: "'Cormorant Garamond',serif" }}
                >
                  If you wish to honour the couple with a monetary gift, please use
                  any of the options below. Your generosity is deeply appreciated.
                </p>

                {/* Mobile money card */}
                <div className="bg-white border border-[#c9a97e]/25 p-5 mb-3">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#9d7760] font-medium">
                      {GIFT_ACCOUNTS.mobile.label}
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.1em] px-2 py-1 bg-[#a8795b]/8 text-[#a8795b]">
                      Mobile Money
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className="text-[clamp(18px,2.5vw,24px)] font-medium text-[#482612] tracking-[0.03em]"
                      style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)" }}
                    >
                      {GIFT_ACCOUNTS.mobile.number}
                    </p>
                    <CopyButton text={GIFT_ACCOUNTS.mobile.number} />
                  </div>
                  <p className="text-[12px] text-[#b9927a] mt-1.5">
                    Name: <span className="text-[#482612] font-medium">{GIFT_ACCOUNTS.mobile.name}</span>
                  </p>
                  <p className="text-[11px] italic text-[#c9a97e]/60 mt-1">{GIFT_ACCOUNTS.mobile.note}</p>
                </div>

                {/* Bank card */}
                <div className="bg-white border border-[#c9a97e]/25 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#9d7760] font-medium">
                      {GIFT_ACCOUNTS.bank.label}
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.1em] px-2 py-1 bg-[#a8795b]/8 text-[#a8795b]">
                      Bank
                    </span>
                  </div>
                  <p className="text-[15px] font-semibold text-[#482612] mb-2">{GIFT_ACCOUNTS.bank.bank}</p>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <div>
                      <p className="text-[11px] text-[#9d7760] uppercase tracking-[0.1em]">Account No.</p>
                      <p className="text-[16px] font-medium text-[#482612] tracking-[0.05em]">
                        {GIFT_ACCOUNTS.bank.account}
                      </p>
                    </div>
                    <CopyButton text={GIFT_ACCOUNTS.bank.account} />
                  </div>
                  <p className="text-[12px] text-[#b9927a]">
                    Name: <span className="text-[#482612] font-medium">{GIFT_ACCOUNTS.bank.name}</span>
                  </p>
                  <p className="text-[11px] italic text-[#c9a97e]/50 mt-1">{GIFT_ACCOUNTS.bank.branch}</p>
                </div>
              </div>

              {/* Submitted wishes */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-5 bg-[#c9a97e]/50" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a8795b]">
                    Messages from loved ones
                  </p>
                </div>

                {wishes.length === 0 ? (
                  <div className="border border-dashed border-[#c9a97e]/35 p-8 text-center">
                    <p
                      className="text-[17px] italic text-[#b9927a]"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}
                    >
                      Be the first to leave a wish ✨
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
                    {wishes.map((w, i) => (
                      <div
                        key={i}
                        className="wish-card border-l-[3px] border-[#c9a97e]/60 bg-white pl-4 pr-3 py-4"
                      >
                        <p
                          className="text-[15px] italic text-[#4e2d28] leading-[1.6] mb-2"
                          style={{ fontFamily: "'Cormorant Garamond',serif" }}
                        >
                          &ldquo;{w.message}&rdquo;
                        </p>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-[10px] uppercase tracking-[0.1em] text-[#a8795b]">
                            — {w.name}{w.from ? ` · ${w.from}` : ""}
                          </span>
                          {w.type && (
                            <span className="text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 bg-[#a8795b]/8 text-[#a8795b]">
                              {w.type}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Wish form ── */}
            <div className="relative bg-[#1c1713] p-10 lg:p-12">
              {/* Inner border detail */}
              <div className="absolute inset-[8px] border border-[#c9a97e]/10 pointer-events-none" />

              {phase === "form" ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-5 bg-[#c9a97e]/40" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9a97e]/70">
                      Leave a Wish
                    </p>
                  </div>

                  <h3
                    className="text-[clamp(22px,3vw,32px)] italic text-[#f7f3ee] mb-1"
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}
                  >
                    A message for the couple
                  </h3>
                  <p className="text-[13px] italic text-[#a8795b]/70 mb-8">
                    Your words will be treasured forever
                  </p>

                  {error && <p className="mb-4 text-[12px] italic text-red-400/80">{error}</p>}

                  {/* Name + Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a97e]/60 font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Jane Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a97e]/60 font-medium mb-2">
                        Type of Wish
                      </label>
                      <select
                        className={`${inputClass} cursor-pointer`}
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value as WishType })}
                      >
                        <option value="">Select…</option>
                        <option>Heartfelt Blessing</option>
                        <option>A Gift is Coming 🎁</option>
                        <option>Words of Wisdom</option>
                        <option>Prayer &amp; Blessing</option>
                        <option>Just a Big Hug 🤍</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a97e]/60 font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      className={`${inputClass} resize-none min-h-[120px]`}
                      placeholder="Write your heartfelt message…"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a97e]/60 font-medium mb-2">
                      From (optional)
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="e.g. The Kamau Family"
                      value={form.from}
                      onChange={(e) => setForm({ ...form, from: e.target.value })}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.25em] py-5 font-semibold hover:bg-[#c9a97e] transition-colors duration-300"
                  >
                    Send My Wish
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center text-center py-10 gap-6">
                  <div
                    className="text-[52px] italic text-[#c9a97e]"
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}
                  >
                    Thank you
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-[#c9a97e]/40" />
                    <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]/60 shrink-0" />
                    <div className="h-px w-8 bg-[#c9a97e]/40" />
                  </div>
                  <p
                    className="text-[17px] italic text-[#e7d3bc]/65 leading-[1.7]"
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}
                  >
                    Your wish has been received and will be treasured by<br />
                    Barke &amp; William forever. 🤍
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-2 border border-[#c9a97e]/40 text-[#c9a97e]/70 text-[10px] uppercase tracking-[0.2em] px-8 py-3 hover:border-[#c9a97e] hover:text-[#c9a97e] transition-all duration-300"
                  >
                    Leave Another Wish
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}