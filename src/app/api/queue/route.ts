import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const queue = await prisma.queue.findMany({
      orderBy: { position: "asc" },
    });
    return NextResponse.json(queue);
  } catch (error) {
    console.error("Error fetching queue:", error);
    return NextResponse.json(
      { error: "Failed to fetch queue" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { name } = await request.json();

  // Adiciona cliente à fila
  const position = (await prisma.queue.count()) + 1;
  const newClient = await prisma.queue.create({
    data: { name, position },
  });

  return NextResponse.json(newClient);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  // Remove cliente da fila
  await prisma.queue.delete({ where: { id } });

  // Reorganiza posições da fila
  const remainingQueue = await prisma.queue.findMany({
    orderBy: { position: "asc" },
  });
  for (let i = 0; i < remainingQueue.length; i++) {
    await prisma.queue.update({
      where: { id: remainingQueue[i].id },
      data: { position: i + 1 },
    });
  }

  return NextResponse.json({ message: "Cliente removido!" });
}
