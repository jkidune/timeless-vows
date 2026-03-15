"use client";
// FILE PATH: app/auth/login/LoginForm.tsx

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirectTo   = searchParams.get("redirectTo") || "/dashboard";
  const callbackErr  = searchParams.get("error");

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState(
    callbackErr === "callback_failed" ? "Authentication failed. Please try again." : ""
  );
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  const inputClass =
    "w-full bg-white border border-[#c9a97e]/30 text-[#482612] placeholder-[#b9927a]/40 px-4 py-3.5 text-[14px] outline-none focus:border-[#a8795b] focus:ring-2 focus:ring-[#a8795b]/10 transition-all duration-300";

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex items-center justify-center px-4">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "url('/illustrations/premium/schedule-pattern.svg')",
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative w-full max-w-[420px]">

        {/* Brand */}
        <div className="text-center mb-10">
          <Link href="/">
            <p
              className="text-[clamp(28px,5vw,40px)] text-[#482612]"
              style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
            >
              Timeless Vows
            </p>
          </Link>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-8 bg-[#c9a97e]/50" />
            <div className="h-1 w-1 rotate-45 bg-[#c9a97e]" />
            <div className="h-px w-8 bg-[#c9a97e]/50" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#a8795b] mt-3">
            Dashboard Access
          </p>
        </div>

        {/* Card */}
        <div className="relative bg-white border border-[#c9a97e]/25 p-8 shadow-[0_8px_40px_rgba(168,121,91,0.08)]">
          <div className="absolute inset-[6px] border border-[#c9a97e]/10 pointer-events-none" />

          <h1 className="text-[22px] font-semibold text-[#482612] mb-1">Welcome back</h1>
          <p className="text-[14px] italic text-[#b9927a] mb-7" style={{ fontFamily: "'Cormorant Garamond',serif" }}>
            Sign in to your account
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-[13px] text-red-600 italic">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                className={inputClass}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-[10px] italic text-[#b9927a]/60 mt-1.5">
                Forgot your password? Sign in and visit{" "}
                <span className="text-[#a8795b]">Settings → Reset Password</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.25em] py-4 font-semibold hover:bg-[#482612] disabled:bg-[#c9a97e]/60 disabled:cursor-not-allowed transition-colors duration-300 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={13} className="animate-spin" /> Signing in…</> : "Sign In"}
            </button>
          </form>

          <p className="text-center text-[12px] text-[#b9927a] mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-[#a8795b] font-medium hover:text-[#482612] transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#c9a97e]/40 mt-6">
          Timeless Vows · Dar es Salaam
        </p>
      </div>
    </div>
  );
}
