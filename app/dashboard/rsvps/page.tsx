// FILE PATH: app/dashboard/rsvps/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";
import { RsvpTable } from "@/app/components/dashboard/RsvpTable";
import { Mail, CheckCircle, XCircle, Users } from "lucide-react";

export default async function RsvpsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const invitation = await prisma.invitation.findFirst({
    where: { ownerId: user.id },
  });

  const rsvps = invitation
    ? await prisma.rsvpResponse.findMany({
        where:   { invitationId: invitation.id },
        orderBy: { submittedAt: "desc" },
      })
    : [];

  const accepted  = rsvps.filter((r) => r.attendance === "ACCEPTED");
  const declined  = rsvps.filter((r) => r.attendance === "DECLINED");
  const totalGuests = accepted.reduce((sum, r) => sum + r.guestCount, 0);

  return (
    <div className="w-full min-h-full p-6 lg:p-10">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Mail size={16} className="text-[#a8795b]" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8795b]">Dashboard</p>
        </div>
        <h1
          className="text-[clamp(24px,3vw,36px)] text-[#482612] leading-tight"
          style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
        >
          RSVP Responses
        </h1>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total Responses", value: rsvps.length,     Icon: Mail,         color: "#a8795b" },
          { label: "Accepted",        value: accepted.length,  Icon: CheckCircle,  color: "#5a7a5a" },
          { label: "Declined",        value: declined.length,  Icon: XCircle,      color: "#b45050" },
          { label: "Total Guests",    value: totalGuests,      Icon: Users,        color: "#7a8a9a" },
        ].map(({ label, value, Icon, color }) => (
          <div key={label} className="bg-white border border-[#c9a97e]/18 p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[3px] h-full" style={{ background: color }} />
            <div className="flex items-start justify-between pl-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9d7760] mb-2">{label}</p>
                <p
                  className="text-[clamp(28px,4vw,40px)] text-[#482612] leading-none"
                  style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)" }}
                >
                  {value}
                </p>
              </div>
              <div className="p-2 rounded-sm mt-1" style={{ background: `${color}18` }}>
                <Icon size={15} style={{ color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      {rsvps.length === 0 ? (
        <div className="bg-white border border-[#c9a97e]/18 p-16 text-center">
          <Mail size={32} className="text-[#c9a97e]/30 mx-auto mb-4" />
          <p
            className="text-[20px] italic text-[#b9927a]"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            No RSVPs received yet
          </p>
          <p className="text-[12px] text-[#c9a97e]/50 mt-2">
            Responses will appear here once guests start submitting
          </p>
        </div>
      ) : (
        <RsvpTable rsvps={rsvps} />
      )}
    </div>
  );
}