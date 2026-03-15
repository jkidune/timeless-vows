"use client";

import Image from "next/image";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

interface Props {
  partner1?:       string;
  partner2?:       string;
  storyText?:      string;
  coupleImageUrl?: string;
}

export function OurStory({
  partner1      = "Barke",
  partner2      = "William",
  storyText,
  coupleImageUrl,
}: Props) {
  const { ref: imgRef,  visible: imgVisible  } = useScrollReveal();
  const { ref: textRef, visible: textVisible } = useScrollReveal();

  // Split DB story text into paragraphs, or use a default
  const paragraphs = storyText
    ? storyText.split(/\n\n+/).filter(Boolean)
    : [
        `${partner2} & ${partner1} are tying the knot!`,
        `By God's grace and through His perfect plan, two hearts have become one.`,
        `"You are the love I prayed for, the answer I never expected, and the blessing I will never take for granted."`,
        `Please join us as we say our vows and begin forever.`,
        `Sincerely,\n${partner2} & ${partner1}.`,
      ];

  return (
    <section id="our-story" className="bg-[#f7f3ee] px-6 py-[100px] overflow-hidden">
      <div className="mx-auto max-w-[1280px]">

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
            <Image
              src={coupleImageUrl ?? "/images/premium/couple-hands.jpg"}
              alt={`${partner1} and ${partner2} holding hands`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 490px"
            />

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

            {/* Story body — from DB or default */}
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
              {paragraphs.map((para, i) => (
                <p key={i} className={i > 0 ? "mt-4" : ""}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}