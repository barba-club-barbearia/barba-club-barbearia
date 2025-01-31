import React from "react";
import { Clock, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useBarbershop } from "@/contexts/BarberShop";
import { useUserStore } from "@/store/useUser";

const BarbershopStatus = () => {
  const { isOpen, handleBarberStatus, isLoading } = useBarbershop();
  const isAdmin = useUserStore((s) => s.user?.isAdmin);

  const handleOnClick = async () => {
    try {
      handleBarberStatus();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-t border-zinc-800">
      <div className="flex items-center gap-2 text-white">
        <Clock className="h-5 w-5" />
        <span>Barbearia</span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`h-6 w-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen
              ? "bg-green-500/10 hover:bg-green-500/20 text-green-500 hover:text-green-500"
              : "bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-500"
          }`}
        >
          <span className="text-xs">{isOpen ? "Aberta" : "Fechada"}</span>
        </div>
        {isAdmin && (
          <Switch
            checked={isOpen}
            onCheckedChange={handleOnClick}
            disabled={isLoading}
            className="data-[state=checked]:bg-orange-500"
          />
        )}
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-white" />}
      </div>
    </div>
  );
};

export default BarbershopStatus;
