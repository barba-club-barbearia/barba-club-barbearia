"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { UserRound, Clock } from "lucide-react";
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

  const handleSelectBarber = async (barberId: string) => {
    if (user?.barberId !== barberId) {
      setPreferenceBarber(barberId);

      await updateUser({
        barberId,
      });

      await updateSessionUser({
        user: {
          barberId,
        },
      });
    }

    router.push(`/`);
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {barbers.map((barber: any) => {
          const queueLength = barber._count.queue;

          return (
            <button
              key={barber.id}
              onClick={() => handleSelectBarber(barber.id)}
              className="relative p-4 rounded-lg transition-all duration-200 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50"
            >
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/10 p-2 rounded-lg">
                  <UserRound className="h-5 w-5 text-amber-500" />
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
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BarberSelection;
