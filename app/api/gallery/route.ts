// FILE PATH: app/api/gallery/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { invitationId, url, sortOrder } = await request.json();

  const image = await prisma.galleryImage.create({
    data: { invitationId, url, sortOrder: sortOrder ?? 0 },
  });

  return NextResponse.json(image);
}