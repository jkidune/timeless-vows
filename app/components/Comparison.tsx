"use client";

import { motion, easeOut } from "framer-motion";
import { RiCloseLine, RiCheckLine } from "react-icons/ri";

export default function Comparison() {
  const comparisonData = [
    { feature: "Guest experience", canva: "Static JPEG or PDF", tv: "Animated, interactive web page" },
    { feature: "RSVP tracking", canva: "Manual calls & texts", tv: "Real-time dashboard" },
    { feature: "Contribution pledges", canva: "Separate tracking", tv: "Built into every RSVP" },
    { feature: "Confirmation card", canva: "None", tv: "Personalised per guest" },
    { feature: "Guest list export", canva: "Your own spreadsheet", tv: "One-click Excel export" },
    { feature: "Seat count", canva: "Guesswork", tv: "Tracked automatically" },
    { feature: "Sharing", canva: "JPEG on WhatsApp", tv: "One clean link on WhatsApp" },
    { feature: "Time cost (for you)", canva: "Hours, ongoing", tv: "~5 minutes after setup" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  return (
    <section className="w-full bg-[#F6F2EE] py-[100px] flex justify-center overflow-hidden">
      <div className="max-w-[1280px] w-full px-6 flex flex-col items-center gap-[41px]">
        
        {/* ── Header ── */}
        <div className="w-full max-w-[1232px] flex flex-col items-center text-center gap-[28px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex justify-center items-center px-[7px] py-[8px] border border-[#303235]/40 rounded-[1px]"
          >
            <span className="font-['Manrope',sans-serif] font-semibold text-[12px] leading-[16px] tracking-[0.13em] uppercase text-[#8E6C4A]">
              COMPARISON WITH OTHER TOOLS
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-['Cormorant_Garamond',serif] font-light text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[#231F20] max-w-[480px]"
          >
            Why not just use Canva and a spreadsheet?
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[22px] text-[#303235] max-w-[601px]"
          >
            You can. Hundreds of couples do. But here's what that actually costs you — in time, in stress, and in the experience you give your guests.
          </motion.p>
        </div>

        {/* ── Desktop Grid Table (Hidden on Mobile) ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="hidden md:flex flex-col w-full max-w-[1000px] mt-8 relative"
        >
          {/* Highlight Backdrop for Timeless Vows Column */}
          <div className="absolute right-0 top-0 bottom-0 w-[33%] bg-white/50 border border-[#8E6C4A]/20 rounded-[4px] shadow-sm -z-10" />

          {/* Table Header */}
          <div className="grid grid-cols-3 gap-6 pb-6 border-b border-[#8E6C4A]/20">
            <div className="text-left"></div>
            <div className="text-left font-['Instrument_Serif',serif] italic text-[24px] text-[#000000]">
              Canva + WhatsApp
            </div>
            <div className="text-left font-['Instrument_Serif',serif] italic text-[28px] text-[#8E6C4A] pl-4">
              Timeless Vows
            </div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, i) => (
            <motion.div 
              key={i} 
              variants={rowVariants}
              className="grid grid-cols-3 gap-6 py-5 border-b border-[#EAEDF0] group hover:bg-[#8E6C4A]/5 transition-colors duration-300 items-center"
            >
              {/* Feature Name */}
              <div className="font-['Manrope',sans-serif] font-medium text-[18px] text-[#000000]">
                {row.feature}
              </div>
              
              {/* Canva Column */}
              <div className="font-['Manrope',sans-serif] font-normal text-[16px] text-[#303235] flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                <RiCloseLine className="text-[#303235]/50 flex-shrink-0" />
                {row.canva}
              </div>
              
              {/* Timeless Vows Column */}
              <div className="font-['Manrope',sans-serif] font-bold text-[16px] text-[#8E6C4A] pl-4 flex items-center gap-2">
                <RiCheckLine className="text-[#8E6C4A] flex-shrink-0 text-xl" />
                {row.tv}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Mobile Comparison Cards (Hidden on Desktop) ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex md:hidden flex-col w-full gap-4 mt-6"
        >
          {comparisonData.map((row, i) => (
            <motion.div 
              key={i}
              variants={rowVariants}
              className="flex flex-col bg-white border border-[#EAEDF0] rounded-[4px] shadow-sm overflow-hidden"
            >
              {/* Card Header (Feature) */}
              <div className="bg-[#F6F2EE] px-4 py-3 border-b border-[#EAEDF0]">
                <span className="font-['Manrope',sans-serif] font-bold text-[14px] text-[#231F20] uppercase tracking-wider">
                  {row.feature}
                </span>
              </div>
              
              {/* Card Body (Comparison) */}
              <div className="flex flex-col divide-y divide-[#EAEDF0]">
                <div className="flex flex-row items-center justify-between px-4 py-3 bg-white/50">
                  <span className="font-['Instrument_Serif',serif] italic text-[18px] text-[#000000]">Canva</span>
                  <span className="font-['Manrope',sans-serif] font-normal text-[14px] text-[#303235] text-right flex items-center gap-1">
                    <RiCloseLine className="text-[#303235]/50" /> {row.canva}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between px-4 py-3 bg-[#8E6C4A]/5">
                  <span className="font-['Instrument_Serif',serif] italic text-[20px] text-[#8E6C4A]">Timeless Vows</span>
                  <span className="font-['Manrope',sans-serif] font-bold text-[14px] text-[#8E6C4A] text-right flex items-center gap-1">
                    <RiCheckLine className="text-[#8E6C4A] text-lg" /> {row.tv}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}