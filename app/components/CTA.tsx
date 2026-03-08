"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

// A small, reusable Sparkle component for the background
const Sparkle = ({ top, left, delay, size = 16 }: { top: string, left: string, delay: number, size?: number }) => (
  <motion.div
    className="absolute pointer-events-none text-[#8E6C4A]/30"
    style={{ top, left }}
    animate={{ opacity: [0.1, 0.6, 0.1], scale: [0.8, 1.2, 0.8] }}
    transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C12 0 12 10.5 24 12C12 13.5 12 24 12 24C12 24 12 13.5 0 12C12 10.5 12 0 12 0Z" fill="currentColor" />
    </svg>
  </motion.div>
);

export default function CTA() {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
  };

  return (
    <section className="relative w-full bg-[#F6F2EE] pt-[120px] pb-[140px] flex justify-center overflow-hidden isolate">
      
      {/* ── Background Gradient ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[214px] bg-gradient-to-b from-transparent to-[#F9FAFB] pointer-events-none -z-10" />

      {/* ── Rotating Rings Background ── */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] rounded-full border-[1px] border-[#8E6C4A]/5 -z-10 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[750px] max-h-[750px] rounded-full border-[1px] border-[#8E6C4A]/10 -z-10 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full border-[1px] border-[#8E6C4A]/15 -z-10 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Floating Sparkles ── */}
      <Sparkle top="20%" left="15%" delay={0} size={20} />
      <Sparkle top="15%" left="75%" delay={1.5} size={14} />
      <Sparkle top="70%" left="10%" delay={0.7} size={16} />
      <Sparkle top="65%" left="85%" delay={2.2} size={24} />
      <Sparkle top="40%" left="90%" delay={0.3} size={12} />

      {/* ── Content ── */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative z-10 max-w-[1280px] w-full px-6 flex flex-col items-center text-center gap-[24px]"
      >
        {/* Section Pill */}
        <motion.div variants={itemVariants} className="inline-flex justify-center items-center px-[7px] py-[8px] border border-[#8C8C8C]/30 rounded-[1px] mb-[4px] bg-white/50 backdrop-blur-md">
          <span className="font-['Manrope',sans-serif] font-semibold text-[12px] leading-[16px] tracking-[0.13em] uppercase text-[#8E6C4A]">
            Begin Your Story
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2 variants={itemVariants} className="font-['Cormorant_Garamond',serif] font-light text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[#231F20] max-w-[536px]">
          Your love story begins with the invitation
        </motion.h2>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[22px] text-[#303235] max-w-[521px] mb-[12px]">
          Write to us and discover how we can make your perfect invitation a reality.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Link 
            href="https://wa.me/255XXXXXXXXX" 
            className="group inline-flex flex-row justify-center items-center px-[32px] py-[16px] bg-[#8E6C4A] border border-[#8E6C4A] rounded-[2px] hover:bg-[#7A5A38] transition-all duration-300 shadow-xl hover:shadow-[0_10px_40px_-10px_rgba(142,108,74,0.5)]"
          >
            <MessageCircle className="w-5 h-5 text-[#F7F3EE] mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-['Manrope',sans-serif] font-medium text-[18px] leading-[25px] tracking-[-0.02em] text-[#F7F3EE]">
              Get Started on WhatsApp
            </span>
          </Link>
        </motion.div>
      </motion.div>

    </section>
  );
}