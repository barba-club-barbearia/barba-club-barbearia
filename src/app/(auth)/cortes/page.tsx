import React from "react";
import { Clock, Scissors } from "lucide-react";

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
    <div className="rounded-xl border border-amber-900/20 shadow-lg overflow-hidden">
      <div className="p-4 md:p-6">
        {/* Status Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between pb-4 rounded-lg shadow-sm">
          <p className="text-lg md:text-xl font-semibold text-zinc-200">
            Nossos Cortes
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-400 mt-2 sm:mt-0">
            <Scissors className="h-4 w-4" />
            serviços disponíveis
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {HAIRCUTS.map((haircut, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] p-4 rounded-lg border border-amber-900/10"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Scissors className="h-5 w-5 text-amber-500" />
                  </div>
                  <h2 className="text-zinc-200 font-medium">{haircut.name}</h2>
                </div>
                <span className="text-amber-500 font-semibold">
                  {haircut.price}
                </span>
              </div>

              <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                {haircut.description}
              </p>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-zinc-500" />
                <span className="text-zinc-500">
                  Duração: {haircut.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
