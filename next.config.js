/* eslint-disable @typescript-eslint/no-require-imports */
const withPWA = require("next-pwa")({
  dest: "public",  // Garante que o Service Worker esteja na pasta 'public'
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  customWorkerSrc: "./custom-sw.js", // Aponta para o arquivo personalizado // Certifique-se de que o PWA não está desabilitado
});


module.exports = withPWA({
  reactStrictMode: true,
});
