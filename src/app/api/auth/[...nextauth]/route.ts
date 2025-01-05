/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log("user", user);

        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Senha incorreta");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        delete session.user.image;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/entrar", signOut: "/entrar" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
