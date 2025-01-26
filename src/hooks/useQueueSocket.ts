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
  const [queue, setQueue] = useState<QueueItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Adiciona o estado de loading
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Only create a socket if one doesn't exist
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL);

      socketRef.current.on("QUEUE_UPDATED", (updatedQueue: QueueItem[]) => {
        setQueue(updatedQueue);
        setIsLoading(false);
      });
    }

    socketRef.current.on("connect", () => {
      console.log(
        "Connected using:",
        socketRef.current?.io.engine.transport.name
      );
    });

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []); // Empty dependency array

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
