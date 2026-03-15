"use client";
// FILE PATH: app/components/admin/InvitationDetailClient.tsx

import { useState } from "react";
import {
  Mail, Heart, ImageIcon, Download,
  CheckCircle, XCircle, Users,
  ChevronDown, ChevronUp, Save, Loader2,
  ExternalLink, ToggleLeft, ToggleRight,
} from "lucide-react";
import { updateInvitation } from "@/app/actions/invitation";
import { setInvitationStatus } from "@/app/actions/admin";

type Tab = "overview" | "rsvps" | "wishes" | "gallery" | "edit";

// ── Types ──────────────────────────────────────────────────────────────

interface RsvpRow {
  id: string; primaryName: string; email: string; phone: string | null;
  attendance: string; guestCount: number; songRequest: string | null;
  specialNote: string | null; guestsJson: unknown; submittedAt: Date;
}

interface WishRow {
  id: string; guestName: string; fromFamily: string | null;
  wishType: string | null; message: string; isApproved: boolean; submittedAt: Date;
}

interface GalleryRow { id: string; url: string; caption: string | null; }

interface InvitationFull {
  id: string; slug: string; status: string; template: string;
  partner1Name: string; partner2Name: string;
  weddingDate: Date; venue: string | null; venueAddress: string | null;
  mapsLink: string | null; heroImageUrl: string | null; coupleImageUrl: string | null;
  churchImageUrl: string | null; openingVideoUrl: string | null;
  storyText: string | null; inviteText: string | null;
  mobileMoneyLabel: string | null; mobileMoneyName: string | null; mobileMoneyNumber: string | null;
  bankName: string | null; bankAccountName: string | null;
  bankAccountNumber: string | null; bankBranch: string | null;
  rsvpDeadline: Date | null;
  owner: { name: string | null; email: string; phone: string | null };
  rsvpResponses: RsvpRow[];
  giftWishes: WishRow[];
  galleryImages: GalleryRow[];
  accepted: number; declined: number; totalGuests: number;
  _count: { rsvpResponses: number; giftWishes: number; galleryImages: number };
}

interface Props { invitation: InvitationFull; }

// ── CSV helpers ────────────────────────────────────────────────────────

function downloadCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const csv = [headers, ...rows]
    .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const a = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })),
    download: filename,
  });
  a.click(); URL.revokeObjectURL(a.href);
}

// ── Main component ─────────────────────────────────────────────────────

export function InvitationDetailClient({ invitation: initial }: Props) {
  const [tab,      setTab]      = useState<Tab>("overview");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [inv,      setInv]      = useState(initial);

  const coupleNames = `${inv.partner1Name} ${inv.partner2Name}`;

  // ── Edit form state ──
  const [form, setForm] = useState({
    partner1Name:      inv.partner1Name      ?? "",
    partner2Name:      inv.partner2Name      ?? "",
    weddingDate:       inv.weddingDate
                         ? new Date(inv.weddingDate).toISOString().slice(0, 16)
                         : "",
    venue:             inv.venue             ?? "",
    venueAddress:      inv.venueAddress      ?? "",
    mapsLink:          inv.mapsLink          ?? "",
    heroImageUrl:      inv.heroImageUrl      ?? "",
    coupleImageUrl:    inv.coupleImageUrl    ?? "",
    churchImageUrl:    inv.churchImageUrl    ?? "",
    openingVideoUrl:   inv.openingVideoUrl   ?? "",
    inviteText:        inv.inviteText        ?? "",
    storyText:         inv.storyText         ?? "",
    mobileMoneyLabel:  inv.mobileMoneyLabel  ?? "",
    mobileMoneyName:   inv.mobileMoneyName   ?? "",
    mobileMoneyNumber: inv.mobileMoneyNumber ?? "",
    bankName:          inv.bankName          ?? "",
    bankAccountName:   inv.bankAccountName   ?? "",
    bankAccountNumber: inv.bankAccountNumber ?? "",
    bankBranch:        inv.bankBranch        ?? "",
    rsvpDeadline:      inv.rsvpDeadline
                         ? new Date(inv.rsvpDeadline).toISOString().slice(0, 10)
                         : "",
    status:            inv.status            ?? "DRAFT",
  });

  const [saving,     setSaving]     = useState(false);
  const [saveMsg,    setSaveMsg]    = useState("");
  const [toggling,   setToggling]   = useState(false);

  const u = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true); setSaveMsg("");
    await updateInvitation(inv.id, {
      partner1Name:      form.partner1Name      || undefined,
      partner2Name:      form.partner2Name      || undefined,
      weddingDate:       form.weddingDate       ? new Date(form.weddingDate) : undefined,
      venue:             form.venue             || undefined,
      venueAddress:      form.venueAddress      || undefined,
      mapsLink:          form.mapsLink          || undefined,
// heroImageUrl is not expected by updateInvitation; omit it
      //coupleImageUrl:    form.coupleImageUrl    || undefined,
      //churchImageUrl:    form.churchImageUrl    || undefined,
     // openingVideoUrl:   form.openingVideoUrl   || undefined,
      inviteText:        form.inviteText        || undefined,
      storyText:         form.storyText         || undefined,
      mobileMoneyLabel:  form.mobileMoneyLabel  || undefined,
      mobileMoneyName:   form.mobileMoneyName   || undefined,
      mobileMoneyNumber: form.mobileMoneyNumber || undefined,
      bankName:          form.bankName          || undefined,
      bankAccountName:   form.bankAccountName   || undefined,
      bankAccountNumber: form.bankAccountNumber || undefined,
      bankBranch:        form.bankBranch        || undefined,
      rsvpDeadline:      form.rsvpDeadline      ? new Date(form.rsvpDeadline) : undefined,
      status:            form.status as "DRAFT" | "ACTIVE" | "EXPIRED" | "SUSPENDED",
    });
    // Update local state so header reflects changes immediately
    setInv((prev) => ({
      ...prev,
      partner1Name: form.partner1Name || prev.partner1Name,
      partner2Name: form.partner2Name || prev.partner2Name,
      status:       form.status,
    }));
    setSaving(false);
    setSaveMsg("Saved ✓");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const handleToggleStatus = async () => {
    const next = inv.status === "ACTIVE" ? "DRAFT" : "ACTIVE";
    setToggling(true);
    await setInvitationStatus(inv.id, next as "DRAFT" | "ACTIVE");
    setInv((prev) => ({ ...prev, status: next }));
    setForm((f) => ({ ...f, status: next }));
    setToggling(false);
  };

  // ── Shared styles ──
  const input = "w-full bg-[#f7f3ee] border border-[#c9a97e]/25 text-[#482612] placeholder-[#b9927a]/40 px-4 py-3 text-[13px] outline-none focus:border-[#a8795b] focus:ring-2 focus:ring-[#a8795b]/8 transition-all duration-300";
  const label = "block text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-2";

  const TABS: { id: Tab; label: string; count?: number | null }[] = [
    { id: "overview", label: "Overview" },
    { id: "rsvps",    label: "RSVPs",       count: inv._count.rsvpResponses },
    { id: "wishes",   label: "Gift Wishes", count: inv._count.giftWishes },
    { id: "gallery",  label: "Gallery",     count: inv._count.galleryImages },
    { id: "edit",     label: "Edit" },
  ];

  const statusColor = {
    ACTIVE:    { bg: "rgba(90,122,90,0.10)",   text: "#5a7a5a" },
    DRAFT:     { bg: "rgba(158,119,96,0.10)",  text: "#9d7760" },
    EXPIRED:   { bg: "rgba(100,100,100,0.10)", text: "#666" },
    SUSPENDED: { bg: "rgba(180,80,80,0.10)",   text: "#b45050" },
  }[inv.status] ?? { bg: "rgba(158,119,96,0.10)", text: "#9d7760" };

  return (
    <div>

      {/* Status bar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <span className="text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 font-semibold"
          style={{ background: statusColor.bg, color: statusColor.text }}>
          {inv.status}
        </span>
        <button onClick={handleToggleStatus} disabled={toggling}
          className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-[#b9927a] hover:text-[#a8795b] transition-colors disabled:opacity-40">
          {inv.status === "ACTIVE"
            ? <><ToggleRight size={14} className="text-[#5a7a5a]" /> Set to Draft</>
            : <><ToggleLeft  size={14} /> Set to Active</>
          }
        </button>
        <a href={`/invitation/${inv.slug}`} target="_blank" rel="noreferrer"
          className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-[#b9927a] hover:text-[#a8795b] transition-colors ml-auto">
          <ExternalLink size={12} /> View Live
        </a>
      </div>

      {/* Tab bar */}
      <div className="flex items-center border-b border-[#c9a97e]/15 mb-8 overflow-x-auto">
        {TABS.map(({ id, label: lbl, count }) => (
          <button key={id} onClick={() => setTab(id)}
            className="flex items-center gap-2 px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] border-b-2 transition-all duration-200 shrink-0"
            style={{
              borderBottomColor: tab === id ? "#a8795b" : "transparent",
              color:             tab === id ? "#a8795b" : "#b9927a",
              background:        tab === id ? "rgba(168,121,91,0.04)" : "transparent",
            }}>
            {lbl}
            {count != null && (
              <span className="text-[9px] px-1.5 py-0.5 font-semibold"
                style={{
                  background: tab === id ? "rgba(168,121,91,0.15)" : "rgba(201,169,126,0.12)",
                  color:      tab === id ? "#a8795b" : "#9d7760",
                }}>
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {tab === "overview" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Total RSVPs",  value: inv._count.rsvpResponses, Icon: Mail,        color: "#a8795b" },
              { label: "Accepted",     value: inv.accepted,             Icon: CheckCircle, color: "#5a7a5a" },
              { label: "Declined",     value: inv.declined,             Icon: XCircle,     color: "#b45050" },
              { label: "Total Guests", value: inv.totalGuests,          Icon: Users,       color: "#7a8a9a" },
            ].map(({ label: lbl, value, Icon, color }) => (
              <div key={lbl} className="bg-white border border-[#c9a97e]/18 p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[3px] h-full" style={{ background: color }} />
                <div className="flex items-start justify-between pl-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#9d7760] mb-2">{lbl}</p>
                    <p className="text-[clamp(28px,4vw,40px)] text-[#482612] leading-none"
                      style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)" }}>
                      {value}
                    </p>
                  </div>
                  <div className="p-2 mt-1" style={{ background: `${color}18` }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Client info */}
          <div className="bg-white border border-[#c9a97e]/18 p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-4">Client Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Name",     value: inv.owner.name  ?? "—" },
                { label: "Email",    value: inv.owner.email },
                { label: "Phone",    value: inv.owner.phone ?? "—" },
                { label: "Template", value: inv.template },
                { label: "Venue",    value: inv.venue       ?? "—" },
                { label: "Page URL", value: `/invitation/${inv.slug}` },
              ].map(({ label: lbl, value }) => (
                <div key={lbl}>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#9d7760] mb-1">{lbl}</p>
                  <p className="text-[13px] text-[#482612] font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent wishes preview */}
          <div className="bg-white border border-[#c9a97e]/18 p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-4">
              Gift Wishes · {inv._count.giftWishes} total
            </p>
            {inv.giftWishes.length === 0 ? (
              <p className="text-[13px] italic text-[#b9927a]">No wishes yet</p>
            ) : (
              <div className="flex flex-col gap-3">
                {inv.giftWishes.slice(0, 4).map((w) => (
                  <div key={w.id} className="border-l-2 border-[#c9a97e]/40 pl-3 py-1">
                    <p className="text-[13px] italic text-[#4e2d28]" style={{ fontFamily: "'Cormorant Garamond',serif" }}>
                      &ldquo;{w.message.slice(0, 100)}{w.message.length > 100 ? "…" : ""}&rdquo;
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-[#a8795b] mt-1">— {w.guestName}</p>
                  </div>
                ))}
                {inv.giftWishes.length > 4 && (
                  <button onClick={() => setTab("wishes")} className="text-[11px] text-[#a8795b] hover:text-[#482612] transition-colors text-left mt-1">
                    View all {inv.giftWishes.length} wishes →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── RSVPs ── */}
      {tab === "rsvps" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] text-[#b9927a]">{inv.rsvpResponses.length} response{inv.rsvpResponses.length !== 1 ? "s" : ""}</p>
            <button onClick={() => downloadCsv(
              `rsvps-${coupleNames.toLowerCase().replace(/\s+/g, "-")}.csv`,
              ["Name","Email","Phone","Attendance","Guests","Song Request","Note","Submitted"],
              inv.rsvpResponses.map((r) => [r.primaryName, r.email, r.phone ?? "", r.attendance, r.guestCount, r.songRequest ?? "", r.specialNote ?? "", new Date(r.submittedAt).toLocaleDateString("en-GB")])
            )} className="flex items-center gap-2 border border-[#c9a97e]/30 text-[#a8795b] text-[10px] uppercase tracking-[0.2em] px-4 py-2 hover:bg-[#a8795b] hover:text-white hover:border-[#a8795b] transition-all duration-300">
              <Download size={12} /> Export CSV
            </button>
          </div>
          {inv.rsvpResponses.length === 0 ? (
            <div className="bg-white border border-[#c9a97e]/18 p-12 text-center">
              <Mail size={28} className="text-[#c9a97e]/30 mx-auto mb-3" />
              <p className="text-[16px] italic text-[#b9927a]" style={{ fontFamily: "'Cormorant Garamond',serif" }}>No RSVPs yet</p>
            </div>
          ) : (
            <div className="bg-white border border-[#c9a97e]/18">
              <div className="grid grid-cols-[1fr_110px_70px_100px_40px] border-b border-[#c9a97e]/15 bg-[#f7f3ee]">
                {["Guest","Status","Guests","Date",""].map((h) => (
                  <div key={h} className="px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-[#9d7760] font-semibold">{h}</div>
                ))}
              </div>
              {inv.rsvpResponses.map((r) => {
                const isOpen = expanded === r.id;
                const guests = (r.guestsJson as Array<{ firstName: string; lastName: string; meal: string; dietaryNotes: string }>) ?? [];
                return (
                  <div key={r.id} className="border-b border-[#c9a97e]/8 last:border-0">
                    <div className="grid grid-cols-[1fr_110px_70px_100px_40px] hover:bg-[#f7f3ee]/40 transition-colors">
                      <div className="px-4 py-3.5">
                        <p className="text-[13px] font-medium text-[#482612]">{r.primaryName}</p>
                        <p className="text-[11px] text-[#b9927a]">{r.email}</p>
                      </div>
                      <div className="px-4 py-3.5 flex items-center">
                        <span className="text-[9px] uppercase tracking-[0.12em] px-2 py-1 font-medium"
                          style={{ background: r.attendance === "ACCEPTED" ? "rgba(90,122,90,0.10)" : "rgba(180,80,80,0.08)", color: r.attendance === "ACCEPTED" ? "#5a7a5a" : "#b45050" }}>
                          {r.attendance}
                        </span>
                      </div>
                      <div className="px-4 py-3.5 flex items-center"><p className="text-[13px] text-[#482612]">{r.guestCount}</p></div>
                      <div className="px-4 py-3.5 flex items-center"><p className="text-[11px] text-[#b9927a]">{new Date(r.submittedAt).toLocaleDateString("en-GB", { day:"numeric", month:"short" })}</p></div>
                      <div className="px-2 py-3.5 flex items-center justify-center">
                        {guests.length > 0 && (
                          <button onClick={() => setExpanded(isOpen ? null : r.id)} className="p-1.5 text-[#c9a97e]/40 hover:text-[#a8795b] transition-colors">
                            {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                        )}
                      </div>
                    </div>
                    {isOpen && (
                      <div className="bg-[#f7f3ee]/60 px-6 py-3 border-t border-[#c9a97e]/8">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {guests.map((g, i) => (
                            <div key={i} className="bg-white border border-[#c9a97e]/15 px-3 py-2">
                              <p className="text-[12px] font-medium text-[#482612]">{g.firstName} {g.lastName}</p>
                              <p className="text-[10px] text-[#b9927a]">{g.meal || "No meal selected"}</p>
                              {g.dietaryNotes && <p className="text-[10px] italic text-[#b9927a]">{g.dietaryNotes}</p>}
                            </div>
                          ))}
                        </div>
                        {(r.songRequest || r.specialNote) && (
                          <div className="mt-2 flex gap-4">
                            {r.songRequest && <p className="text-[11px] text-[#9d7760]">🎵 {r.songRequest}</p>}
                            {r.specialNote && <p className="text-[11px] text-[#9d7760]">💬 {r.specialNote}</p>}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── WISHES ── */}
      {tab === "wishes" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] text-[#b9927a]">{inv.giftWishes.length} wish{inv.giftWishes.length !== 1 ? "es" : ""}</p>
            <button onClick={() => downloadCsv(
              `wishes-${coupleNames.toLowerCase().replace(/\s+/g, "-")}.csv`,
              ["Guest Name","From Family","Type","Message","Approved","Submitted"],
              inv.giftWishes.map((w) => [w.guestName, w.fromFamily ?? "", w.wishType ?? "", w.message, w.isApproved ? "Yes" : "No", new Date(w.submittedAt).toLocaleDateString("en-GB")])
            )} className="flex items-center gap-2 border border-[#c9a97e]/30 text-[#a8795b] text-[10px] uppercase tracking-[0.2em] px-4 py-2 hover:bg-[#a8795b] hover:text-white hover:border-[#a8795b] transition-all duration-300">
              <Download size={12} /> Export CSV
            </button>
          </div>
          {inv.giftWishes.length === 0 ? (
            <div className="bg-white border border-[#c9a97e]/18 p-12 text-center">
              <Heart size={28} className="text-[#c9a97e]/30 mx-auto mb-3" />
              <p className="text-[16px] italic text-[#b9927a]" style={{ fontFamily: "'Cormorant Garamond',serif" }}>No wishes yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {inv.giftWishes.map((w) => (
                <div key={w.id} className="bg-white border border-[#c9a97e]/18 p-5" style={{ opacity: w.isApproved ? 1 : 0.55 }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[9px] uppercase tracking-[0.12em] px-2 py-1 font-medium"
                      style={{ background: w.isApproved ? "rgba(90,122,90,0.08)" : "rgba(158,119,96,0.10)", color: w.isApproved ? "#5a7a5a" : "#9d7760" }}>
                      {w.isApproved ? "Visible" : "Hidden"}
                    </span>
                    {w.wishType && <span className="text-[9px] uppercase tracking-[0.1em] px-2 py-1 bg-[#a8795b]/8 text-[#a8795b]">{w.wishType}</span>}
                  </div>
                  <p className="text-[15px] italic text-[#4e2d28] leading-[1.6] mb-3" style={{ fontFamily: "'Cormorant Garamond',serif" }}>
                    &ldquo;{w.message}&rdquo;
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="text-[10px] uppercase tracking-[0.1em] text-[#a8795b]">— {w.guestName}{w.fromFamily ? ` · ${w.fromFamily}` : ""}</p>
                    <p className="text-[10px] text-[#c9a97e]/50">{new Date(w.submittedAt).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── GALLERY ── */}
      {tab === "gallery" && (
        <div>
          <p className="text-[13px] text-[#b9927a] mb-4">{inv.galleryImages.length} image{inv.galleryImages.length !== 1 ? "s" : ""}</p>
          {inv.galleryImages.length === 0 ? (
            <div className="bg-white border border-[#c9a97e]/18 p-12 text-center">
              <ImageIcon size={28} className="text-[#c9a97e]/30 mx-auto mb-3" />
              <p className="text-[16px] italic text-[#b9927a]" style={{ fontFamily: "'Cormorant Garamond',serif" }}>No gallery images</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {inv.galleryImages.map((img) => (
                <div key={img.id} className="relative aspect-square bg-[#f7f3ee] border border-[#c9a97e]/15 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.caption ?? ""} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── EDIT ── */}
      {tab === "edit" && (
        <div className="bg-white border border-[#c9a97e]/18">

          {/* Edit sub-tabs */}
          {(() => {
            const EDIT_TABS = [
              { id: "wedding",  label: "Wedding Details" },
              { id: "content",  label: "Page Content" },
              { id: "media",    label: "Media & Images" },
              { id: "gifts",    label: "Gift Details" },
              { id: "settings", label: "Settings" },
            ];
            const [editTab, setEditTab] = useState("wedding");

            return (
              <>
                {/* Sub-tab bar */}
                <div className="flex border-b border-[#c9a97e]/15 overflow-x-auto">
                  {EDIT_TABS.map(({ id, label: lbl }) => (
                    <button key={id} onClick={() => setEditTab(id)}
                      className="flex-shrink-0 px-5 py-3.5 text-[11px] uppercase tracking-[0.15em] border-b-2 transition-all duration-200"
                      style={{
                        borderBottomColor: editTab === id ? "#a8795b" : "transparent",
                        color:             editTab === id ? "#a8795b" : "#b9927a",
                        background:        editTab === id ? "rgba(168,121,91,0.04)" : "transparent",
                      }}>
                      {lbl}
                    </button>
                  ))}
                </div>

                <div className="p-6 lg:p-8">

                  {/* Wedding Details */}
                  {editTab === "wedding" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div><label className={label}>Partner 1 Name</label><input className={input} value={form.partner1Name} onChange={(e) => u("partner1Name", e.target.value)} placeholder="Barke" /></div>
                      <div><label className={label}>Partner 2 Name</label><input className={input} value={form.partner2Name} onChange={(e) => u("partner2Name", e.target.value)} placeholder="William" /></div>
                      <div className="sm:col-span-2"><label className={label}>Wedding Date & Time</label><input type="datetime-local" className={input} value={form.weddingDate} onChange={(e) => u("weddingDate", e.target.value)} /></div>
                      <div className="sm:col-span-2"><label className={label}>Venue Name</label><input className={input} value={form.venue} onChange={(e) => u("venue", e.target.value)} placeholder="St. Albans Cathedral" /></div>
                      <div className="sm:col-span-2"><label className={label}>Venue Address</label><input className={input} value={form.venueAddress} onChange={(e) => u("venueAddress", e.target.value)} placeholder="Upanga 0124, Dar es Salaam" /></div>
                      <div className="sm:col-span-2"><label className={label}>Google Maps Link</label><input className={input} value={form.mapsLink} onChange={(e) => u("mapsLink", e.target.value)} placeholder="https://maps.app.goo.gl/..." /></div>
                      <div><label className={label}>RSVP Deadline</label><input type="date" className={input} value={form.rsvpDeadline} onChange={(e) => u("rsvpDeadline", e.target.value)} /></div>
                    </div>
                  )}

                  {/* Page Content */}
                  {editTab === "content" && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <label className={label}>Invite Text</label>
                        <p className="text-[11px] italic text-[#b9927a] mb-2">Short text shown in the hero / opening sequence</p>
                        <textarea className={`${input} resize-none min-h-[80px]`} value={form.inviteText} onChange={(e) => u("inviteText", e.target.value)} placeholder="You are cordially invited…" />
                      </div>
                      <div>
                        <label className={label}>Our Story</label>
                        <p className="text-[11px] italic text-[#b9927a] mb-2">Shown in the Our Story section. Separate paragraphs with a blank line.</p>
                        <textarea className={`${input} resize-none min-h-[200px]`} value={form.storyText} onChange={(e) => u("storyText", e.target.value)} placeholder="By God's grace two hearts became one…" />
                      </div>
                    </div>
                  )}

                  {/* Media & Images */}
                  {editTab === "media" && (
                    <div className="flex flex-col gap-5">
                      <p className="text-[12px] italic text-[#b9927a]">
                        Paste Cloudinary, Supabase, or any public image/video URL. Upload files first from the Gallery tab or Supabase dashboard.
                      </p>
                      {[
                        { key: "heroImageUrl",    lbl: "Hero Background Image URL",      hint: "Full-page background on the hero section" },
                        { key: "coupleImageUrl",  lbl: "Couple Image URL",               hint: "Portrait photo shown in Our Story section" },
                        { key: "churchImageUrl",  lbl: "Church / Venue Image URL",       hint: "Illustration or photo shown in the venue section" },
                        { key: "openingVideoUrl", lbl: "Opening Video URL",              hint: "Full-screen video shown before the page opens (.mp4)" },
                      ].map(({ key, lbl, hint }) => (
                        <div key={key}>
                          <label className={label}>{lbl}</label>
                          <p className="text-[10px] italic text-[#b9927a]/70 mb-2">{hint}</p>
                          <input className={input} value={form[key as keyof typeof form]} onChange={(e) => u(key as keyof typeof form, e.target.value)} placeholder="https://..." />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Gift Details */}
                  {editTab === "gifts" && (
                    <div className="flex flex-col gap-6">
                      <div className="border border-[#c9a97e]/20 p-5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-4">Mobile Money</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div><label className={label}>Provider Label</label><input className={input} value={form.mobileMoneyLabel} onChange={(e) => u("mobileMoneyLabel", e.target.value)} placeholder="SELCOM, M-Pesa…" /></div>
                          <div><label className={label}>Account Name</label><input className={input} value={form.mobileMoneyName} onChange={(e) => u("mobileMoneyName", e.target.value)} placeholder="Full name" /></div>
                          <div><label className={label}>Phone Number</label><input className={input} value={form.mobileMoneyNumber} onChange={(e) => u("mobileMoneyNumber", e.target.value)} placeholder="+255 7XX XXX XXXX" /></div>
                        </div>
                      </div>
                      <div className="border border-[#c9a97e]/20 p-5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8795b] font-semibold mb-4">Bank Transfer</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><label className={label}>Bank Name</label><input className={input} value={form.bankName} onChange={(e) => u("bankName", e.target.value)} placeholder="CRDB Bank Tanzania" /></div>
                          <div><label className={label}>Account Name</label><input className={input} value={form.bankAccountName} onChange={(e) => u("bankAccountName", e.target.value)} placeholder="Name on account" /></div>
                          <div><label className={label}>Account Number</label><input className={input} value={form.bankAccountNumber} onChange={(e) => u("bankAccountNumber", e.target.value)} placeholder="Account number" /></div>
                          <div><label className={label}>Branch</label><input className={input} value={form.bankBranch} onChange={(e) => u("bankBranch", e.target.value)} placeholder="Branch name" /></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Settings */}
                  {editTab === "settings" && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <label className={label}>Status</label>
                        <select className={input} value={form.status} onChange={(e) => u("status", e.target.value)}>
                          <option value="DRAFT">Draft — not visible to guests</option>
                          <option value="ACTIVE">Active — live and visible</option>
                          <option value="EXPIRED">Expired</option>
                          <option value="SUSPENDED">Suspended</option>
                        </select>
                      </div>
                      <div className="bg-[#f7f3ee] border border-[#c9a97e]/15 p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#9d7760] mb-1">Invitation URL</p>
                        <p className="text-[13px] font-medium text-[#482612] font-mono">/invitation/{inv.slug}</p>
                      </div>
                      <div className="bg-[#f7f3ee] border border-[#c9a97e]/15 p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#9d7760] mb-1">Template</p>
                        <p className="text-[13px] font-medium text-[#482612]">{inv.template}</p>
                      </div>
                    </div>
                  )}

                  {/* Save button — always visible in edit tab */}
                  <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-[#c9a97e]/15">
                    {saveMsg && <p className="text-[11px] text-[#5a7a5a] italic">{saveMsg}</p>}
                    <button onClick={handleSave} disabled={saving}
                      className="flex items-center gap-2 bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.22em] px-8 py-3.5 font-semibold hover:bg-[#482612] disabled:bg-[#c9a97e]/50 transition-colors duration-300">
                      {saving
                        ? <><Loader2 size={13} className="animate-spin" /> Saving…</>
                        : <><Save size={13} /> Save Changes</>
                      }
                    </button>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}