import React, { memo } from "react";

import { Trash2 } from "lucide-react";

import { formatDate } from "@/utils/formatDate";

import { User as UserType } from "@/types/user";
import { Badge } from "@/components/ui/badge";

import { QueueItem } from "@/app/types";

interface ClientItemProps {
  item: QueueItem;
  user: UserType;
  removeFromQueue: (itemId: string) => void;
  index: number;
}

export const ClientItem = memo(
  ({ item, user, removeFromQueue }: ClientItemProps) => {
    const isCurrentUser = item.user.id === user?.id;

    return (
      <div
        className={`relative rounded-lg p-3 mb-2 transition-all bg-[#2a2a2a]`}
      >
        <div className="flex items-center gap-3">
          {/* Número da posição */}
          <div className="flex-shrink-0">
            <div
              className={`h-10 w-10 rounded-lg ${
                isCurrentUser ? "bg-yellow-400" : "bg-yellow-400/10"
              } flex items-center justify-center`}
            >
              <span
                className={`font-bold ${
                  isCurrentUser ? "text-black" : "text-yellow-400"
                }`}
              >
                #{item.position}
              </span>
            </div>
          </div>

          {/* Informações do cliente */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="truncate">
                <h3 className="text-gray-100 font-medium text-sm truncate">
                  {item.user.name}
                </h3>
                <p className="text-xs text-gray-400 truncate">
                  Entrou em: {formatDate(item.createdAt)}
                </p>
              </div>
              {isCurrentUser && (
                <Badge className="flex-shrink-0 bg-yellow-400 text-black text-xs">
                  Você
                </Badge>
              )}
            </div>
          </div>

          {/* Botão de remover (apenas para admin) */}
          {user?.isAdmin && (
            <button
              onClick={() => removeFromQueue(item.id)}
              className="flex items-center gap-1 text-sm text-red-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
              title="Remover da fila" // Tooltip para explicar a ação
            >
              <Trash2 className="h-5 w-5" /> {/* Ícone maior e vermelho */}
              <span className="hidden sm:inline">Remover</span>{" "}
              {/* Texto visível apenas em telas maiores */}
            </button>
          )}
        </div>
      </div>
    );
  }
);

ClientItem.displayName = "ClientItem";
