import React from "react";
import { Loader2, Scissors } from "lucide-react";
import { useBarbershop } from "@/contexts/BarberShop";
import { useUserStore } from "@/store/useUser";

const Header = () => {
  const { isOpen, isLoading, handleBarberStatus } = useBarbershop();
  const isAdmin = useUserStore((s) => s.user?.isAdmin);

  const toggleStatus = () => {
    if (isAdmin) {
      handleBarberStatus();
    }
  };

  return (
    <header className="flex items-center justify-between gap-2 p-4 bg-black border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <div className="bg-[#F5A524] rounded-lg p-2">
          <Scissors className="h-5 w-5 text-black" />
        </div>
        <div>
          <h1 className="font-medium text-white">Barba Club</h1>
          <p className="text-sm text-zinc-400">Barbearia Premium</p>
        </div>
      </div>

      <button
        onClick={toggleStatus}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors min-w-[72px] h-7 flex items-center justify-center
          ${
            isOpen
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }
          ${!isAdmin && "cursor-default opacity-80"}`}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isOpen ? (
          "Aberta"
        ) : (
          "Fechada"
        )}
      </button>
    </header>
  );
};

export default Header;
