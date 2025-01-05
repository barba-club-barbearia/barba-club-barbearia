import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import RegisterSW from "@/components/ServiceWorker";
import IsAdmin from "@/components/IsAdmin";
import { SessionProviderComponent } from "@/components/SessionProvider";
const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barba Club",
  description: "Fila para cortar o Cabelo no Barba Club.",
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
      <head>
        <IsAdmin />
      </head>
      <Suspense>
        <RegisterSW />
        <body className={`${workSans.className} antialiased`}>
          <SessionProviderComponent>{children}</SessionProviderComponent>
        </body>
      </Suspense>
    </html>
  );
}
