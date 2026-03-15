"use client";
// FILE PATH: app/components/dashboard/InvitationEditor.tsx

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { updateInvitation } from "@/app/actions/invitation";
import type { Invitation } from "@prisma/client";

interface Props {
  invitation: Invitation;
}

type Tab = "details" | "content" | "gifts" | "settings";

const TABS: { id: Tab; label: string }[] = [
  { id: "details",  label: "Wedding Details" },
  { id: "content",  label: "Page Content" },
  { id: "gifts",    label: "Gift Details" },
  { id: "settings", label: "Settings" },
];

export function InvitationEditor({ invitation }: Props) {
  const [tab,    setTab]    = useState<Tab>("details");
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  // Form state
  const [form, setForm] = useState({
    partner1Name:      invitation.partner1Name ?? "",
    partner2Name:      invitation.partner2Name ?? "",
    weddingDate:       invitation.weddingDate
                         ? new Date(invitation.weddingDate).toISOString().slice(0, 16)
                         : "",
    venue:             invitation.venue         ?? "",
    venueAddress:      invitation.venueAddress  ?? "",
    mapsLink:          invitation.mapsLink      ?? "",
    storyText:         invitation.storyText     ?? "",
    inviteText:        invitation.inviteText    ?? "",
    mobileMoneyLabel:  invitation.mobileMoneyLabel  ?? "",
    mobileMoneyName:   invitation.mobileMoneyName   ?? "",
    mobileMoneyNumber: invitation.mobileMoneyNumber ?? "",
    bankName:          invitation.bankName          ?? "",
    bankAccountName:   invitation.bankAccountName   ?? "",
    bankAccountNumber: invitation.bankAccountNumber ?? "",
    bankBranch:        invitation.bankBranch        ?? "",
    status:            invitation.status            ?? "DRAFT",
    rsvpDeadline:      invitation.rsvpDeadline
                         ? new Date(invitation.rsvpDeadline).toISOString().slice(0, 10)
                         : "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await updateInvitation(invitation.id, {
      partner1Name:      form.partner1Name,
      partner2Name:      form.partner2Name,
      weddingDate:       form.weddingDate ? new Date(form.weddingDate) : undefined,
      venue:             form.venue       || undefined,
      venueAddress:      form.venueAddress || undefined,
      mapsLink:          form.mapsLink    || undefined,
      storyText:         form.storyText   || undefined,
      inviteText:        form.inviteText  || undefined,
      mobileMoneyLabel:  form.mobileMoneyLabel  || undefined,
      mobileMoneyName:   form.mobileMoneyName   || undefined,
      mobileMoneyNumber: form.mobileMoneyNumber || undefined,
      bankName:          form.bankName          || undefined,
      bankAccountName:   form.bankAccountName   || undefined,
      bankAccountNumber: form.bankAccountNumber || undefined,
      bankBranch:        form.bankBranch        || undefined,
      status:            form.status as "DRAFT" | "ACTIVE" | "EXPIRED" | "SUSPENDED",
      rsvpDeadline:      form.rsvpDeadline ? new Date(form.rsvpDeadline) : undefined,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass =
    "w-full bg-[#f7f3ee] border border-[#c9a97e]/25 text-[#482612] placeholder-[#b9927a]/40 px-4 py-3 text-[13px] outline-none focus:border-[#a8795b] focus:ring-2 focus:ring-[#a8795b]/8 transition-all duration-300";
  const labelClass =
    "block text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-2";

  return (
    <div className="bg-white border border-[#c9a97e]/18">

      {/* Tab bar */}
      <div className="flex border-b border-[#c9a97e]/15 overflow-x-auto">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="flex-shrink-0 px-6 py-4 text-[11px] uppercase tracking-[0.18em] transition-all duration-200 border-b-2"
            style={{
              borderBottomColor: tab === id ? "#a8795b" : "transparent",
              color: tab === id ? "#a8795b" : "#b9927a",
              background: tab === id ? "rgba(168,121,91,0.04)" : "transparent",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6 lg:p-8">

        {/* ── WEDDING DETAILS ── */}
        {tab === "details" && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Partner 1 Name</label>
                <input type="text" className={inputClass} value={form.partner1Name}
                  onChange={(e) => update("partner1Name", e.target.value)} placeholder="e.g. Barke" />
              </div>
              <div>
                <label className={labelClass}>Partner 2 Name</label>
                <input type="text" className={inputClass} value={form.partner2Name}
                  onChange={(e) => update("partner2Name", e.target.value)} placeholder="e.g. William" />
              </div>
            </div>

            <div>
              <label className={labelClass}>Wedding Date & Time</label>
              <input type="datetime-local" className={inputClass} value={form.weddingDate}
                onChange={(e) => update("weddingDate", e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>Venue Name</label>
              <input type="text" className={inputClass} value={form.venue}
                onChange={(e) => update("venue", e.target.value)} placeholder="e.g. St. Albans Cathedral" />
            </div>

            <div>
              <label className={labelClass}>Venue Address</label>
              <input type="text" className={inputClass} value={form.venueAddress}
                onChange={(e) => update("venueAddress", e.target.value)} placeholder="e.g. Upanga 0124, Dar es Salaam" />
            </div>

            <div>
              <label className={labelClass}>Google Maps Link</label>
              <input type="url" className={inputClass} value={form.mapsLink}
                onChange={(e) => update("mapsLink", e.target.value)} placeholder="https://maps.app.goo.gl/..." />
            </div>
          </div>
        )}

        {/* ── PAGE CONTENT ── */}
        {tab === "content" && (
          <div className="flex flex-col gap-6">
            <div>
              <label className={labelClass}>Invitation Text</label>
              <p className="text-[11px] italic text-[#b9927a] mb-2">
                The short paragraph shown in the hero section
              </p>
              <textarea
                className={`${inputClass} resize-none min-h-[100px]`}
                value={form.inviteText}
                onChange={(e) => update("inviteText", e.target.value)}
                placeholder="We would like to invite you to celebrate with us…"
              />
            </div>

            <div>
              <label className={labelClass}>Our Story</label>
              <p className="text-[11px] italic text-[#b9927a] mb-2">
                The longer story text shown in the Our Story section
              </p>
              <textarea
                className={`${inputClass} resize-none min-h-[180px]`}
                value={form.storyText}
                onChange={(e) => update("storyText", e.target.value)}
                placeholder="By God's grace and through His perfect plan, two hearts have become one…"
              />
            </div>
          </div>
        )}

        {/* ── GIFT DETAILS ── */}
        {tab === "gifts" && (
          <div className="flex flex-col gap-6">
            <p
              className="text-[15px] italic text-[#b9927a]"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
            >
              These details appear in the Gift &amp; Wishes section of your invitation page.
            </p>

            <div className="border border-[#c9a97e]/20 p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-4">
                Mobile Money
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Provider Label</label>
                  <input type="text" className={inputClass} value={form.mobileMoneyLabel}
                    onChange={(e) => update("mobileMoneyLabel", e.target.value)} placeholder="e.g. SELCOM, M-Pesa" />
                </div>
                <div>
                  <label className={labelClass}>Account Name</label>
                  <input type="text" className={inputClass} value={form.mobileMoneyName}
                    onChange={(e) => update("mobileMoneyName", e.target.value)} placeholder="Full name on account" />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input type="tel" className={inputClass} value={form.mobileMoneyNumber}
                    onChange={(e) => update("mobileMoneyNumber", e.target.value)} placeholder="+255 7XX XXX XXXX" />
                </div>
              </div>
            </div>

            <div className="border border-[#c9a97e]/20 p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-4">
                Bank Transfer
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Bank Name</label>
                  <input type="text" className={inputClass} value={form.bankName}
                    onChange={(e) => update("bankName", e.target.value)} placeholder="e.g. CRDB Bank Tanzania" />
                </div>
                <div>
                  <label className={labelClass}>Account Name</label>
                  <input type="text" className={inputClass} value={form.bankAccountName}
                    onChange={(e) => update("bankAccountName", e.target.value)} placeholder="Name on account" />
                </div>
                <div>
                  <label className={labelClass}>Account Number</label>
                  <input type="text" className={inputClass} value={form.bankAccountNumber}
                    onChange={(e) => update("bankAccountNumber", e.target.value)} placeholder="Account number" />
                </div>
                <div>
                  <label className={labelClass}>Branch</label>
                  <input type="text" className={inputClass} value={form.bankBranch}
                    onChange={(e) => update("bankBranch", e.target.value)} placeholder="Branch name" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {tab === "settings" && (
          <div className="flex flex-col gap-6">
            <div>
              <label className={labelClass}>Invitation Status</label>
              <p className="text-[11px] italic text-[#b9927a] mb-2">
                Set to Active to make your page visible to guests
              </p>
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
              >
                <option value="DRAFT">Draft — not visible to guests</option>
                <option value="ACTIVE">Active — live and visible</option>
                <option value="EXPIRED">Expired</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>RSVP Deadline</label>
              <input type="date" className={inputClass} value={form.rsvpDeadline}
                onChange={(e) => update("rsvpDeadline", e.target.value)} />
            </div>

            <div className="border border-[#c9a97e]/20 p-4 bg-[#f7f3ee]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#9d7760] mb-1">Invitation URL</p>
              <p className="text-[13px] font-medium text-[#482612]">
                {typeof window !== "undefined" ? window.location.origin : ""}/invitation/{invitation.slug}
              </p>
            </div>
          </div>
        )}

        {/* Save button */}
        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-[#c9a97e]/15">
          {saved && (
            <p className="text-[11px] text-[#5a7a5a] italic">Changes saved ✓</p>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.22em] px-8 py-3.5 font-semibold hover:bg-[#482612] disabled:bg-[#c9a97e]/50 transition-colors duration-300"
          >
            {saving
              ? <><Loader2 size={13} className="animate-spin" /> Saving…</>
              : <><Save size={13} /> Save Changes</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}