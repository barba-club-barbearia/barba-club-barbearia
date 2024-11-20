"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Clock, Users, Menu } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface QueueItem {
  id: string;
  name: string;
  position: number;
  createdAt: string;
}

const ADMIN_HASH = "hashadmin"; // Em produção, use uma hash mais segura

const BarbershopQueue: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [name, setName] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === ADMIN_HASH;

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const res = await fetch("/api/queue");
      const result: QueueItem[] = await res.json();
      setQueue(result);
    } catch (error) {
      console.error("Error fetching queue:", error);
    }
  };

  const getOpenBarber = async () => {
    try {
      const res = await fetch("/api/open");
      const result = await res.json();
      return setIsOpen(result?.is_open);
    } catch (error) {
      console.error("Error fetching open barbershop:", error);
      return null;
    }
  };

  const openBarbershop = async () => {
    try {
      await fetch("/api/open", { method: "POST" });
      setIsOpen((prev) => !prev);
    } catch (error) {
      console.error("Error toggling barbershop status:", error);
    }
  };

  const addToQueue = async () => {
    if (!name.trim()) {
      alert("Digite seu nome");
      return;
    }

    try {
      await fetch("/api/queue", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
      setName("");
      fetchQueue();
    } catch (error) {
      console.error("Error adding to queue:", error);
    }
  };

  const removeFromQueue = async (id: string) => {
    if (!isAdmin) return;

    try {
      await fetch("/api/queue", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      fetchQueue();
    } catch (error) {
      console.error("Error removing from queue:", error);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addToQueue();
    }
  };

  useEffect(() => {
    getOpenBarber();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800">
      {/* Header Section */}
      <header className="border-b border-zinc-800 sticky top-0 bg-zinc-900/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-2">
              <Scissors className="h-6 w-6 md:h-8 md:w-8 text-amber-500" />
              <h1 className="text-xl md:text-3xl font-bold text-white">
                Barbearia XYZ
              </h1>
            </div>

            {/* Desktop Controls - Only show if admin */}
            {isAdmin && (
              <div className="hidden md:flex items-center gap-4">
                <Badge
                  variant="outline"
                  className={`px-4 py-2 ${
                    isOpen
                      ? "text-green-500 border-green-500"
                      : "text-red-500 border-red-500"
                  }`}
                >
                  {isOpen ? "Aberta" : "Fechada"}
                </Badge>
                <Button
                  onClick={openBarbershop}
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                >
                  {isOpen ? "Fechar Barbearia" : "Abrir Barbearia"}
                </Button>
              </div>
            )}

            {/* Mobile Menu Button - Only show if admin */}
            {isAdmin && (
              <Button
                variant="ghost"
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            )}
          </div>

          {/* Mobile Menu - Only show if admin */}
          {isAdmin && isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-zinc-800">
              <div className="flex flex-col gap-4">
                <Badge
                  variant="outline"
                  className={`px-4 py-2 text-center ${
                    isOpen
                      ? "text-green-500 border-green-500"
                      : "text-red-500 border-red-500"
                  }`}
                >
                  {isOpen ? "Aberta" : "Fechada"}
                </Badge>
                <Button
                  onClick={openBarbershop}
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black w-full"
                >
                  {isOpen ? "Fechar Barbearia" : "Abrir Barbearia"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-500" />
              Fila Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isOpen ? (
              <>
                {/* Queue Status */}
                <div className="bg-zinc-900 rounded-lg p-4 md:p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Clock className="h-5 w-5 text-amber-500" />
                      <span className="text-sm md:text-base text-zinc-400">
                        Clientes na fila:
                      </span>
                    </div>
                    <span className="text-white font-semibold">
                      {queue?.length}
                    </span>
                  </div>
                </div>

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
                            onClick={() => removeFromQueue(client.id)}
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
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="bg-zinc-900 border-zinc-700 text-white"
                  />
                  <Button
                    onClick={addToQueue}
                    className="bg-amber-500 hover:bg-amber-600 text-black md:w-auto"
                  >
                    Entrar na Fila
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-zinc-500">
                A barbearia está fechada.
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center text-zinc-500">
          <p className="text-sm md:text-base">
            © 2024 Barbearia XYZ. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-xs md:text-sm">Siga-nos nas redes sociais!</p>
        </div>
      </footer>
    </div>
  );
};

export default BarbershopQueue;
