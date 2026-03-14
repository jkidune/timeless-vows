// ─────────────────────────────────────────────────────────────────────
// FILE PATH: app/invitation/faq/page.tsx
// ─────────────────────────────────────────────────────────────────────

import { FAQClient } from "./FAQClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Barke & William · 02 May 2026",
  description:
    "Frequently asked questions about the wedding of Barke and William on 2nd May 2026 in Dar es Salaam, Tanzania.",
};

export default function FAQPage() {
  return <FAQClient />;
}