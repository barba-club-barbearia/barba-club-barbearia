import {
  sendNotification,
  subscribeUser,
  unsubscribeUser,
} from "@/app/actions";
import { urlBase64ToUint8Array } from "@/utils/urlBase64ToUint8Array";
import { useEffect, useState } from "react";

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  useEffect(() => {
    console.log("");
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw-next.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    console.log("Subscription", subscription);
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification(message: string) {
    if (subscription) {
      const serializedSubscription = JSON.parse(JSON.stringify(subscription));
      await sendNotification(message, serializedSubscription);
    }
  }

  return {
    subscribeToPush,
    unsubscribeFromPush,
    sendTestNotification,
    isSupported,
    subscription,
  };
}
