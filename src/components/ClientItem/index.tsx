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
      <div className="bg-[#0f0f0f] p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#F5A524]/10 h-8 w-8 rounded-full flex items-center justify-center">
            <span className="text-[#F5A524] font-medium text-sm">
              #{item.position}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-zinc-100 font-medium text-sm">
                {item.user.name}
              </span>
              {item.user.id === user?.id && (
                <Badge className="bg-[#F5A524] text-black text-xs hover:bg-[#F5A524]/90">
                  Você
                </Badge>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Entrou em: {formatDate(item.createdAt)}
            </p>
          </div>
        </div>
        {user?.isAdmin && (
          <Button
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm w-full sm:w-auto mt-2 sm:mt-0"
            onClick={() => removeFromQueue(item.id)}
          >
            Remover
          </Button>
        )}
      </div>
    );
  }
);

ClientItem.displayName = "ClientItem";
