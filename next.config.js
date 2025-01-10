/* eslint-disable @typescript-eslint/no-require-imports */
const withPWA = require("next-pwa")({
  dest: "public",  // Garante que o Service Worker esteja na pasta 'public'
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});


module.exports = withPWA({
  reactStrictMode: true,
});
