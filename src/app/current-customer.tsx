import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Clock } from "lucide-react";
import { QueueItem } from "./types";
import { formatDate } from "@/utils/formatDate";

interface CurrentClientSectionProps {
  customer: QueueItem;
  isAdmin: boolean;
  onFinish: (id: string) => void;
}

const CurrentClientSection = ({
  customer,
  isAdmin,
  onFinish,
}: CurrentClientSectionProps) => {
  if (!customer) return null;

  return (
    <div className="container mx-auto px-4 my-4">
      <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 transition-colors">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Status and Client Name */}
            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className="bg-amber-500/10 text-amber-500 flex items-center gap-2 font-medium"
              >
                <Scissors className="h-3.5 w-3.5" />
                Cortando
              </Badge>
              <div className="flex flex-col">
                <span className="text-white font-medium">{customer.name}</span>
              </div>
            </div>

            {/* Time and Action */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-sm">
                  {formatDate(customer.createdAt)}
                </span>
              </div>

              {isAdmin && (
                <Button
                  onClick={() => onFinish(customer.id)}
                  variant="outline"
                  size="sm"
                  className="border-green-500 text-green-500 hover:bg-green-500/10 hover:border-green-400 hover:text-green-400 transition-colors w-full md:w-auto"
                >
                  Concluir
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentClientSection;
