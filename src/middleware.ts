import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  console.log("PATHNAME", pathname);

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ["/entrar", "/esqueci-senha", "/cadastrar"];

  // Verifica se a rota é pública
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Caso o usuário esteja autenticado e tente acessar uma rota pública
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Caso a rota seja pública, permite acesso
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Caso não seja pública e o token não exista, redireciona para /entrar
  if (!token) {
    return NextResponse.redirect(new URL("/entrar", req.url));
  }

  // Caso o token exista, permite acesso às rotas protegidas
  return NextResponse.next();
}

// Define as rotas que o middleware deve interceptar
export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.ico|sw\\.js).*)", // Exclui /api, /_next, /static, favicon.ico e sw.js
  ],
};
