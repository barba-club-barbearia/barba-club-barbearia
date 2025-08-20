import nextPwa from "@ducanh2912/next-pwa";
import nextBundleAnalyzer from "@next/bundle-analyzer";
import { StatsWriterPlugin } from "webpack-stats-plugin";

/** @type {import('next').NextConfig} */
const withPWA = nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  buildExcludes: [/app-build-manifest\.json$/],
  disable: process.env.NODE_ENV === 'development',
});

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  webpack: (config, { isServer }) => {

    if (!isServer && process.env.NODE_ENV === 'production') {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tapAsync('MyCustomPlugin', (compilation, callback) => {
            const cssFile = Object.keys(compilation.assets).find((file) =>
              file.endsWith('.css')
            );

            // Agora você pode usar o nome do arquivo gerado
            console.log(`Arquivo CSS gerado: ${cssFile}`);

            // Adicione o nome do arquivo ao `env` ou para outro lugar
            process.env.CSS_FILE_NAME = cssFile.replace(/\.css$/, ''); // Remova a extensão se necessário

            callback();
          });
        },
      });
    }

    // Removemos a substituição do React pelo Preact que estava causando problemas

    if (process.env.ANALYZE === "true") {
      config.plugins.push(
        new StatsWriterPlugin({
          filename: "stats.json",
          stats: {
            all: true,
          },
        })
      );
    }

    // A configuração padrão de splitChunks do Next.js já é bem otimizada.
    // Recomenda-se remover a customização acima, a menos que haja um motivo muito específico para mantê-la.

    return config;
  },
};

export default withBundleAnalyzer(withPWA(nextConfig));
