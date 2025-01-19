import React, { useState } from "react";
import { Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBarbershop } from "@/contexts/BarberShop";
import { useUserStore } from "@/store/useUser";

const BarbershopStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, toggleBarbershop } = useBarbershop();
  const isAdmin = useUserStore((s) => s.user?.isAdmin);

  const handleOnClick = async () => {
    setIsLoading(true);
    try {
      await toggleBarbershop();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-zinc-500" />
          <span className="text-sm text-zinc-400">Status</span>
        </div>
        <Button
          variant="ghost"
          onClick={isAdmin ? handleOnClick : undefined}
          className={`h-8 px-3 text-xs flex items-center transition-all duration-300 ease-in-out w-[100px] justify-center ${
            isOpen
              ? "bg-green-500/10 hover:bg-green-500/20 text-green-500 hover:text-green-500"
              : "bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-500"
          }`}
        >
          <div className="relative w-full flex justify-center items-center">
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>

            <div
              className={`flex items-center justify-center gap-2 w-full transition-opacity duration-300 ${
                isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <span className="w-12 text-center">
                {isOpen ? "Aberta" : "Fechada"}
              </span>
              {isOpen ? (
                <CheckCircle className="h-3 w-3 flex-shrink-0" />
              ) : (
                <XCircle className="h-3 w-3 flex-shrink-0" />
              )}
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default BarbershopStatus;
