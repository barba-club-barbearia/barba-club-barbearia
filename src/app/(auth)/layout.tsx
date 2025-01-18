import type { Metadata } from "next";
import { SessionProviderComponent } from "@/components/SessionProvider";
import { BarbershopProvider } from "@/contexts/BarberShop";
import { QueryClientProviderComponent } from "@/components/QueryClientProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AppStart } from "@/components/AppStart";

export const metadata: Metadata = {
  title: "Barba Club",
  description: "Fila para cortar o Cabelo no Barba Club.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProviderComponent>
        <QueryClientProviderComponent>
          <BarbershopProvider>
            <AppStart />
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <Footer />
          </BarbershopProvider>
        </QueryClientProviderComponent>
      </SessionProviderComponent>
    </>
  );
}
