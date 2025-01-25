import React from "react";

import { formatDate } from "@/utils/formatDate";

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

import { QueueItem } from "@/app/types";
import { User } from "@/types/user";

type ClientItemProps = {
  item: QueueItem;
  user: User;
  removeFromQueue: (itemId: string) => void;
};

export const ClientItem = React.memo(
  ({ item, user, removeFromQueue }: ClientItemProps) => {
    return (
      <div
        key={item.id}
        className={`bg-[#1a1a1a] p-3 md:p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-amber-900/10`}
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="bg-amber-500/10 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center">
            <span className="text-amber-400 font-medium text-sm md:text-base">
              #{item.position}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-zinc-100 font-medium text-sm md:text-base">
                {item.user.name}
              </span>
              {item.user.id === user?.id && (
                <Badge className="px-1 py-0 bg-amber-400 text-black text-xs font-medium hover:bg-amber-500">
                  Você
                </Badge>
              )}
            </div>
            <p className="text-xs md:text-sm text-zinc-400 mt-0.5">
              Entrou em: {formatDate(item.createdAt)}
            </p>
          </div>
        </div>
        {user?.isAdmin && (
          <Button
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm w-full sm:w-auto"
            onClick={() => removeFromQueue(item.id)}
          >
            Remover
          </Button>
        )}
      </div>
    );
  }
);

// Adicione o displayName aqui:
ClientItem.displayName = "ClientItem";
