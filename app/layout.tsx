import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const forum = localFont({
  src: "./fonts/Forum-Regular.ttf",
  variable: "--font-forum",
  weight: "400",
});

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Saveurs Ramen — Ramen Artisanaux à Rennes",
  description: "Découvrez Saveurs Ramen, restaurant japonais à Rennes. Bouillons mijotés avec amour, ramen artisanaux, gyoza et tapas. 9 Rue de Châtillon, Gare Sud, Rennes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${forum.variable} ${satoshi.variable} font-[var(--font-satoshi)] antialiased bg-[#0a0b0a] text-[#efe7d2]`}
      >
        {children}
      </body>
    </html>
  );
}
