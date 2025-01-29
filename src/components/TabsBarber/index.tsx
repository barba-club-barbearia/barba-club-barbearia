"use client";

import React, { useState } from "react";
import { Scissors, UserRound } from "lucide-react";
import { QueueItem } from "@/app/types";
import QueueSection from "../QueueSection";
import { cn } from "@/lib/utils";

type BarberQueue = {
  id: string;
  name: string;
  queue: QueueItem[] | null;
};

type TabsQueueProps = {
  barbers: BarberQueue[];
};

const TabsQueue = ({ barbers }: TabsQueueProps) => {
  const [activeBarber, setActiveBarber] = useState(barbers[0]?.id);
  const activeQueue = barbers.find((b) => b.id === activeBarber);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-amber-500/10 p-2 rounded-lg">
          <Scissors className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-zinc-200">
            Nossos Barbeiros
          </h2>
          <p className="text-sm text-zinc-400">
            Selecione um profissional para entrar na fila
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
        {barbers.map((barber) => {
          const isActive = activeBarber === barber.id;
          const queueLength = barber.queue?.length || 0;

          return (
            <button
              key={barber.id}
              onClick={() => setActiveBarber(barber.id)}
              className={cn(
                "relative p-4 rounded-lg transition-all duration-200 border",
                "flex items-center justify-between gap-3",
                "hover:bg-zinc-800/50",
                isActive
                  ? "bg-amber-500/10 border-amber-500/50 text-amber-500"
                  : "bg-zinc-900/50 border-zinc-800 text-zinc-400"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    isActive ? "bg-amber-500/10" : "bg-zinc-800"
                  )}
                >
                  <UserRound className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">{barber.name}</p>
                  <p className="text-xs opacity-60">
                    {queueLength} {queueLength === 1 ? "cliente" : "clientes"}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  isActive ? "bg-amber-500" : "bg-zinc-700"
                )}
              />
            </button>
          );
        })}
      </div>

      {activeQueue && (
        <QueueSection
          key={activeQueue.id}
          initialQueue={activeQueue.queue}
          barberId={activeQueue.id}
        />
      )}
    </div>
  );
};

export default TabsQueue;
