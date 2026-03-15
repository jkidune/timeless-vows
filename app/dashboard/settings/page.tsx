// FILE PATH: app/dashboard/settings/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/auth";
import { SettingsForm } from "@/app/components/dashboard/SettingsForm";
import { Settings } from "lucide-react";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  return (
    <div className="w-full min-h-full p-6 lg:p-10">

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Settings size={16} className="text-[#a8795b]" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8795b]">Dashboard</p>
        </div>
        <h1
          className="text-[clamp(24px,3vw,36px)] text-[#482612] leading-tight"
          style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
        >
          Settings
        </h1>
      </div>

      <div className="max-w-[640px]">
        <SettingsForm user={user} />
      </div>
    </div>
  );
}