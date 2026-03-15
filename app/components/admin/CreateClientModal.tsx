"use client";
// FILE PATH: app/components/admin/CreateClientModal.tsx

import { useState } from "react";
import { UserPlus, X, Loader2, Copy, Check } from "lucide-react";
import { createClientAccount } from "@/app/actions/admin";

export function CreateClientModal() {
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState<{ tempPassword?: string; email?: string } | null>(null);
  const [error,   setError]   = useState("");
  const [copied,  setCopied]  = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    role: "COUPLE" as "COUPLE" | "PLANNER",
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setLoading(true);
    setError("");

    const res = await createClientAccount(form);
    setLoading(false);

    if (res.error) { setError(res.error); return; }
    setResult({ tempPassword: res.tempPassword, email: form.email });
  };

  const handleClose = () => {
    setOpen(false);
    setResult(null);
    setError("");
    setForm({ name: "", email: "", phone: "", role: "COUPLE" });
  };

  const copyPassword = async () => {
    if (!result?.tempPassword) return;
    await navigator.clipboard.writeText(result.tempPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass =
    "w-full bg-[#f7f3ee] border border-[#c9a97e]/25 text-[#482612] placeholder-[#b9927a]/40 px-4 py-3 text-[13px] outline-none focus:border-[#a8795b] focus:ring-2 focus:ring-[#a8795b]/8 transition-all duration-300";
  const labelClass =
    "block text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-2";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.2em] px-5 py-3 hover:bg-[#482612] transition-colors duration-300"
      >
        <UserPlus size={13} />
        New Client
      </button>

      {open && (
        <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#c9a97e]/20 w-full max-w-[480px] relative shadow-2xl">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#c9a97e]/15">
              <h2 className="text-[16px] font-semibold text-[#482612]">
                {result ? "Client Created" : "Create New Client"}
              </h2>
              <button onClick={handleClose} className="text-[#c9a97e]/50 hover:text-[#482612] transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-6">
              {!result ? (
                /* ── Create form ── */
                <div className="flex flex-col gap-4">
                  {error && (
                    <p className="text-[12px] text-red-500/80 italic px-3 py-2 bg-red-50 border border-red-100">
                      {error}
                    </p>
                  )}

                  {/* Role selector */}
                  <div>
                    <label className={labelClass}>Client Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["COUPLE", "PLANNER"] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => update("role", r)}
                          className="py-3 border text-[11px] uppercase tracking-[0.15em] transition-all duration-200"
                          style={{
                            borderColor: form.role === r ? "#a8795b" : "rgba(201,169,126,0.25)",
                            background:  form.role === r ? "rgba(168,121,91,0.06)" : "white",
                            color:       form.role === r ? "#a8795b" : "#b9927a",
                          }}
                        >
                          {r === "COUPLE" ? "💍 Couple" : "📋 Planner"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input type="text" className={inputClass} placeholder="e.g. Barke Mohamed"
                      value={form.name} onChange={(e) => update("name", e.target.value)} />
                  </div>

                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input type="email" className={inputClass} placeholder="client@example.com"
                      value={form.email} onChange={(e) => update("email", e.target.value)} />
                  </div>

                  <div>
                    <label className={labelClass}>Phone (optional)</label>
                    <input type="tel" className={inputClass} placeholder="+255 7XX XXX XXXX"
                      value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                  </div>

                  <p className="text-[11px] italic text-[#b9927a]">
                    A temporary password will be generated. The client can reset it via email.
                  </p>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.22em] py-4 font-semibold hover:bg-[#482612] disabled:bg-[#c9a97e]/50 transition-colors duration-300 mt-2"
                  >
                    {loading
                      ? <span className="flex items-center justify-center gap-2"><Loader2 size={13} className="animate-spin" /> Creating…</span>
                      : "Create Client Account"
                    }
                  </button>
                </div>
              ) : (
                /* ── Success state ── */
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200">
                    <Check size={16} className="text-green-600 shrink-0" />
                    <p className="text-[13px] text-green-700">
                      Account created for <strong>{result.email}</strong>
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-2">
                      Temporary Password
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#f7f3ee] border border-[#c9a97e]/25 px-4 py-3 font-mono text-[14px] text-[#482612] tracking-[0.1em]">
                        {result.tempPassword}
                      </div>
                      <button
                        onClick={copyPassword}
                        className="p-3 border border-[#c9a97e]/25 text-[#a8795b] hover:bg-[#a8795b] hover:text-white hover:border-[#a8795b] transition-all duration-200"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-[11px] italic text-[#b9927a] mt-2">
                      Share this with the client. They should reset their password on first login.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleClose}
                      className="flex-1 border border-[#c9a97e]/30 text-[#a8795b] text-[11px] uppercase tracking-[0.2em] py-3 hover:bg-[#a8795b] hover:text-white transition-all duration-300"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => { setResult(null); setForm({ name: "", email: "", phone: "", role: "COUPLE" }); }}
                      className="flex-1 bg-[#f7f3ee] border border-[#c9a97e]/20 text-[#9d7760] text-[11px] uppercase tracking-[0.2em] py-3 hover:border-[#a8795b] transition-all duration-300"
                    >
                      Add Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}