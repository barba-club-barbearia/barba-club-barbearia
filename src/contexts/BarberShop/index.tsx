"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBarberStatus, setBarberStatus } from "@/services/api";

interface BarbershopContextData {
  isOpen: boolean;
  toggleBarbershop: () => Promise<void>;
}

const BarbershopContext = createContext<BarbershopContextData | undefined>(
  undefined
);

export const useBarbershop = (): BarbershopContextData => {
  const context = useContext(BarbershopContext);
  if (!context) {
    throw new Error("useBarbershop must be used within a BarbershopProvider");
  }
  return context;
};

export const BarbershopProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: isOpen = null } = useQuery({
    queryKey: ["barbershopStatus"],
    queryFn: async () => {
      const result = await getBarberStatus();
      return result.is_open;
    },
    staleTime: 15 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000, // 15 minutos
    refetchOnWindowFocus: false,
  });

  const toggleOpenMutation = useMutation({
    mutationFn: async () => {
      const result = await setBarberStatus();
      return result.is_open;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbershopStatus"] });
    },
  });

  const toggleBarbershop = async () => {
    await toggleOpenMutation.mutateAsync();
  };

  return (
    <BarbershopContext.Provider
      value={{
        isOpen,
        toggleBarbershop,
      }}
    >
      {children}
    </BarbershopContext.Provider>
  );
};
