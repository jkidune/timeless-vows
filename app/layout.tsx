import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Cormorant_Garamond, Jost } from "next/font/google";
import localFont from "next/font/local";
import { ConditionalNavbar } from "./components/Conditionalnavbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const kapakana = localFont({
  src: "../public/fonts/Kapakana-VariableFont_wght.woff2",
  variable: "--font-kapakana",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Timeless Vows | Premium Digital Wedding Invitations",
  description: "Create beautiful, personalized digital wedding invitations in minutes.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${jost.variable} ${kapakana.variable} antialiased font-sans`}
      >
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}
