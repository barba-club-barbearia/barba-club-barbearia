"use client";

import React, { useState } from "react";
import { Bell, BellOff, Loader2 } from "lucide-react";

import { useUserStore } from "@/store/useUser";
import { usePushNotification } from "@/hooks/usePushNotification";
import { Button } from "@/components/ui/button";

const NotificationToggle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { subscribeToPush, unsubscribeFromPush, subscription } =
    usePushNotification();

  const user = useUserStore((s) => s.user);

  const handleToggleNotifications = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      if (!subscription) {
        await subscribeToPush(user.id);
      } else {
        await unsubscribeFromPush(user.id);
      }
    } catch (error) {
      console.error("Error toggling notifications:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-2">
      {/* Notification Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-zinc-500" />
          <span className="text-sm text-zinc-400">Notificações</span>
        </div>
        <Button
          onClick={handleToggleNotifications}
          variant="ghost"
          className={`h-8 px-3 text-xs flex items-center justify-center transition-all duration-300 w-[100px] 
            ${
              subscription
                ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 hover:text-amber-500"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-400"
            }`}
        >
          <div className="relative w-full flex justify-center items-center">
            {/* Loader com transição */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>

            {/* Ícones e texto com largura fixa */}
            <div
              className={`flex items-center justify-center gap-2 transition-opacity duration-300 ${
                isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <span className="inline-block w-12 text-center">
                {subscription ? "Ativadas" : "Ativar"}
              </span>
              {subscription ? (
                <Bell className="h-3 w-3" />
              ) : (
                <BellOff className="h-3 w-3" />
              )}
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default NotificationToggle;
