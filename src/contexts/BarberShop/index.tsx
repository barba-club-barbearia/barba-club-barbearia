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

  const { data: isOpen = false } = useQuery({
    queryKey: ["barbershopStatus"],
    queryFn: async () => {
      const { data } = await getBarberStatus();
      return data?.is_open;
    },
    staleTime: 30000,
    refetchInterval: (data) => (data ? 5000 : 30000),
  });

  const toggleOpenMutation = useMutation({
    mutationFn: async () => {
      const res = await setBarberStatus();
      return res.json();
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
