import Link from "next/link";
import { usePathname } from "next/navigation";

import { Home, Scissors, Heart, UserCircle } from "lucide-react";

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

export const NavBar = () => {
  const pathname = usePathname();

  return (
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
  );
};
