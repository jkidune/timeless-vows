"use client";

import { motion, Variants } from "framer-motion";
import { MessageCircle, PenTool, CheckCircle, Share2, LayoutDashboard } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Contact us on WhatsApp",
      description: "Tell us your names, date, and venue. We send you a simple details form to fill in at your own pace — usually takes 20 minutes.",
      colSpan: "col-span-1 md:col-span-2", // 1/3 width on desktop
      icon: MessageCircle,
    },
    {
      id: "02",
      title: "We build your invitation",
      description: "Our team sets up your personalised invitation page with your photo, theme colour, programme, and contribution details. You get a preview link within 48 hours.",
      colSpan: "col-span-1 md:col-span-2", // 1/3 width on desktop
      icon: PenTool,
    },
    {
      id: "03",
      title: "You review and approve",
      description: "Check everything on your phone. Request changes via WhatsApp. We update until it's perfect.",
      colSpan: "col-span-1 md:col-span-2", // 1/3 width on desktop
      icon: CheckCircle,
    },
    {
      id: "04",
      title: "Share your link",
      description: "One URL. Share it on WhatsApp, Instagram, or anywhere. Guests open it, RSVP, and receive their card instantly.",
      colSpan: "col-span-1 md:col-span-3", // 1/2 width on desktop
      icon: Share2,
    },
    {
      id: "05",
      title: "Manage from your dashboard",
      description: "Log in to your private dashboard. See every RSVP, confirm guests, track contributions, and export your list — any time, from your phone.",
      colSpan: "col-span-1 md:col-span-3", // 1/2 width on desktop
      icon: LayoutDashboard,
    },
  ];

  // Explicitly type as Variants to resolve the TS error
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } 
    },
  };

  return (
    <section className="w-full bg-[#F6F2EE] py-[100px] flex justify-center overflow-hidden">
      <div className="max-w-[1280px] w-full px-6 flex flex-col items-center gap-[41px]">
        
        {/* ── Header ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full max-w-[1232px] flex flex-col items-center text-center gap-[28px]"
        >
          {/* Section Pill */}
          <motion.div variants={cardVariants} className="inline-flex justify-center items-center px-[7px] py-[8px] border border-[#303235]/40 rounded-[1px]">
            <span className="font-['Manrope',sans-serif] font-semibold text-[12px] leading-[16px] tracking-[0.13em] uppercase text-[#8E6C4A]">
              HOW IT WORKS
            </span>
          </motion.div>

          {/* Title & Subtitle */}
          <motion.h2 variants={cardVariants} className="font-['Cormorant_Garamond',serif] font-light text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[#231F20] max-w-[500px]">
            Ready in <span className="font-['Instrument_Serif',serif] italic text-[#8E6C4A]">48 hours.</span>
          </motion.h2>

          <motion.p variants={cardVariants} className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[22px] text-[#303235] max-w-[600px]">
            You contact us. We build it. You review it. You share it. That&apos;s the whole process.
          </motion.p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-6 gap-[20px] mt-8"
        >
          {steps.map((step) => (
            <BentoCard key={step.id} step={step} variants={cardVariants} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

// Sub-component for individual cards
function BentoCard({ step, variants }: { step: any, variants: Variants }) {
  const Icon = step.icon;

  // Custom micro-animation for the icon when the card is hovered
  const iconVariants: Variants = {
    rest: { scale: 1, y: 0, rotate: 0 },
    hover: { 
      scale: 1.15, 
      y: -4, 
      rotate: step.id === "02" ? 10 : step.id === "04" ? -10 : 0, 
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  const circleVariants: Variants = {
    rest: { scale: 1, backgroundColor: "#F6F2EE" },
    hover: { 
      scale: 1.05, 
      backgroundColor: "#F0EBE1", 
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      variants={variants}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={`group relative flex flex-col justify-between p-[32px] md:p-[40px] bg-white border border-[#EAEDF0] rounded-[8px] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(142,108,74,0.15)] transition-shadow duration-500 overflow-hidden ${step.colSpan}`}
    >
      {/* Background Number Watermark */}
      <div className="absolute -bottom-8 -right-4 font-['Instrument_Serif',serif] italic text-[120px] leading-none text-[#8E6C4A]/5 group-hover:text-[#8E6C4A]/10 transition-colors duration-500 pointer-events-none select-none">
        {step.id}
      </div>

      {/* Animated Icon Wrapper */}
      <motion.div 
        variants={circleVariants}
        className="w-[64px] h-[64px] mb-[32px] flex items-center justify-center rounded-full text-[#8E6C4A]"
      >
        <motion.div variants={iconVariants}>
          <Icon strokeWidth={1.5} className="w-[28px] h-[28px]" />
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col gap-[12px]">
        <h3 className="font-['Instrument_Serif',serif] italic text-[24px] md:text-[28px] leading-[1.2] text-[#231F20] group-hover:text-[#8E6C4A] transition-colors duration-300">
          {step.title}
        </h3>
        <p className="font-['Manrope',sans-serif] font-normal text-[15px] leading-[1.6] text-[#303235]">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
