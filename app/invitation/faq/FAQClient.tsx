// ─────────────────────────────────────────────────────────────────────
// FILE PATH: app/invitation/faq/FAQClient.tsx
// Accordion FAQ — all answers specific to Barke & William's wedding
// Update any [bracketed] fields once you confirm the details
// ─────────────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ── FAQ DATA ──────────────────────────────────────────────────────────
// Update any [bracketed] items once confirmed
const FAQ_CATEGORIES = [
  {
    category: "The Ceremony",
    icon: "✦",
    questions: [
      {
        q: "When and where is the ceremony?",
        a: "The Holy Mass ceremony will be held at St. Albans Cathedral Church, Upanga, Dar es Salaam, on Saturday 2nd May 2026. The ceremony begins promptly at 12:00 PM. We kindly ask guests to be seated by 11:45 AM.",
      },
      {
        q: "Is the ceremony indoors or outdoors?",
        a: "The ceremony is held inside St. Albans Cathedral Church. The reception later in the evening is held at the garden venue at 710 Garden Kasur. Please prepare for both an air-conditioned church setting and an outdoor garden in the evening.",
      },
      {
        q: "Will there be a live stream for guests who cannot attend?",
        a: "We are working on arranging a live stream link for close family and friends who are unable to be present in person. If confirmed, the link will be shared via WhatsApp closer to the date.",
      },
      {
        q: "Is photography allowed during the ceremony?",
        a: "We have a professional photographer capturing every moment for us. During the ceremony itself, we kindly ask all guests to observe an \"unplugged\" policy — phones and cameras away, and hearts fully present. After the ceremony, you are very welcome to take photos freely.",
      },
    ],
  },
  {
    category: "Getting There",
    icon: "🗺",
    questions: [
      {
        q: "How do I get to St. Albans Cathedral Church?",
        a: "St. Albans Cathedral Church is located in Upanga, Dar es Salaam (postcode 0124). You can navigate there via Google Maps — tap \"Get Directions\" on the Location section of the invitation. Uber and Bolt are both widely available in Dar es Salaam.",
      },
      {
        q: "Is parking available?",
        a: "There is limited street parking near the church. We recommend arriving early or using a rideshare service to avoid any inconvenience. The reception venue at Garden Kasur has a dedicated parking area for guests.",
      },
      {
        q: "Will there be shuttle transportation between venues?",
        a: "We are arranging a limited shuttle service between St. Albans Cathedral and the reception venue for guests who need it. Details including pick-up times and meeting point will be shared via the wedding WhatsApp group closer to the date.",
      },
      {
        q: "What about guests travelling from outside Dar es Salaam?",
        a: "For guests flying in, Julius Nyerere International Airport (DAR) is approximately 20–30 minutes from the church by car depending on traffic. We recommend booking accommodation in the Upanga, Msasani Peninsula, or Oyster Bay areas to be close to both venues. Contact us directly and we can suggest preferred hotels.",
      },
    ],
  },
  {
    category: "Dress Code",
    icon: "👗",
    questions: [
      {
        q: "What is the dress code?",
        a: "The dress code is formal garden elegance. Ladies are invited to wear flowing gowns or midi dresses in warm earth tones — champagne, nude, blush, burnt sienna, or terracotta. Gentleman should wear a classic black suit with a white or ivory shirt.",
      },
      {
        q: "Can I wear white or ivory?",
        a: "We kindly ask that white and ivory tones be reserved exclusively for the bride. This includes cream, off-white, and champagne-white shades. There are so many beautiful colours in our suggested palette — please choose from those instead.",
      },
      {
        q: "What shoes are appropriate for the evening garden reception?",
        a: "The garden reception venue may have some grass and uneven surfaces. While heels are perfectly welcome, we recommend block heels, wedges, or elegant flat sandals if you plan to move around freely on the lawn.",
      },
      {
        q: "Is there a specific colour to avoid?",
        a: "Please avoid white, ivory, and off-white. Also, as this is a formal occasion, very casual attire such as jeans, t-shirts, or sneakers would not be appropriate.",
      },
    ],
  },
  {
    category: "Food & Drinks",
    icon: "🍽",
    questions: [
      {
        q: "What meal options will be available?",
        a: "We will be serving a plated dinner with four options: Chicken, Fish, Vegetarian, and Vegan. Please indicate your preference and any dietary restrictions when you RSVP so we can ensure the kitchen is prepared for you.",
      },
      {
        q: "I have a severe food allergy — who do I contact?",
        a: "Please note your allergy clearly in the dietary notes field when you RSVP, and also reach out to us directly via [contact number or email] so we can speak to the catering team personally about your requirements.",
      },
      {
        q: "Will there be a cocktail hour?",
        a: "Yes! Following the photo session at approximately 2:30 PM, there will be a cocktail and canapé hour before the full reception begins at 5:00 PM. This is a great time to mingle and enjoy the garden setting.",
      },
      {
        q: "Will alcohol be served?",
        a: "A selection of wines, spirits, soft drinks, and non-alcoholic cocktails will be available throughout the evening. We respectfully ask all guests to drink responsibly.",
      },
    ],
  },
  {
    category: "Gifts",
    icon: "🎁",
    questions: [
      {
        q: "Do you have a gift registry?",
        a: "We don't have a formal registry — your presence truly is the greatest gift. However, if you'd like to contribute to our new life together, we gratefully accept monetary gifts via M-Pesa or bank transfer. The details are in the Gift & Dress Code section on the main invitation.",
      },
      {
        q: "Can I bring a physical gift to the wedding?",
        a: "Of course — if your heart wants to bring something, we will receive it with love. There will be a small gift table at the reception venue. We simply want you to know that no gift is expected or required.",
      },
      {
        q: "How do I send money via M-Pesa?",
        a: "You can send directly to the number listed in the Dress Code & Gift section of the invitation. Please use your full name as the reference so we can attribute the gift correctly. Any amount is received with deep gratitude.",
      },
    ],
  },
  {
    category: "RSVP & General",
    icon: "📋",
    questions: [
      {
        q: "When is the RSVP deadline?",
        a: "Please RSVP by 25th April 2026 so we can finalise seating arrangements, catering numbers, and all the fine details that will make your experience wonderful.",
      },
      {
        q: "Can I bring a plus-one or extra guests?",
        a: "Due to venue capacity, we have a strict guest list. Invitations are extended as addressed — please do not bring additional guests unless they are explicitly named on your invitation or you have confirmed with us directly.",
      },
      {
        q: "What should I do if my plans change after RSVPing?",
        a: "Life happens! Please contact us as soon as possible if your attendance changes. You can reach us via the WhatsApp group, or directly at [contact number]. We understand completely and would rather know early.",
      },
      {
        q: "Will children be in attendance?",
        a: "We love little ones, and a small number of children from immediate family will be present. However, as this is a formal evening event, we kindly ask that arrangements be made for young children where possible. If you have a specific concern, please reach out to us directly.",
      },
      {
        q: "I still have a question not answered here — who do I contact?",
        a: "Please reach out to us directly via WhatsApp at [contact number], or send us a message through the Gift Wishes form and include your question. We'll get back to you as soon as we can.",
      },
    ],
  },
];

// ── ACCORDION ITEM ────────────────────────────────────────────────────
function AccordionItem({
  q, a, isOpen, onToggle,
}: {
  q: string; a: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div
      className={`border-b border-[#c9a97e]/20 transition-colors duration-300 ${
        isOpen ? "bg-white" : "hover:bg-white/50"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className="text-[16px] text-[#482612] leading-snug pr-2 transition-colors duration-300"
          style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: isOpen ? "italic" : "normal" }}
        >
          {q}
        </span>
        <span
          className={`mt-1 flex-shrink-0 h-5 w-5 border border-[#c9a97e]/50 flex items-center justify-center text-[#a8795b] text-[11px] transition-transform duration-300 ${
            isOpen ? "rotate-45 bg-[#a8795b] border-[#a8795b] text-white" : ""
          }`}
        >
          +
        </span>
      </button>

      {/* Animated answer panel */}
      <div
        style={{
          maxHeight: isOpen ? "600px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="px-6 pb-6 pt-0">
          <div className="border-l-2 border-[#c9a97e]/40 pl-4">
            <p
              className="text-[15px] italic text-[#9d7760] leading-[1.75]"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
            >
              {a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────
export function FAQClient() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...FAQ_CATEGORIES.map((c) => c.category)];

  const visibleCategories =
    activeCategory === "All"
      ? FAQ_CATEGORIES
      : FAQ_CATEGORIES.filter((c) => c.category === activeCategory);

  const toggle = (key: string) =>
    setOpenItem((prev) => (prev === key ? null : key));

  return (
    <div className="min-h-screen bg-[#f7f3ee]">

      {/* ── TOP BAR ── */}
      <header className="sticky top-0 z-50 bg-[#f7f3ee]/95 backdrop-blur-sm border-b border-[#c9a97e]/20">
        <div className="mx-auto max-w-[1280px] px-6 py-3 flex items-center justify-between">
          <Link
            href="/invitation/premium"
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#a8795b] hover:text-[#482612] transition-colors duration-300"
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Back to Invitation
          </Link>
          <Image
            src="/images/premium/bw-logo.png"
            alt="Barke and William"
            width={60}
            height={58}
            className="object-contain opacity-70"
          />
          <Link
            href="/invitation/rsvp"
            className="text-[11px] uppercase tracking-[0.2em] bg-[#a8795b] text-white px-5 py-2.5 hover:bg-[#482612] transition-colors duration-300"
          >
            RSVP
          </Link>
        </div>
      </header>

      {/* ── PAGE HERO ── */}
      <div
        className="relative px-6 py-20 text-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/premium/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,23,19,0.6)] to-[rgba(28,23,19,0.78)]" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
            Having any trouble?
          </p>
          <h1
            className="text-[clamp(36px,6vw,80px)] text-white leading-tight"
            style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
          >
            Frequently Asked Questions
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-[#c9a97e]/50" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]" />
            <div className="h-px w-10 bg-[#c9a97e]/50" />
          </div>
          <p
            className="max-w-[480px] text-[clamp(14px,1.8vw,17px)] italic text-white/70"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            Everything you need to know about Barke &amp; William&apos;s wedding day. 
            Can&apos;t find your answer? Reach out to us directly.
          </p>
        </div>
      </div>

      {/* ── CATEGORY FILTER ── */}
      <div className="sticky top-[57px] z-40 bg-[#f7f3ee]/95 backdrop-blur-sm border-b border-[#c9a97e]/15">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none py-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 text-[10px] uppercase tracking-[0.18em] px-5 py-4 border-b-2 transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat
                    ? "border-[#a8795b] text-[#a8795b] font-semibold"
                    : "border-transparent text-[#9d7760]/60 hover:text-[#a8795b]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACCORDION CONTENT ── */}
      <div className="px-6 py-16">
        <div className="mx-auto max-w-[860px] flex flex-col gap-12">

          {visibleCategories.map((cat) => (
            <div key={cat.category}>
              {/* Category heading */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-lg">{cat.icon}</span>
                <h2
                  className="text-[clamp(20px,3vw,28px)] italic text-[#482612]"
                  style={{ fontFamily: "'Cormorant Garamond',serif" }}
                >
                  {cat.category}
                </h2>
                <div className="flex-1 h-px bg-[#c9a97e]/20" />
              </div>

              {/* Accordion items */}
              <div className="border border-[#c9a97e]/20 bg-[#f7f3ee]">
                {cat.questions.map((item, i) => {
                  const key = `${cat.category}-${i}`;
                  return (
                    <AccordionItem
                      key={key}
                      q={item.q}
                      a={item.a}
                      isOpen={openItem === key}
                      onToggle={() => toggle(key)}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still have questions CTA */}
          <div className="bg-[#1c1713] p-10 text-center flex flex-col items-center gap-5">
            <p
              className="text-[clamp(22px,3vw,32px)] italic text-[#c9a97e]/80"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
            >
              Still have a question?
            </p>
            <p className="text-[13px] text-white/40 max-w-[360px] leading-[1.7] italic"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}>
              We&apos;re happy to help. Reach out via WhatsApp or leave us a message in the Gift Wishes section of the invitation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/255719906205" // ← update with real WhatsApp number
                target="_blank"
                rel="noreferrer"
                className="border border-[#c9a97e]/30 text-[#c9a97e]/70 text-[11px] uppercase tracking-[0.2em] px-8 py-3 hover:border-[#c9a97e] hover:text-[#c9a97e] transition-all duration-300"
              >
                WhatsApp Us
              </a>
              <Link
                href="/invitation/premium#gift"
                className="bg-[#a8795b] text-white text-[11px] uppercase tracking-[0.2em] px-8 py-3 hover:bg-[#c9a97e] transition-all duration-300"
              >
                Leave a Message
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mini footer */}
      <footer className="bg-[#1c1713] py-8 px-6 text-center">
        <p
          className="text-[clamp(18px,3vw,28px)] text-[#c9a97e]/40 italic"
          style={{ fontFamily: "'Cormorant Garamond',serif" }}
        >
          Barke & William · 02 May 2026
        </p>
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/15 mt-2">
          Powered by Timeless Vows
        </p>
      </footer>
    </div>
  );
}