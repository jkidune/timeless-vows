"use client";

import Image from "next/image";

interface Props {
  venue?:          string;
  venueAddress?:   string;
  churchImageUrl?: string;
  mapsLink?:       string;
  partner1?:       string;
  partner2?:       string;
  weddingDate?:    Date;
}

export function ChurchVenue({
  venue          = "St. Albans Cathedral Church",
  venueAddress   = "Upanga 0124, Dar es Salaam, Tanzania",
  churchImageUrl,
  mapsLink       = "https://maps.app.goo.gl/KDCvwqvUS4ZWFD7w8",
  partner1       = "Barke",
  partner2       = "William",
  weddingDate    = new Date("2026-05-02"),
}: Props) {
  // Build dynamic .ics calendar link
  const d       = new Date(weddingDate);
  const dtStart = d.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const dtEnd   = new Date(d.getTime() + 4 * 3600000).toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const calHref = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${dtStart}%0ADTEND:${dtEnd}%0ASUMMARY:${encodeURIComponent(partner1 + " & " + partner2 + " Wedding")}%0ALOCATION:${encodeURIComponent(venue)}%0AEND:VEVENT%0AEND:VCALENDAR`;
  const calFile = `${partner1.toLowerCase()}-${partner2.toLowerCase()}-wedding.ics`;

  // Split address for multi-line display
  const addressLines = venueAddress.split(",").map((l) => l.trim());

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

      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center">
        <div className="flex flex-col items-center gap-[30px] text-center">

          <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#9d7760]">
            The Holy Mass will be at
          </p>

          {/* Church image — DB url or static fallback */}
          <div className="relative w-full max-w-[815px] h-[280px] md:h-[388px] overflow-hidden">
            <Image
              src={churchImageUrl ?? "/images/premium/church.jpg"}
              alt={`Illustration of ${venue}`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 815px"
            />
          </div>

          {/* Venue name */}
          <h2
            className="text-[clamp(28px,4vw,48px)] italic leading-tight tracking-[0.01em] text-[#482612]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {venue}
          </h2>

          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-[#c9a97e]/50" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]" />
            <div className="h-px w-12 bg-[#c9a97e]/50" />
          </div>

          {/* Address */}
          <div className="text-[clamp(15px,1.5vw,20px)] leading-[1.6] tracking-[0.05em] text-[#b9927a]">
            {addressLines.map((line, i) => (
              <p key={i} className="uppercase font-medium">{line}</p>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            {mapsLink && (
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="border border-[#a8795b] text-[#a8795b] text-[11px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#a8795b] hover:text-white transition-all duration-300"
              >
                Get Directions
              </a>
            )}
            <a
              href={calHref}
              download={calFile}
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