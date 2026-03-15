"use client";
// FILE PATH: app/auth/signup/page.tsx

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Role = "COUPLE" | "PLANNER";

export default function SignupPage() {
  const router = useRouter();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [role,     setRole]     = useState<Role>("COUPLE");
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // If session exists immediately (email confirm disabled)
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    // Email confirmation required
    setSuccess("Account created! Check your email to confirm before signing in.");
    setLoading(false);
  };

  const inputClass =
    "w-full bg-white border border-[#c9a97e]/30 text-[#482612] placeholder-[#b9927a]/40 px-4 py-3.5 text-[14px] outline-none focus:border-[#a8795b] focus:ring-2 focus:ring-[#a8795b]/10 transition-all duration-300";

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex items-center justify-center px-4 py-12">

      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "url('/illustrations/premium/schedule-pattern.svg')",
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative w-full max-w-[440px]">

        {/* Brand */}
        <div className="text-center mb-10">
          <Link href="/">
            <p
              className="text-[clamp(28px,5vw,40px)] text-[#482612]"
              style={{
                fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
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
            Create Your Account
          </p>
        </div>

        {/* Card */}
        <div className="relative bg-white border border-[#c9a97e]/25 p-8 shadow-[0_8px_40px_rgba(168,121,91,0.08)]">
          <div className="absolute inset-[6px] border border-[#c9a97e]/10 pointer-events-none" />

          <h1 className="text-[22px] font-semibold text-[#482612] mb-1">
            Get started
          </h1>
          <p
            className="text-[14px] italic text-[#b9927a] mb-7"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            Create your Timeless Vows account
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-[13px] text-red-600 italic">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-5 px-4 py-3 bg-green-50 border border-green-200 text-[13px] text-green-700 italic">
              {success}
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Role selector */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-2">
                  I am a…
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["COUPLE", "PLANNER"] as Role[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className="py-3 px-4 border text-[11px] uppercase tracking-[0.15em] transition-all duration-200"
                      style={{
                        borderColor: role === r ? "#a8795b" : "rgba(201,169,126,0.3)",
                        background:  role === r ? "rgba(168,121,91,0.06)" : "white",
                        color:       role === r ? "#a8795b" : "#b9927a",
                      }}
                    >
                      {r === "COUPLE" ? "💍 Couple" : "📋 Wedding Planner"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className={inputClass}
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
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
                  minLength={8}
                  className={inputClass}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  className={inputClass}
                  placeholder="Repeat your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.25em] py-4 font-semibold hover:bg-[#482612] disabled:bg-[#c9a97e]/60 disabled:cursor-not-allowed transition-colors duration-300 mt-2"
              >
                {loading ? "Creating account…" : "Create Account"}
              </button>
            </form>
          )}

          <p className="text-center text-[12px] text-[#b9927a] mt-6">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[#a8795b] font-medium hover:text-[#482612] transition-colors"
            >
              Sign in
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