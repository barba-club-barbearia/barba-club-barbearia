import { Suspense } from "react";

import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { BarbershopProvider } from "@/contexts/BarberShop";

import { QueryClientProviderComponent } from "@/components/QueryClientProvider";
import { SessionProviderComponent } from "@/components/SessionProvider";
import { AppStart } from "@/components/AppStart";

import { authOptions } from "@/settings/authOptions";

import { getBarberStatus } from "@/services/api";

import Loading from "../loading";
import AppLayout from "@/components/AppLayout";

export const metadata: Metadata = {
  title: "Barba Club",
  description: "Fila para cortar o Cabelo no Barba Club.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
  },
};

export const dynamic = "force-dynamic";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isOpen = await getBarberStatus();
  const session = await getServerSession(authOptions);

  return (
    <Suspense fallback={<Loading />}>
      <SessionProviderComponent>
        <QueryClientProviderComponent>
          <BarbershopProvider initialStatus={isOpen}>
            <AppStart user={session?.user} />
            <AppLayout>{children}</AppLayout>
          </BarbershopProvider>
        </QueryClientProviderComponent>
      </SessionProviderComponent>
    </Suspense>
  );
}
