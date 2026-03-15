// ─────────────────────────────────────────────────────────────────────
// FILE PATH: app/components/premium/PremiumNavbar.tsx
// RSVP and FAQ now use Next.js <Link> with correct href paths
// ─────────────────────────────────────────────────────────────────────
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LEFT = [
  { label: "Home",      href: "#home",       isPage: false },
  { label: "Our Story", href: "#our-story",  isPage: false },
  { label: "Details",   href: "#details",    isPage: false },
];

const NAV_RIGHT = [
  { label: "Gallery",  href: "#gallery",              isPage: false },
  { label: "Gift",     href: "#gift",                 isPage: false },
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

  const scrollToHash = (hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const navbarOffset = 88;
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - navbarOffset);
    window.scrollTo({ top, behavior: "smooth" });
  };

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
              <a
                key={label}
                href={href}
                className={linkClass}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(href);
                }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Center logo */}
          <a href="#home" className="shrink-0">
            <div className="relative w-[80px] h-[78px]">
              <Image
                src="/images/premium/bw-logo.png"
                alt="Barke and William"
                fill
                sizes="80px"
                className={`object-contain transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}`}
                priority
              />
              <Image
                src="/images/premium/dark-bw-logo.png"
                alt="Barke and William"
                fill
                sizes="80px"
                className={`object-contain transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"}`}
                priority
              />
            </div>
          </a>

          {/* Right links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_RIGHT.map(({ label, href, isPage }) =>
              isPage ? (
                <Link key={label} href={href} className={linkClass}>{label}</Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  className={linkClass}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(href);
                  }}
                >
                  {label}
                </a>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`lg:hidden p-2 transition-colors duration-500 ${scrolled ? "text-[#482612]" : "text-white"}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-[22px] h-[16px]">
              <span
                className={`absolute left-0 top-0 h-[2px] w-full bg-current transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "translate-y-[7px] rotate-45" : "translate-y-0 rotate-0"}`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[2px] w-[16px] bg-current transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"}`}
              />
              <span
                className={`absolute left-0 bottom-0 h-[2px] w-full bg-current transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "-translate-y-[7px] -rotate-45" : "translate-y-0 rotate-0"}`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[150] bg-[#1c1713] flex flex-col items-center justify-center gap-6"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors duration-500 text-xl"
              aria-label="Close menu"
            >
              ✕
            </button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center gap-6"
            >
              <Image
                src="/images/premium/bw-logo.png"
                alt="Barke and William"
                width={70}
                height={68}
                className="object-contain opacity-60 mb-1"
              />

              {allNavItems.map(({ label, href, isPage }) =>
                isPage ? (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[28px] text-[#f7f3ee] hover:text-[#c9a97e] transition-colors duration-500 tracking-[0.02em]"
                    style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic" }}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      scrollToHash(href);
                    }}
                    className="text-[28px] text-[#f7f3ee] hover:text-[#c9a97e] transition-colors duration-500 tracking-[0.02em]"
                    style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic" }}
                  >
                    {label}
                  </a>
                )
              )}

              <p className="text-[10px] uppercase tracking-[0.25em] text-white/20 mt-3">
                02 · May · 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
