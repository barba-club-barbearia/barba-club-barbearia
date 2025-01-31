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

type UseQueueSocketProps = {
  initialQueue: QueueItem[] | null;
  initialStatus: boolean;
  barberId?: string;
};

export const useQueueSocket = ({
  initialQueue,
  initialStatus,
  barberId,
}: UseQueueSocketProps) => {
  const [queue, setQueue] = useState<QueueItem[] | null>(initialQueue || []);
  const [isOpen, setIsOpen] = useState<boolean>(initialStatus || false);
  const [isLoading, setIsLoading] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        query: { barberId },
      });

      socketRef.current.on("QUEUE_UPDATED", (queue: QueueItem[]) => {
        setQueue(queue);
        setIsLoading(false);
      });

      socketRef.current.on(
        "BARBER_STATUS",
        ({ isOpen }: { isOpen: boolean }) => {
          console.log({ isOpen });
          setIsOpen(isOpen);
          setIsLoading(false);
        }
      );
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

  const handleBarberStatus = () => {
    setIsLoading(true);
    socketRef.current?.emit("BARBER_STATUS");
  };

  const addToQueue = (userId: string) => {
    setIsLoading(true);
    socketRef.current?.emit("ADD_TO_QUEUE", { userId, barberId });
  };

  const removeFromQueue = (id: string) => {
    setIsLoading(true);
    socketRef.current?.emit("REMOVE_TO_QUEUE", { id, barberId });
  };

  return {
    queue,
    isOpen,
    addToQueue,
    removeFromQueue,
    isLoading,
    handleBarberStatus,
  };
};
