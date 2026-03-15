// FILE PATH: app/invitation/[slug]/page.tsx
// This is the dynamic router — reads template type from DB and renders correct template
// Replace the existing content of this file

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Import both template page components
import { PremiumInvitationPage } from "@/app/components/templates/PremiumInvitationPage";
import { StandardInvitationPage } from "@/app/components/templates/StandardInvitationPage";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug: params.slug },
  });
  if (!invitation) return { title: "Invitation Not Found" };

  return {
    title: `${invitation.partner1Name} & ${invitation.partner2Name} — ${new Date(invitation.weddingDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
    description: `You are cordially invited to the wedding of ${invitation.partner1Name} and ${invitation.partner2Name}.`,
    openGraph: {
      title: `${invitation.partner1Name} & ${invitation.partner2Name} Wedding`,
      images: invitation.heroImageUrl ? [{ url: invitation.heroImageUrl }] : [],
    },
  };
}

export default async function InvitationSlugPage({ params }: Props) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug: params.slug },
    include: {
      giftWishes: {
        where:   { isApproved: true },
        orderBy: { submittedAt: "desc" },
        take:    20,
        select:  { guestName: true, fromFamily: true, wishType: true, message: true },
      },
      galleryImages: {
        orderBy: { sortOrder: "asc" },
        select:  { id: true, url: true, caption: true },
      },
    },
  });

  if (!invitation) notFound();

  // Suspended invitations show nothing
  if (invitation.status === "SUSPENDED") notFound();

  // Draft invitations — only show to admins (handled in template components)

  // Route to correct template based on the invitation's template field
  if (invitation.template === "PREMIUM") {
    return <PremiumInvitationPage invitation={invitation} />;
  }

  return <StandardInvitationPage invitation={invitation} />;
}