"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Sparkles from "./Sparkles"; // Import our new Sparkles component

export default function Hero() {
  return (
    <section className="relative w-full min-h-[790px] flex flex-col items-center pt-[207px] pb-[100px] bg-[#222222] overflow-hidden isolate">
      
      {/* ── Architectural Decorative Grid & Sparkles ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        
        {/* Magic Sparkles Effect */}
        <Sparkles />

        {/* Central Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8E6C4A]/5 rounded-full blur-3xl" />
        
        {/* Concentric Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#383838]/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#383838]/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-[#383838]/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-[#383838]/10 rounded-full" />

        {/* Decorative Dashed Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-[#8E6C4A]/10 rounded-full animate-[spin_60s_linear_infinite]" />
      </div>

      {/* ── Floating Decorative Images (Desktop Only) ── */}
      {/* Image 1: Vintage Camera */}
      <motion.div 
        initial={{ opacity: 0, x: -40, rotate: 0 }}
        animate={{ opacity: 1, x: 0, rotate: -10.93 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="hidden xl:block absolute w-[305px] h-[342px] left-[60px] top-[147px] rounded-[5px] overflow-hidden shadow-2xl z-0"
      >
        <Image 
          src="/camera.png" 
          alt="Vintage Camera Display"
          fill
          className="object-cover"
          priority 
        />
      </motion.div>

      {/* Image 2: Elegant Diamond Rings */}
      <motion.div 
        initial={{ opacity: 0, x: 40, rotate: 0 }}
        animate={{ opacity: 1, x: 0, rotate: 17.82 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="hidden xl:block absolute w-[305px] h-[342px] right-[60px] top-[270px] rounded-[5px] overflow-hidden shadow-2xl z-0"
      >
        <Image 
          src="/rings.png" 
          alt="Elegant Diamond Rings"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      
      {/* ── Main Content Container ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[1280px] px-6 gap-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6 w-full max-w-[1232px]"
        >
          {/* Section Pill */}
          <div className="flex flex-row justify-center items-center px-3 py-2 border border-[#C4C4C4]/40 rounded-[1px] bg-transparent backdrop-blur-sm">
            <span className="font-['Manrope',sans-serif] font-normal text-[12px] leading-[16px] text-center tracking-[-0.02em] text-[#D4CCBD]">
              Built for Tanzanian couples. Shared in one WhatsApp link.
            </span>
          </div>

          {/* Text Wrapper */}
          <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="font-['Cormorant_Garamond',serif] font-light text-[48px] md:text-[56px] leading-[1.1] md:leading-[62px] text-center tracking-[-0.02em] text-[#D4CCBD] w-full max-w-[591px]">
              Your wedding starts with the first impression.
            </h1>

            <p className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[22px] text-center tracking-[-0.02em] text-[#D4CCBD] w-full max-w-[540px]">
              A beautiful digital invitation. Real-time RSVPs. A personalized confirmation card every guest keeps.
            </p>
          </div>

          {/* CTA Group */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-[340px] mt-2"
          >
            {/* Primary Button */}
            <Link 
              href="https://wa.me/255XXXXXXXXX" 
              className="box-border flex flex-row justify-center items-center px-5 py-2 w-full sm:flex-1 h-[48px] bg-[#8E6C4A] border border-[#8E6C4A] rounded-[1px] hover:bg-[#7A5A38] focus:outline-none focus:ring-2 focus:ring-[#D7B980] focus:ring-offset-2 transition-all duration-300"
            >
              <span className="font-['Manrope',sans-serif] font-medium text-[16px] leading-[22px] text-center tracking-[-0.02em] text-[#F7F3EE] w-[133px]">
                Get Your Invitation
              </span>
            </Link>

            {/* Secondary Button */}
            <Link 
              href="/demo" 
              className="box-border flex flex-row justify-center items-center px-5 py-2 w-full sm:flex-1 h-[48px] bg-transparent border border-[#8E6C4A] rounded-[1px] hover:bg-[#8E6C4A]/10 focus:outline-none focus:ring-2 focus:ring-[#D7B980] focus:ring-offset-2 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="font-['Manrope',sans-serif] font-medium text-[16px] leading-[22px] text-center tracking-[-0.02em] text-[#D4CCBD]">
                View a Sample
              </span>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}