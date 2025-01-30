"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound, Clock, Check, Loader2 } from "lucide-react";
import { useUserStore } from "@/store/useUser";
import { useSession } from "next-auth/react";
import { updateUser } from "@/services/api";
import { Barber } from "@prisma/client";

type BarberSelectionProps = {
  barbers: Barber[];
};

const BarberSelection = ({ barbers }: BarberSelectionProps) => {
  const { update: updateSessionUser } = useSession();
  const router = useRouter();
  const setPreferenceBarber = useUserStore((s) => s.setPreferenceBarber);
  const user = useUserStore((s) => s.user);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSelectBarber = async (barberId: string) => {
    if (user?.barberId !== barberId) {
      try {
        setIsLoading(barberId);
        setPreferenceBarber(barberId);
        await updateUser({
          barberId,
        });
        await updateSessionUser({
          user: {
            barberId,
          },
        });
        router.push(`/`);
      } catch (error) {
        console.error("Erro ao selecionar barbeiro:", error);
        // Você pode adicionar um toast de erro aqui se quiser
      } finally {
        setIsLoading(null);
      }
    } else {
      router.push(`/`);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-black min-h-full">
      {barbers.map((barber: any) => {
        const queueLength = barber._count.queue;
        const isSelected = user?.barberId === barber.id;
        const isLoadingThis = isLoading === barber.id;

        return (
          <button
            key={barber.id}
            onClick={() => handleSelectBarber(barber.id)}
            disabled={isLoading !== null}
            className={`relative p-4 rounded-lg transition-all duration-200 bg-[#1a1a1a] border ${
              isSelected
                ? "border-[#F5A524]"
                : "border-zinc-800 hover:border-zinc-700"
            } ${
              isLoading !== null && !isLoadingThis
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  isSelected ? "bg-[#F5A524]" : "bg-[#F5A524]/10"
                }`}
              >
                <UserRound
                  className={`h-5 w-5 ${
                    isSelected ? "text-black" : "text-[#F5A524]"
                  }`}
                />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-zinc-200">{barber.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-zinc-400" />
                  <p className="text-xs text-zinc-400">
                    {queueLength} {queueLength === 1 ? "cliente" : "clientes"}{" "}
                    na fila
                  </p>
                </div>
              </div>
              {isLoadingThis ? (
                <div className="bg-[#F5A524]/10 p-2 rounded-lg">
                  <Loader2 className="h-5 w-5 text-[#F5A524] animate-spin" />
                </div>
              ) : (
                isSelected && (
                  <div className="bg-[#F5A524]/10 p-2 rounded-lg">
                    <Check className="h-5 w-5 text-[#F5A524]" />
                  </div>
                )
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BarberSelection;
