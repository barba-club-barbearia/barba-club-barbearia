/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  buildExcludes: [/app-build-manifest\.json$/],
  disable: process.env.NODE_ENV === 'development',
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
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
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { StatsWriterPlugin } = require("webpack-stats-plugin");
      config.plugins.push(
        new StatsWriterPlugin({
          filename: "stats.json",
          stats: {
            all: true,
          },
        })
      );
    }

    // Otimizações mais seguras do webpack

    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 100000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      },
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(withPWA(nextConfig));