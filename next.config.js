/* eslint-disable @typescript-eslint/no-require-imports */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
  buildExcludes: [/middleware-manifest\.json$/], // Exclua arquivos problemáticos
  runtimeCaching: [
    {
      urlPattern: /.*\.(png|jpg|jpeg|svg|webp)$/i, // Imagens
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
        },
      },
    },
    {
      urlPattern: /.*\.(css|js)$/i, // CSS e JS
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 50,
        },
      },
    },
  ],


});


module.exports = withPWA({
  reactStrictMode: true,
});
