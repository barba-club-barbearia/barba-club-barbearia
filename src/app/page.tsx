"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Menu, X, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import QueueSection from "./queue-section";

import { QueueItem } from "./types";
import { signOut, useSession } from "next-auth/react";
import { MenuSection } from "./menu-section";

const queryClient = new QueryClient();

const QueueApp = () => (
  <QueryClientProvider client={queryClient}>
    <BarbershopQueue />
  </QueryClientProvider>
);

const BarbershopQueue = () => {
  const { replace } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const session = useSession({
    required: true,
    onUnauthenticated() {
      replace("/entrar");
    },
  });

  const isAdmin = session.data?.user?.isAdmin;

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

  const toggleOpenMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/open", { method: "POST" });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbershopStatus"] });
    },
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
      queryClient.invalidateQueries({ queryKey: ["queue"] });
    },
  });

  const addToQueue = () => {
    addMutation.mutate();
  };

  const removeFromQueue = (id: string) => {
    removeMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-zinc-100">
      {/* Header Section */}
      <header className="border-b border-amber-900/20 sticky top-0 bg-[#0f0f0f]/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-amber-500 p-2 rounded-lg">
                <Scissors className="h-6 w-6 md:h-8 md:w-8 text-black" />
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-amber-500">
                  Barba Club
                </h1>
                <p className="text-xs md:text-sm text-zinc-400">
                  Barbearia Premium
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              className="text-amber-500 hover:text-amber-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-y-0 right-0 w-80 bg-[#0f0f0f] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Menu Header */}
          <div className="border-b border-amber-900/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 p-1.5 rounded">
                  <Scissors className="h-5 w-5 text-black" />
                </div>
                <span className="text-amber-500 font-semibold">Menu</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-zinc-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-zinc-500" />
                  <h3 className="text-sm font-medium text-zinc-400">
                    Status da Barbearia
                  </h3>
                </div>
                <Badge
                  variant="outline"
                  className={`w-full justify-center py-3 ${
                    isOpen
                      ? "text-green-400 border-green-400/50 bg-green-500/5"
                      : "text-red-400 border-red-400/50 bg-red-500/5"
                  }`}
                >
                  {isOpen ? "Aberta" : "Fechada"}
                </Badge>
                <Button
                  onClick={() => {
                    toggleOpenMutation.mutate();
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full bg-amber-500/10 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                >
                  {isOpen ? "Fechar Barbearia" : "Abrir Barbearia"}
                </Button>
              </div>
            )}

            {/* Menu Sections */}
            <MenuSection />
          </div>

          {/* Menu Footer */}
          <div className="mt-auto border-t border-amber-900/20 p-6">
            <Button
              variant="ghost"
              className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={() => signOut({ callbackUrl: "/entrar" })}
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-40`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <QueueSection
            queue={queue}
            user={session.data?.user}
            open={isOpen}
            onEnterQueue={addToQueue}
            onRemoveFromQueue={removeFromQueue}
            isAdmin={isAdmin}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-amber-900/20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-[#0f0f0f] rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-500 p-1.5 rounded">
                <Scissors className="h-5 w-5 text-black" />
              </div>
            </div>
            <p className="text-sm text-zinc-400 mb-2">
              © 2024 Barba Club Barbearia. Todos os direitos reservados.
            </p>
            <p className="text-xs text-zinc-500">
              Siga-nos nas redes sociais para novidades e promoções!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QueueApp;
