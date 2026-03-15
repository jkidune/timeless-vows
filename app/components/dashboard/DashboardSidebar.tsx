"use client";
// FILE PATH: app/components/dashboard/DashboardSidebar.tsx
// Run first: npm install lucide-react

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@prisma/client";
import {
  LayoutDashboard,
  ScrollText,
  Mail,
  Heart,
  Image,
  Settings,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ClipboardList,
} from "lucide-react";

interface Props {
  user: User;
}

const NAV_COUPLE = [
  { label: "Overview",       href: "/dashboard",            icon: LayoutDashboard },
  { label: "My Invitation",  href: "/dashboard/invitation", icon: ScrollText },
  { label: "RSVP Responses", href: "/dashboard/rsvps",      icon: Mail },
  { label: "Gift Wishes",    href: "/dashboard/wishes",     icon: Heart },
  { label: "Gallery",        href: "/dashboard/gallery",    icon: Image },
  { label: "Settings",       href: "/dashboard/settings",   icon: Settings },
];

const NAV_PLANNER = [
  { label: "Overview",      href: "/dashboard",             icon: LayoutDashboard },
  { label: "My Clients",    href: "/dashboard/clients",     icon: Users },
  { label: "Invitations",   href: "/dashboard/invitations", icon: ScrollText },
  { label: "Settings",      href: "/dashboard/settings",    icon: Settings },
];

const NAV_ADMIN = [
  { label: "Overview",      href: "/dashboard",                   icon: LayoutDashboard },
  { label: "All Clients",   href: "/dashboard/admin/clients",     icon: Users },
  { label: "Invitations",   href: "/dashboard/admin/invitations", icon: ScrollText },
  { label: "Users",         href: "/dashboard/admin/users",       icon: ClipboardList },
  { label: "Settings",      href: "/dashboard/settings",          icon: Settings },
];

function getNav(role: string) {
  if (role === "ADMIN")   return NAV_ADMIN;
  if (role === "PLANNER") return NAV_PLANNER;
  return NAV_COUPLE;
}

export function DashboardSidebar({ user }: Props) {
  const pathname  = usePathname();
  const router    = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [collapsed,  setCollapsed]  = useState(false);

  const navItems = getNav(user.role);

  const handleSignOut = async () => {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <aside
      className="sticky top-0 h-screen flex flex-col border-r border-[#c9a97e]/15 bg-[#1c1713] transition-all duration-300 shrink-0 z-40"
      style={{ width: collapsed ? "64px" : "240px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-[#c9a97e]/10">
        {!collapsed && (
          <Link href="/dashboard" className="min-w-0">
            <p
              className="text-[17px] text-[#c9a97e]/80 leading-none truncate"
              style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic" }}
            >
              Timeless Vows
            </p>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#c9a97e]/30 hover:text-[#c9a97e]/70 transition-colors shrink-0 ml-auto p-1"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* User badge */}
      <div
        className="border-b border-[#c9a97e]/10"
        style={{ padding: collapsed ? "12px 8px" : "14px 16px" }}
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#a8795b]/20 flex items-center justify-center text-[#c9a97e] text-[12px] font-semibold shrink-0">
            {user.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-[#f7f3ee]/75 truncate">
                {user.name ?? user.email}
              </p>
              <p className="text-[9px] uppercase tracking-[0.15em] text-[#c9a97e]/45 mt-0.5">
                {user.role}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {!collapsed && (
          <p className="text-[8px] uppercase tracking-[0.25em] text-[#c9a97e]/25 px-3 mb-2">
            Navigation
          </p>
        )}

        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className="flex items-center gap-3 px-3 py-2.5 mb-0.5 rounded-sm transition-all duration-200 group"
              style={{
                background: isActive ? "rgba(201,169,126,0.10)" : "transparent",
                borderLeft: isActive ? "2px solid rgba(201,169,126,0.7)" : "2px solid transparent",
              }}
            >
              <Icon
                size={15}
                className="shrink-0 transition-colors duration-200"
                style={{ color: isActive ? "#c9a97e" : "rgba(201,169,126,0.35)" }}
              />
              {!collapsed && (
                <span
                  className="text-[12px] tracking-[0.02em] transition-colors duration-200 truncate"
                  style={{ color: isActive ? "#f7f3ee" : "rgba(247,243,238,0.40)" }}
                >
                  {label}
                </span>
              )}
            </Link>
          );
        })}

        <div className="my-3 border-t border-[#c9a97e]/8" />

        <a
          href="/invitation/premium"
          target="_blank"
          rel="noreferrer"
          title={collapsed ? "View Live Page" : undefined}
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 group"
          style={{ borderLeft: "2px solid transparent" }}
        >
          <ExternalLink
            size={15}
            className="shrink-0 text-[#c9a97e]/25 group-hover:text-[#c9a97e]/60 transition-colors"
          />
          {!collapsed && (
            <span className="text-[12px] tracking-[0.02em] text-[#f7f3ee]/25 group-hover:text-[#f7f3ee]/50 transition-colors truncate">
              View Live Page
            </span>
          )}
        </a>
      </nav>

      {/* Premium badge */}
      {!collapsed && user.role === "COUPLE" && (
        <div className="mx-3 mb-3 p-3 border border-[#c9a97e]/15 bg-[#c9a97e]/5">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={11} className="text-[#c9a97e]/60" />
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#c9a97e]/60">
              Premium Active
            </p>
          </div>
          <p className="text-[10px] text-[#f7f3ee]/25 leading-[1.5]">
            Your invitation is live ✦
          </p>
        </div>
      )}

      {/* Sign out */}
      <div className="px-2 pb-4 border-t border-[#c9a97e]/8 pt-2">
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          title={collapsed ? "Sign out" : undefined}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-[#c9a97e]/30 hover:text-red-400/60 hover:bg-red-500/5 transition-all duration-200"
        >
          <LogOut size={15} className="shrink-0" />
          {!collapsed && (
            <span className="text-[11px] tracking-[0.02em]">
              {signingOut ? "Signing out…" : "Sign Out"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}