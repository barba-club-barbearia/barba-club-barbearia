import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import RegisterSW from "@/components/ServiceWorker";

const workSans = Work_Sans({ subsets: ["latin"] });

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
        <body className={`${workSans.className} antialiased`}>{children}</body>
      </Suspense>
    </html>
  );
}
