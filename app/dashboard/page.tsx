// FILE PATH: app/dashboard/page.tsx

import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";
import {
  Mail, Heart, Image, ScrollText,
  TrendingUp, Users, CheckCircle, Clock,
} from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  let stats = { invitations: 0, rsvps: 0, wishes: 0, accepted: 0 };
  let recentWishes: Array<{ guestName: string; message: string; wishType: string | null }> = [];
  let recentRsvps:  Array<{ primaryName: string; attendance: string; guestCount: number }> = [];
  let invitation = null;

  if (user.role === "COUPLE") {
    invitation = await prisma.invitation.findFirst({
      where: { ownerId: user.id },
      include: {
        _count: { select: { rsvpResponses: true, giftWishes: true } },
        rsvpResponses: {
          orderBy: { submittedAt: "desc" },
          take: 6,
          select: { primaryName: true, attendance: true, guestCount: true },
        },
        giftWishes: {
          orderBy: { submittedAt: "desc" },
          take: 4,
          select: { guestName: true, message: true, wishType: true },
        },
      },
    });

    if (invitation) {
      const accepted = await prisma.rsvpResponse.count({
        where: { invitationId: invitation.id, attendance: "ACCEPTED" },
      });
      stats = {
        invitations: 1,
        rsvps:    invitation._count.rsvpResponses,
        wishes:   invitation._count.giftWishes,
        accepted,
      };
      recentRsvps  = invitation.rsvpResponses;
      recentWishes = invitation.giftWishes;
    }

  } else if (user.role === "ADMIN") {
    const [inv, rsvp, wish, acc] = await Promise.all([
      prisma.invitation.count(),
      prisma.rsvpResponse.count(),
      prisma.giftWish.count(),
      prisma.rsvpResponse.count({ where: { attendance: "ACCEPTED" } }),
    ]);
    stats = { invitations: inv, rsvps: rsvp, wishes: wish, accepted: acc };
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="w-full min-h-full p-6 lg:p-10">

      {/* ── Page header ── */}
      <div className="mb-10 flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8795b] mb-1">
            {greeting}
          </p>
          <h1
            className="text-[clamp(28px,3.5vw,42px)] text-[#482612] leading-tight"
            style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
          >
            {user.name ?? user.email}
          </h1>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="h-px w-6 bg-[#c9a97e]/40" />
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#c9a97e]/55">
              {user.role === "ADMIN" ? "Platform Overview"
                : user.role === "PLANNER" ? "Planner Dashboard"
                : "Wedding Dashboard"}
            </p>
          </div>
        </div>

        {invitation && (
          <Link
            href="/invitation/premium"
            target="_blank"
            className="flex items-center gap-2 bg-[#a8795b] text-white text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 hover:bg-[#482612] transition-colors duration-300"
          >
            <ScrollText size={12} />
            View Live Invitation
          </Link>
        )}
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total RSVPs",    value: stats.rsvps,        Icon: Mail,        accent: "#a8795b" },
          { label: "Accepted",       value: stats.accepted,     Icon: CheckCircle, accent: "#5a7a5a" },
          { label: "Gift Wishes",    value: stats.wishes,       Icon: Heart,       accent: "#b9927a" },
          { label: "Invitations",    value: stats.invitations,  Icon: TrendingUp,  accent: "#7a8a9a" },
        ].map(({ label, value, Icon, accent }) => (
          <div
            key={label}
            className="bg-white border border-[#c9a97e]/18 p-5 relative overflow-hidden group hover:shadow-[0_4px_20px_rgba(168,121,91,0.08)] transition-shadow duration-300"
          >
            <div className="absolute top-0 left-0 w-[3px] h-full" style={{ background: accent }} />
            <div className="flex items-start justify-between pl-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9d7760] mb-3">{label}</p>
                <p
                  className="text-[clamp(30px,4vw,44px)] text-[#482612] leading-none"
                  style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)" }}
                >
                  {value}
                </p>
              </div>
              <div
                className="p-2 rounded-sm mt-1"
                style={{ background: `${accent}18` }}
              >
                <Icon size={16} style={{ color: accent }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── No invitation yet CTA ── */}
      {user.role === "COUPLE" && !invitation && (
        <div className="bg-[#1c1713] border border-[#c9a97e]/12 p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p
              className="text-[20px] italic text-[#f7f3ee]/75"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
            >
              Your invitation hasn&apos;t been set up yet
            </p>
            <p className="text-[12px] text-[#c9a97e]/45 mt-1">
              Contact your Timeless Vows team to get started
            </p>
          </div>
          <Link
            href="/dashboard/settings"
            className="shrink-0 border border-[#c9a97e]/30 text-[#c9a97e]/70 text-[10px] uppercase tracking-[0.2em] px-6 py-3 hover:border-[#c9a97e] hover:text-[#c9a97e] transition-all duration-300"
          >
            Go to Settings
          </Link>
        </div>
      )}

      {/* ── Quick links grid ── */}
      {user.role === "COUPLE" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { label: "My Invitation",  href: "/dashboard/invitation", Icon: ScrollText, desc: "Edit your page content" },
            { label: "RSVP Responses", href: "/dashboard/rsvps",      Icon: Mail,       desc: "See who's attending" },
            { label: "Gift Wishes",    href: "/dashboard/wishes",     Icon: Heart,      desc: "Read messages from guests" },
            { label: "Gallery",        href: "/dashboard/gallery",    Icon: Image,      desc: "Manage your photos" },
          ].map(({ label, href, Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="bg-white border border-[#c9a97e]/18 p-5 hover:border-[#a8795b]/40 hover:shadow-[0_4px_20px_rgba(168,121,91,0.08)] transition-all duration-300 group"
            >
              <div className="h-9 w-9 bg-[#a8795b]/8 flex items-center justify-center mb-3 group-hover:bg-[#a8795b]/15 transition-colors duration-300">
                <Icon size={16} className="text-[#a8795b]" />
              </div>
              <p className="text-[12px] font-semibold text-[#482612] mb-1">{label}</p>
              <p className="text-[11px] text-[#b9927a]">{desc}</p>
            </Link>
          ))}
        </div>
      )}

      {/* ── Recent data ── */}
      {user.role === "COUPLE" && invitation && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent RSVPs */}
          <div className="bg-white border border-[#c9a97e]/18">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#c9a97e]/12">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#a8795b]" />
                <h2 className="text-[12px] font-semibold text-[#482612] uppercase tracking-[0.08em]">
                  Recent RSVPs
                </h2>
              </div>
              <Link
                href="/dashboard/rsvps"
                className="text-[10px] uppercase tracking-[0.15em] text-[#a8795b]/60 hover:text-[#a8795b] transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="p-4">
              {recentRsvps.length === 0 ? (
                <div className="flex flex-col items-center py-8 gap-2">
                  <Clock size={20} className="text-[#c9a97e]/30" />
                  <p className="text-[13px] italic text-[#b9927a]">No RSVPs yet</p>
                </div>
              ) : (
                recentRsvps.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5 border-b border-[#c9a97e]/8 last:border-0"
                  >
                    <div>
                      <p className="text-[13px] font-medium text-[#482612]">{r.primaryName}</p>
                      <p className="text-[11px] text-[#b9927a]">
                        {r.guestCount} guest{r.guestCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <span
                      className="text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 font-medium"
                      style={{
                        background: r.attendance === "ACCEPTED" ? "rgba(90,122,90,0.10)" : "rgba(180,80,80,0.08)",
                        color:      r.attendance === "ACCEPTED" ? "#5a7a5a" : "#b45050",
                      }}
                    >
                      {r.attendance}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Wishes */}
          <div className="bg-white border border-[#c9a97e]/18">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#c9a97e]/12">
              <div className="flex items-center gap-2">
                <Heart size={14} className="text-[#a8795b]" />
                <h2 className="text-[12px] font-semibold text-[#482612] uppercase tracking-[0.08em]">
                  Recent Wishes
                </h2>
              </div>
              <Link
                href="/dashboard/wishes"
                className="text-[10px] uppercase tracking-[0.15em] text-[#a8795b]/60 hover:text-[#a8795b] transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="p-4">
              {recentWishes.length === 0 ? (
                <div className="flex flex-col items-center py-8 gap-2">
                  <Heart size={20} className="text-[#c9a97e]/30" />
                  <p className="text-[13px] italic text-[#b9927a]">No wishes yet</p>
                </div>
              ) : (
                recentWishes.map((w, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-[#c9a97e]/35 pl-3 py-1 mb-3 last:mb-0"
                  >
                    <p
                      className="text-[13px] italic text-[#4e2d28] leading-[1.5] line-clamp-2"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}
                    >
                      &ldquo;{w.message}&rdquo;
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[10px] uppercase tracking-[0.1em] text-[#a8795b]">
                        — {w.guestName}
                      </p>
                      {w.wishType && (
                        <span className="text-[8px] uppercase tracking-[0.1em] px-2 py-0.5 bg-[#a8795b]/8 text-[#a8795b]">
                          {w.wishType}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Admin extra — all users */}
      {user.role === "ADMIN" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {[
            { label: "Manage Clients",     href: "/dashboard/admin/clients",     Icon: Users,       desc: "View all client accounts" },
            { label: "All Invitations",    href: "/dashboard/admin/invitations", Icon: ScrollText,  desc: "Browse every invitation" },
            { label: "Platform Users",     href: "/dashboard/admin/users",       Icon: TrendingUp,  desc: "Manage user accounts" },
          ].map(({ label, href, Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="bg-white border border-[#c9a97e]/18 p-6 hover:border-[#a8795b]/40 transition-all duration-300 group"
            >
              <Icon size={18} className="text-[#a8795b] mb-3" />
              <p className="text-[13px] font-semibold text-[#482612] mb-1">{label}</p>
              <p className="text-[11px] text-[#b9927a]">{desc}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}