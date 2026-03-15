"use client";
// FILE PATH: app/components/dashboard/RsvpTable.tsx

import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { deleteRsvp } from "@/app/actions/invitation";
import type { RsvpResponse } from "@prisma/client";

interface Props {
  rsvps: RsvpResponse[];
}

export function RsvpTable({ rsvps: initial }: Props) {
  const [rsvps,    setRsvps]    = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this RSVP response?")) return;
    setDeleting(id);
    await deleteRsvp(id);
    setRsvps((prev) => prev.filter((r) => r.id !== id));
    setDeleting(null);
  };

  return (
    <div className="bg-white border border-[#c9a97e]/18 overflow-hidden">

      {/* Table header */}
      <div className="grid grid-cols-[1fr_120px_80px_100px_44px] gap-0 border-b border-[#c9a97e]/15 bg-[#f7f3ee]">
        {["Guest Name", "Attendance", "Guests", "Submitted", ""].map((h) => (
          <div key={h} className="px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-[#9d7760] font-semibold">
            {h}
          </div>
        ))}
      </div>

      {/* Rows */}
      {rsvps.map((r) => {
        const isOpen  = expanded === r.id;
        const guests  = (r.guestsJson as Array<{ firstName: string; lastName: string; meal: string; dietaryNotes: string }>) ?? [];
        const date    = new Date(r.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

        return (
          <div key={r.id} className="border-b border-[#c9a97e]/8 last:border-0">
            {/* Main row */}
            <div className="grid grid-cols-[1fr_120px_80px_100px_44px] gap-0 hover:bg-[#f7f3ee]/50 transition-colors">

              {/* Name + email */}
              <div className="px-4 py-3.5">
                <p className="text-[13px] font-medium text-[#482612]">{r.primaryName}</p>
                <p className="text-[11px] text-[#b9927a] mt-0.5">{r.email}</p>
              </div>

              {/* Attendance badge */}
              <div className="px-4 py-3.5 flex items-center">
                <span
                  className="text-[9px] uppercase tracking-[0.15em] px-2.5 py-1.5 font-medium"
                  style={{
                    background: r.attendance === "ACCEPTED" ? "rgba(90,122,90,0.10)" : "rgba(180,80,80,0.08)",
                    color:      r.attendance === "ACCEPTED" ? "#5a7a5a" : "#b45050",
                  }}
                >
                  {r.attendance}
                </span>
              </div>

              {/* Guest count */}
              <div className="px-4 py-3.5 flex items-center">
                <p className="text-[13px] text-[#482612]">{r.guestCount}</p>
              </div>

              {/* Date */}
              <div className="px-4 py-3.5 flex items-center">
                <p className="text-[11px] text-[#b9927a]">{date}</p>
              </div>

              {/* Actions */}
              <div className="px-2 py-3.5 flex items-center justify-center gap-1">
                {guests.length > 0 && (
                  <button
                    onClick={() => setExpanded(isOpen ? null : r.id)}
                    className="p-1.5 text-[#c9a97e]/50 hover:text-[#a8795b] transition-colors"
                    title="View guest details"
                  >
                    {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                )}
                <button
                  onClick={() => handleDelete(r.id)}
                  disabled={deleting === r.id}
                  className="p-1.5 text-[#c9a97e]/30 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Expanded guest details */}
            {isOpen && guests.length > 0 && (
              <div className="bg-[#f7f3ee]/60 px-6 py-4 border-t border-[#c9a97e]/10">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#a8795b] mb-3">Guest Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {guests.map((g, i) => (
                    <div key={i} className="bg-white border border-[#c9a97e]/15 p-3">
                      <p className="text-[12px] font-medium text-[#482612]">
                        {g.firstName} {g.lastName}
                      </p>
                      <p className="text-[10px] text-[#b9927a] mt-0.5">
                        Meal: <span className="font-medium capitalize">{g.meal || "—"}</span>
                      </p>
                      {g.dietaryNotes && (
                        <p className="text-[10px] italic text-[#b9927a] mt-0.5">
                          Note: {g.dietaryNotes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Extra notes */}
                {(r.songRequest || r.specialNote) && (
                  <div className="mt-3 flex flex-wrap gap-4">
                    {r.songRequest && (
                      <p className="text-[11px] text-[#9d7760]">
                        🎵 Song request: <span className="italic text-[#482612]">{r.songRequest}</span>
                      </p>
                    )}
                    {r.specialNote && (
                      <p className="text-[11px] text-[#9d7760]">
                        💬 Note: <span className="italic text-[#482612]">{r.specialNote}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}