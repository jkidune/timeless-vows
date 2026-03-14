"use client";

import Image from "next/image";
import { useState } from "react";

/*
  ─── IMAGE NAMING GUIDE ────────────────────────────────────────────────
  PLACE ALL GALLERY IMAGES AT: /public/images/premium/gallery/

  Name them exactly as follows:
    gallery-01.jpg  → Hero couple portrait (tall/portrait crop)
    gallery-02.jpg  → Ceremony moment or floral arch
    gallery-03.jpg  → Close-up detail (rings, flowers, etc.)
    gallery-04.jpg  → Wide ceremony shot
    gallery-05.jpg  → Couple laughing / candid
    gallery-06.jpg  → Hands / ring detail
    gallery-07.jpg  → Getting ready or behind-the-scenes
    gallery-08.jpg  → Family or guests moment
    gallery-09.jpg  → Romantic portrait
    gallery-10.jpg  → Reception / venue detail
    gallery-11.jpg  → Dance floor / celebration
    gallery-12.jpg  → Final sunset or farewell shot

  Recommended sizes:
    Tall (portrait) images: 600×900px
    Wide (landscape) images: 900×600px
    Square: 600×600px
  
  All should be JPG, max 300KB each (compress with squoosh.app)
  ───────────────────────────────────────────────────────────────────────
  
  PLACEHOLDER IMAGES BELOW use picsum.photos until you upload your own.
  Each has a unique seed so they look different.
*/

const GALLERY_ITEMS = [
  { src: "/images/premium/gallery/gallery-01.jpg", alt: "Couple portrait", span: "row-span-2" },
  { src: "/images/premium/gallery/gallery-02.jpg", alt: "Ceremony arch", span: "" },
  { src: "/images/premium/gallery/gallery-03.jpg", alt: "Ring detail", span: "" },
  { src: "/images/premium/gallery/gallery-04.jpg", alt: "Wide ceremony", span: "" },
  { src: "/images/premium/gallery/gallery-05.jpg", alt: "Couple laughing", span: "row-span-2" },
  { src: "/images/premium/gallery/gallery-06.jpg", alt: "Hands detail", span: "" },
  { src: "/images/premium/gallery/gallery-07.jpg", alt: "Getting ready", span: "" },
  { src: "/images/premium/gallery/gallery-08.jpg", alt: "Family moment", span: "" },
  { src: "/images/premium/gallery/gallery-09.jpg", alt: "Romantic portrait", span: "" },
];

// When you have real images, swap to local paths:
// const GALLERY_ITEMS = [
//   { src: "/images/premium/gallery/gallery-01.jpg", alt: "...", span: "row-span-2" },
//   ...
// ];

export function PhotoGallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

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

        {/* Masonry grid — CSS grid with row spans */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-2"
          style={{ gridAutoRows: "220px" }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`relative overflow-hidden cursor-pointer group ${item.span}`}
              onClick={() => setLightbox(item.src)}
              style={{
                animation: "fadeIn 0.6s ease forwards",
                animationDelay: `${i * 0.06}s`,
                opacity: 0,
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover object-center grayscale-[0.15] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* Note about gallery */}
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