import { Suspense } from "react";

import type { Metadata } from "next";
import localFont from "next/font/local";
import RegisterSW from "@/components/ServiceWorker";

import "./globals.css";

const workSans = localFont({
  src: "./fonts/WorkSans-Regular.ttf",
  variable: "--font-work-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Barba Club",
  description: "Fila para cortar o Cabelo no Barba Club.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Suspense>
        <RegisterSW />
        <body
          className={`${workSans.className} antialiased min-h-screen bg-[#1a1a1a] text-zinc-100`}
        >
          {children}
        </body>
      </Suspense>
    </html>
  );
}
