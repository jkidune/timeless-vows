"use client";

import Image from "next/image";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

export function OurStory() {
  const { ref: imgRef, visible: imgVisible } = useScrollReveal();
  const { ref: textRef, visible: textVisible } = useScrollReveal();

  return (
    <section id="our-story" className="bg-[#f7f3ee] px-6 py-[100px] overflow-hidden">
      <div className="mx-auto max-w-[1280px]">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-[#a8795b]/60" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a8795b]">
            Our Story
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[490px_minmax(0,1fr)] items-start gap-12 lg:gap-[72px]">

          {/* Couple image */}
          <div
            ref={imgRef as React.RefObject<HTMLDivElement>}
            className="relative h-[520px] lg:h-[631px] overflow-hidden"
            style={{
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible ? "translateX(0)" : "translateX(-32px)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          >
            {/*
              PLACE IMAGE AT: /public/images/premium/couple-hands.jpg
              Use the close-up of couple holding hands from the Figma design
              Size: 490×631px portrait
            */}
            <Image
              src="/images/premium/couple-hands.jpg"
              alt="Barke and William holding hands"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 490px"
            />

            {/* Subtle botanical overlay — low opacity */}
            {/*
              PLACE SVG AT: /public/illustrations/premium/flowers-corner.svg
              This is the floral vector illustration from Figma (opacity 0.23)
            */}
            <div
              className="absolute -right-8 -bottom-8 pointer-events-none"
              style={{ opacity: 0.18 }}
            >
              <Image
                src="/illustrations/premium/flowers-corner.svg"
                alt=""
                width={280}
                height={280}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Story text */}
          <div
            ref={textRef as React.RefObject<HTMLDivElement>}
            className="relative flex min-h-full flex-col items-end justify-between py-[10px] text-right gap-10"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1s ease, transform 1s ease",
              transitionDelay: "0.15s",
            }}
          >
            {/* Soft radial glow behind text */}
            <div
              className="pointer-events-none absolute left-[-120px] top-[140px] h-[438px] w-[431px] opacity-30"
              aria-hidden="true"
            >
              <div className="h-full w-full rounded-full"
                style={{
                  background: "radial-gradient(circle at center, rgba(234,186,153,0.25), rgba(234,186,153,0.05) 45%, transparent 70%)"
                }}
              />
            </div>

            {/* Heading */}
            <h2
              className="relative z-10 max-w-[520px] text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-[0.01em] text-[#4e2d28]"
              style={{ fontFamily: "var(--font-kapakana, 'Cormorant Garamond', serif)", fontWeight: 400 }}
            >
              Let&apos;s celebrate love,
              <br />
              laughter,
              <br />
              and happily ever after
            </h2>

            {/* Story body */}
            <div
              className="relative z-10 w-full max-w-[513px] text-left"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(16px, 2vw, 24px)",
                fontStyle: "italic",
                lineHeight: 1.6,
                letterSpacing: "0.01em",
                color: "#a8795b",
              }}
            >
              <p>William &amp; Barke are tying the knot!</p>
              <p className="mt-4">
                By God&apos;s grace and through His perfect plan, two hearts have
                become one.
              </p>
              <p className="mt-4 pl-4 border-l-2 border-[#c9a97e]/40 text-[#9d7760]">
                &ldquo;You are the love I prayed for, the answer I never expected,
                and the blessing I will never take for granted.&rdquo;
              </p>
              <p className="mt-4">
                Please join us as we say our vows and begin forever.
              </p>
              <p className="mt-6 text-[#4e2d28] not-italic font-medium tracking-[0.05em]">
                Sincerely,<br />
                William &amp; Barke.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}