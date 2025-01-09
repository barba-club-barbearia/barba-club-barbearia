import type { Metadata } from "next";
import { SessionProviderComponent } from "@/components/SessionProvider";
import { BarbershopProvider } from "@/contexts/BarberShop";
import { QueryClientProviderComponent } from "@/components/QueryClientProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
            <Header />
            <main>{children}</main>
            <Footer />
          </BarbershopProvider>
        </QueryClientProviderComponent>
      </SessionProviderComponent>
    </>
  );
}
