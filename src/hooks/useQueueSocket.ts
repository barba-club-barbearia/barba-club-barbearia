import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_BASE_URL_WEB_SOCKET;

interface QueueItem {
  id: string;
  position: number;
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export const useQueueSocket = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Adiciona o estado de loading
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    // Quando a fila é atualizada, desativa o loading
    socket.on("QUEUE_UPDATED", (updatedQueue: QueueItem[]) => {
      setQueue(updatedQueue);
      setIsLoading(false); // Atualização chegou, encerra o loading
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const addToQueue = (userId: string) => {
    setIsLoading(true); // Ativa o loading antes de enviar o evento
    socketRef.current?.emit("ADD_TO_QUEUE", { userId });
  };

  const removeFromQueue = (id: string) => {
    setIsLoading(true); // Ativa o loading antes de enviar o evento
    socketRef.current?.emit("REMOVE_TO_QUEUE", { id });
  };

  return { queue, addToQueue, removeFromQueue, isLoading };
};
