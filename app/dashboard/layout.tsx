// FILE PATH: app/dashboard/layout.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/auth";
import { DashboardSidebar } from "@/app/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f7f3ee]">
      {/* Sidebar — fixed width, full height */}
      <DashboardSidebar user={user} />
 
      {/* Main content — fills all remaining space, scrollable */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}