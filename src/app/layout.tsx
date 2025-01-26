import { Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import RegisterSW from "@/components/ServiceWorker";

import "./globals.css";

const workSans = localFont({
  src: "./fonts/WorkSans.ttf",
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
  other: {
    "Cache-Control": "public, max-age=3600, must-revalidate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Adicione suas tags no head diretamente */}
        <link
          rel="preconnect"
          href={process.env.NEXT_PUBLIC_BASE_URL_WEB_SOCKET}
        />
        <link
          rel="dns-prefetch"
          href={process.env.NEXT_PUBLIC_BASE_URL_WEB_SOCKET}
        />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_BASE_URL} />
        <link
          rel="dns-prefetch"
          href={process.env.NEXT_PUBLIC_BASE_URL_WEB_SOCKET}
        />
      </head>
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
