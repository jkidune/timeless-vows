"use client";
// FILE PATH: app/components/dashboard/SettingsForm.tsx

import { useState } from "react";
import { Save, Loader2, KeyRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@prisma/client";

interface Props {
  user: User;
}

export function SettingsForm({ user }: Props) {
  const [name,    setName]    = useState(user.name ?? "");
  const [phone,   setPhone]   = useState(user.phone ?? "");
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [pwPhase, setPwPhase] = useState<"idle" | "sending" | "sent">("idle");
  const [error,   setError]   = useState("");

  const inputClass =
    "w-full bg-[#f7f3ee] border border-[#c9a97e]/25 text-[#482612] placeholder-[#b9927a]/40 px-4 py-3 text-[13px] outline-none focus:border-[#a8795b] focus:ring-2 focus:ring-[#a8795b]/8 transition-all duration-300";
  const labelClass =
    "block text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-2";

  const handleSaveProfile = async () => {
    setSaving(true);
    setError("");
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });
    if (!res.ok) {
      setError("Failed to save. Please try again.");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const handlePasswordReset = async () => {
    setPwPhase("sending");
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/settings`,
    });
    setPwPhase("sent");
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Profile section */}
      <div className="bg-white border border-[#c9a97e]/18 p-6">
        <h2 className="text-[13px] font-semibold text-[#482612] uppercase tracking-[0.08em] mb-5">
          Profile
        </h2>

        {error && (
          <p className="mb-4 text-[12px] text-red-500/80 italic">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input type="text" className={inputClass} value={name}
              onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>

          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              className={`${inputClass} opacity-50 cursor-not-allowed`}
              value={user.email}
              readOnly
            />
            <p className="text-[10px] italic text-[#b9927a] mt-1">
              Email cannot be changed here
            </p>
          </div>

          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" className={inputClass} value={phone}
              onChange={(e) => setPhone(e.target.value)} placeholder="+255 7XX XXX XXXX" />
          </div>

          <div>
            <label className={labelClass}>Account Role</label>
            <div
              className="px-4 py-3 bg-[#f7f3ee] border border-[#c9a97e]/20 text-[13px] text-[#9d7760] uppercase tracking-[0.08em]"
            >
              {user.role}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            {saved && <p className="text-[11px] text-[#5a7a5a] italic">Saved ✓</p>}
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="flex items-center gap-2 bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.22em] px-8 py-3.5 font-semibold hover:bg-[#482612] disabled:bg-[#c9a97e]/50 transition-colors duration-300"
            >
              {saving
                ? <><Loader2 size={13} className="animate-spin" /> Saving…</>
                : <><Save size={13} /> Save Profile</>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Password section */}
      <div className="bg-white border border-[#c9a97e]/18 p-6">
        <h2 className="text-[13px] font-semibold text-[#482612] uppercase tracking-[0.08em] mb-2">
          Password
        </h2>
        <p className="text-[12px] italic text-[#b9927a] mb-5">
          We&apos;ll send a password reset link to your email address.
        </p>

        {pwPhase === "sent" ? (
          <p className="text-[13px] italic text-[#5a7a5a]">
            Reset link sent to {user.email} ✓
          </p>
        ) : (
          <button
            onClick={handlePasswordReset}
            disabled={pwPhase === "sending"}
            className="flex items-center gap-2 border border-[#c9a97e]/30 text-[#a8795b] text-[11px] uppercase tracking-[0.2em] px-6 py-3 hover:bg-[#a8795b] hover:text-white hover:border-[#a8795b] disabled:opacity-50 transition-all duration-300"
          >
            {pwPhase === "sending"
              ? <><Loader2 size={13} className="animate-spin" /> Sending…</>
              : <><KeyRound size={13} /> Send Reset Link</>
            }
          </button>
        )}
      </div>

      {/* Account info */}
      <div className="bg-[#f7f3ee] border border-[#c9a97e]/15 p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#9d7760] mb-3">Account Info</p>
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] text-[#b9927a]">
            Member since: <span className="text-[#482612]">
              {new Date(user.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </p>
          <p className="text-[11px] text-[#b9927a]">
            Account ID: <span className="text-[#482612] font-mono text-[10px]">{user.id.slice(0, 8)}…</span>
          </p>
        </div>
      </div>
    </div>
  );
}