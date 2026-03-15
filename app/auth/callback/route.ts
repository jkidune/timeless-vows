// FILE PATH: app/auth/callback/route.ts

import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// Safe internal paths that we allow redirecting to after auth
const ALLOWED_REDIRECT_PREFIXES = [
  "/dashboard",
  "/invitation",
  "/auth/login",
  "/auth/signup",
];

function isSafeRedirect(path: string): boolean {
  if (!path.startsWith("/")) return false; // block absolute URLs / protocol-relative
  if (path.startsWith("//"))  return false; // block protocol-relative URLs
  return ALLOWED_REDIRECT_PREFIXES.some((prefix) => path.startsWith(prefix));
}

export async function GET(request: Request) {
  const url  = new URL(request.url);
  const code = url.searchParams.get("code");
  const rawNext = url.searchParams.get("next") ?? "/dashboard";

  // Validate the redirect target — fall back to /dashboard if unsafe
  const next = isSafeRedirect(rawNext) ? rawNext : "/dashboard";

  if (code) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      // Code exchange failed — send to login with error hint
      return NextResponse.redirect(new URL("/auth/login?error=callback_failed", url.origin));
    }
  }

  return NextResponse.redirect(new URL(next, url.origin));
}