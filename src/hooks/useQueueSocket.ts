import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_BASE_URL_WEB_SOCKET; // Ajuste a URL conforme necessário
// const SOCKET_URL = "https://barbearia-web-socket-backend.onrender.com"; // Ajuste a URL conforme necessário

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
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on("QUEUE_UPDATED", (updatedQueue: QueueItem[]) => {
      setQueue(updatedQueue);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const addToQueue = (userId: string) => {
    console.log("USERID", userId);
    socketRef.current?.emit("ADD_TO_QUEUE", { userId });
  };

  const removeFromQueue = (id: string) => {
    socketRef.current?.emit("REMOVE_TO_QUEUE", { id });
  };

  return { queue, addToQueue, removeFromQueue };
};
