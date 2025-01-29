import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { PrismaClient } from "@prisma/client";

import { authOptions } from "@/settings/authOptions";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const user = await request.json();

    const session = await getServerSession(authOptions);

    if (!session?.user || !session?.user?.name) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const userUpdated = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: user,
    });

    return NextResponse.json(
      { message: "Usuário atualizado com sucesso", userId: userUpdated.id },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao criar usuário", message: err.message },
      { status: 500 }
    );
  }
}
