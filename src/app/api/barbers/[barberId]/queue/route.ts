import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Context {
  params: Promise<{ barberId: string }>;
}

export async function GET(request: NextRequest, context: Context) {
  const { barberId } = await context.params;

  try {
    const barbershop = await prisma.barber.findUnique({
      where: { id: barberId },
      select: {
        queue: {
          orderBy: { position: "asc" },
          select: {
            id: true,
            position: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                id: true,
                isAdmin: true,
              },
            },
          },
        },
      },
    });

    if (!barbershop?.queue) {
      return NextResponse.json(
        { error: "Barber queue not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(barbershop.queue);
  } catch (error) {
    console.error("Erro ao buscar fila do barbeiro:", error);
    return NextResponse.json(
      { error: "Erro ao buscar fila do barbeiro" },
      { status: 500 }
    );
  }
}
