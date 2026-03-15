"use client";
// FILE PATH: app/components/templates/PremiumPageClient.tsx

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

interface Wish {
  guestName: string;
  fromFamily: string | null;
  wishType: string | null;
  message: string;
}

interface GalleryImg {
  id: string;
  url: string;
  caption: string | null;
}

interface InvitationData {
  id: string;
  slug: string;
  partner1Name: string;
  partner2Name: string;
  weddingDate: Date;
  venue: string | null;
  venueAddress: string | null;
  mapsLink: string | null;
  heroImageUrl: string | null;
  coupleImageUrl: string | null;
  churchImageUrl: string | null;
  openingVideoUrl: string | null;
  storyText: string | null;
  inviteText: string | null;
  mobileMoneyLabel: string | null;
  mobileMoneyName: string | null;
  mobileMoneyNumber: string | null;
  bankName: string | null;
  bankAccountName: string | null;
  bankAccountNumber: string | null;
  bankBranch: string | null;
  rsvpDeadline: Date | null;
  status: string;
  giftWishes: Wish[];
  galleryImages: GalleryImg[];
}

interface Props {
  invitation: InvitationData;
}

export function PremiumPageClient({ invitation }: Props) {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroDone(true), []);

  // Build the couple display name
  const coupleNames = `${invitation.partner1Name} & ${invitation.partner2Name}`;

  return (
    <div className="relative bg-[#f7f3ee]">
      <OpeningSequence
        onComplete={handleIntroComplete}
        videoUrl={invitation.openingVideoUrl ?? "/videos/premium/opening.mp4"}
        coupleNames={coupleNames}
      />

      <div style={{ opacity: introDone ? 1 : 0, transition: "opacity 0.6s ease", transitionDelay: "0.1s" }}>
        <PremiumNavbar logoUrl={invitation.heroImageUrl ?? undefined} slug={invitation.slug} />

        <PremiumHero
          visible={introDone}
          partner1={invitation.partner1Name}
          partner2={invitation.partner2Name}
          weddingDate={invitation.weddingDate}
          heroImageUrl={invitation.heroImageUrl ?? undefined}
          inviteText={invitation.inviteText ?? undefined}
        />

        <OurStory
          partner1={invitation.partner1Name}
          partner2={invitation.partner2Name}
          storyText={invitation.storyText ?? undefined}
          coupleImageUrl={invitation.coupleImageUrl ?? undefined}
        />

        <WeddingSchedule weddingDate={invitation.weddingDate} />

        <ChurchVenue
          venue={invitation.venue ?? undefined}
          venueAddress={invitation.venueAddress ?? undefined}
          churchImageUrl={invitation.churchImageUrl ?? undefined}
          mapsLink={invitation.mapsLink ?? undefined}
        />

        <LocationSection
          venue={invitation.venue ?? undefined}
          venueAddress={invitation.venueAddress ?? undefined}
          mapsLink={invitation.mapsLink ?? undefined}
          weddingDate={invitation.weddingDate}
        />

        <PhotoGallery images={invitation.galleryImages} />

        <DressCode />

        <GiftWishes
          invitationSlug={invitation.slug}
          initialWishes={invitation.giftWishes}
          mobileMoneyLabel={invitation.mobileMoneyLabel ?? undefined}
          mobileMoneyName={invitation.mobileMoneyName ?? undefined}
          mobileMoneyNumber={invitation.mobileMoneyNumber ?? undefined}
          bankName={invitation.bankName ?? undefined}
          bankAccountName={invitation.bankAccountName ?? undefined}
          bankAccountNumber={invitation.bankAccountNumber ?? undefined}
          bankBranch={invitation.bankBranch ?? undefined}
        />

        <CountdownFooter
          weddingDate={invitation.weddingDate}
          partner1={invitation.partner1Name}
          partner2={invitation.partner2Name}
          slug={invitation.slug}
          //rsvpDeadline={invitation.rsvpDeadline ?? undefined}
        />
      </div>
    </div>
  );
}