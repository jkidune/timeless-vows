// FILE PATH: app/api/user/profile/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, phone } = await request.json();

  const updated = await prisma.user.update({
    where: { authId: user.id },
    data: {
      name:  name  || undefined,
      phone: phone || undefined,
    },
  });

  return NextResponse.json(updated);
}