// FILE PATH: app/dashboard/admin/layout.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/auth/login");

  // Hard block — non-admins see a clear error, not a blank page
  if (user.role !== "ADMIN") {
    return (
      <div className="w-full min-h-full p-10 flex items-center justify-center">
        <div className="text-center max-w-[400px]">
          <p className="text-[48px] mb-4">🔒</p>
          <h1
            className="text-[28px] italic text-[#482612] mb-3"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            Admin access only
          </h1>
          <p className="text-[13px] text-[#b9927a]">
            This area is restricted to Timeless Vows administrators.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}