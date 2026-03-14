"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { BadgeCheck, DollarSign, Handshake, LayoutDashboard, MessageCircle } from 'lucide-react';

export default function WeddingPlanners() {
  const plannerBenefits = [
    {
      id: "01",
      title: "Your brand, your credit",
      description: "Offer Timeless Vows as part of your premium service. Your couples see your name attached to something extraordinary.",
      colSpan: "col-span-1 md:col-span-2",
      icon: BadgeCheck,
    },
    {
      id: "02",
      title: "Fixed price per wedding",
      description: "No surprises. Predictable margins you can build into your packages from day one.",
      colSpan: "col-span-1 md:col-span-2",
      icon: DollarSign,
    },
    {
      id: "03",
      title: "We do the work, you take the win",
      description: "Your client fills in a form, we build and deliver the invitation. You present it. Takes almost no time from your schedule.",
      colSpan: "col-span-1 md:col-span-2",
      icon: Handshake,
    },
    {
      id: "04",
      title: "Private dashboard access",
      description: "You get full dashboard access for every wedding you manage — track RSVPs, confirm guests, and export lists without waiting for the couple.",
      colSpan: "col-span-1 md:col-span-3",
      icon: LayoutDashboard,
    },
    {
      id: "05",
      title: "Direct WhatsApp support",
      description: "Fast responses, always. We never keep you waiting when your client is waiting.",
      colSpan: "col-span-1 md:col-span-3",
      icon: MessageCircle,
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } 
    },
  };

  return (
    <section className="w-full bg-[#2A2118] py-[100px] flex justify-center overflow-hidden">
      <div className="max-w-[1280px] w-full px-6 flex flex-col items-center gap-[60px]">
        
        {/* ── Header ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full max-w-[800px] flex flex-col items-center text-center gap-[24px]"
        >
          {/* Section Pill */}
          <motion.div variants={itemVariants} className="inline-flex justify-center items-center px-[7px] py-[8px] border border-[#8E6C4A]/40 rounded-[1px]">
            <span className="font-['Manrope',sans-serif] font-semibold text-[12px] leading-[16px] tracking-[0.13em] uppercase text-[#8E6C4A]">
              FOR WEDDING PLANNERS
            </span>
          </motion.div>

          {/* Titles */}
          <motion.h2 variants={itemVariants} className="font-['Cormorant_Garamond',serif] font-light text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[#F6F2EE]">
            Offer an <span className="font-['Instrument_Serif',serif] italic text-[#8E6C4A]">unrivalled</span> experience.
          </motion.h2>

          <motion.p variants={itemVariants} className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[22px] text-[#D4CCBD]">
            Offer your couples something they&apos;ve never seen from any other planner in Tanzania. 
            Partner with Timeless Vows and make a premium digital invitation part of every package you sell.
          </motion.p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-6 gap-[20px]"
        >
          {plannerBenefits.map((benefit) => (
            <BentoCard key={benefit.id} benefit={benefit} variants={itemVariants} />
          ))}
        </motion.div>

        {/* ── CTA Button ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4"
        >
          <Link 
            href="/contact" 
            className="group inline-flex flex-row justify-center items-center px-[28px] py-[16px] bg-[#8E6C4A] border border-[#8E6C4A] rounded-[2px] hover:bg-[#7A5A38] transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(142,108,74,0.4)]"
          >
            <span className="font-['Manrope',sans-serif] font-medium text-[16px] leading-[22px] tracking-[-0.01em] text-[#F7F3EE]">
              Let&apos;s Work Together
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

// Sub-component for individual cards
function BentoCard({ benefit, variants }: { benefit: any, variants: Variants }) {
  const Icon = benefit.icon;

  // Custom micro-animation for the icon when the card is hovered
  const iconVariants: Variants = {
    rest: { scale: 1, y: 0, rotate: 0 },
    hover: { 
      scale: 1.15, 
      y: -4, 
      rotate: benefit.id === "03" ? 10 : benefit.id === "05" ? -10 : 0, 
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  const circleVariants: Variants = {
    rest: { scale: 1, backgroundColor: "rgba(246, 242, 238, 0.05)" },
    hover: { 
      scale: 1.05, 
      backgroundColor: "rgba(142, 108, 74, 0.2)", // Soft gold glow behind icon
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      variants={variants}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={`group relative flex flex-col justify-between p-[32px] md:p-[40px] bg-[#F6F2EE]/5 backdrop-blur-sm border border-[#F6F2EE]/10 rounded-[4px] shadow-sm hover:border-[#8E6C4A]/50 hover:bg-[#F6F2EE]/10 transition-all duration-500 overflow-hidden ${benefit.colSpan}`}
    >
      {/* Background Number Watermark */}
      <div className="absolute -bottom-8 -right-4 font-['Instrument_Serif',serif] italic text-[120px] leading-none text-[#F6F2EE]/5 group-hover:text-[#8E6C4A]/10 transition-colors duration-500 pointer-events-none select-none">
        {benefit.id}
      </div>

      {/* Animated Icon Wrapper */}
      <motion.div 
        variants={circleVariants}
        className="w-[56px] h-[56px] mb-[32px] flex items-center justify-center rounded-full text-[#8E6C4A] border border-[#8E6C4A]/20"
      >
        <motion.div variants={iconVariants}>
          <Icon strokeWidth={1.5} className="w-[24px] h-[24px] text-[#8E6C4A]" />
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col gap-[12px]">
        <h3 className="font-['Instrument_Serif',serif] italic text-[24px] md:text-[28px] leading-[1.2] text-[#F6F2EE] group-hover:text-[#8E6C4A] transition-colors duration-300">
          {benefit.title}
        </h3>
        <p className="font-['Manrope',sans-serif] font-normal text-[15px] leading-[1.6] text-[#D4CCBD]">
          {benefit.description}
        </p>
      </div>
    </motion.div>
  );
}
