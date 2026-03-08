"use client";

import Link from "next/link";
import { RiWhatsappLine, RiInstagramLine, RiFacebookFill } from "react-icons/ri";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#231F20] pt-[72px] pb-[32px] flex flex-col items-center">
      <div className="w-full max-w-[1280px] px-6 flex flex-col items-center gap-[64px]">
        
        {/* ── Top Content Section ── */}
        <div className="w-full max-w-[1232px] flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8">
          
          {/* Logo & Description Column */}
          <div className="flex flex-col items-start gap-8 w-full lg:max-w-[368px]">
            {/* Logo Placeholder (Replace with Image when SVG is ready) */}
            <Link href="/" className="flex flex-col justify-center">
              <span className="font-['Cormorant_Garamond',serif] font-light text-[36px] text-[#D4CCBD] tracking-[-0.02em] whitespace-nowrap">
                Timeless Vows
              </span>
            </Link>
            
            <p className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[24px] text-[#8E6C4A] opacity-80 max-w-[320px]">
              A beautiful digital invitation. Real-time RSVPs. A personalised confirmation card every guest keeps.
            </p>
          </div>

          {/* Links Section (Responsive Grid) */}
          <div className="w-full lg:w-auto grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            
            {/* Page Links Column */}
            <div className="flex flex-col gap-4">
              <span className="font-['Manrope',sans-serif] font-medium text-[12px] leading-[18px] tracking-widest uppercase text-[#8E6C4A] opacity-50 mb-2">
                Company
              </span>
              <nav className="flex flex-col gap-3">
                <Link href="/" className="font-['Manrope',sans-serif] font-medium text-[16px] text-[#8E6C4A] hover:text-[#D7B980] transition-colors">Home</Link>
                <Link href="#problem-statement" className="font-['Manrope',sans-serif] font-medium text-[16px] text-[#8E6C4A] hover:text-[#D7B980] transition-colors">About Us</Link>
                <Link href="/invitation/demo" className="font-['Manrope',sans-serif] font-medium text-[16px] text-[#8E6C4A] hover:text-[#D7B980] transition-colors">Demo</Link>
                <Link href="/contact" className="font-['Manrope',sans-serif] font-medium text-[16px] text-[#8E6C4A] hover:text-[#D7B980] transition-colors">Contact us</Link>
              </nav>
            </div>

            {/* Resources Column */}
            <div className="flex flex-col gap-4">
              <span className="font-['Manrope',sans-serif] font-medium text-[12px] leading-[18px] tracking-widest uppercase text-[#8E6C4A] opacity-50 mb-2">
                Product
              </span>
              <nav className="flex flex-col gap-3">
                <Link href="#features" className="font-['Manrope',sans-serif] font-medium text-[16px] text-[#8E6C4A] hover:text-[#D7B980] transition-colors">Features</Link>
                <Link href="#how-it-works" className="font-['Manrope',sans-serif] font-medium text-[16px] text-[#8E6C4A] hover:text-[#D7B980] transition-colors">How it Works</Link>
                <Link href="#pricing" className="font-['Manrope',sans-serif] font-medium text-[16px] text-[#8E6C4A] hover:text-[#D7B980] transition-colors">Pricing</Link>
                <Link href="#planners" className="font-['Manrope',sans-serif] font-medium text-[16px] text-[#8E6C4A] hover:text-[#D7B980] transition-colors">For Planners</Link>
              </nav>
            </div>

            {/* Social Links Column */}
            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <span className="font-['Manrope',sans-serif] font-medium text-[12px] leading-[18px] tracking-widest uppercase text-[#8E6C4A] opacity-50 mb-2">
                Socials
              </span>
              <nav className="flex flex-col gap-4">
                {/* WhatsApp */}
                <Link href="https://wa.me/255XXXXXXXXX" className="flex items-center gap-3 group">
                  <RiWhatsappLine className="w-5 h-5 text-[#8E6C4A] opacity-60 group-hover:text-[#D7B980] group-hover:opacity-100 transition-all" />
                  <span className="font-['Manrope',sans-serif] font-normal text-[15px] text-[#8E6C4A] group-hover:text-[#D7B980] transition-colors">WhatsApp</span>
                </Link>

                {/* Instagram */}
                <Link href="#" className="flex items-center gap-3 group">
                  <RiInstagramLine className="w-5 h-5 text-[#8E6C4A] opacity-60 group-hover:text-[#D7B980] group-hover:opacity-100 transition-all" />
                  <span className="font-['Manrope',sans-serif] font-normal text-[15px] text-[#8E6C4A] group-hover:text-[#D7B980] transition-colors">Instagram</span>
                </Link>

                {/* Facebook */}
                <Link href="#" className="flex items-center gap-3 group">
                  <RiFacebookFill className="w-5 h-5 text-[#8E6C4A] opacity-60 group-hover:text-[#D7B980] group-hover:opacity-100 transition-all" />
                  <span className="font-['Manrope',sans-serif] font-normal text-[15px] text-[#8E6C4A] group-hover:text-[#D7B980] transition-colors">Facebook</span>
                </Link>
              </nav>
            </div>
            
          </div>
        </div>

        {/* ── Bottom Divider & Copyright ── */}
        <div className="w-full max-w-[1280px] pt-8 border-t border-[#EAEDF0]/10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-center md:text-left">
          
          <span className="font-['Manrope',sans-serif] font-normal text-[13px] md:text-[14px] text-[#D4CCBD] opacity-80">
            © {currentYear} Timeless Vows. All Rights Reserved.
          </span>

          {/* Legal Links */}
          <div className="flex flex-row items-center justify-center gap-4">
            <Link href="/privacy" className="font-['Manrope',sans-serif] font-normal text-[13px] md:text-[14px] text-[#D4CCBD] opacity-80 hover:text-[#D7B980] hover:opacity-100 transition-colors">
              Privacy Policy
            </Link>
            <div className="w-px h-[14px] bg-[#D4CCBD]/40" />
            <Link href="/terms" className="font-['Manrope',sans-serif] font-normal text-[13px] md:text-[14px] text-[#D4CCBD] opacity-80 hover:text-[#D7B980] hover:opacity-100 transition-colors">
              Terms & Conditions
            </Link>
          </div>

          <span className="font-['Manrope',sans-serif] font-normal text-[13px] md:text-[14px] text-[#D4CCBD] opacity-80 mt-2 md:mt-0">
            Designed with 💜 by Barons Digital
          </span>
          
        </div>

      </div>
    </footer>
  );
}