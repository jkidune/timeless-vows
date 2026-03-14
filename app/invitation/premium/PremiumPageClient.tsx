// ─────────────────────────────────────────────────────────────────────
// FILE PATH: app/invitation/premium/PremiumPageClient.tsx
// Client component — manages intro state and renders all sections
// ─────────────────────────────────────────────────────────────────────

"use client";

import { useState, useCallback } from "react";

import { OpeningSequence }  from "@/app/components/premium/Openingsequence";
import { PremiumNavbar }    from "@/app/components/premium/Premiumnavbar";
import { PremiumHero }      from "@/app/components/premium/Premiumhero";
import { OurStory }         from "@/app/components/premium/Ourstory";
import { WeddingSchedule }  from "@/app/components/premium/Weddingschedule";
import { ChurchVenue }      from "@/app/components/premium/Churchvenue";
import { LocationSection }  from "@/app/components/premium/Locationsection";
import { PhotoGallery }     from "@/app/components/premium/Photogallery";
import { DressCode }        from "@/app/components/premium/DressCode";
import { GiftWishes }       from "@/app/components/premium/Giftwishes";
import { CountdownFooter }  from "@/app/components/premium/Countdownfooter";

export function PremiumPageClient() {
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <div className="relative bg-[#f7f3ee]">
      {/* ── OPENING SEQUENCE (fixed overlay, disappears after enter) ── */}
      <OpeningSequence onComplete={handleIntroComplete} />

      {/* ── MAIN PAGE CONTENT ────────────────────────────────────────── */}
      {/* 
        We always render the main content beneath the overlay.
        The opening sequence sits on top (z-[200]) and fades away.
        This means the page loads in the background and is ready 
        to scroll immediately after the intro.
      */}
      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: "opacity 0.6s ease",
          transitionDelay: introDone ? "0.1s" : "0s",
        }}
      >
        {/* Sticky navbar */}
        <PremiumNavbar />

        {/* 1. Hero — text animates in only after intro is done */}
        <PremiumHero visible={introDone} />

        {/* 2. Our Story */}
        <OurStory />

        {/* 3. Wedding Day Schedule */}
        <WeddingSchedule />

        {/* 4. Church Venue */}
        <ChurchVenue />

        {/* 5. Location + Map */}
        <LocationSection />

        {/* 6. Photo Gallery */}
        <PhotoGallery />

        {/* 7. Dress Code + Bank Details */}
        <DressCode />

        {/* 8. Gift Wishes Form */}
        <GiftWishes />

        {/* 9. Countdown + Footer */}
        <CountdownFooter />
      </div>
    </div>
  );
}