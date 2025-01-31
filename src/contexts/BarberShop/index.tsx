"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useQueueSocket } from "@/hooks/useQueueSocket";
import { QueueItem } from "@/app/types";

interface BarbershopContextData {
  queue: QueueItem[] | null;
  isLoading: boolean;
  isOpen: boolean;
  handleBarberStatus: () => void;
  removeFromQueue: (id: string) => void;
  addToQueue: (userId: string) => void;
}

interface BarberShopProviderProps {
  children: ReactNode;
  initialStatus: boolean;
  initialQueue: QueueItem[] | null;
  barberId?: string;
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

export const BarbershopProvider = ({
  children,
  initialStatus,
  initialQueue,
  barberId,
}: BarberShopProviderProps) => {
  const {
    handleBarberStatus,
    removeFromQueue,
    addToQueue,
    isOpen,
    queue,
    isLoading,
  } = useQueueSocket({ initialQueue, initialStatus, barberId });

  return (
    <BarbershopContext.Provider
      value={{
        handleBarberStatus,
        removeFromQueue,
        addToQueue,
        isLoading,
        isOpen,
        queue,
      }}
    >
      {children}
    </BarbershopContext.Provider>
  );
};
