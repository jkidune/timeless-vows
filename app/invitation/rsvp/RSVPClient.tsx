// ─────────────────────────────────────────────────────────────────────
// FILE PATH: app/invitation/rsvp/RSVPClient.tsx
// Multi-step RSVP form — 3 steps + confirmation screen
// ─────────────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ── TYPES ──────────────────────────────────────────────────────────
type Attendance = "yes" | "no" | "";
type MealChoice = "chicken" | "fish" | "vegetarian" | "vegan" | "";
type Step = 1 | 2 | 3 | 4; // 4 = confirmation

interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  meal: MealChoice;
  dietaryNotes: string;
}

interface FormData {
  primaryName: string;
  email: string;
  phone: string;
  attendance: Attendance;
  guestCount: number;
  guests: Guest[];
  songRequest: string;
  specialMessage: string;
}

const DEFAULT_FORM: FormData = {
  primaryName: "",
  email: "",
  phone: "",
  attendance: "",
  guestCount: 1,
  guests: [{ id: 1, firstName: "", lastName: "", meal: "", dietaryNotes: "" }],
  songRequest: "",
  specialMessage: "",
};

const MEAL_OPTIONS = [
  { value: "chicken", label: "Chicken", emoji: "🍗" },
  { value: "fish",    label: "Fish",    emoji: "🐟" },
  { value: "vegetarian", label: "Vegetarian", emoji: "🥗" },
  { value: "vegan",   label: "Vegan",   emoji: "🌱" },
] as const;

// ── SHARED INPUT STYLES ────────────────────────────────────────────
const inputClass =
  "w-full bg-white border border-[#c9a97e]/30 text-[#482612] placeholder-[#b9927a]/40 px-4 py-3.5 text-[14px] outline-none focus:border-[#a8795b] focus:ring-2 focus:ring-[#a8795b]/10 transition-all duration-300 font-[family-name:var(--font-jost,'Jost',sans-serif)]";

const labelClass =
  "block text-[10px] uppercase tracking-[0.22em] text-[#a8795b] font-semibold mb-2";

// ── STEP INDICATOR ─────────────────────────────────────────────────
function StepBar({ current }: { current: Step }) {
  const steps = ["Your Details", "Attendance", "Preferences", "Confirm"];
  return (
    <div className="flex items-center justify-center gap-0 mb-14">
      {steps.map((label, i) => {
        const n = (i + 1) as Step;
        const done = current > n;
        const active = current === n;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`h-8 w-8 flex items-center justify-center text-[11px] font-semibold transition-all duration-300 ${
                  done
                    ? "bg-[#a8795b] text-white"
                    : active
                    ? "border-2 border-[#a8795b] text-[#a8795b]"
                    : "border border-[#c9a97e]/40 text-[#c9a97e]/50"
                }`}
              >
                {done ? "✓" : n}
              </div>
              <span
                className={`text-[9px] uppercase tracking-[0.15em] hidden sm:block ${
                  active ? "text-[#a8795b]" : done ? "text-[#a8795b]/60" : "text-[#c9a97e]/40"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-12 md:w-20 h-px mx-1 md:mx-3 mb-5 transition-all duration-500 ${
                  done ? "bg-[#a8795b]/60" : "bg-[#c9a97e]/20"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────
export function RSVPClient() {
  const [step, setStep]     = useState<Step>(1);
  const [form, setForm]     = useState<FormData>(DEFAULT_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Helpers ────────────────────────────────────────────────────
  const updateForm = (key: keyof FormData, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateGuest = (id: number, key: keyof Guest, value: string) =>
    setForm((f) => ({
      ...f,
      guests: f.guests.map((g) => (g.id === id ? { ...g, [key]: value } : g)),
    }));

  const syncGuestCount = (count: number) => {
    const clamped = Math.max(1, Math.min(10, count));
    const guests: Guest[] = Array.from({ length: clamped }, (_, i) => ({
      id: i + 1,
      firstName: form.guests[i]?.firstName ?? "",
      lastName:  form.guests[i]?.lastName  ?? "",
      meal:      form.guests[i]?.meal      ?? "",
      dietaryNotes: form.guests[i]?.dietaryNotes ?? "",
    }));
    setForm((f) => ({ ...f, guestCount: clamped, guests }));
  };

  // ── Validation per step ────────────────────────────────────────
  const validate = (s: Step): boolean => {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!form.primaryName.trim()) errs.primaryName = "Please enter your full name.";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errs.email = "Please enter a valid email address.";
    }
    if (s === 2) {
      if (!form.attendance) errs.attendance = "Please select your attendance.";
    }
    if (s === 3 && form.attendance === "yes") {
      form.guests.forEach((g, i) => {
        if (!g.firstName.trim()) errs[`guest_${i}_fn`] = "First name required.";
        if (!g.lastName.trim())  errs[`guest_${i}_ln`] = "Last name required.";
        if (!g.meal)             errs[`guest_${i}_meal`] = "Please select a meal.";
      });
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    // Skip step 3 guest details if declining
    if (step === 2 && form.attendance === "no") {
      setStep(4);
    } else {
      setStep((s) => Math.min(4, s + 1) as Step);
    }
  };

  const back = () => setStep((s) => Math.max(1, s - 1) as Step);

  // ── Shared UI atoms ────────────────────────────────────────────
  const Btn = ({
    onClick, children, variant = "primary", disabled = false,
  }: {
    onClick?: () => void; children: React.ReactNode;
    variant?: "primary" | "ghost"; disabled?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-[11px] uppercase tracking-[0.25em] font-semibold py-4 px-10 transition-all duration-300 ${
        variant === "primary"
          ? "bg-[#a8795b] text-white hover:bg-[#482612] disabled:bg-[#c9a97e]/50"
          : "border border-[#c9a97e]/40 text-[#a8795b] hover:border-[#a8795b]"
      }`}
    >
      {children}
    </button>
  );

  const FieldError = ({ name }: { name: string }) =>
    errors[name] ? (
      <p className="mt-1 text-[11px] italic text-red-400">{errors[name]}</p>
    ) : null;

  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f7f3ee]">

      {/* ── TOP BAR ── */}
      <header className="sticky top-0 z-50 bg-[#f7f3ee]/95 backdrop-blur-sm border-b border-[#c9a97e]/20">
        <div className="mx-auto max-w-[1280px] px-6 py-3 flex items-center justify-between">
          <Link
            href="/invitation/premium"
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#a8795b] hover:text-[#482612] transition-colors duration-300"
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Back to Invitation
          </Link>
          {/* Logo */}
          <Image
            src="/images/premium/bw-logo.png"
            alt="Barke and William"
            width={60}
            height={58}
            className="object-contain opacity-70"
          />
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a97e]/60 hidden sm:block">
            02 · May · 2026
          </p>
        </div>
      </header>

      {/* ── PAGE HERO ── */}
      <div
        className="relative px-6 py-20 text-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/premium/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,23,19,0.55)] to-[rgba(28,23,19,0.72)]" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
            Will you join us?
          </p>
          <h1
            className="text-[clamp(36px,6vw,80px)] text-white leading-tight"
            style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
          >
            Kindly RSVP
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-[#c9a97e]/50" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]" />
            <div className="h-px w-10 bg-[#c9a97e]/50" />
          </div>
          <p
            className="max-w-[500px] text-[clamp(14px,1.8vw,18px)] italic text-white/75"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            Please respond by <strong className="text-white/90 not-italic">25th April 2026</strong> so we can
            ensure every detail is perfectly arranged for you.
          </p>
        </div>
      </div>

      {/* ── FORM AREA ── */}
      <div className="px-6 py-16">
        <div className="mx-auto max-w-[760px]">

          {step < 4 && <StepBar current={step} />}

          {/* ════ STEP 1 — Your Details ════ */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div className="text-center mb-4">
                <h2 className="text-[28px] font-normal italic text-[#482612]"
                  style={{ fontFamily: "'Cormorant Garamond',serif" }}>
                  Tell us who you are
                </h2>
                <p className="text-[13px] text-[#b9927a] mt-1 italic">
                  We&apos;d love to know who&apos;s coming to celebrate with us.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Your full name"
                    value={form.primaryName}
                    onChange={(e) => updateForm("primaryName", e.target.value)}
                  />
                  <FieldError name="primaryName" />
                </div>

                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                  <FieldError name="email" />
                </div>

                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    className={inputClass}
                    placeholder="+255 7XX XXX XXXX"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Btn onClick={next}>Continue →</Btn>
              </div>
            </div>
          )}

          {/* ════ STEP 2 — Attendance ════ */}
          {step === 2 && (
            <div className="flex flex-col gap-8">
              <div className="text-center mb-2">
                <h2 className="text-[28px] font-normal italic text-[#482612]"
                  style={{ fontFamily: "'Cormorant Garamond',serif" }}>
                  Will you be joining us?
                </h2>
              </div>

              {/* Attendance choice */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "yes", label: "Joyfully Accept", sub: "I'll be there!", emoji: "🥂" },
                  { value: "no",  label: "Regretfully Decline", sub: "I can't make it", emoji: "💌" },
                ].map(({ value, label, sub, emoji }) => (
                  <button
                    key={value}
                    onClick={() => updateForm("attendance", value as Attendance)}
                    className={`relative flex flex-col items-center gap-3 p-8 border-2 transition-all duration-300 ${
                      form.attendance === value
                        ? "border-[#a8795b] bg-[#a8795b]/8"
                        : "border-[#c9a97e]/30 hover:border-[#a8795b]/50 bg-white"
                    }`}
                  >
                    {form.attendance === value && (
                      <div className="absolute top-3 right-3 h-5 w-5 bg-[#a8795b] flex items-center justify-center text-white text-[10px]">✓</div>
                    )}
                    <span className="text-3xl">{emoji}</span>
                    <span className="text-[14px] font-semibold tracking-[0.05em] text-[#482612] text-center leading-tight">
                      {label}
                    </span>
                    <span className="text-[12px] italic text-[#b9927a]">{sub}</span>
                  </button>
                ))}
              </div>
              <FieldError name="attendance" />

              {/* Guest count — only if attending */}
              {form.attendance === "yes" && (
                <div>
                  <label className={labelClass}>
                    How many guests total? (including yourself)
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => syncGuestCount(form.guestCount - 1)}
                      className="h-10 w-10 border border-[#c9a97e]/40 text-[#a8795b] text-lg hover:border-[#a8795b] transition-colors"
                    >
                      −
                    </button>
                    <span className="text-[28px] w-10 text-center text-[#482612]"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}>
                      {form.guestCount}
                    </span>
                    <button
                      onClick={() => syncGuestCount(form.guestCount + 1)}
                      className="h-10 w-10 border border-[#c9a97e]/40 text-[#a8795b] text-lg hover:border-[#a8795b] transition-colors"
                    >
                      +
                    </button>
                    <span className="text-[12px] italic text-[#b9927a]">
                      Maximum 10 guests per RSVP
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-2">
                <Btn onClick={back} variant="ghost">← Back</Btn>
                <Btn onClick={next}>Continue →</Btn>
              </div>
            </div>
          )}

          {/* ════ STEP 3 — Guest Details + Preferences ════ */}
          {step === 3 && form.attendance === "yes" && (
            <div className="flex flex-col gap-8">
              <div className="text-center mb-2">
                <h2 className="text-[28px] font-normal italic text-[#482612]"
                  style={{ fontFamily: "'Cormorant Garamond',serif" }}>
                  Guest details & meal preferences
                </h2>
                <p className="text-[13px] text-[#b9927a] mt-1 italic">
                  Help us prepare the perfect experience for each of your party.
                </p>
              </div>

              {/* Per-guest rows */}
              <div className="flex flex-col gap-6">
                {form.guests.map((guest, i) => (
                  <div key={guest.id} className="bg-white border border-[#c9a97e]/20 p-6">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8795b] font-semibold mb-5">
                      Guest {i + 1} {i === 0 && "(You)"}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={labelClass}>First Name *</label>
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="First name"
                          value={guest.firstName}
                          onChange={(e) => updateGuest(guest.id, "firstName", e.target.value)}
                        />
                        <FieldError name={`guest_${i}_fn`} />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name *</label>
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="Last name"
                          value={guest.lastName}
                          onChange={(e) => updateGuest(guest.id, "lastName", e.target.value)}
                        />
                        <FieldError name={`guest_${i}_ln`} />
                      </div>
                    </div>

                    {/* Meal choice */}
                    <div>
                      <label className={labelClass}>Meal Preference *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {MEAL_OPTIONS.map(({ value, label, emoji }) => (
                          <button
                            key={value}
                            onClick={() => updateGuest(guest.id, "meal", value)}
                            className={`flex flex-col items-center gap-1 py-3 px-2 border text-[11px] tracking-[0.05em] transition-all duration-200 ${
                              guest.meal === value
                                ? "border-[#a8795b] bg-[#a8795b]/8 text-[#a8795b]"
                                : "border-[#c9a97e]/25 text-[#b9927a] hover:border-[#a8795b]/40"
                            }`}
                          >
                            <span>{emoji}</span>
                            <span>{label}</span>
                          </button>
                        ))}
                      </div>
                      <FieldError name={`guest_${i}_meal`} />
                    </div>

                    {/* Dietary notes */}
                    <div className="mt-4">
                      <label className={labelClass}>Dietary Notes (optional)</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="e.g. nut allergy, halal, gluten-free…"
                        value={guest.dietaryNotes}
                        onChange={(e) => updateGuest(guest.id, "dietaryNotes", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Song request */}
              <div>
                <label className={labelClass}>Song Request 🎵 (optional)</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="What song will get you on the dance floor?"
                  value={form.songRequest}
                  onChange={(e) => updateForm("songRequest", e.target.value)}
                />
              </div>

              {/* Special message */}
              <div>
                <label className={labelClass}>A note for the couple (optional)</label>
                <textarea
                  className={`${inputClass} resize-none min-h-[100px]`}
                  placeholder="Any additional information or a warm message…"
                  value={form.specialMessage}
                  onChange={(e) => updateForm("specialMessage", e.target.value)}
                />
              </div>

              <div className="flex justify-between mt-2">
                <Btn onClick={back} variant="ghost">← Back</Btn>
                <Btn onClick={next}>Review RSVP →</Btn>
              </div>
            </div>
          )}

          {/* ════ STEP 4 — Confirmation ════ */}
          {step === 4 && (
            <div className="flex flex-col items-center text-center gap-8">

              {form.attendance === "yes" ? (
                <>
                  {/* Accepted */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 border border-[#c9a97e]/40 flex items-center justify-center">
                      <span className="text-4xl">🥂</span>
                    </div>
                    <h2
                      className="text-[clamp(32px,5vw,56px)] italic text-[#482612]"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}
                    >
                      We&apos;ll see you there!
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="h-px w-10 bg-[#c9a97e]/50" />
                      <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]" />
                      <div className="h-px w-10 bg-[#c9a97e]/50" />
                    </div>
                    <p
                      className="max-w-[440px] text-[17px] italic text-[#b9927a] leading-[1.7]"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}
                    >
                      Thank you, <strong className="text-[#482612] not-italic">{form.primaryName}</strong>! 
                      Your RSVP has been received. We are so excited to celebrate with you and your party of {form.guestCount}.
                    </p>
                  </div>

                  {/* Summary card */}
                  <div className="w-full max-w-[520px] bg-[#f7f3ee] border border-[#c9a97e]/30 p-8 text-left relative">
                    <div className="absolute inset-[6px] border border-[#c9a97e]/12 pointer-events-none" />
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8795b] mb-5">Your RSVP Summary</p>
                    <div className="flex flex-col gap-3">
                      {[
                        { label: "Name",    value: form.primaryName },
                        { label: "Email",   value: form.email },
                        { label: "Guests",  value: `${form.guestCount} ${form.guestCount === 1 ? "person" : "people"}` },
                        ...(form.songRequest ? [{ label: "Song Request", value: form.songRequest }] : []),
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between border-b border-[#c9a97e]/15 pb-2">
                          <span className="text-[10px] uppercase tracking-[0.15em] text-[#9d7760]">{label}</span>
                          <span className="text-[13px] text-[#482612]">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      href="/invitation/premium"
                      className="border border-[#a8795b] text-[#a8795b] text-[11px] uppercase tracking-[0.2em] px-8 py-3 hover:bg-[#a8795b] hover:text-white transition-all duration-300"
                    >
                      Back to Invitation
                    </Link>
                    <Link
                      href="/invitation/premium#gift"
                      className="bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.2em] px-8 py-3 hover:bg-[#482612] transition-all duration-300"
                    >
                      Leave a Wish 🤍
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {/* Declined */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 border border-[#c9a97e]/40 flex items-center justify-center">
                      <span className="text-4xl">💌</span>
                    </div>
                    <h2
                      className="text-[clamp(28px,4vw,48px)] italic text-[#482612]"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}
                    >
                      We&apos;ll miss you dearly
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="h-px w-10 bg-[#c9a97e]/50" />
                      <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]" />
                      <div className="h-px w-10 bg-[#c9a97e]/50" />
                    </div>
                    <p
                      className="max-w-[440px] text-[17px] italic text-[#b9927a] leading-[1.7]"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}
                    >
                      Thank you for letting us know, <strong className="text-[#482612] not-italic">{form.primaryName}</strong>. 
                      While we&apos;ll miss having you with us, we&apos;ll always hold a special place for you in our hearts.
                    </p>
                    <p
                      className="text-[15px] italic text-[#b9927a]"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}
                    >
                      Please still leave us a warm wish below — it would mean the world. 🤍
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      href="/invitation/premium"
                      className="border border-[#a8795b] text-[#a8795b] text-[11px] uppercase tracking-[0.2em] px-8 py-3 hover:bg-[#a8795b] hover:text-white transition-all duration-300"
                    >
                      Back to Invitation
                    </Link>
                    <Link
                      href="/invitation/premium#gift"
                      className="bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.2em] px-8 py-3 hover:bg-[#482612] transition-all duration-300"
                    >
                      Leave a Wish
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mini footer */}
      <footer className="bg-[#1c1713] py-8 px-6 text-center">
        <p
          className="text-[clamp(20px,3vw,32px)] text-[#c9a97e]/40 italic"
          style={{ fontFamily: "'Cormorant Garamond',serif" }}
        >
          Barke & William · 02 May 2026
        </p>
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/15 mt-2">
          Powered by Timeless Vows
        </p>
      </footer>
    </div>
  );
}