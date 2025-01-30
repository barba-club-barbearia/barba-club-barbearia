"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const FallbackWithoutBarber = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-full bg-black text-zinc-400">
      <div className="flex flex-col items-center gap-4">
        <p>Você não está associado a um barbeiro.</p>
        <Button
          className="bg-[#F5A524] text-black hover:bg-[#F5A524]/90"
          onClick={() => router.push("/barbeiros")}
        >
          Escolher um barbeiro
        </Button>
      </div>
    </div>
  );
};
