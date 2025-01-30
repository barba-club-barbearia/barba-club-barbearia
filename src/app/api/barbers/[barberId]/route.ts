import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Context {
  params: Promise<{ barberId: string }>;
}
export async function GET(request: Request, context: Context) {
  const { barberId } = await context.params;

  try {
    const barbershop = await prisma.barber.findUnique({
      where: { id: barberId },
    });

    if (!barbershop) {
      return NextResponse.json(
        { error: "Barber queue not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(barbershop);
  } catch (error) {
    console.error("Erro ao buscar fila do barbeiro:", error);
    return NextResponse.json(
      { error: "Erro ao buscar fila do barbeiro" },
      { status: 500 }
    );
  }
}
