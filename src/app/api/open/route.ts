import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST() {
  const barbershop = await prisma.barbershop.findFirst({
    where: { id: "1" },
  });

  if (!barbershop) {
    await prisma.barbershop.upsert({
      where: { id: "1" },
      update: { is_open: true, opened_at: new Date() },
      create: { id: "1", is_open: true, opened_at: new Date() },
    });

    return;
  }

  if (barbershop.is_open) {
    await prisma.barbershop.update({
      where: { id: "1" },
      data: { is_open: false },
    });

    return NextResponse.json({ message: "Barbearia fechada!" });
  }
  // Atualiza o status para "Aberto"
  await prisma.barbershop.upsert({
    where: { id: "1" },
    update: { is_open: true, opened_at: new Date() },
    create: { id: "1", is_open: true, opened_at: new Date() },
  });
  return NextResponse.json({ message: "Barbearia aberta!" });
}
