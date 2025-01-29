"use client";
import React from "react";
import { Home, Scissors, Heart, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const AppLayout = ({ children }: any) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-zinc-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-amber-500 p-2 rounded-lg">
            <Scissors className="h-5 w-5 text-black" />
          </div>
          <div>
            <h1 className="text-white text-sm font-medium">Barba Club</h1>
            <p className="text-zinc-400 text-xs">Barbearia Premium</p>
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      {/* Bottom Navigation */}
      <div className="border-t border-zinc-800 bg-zinc-950/95 backdrop-blur fixed bottom-0 w-full mt-3">
        <nav className="flex justify-around p-4 max-w-md mx-auto">
          <NavItem
            href="/"
            icon={<Home className="w-5 h-5" />}
            label="Início"
            isActive={pathname === "/"}
          />
          <NavItem
            href="/barbeiros"
            icon={<Scissors className="w-5 h-5" />}
            label="Barbeiros"
            isActive={pathname === "/barbeiros"}
          />
          <NavItem
            href="/cortes"
            icon={<Heart className="w-5 h-5" />}
            label="Cortes"
            isActive={pathname === "/cortes"}
          />
          <NavItem
            href="/configuracoes"
            icon={<UserCircle className="w-5 h-5" />}
            label="Configurações"
            isActive={pathname === "/configuracoes"}
          />
        </nav>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, href, isActive = false }: any) => (
  <Link href={href} className="flex flex-col items-center gap-1">
    <div
      className={cn("text-2xl", isActive ? "text-amber-500" : "text-zinc-400")}
    >
      {icon}
    </div>
    <span
      className={cn("text-xs", isActive ? "text-amber-500" : "text-zinc-400")}
    >
      {label}
    </span>
  </Link>
);

export default AppLayout;
