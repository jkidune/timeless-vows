"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/invitation") || pathname.startsWith("/dashboard") || pathname.startsWith("/auth")) return null;
  return <Navbar />;
}