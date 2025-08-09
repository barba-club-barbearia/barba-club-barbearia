import { NextResponse } from "next/server";
import { normalizeName } from "@/utils/normalizeName";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const existingBarber = await prisma.barber.findFirst({
      where: { name },
    });

    if (existingBarber) {
      return NextResponse.json(
        { error: "Barbeiro já cadastrado" },
        { status: 400 }
      );
    }

    let normalizedName;

    try {
      normalizedName = normalizeName(name);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const user = await prisma.barber.create({
      data: {
        name: normalizedName,
      },
    });

    return NextResponse.json(
      { message: "Barbeiro criado com sucesso", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao criar usuário", message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const barbershops = await prisma.barber.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { queue: true },
        },
      },
    });

    if (!barbershops) {
      return NextResponse.json(
        {
          message: "barbearia nao encontrada",
        },
        {
          status: 404,
          headers: { "content-type": "application/json" },
        }
      );
    }

    return NextResponse.json(barbershops);
  } catch (error) {
    console.error("Error fetching barbershop:", error);
    return NextResponse.json(
      { error: "Failed to fetch barbershop" },
      { status: 500 }
    );
  }
}
