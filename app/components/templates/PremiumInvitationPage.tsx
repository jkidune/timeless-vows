// FILE PATH: app/components/templates/PremiumInvitationPage.tsx
// Server component — renders the premium template with DB-driven content

import { PremiumPageClient } from "@/app/components/templates/PremiumPageClient";

// The full invitation type including related data
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
  footerImageUrl: string | null;
  logoUrl: string | null;
  openingVideoUrl: string | null;
  storyText: string | null;
  inviteText: string | null;
  scheduleJson: unknown;
  mobileMoneyLabel: string | null;
  mobileMoneyName: string | null;
  mobileMoneyNumber: string | null;
  bankName: string | null;
  bankAccountName: string | null;
  bankAccountNumber: string | null;
  bankBranch: string | null;
  primaryColor: string;
  accentColor: string;
  rsvpDeadline: Date | null;
  status: string;
  giftWishes: Wish[];
  galleryImages: GalleryImg[];
}

interface Props {
  invitation: InvitationData;
}

export function PremiumInvitationPage({ invitation }: Props) {
  return <PremiumPageClient invitation={invitation} />;
}