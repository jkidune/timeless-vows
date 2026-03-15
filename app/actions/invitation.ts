"use server";
// FILE PATH: app/actions/invitation.ts

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./auth";

// ── Ownership guard ────────────────────────────────────────────────────
// Returns the invitation only if the current user owns/plans it (or is admin)

async function getOwnedInvitation(invitationId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
  });
  if (!invitation) throw new Error("Invitation not found");

  const canAccess =
    user.role === "ADMIN" ||
    invitation.ownerId   === user.id ||
    invitation.plannerId === user.id;

  if (!canAccess) throw new Error("Forbidden");
  return invitation;
}

// ── SUBMIT RSVP (public — no auth required) ───────────────────────────
// Rate limiting should be added here before production launch

export async function submitRsvp(formData: {
  invitationSlug: string;
  primaryName: string;
  email: string;
  phone?: string;
  attendance: "ACCEPTED" | "DECLINED";
  guestCount: number;
  guests: Array<{ firstName: string; lastName: string; meal: string; dietaryNotes: string }>;
  songRequest?: string;
  specialNote?: string;
}) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug: formData.invitationSlug, status: "ACTIVE" },
  });
  if (!invitation) return { error: "Invitation not found or not active." };

  // Prevent duplicate RSVPs from same email
  const existing = await prisma.rsvpResponse.findFirst({
    where: { invitationId: invitation.id, email: formData.email },
  });
  if (existing) return { error: "An RSVP has already been submitted for this email." };

  await prisma.rsvpResponse.create({
    data: {
      invitationId: invitation.id,
      primaryName:  formData.primaryName,
      email:        formData.email,
      phone:        formData.phone,
      attendance:   formData.attendance,
      guestCount:   formData.guestCount,
      guestsJson:   formData.guests,
      songRequest:  formData.songRequest,
      specialNote:  formData.specialNote,
    },
  });

  revalidatePath("/dashboard/rsvps");
  return { success: true };
}

// ── SUBMIT GIFT WISH (public — no auth required) ──────────────────────

export async function submitGiftWish(formData: {
  invitationSlug: string;
  guestName: string;
  fromFamily?: string;
  wishType?: string;
  message: string;
}) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug: formData.invitationSlug, status: "ACTIVE" },
  });
  if (!invitation) return { error: "Invitation not found or not active." };

  // Sanitise input lengths
  if (formData.message.length > 1000) return { error: "Message too long (max 1000 characters)." };
  if (formData.guestName.length > 100) return { error: "Name too long." };

  await prisma.giftWish.create({
    data: {
      invitationId: invitation.id,
      guestName:    formData.guestName.trim(),
      fromFamily:   formData.fromFamily?.trim(),
      wishType:     formData.wishType,
      message:      formData.message.trim(),
    },
  });

  revalidatePath("/dashboard/wishes");
  return { success: true };
}

// ── FETCH PUBLIC WISHES ───────────────────────────────────────────────

export async function getPublicWishes(slug: string) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug, status: "ACTIVE" },
  });
  if (!invitation) return [];

  return prisma.giftWish.findMany({
    where:   { invitationId: invitation.id, isApproved: true },
    orderBy: { submittedAt: "desc" },
    take:    20,
    select:  { guestName: true, fromFamily: true, wishType: true, message: true, submittedAt: true },
  });
}

// ── UPDATE INVITATION CONTENT (authenticated, ownership checked) ───────

export async function updateInvitation(
  invitationId: string,
  data: Partial<{
    partner1Name: string;
    partner2Name: string;
    weddingDate: Date;
    venue: string;
    venueAddress: string;
    mapsLink: string;
    storyText: string;
    inviteText: string;
    mobileMoneyLabel: string;
    mobileMoneyName: string;
    mobileMoneyNumber: string;
    bankName: string;
    bankAccountName: string;
    bankAccountNumber: string;
    bankBranch: string;
    rsvpDeadline: Date;
    status: "DRAFT" | "ACTIVE" | "EXPIRED" | "SUSPENDED";
  }>
) {
  // Ownership verified here — throws if not authorised
  await getOwnedInvitation(invitationId);

  await prisma.invitation.update({ where: { id: invitationId }, data });

  revalidatePath("/dashboard/invitation");
  revalidatePath("/dashboard");
  return { success: true };
}

// ── TOGGLE WISH APPROVAL (authenticated, ownership checked) ───────────

export async function toggleWishApproval(wishId: string, approved: boolean) {
  const wish = await prisma.giftWish.findUnique({
    where: { id: wishId },
    select: { invitationId: true },
  });
  if (!wish) throw new Error("Wish not found");

  // This will throw if user doesn't own the invitation
  await getOwnedInvitation(wish.invitationId);

  await prisma.giftWish.update({ where: { id: wishId }, data: { isApproved: approved } });
  revalidatePath("/dashboard/wishes");
  return { success: true };
}

// ── DELETE RSVP (authenticated, ownership checked) ────────────────────

export async function deleteRsvp(rsvpId: string) {
  const rsvp = await prisma.rsvpResponse.findUnique({
    where: { id: rsvpId },
    select: { invitationId: true },
  });
  if (!rsvp) throw new Error("RSVP not found");

  // This will throw if user doesn't own the invitation
  await getOwnedInvitation(rsvp.invitationId);

  await prisma.rsvpResponse.delete({ where: { id: rsvpId } });
  revalidatePath("/dashboard/rsvps");
  return { success: true };
}