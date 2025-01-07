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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-500 mb-6">
          Nossos Cortes
        </h1>

        <div className="grid gap-4">
          {HAIRCUTS.map((haircut, index) => (
            <div
              key={index}
              className="bg-[#0f0f0f] rounded-xl border border-amber-900/20 p-4 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-medium text-zinc-200 mb-2">
                    {haircut.name}
                  </h2>
                  <p className="text-zinc-400 text-sm md:text-base mb-3">
                    {haircut.description}
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                  >
                    Duração: {haircut.duration}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-amber-500">
                  {haircut.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
