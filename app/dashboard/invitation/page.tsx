// FILE PATH: app/dashboard/invitation/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";
import { InvitationEditor } from "@/app/components/dashboard/InvitationEditor";
import { ScrollText, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function InvitationPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const invitation = await prisma.invitation.findFirst({
    where: { ownerId: user.id },
  });

  return (
    <div className="w-full min-h-full p-6 lg:p-10">

      {/* Header */}
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ScrollText size={16} className="text-[#a8795b]" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8795b]">Dashboard</p>
          </div>
          <h1
            className="text-[clamp(24px,3vw,36px)] text-[#482612] leading-tight"
            style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
          >
            My Invitation
          </h1>
        </div>

        {invitation && (
          <div className="flex items-center gap-3">
            {/* Status badge */}
            <span
              className="text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 font-semibold"
              style={{
                background: invitation.status === "ACTIVE" ? "rgba(90,122,90,0.12)" : "rgba(158,119,96,0.12)",
                color:      invitation.status === "ACTIVE" ? "#5a7a5a" : "#9d7760",
              }}
            >
              {invitation.status}
            </span>

            <Link
              href={`/invitation/${invitation.slug}`}
              target="_blank"
              className="flex items-center gap-2 border border-[#c9a97e]/30 text-[#a8795b] text-[10px] uppercase tracking-[0.2em] px-4 py-2 hover:bg-[#a8795b] hover:text-white transition-all duration-300"
            >
              <ExternalLink size={11} />
              View Live
            </Link>
          </div>
        )}
      </div>

      {!invitation ? (
        <div className="bg-[#1c1713] border border-[#c9a97e]/12 p-12 text-center">
          <ScrollText size={32} className="text-[#c9a97e]/30 mx-auto mb-4" />
          <p
            className="text-[20px] italic text-[#f7f3ee]/60 mb-2"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            No invitation set up yet
          </p>
          <p className="text-[12px] text-[#c9a97e]/40">
            Contact the Timeless Vows team to create your invitation
          </p>
        </div>
      ) : (
        <InvitationEditor invitation={invitation} />
      )}
    </div>
  );
}