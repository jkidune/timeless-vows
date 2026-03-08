"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("How It Works");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Subtle background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
      setActiveTab(href === "#how-it-works" ? "How It Works" : 
                   href === "#features" ? "Features" : 
                   href === "#pricing" ? "Pricing" : 
                   href === "#planners" ? "For Planners" : "");
    }
  };

  const navItems = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "For Planners", href: "#planners" },
  ];

  return (
    <>
      {/* ── Desktop & Mobile Header ── */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-6 pb-4 transition-colors duration-300 ${
          scrolled ? "bg-[#231F20] lg:bg-transparent shadow-md lg:shadow-none pointer-events-auto lg:pointer-events-none" : "bg-transparent pointer-events-none"
        }`}
      >
        <div className="flex flex-row items-center justify-between w-full max-w-[1280px] pointer-events-auto">
          
          {/* 1. Logo (Left) */}
          <Link href="/" className="flex flex-col items-start justify-center h-16 w-[160px] relative z-50">
            {/* When you add your logo.svg to the public folder, uncomment the Image below 
              and remove or hide the text span. 
            */}
            {/* <Image src="/logo.svg" alt="Timeless Vows Logo" fill className="object-contain object-left" priority /> */}
            <span className="font-['Cormorant_Garamond',serif] font-light text-[28px] text-[#D4CCBD] tracking-[-0.02em] whitespace-nowrap drop-shadow-md">
              Timeless Vows
            </span>
          </Link>

          {/* 2. Desktop Glass Pill Navigation (Center) */}
          <nav className="hidden lg:flex flex-row items-center justify-center">
            <div 
              className={`box-border flex flex-row items-center p-[6px] gap-1 rounded-full transition-all duration-300 ${
                scrolled 
                  ? "bg-[#222222]/80 border border-[#D4CCBD]/20 shadow-lg backdrop-blur-md" 
                  : "bg-[#F7F3EE]/10 border border-[#F7F3EE]/20 backdrop-blur-sm"
              }`}
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="relative flex flex-col items-center justify-center px-5 py-2 rounded-full group"
                >
                  {/* Active Pill Background */}
                  {activeTab === item.name && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-[#8E6C4A] rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span 
                    className={`relative z-10 font-['Manrope',sans-serif] font-medium text-[11px] leading-[15px] tracking-[0.15em] uppercase transition-colors duration-200 ${
                      activeTab === item.name ? "text-[#F7F3EE]" : "text-[#D4CCBD] group-hover:text-[#F7F3EE]"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              
              {/* Divider */}
              <div className="w-px h-6 bg-[#D4CCBD]/30 mx-1" />
              
              {/* CTA Button inside Pill */}
              <Link
                href="https://wa.me/255XXXXXXXXX"
                className="relative flex flex-col items-center justify-center px-6 py-2 ml-1 rounded-full border border-[#8E6C4A] hover:bg-[#8E6C4A]/10 transition-colors"
              >
                <span className="font-['Manrope',sans-serif] font-bold text-[11px] leading-[15px] tracking-[0.15em] uppercase text-[#D7B980]">
                  Contact Us
                </span>
              </Link>
            </div>
          </nav>

          {/* 3. Mobile Hamburger Button (Right) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 flex flex-col items-center justify-center w-12 h-12 bg-[#222222]/80 border border-[#D4CCBD]/20 backdrop-blur-md rounded-full"
          >
            <div className="w-5 h-[2px] bg-[#D4CCBD] mb-1 transition-transform" style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <div className="w-5 h-[2px] bg-[#D4CCBD] transition-opacity" style={{ opacity: isMobileMenuOpen ? 0 : 1 }} />
            <div className="w-5 h-[2px] bg-[#D4CCBD] mt-1 transition-transform" style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Fullscreen Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#222222]/95 backdrop-blur-xl px-6"
          >
            <div className="flex flex-col items-center gap-8 w-full">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className="font-['Cormorant_Garamond',serif] font-light text-[32px] text-[#D4CCBD] hover:text-[#D7B980] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="w-12 h-px bg-[#8E6C4A]/50 my-4" />
              <Link
                href="https://wa.me/255XXXXXXXXX"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-8 py-4 bg-[#8E6C4A] text-[#F7F3EE] rounded-[1px] font-['Manrope',sans-serif] font-medium text-[16px] tracking-wide"
              >
                Contact Us on WhatsApp
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}