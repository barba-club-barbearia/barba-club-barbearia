/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QueueItem } from "@/app/types";
import { useSession } from "next-auth/react";

interface BarbershopContextData {
  isOpen: boolean;
  toggleBarbershop: () => void;
  queue?: QueueItem[];
  addToQueue: () => void;
  removeFromQueue: (id: string) => void;
  isAdmin: boolean;
  user: any;
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
      const res = await fetch("/api/open");
      const data = await res.json();
      return data?.is_open;
    },
    staleTime: 30000,
    refetchInterval: (data) => (data ? 5000 : 30000),
  });

  const { data: queue } = useQuery<QueueItem[]>({
    queryKey: ["queue"],
    queryFn: async () => {
      const res = await fetch("/api/queue");
      return res.json();
    },
    enabled: isOpen,
    refetchInterval: isOpen ? 3000 : false,
  });

  const toggleOpenMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/open", { method: "POST" });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbershopStatus"] });
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/queue", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queue"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch("/api/queue", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queue"] });
    },
  });

  const toggleBarbershop = () => {
    toggleOpenMutation.mutate();
  };

  const addToQueue = () => {
    addMutation.mutate();
  };

  const removeFromQueue = (id: string) => {
    removeMutation.mutate(id);
  };

  const session = useSession();
  const isAdmin = session.data?.user?.isAdmin === true;
  const user = session.data?.user;

  return (
    <BarbershopContext.Provider
      value={{
        isOpen,
        toggleBarbershop,
        queue,
        addToQueue,
        removeFromQueue,
        isAdmin,
        user,
      }}
    >
      {children}
    </BarbershopContext.Provider>
  );
};
