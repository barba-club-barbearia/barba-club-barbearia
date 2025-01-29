"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const FallbackWithoutBarber = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center flex-col gap-2 items-center h-screen w-full text-center text-gray-700">
      <p>Você não está associado a um barbeiro.</p>
      <Button onClick={() => router.push("/barbeiros")}>
        Escolher um barbeiro
      </Button>
    </div>
  );
};
