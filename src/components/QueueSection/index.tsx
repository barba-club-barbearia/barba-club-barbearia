"use client";

import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Users,
  AlertCircle,
  CircleMinus,
  CirclePlus,
  Clock,
  Loader2,
} from "lucide-react";
import { useQueueSocket } from "@/hooks/useQueueSocket";
import { useUserStore } from "@/store/useUser";
import { useBarbershop } from "@/contexts/BarberShop";
import { LoadingState } from "../LoadingState";
import { ClientItem } from "../ClientItem";
import { QueueItem } from "@/app/types";

type QueueSectionProps = {
  initialQueue: QueueItem[] | null;
  barberId?: string;
};

const QueueSection = ({ initialQueue, barberId }: QueueSectionProps) => {
  const {
    queue,
    addToQueue,
    removeFromQueue,
    isLoading: isLoadingActionQueue,
  } = useQueueSocket({ initialQueue, barberId });

  const { isOpen } = useBarbershop();
  const user = useUserStore((s) => s.user);
  const isLoadingQueue = queue === null;

  const userInQueue = useMemo(
    () => queue?.find((item) => item.user.id === user?.id),
    [queue, user?.id]
  );

  if (isLoadingQueue || !user || isOpen === null) {
    return <LoadingState />;
  }

  const handleOnClick = async () => {
    if (!userInQueue) {
      addToQueue(user.id);
    } else {
      removeFromQueue(userInQueue.id);
    }
  };

  const getQueueMessage = (queue: QueueItem[]) =>
    queue.length === 0
      ? "Nenhum cliente na fila"
      : `${queue.length} cliente${queue.length !== 1 ? "s" : ""} na fila`;

  return (
    <div className="flex flex-col gap-3 p-4 bg-black min-h-screen">
      {/* Attention Section */}
      <h2 className="text-base font-medium text-white mb-1">Atenção</h2>
      <div className="bg-[#1a1a1a] rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-[#F5A524] shrink-0" />
          <p className="text-zinc-400 text-sm leading-relaxed">
            Fique atento quando chegar sua vez na fila. Caso você não esteja
            presente quando for chamado, sua vez poderá ser passada para o
            próximo cliente.
          </p>
        </div>
      </div>

      {/* Queue Status */}
      <h2 className="text-base font-medium text-white mb-1">Status da fila</h2>
      <div className="bg-[#1a1a1a] rounded-lg">
        {isOpen ? (
          <>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Clock className="h-4 w-4" />
                atualizado em tempo real
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#F5A524]/10 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-[#F5A524]" />
                  </div>
                  <div>
                    <p className="text-zinc-200 text-sm">
                      {getQueueMessage(queue)}
                    </p>
                    {userInQueue && (
                      <p className="text-sm text-zinc-400">
                        Sua posição:{" "}
                        <span className="text-[#F5A524]">
                          #{userInQueue.position}º
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleOnClick}
                  disabled={isLoadingActionQueue}
                  className={`w-full py-6 ${
                    userInQueue
                      ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      : "bg-[#F5A524] text-black hover:bg-[#F5A524]/90"
                  }`}
                >
                  {isLoadingActionQueue ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      {userInQueue ? (
                        <>
                          <CircleMinus className="h-5 w-5" />
                          <span>Sair da fila</span>
                        </>
                      ) : (
                        <>
                          <CirclePlus className="h-5 w-5" />
                          <span>Entrar na fila</span>
                        </>
                      )}
                    </div>
                  )}
                </Button>
              </div>
            </div>

            {/* Queue List */}
            {queue?.length > 0 && (
              <div className="border-t border-zinc-800">
                <div className="p-4 space-y-3">
                  {queue.map((item) => (
                    <ClientItem
                      key={item.id}
                      item={item}
                      removeFromQueue={removeFromQueue}
                      user={user}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
            <p className="text-zinc-300 font-medium">
              A barbearia está fechada
            </p>
            <p className="text-sm text-zinc-500 mt-1">Volte mais tarde</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueueSection;
