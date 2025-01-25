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

const QueueSection = () => {
  const {
    queue,
    addToQueue,
    removeFromQueue,
    isLoading: isLoadingActionQueue,
  } = useQueueSocket();

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
    <div className="bg-[#0f0f0f] rounded-xl border border-amber-900/20 shadow-lg overflow-hidden">
      <div className="p-4 md:p-6">
        {isOpen ? (
          <>
            {/* Status Bar */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between pb-4 rounded-lg  shadow-sm">
              <p className="text-lg md:text-xl font-semibold text-zinc-200">
                Fila Atual
              </p>
              <div className="flex items-center gap-2 text-sm text-zinc-400 mt-2 sm:mt-0">
                <Clock className="h-4 w-4" />
                atualizado em tempo real
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 bg-[#1a1a1a] p-3 md:p-4 rounded-lg border border-amber-900/10">
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <div className="bg-amber-500/10 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-zinc-200 font-medium text-sm md:text-base">
                    {getQueueMessage(queue)}
                  </p>
                  {userInQueue && (
                    <p className="text-sm text-zinc-400 mt-0.5">
                      Sua posição:{" "}
                      <span className="text-amber-500">
                        #{userInQueue.position}º
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={handleOnClick}
                disabled={isLoadingActionQueue}
                size="default"
                className={`w-full sm:w-[160px] relative flex justify-center items-center ${
                  userInQueue
                    ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    : "bg-amber-500 text-black hover:bg-amber-400"
                } transition-all duration-300 ease-in-out text-sm md:text-base min-h-[40px]`}
              >
                <div className="relative w-full flex justify-center items-center">
                  {isLoadingActionQueue ? (
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200">
                      <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 w-full transition-opacity duration-200">
                      {userInQueue ? (
                        <>
                          <CircleMinus className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                          <span className="w-20 text-center">Sair da fila</span>
                        </>
                      ) : (
                        <>
                          <CirclePlus className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                          <span className="w-28 text-center">
                            Entrar na fila
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </Button>
            </div>

            {/* Tolerance Notice */}
            {queue?.length > 0 && (
              <div className="mb-6 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 md:p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-amber-500 font-medium text-sm md:text-base">
                      Atenção
                    </p>
                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                      Fique atento quando chegar sua vez na fila. Caso você não
                      esteja presente quando for chamado, sua vez poderá ser
                      passada para o próximo cliente.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Client List */}
            <div className="space-y-3">
              {queue?.map((item) => (
                <ClientItem
                  key={item.id}
                  item={item}
                  removeFromQueue={removeFromQueue}
                  user={user}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 md:py-12">
            <div className="bg-red-500/10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-red-400" />
            </div>
            <p className="text-zinc-300 font-medium text-sm md:text-base">
              A barbearia está fechada
            </p>
            <p className="text-xs md:text-sm text-zinc-500 mt-1">
              Volte mais tarde
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueueSection;
