"use client";

import React from "react";
import { LogOut, Bell, User } from "lucide-react";
import { signOut } from "next-auth/react";

const SettingsPage = ({ session, barberData }: any) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/entrar" });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Profile Section */}
      <div className="bg-[#0f0f0f] rounded-xl border border-amber-900/20 shadow-lg p-4 md:p-6">
        <div className="flex items-start gap-4">
          <div className="bg-amber-500/10 w-12 h-12 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-amber-500" />
          </div>
          <div className="space-y-1">
            <h1 className="text-zinc-200 font-medium text-lg">
              {session?.user?.name}
            </h1>
            <p className="text-zinc-400 text-sm">{session?.user?.email}</p>
          </div>
        </div>
      </div>

      {/* Selected Barber Section */}
      <div className="bg-[#0f0f0f] rounded-xl border border-amber-900/20 shadow-lg p-4 md:p-6">
        <h2 className="text-zinc-400 text-sm mb-4">Barbeiro selecionado</h2>
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-amber-900/10">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/10 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-amber-500 font-medium">
                {barberData?.name?.[0] || "M"}
              </span>
            </div>
            <span className="text-zinc-200 font-medium">
              {barberData?.name || "Marcus Vinicius"}
            </span>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-[#0f0f0f] rounded-xl border border-amber-900/20 shadow-lg p-4 md:p-6">
        <h2 className="text-zinc-400 text-sm mb-4">Configurações</h2>
        <div className="space-y-4">
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-amber-900/10">
            <button className="w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-zinc-400" />
                <span className="text-zinc-200">Notificações</span>
              </div>
              <div className="w-11 h-6 bg-zinc-800 rounded-full p-0.5 transition-colors duration-200">
                <div className="w-5 h-5 rounded-full bg-zinc-600 transition-transform duration-200" />
              </div>
            </button>
          </div>

          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-amber-900/10">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
