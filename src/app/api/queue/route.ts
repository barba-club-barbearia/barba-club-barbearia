import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const queue = await prisma.queue.findMany({
      orderBy: { position: "asc" },
      select: {
        id: true,
        position: true,
        createdAt: true,
        barber: true,
        user: {
          select: {
            name: true,
            id: true,
            isAdmin: true,
          },
        },
      },
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
