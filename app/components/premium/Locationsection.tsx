"use client";

interface Props {
  venue?:        string;
  venueAddress?: string;
  mapsLink?:     string;
  weddingDate?:  Date;
}

const DEFAULT_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.8327766!2d39.2742!3d-6.8120!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4bc47dd5b20d%3A0x4a5ad5fab93e3d5d!2sSt%20Albans%20Cathedral%20Church!5e0!3m2!1sen!2stz!4v1234567890";

export function LocationSection({
  venue        = "710 Garden Kasur",
  venueAddress = "Dar es Salaam, Tanzania",
  mapsLink     = "https://maps.app.goo.gl/KDCvwqvUS4ZWFD7w8",
  weddingDate  = new Date("2026-05-02"),
}: Props) {
  const d = new Date(weddingDate);
  const ceremonyTime = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true });

  return (
    <section
      id="location"
      className="bg-[#f7f3ee] px-6 py-[100px] overflow-hidden"
    >
      <div className="mx-auto max-w-[1280px]">

        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9d7760] mb-3">
            Location
          </p>
          <h2
            className="text-[clamp(30px,4vw,48px)] italic text-[#482612]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Join us at the reception
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">

          {/* Left: address details */}
          <div className="flex flex-col gap-8">

            {/* Reception venue */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#9d7760] mb-3">
                Reception Venue
              </p>
              <p
                className="text-[clamp(20px,3vw,32px)] italic text-[#482612] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {venue}
              </p>
              <p className="text-[15px] leading-[1.8] text-[#b9927a] mt-2 uppercase tracking-[0.05em]">
                {venueAddress}
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#c9a97e]/50" />
              <div className="h-1.5 w-1.5 rotate-45 bg-[#c9a97e]/60" />
              <div className="h-px w-8 bg-[#c9a97e]/50" />
            </div>

            {/* Event details */}
            <div className="flex flex-col gap-4">
              {[
                { label: "Ceremony",   value: ceremonyTime, note: venue },
                { label: "Dress Code", value: "Formal",     note: "See dress code section ↓" },
              ].map(({ label, value, note }) => (
                <div key={label} className="flex justify-between items-end border-b border-[#c9a97e]/20 pb-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#9d7760]">{label}</span>
                  <div className="text-right">
                    <span className="text-[16px] text-[#482612] font-medium">{value}</span>
                    <p className="text-[11px] text-[#b9927a] italic">{note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direction button */}
            {mapsLink && (
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 self-start border border-[#a8795b] text-[#a8795b] text-[11px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#a8795b] hover:text-white transition-all duration-300 group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Open in Google Maps
              </a>
            )}
          </div>

          {/* Right: map embed */}
          <div className="relative">
            <div className="overflow-hidden border border-[#c9a97e]/30 shadow-[0_8px_40px_rgba(168,121,91,0.12)]">
              <iframe
                title="Wedding venue location"
                src={DEFAULT_EMBED}
                width="100%"
                height="440"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full h-[380px] lg:h-[440px]"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#f7f3ee] border border-[#c9a97e]/30 px-4 py-2 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#9d7760]">
                {venue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}