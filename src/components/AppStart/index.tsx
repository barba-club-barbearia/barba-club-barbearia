"use client";

import { deleteSubscription, getSubscription } from "@/services/api";
import { useUserStore } from "@/store/useUser";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

export const AppStart = () => {
  const session = useSession();
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
    if (!session?.data) return;

    setUser({
      id: session.data.user.id,
      name: session.data.user.name,
      email: session.data.user.email,
      isAdmin: session.data.user.isAdmin,
    });

    getSubscriptionAsync(session.data.user.id);
  }, [getSubscriptionAsync, session, setSubscription, setUser]);

  return null;
};
