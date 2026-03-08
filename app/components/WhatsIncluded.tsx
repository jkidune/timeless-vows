"use client";

import { motion, cubicBezier } from "framer-motion";
import Sparkles from "./Sparkles"; // Import the Sparkles component

export default function WhatsIncluded() {
  const features = [
    { 
      title: "Personalised Invitation Page", 
      sub: "Unique link · Your photo & names · Live countdown to the big day", 
      body: "A stunning, mobile-first invitation built around you — your names, your photo, your story. Every detail designed to feel like it was made for your day." 
    },
    { 
      title: "Every Detail, Beautifully Presented", 
      sub: "Event programme · Embedded map · Dress code · One-tap contribution copy", 
      body: "From the programme to the venue map, dress code to mobile money contribution details — everything your guests need, in one place, with one tap." 
    },
    { 
      title: "RSVP & Digital Cards", 
      sub: "RSVP form · Personalised Pending Card · Confirmed Card on verification", 
      body: "Guests confirm their attendance in seconds. Each one instantly receives a personalised card with their details and status." 
    },
    {
      title: "Dashboard & Guest Reports",
      sub: "Guest list · Contribution tracker · One-click Excel export",
      body: "Your private command centre. See who's coming, track contribution pledges, confirm guests, and export your full guest list to Excel."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
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

  return (
    // Added relative and isolate here to contain the absolute Sparkles layer
    <section className="relative w-full bg-[#222222] py-[100px] flex justify-center overflow-hidden isolate">
      
      {/* ── Background Sparkles Layer ── */}
      <Sparkles />

      {/* Added relative and z-10 here to ensure content sits above the sparkles */}
      <div className="relative z-10 max-w-[1280px] w-full px-6 flex flex-col items-center gap-[39px]">
        
        {/* ── Header Content ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full max-w-[1232px] flex flex-col items-start gap-[16px]"
        >
          {/* Section Pill */}
          <motion.div variants={itemVariants} className="inline-flex flex-row justify-center items-center px-[7px] py-[8px] border border-[#8C8C8C]/40 rounded-[1px] mb-[10px] backdrop-blur-sm">
            <span className="font-['Manrope',sans-serif] font-semibold text-[12px] leading-[16px] tracking-[0.13em] uppercase text-[#8E6C4A]">
              WHAT’S INCLUDED
            </span>
          </motion.div>

          {/* Titles */}
          <motion.h2 variants={itemVariants} className="font-['Cormorant_Garamond',serif] font-light text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[#D4CCBD] max-w-[500px]">
            Everything in one beautiful link.
          </motion.h2>

          <motion.p variants={itemVariants} className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[22px] text-[#D4CCBD] max-w-[484px]">
            Share one URL. Your guests open a stunning, mobile-first invitation page — no app to download, no confusion.
          </motion.p>
        </motion.div>

        {/* ── Feature Cards Grid ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full max-w-[1232px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group flex flex-col justify-between items-center p-[24px_16px] gap-[8px] min-h-[314px] bg-[#C4C4C4]/10 border border-[#8C8C8C]/40 rounded-[2px] backdrop-blur-md hover:bg-[#C4C4C4]/20 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out cursor-default"
            >
              <div className="w-full flex flex-col items-start gap-[12px]">
                <h3 className="font-['Instrument_Serif',serif] italic text-[24px] leading-[31px] text-[#D4CCBD]">
                  {feature.title}
                </h3>
                <p className="font-['Manrope',sans-serif] font-normal text-[12px] leading-[16px] tracking-[-0.02em] text-[#8E6C4A]">
                  {feature.sub}
                </p>
              </div>
              
              <p className="w-full font-['Manrope',sans-serif] font-medium text-[14px] leading-[19px] text-[#D7B980] mt-4">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}