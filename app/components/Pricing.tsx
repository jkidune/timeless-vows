"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { RiCheckLine } from "react-icons/ri";

export default function Pricing() {
  const plans = [
    {
      name: "STARTER",
      price: "TZS 150,000",
      description: "The essentials, beautifully done. Invitation page, RSVP, basic dashboard, and Pending Cards for every guest.",
      features: [
        "Invitation page with all wedding details",
        "RSVP form with seat and pledge tracking",
        "Personalised Pending Card per guest",
        "Dashboard with Excel export",
        "Live for 3 months after wedding date",
      ],
      isPopular: false,
      dividerColor: "bg-[#8E6C4A]",
    },
    {
      name: "STANDARD",
      price: "TZS 250,000",
      description: "Everything in Starter, plus the full Confirmed Card experience and priority review turnaround.",
      features: [
        "Everything in Starter",
        "Personalised Confirmed Card per guest (planner-activated)",
        "Priority build — ready in 24 hours",
        "2 rounds of revisions",
        "Live for 6 months after wedding date",
      ],
      isPopular: true,
      dividerColor: "bg-[#303235]", 
    },
    {
      name: "PREMIUM",
      price: "TZS 400,000",
      description: "For couples who want a fully custom invitation experience, bespoke design, custom theme colour, and a dedicated account manager.",
      features: [
        "Custom theme colour and tailored design",
        "Unlimited revisions",
        "Dedicated WhatsApp account manager",
        "Live for 12 months after wedding date",
        "Priority support on the day of the wedding",
      ],
      isPopular: false,
      dividerColor: "bg-[#8E6C4A]",
    },
  ];

  // 1. Explicitly type as Variants to resolve the TS error
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
  };

  return (
    <section className="w-full bg-[#F6F2EE] py-[100px] flex justify-center overflow-hidden">
      <div className="max-w-[1280px] w-full px-6 flex flex-col items-center gap-[40px] md:gap-[60px]">
        
        {/* ── Header Area ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full max-w-[1232px] flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0"
        >
          {/* Text Content */}
          <div className="flex flex-col items-start gap-[20px] max-w-[600px]">
            {/* Pill */}
            <motion.div variants={itemVariants} className="inline-flex justify-center items-center px-[7px] py-[8px] border border-[#8C8C8C]/40 rounded-[1px]">
              <span className="font-['Manrope',sans-serif] font-semibold text-[12px] leading-[16px] tracking-[0.13em] uppercase text-[#8E6C4A]">
                PRICING
              </span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="font-['Cormorant_Garamond',serif] font-light text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[#231F20]">
              Simple pricing. One payment. No surprises.
            </motion.h2>

            <motion.p variants={itemVariants} className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[22px] text-[#303235]">
              No monthly fees. No per-guest charges. You pay once and your invitation stays live for up to 12 months after your wedding day.
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="w-full md:w-auto">
            <Link 
              href="/contact" 
              className="inline-flex flex-row justify-center items-center px-[20px] py-[12px] bg-[#8E6C4A] border border-[#8E6C4A] rounded-[1px] hover:bg-[#7A5A38] transition-colors duration-300 whitespace-nowrap"
            >
              <span className="font-['Manrope',sans-serif] font-medium text-[16px] leading-[22px] text-center tracking-[-0.02em] text-[#F7F3EE]">
                Get Your Invitation
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Pricing Cards Grid ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full max-w-[1232px] grid grid-cols-1 md:grid-cols-3 gap-[20px]"
        >
          {plans.map((plan) => (
            <motion.div 
              key={plan.name}
              variants={itemVariants}
              className={`relative flex flex-col p-[28px_24px] gap-[24px] bg-white/40 backdrop-blur-sm border rounded-[2px] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                plan.isPopular 
                  ? "border-[#8E6C4A]/40 shadow-[0_10px_30px_-15px_rgba(142,108,74,0.2)]" 
                  : "border-[#8C8C8C]/40"
              }`}
            >
              {/* Heading Section */}
              <div className="flex flex-col gap-[12px] min-h-[140px]">
                <div className="flex flex-row justify-between items-center w-full">
                  <h3 className="font-['Instrument_Serif',serif] italic text-[24px] leading-[31px] text-[#8E6C4A]">
                    {plan.name}
                  </h3>
                  
                  {plan.isPopular && (
                    <div className="flex items-center justify-center px-2 py-1 bg-[#8E6C4A] rounded-[1px]">
                      <span className="font-['Manrope',sans-serif] font-medium text-[9px] tracking-widest text-[#F7F3EE]">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="font-['Manrope',sans-serif] font-semibold text-[32px] leading-[44px] tracking-[-0.02em] text-[#303235]">
                  {plan.price}
                </div>
                
                <p className="font-['Manrope',sans-serif] font-medium text-[14px] leading-[19px] text-[#383838]">
                  {plan.description}
                </p>
              </div>

              {/* Colored Divider Bar */}
              <div className={`w-full h-[4px] rounded-full ${plan.dividerColor} opacity-80`} />

              {/* Features List */}
              <ul className="flex flex-col gap-[16px] mt-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex flex-row items-start gap-[12px]">
                    <div className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#1F3F5C]/5 border border-[#8E6C4A] flex-shrink-0 mt-[2px]">
                      <RiCheckLine className="w-[12px] h-[12px] text-[#8E6C4A]" />
                    </div>
                    
                    <span className="font-['Manrope',sans-serif] font-normal text-[15px] leading-[22px] text-[#8E6C4A] opacity-90">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <div className="mt-auto pt-8 md:hidden">
                <Link 
                  href="/contact" 
                  className={`flex justify-center items-center py-[10px] w-full border rounded-[1px] transition-colors ${
                    plan.isPopular 
                      ? "bg-[#8E6C4A] border-[#8E6C4A] text-[#F7F3EE]" 
                      : "bg-transparent border-[#8E6C4A] text-[#8E6C4A]"
                  }`}
                >
                  <span className="font-['Manrope',sans-serif] font-medium text-[14px]">
                    Select {plan.name}
                  </span>
                </Link>
              </div>

              {/* Add CTA Button for Standard Card */}
              {plan.isPopular && (
                <div className="mt-6 hidden md:block">
                  <Link 
                    href="/contact" 
                    className="flex justify-center items-center py-[12px] px-[24px] w-full bg-[#8E6C4A] border border-[#8E6C4A] rounded-[1px] hover:bg-[#7A5A38] transition-colors duration-300"
                  >
                    <span className="font-['Manrope',sans-serif] font-medium text-[16px] leading-[22px] tracking-[-0.02em] text-[#F7F3EE]">
                      Book a free consultation
                    </span>
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}