"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/invitation")) return null;
  return <Navbar />;
}