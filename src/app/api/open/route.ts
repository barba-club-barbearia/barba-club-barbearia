import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const barbershop = await prisma.barbershop.findFirst();

    if (!barbershop) {
      throw new Error("Barbearia não encontrada.");
    }

    return NextResponse.json(barbershop);
  } catch (error) {
    console.error("Error fetching barbershop:", error);
    return NextResponse.json(
      { error: "Failed to fetch barbershop" },
      { status: 500 }
    );
  }
}

export async function POST() {
  const barbershop = await prisma.barbershop.findFirst();

  if (!barbershop) {
    await prisma.barbershop.create({
      data: { is_open: true, opened_at: new Date() },
    });

    return NextResponse.json({ message: "Barbearia aberta!" });
  }

  if (barbershop.is_open) {
    await prisma.barbershop.update({
      where: { id: barbershop.id },
      data: { is_open: false },
    });

    return NextResponse.json({ message: "Barbearia fechada!" });
  }

  await prisma.barbershop.update({
    where: { id: barbershop.id },
    data: { is_open: true, opened_at: new Date() },
  });

  return NextResponse.json({ message: "Barbearia aberta!" });
}
