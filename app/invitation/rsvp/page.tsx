// ─────────────────────────────────────────────────────────────────────
// FILE PATH: app/invitation/rsvp/page.tsx
// ─────────────────────────────────────────────────────────────────────

import { RSVPClient } from "./RSVPClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RSVP — Barke & William · 02 May 2026",
  description:
    "Kindly confirm your attendance at the wedding of Barke and William on 2nd May 2026 in Dar es Salaam.",
  openGraph: {
    title: "RSVP — Barke & William",
    description: "Confirm your attendance · 02 May 2026 · Dar es Salaam",
    images: [{ url: "/images/premium/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RSVPPage() {
  return <RSVPClient />;
}
