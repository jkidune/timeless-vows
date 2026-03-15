// FILE PATH: app/dashboard/admin/users/page.tsx

import { prisma } from "@/lib/prisma";
import { UsersTable } from "@/app/components/admin/UsersTable";
import { Users } from "lucide-react";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { ownedInvitations: true } },
    },
  });

  const admins   = users.filter((u) => u.role === "ADMIN").length;
  const planners = users.filter((u) => u.role === "PLANNER").length;
  const couples  = users.filter((u) => u.role === "COUPLE").length;

  return (
    <div className="w-full min-h-full p-6 lg:p-10">

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Users size={16} className="text-[#a8795b]" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8795b]">Admin</p>
        </div>
        <h1
          className="text-[clamp(24px,3vw,36px)] text-[#482612] leading-tight"
          style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
        >
          Platform Users
        </h1>
      </div>

      {/* Role breakdown */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Admins",   value: admins,   color: "#482612" },
          { label: "Planners", value: planners, color: "#6478a0" },
          { label: "Couples",  value: couples,  color: "#a8795b" },
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

      <UsersTable users={users} />
    </div>
  );
}