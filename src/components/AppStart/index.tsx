"use client";

import { deleteSubscription, getSubscription } from "@/services/api";
import { useUserStore } from "@/store/useUser";
import { useCallback, useEffect } from "react";
export const AppStart = ({ user }: any) => {
  const setUser = useUserStore((s) => s.setUser);
  const setSubscription = useUserStore((s) => s.setSubscription);

  const getSubscriptionAsync = useCallback(
    async (userId: string) => {
      const result = await getSubscription({ userId });

      const registration = await navigator.serviceWorker.ready;
      const hasSubscribeInTheBrowser =
        await registration.pushManager.getSubscription();

      if (!hasSubscribeInTheBrowser && result) {
        setSubscription(null);
        await deleteSubscription({ userId });
        return;
      }

      setSubscription(result);
    },
    [setSubscription]
  );

  useEffect(() => {
    if (!user) return;

    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    const getSubscriptionAsync = async (userId: string) => {
      const result = await getSubscription({ userId });

      const registration = await navigator.serviceWorker.ready;
      const hasSubscribeInTheBrowser =
        await registration.pushManager.getSubscription();

      if (!hasSubscribeInTheBrowser && result) {
        setSubscription(null);
        await deleteSubscription({ userId });
        return;
      }

      setSubscription(result);
    };

    getSubscriptionAsync(user.id);
  }, [getSubscriptionAsync, user, setSubscription, setUser]);

  return null;
};
