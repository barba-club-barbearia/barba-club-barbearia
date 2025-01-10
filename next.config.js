/* eslint-disable @typescript-eslint/no-require-imports */
const withPWA = require("next-pwa")({
  dest: "public",  // Garante que o Service Worker esteja na pasta 'public'
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',  // Certifique-se de que o PWA não está desabilitado
  customWorkerDir: "worker", // Diretório onde está o custom Service Worker
});


module.exports = withPWA({
  reactStrictMode: true,
});
