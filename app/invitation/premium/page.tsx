// ─────────────────────────────────────────────────────────────────────
// FILE PATH: app/invitation/premium/page.tsx
// This is the main Premium Template page for Barke & William
// ─────────────────────────────────────────────────────────────────────

import { PremiumPageClient } from "./PremiumPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barke & William — 02 May 2026",
  description:
    "You are cordially invited to the wedding celebration of Barke and William on 2nd May 2026 in Dar es Salaam, Tanzania.",
  openGraph: {
    title: "Barke & William — Wedding Invitation",
    description: "02 May 2026 · Dar es Salaam, Tanzania",
    images: [{ url: "/images/premium/og-image.jpg", width: 1200, height: 630 }],
    // OG IMAGE: /public/images/premium/og-image.jpg
    // Use a 1200×630 crop of the hero background with the couple's names overlaid
  },
};

export default function PremiumInvitationPage() {
  return <PremiumPageClient />;
}