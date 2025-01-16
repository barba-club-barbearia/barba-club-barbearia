import { sendNotification } from "@/app/actions";
import { useBarbershop } from "@/contexts/BarberShop";
import { urlBase64ToUint8Array } from "@/utils/urlBase64ToUint8Array";

export function PushNotificationManager() {
  const { subscription } = useBarbershop();
  async function subscribeToPush(userId: string) {
    console.log("subscribe to push");
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_WEB_SOCKET}/subscriptions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: sub, userId }),
      }
    );

    console.log(result);
  }

  async function unsubscribeFromPush(userId: string) {
    console.log("unsbscribe to push");

    await subscription?.unsubscribe();

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_WEB_SOCKET}/subscriptions`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription, userId }),
      }
    );
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
  };
}
