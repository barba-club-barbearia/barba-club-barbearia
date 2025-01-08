"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-zinc-100 flex flex-col items-center justify-center">
      {/* Header */}
      <header className="flex items-center gap-4 mb-6">
        <div className="bg-amber-500 p-2 rounded-lg">
          <Scissors className="h-8 w-8 text-black" />
        </div>
        <h1 className="text-3xl font-bold text-amber-500">Barba Club</h1>
      </header>

      {/* Content */}
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-zinc-200 mb-4">
          Página Não Encontrada
        </h2>
        <p className="text-sm md:text-base text-zinc-400 mb-6">
          A página que você está tentando acessar não existe ou foi movida.
        </p>
        <Button
          onClick={handleGoHome}
          variant="outline"
          className="bg-amber-500/10 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
        >
          Voltar para a Página Inicial
        </Button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 text-center text-zinc-500 text-sm">
        © 2024 Barba Club Barbearia. Todos os direitos reservados.
      </footer>
    </div>
  );
}
