import React from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBarbershop } from "@/contexts/BarberShop";

const BarbershopStatus = () => {
  const { isOpen, toggleBarbershop, isAdmin } = useBarbershop();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-zinc-500" />
          <span className="text-sm text-zinc-400">Status</span>
        </div>
        <Button
          variant="ghost"
          onClick={isAdmin ? toggleBarbershop : undefined}
          className={`h-8 px-3 text-xs flex items-center gap-2 ${
            isOpen
              ? "bg-green-500/10 hover:bg-green-500/20 text-green-500 hover:text-green-500 "
              : "bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-500 "
          }`}
        >
          <span>{isOpen ? "Aberta" : "Fechada"}</span>
          {isOpen ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <XCircle className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default BarbershopStatus;
