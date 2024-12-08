import type { Metadata } from "next";

import { Work_Sans } from "next/font/google";

import "./globals.css";
import { Suspense } from "react";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barba Club Barbearia",
  description: "Barbearia localizada em Anchieta, responsável Welligton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense>
        <body className={`${workSans.className} antialiased`}>{children}</body>
      </Suspense>
    </html>
  );
}
