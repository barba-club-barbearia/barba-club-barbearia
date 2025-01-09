"use client";
import { Clock, Menu, Scissors, X } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useBarbershop } from "@/contexts/BarberShop";
import { Badge } from "../ui/badge";
import { MenuSection } from "../MenuSection";

export const Header = () => {
  const { isOpen, toggleBarbershop, isAdmin } = useBarbershop();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="border-b border-amber-900/20 sticky top-0 bg-[#0f0f0f]/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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

            {/* Status da Barbearia */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-zinc-500" />
                <h3 className="text-sm font-medium text-zinc-400">
                  Status da Barbearia
                </h3>
              </div>
              <Badge
                variant="outline"
                className={`w-full justify-center py-3 ${
                  isOpen
                    ? "text-green-400 border-green-400/50 bg-green-500/5"
                    : "text-red-400 border-red-400/50 bg-red-500/5"
                }`}
              >
                {isOpen ? "Aberta" : "Fechada"}
              </Badge>

              {/* Botão para admin */}
              {isAdmin && (
                <Button
                  onClick={() => {
                    toggleBarbershop();
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full bg-amber-500/10 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                >
                  {isOpen ? "Fechar Barbearia" : "Abrir Barbearia"}
                </Button>
              )}
            </div>

            {/* Menu Sections */}
            <MenuSection />
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
