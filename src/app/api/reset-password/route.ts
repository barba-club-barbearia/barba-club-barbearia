import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const resetRequest = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetRequest || resetRequest.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Token inválido ou expirado" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: resetRequest.userId },
    data: { password: hashedPassword },
  });

  // Remove o token do banco
  await prisma.passwordResetToken.delete({ where: { token } });

  return NextResponse.json({ message: "Senha redefinida com sucesso!" });
}
