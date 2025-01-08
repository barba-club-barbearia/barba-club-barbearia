/* eslint-disable @typescript-eslint/no-require-imports */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
  buildExcludes: [/middleware-manifest\.json$/], // Exclua arquivos problemáticos
});


module.exports = withPWA({
  reactStrictMode: true,
});
