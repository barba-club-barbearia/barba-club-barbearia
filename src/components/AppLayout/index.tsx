"use client";

import React from "react";
import { Home, Scissors, Heart, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <header className="flex items-center gap-2 p-4 bg-black border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="bg-[#F5A524] rounded-lg p-2">
            <Scissors className="h-5 w-5 text-black" />
          </div>
          <div>
            <h1 className="font-medium text-white">Barba Club</h1>
            <p className="text-sm text-zinc-400">Barbearia Premium</p>
          </div>
        </div>
      </header>

      {/* Main Content - Now uses absolute positioning to fill remaining space */}
      <main className="absolute top-[73px] bottom-[64px] left-0 right-0 overflow-y-auto">
        <div className="h-full">{children}</div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-zinc-800">
        <div className="flex items-center justify-around">
          <NavItem
            href="/"
            icon={<Home className="h-5 w-5" />}
            label="Início"
            isActive={pathname === "/"}
          />
          <NavItem
            href="/barbeiros"
            icon={<Scissors className="h-5 w-5" />}
            label="Barbeiros"
            isActive={pathname === "/barbeiros"}
          />
          <NavItem
            href="/cortes"
            icon={<Heart className="h-5 w-5" />}
            label="Cortes"
            isActive={pathname === "/cortes"}
          />
          <NavItem
            href="/configuracoes"
            icon={<UserCircle className="h-5 w-5" />}
            label="Configurações"
            isActive={pathname === "/configuracoes"}
          />
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  href,
  isActive = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}) => (
  <Link href={href}>
    <div className="flex flex-col items-center gap-1 py-3 px-4">
      <div className={`${isActive ? "text-[#F5A524]" : "text-zinc-400"}`}>
        {icon}
      </div>
      <span
        className={`text-xs ${isActive ? "text-[#F5A524]" : "text-zinc-400"}`}
      >
        {label}
      </span>
    </div>
  </Link>
);

export default AppLayout;
