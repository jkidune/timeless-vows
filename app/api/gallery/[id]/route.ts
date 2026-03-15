// FILE PATH: app/api/gallery/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Find image + its invitation ownership in one query
  const image = await prisma.galleryImage.findUnique({
    where:   { id: params.id },
    include: { invitation: { select: { ownerId: true, plannerId: true } } },
  });

  if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const dbUser = await prisma.user.findUnique({ where: { authId: user.id } });
  if (!dbUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const canDelete =
    dbUser.role === "ADMIN" ||
    image.invitation.ownerId   === dbUser.id ||
    image.invitation.plannerId === dbUser.id;

  if (!canDelete) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.galleryImage.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}