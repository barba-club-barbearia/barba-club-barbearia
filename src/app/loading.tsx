import { Scissors } from "lucide-react";

// app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Scissors className="h-12 w-12 text-amber-500 animate-spin mx-auto" />
        <p className="text-zinc-400">Carregando...</p>
      </div>
    </div>
  );
}
