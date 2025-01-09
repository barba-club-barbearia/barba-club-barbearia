import { NextResponse } from "next/server";
import { sendResetEmail } from "@/lib/emailService"; // Função de envio de e-mail
import { randomUUID as uuid } from "node:crypto";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  const token = uuid();
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/resetar-senha?token=${token}`;

  await prisma.passwordResetToken.upsert({
    where: {
      userId: user.id,
    },
    create: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 3600 * 1000),
    },
    update: {
      token,
      expiresAt: new Date(Date.now() + 3600 * 1000),
    },
  });

  await sendResetEmail(email, resetLink);

  return NextResponse.json({ message: "E-mail de recuperação enviado" });
}
