"use client";

import { motion, cubicBezier, easeOut, easeInOut } from "framer-motion";
import Image from "next/image";

export default function ConfirmationSection() {
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: cubicBezier(0.21, 0.47, 0.32, 0.98) } 
    },
  };

  const imageLeftVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 1, ease: easeOut } 
    },
  };

  const imageRightVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 1, ease: easeOut } 
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1, 
      transition: { duration: 1.2, ease: easeInOut } 
    },
  };

  return (
    <section className="w-full bg-[#F6F2EE] py-[100px] flex justify-center overflow-hidden">
      <div className="max-w-[1280px] w-full px-6 flex flex-col items-center gap-[41px]">
        
        {/* ── Header Wrapper ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full max-w-[1232px] flex flex-col items-center text-center gap-[28px]"
        >
          <div className="flex flex-col items-center gap-[16px]">
            {/* Pill */}
            <motion.div variants={itemVariants} className="inline-flex justify-center items-center px-[7px] py-[8px] border border-[#303235]/40 rounded-[1px]">
              <span className="font-['Manrope',sans-serif] font-semibold text-[12px] leading-[16px] tracking-[0.13em] uppercase text-[#8E6C4A]">
                CONFIRMATION CARD
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2 variants={itemVariants} className="font-['Cormorant_Garamond',serif] font-light text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[#231F20] max-w-[376px]">
              A card they’ll actually keep.
            </motion.h2>
          </div>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[22px] text-[#303235] max-w-[601px]">
            Every guest receives a personalised digital card the moment they RSVP — with their name, your wedding details, and their attendance status. When your planner confirms them, the card upgrades. Not just a receipt. A keepsake.
          </motion.p>
        </motion.div>

        {/* ── Content Wrapper ── */}
        <div className="w-full max-w-[1232px] flex flex-col gap-[40px] md:gap-[60px] mt-4">
          
          {/* Row 1: The Pending Card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex flex-col md:flex-row items-stretch gap-[20px] md:gap-[40px]"
          >
            {/* Text Column */}
            <div className="flex-1 flex flex-col justify-between items-start py-4">
              <motion.div variants={itemVariants} className="flex flex-col gap-[12px] w-full">
                <h3 className="font-['Instrument_Serif',serif] italic text-[24px] md:text-[32px] leading-[1.2] text-[#231F20]">
                  The Pending Card
                </h3>
                <p className="font-['Manrope',sans-serif] font-medium text-[14px] leading-[19px] text-[#303235] max-w-[484px]">
                  The moment a guest submits their RSVP, they receive a personalised card addressed to them by name. It shows your wedding details and an amber status badge marking their attendance as pending. It arrives instantly. No waiting. No follow-up needed.
                </p>
              </motion.div>
              
              <motion.p variants={itemVariants} className="font-['Manrope',sans-serif] font-normal text-[12px] leading-[16px] tracking-[-0.02em] text-[#8E6C4A] mt-6 md:mt-0">
                Delivered immediately after RSVP · Guest's name on every card
              </motion.p>
            </div>

            {/* Image Column */}
            <motion.div variants={imageRightVariants} className="flex-1 relative h-[300px] md:h-[383px] w-full bg-[#E5E5E5] rounded-[2px] overflow-hidden shadow-lg">
              <Image 
                src="/pending-card.png" 
                alt="Pending status wedding confirmation card"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineVariants}
            className="w-full h-px bg-[#D7B980] origin-left"
          />

          {/* Row 2: The Confirmed Card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex flex-col md:flex-row items-stretch gap-[20px] md:gap-[40px]"
          >
            {/* Image Column (Left on desktop, bottom on mobile) */}
            <motion.div variants={imageLeftVariants} className="order-2 md:order-1 flex-1 relative h-[300px] md:h-[383px] w-full bg-[#E5E5E5] rounded-[2px] overflow-hidden shadow-lg">
              <Image 
                src="/confirmed-card.png" 
                alt="Confirmed status wedding entry card"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Text Column (Right on desktop, top on mobile) */}
            <div className="order-1 md:order-2 flex-1 flex flex-col justify-between items-start py-4">
              <motion.div variants={itemVariants} className="flex flex-col gap-[12px] w-full">
                <h3 className="font-['Instrument_Serif',serif] italic text-[24px] md:text-[32px] leading-[1.2] text-[#231F20]">
                  The Confirmed Card
                </h3>
                <p className="font-['Manrope',sans-serif] font-medium text-[14px] leading-[19px] text-[#303235] max-w-[484px]">
                  Once your planner verifies a guest — whether they've received a contribution or simply confirmed attendance — the card upgrades. The amber badge becomes a green Confirmed badge. Same elegant design. One meaningful change. Your guest can download it as an image or PDF and share it. It becomes their official entry card for your day.
                </p>
              </motion.div>
              
              <motion.p variants={itemVariants} className="font-['Manrope',sans-serif] font-normal text-[12px] leading-[16px] tracking-[-0.02em] text-[#8E6C4A] mt-6 md:mt-0">
                Triggered by your planner · Green "Confirmed ✓" badge · Downloadable as PNG or PDF
              </motion.p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}