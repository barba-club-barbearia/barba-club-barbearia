import { deleteSubscription, saveSubscription } from "@/services/api";
import { useUserStore } from "@/store/useUser";
import { urlBase64ToUint8Array } from "@/utils/urlBase64ToUint8Array";

export function usePushNotification() {
  const subscription = useUserStore((s) => s.subscription);
  const setSubscription = useUserStore((s) => s.setSubscription);

  async function subscribeToPush(userId: string) {
    if (!navigator?.serviceWorker.controller) {
      return console.log("Service worker doesnt worker");
    }

    const registration = await navigator.serviceWorker.ready;

    const subscriptionAlreadyExists =
      await registration.pushManager.getSubscription();

    if (subscriptionAlreadyExists) {
      await subscriptionAlreadyExists?.unsubscribe();
      await deleteSubscription({ userId });
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });

    await saveSubscription({
      userId,
      subscription,
    });

    setSubscription(subscription);
  }

  async function unsubscribeFromPush(userId: string) {
    const registration = await navigator.serviceWorker.ready;
    const subscribe = await registration.pushManager.getSubscription();

    await subscribe?.unsubscribe();

    await deleteSubscription({ userId });

    setSubscription(null);
  }

  return {
    subscribeToPush,
    unsubscribeFromPush,
    subscription,
  };
}
