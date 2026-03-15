"use client";
// FILE PATH: app/components/admin/UsersTable.tsx

import { useState } from "react";
import { updateUserRole } from "@/app/actions/admin";

interface User {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: string;
  createdAt: Date;
  _count: { ownedInvitations: number };
}

interface Props {
  users: User[];
}

const ROLE_STYLES: Record<string, { bg: string; text: string }> = {
  ADMIN:   { bg: "rgba(72,38,18,0.10)",  text: "#482612" },
  PLANNER: { bg: "rgba(100,120,160,0.10)", text: "#6478a0" },
  COUPLE:  { bg: "rgba(168,121,91,0.10)", text: "#a8795b" },
};

export function UsersTable({ users: initial }: Props) {
  const [users,    setUsers]    = useState(initial);
  const [updating, setUpdating] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, role: string) => {
    setUpdating(userId);
    await updateUserRole(userId, role as "ADMIN" | "PLANNER" | "COUPLE");
    setUsers((prev) =>
      prev.map((u) => u.id === userId ? { ...u, role } : u)
    );
    setUpdating(null);
  };

  return (
    <div className="bg-white border border-[#c9a97e]/18 overflow-hidden">

      {/* Header */}
      <div className="grid grid-cols-[1fr_80px_120px_100px_80px] border-b border-[#c9a97e]/15 bg-[#f7f3ee]">
        {["User", "Invites", "Joined", "Role", "Change Role"].map((h) => (
          <div key={h} className="px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-[#9d7760] font-semibold">{h}</div>
        ))}
      </div>

      {users.map((user) => {
        const rs = ROLE_STYLES[user.role] ?? ROLE_STYLES.COUPLE;
        const joinDate = new Date(user.createdAt).toLocaleDateString("en-GB", {
          day: "numeric", month: "short", year: "numeric",
        });

        return (
          <div
            key={user.id}
            className="grid grid-cols-[1fr_80px_120px_100px_80px] border-b border-[#c9a97e]/8 last:border-0 hover:bg-[#f7f3ee]/30 transition-colors"
            style={{ opacity: updating === user.id ? 0.6 : 1 }}
          >
            {/* User info */}
            <div className="px-4 py-4">
              <p className="text-[13px] font-medium text-[#482612]">{user.name ?? "—"}</p>
              <p className="text-[11px] text-[#b9927a] mt-0.5">{user.email}</p>
              {user.phone && (
                <p className="text-[10px] text-[#c9a97e]/60 mt-0.5">{user.phone}</p>
              )}
            </div>

            {/* Invitation count */}
            <div className="px-4 py-4 flex items-center">
              <p
                className="text-[22px] text-[#482612] leading-none"
                style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)" }}
              >
                {user._count.ownedInvitations}
              </p>
            </div>

            {/* Join date */}
            <div className="px-4 py-4 flex items-center">
              <p className="text-[11px] text-[#b9927a]">{joinDate}</p>
            </div>

            {/* Role badge */}
            <div className="px-4 py-4 flex items-center">
              <span
                className="text-[9px] uppercase tracking-[0.15em] px-2.5 py-1.5 font-medium"
                style={{ background: rs.bg, color: rs.text }}
              >
                {user.role}
              </span>
            </div>

            {/* Role change */}
            <div className="px-3 py-4 flex items-center">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                disabled={updating === user.id}
                className="text-[10px] uppercase tracking-[0.1em] bg-[#f7f3ee] border border-[#c9a97e]/25 text-[#9d7760] px-2 py-1.5 outline-none focus:border-[#a8795b] transition-colors cursor-pointer disabled:opacity-50 w-full"
              >
                <option value="COUPLE">Couple</option>
                <option value="PLANNER">Planner</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
}