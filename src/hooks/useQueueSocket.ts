"use client";

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

interface Barber {
  id: string;
  name: string;
  queue: QueueItem[];
}

type UseQueueSocketProps = {
  initialQueue: QueueItem[] | null;
  barberId?: string;
};

export const useQueueSocket = ({
  initialQueue,
  barberId,
}: UseQueueSocketProps) => {
  const [queue, setQueue] = useState<QueueItem[] | null>(initialQueue || []);
  const [isLoading, setIsLoading] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
      });

      socketRef.current.on("QUEUE_UPDATED", (barbers: Barber[]) => {
        const currentBarberQueue =
          barbers.find((b) => b.id === barberId)?.queue || [];
        setQueue(currentBarberQueue);
        setIsLoading(false);
      });
    }

    socketRef.current.on("connect", () => {
      console.log(
        "Connected using:",
        socketRef.current?.io.engine.transport.name
      );
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [barberId]);

  const addToQueue = (userId: string) => {
    setIsLoading(true);
    socketRef.current?.emit("ADD_TO_QUEUE", { userId, barberId });
  };

  const removeFromQueue = (id: string) => {
    setIsLoading(true);
    socketRef.current?.emit("REMOVE_TO_QUEUE", { id, barberId });
  };

  return { queue, addToQueue, removeFromQueue, isLoading };
};
