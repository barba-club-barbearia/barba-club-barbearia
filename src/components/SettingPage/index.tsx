"use client";

import React, { useState } from "react";
import { LogOut, Bell, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { usePushNotification } from "@/hooks/usePushNotification";
import { useUserStore } from "@/store/useUser";

const SettingsPage = ({ session, barberData }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { subscribeToPush, unsubscribeFromPush, subscription } =
    usePushNotification();
  const user = useUserStore((s) => s.user);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/entrar" });
  };

  const handleToggleNotifications = async (checked: boolean) => {
    if (!user) return;
    setIsLoading(true);
    try {
      if (checked) {
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
    <div className="flex flex-col gap-4 p-4 bg-black min-h-screen">
      {/* Profile Section */}
      <div className="flex items-center gap-2 text-white">
        <User className="w-5 h-5" />
        <span>Perfil</span>
      </div>
      <div className="bg-zinc-900/60 rounded-lg p-4">
        <h2 className="text-white font-medium">{session?.user?.name}</h2>
        <span className="text-zinc-400">{session?.user?.email}</span>
      </div>

      {/* Selected Barber Section */}
      <div className="text-white">Barbeiro selecionado</div>
      <div className="bg-zinc-900/60 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
            {barberData?.name?.[0] || "W"}
          </div>
          <span className="text-white">
            {barberData?.name || "Welligton da Silva"}
          </span>
        </div>
      </div>

      {/* Settings Section */}
      <div className="text-white">Configurações</div>
      <div className="bg-zinc-900/60 rounded-lg">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Bell className="w-5 h-5" />
            <span>Notificações</span>
          </div>
          <div className="flex items-center gap-2">
            {isLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            )}
            <Switch
              checked={!!subscription}
              onCheckedChange={handleToggleNotifications}
              disabled={isLoading}
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
        </div>
        <div
          className="p-4 flex items-center gap-2 text-red-500 cursor-pointer border-t border-zinc-800"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
