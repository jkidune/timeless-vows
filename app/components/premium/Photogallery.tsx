"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
  id?: string;
  url: string;
  caption?: string | null;
}

interface Props {
  // If passed from DB (via PremiumPageClient), uses these
  images?: GalleryImage[];
}

// Static fallback — used only when no DB images exist yet
const STATIC_GALLERY = [
  { url: "/images/premium/gallery/gallery-01.jpg", span: "row-span-2" },
  { url: "/images/premium/gallery/gallery-02.jpg", span: "" },
  { url: "/images/premium/gallery/gallery-03.jpg", span: "" },
  { url: "/images/premium/gallery/gallery-04.jpg", span: "" },
  { url: "/images/premium/gallery/gallery-05.jpg", span: "row-span-2" },
  { url: "/images/premium/gallery/gallery-06.jpg", span: "" },
  { url: "/images/premium/gallery/gallery-07.jpg", span: "" },
  { url: "/images/premium/gallery/gallery-08.jpg", span: "" },
  { url: "/images/premium/gallery/gallery-09.jpg", span: "" },
];

export function PhotoGallery({ images }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Use DB images if provided and non-empty, else static fallback
  const items = images && images.length > 0
    ? images.map((img, i) => ({
        url:  img.url,
        alt:  img.caption ?? `Gallery image ${i + 1}`,
        span: i === 0 || i === 4 ? "row-span-2" : "",
      }))
    : STATIC_GALLERY.map((img, i) => ({
        url:  img.url,
        alt:  `Gallery image ${i + 1}`,
        span: img.span,
      }));

  return (
    <section id="gallery" className="bg-[#1c1713] px-6 py-[100px]">
      <div className="mx-auto max-w-[1280px]">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a8795b]">
            Gallery
          </p>
          <h2
            className="text-[clamp(32px,4vw,56px)] text-[#f7f3ee]"
            style={{ fontFamily: "var(--font-kapakana, 'Cormorant Garamond', serif)", fontStyle: "italic", fontWeight: 400 }}
          >
            A glimpse of our story
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-[#c9a97e]/40" />
            <div className="h-1 w-1 rotate-45 bg-[#c9a97e]/60" />
            <div className="h-px w-10 bg-[#c9a97e]/40" />
          </div>
        </div>

        {/* Masonry grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-2"
          style={{ gridAutoRows: "220px" }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={`relative overflow-hidden cursor-pointer group ${item.span}`}
              onClick={() => setLightbox(item.url)}
              style={{
                animation: "fadeIn 0.6s ease forwards",
                animationDelay: `${i * 0.06}s`,
                opacity: 0,
              }}
            >
              <Image
                src={item.url}
                alt={item.alt}
                fill
                className="object-cover object-center grayscale-[0.15] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-[11px] text-[#a8795b]/50 italic tracking-[0.05em]">
          More moments will be added after the celebration ✦
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full">
            <Image
              src={lightbox}
              alt="Gallery image"
              fill
              className="object-contain"
            />
          </div>
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}