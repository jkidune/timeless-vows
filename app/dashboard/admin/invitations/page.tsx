// FILE PATH: app/dashboard/admin/invitations/page.tsx

import { prisma } from "@/lib/prisma";
import { CreateInvitationModal } from "@/app/components/admin/CreateInvitationModal";
import { AdminInvitationsTable } from "@/app/components/admin/AdminInvitationsTable";
import { ScrollText } from "lucide-react";

export default async function AdminInvitationsPage() {
  const [invitations, clients] = await Promise.all([
    prisma.invitation.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        _count: { select: { rsvpResponses: true, giftWishes: true } },
      },
    }),
    prisma.user.findMany({
      where:   { role: { in: ["COUPLE", "PLANNER"] } },
      orderBy: { name: "asc" },
      select:  { id: true, name: true, email: true, role: true },
    }),
  ]);

  return (
    <div className="w-full min-h-full p-6 lg:p-10">

      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ScrollText size={16} className="text-[#a8795b]" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8795b]">Admin</p>
          </div>
          <h1
            className="text-[clamp(24px,3vw,36px)] text-[#482612] leading-tight"
            style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
          >
            All Invitations
          </h1>
          <p className="text-[12px] text-[#b9927a] mt-1">
            {invitations.length} invitation{invitations.length !== 1 ? "s" : ""} total ·{" "}
            {invitations.filter((i) => i.status === "ACTIVE").length} active
          </p>
        </div>
        <CreateInvitationModal clients={clients} />
      </div>

      {invitations.length === 0 ? (
        <div className="bg-white border border-[#c9a97e]/18 p-16 text-center">
          <ScrollText size={32} className="text-[#c9a97e]/30 mx-auto mb-4" />
          <p className="text-[20px] italic text-[#b9927a]" style={{ fontFamily: "'Cormorant Garamond',serif" }}>
            No invitations yet
          </p>
          <p className="text-[12px] text-[#c9a97e]/50 mt-2">
            Create your first invitation using the button above
          </p>
        </div>
      ) : (
        <AdminInvitationsTable invitations={invitations} />
      )}
    </div>
  );
}