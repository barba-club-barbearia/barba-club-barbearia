// app/cortes/page.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";

const HAIRCUTS = [
  {
    name: "Corte Degradê",
    price: "R$ 35,00",
    description: "Corte moderno com transição suave de comprimento",
    duration: "45 min",
  },
  {
    name: "Barba",
    price: "R$ 25,00",
    description: "Acabamento profissional para sua barba",
    duration: "30 min",
  },
  {
    name: "Corte + Barba",
    price: "R$ 55,00",
    description: "Combo completo para seu visual",
    duration: "1h 15min",
  },
  {
    name: "Sobrancelha",
    price: "R$ 15,00",
    description: "Design e acabamento para sobrancelhas",
    duration: "15 min",
  },
];

export default function HaircutsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-amber-500 mb-8">
        Nossos Cortes
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {HAIRCUTS.map((haircut, index) => (
          <div
            key={index}
            className="bg-[#0f0f0f] rounded-lg shadow-lg border border-zinc-800 p-6"
          >
            <h2 className="text-2xl font-semibold text-zinc-200 mb-3">
              {haircut.name}
            </h2>
            <p className="text-zinc-400 text-base mb-4">
              {haircut.description}
            </p>
            <Badge
              variant="outline"
              className="bg-amber-500/10 text-amber-500 border-amber-500/20"
            >
              Duração: {haircut.duration}
            </Badge>
            <div className="text-right mt-4 text-2xl font-bold text-amber-500">
              {haircut.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
