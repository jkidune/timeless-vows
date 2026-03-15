"use server";
// FILE PATH: app/actions/admin.ts

import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./auth";

// ── Guard — only admins can call these ───────────────────────────────

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required");
  }
  return user;
}

// ── CREATE CLIENT ACCOUNT ─────────────────────────────────────────────
// Creates a Supabase auth user + our DB user record for a new couple/planner

export async function createClientAccount(data: {
  name: string;
  email: string;
  role: "COUPLE" | "PLANNER";
  phone?: string;
}) {
  await requireAdmin();
  const supabase = createAdminClient();

  // Generate a temporary password — client will reset via email
  const tempPassword = `TV-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

  // Create Supabase auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email:          data.email,
    password:       tempPassword,
    email_confirm:  true, // skip email confirmation
    user_metadata:  { name: data.name, role: data.role },
  });

  if (authError || !authData.user) {
    return { error: authError?.message ?? "Failed to create user" };
  }

  // Create our DB user record (trigger may have already created it)
  const dbUser = await prisma.user.upsert({
    where:  { authId: authData.user.id },
    create: {
      authId: authData.user.id,
      email:  data.email,
      name:   data.name,
      role:   data.role,
      phone:  data.phone,
    },
    update: {
      name:  data.name,
      role:  data.role,
      phone: data.phone,
    },
  });

  // Send password reset so client can set their own password
  await supabase.auth.admin.generateLink({
    type:  "recovery",
    email: data.email,
    options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback` },
  });

  revalidatePath("/dashboard/admin/clients");
  revalidatePath("/dashboard/admin/users");

  return { success: true, user: dbUser, tempPassword };
}

// ── CREATE INVITATION ─────────────────────────────────────────────────

export async function createInvitation(data: {
  slug: string;
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  venue?: string;
  venueAddress?: string;
  template: "STANDARD" | "PREMIUM";
  ownerId: string;
  plannerId?: string;
}) {
  await requireAdmin();

  // Check slug is unique
  const existing = await prisma.invitation.findUnique({ where: { slug: data.slug } });
  if (existing) return { error: "This slug is already taken. Choose another." };

  const invitation = await prisma.invitation.create({
    data: {
      slug:         data.slug,
      partner1Name: data.partner1Name,
      partner2Name: data.partner2Name,
      weddingDate:  new Date(data.weddingDate),
      venue:        data.venue,
      venueAddress: data.venueAddress,
      template:     data.template,
      ownerId:      data.ownerId,
      plannerId:    data.plannerId,
      status:       "DRAFT",
    },
  });

  revalidatePath("/dashboard/admin/invitations");
  revalidatePath("/dashboard/admin/clients");
  return { success: true, invitation };
}

// ── UPDATE INVITATION STATUS ──────────────────────────────────────────

export async function setInvitationStatus(
  invitationId: string,
  status: "DRAFT" | "ACTIVE" | "EXPIRED" | "SUSPENDED"
) {
  await requireAdmin();
  await prisma.invitation.update({ where: { id: invitationId }, data: { status } });
  revalidatePath("/dashboard/admin/invitations");
  return { success: true };
}

// ── DELETE INVITATION ─────────────────────────────────────────────────

export async function deleteInvitation(invitationId: string) {
  await requireAdmin();
  await prisma.invitation.delete({ where: { id: invitationId } });
  revalidatePath("/dashboard/admin/invitations");
  return { success: true };
}

// ── UPDATE USER ROLE ──────────────────────────────────────────────────

export async function updateUserRole(userId: string, role: "ADMIN" | "PLANNER" | "COUPLE") {
  await requireAdmin();
  await prisma.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/dashboard/admin/users");
  return { success: true };
}

// ── GET PLATFORM STATS ────────────────────────────────────────────────

export async function getPlatformStats() {
  await requireAdmin();
  const [users, invitations, rsvps, wishes, active] = await Promise.all([
    prisma.user.count(),
    prisma.invitation.count(),
    prisma.rsvpResponse.count(),
    prisma.giftWish.count(),
    prisma.invitation.count({ where: { status: "ACTIVE" } }),
  ]);
  return { users, invitations, rsvps, wishes, active };
}