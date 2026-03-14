// ─────────────────────────────────────────────────────────────────────
// FILE PATH: app/components/premium/PremiumNavbar.tsx
// RSVP and FAQ now use Next.js <Link> with correct href paths
// ─────────────────────────────────────────────────────────────────────
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LEFT = [
  { label: "HOME",      href: "#home",       isPage: false },
  { label: "OUR STORY", href: "#our-story",  isPage: false },
  { label: "DETAILS",   href: "#details",    isPage: false },
];

const NAV_RIGHT = [
  { label: "GALLERY",  href: "#gallery",              isPage: false },
  { label: "GIFT",     href: "#gift",                 isPage: false },
  { label: "RSVP",     href: "/invitation/rsvp",      isPage: true  },
  { label: "FAQ",      href: "/invitation/faq",       isPage: true  },
];

export function PremiumNavbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = `text-[12px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 ${
    scrolled ? "text-[#482612] hover:text-[#a8795b]" : "text-white hover:text-white/65"
  }`;

  const allNavItems = [...NAV_LEFT, ...NAV_RIGHT];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(247,243,238,0.96)"
            : "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid rgba(201,169,126,0.22)"
            : "1px solid rgba(255,255,255,0.12)",
          boxShadow: scrolled ? "0 2px 20px rgba(168,121,91,0.08)" : "none",
        }}
      >
        <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3">

          {/* Left links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LEFT.map(({ label, href }) => (
              <a key={label} href={href} className={linkClass}>{label}</a>
            ))}
          </div>

          {/* Center logo */}
          <a href="#home" className="shrink-0">
            {/*
              LOGO: /public/images/premium/bw-logo.png
              94×92px transparent PNG monogram from Figma
            */}
            <Image
              src="/images/premium/bw-logo.png"
              alt="Barke and William"
              width={80}
              height={78}
              className="object-contain transition-opacity duration-300"
              style={{ opacity: scrolled ? 0.85 : 1 }}
              priority
            />
          </a>

          {/* Right links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_RIGHT.map(({ label, href, isPage }) =>
              isPage ? (
                <Link key={label} href={href} className={linkClass}>{label}</Link>
              ) : (
                <a key={label} href={href} className={linkClass}>{label}</a>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`lg:hidden p-2 transition-colors duration-300 ${scrolled ? "text-[#482612]" : "text-white"}`}
            aria-label="Open menu"
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <rect width="22" height="2" fill="currentColor" />
              <rect y="7" width="16" height="2" fill="currentColor" />
              <rect y="14" width="22" height="2" fill="currentColor" />
            </svg>
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[150] bg-[#1c1713] flex flex-col items-center justify-center gap-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-xl"
            aria-label="Close menu"
          >
            ✕
          </button>

          {/* Logo in mobile drawer */}
          <Image
            src="/images/premium/bw-logo.png"
            alt="Barke and William"
            width={70}
            height={68}
            className="object-contain opacity-50 mb-2"
          />

          {allNavItems.map(({ label, href, isPage }) =>
            isPage ? (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-[28px] text-[#f7f3ee] hover:text-[#c9a97e] transition-colors duration-300 tracking-[0.1em]"
                style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic" }}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-[28px] text-[#f7f3ee] hover:text-[#c9a97e] transition-colors duration-300 tracking-[0.1em]"
                style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic" }}
              >
                {label}
              </a>
            )
          )}

          <p className="text-[10px] uppercase tracking-[0.25em] text-white/20 mt-4">
            02 · May · 2026
          </p>
        </div>
      )}
    </>
  );
}