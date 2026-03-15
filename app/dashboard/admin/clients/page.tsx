// FILE PATH: app/dashboard/admin/clients/page.tsx

import { prisma } from "@/lib/prisma";
import { CreateClientModal } from "@/app/components/admin/CreateClientModal";
import { ClientsTable } from "@/app/components/admin/ClientsTable";
import { Users, UserPlus } from "lucide-react";

export default async function AdminClientsPage() {
  const clients = await prisma.user.findMany({
    where:   { role: { in: ["COUPLE", "PLANNER"] } },
    orderBy: { createdAt: "desc" },
    include: {
      ownedInvitations: {
        select: {
          id: true, slug: true, partner1Name: true,
          partner2Name: true, status: true, weddingDate: true,
        },
      },
    },
  });

  return (
    <div className="w-full min-h-full p-6 lg:p-10">

      {/* Header */}
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users size={16} className="text-[#a8795b]" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8795b]">Admin</p>
          </div>
          <h1
            className="text-[clamp(24px,3vw,36px)] text-[#482612] leading-tight"
            style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
          >
            Clients
          </h1>
          <p className="text-[12px] text-[#b9927a] mt-1">
            {clients.length} client{clients.length !== 1 ? "s" : ""} registered
          </p>
        </div>
        <CreateClientModal />
      </div>

      {clients.length === 0 ? (
        <div className="bg-white border border-[#c9a97e]/18 p-16 text-center">
          <UserPlus size={32} className="text-[#c9a97e]/30 mx-auto mb-4" />
          <p
            className="text-[20px] italic text-[#b9927a]"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            No clients yet
          </p>
          <p className="text-[12px] text-[#c9a97e]/50 mt-2">
            Create your first client account using the button above
          </p>
        </div>
      ) : (
        <ClientsTable clients={clients} />
      )}
    </div>
  );
}