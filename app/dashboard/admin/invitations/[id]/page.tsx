// FILE PATH: app/dashboard/admin/invitations/[id]/page.tsx

import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/app/actions/auth";
import { InvitationDetailClient } from "@/app/components/admin/InvitationDetailClient";
import { ScrollText } from "lucide-react";
import Link from "next/link";

interface Props { params: { id: string }; }

export default async function InvitationDetailPage({ params }: Props) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/dashboard");

  const invitation = await prisma.invitation.findUnique({
    where: { id: params.id },
    include: {
      owner: { select: { id: true, name: true, email: true, phone: true } },
      rsvpResponses: {
        orderBy: { submittedAt: "desc" },
        select: {
          id: true, primaryName: true, email: true, phone: true,
          attendance: true, guestCount: true, songRequest: true,
          specialNote: true, guestsJson: true, submittedAt: true,
        },
      },
      giftWishes: {
        orderBy: { submittedAt: "desc" },
        select: {
          id: true, guestName: true, fromFamily: true,
          wishType: true, message: true, isApproved: true, submittedAt: true,
        },
      },
      galleryImages: {
        orderBy: { sortOrder: "asc" },
        select: { id: true, url: true, caption: true },
      },
      _count: { select: { rsvpResponses: true, giftWishes: true, galleryImages: true } },
    },
  });

  if (!invitation) notFound();

  const accepted    = invitation.rsvpResponses.filter((r) => r.attendance === "ACCEPTED");
  const declined    = invitation.rsvpResponses.filter((r) => r.attendance === "DECLINED");
  const totalGuests = accepted.reduce((s, r) => s + r.guestCount, 0);

  return (
    <div className="w-full min-h-full p-6 lg:p-10">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-[11px] uppercase tracking-[0.15em] text-[#b9927a]">
        <Link href="/dashboard/admin/invitations" className="hover:text-[#a8795b] transition-colors">
          All Invitations
        </Link>
        <span>/</span>
        <span className="text-[#482612]">
          {invitation.partner1Name} & {invitation.partner2Name}
        </span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <ScrollText size={16} className="text-[#a8795b]" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8795b]">Admin · Invitation Detail</p>
        </div>
        <h1
          className="text-[clamp(24px,3vw,36px)] text-[#482612] leading-tight"
          style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
        >
          {invitation.partner1Name} & {invitation.partner2Name}
        </h1>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <p className="text-[11px] text-[#b9927a]">
            {new Date(invitation.weddingDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <span className="text-[#c9a97e]/40">·</span>
          <p className="text-[11px] font-mono text-[#c9a97e]/60">/{invitation.slug}</p>
        </div>
      </div>

      <InvitationDetailClient
        invitation={{
          ...invitation,
// FILE PATH: app/dashboard/admin/invitations/[id]/page.tsx
          accepted: accepted.length,
          declined:    declined.length,
          totalGuests,
        }}
      />
    </div>
  );
}