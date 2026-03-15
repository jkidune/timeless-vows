"use client";
// FILE PATH: app/components/admin/AdminInvitationsTable.tsx

import { useState } from "react";
import { ExternalLink, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { setInvitationStatus, deleteInvitation } from "@/app/actions/admin";

interface Invitation {
  id: string;
  slug: string;
  partner1Name: string;
  partner2Name: string;
  status: string;
  template: string;
  weddingDate: Date;
  createdAt: Date;
  owner: { id: string; name: string | null; email: string };
  _count: { rsvpResponses: number; giftWishes: number };
}

interface Props {
  invitations: Invitation[];
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  ACTIVE:    { bg: "rgba(90,122,90,0.10)",   text: "#5a7a5a" },
  DRAFT:     { bg: "rgba(158,119,96,0.10)",  text: "#9d7760" },
  EXPIRED:   { bg: "rgba(100,100,100,0.10)", text: "#666" },
  SUSPENDED: { bg: "rgba(180,80,80,0.10)",   text: "#b45050" },
};

export function AdminInvitationsTable({ invitations: initial }: Props) {
  const [invitations, setInvitations] = useState(initial);
  const [toggling,    setToggling]    = useState<string | null>(null);
  const [deleting,    setDeleting]    = useState<string | null>(null);

  const handleToggleStatus = async (inv: Invitation) => {
    const next = inv.status === "ACTIVE" ? "DRAFT" : "ACTIVE";
    setToggling(inv.id);
    await setInvitationStatus(inv.id, next);
    setInvitations((prev) =>
      prev.map((i) => i.id === inv.id ? { ...i, status: next } : i)
    );
    setToggling(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this invitation? This will also delete all RSVPs and wishes.")) return;
    setDeleting(id);
    await deleteInvitation(id);
    setInvitations((prev) => prev.filter((i) => i.id !== id));
    setDeleting(null);
  };

  return (
    <div className="bg-white border border-[#c9a97e]/18 overflow-hidden">

      {/* Header */}
      <div className="grid grid-cols-[1fr_140px_80px_100px_120px_80px] border-b border-[#c9a97e]/15 bg-[#f7f3ee]">
        {["Invitation", "Client", "Template", "Status", "Stats", ""].map((h) => (
          <div key={h} className="px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-[#9d7760] font-semibold">{h}</div>
        ))}
      </div>

      {invitations.map((inv) => {
        const sc = STATUS_COLORS[inv.status] ?? STATUS_COLORS.DRAFT;
        const wDate = new Date(inv.weddingDate).toLocaleDateString("en-GB", {
          day: "numeric", month: "short", year: "numeric",
        });

        return (
          <div key={inv.id} className="grid grid-cols-[1fr_140px_80px_100px_120px_80px] border-b border-[#c9a97e]/8 last:border-0 hover:bg-[#f7f3ee]/30 transition-colors">

            {/* Invitation */}
            <div className="px-4 py-4">
              <p className="text-[13px] font-medium text-[#482612]">
                {inv.partner1Name} & {inv.partner2Name}
              </p>
              <p className="text-[11px] text-[#b9927a] mt-0.5">{wDate}</p>
              <p className="text-[10px] font-mono text-[#c9a97e]/60 mt-0.5">/{inv.slug}</p>
            </div>

            {/* Client */}
            <div className="px-4 py-4 flex items-center">
              <div>
                <p className="text-[12px] font-medium text-[#482612] truncate max-w-[120px]">
                  {inv.owner.name ?? "—"}
                </p>
                <p className="text-[10px] text-[#b9927a] truncate max-w-[120px]">
                  {inv.owner.email}
                </p>
              </div>
            </div>

            {/* Template */}
            <div className="px-4 py-4 flex items-center">
              <span
                className="text-[9px] uppercase tracking-[0.12em] px-2 py-1"
                style={{
                  background: inv.template === "PREMIUM" ? "rgba(168,121,91,0.10)" : "rgba(100,120,160,0.10)",
                  color:      inv.template === "PREMIUM" ? "#a8795b" : "#6478a0",
                }}
              >
                {inv.template}
              </span>
            </div>

            {/* Status */}
            <div className="px-4 py-4 flex items-center">
              <span
                className="text-[9px] uppercase tracking-[0.12em] px-2.5 py-1.5 font-medium"
                style={{ background: sc.bg, color: sc.text }}
              >
                {inv.status}
              </span>
            </div>

            {/* Stats */}
            <div className="px-4 py-4 flex items-center gap-3">
              <div className="text-center">
                <p className="text-[14px] font-medium text-[#482612]">{inv._count.rsvpResponses}</p>
                <p className="text-[8px] uppercase tracking-[0.1em] text-[#c9a97e]/60">RSVPs</p>
              </div>
              <div className="text-center">
                <p className="text-[14px] font-medium text-[#482612]">{inv._count.giftWishes}</p>
                <p className="text-[8px] uppercase tracking-[0.1em] text-[#c9a97e]/60">Wishes</p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-2 py-4 flex items-center justify-center gap-1">
              <a
                href={`/invitation/${inv.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-[#c9a97e]/40 hover:text-[#a8795b] transition-colors"
                title="View live page"
              >
                <ExternalLink size={13} />
              </a>

              <button
                onClick={() => handleToggleStatus(inv)}
                disabled={toggling === inv.id}
                className="p-1.5 text-[#c9a97e]/40 hover:text-[#a8795b] transition-colors"
                title={inv.status === "ACTIVE" ? "Set to Draft" : "Set to Active"}
              >
                {inv.status === "ACTIVE"
                  ? <ToggleRight size={14} className="text-[#5a7a5a]" />
                  : <ToggleLeft  size={14} />
                }
              </button>

              <button
                onClick={() => handleDelete(inv.id)}
                disabled={deleting === inv.id}
                className="p-1.5 text-[#c9a97e]/30 hover:text-red-400 transition-colors"
                title="Delete"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}