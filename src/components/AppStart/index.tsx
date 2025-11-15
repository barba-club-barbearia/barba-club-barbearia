"use client";

import { getSubscription } from "@/services/api";
import { useUserStore } from "@/store/useUser";
import { useEffect } from "react";
export const AppStart = ({ user }: any) => {
  const setUser = useUserStore((s) => s.setUser);
  const setSubscription = useUserStore((s) => s.setSubscription);

  useEffect(() => {
    if (!user) return;

    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      barberId: user.barberId,
    });

    const getSubscriptionAsync = async (userId: string) => {
      const subscriptions = await getSubscription({ userId });
      const registration = await navigator.serviceWorker?.ready;

      if (!subscriptions || !registration) {
        return;
      }

      const subscriptionBrowser =
        await registration.pushManager.getSubscription();

      const inTheSameSubscription = subscriptions.find(
        (s) => s.endpoint === subscriptionBrowser?.endpoint
      );

      if (inTheSameSubscription) {
        setSubscription(inTheSameSubscription);
      }
    };

    getSubscriptionAsync(user.id);
  }, [user, setSubscription, setUser]);

  return null;
};
