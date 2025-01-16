"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface BarbershopContextData {
  isOpen: boolean;
  toggleBarbershop: () => Promise<void>;
  isAdmin: boolean;
  user: any;
  subscription: any;
  isSupported: boolean;
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

  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  const session = useSession();
  const isAdmin = session.data?.user?.isAdmin === true;
  const user = session.data?.user;

  const registerServiceWorker = useCallback(async () => {
    const registration = await navigator.serviceWorker.register("/sw-next.js", {
      scope: "/",
      updateViaCache: "none",
    });

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_WEB_SOCKET}/subscriptions/${user?.id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (result) {
      const data = await result.json();
      setSubscription(data.subscription);
    }

    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }, [user?.id]);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, [registerServiceWorker, user?.id]);

  const { data: isOpen = false } = useQuery({
    queryKey: ["barbershopStatus"],
    queryFn: async () => {
      const res = await fetch("/api/open");
      const data = await res.json();
      return data?.is_open;
    },
    staleTime: 1000 * 60 * 60,
    refetchInterval: (data) => (data ? 600000 : 600000),
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

  const toggleBarbershop = async () => {
    await toggleOpenMutation.mutateAsync();
  };

  return (
    <BarbershopContext.Provider
      value={{
        isOpen,
        toggleBarbershop,
        isAdmin,
        user,
        subscription,
        isSupported,
      }}
    >
      {children}
    </BarbershopContext.Provider>
  );
};
