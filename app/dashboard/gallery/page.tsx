// FILE PATH: app/dashboard/gallery/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";
import { GalleryManager } from "@/app/components/dashboard/GalleryManager";
import { Image as ImageIcon } from "lucide-react";

export default async function GalleryPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const invitation = await prisma.invitation.findFirst({
    where: { ownerId: user.id },
  });

  const images = invitation
    ? await prisma.galleryImage.findMany({
        where:   { invitationId: invitation.id },
        orderBy: { sortOrder: "asc" },
      })
    : [];

  return (
    <div className="w-full min-h-full p-6 lg:p-10">

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <ImageIcon size={16} className="text-[#a8795b]" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8795b]">Dashboard</p>
        </div>
        <h1
          className="text-[clamp(24px,3vw,36px)] text-[#482612] leading-tight"
          style={{ fontFamily: "var(--font-kapakana,'Cormorant Garamond',serif)", fontStyle: "italic", fontWeight: 400 }}
        >
          Gallery
        </h1>
        <p className="text-[12px] text-[#b9927a] mt-2">
          {images.length} image{images.length !== 1 ? "s" : ""} · shown on your invitation page
        </p>
      </div>

      {!invitation ? (
        <div className="bg-white border border-[#c9a97e]/18 p-12 text-center">
          <p className="text-[16px] italic text-[#b9927a]" style={{ fontFamily: "'Cormorant Garamond',serif" }}>
            Set up your invitation first to manage gallery images
          </p>
        </div>
      ) : (
        <GalleryManager invitationId={invitation.id} images={images} />
      )}
    </div>
  );
}