"use server";
// FILE PATH: app/actions/auth.ts

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// ── SIGN UP ───────────────────────────────────────────────────────────

export async function signUp(formData: FormData) {
  const supabase = createServerSupabaseClient();

  const email    = formData.get("email")    as string;
  const password = formData.get("password") as string;
  const name     = formData.get("name")     as string;
  const role     = (formData.get("role") as string) || "COUPLE";

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, role }, // passed to the trigger that creates the user record
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // If email confirmation is disabled in Supabase, user is immediately active
  if (data.user && data.session) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  // Email confirmation required — tell the user
  return { success: "Check your email to confirm your account." };
}

// ── SIGN IN ───────────────────────────────────────────────────────────

export async function signIn(formData: FormData) {
  const supabase = createServerSupabaseClient();

  const email    = formData.get("email")      as string;
  const password = formData.get("password")   as string;
  const redirect_to = formData.get("redirectTo") as string | null;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect(redirect_to || "/dashboard");
}

// ── SIGN OUT ──────────────────────────────────────────────────────────

export async function signOut() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/auth/login");
}

// ── GET CURRENT USER (with role from our DB) ──────────────────────────

export async function getCurrentUser() {
  const supabase = createServerSupabaseClient();

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  // Get the extended user profile from our database
  const dbUser = await prisma.user.findUnique({
    where: { authId: user.id },
  });

  return dbUser;
}

// ── AUTH CALLBACK (email confirmation redirect) ───────────────────────
// This is handled by app/auth/callback/route.ts below