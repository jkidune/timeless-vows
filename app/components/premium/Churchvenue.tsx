"use client";

import Image from "next/image";

/*
  IMAGES NEEDED:
  - /public/images/premium/church.jpg
    → The watercolor/illustrated image of St. Albans Cathedral from the Figma file
    → Size: 815×388px landscape
    → This is the AI-generated illustration of the church

  - /public/illustrations/premium/botanical-left.svg
    → Large botanical/floral illustration for top-left corner decoration
    → Place at opacity 0.08 — from Figma design tokens

  - /public/illustrations/premium/botanical-right.svg
    → Mirror of botanical-left for top-right corner
*/

export function ChurchVenue() {
  return (
    <section
      id="church"
      className="relative overflow-hidden bg-white px-6 py-[100px]"
    >
      {/* Botanical corner decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/illustrations/premium/botanical-left.svg"
          alt=""
          width={751}
          height={758}
          className="absolute -left-32 -top-32 opacity-[0.08]"
        />
        <Image
          src="/illustrations/premium/botanical-right.svg"
          alt=""
          width={751}
          height={758}
          className="absolute -right-32 -top-36 opacity-[0.08]"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center">
        <div className="flex flex-col items-center gap-[30px] text-center">

          {/* Label */}
          <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#9d7760]">
            The Holy Mass will be at
          </p>

          {/* Church illustration */}
          <div className="relative w-full max-w-[815px] h-[280px] md:h-[388px] overflow-hidden">
            <Image
              src="/images/premium/church.jpg"
              alt="Illustration of St. Albans Cathedral Church"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 815px"
            />
          </div>

          {/* Church name */}
          <h2
            className="text-[clamp(28px,4vw,48px)] italic leading-tight tracking-[0.01em] text-[#482612]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            St. Albans Cathedral Church
          </h2>

          {/* Ornament divider */}
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-[#c9a97e]/50" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]" />
            <div className="h-px w-12 bg-[#c9a97e]/50" />
          </div>

          {/* Address */}
          <div
            className="text-[clamp(15px,1.5vw,20px)] leading-[1.6] tracking-[0.05em] text-[#b9927a]"
          >
            <p className="uppercase font-medium">Upanga 0124</p>
            <p className="uppercase font-medium">Dar es Salaam, Tanzania</p>
          </div>

          {/* Add to calendar / directions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <a
              href="https://maps.app.goo.gl/KDCvwqvUS4ZWFD7w8"
              target="_blank"
              rel="noreferrer"
              className="border border-[#a8795b] text-[#a8795b] text-[11px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#a8795b] hover:text-white transition-all duration-300"
            >
              Get Directions
            </a>
            <a
              href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:20260502T090000Z%0ADTEND:20260502T130000Z%0ASUMMARY:Barke & William Wedding%0ALOCATION:St. Albans Cathedral Church, Upanga, Dar es Salaam%0AEND:VEVENT%0AEND:VCALENDAR"
              download="barke-william-wedding.ics"
              className="border border-[#482612]/20 text-[#482612]/60 text-[11px] tracking-[0.2em] uppercase px-8 py-3 hover:border-[#482612]/50 hover:text-[#482612] transition-all duration-300"
            >
              Add to Calendar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}