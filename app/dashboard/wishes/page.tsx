// FILE PATH: app/dashboard/wishes/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";
import { WishesList } from "@/app/components/dashboard/WishesList";
import { Heart } from "lucide-react";

export default async function WishesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const invitation = await prisma.invitation.findFirst({
    where: { ownerId: user.id },
  });

  const wishes = invitation
    ? await prisma.giftWish.findMany({
        where:   { invitationId: invitation.id },
        orderBy: { submittedAt: "desc" },
      })
    : [];

  const approved   = wishes.filter((w) => w.isApproved);
  const unapproved = wishes.filter((w) => !w.isApproved);

  return (
    <div className="w-full min-h-full p-6 lg:p-10">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Heart size={16} className="text-[#a8795b]" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8795b]">Dashboard</p>
        </div>
        <h1
          className="text-[clamp(24px,3vw,36px)] text-[#482612] leading-tight"
          style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
        >
          Gift Wishes
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Total Wishes",    value: wishes.length,     color: "#a8795b" },
          { label: "Shown on Page",   value: approved.length,   color: "#5a7a5a" },
          { label: "Hidden",          value: unapproved.length, color: "#9d7760" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-[#c9a97e]/18 p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[3px] h-full" style={{ background: color }} />
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#9d7760] mb-2 pl-3">{label}</p>
            <p
              className="text-[clamp(28px,4vw,40px)] text-[#482612] leading-none pl-3"
              style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)" }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {wishes.length === 0 ? (
        <div className="bg-white border border-[#c9a97e]/18 p-16 text-center">
          <Heart size={32} className="text-[#c9a97e]/30 mx-auto mb-4" />
          <p
            className="text-[20px] italic text-[#b9927a]"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            No wishes received yet
          </p>
          <p className="text-[12px] text-[#c9a97e]/50 mt-2">
            Guest messages will appear here
          </p>
        </div>
      ) : (
        <WishesList wishes={wishes} />
      )}
    </div>
  );
}