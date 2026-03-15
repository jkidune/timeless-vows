"use client";
// FILE PATH: app/components/admin/ClientsTable.tsx

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

interface ClientInvitation {
  id: string;
  slug: string;
  partner1Name: string;
  partner2Name: string;
  status: string;
  weddingDate: Date;
}

interface Client {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: string;
  createdAt: Date;
  ownedInvitations: ClientInvitation[];
}

interface Props {
  clients: Client[];
}

export function ClientsTable({ clients }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const statusColor = (s: string) => ({
    ACTIVE:    { bg: "rgba(90,122,90,0.10)",   text: "#5a7a5a" },
    DRAFT:     { bg: "rgba(158,119,96,0.10)",  text: "#9d7760" },
    EXPIRED:   { bg: "rgba(100,100,100,0.10)", text: "#666" },
    SUSPENDED: { bg: "rgba(180,80,80,0.10)",   text: "#b45050" },
  }[s] ?? { bg: "rgba(158,119,96,0.10)", text: "#9d7760" });

  return (
    <div className="bg-white border border-[#c9a97e]/18 overflow-hidden">

      {/* Header row */}
      <div className="grid grid-cols-[1fr_100px_120px_100px_48px] border-b border-[#c9a97e]/15 bg-[#f7f3ee]">
        {["Client", "Role", "Joined", "Invitations", ""].map((h) => (
          <div key={h} className="px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-[#9d7760] font-semibold">
            {h}
          </div>
        ))}
      </div>

      {clients.map((client) => {
        const isOpen = expanded === client.id;
        const joinDate = new Date(client.createdAt).toLocaleDateString("en-GB", {
          day: "numeric", month: "short", year: "numeric",
        });

        return (
          <div key={client.id} className="border-b border-[#c9a97e]/8 last:border-0">

            {/* Main row */}
            <div className="grid grid-cols-[1fr_100px_120px_100px_48px] hover:bg-[#f7f3ee]/40 transition-colors">
              <div className="px-4 py-4">
                <p className="text-[13px] font-medium text-[#482612]">
                  {client.name ?? "—"}
                </p>
                <p className="text-[11px] text-[#b9927a] mt-0.5">{client.email}</p>
                {client.phone && (
                  <p className="text-[10px] text-[#c9a97e]/60 mt-0.5">{client.phone}</p>
                )}
              </div>

              <div className="px-4 py-4 flex items-center">
                <span
                  className="text-[9px] uppercase tracking-[0.15em] px-2.5 py-1.5 font-medium"
                  style={{
                    background: client.role === "PLANNER"
                      ? "rgba(100,120,160,0.10)" : "rgba(168,121,91,0.10)",
                    color: client.role === "PLANNER" ? "#6478a0" : "#a8795b",
                  }}
                >
                  {client.role}
                </span>
              </div>

              <div className="px-4 py-4 flex items-center">
                <p className="text-[11px] text-[#b9927a]">{joinDate}</p>
              </div>

              <div className="px-4 py-4 flex items-center">
                <p
                  className="text-[clamp(20px,3vw,28px)] text-[#482612] leading-none"
                  style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)" }}
                >
                  {client.ownedInvitations.length}
                </p>
              </div>

              <div className="px-2 py-4 flex items-center justify-center">
                {client.ownedInvitations.length > 0 && (
                  <button
                    onClick={() => setExpanded(isOpen ? null : client.id)}
                    className="p-1.5 text-[#c9a97e]/50 hover:text-[#a8795b] transition-colors"
                  >
                    {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                )}
              </div>
            </div>

            {/* Expanded invitations */}
            {isOpen && client.ownedInvitations.length > 0 && (
              <div className="bg-[#f7f3ee]/60 px-6 py-4 border-t border-[#c9a97e]/8">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#a8795b] mb-3">
                  Invitations
                </p>
                <div className="flex flex-col gap-2">
                  {client.ownedInvitations.map((inv) => {
                    const sc = statusColor(inv.status);
                    const wDate = new Date(inv.weddingDate).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                    });
                    return (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between bg-white border border-[#c9a97e]/15 px-4 py-3"
                      >
                        <div>
                          <p className="text-[13px] font-medium text-[#482612]">
                            {inv.partner1Name} & {inv.partner2Name}
                          </p>
                          <p className="text-[10px] text-[#b9927a] mt-0.5">
                            {wDate} · /{inv.slug}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className="text-[9px] uppercase tracking-[0.15em] px-2.5 py-1"
                            style={{ background: sc.bg, color: sc.text }}
                          >
                            {inv.status}
                          </span>
                          <a
                            href={`/invitation/${inv.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#c9a97e]/50 hover:text-[#a8795b] transition-colors"
                          >
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}