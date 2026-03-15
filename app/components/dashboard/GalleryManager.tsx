"use client";
// FILE PATH: app/components/dashboard/GalleryManager.tsx

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Trash2, Loader2, ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { prisma } from "@/lib/prisma";
import type { GalleryImage } from "@prisma/client";

interface Props {
  invitationId: string;
  images: GalleryImage[];
}

export function GalleryManager({ invitationId, images: initial }: Props) {
  const [images,    setImages]    = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [deleting,  setDeleting]  = useState<string | null>(null);
  const [error,     setError]     = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setUploading(true);
    setError("");
    const supabase = createClient();

    for (const file of files) {
      // Validate
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} is too large. Max 5MB per image.`);
        continue;
      }

      const ext      = file.name.split(".").pop();
      const filename = `${invitationId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      // Upload to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(filename, file, { cacheControl: "3600", upsert: false });

      if (uploadError || !data) {
        setError(`Failed to upload ${file.name}: ${uploadError?.message}`);
        continue;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("gallery-images")
        .getPublicUrl(data.path);

      // Save to database via API route
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitationId,
          url:       publicUrl,
          sortOrder: images.length,
        }),
      });

      if (res.ok) {
        const newImage = await res.json();
        setImages((prev) => [...prev, newImage]);
      }
    }

    setUploading(false);
    // Reset file input
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = async (image: GalleryImage) => {
    if (!confirm("Remove this image from your gallery?")) return;
    setDeleting(image.id);
    const supabase = createClient();

    // Extract path from URL
    const path = image.url.split("/gallery-images/")[1];
    if (path) {
      await supabase.storage.from("gallery-images").remove([path]);
    }

    await fetch(`/api/gallery/${image.id}`, { method: "DELETE" });
    setImages((prev) => prev.filter((i) => i.id !== image.id));
    setDeleting(null);
  };

  return (
    <div>
      {/* Upload area */}
      <div
        className="border-2 border-dashed border-[#c9a97e]/30 bg-white p-10 text-center mb-6 cursor-pointer hover:border-[#a8795b]/50 hover:bg-[#f7f3ee]/50 transition-all duration-300 group"
        onClick={() => fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={28} className="text-[#a8795b] animate-spin" />
            <p className="text-[13px] text-[#b9927a] italic">Uploading…</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload size={24} className="text-[#c9a97e]/40 group-hover:text-[#a8795b] transition-colors" />
            <p className="text-[14px] font-medium text-[#482612]">
              Click to upload images
            </p>
            <p className="text-[11px] text-[#b9927a]">
              JPG, PNG, WebP · Max 5MB each · Multiple allowed
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="mb-4 text-[12px] text-red-500/80 italic px-1">{error}</p>
      )}

      {/* Image grid */}
      {images.length === 0 ? (
        <div className="bg-white border border-[#c9a97e]/18 p-12 text-center">
          <ImageIcon size={28} className="text-[#c9a97e]/30 mx-auto mb-3" />
          <p className="text-[14px] italic text-[#b9927a]" style={{ fontFamily: "'Cormorant Garamond',serif" }}>
            No gallery images yet
          </p>
          <p className="text-[11px] text-[#c9a97e]/50 mt-1">
            Upload your first photos above
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square bg-[#f7f3ee] border border-[#c9a97e]/15 overflow-hidden"
            >
              <Image
                src={img.url}
                alt={img.caption ?? "Gallery image"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img)}
                  disabled={deleting === img.id}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-red-500/80 hover:bg-red-500 text-white"
                  title="Delete image"
                >
                  {deleting === img.id
                    ? <Loader2 size={14} className="animate-spin" />
                    : <Trash2 size={14} />
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}