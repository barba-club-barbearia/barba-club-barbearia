import { sendNotification as sendNotificationAction } from "@/app/actions";
import { deleteSubscription, saveSubscription } from "@/services/api";
import { useUserStore } from "@/store/useUser";
import { urlBase64ToUint8Array } from "@/utils/urlBase64ToUint8Array";

export function usePushNotification() {
  const subscription = useUserStore((s) => s.subscription);

  async function subscribeToPush(userId: string) {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });

    saveSubscription({
      userId,
      subscription,
    });
  }

  async function unsubscribeFromPush(userId: string) {
    const registration = await navigator.serviceWorker.ready;
    const subscribe = await registration.pushManager.getSubscription();
    subscribe?.unsubscribe();

    deleteSubscription({ userId });
  }

  async function sendNotification(message: string) {
    const serializedSubscription = JSON.parse(JSON.stringify(subscription));
    await sendNotificationAction(message, serializedSubscription);
  }

  return {
    subscribeToPush,
    unsubscribeFromPush,
    sendNotification,
    subscription,
  };
}
