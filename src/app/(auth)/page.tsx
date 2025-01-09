"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useBarbershop } from "@/contexts/BarberShop";
import QueueSection from "@/components/QueueSection";

export default function BarbershopQueue() {
  const { replace } = useRouter();

  const { isOpen } = useBarbershop();

  const session = useSession({
    required: true,
    onUnauthenticated() {
      replace("/entrar");
    },
  });

  return (
    <div>
      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        <QueueSection user={session.data?.user} open={isOpen} />
      </div>
    </div>
  );
}
