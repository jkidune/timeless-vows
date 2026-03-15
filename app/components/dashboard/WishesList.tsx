"use client";
// FILE PATH: app/components/dashboard/WishesList.tsx

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toggleWishApproval } from "@/app/actions/invitation";
import type { GiftWish } from "@prisma/client";

interface Props {
  wishes: GiftWish[];
}

export function WishesList({ wishes: initial }: Props) {
  const [wishes,   setWishes]   = useState(initial);
  const [toggling, setToggling] = useState<string | null>(null);

  const handleToggle = async (id: string, current: boolean) => {
    setToggling(id);
    await toggleWishApproval(id, !current);
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isApproved: !current } : w))
    );
    setToggling(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {wishes.map((w) => (
        <div
          key={w.id}
          className="bg-white border border-[#c9a97e]/18 p-6 relative transition-all duration-300"
          style={{ opacity: w.isApproved ? 1 : 0.5 }}
        >
          {/* Approval badge */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <span
              className="text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 font-medium"
              style={{
                background: w.isApproved ? "rgba(90,122,90,0.10)" : "rgba(158,119,96,0.10)",
                color:      w.isApproved ? "#5a7a5a" : "#9d7760",
              }}
            >
              {w.isApproved ? "Visible on page" : "Hidden"}
            </span>

            <button
              onClick={() => handleToggle(w.id, w.isApproved)}
              disabled={toggling === w.id}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-[#c9a97e]/50 hover:text-[#a8795b] transition-colors disabled:opacity-40"
              title={w.isApproved ? "Hide from page" : "Show on page"}
            >
              {w.isApproved
                ? <><EyeOff size={12} /> Hide</>
                : <><Eye size={12} /> Show</>
              }
            </button>
          </div>

          {/* Wish content */}
          <p
            className="text-[16px] italic text-[#4e2d28] leading-[1.7] mb-3"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            &ldquo;{w.message}&rdquo;
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-3 border-t border-[#c9a97e]/12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#a8795b] font-medium">
                — {w.guestName}
                {w.fromFamily ? ` · ${w.fromFamily}` : ""}
              </p>
              <p className="text-[10px] text-[#c9a97e]/45 mt-0.5">
                {new Date(w.submittedAt).toLocaleDateString("en-GB", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </p>
            </div>
            {w.wishType && (
              <span className="text-[9px] uppercase tracking-[0.1em] px-2.5 py-1 bg-[#a8795b]/8 text-[#a8795b]">
                {w.wishType}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}