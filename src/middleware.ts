import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Rotas válidas (todas as existentes na aplicação)
  const validRoutes = [
    "/",
    "/entrar",
    "/esqueci-senha",
    "/cadastrar",
    "/cortes",
  ];

  // Verifica se a rota acessada é válida
  const isValidRoute = validRoutes.includes(pathname);

  if (!isValidRoute) {
    // Se a rota não for válida, redireciona para `/`
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Caso o usuário esteja autenticado e tente acessar uma rota pública
  const publicRoutes = ["/entrar", "/esqueci-senha", "/cadastrar"];
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Caso a rota seja pública, permite acesso
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Caso o token não exista e a rota seja protegida, redireciona para `/entrar`
  if (!token) {
    return NextResponse.redirect(new URL("/entrar", req.url));
  }

  // Caso o token exista, permite o acesso às rotas protegidas
  return NextResponse.next();
}

// Define as rotas que o middleware deve interceptar
export const config = {
  matcher: ["/", "/entrar", "/esqueci-senha", "/cadastrar", "/cortes"],
};
