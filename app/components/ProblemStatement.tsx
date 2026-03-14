"use client";

import { motion, cubicBezier, easeOut } from "framer-motion";
import Image from "next/image";

export default function ProblemStatement() {
  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Delays each child animation by 0.2s
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: cubicBezier(0.21, 0.47, 0.32, 0.98) } // Smooth easing curve
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 1.2, ease: easeOut } 
    },
  };

  return (
    <section className="w-full bg-[#F6F2EE] py-[100px] flex justify-center overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1280px] w-full px-6 flex flex-col lg:flex-row items-start gap-10 lg:gap-[39px]"
      >
        
        {/* 1st Column: Section Pill */}
        <motion.div variants={itemVariants} className="w-full lg:w-auto flex-shrink-0">

          <div className="inline-flex flex-row justify-center items-center px-[12px] py-[8px] border border-[#303235]/40 rounded-[1px] whitespace-nowrap">
            <span className="font-['Manrope',sans-serif] font-semibold text-[12px] leading-[16px] tracking-[0.13em] uppercase text-[#8E6C4A]">
              PROBLEM STATEMENT
            </span>
          </div>
        </motion.div>

        {/* 2nd Column: Content Wrapper */}
        <motion.div variants={itemVariants} className="flex flex-col justify-between w-full lg:w-[478px] min-h-full lg:h-[544px] gap-12 lg:gap-0 flex-shrink-0">
          
          {/* Top Text Wrapper */}
          <div className="flex flex-col items-start gap-[28px]">
            <h2 className="font-['Cormorant_Garamond',serif] font-light text-[36px] leading-[38px] tracking-[-0.02em] text-[#8E6C4A] max-w-[376px]">
              Still sending a JPEG on WhatsApp?
            </h2>
            
            <p className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[22px] text-[#303235] max-w-[484px]">
              Your wedding deserves more than a screenshot. Most couples in Tanzania spend days designing an invitation in Canva, then chase confirmations manually over calls, texts, and spreadsheets — with no clear picture of who&apos;s actually coming.
            </p>
          </div>

          {/* Bottom Callout & Trust Line */}
          <div className="flex flex-col items-start gap-[8px]">
            <p className="font-['Manrope',sans-serif] font-medium text-[14px] leading-[19px] text-[#000000] max-w-[480px]">
              Timeless Vows changes all of that. One link. Every detail. Every RSVP. Every confirmation card.
            </p>
            
            <p className="font-['Manrope',sans-serif] font-normal text-[12px] leading-[16px] tracking-[-0.02em] text-[#8E6C4A]">
              Trusted by couples in Dar es Salaam · Arusha · Zanzibar
            </p>
          </div>

        </motion.div>

        {/* 3rd Column: Image */}
        <motion.div variants={imageVariants} className="w-full lg:w-[510px] h-[400px] lg:h-[544px] relative flex-shrink-0">
          <Image 
            src="/images/jeremy-wong-weddings.jpg" // Place your image in public/images/
            alt="Elegant wedding setting representing Timeless Vows"
            fill
            className="object-cover rounded-[2px]"
          />
        </motion.div>

      </motion.div>
    </section>
  );
}
