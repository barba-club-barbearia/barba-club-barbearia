import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = withPWA({
  dest: "public", // Diretório onde o service worker será gerado
  register: true, // Registra automaticamente o service worker
  skipWaiting: true, // Força o service worker a ser ativado imediatamente após a instalação
  // Outras configurações específicas do seu projeto
});

export default nextConfig;
