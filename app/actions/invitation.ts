"use server";
// FILE PATH: app/actions/invitation.ts

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ── SUBMIT RSVP (called from public /invitation/rsvp page) ────────────

export async function submitRsvp(formData: {
  invitationSlug: string;
  primaryName: string;
  email: string;
  phone?: string;
  attendance: "ACCEPTED" | "DECLINED";
  guestCount: number;
  guests: Array<{
    firstName: string;
    lastName: string;
    meal: string;
    dietaryNotes: string;
  }>;
  songRequest?: string;
  specialNote?: string;
}) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug: formData.invitationSlug },
  });

  if (!invitation) return { error: "Invitation not found." };

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

// ── SUBMIT GIFT WISH (called from public invitation page) ─────────────

export async function submitGiftWish(formData: {
  invitationSlug: string;
  guestName: string;
  fromFamily?: string;
  wishType?: string;
  message: string;
}) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug: formData.invitationSlug },
  });

  if (!invitation) return { error: "Invitation not found." };

  await prisma.giftWish.create({
    data: {
      invitationId: invitation.id,
      guestName:    formData.guestName,
      fromFamily:   formData.fromFamily,
      wishType:     formData.wishType,
      message:      formData.message,
    },
  });

  revalidatePath("/dashboard/wishes");
  return { success: true };
}

// ── FETCH WISHES (for public page display) ────────────────────────────

export async function getPublicWishes(slug: string) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug },
  });
  if (!invitation) return [];

  return prisma.giftWish.findMany({
    where:   { invitationId: invitation.id, isApproved: true },
    orderBy: { submittedAt: "desc" },
    take:    20,
    select:  { guestName: true, fromFamily: true, wishType: true, message: true, submittedAt: true },
  });
}

// ── UPDATE INVITATION CONTENT ─────────────────────────────────────────

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
  await prisma.invitation.update({
    where: { id: invitationId },
    data,
  });
  revalidatePath("/dashboard/invitation");
  revalidatePath("/dashboard");
  return { success: true };
}

// ── TOGGLE WISH APPROVAL ──────────────────────────────────────────────

export async function toggleWishApproval(wishId: string, approved: boolean) {
  await prisma.giftWish.update({
    where: { id: wishId },
    data:  { isApproved: approved },
  });
  revalidatePath("/dashboard/wishes");
  return { success: true };
}

// ── DELETE RSVP ───────────────────────────────────────────────────────

export async function deleteRsvp(rsvpId: string) {
  await prisma.rsvpResponse.delete({ where: { id: rsvpId } });
  revalidatePath("/dashboard/rsvps");
  return { success: true };
}