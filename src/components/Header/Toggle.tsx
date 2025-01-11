import React from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PushNotificationManager } from "@/hooks/usePushNotificationManager";

const NotificationToggle = () => {
  const { subscribeToPush, unsubscribeFromPush, subscription } =
    PushNotificationManager();

  console.log("@@@SUBSCRIPTION", { subscription });

  const handleToggleNotifications = async () => {
    if (!subscription) {
      console.log("Notification");
      subscribeToPush();
    } else {
      unsubscribeFromPush();
    }
  };

  return (
    <div className="space-y-2">
      {/* Notification Section */}
      <div>
        sua notificacao está:
        {JSON.stringify({ subscription })}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-zinc-500" />
          <span className="text-sm text-zinc-400">Notificações</span>
        </div>
        <Button
          onClick={handleToggleNotifications}
          variant="ghost"
          className={`h-8 px-3 text-xs flex items-center gap-2
            ${
              subscription
                ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 hover:text-amber-500"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-400"
            }`}
        >
          {subscription ? (
            <>
              <span>Ativadas</span>
              <Bell className="h-3 w-3" />
            </>
          ) : (
            <>
              <span>Ativar</span>
              <BellOff className="h-3 w-3" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NotificationToggle;
