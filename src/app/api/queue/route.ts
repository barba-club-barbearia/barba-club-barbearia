import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/settings/authOptions";

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

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session?.user?.name) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = session.user;

  // Adiciona cliente à fila
  const positionCount = (await prisma.queue.count()) + 1;
  const newClient = await prisma.queue.create({
    data: { position: positionCount, userId: id },
    select: {
      id: true,
      position: true,
      user: {
        select: {
          name: true,
          id: true,
        },
      },
    },
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
