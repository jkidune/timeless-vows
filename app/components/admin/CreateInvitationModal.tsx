"use client";
// FILE PATH: app/components/admin/CreateInvitationModal.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Loader2 } from "lucide-react";
import { createInvitation } from "@/app/actions/admin";

interface Client {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

interface Props {
  clients: Client[];
}

export function CreateInvitationModal({ clients }: Props) {
  const router  = useRouter();
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const [form, setForm] = useState({
    partner1Name: "",
    partner2Name: "",
    weddingDate:  "",
    venue:        "",
    venueAddress: "",
    template:     "PREMIUM" as "STANDARD" | "PREMIUM",
    ownerId:      "",
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  // Auto-generate slug from names
  const autoSlug = form.partner1Name && form.partner2Name && form.weddingDate
    ? `${form.partner1Name.toLowerCase().replace(/\s+/g, "-")}-${form.partner2Name.toLowerCase().replace(/\s+/g, "-")}-${new Date(form.weddingDate).getFullYear()}`
    : "";

  const handleSubmit = async () => {
    if (!form.partner1Name || !form.partner2Name || !form.weddingDate || !form.ownerId) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");

    const res = await createInvitation({ ...form, slug: autoSlug });
    setLoading(false);

    if (res.error) { setError(res.error); return; }

    setOpen(false);
    setForm({ partner1Name: "", partner2Name: "", weddingDate: "", venue: "", venueAddress: "", template: "PREMIUM", ownerId: "" });
    router.refresh();
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
        <Plus size={13} />
        New Invitation
      </button>

      {open && (
        <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#c9a97e]/20 w-full max-w-[540px] relative shadow-2xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between px-6 py-4 border-b border-[#c9a97e]/15 sticky top-0 bg-white z-10">
              <h2 className="text-[16px] font-semibold text-[#482612]">Create New Invitation</h2>
              <button onClick={() => setOpen(false)} className="text-[#c9a97e]/50 hover:text-[#482612] transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {error && (
                <p className="text-[12px] text-red-500/80 italic px-3 py-2 bg-red-50 border border-red-100">
                  {error}
                </p>
              )}

              {/* Assign to client */}
              <div>
                <label className={labelClass}>Assign to Client *</label>
                {clients.length === 0 ? (
                  <p className="text-[12px] italic text-[#b9927a]">
                    No clients yet — create a client account first.
                  </p>
                ) : (
                  <select className={inputClass} value={form.ownerId}
                    onChange={(e) => update("ownerId", e.target.value)}>
                    <option value="">Select a client…</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name ?? c.email} ({c.role})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Partner names */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Partner 1 Name *</label>
                  <input type="text" className={inputClass} placeholder="e.g. Barke"
                    value={form.partner1Name} onChange={(e) => update("partner1Name", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Partner 2 Name *</label>
                  <input type="text" className={inputClass} placeholder="e.g. William"
                    value={form.partner2Name} onChange={(e) => update("partner2Name", e.target.value)} />
                </div>
              </div>

              {/* Wedding date */}
              <div>
                <label className={labelClass}>Wedding Date *</label>
                <input type="date" className={inputClass} value={form.weddingDate}
                  onChange={(e) => update("weddingDate", e.target.value)} />
              </div>

              {/* Venue */}
              <div>
                <label className={labelClass}>Venue Name</label>
                <input type="text" className={inputClass} placeholder="e.g. St. Albans Cathedral"
                  value={form.venue} onChange={(e) => update("venue", e.target.value)} />
              </div>

              <div>
                <label className={labelClass}>Venue Address</label>
                <input type="text" className={inputClass} placeholder="e.g. Upanga 0124, Dar es Salaam"
                  value={form.venueAddress} onChange={(e) => update("venueAddress", e.target.value)} />
              </div>

              {/* Template */}
              <div>
                <label className={labelClass}>Template</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["PREMIUM", "STANDARD"] as const).map((t) => (
                    <button key={t} type="button"
                      onClick={() => update("template", t)}
                      className="py-3 border text-[11px] uppercase tracking-[0.15em] transition-all duration-200"
                      style={{
                        borderColor: form.template === t ? "#a8795b" : "rgba(201,169,126,0.25)",
                        background:  form.template === t ? "rgba(168,121,91,0.06)" : "white",
                        color:       form.template === t ? "#a8795b" : "#b9927a",
                      }}
                    >
                      {t === "PREMIUM" ? "✦ Premium" : "◻ Standard"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auto slug preview */}
              {autoSlug && (
                <div className="bg-[#f7f3ee] border border-[#c9a97e]/20 px-4 py-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#9d7760] mb-1">Page URL will be</p>
                  <p className="text-[12px] font-mono text-[#482612]">
                    /invitation/<span className="text-[#a8795b]">{autoSlug}</span>
                  </p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || clients.length === 0}
                className="w-full bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.22em] py-4 font-semibold hover:bg-[#482612] disabled:bg-[#c9a97e]/50 transition-colors duration-300 mt-2"
              >
                {loading
                  ? <span className="flex items-center justify-center gap-2"><Loader2 size={13} className="animate-spin" /> Creating…</span>
                  : "Create Invitation"
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}