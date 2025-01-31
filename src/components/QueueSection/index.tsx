"use client";

import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CircleMinus,
  CirclePlus,
  Clock,
  Loader2,
  Users,
} from "lucide-react";

import { useUserStore } from "@/store/useUser";
import { useBarbershop } from "@/contexts/BarberShop";
import { LoadingState } from "../LoadingState";
import { QueueItem } from "@/app/types";
import { ClientItem } from "../ClientItem";

const QueueSection = () => {
  const {
    queue,
    addToQueue,
    removeFromQueue,
    isLoading: isLoadingActionQueue,
  } = useBarbershop();

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
    <div className="flex flex-col gap-4 p-4 bg-black text-white">
      {isOpen && (
        <>
          {/* Aviso */}
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-400 shrink-0" />
              <p className="text-sm text-gray-300">
                Fique atento quando chegar sua vez na fila. Caso você não esteja
                presente quando for chamado, sua vez poderá ser passada para o
                próximo cliente.
              </p>
            </div>
          </div>
        </>
      )}

      {/* Status da Fila */}
      <div className="bg-[#1a1a1a] rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Status da fila</h2>
        <div className="space-y-4">
          {isOpen && (
            <>
              {/* Atualização em tempo real */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                <span>Atualizado em tempo real</span>
              </div>

              {/* Contagem e botão */}
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm">
                    {getQueueMessage(queue)}
                  </p>
                  {userInQueue && (
                    <p className="text-sm text-gray-400">
                      Sua posição:{" "}
                      <span className="text-yellow-400">
                        #{userInQueue.position}º
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={handleOnClick}
                disabled={isLoadingActionQueue}
                className={`w-full py-3 ${
                  userInQueue
                    ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    : "bg-yellow-400 text-black hover:bg-yellow-400/90"
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
            </>
          )}

          {/* Barbearia Fechada */}
          {!isOpen && (
            <div className="bg-[#1a1a1a] rounded-lg p-6 text-center">
              <div className="bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
              <p className="text-gray-300 font-medium">
                A barbearia está fechada
              </p>
              <p className="text-sm text-gray-500 mt-1">Volte mais tarde</p>
            </div>
          )}
        </div>
      </div>

      {/* Lista da Fila */}
      {queue?.length > 0 && isOpen && (
        <div className="bg-[#1a1a1a] rounded-lg">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-3">Clientes na fila</h2>
            <div className="space-y-3">
              {queue.map((item, index) => (
                <ClientItem
                  index={index}
                  key={item.id}
                  item={item}
                  removeFromQueue={removeFromQueue}
                  user={user}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueueSection;
