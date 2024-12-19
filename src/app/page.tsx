"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Menu } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import CurrentCustomerSection from "./current-customer";
import QueueSection from "./queue-section";

import { QueueItem } from "./types";

const queryClient = new QueryClient();

const QueueApp = () => (
  <QueryClientProvider client={queryClient}>
    <BarbershopQueue />
  </QueryClientProvider>
);

const ADMIN_HASH = "hashadmin";

const BarbershopQueue = () => {
  const [name, setName] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === ADMIN_HASH;

  const { data: isOpen = false } = useQuery({
    queryKey: ["barbershopStatus"],
    queryFn: async () => {
      const res = await fetch("/api/open");
      const data = await res.json();
      return data?.is_open;
    },
    staleTime: 30000,
    refetchInterval: (data) => (data ? 5000 : 30000),
  });

  const { data: queue = [] } = useQuery<QueueItem[]>({
    queryKey: ["queue"],
    queryFn: async () => {
      const res = await fetch("/api/queue");
      return res.json();
    },
    enabled: isOpen,
    refetchInterval: isOpen ? 3000 : false,
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/queue", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
      return res.json();
    },
    onSuccess: () => {
      setName("");
      queryClient.invalidateQueries({ queryKey: ["queue"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch("/api/queue", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      return res.json();
    },
    onSuccess: () => {
      setCustomerCutting(queue[0]);
      queryClient.invalidateQueries({ queryKey: ["queue"] });
    },
  });

  const toggleOpenMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/open", { method: "POST" });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbershopStatus"] });
    },
  });

  const addToQueue = () => {
    if (!name.trim()) {
      alert("Digite seu nome");
      return;
    }
    addMutation.mutate();
  };

  const removeFromQueue = (id: string) => {
    if (!isAdmin) return;
    removeMutation.mutate(id);
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
                Barba Club Barbearia
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
                  onClick={() => toggleOpenMutation.mutate()}
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
                  onClick={() => toggleOpenMutation.mutate()}
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
        <QueueSection
          queue={queue}
          name={name}
          onNameChange={handleInputChange}
          onEnterQueue={addToQueue}
          onKeyPress={handleKeyPress}
          onRemoveFromQueue={removeFromQueue}
          isAdmin={isAdmin}
        />
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center text-zinc-500">
          <p className="text-sm md:text-base">
            © 2024 Barba Club Barbearia. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-xs md:text-sm">Siga-nos nas redes sociais!</p>
        </div>
      </footer>
    </div>
  );
};

export default QueueApp;
