import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { normalizeName } from "@/utils/normalizeName";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      );
    }

    let normalizedName;

    try {
      normalizedName = normalizeName(name);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    // Buscar barbeiros
    const barbers = await prisma.barber.findMany();
    let barberId: string | undefined = undefined;

    if (barbers.length === 1) {
      barberId = barbers[0].id;
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: normalizedName,
        password: hashedPassword,
        ...(barberId && { barberId }),
      },
    });

    return NextResponse.json(
      { message: "Usuário criado com sucesso", userId: user.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}
