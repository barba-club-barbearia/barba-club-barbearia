import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, AlertCircle } from "lucide-react";
import { QueueItem } from "./types";
import { formatDate } from "@/utils/formatDate";

interface QueueSectionProps {
  queue: QueueItem[];
  name: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterQueue: () => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveFromQueue: (id: string) => void;
  isAdmin: boolean;
}

const QueueSection = ({
  queue,
  name,
  onNameChange,
  onEnterQueue,
  onKeyPress,
  onRemoveFromQueue,
  isAdmin,
}: QueueSectionProps) => {
  return (
    <Card className="bg-zinc-800 border-zinc-700">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-amber-500" />
          Fila Atual
          <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
            {queue?.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>

        {/* Client List */}
        <div className="space-y-4">
          {queue?.length > 0 ? (
            queue?.map((client) => (
              <div
                key={client.id}
                className="bg-zinc-900 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant="secondary"
                      className="bg-amber-500/10 text-amber-500"
                    >
                      #{client.position}
                    </Badge>
                    <span className="text-white font-medium">
                      {client.name}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-500 mt-1">
                    Entrou em: {formatDate(client.createdAt)}
                  </p>
                </div>
                {isAdmin && (
                  <Button
                    variant="destructive"
                    className="w-full md:w-auto"
                    onClick={() => onRemoveFromQueue(client.id)}
                  >
                    Remover
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-zinc-500">
              Nenhum cliente na fila
            </div>
          )}
        </div>

        {/* Queue Input */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <Input
            placeholder="Digite seu nome"
            value={name}
            onChange={onNameChange}
            onKeyPress={onKeyPress}
            className="bg-zinc-900 border-zinc-700 text-white"
          />
          <Button
            onClick={onEnterQueue}
            className="bg-amber-500 hover:bg-amber-600 text-black md:w-auto"
          >
            Entrar na Fila
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QueueSection;
