"use client";
import { Menu, Scissors, X } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { MenuSection } from "../MenuSection";
import { useRouter } from "next/navigation";
import BarbershopStatus from "./BarberShopStatus";
import NotificationToggle from "./Toggle";

export const Header = () => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="border-b border-amber-900/20 sticky top-0 bg-[#0f0f0f]/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="bg-amber-500 p-2 rounded-lg">
                <Scissors className="h-6 w-6 md:h-8 md:w-8 text-black" />
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-amber-500">
                  Barba Club
                </h1>
                <p className="text-xs md:text-sm text-zinc-400">
                  Barbearia Premium
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              className="text-amber-500 hover:text-amber-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-[#0f0f0f] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Menu Header */}
          <div className="border-b border-amber-900/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 p-1.5 rounded">
                  <Scissors className="h-5 w-5 text-black" />
                </div>
                <span className="text-amber-500 font-semibold">Menu</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-zinc-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="h-px bg-amber-900/20 my-2" />

            <div className="pt-4 mb-4">
              {/* Status da Barbearia */}
              <BarbershopStatus />
            </div>
            {/* Notificações */}
            <div className="space-y-4 mb-6">
              <NotificationToggle />
            </div>

            <div className="h-px bg-amber-900/20 my-2" />

            {/* Menu Sections */}
            <MenuSection onClickLink={() => setIsMenuOpen(false)} />
          </div>

          {/* Menu Footer */}
          <div className="mt-auto border-t border-amber-900/20 p-6">
            <Button
              variant="ghost"
              className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={() => signOut({ callbackUrl: "/entrar" })}
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-40`}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
};
