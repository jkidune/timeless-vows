"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  // We use state to track which accordion is open. 
  // By default, the first one (index 0) is open. Set to null to have all closed initially.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I need to know anything technical?",
      answer: "Not at all. You fill in a simple form and we build everything for you. You review it on your phone via a preview link. No technical knowledge needed."
    },
    {
      question: "How do guests receive their confirmation card?",
      answer: "The moment a guest RSVPs, they instantly receive a digital Pending Card. Once your planner verifies their attendance or contribution, the card upgrades to a green Confirmed Card, which they can download directly to their phone."
    },
    {
      question: "Can I update the details after my invitation is live?",
      answer: "Absolutely. Depending on your plan, you have either set rounds of revisions or unlimited updates. Simply send us a message on WhatsApp, and we'll update your live link immediately."
    },
    {
      question: "How does contribution tracking work?",
      answer: "When guests RSVP, they can log a pledge for their contribution. Your private dashboard tracks all these pledges in real-time. Once the actual transfer is made, you or your planner can mark it as received and confirm the guest."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
  };

  return (
    <section className="w-full bg-[#F6F2EE] py-[100px] flex justify-center overflow-hidden">
      <div className="max-w-[1280px] w-full px-6 flex flex-col lg:flex-row items-start gap-[60px] lg:gap-[100px]">
        
        {/* ── Left Column: Sticky Header ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full lg:w-[40%] flex flex-col items-start gap-[20px] lg:sticky lg:top-[120px]"
        >
          {/* Section Pill */}
          <motion.div variants={itemVariants} className="inline-flex justify-center items-center px-[7px] py-[8px] border border-[#8C8C8C]/40 rounded-[1px]">
            <span className="font-['Manrope',sans-serif] font-semibold text-[12px] leading-[16px] tracking-[0.13em] uppercase text-[#8E6C4A]">
              FAQ
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 variants={itemVariants} className="font-['Cormorant_Garamond',serif] font-light text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[#231F20]">
            Questions? We have answers.
          </motion.h2>
        </motion.div>

        {/* ── Right Column: Accordion List ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="w-full lg:w-[60%] flex flex-col"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex flex-col border-b border-[#8E6C4A]"
              >
                {/* Accordion Button */}
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="flex flex-row justify-between items-center py-[24px] w-full text-left focus:outline-none group hover:bg-[#8E6C4A]/5 transition-colors px-2 -mx-2 rounded-[2px]"
                >
                  <span className={`font-['Manrope',sans-serif] font-medium text-[18px] md:text-[20px] leading-[1.4] transition-colors duration-300 ${isOpen ? "text-[#8E6C4A]" : "text-[#231F20]"}`}>
                    {faq.question}
                  </span>
                  
                  {/* Plus/Minus Icon */}
                  <div className="flex-shrink-0 ml-4 flex items-center justify-center w-[32px] h-[32px] rounded-full border border-[#231F20]/20 group-hover:border-[#8E6C4A] transition-colors duration-300">
                    {isOpen ? (
                      <Minus className="w-[16px] h-[16px] text-[#8E6C4A]" strokeWidth={1.5} />
                    ) : (
                      <Plus className="w-[16px] h-[16px] text-[#231F20] group-hover:text-[#8E6C4A] transition-colors duration-300" strokeWidth={1.5} />
                    )}
                  </div>
                </button>

                {/* Animated Answer Wrapper */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-[32px] px-2 -mx-2 max-w-[600px]">
                        <p className="font-['Manrope',sans-serif] font-normal text-[16px] leading-[1.6] text-[#303235]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}