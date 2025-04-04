/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // fastRefresh: true,
  experimental: {
    turbo: {
      loaders: {
        sourceMaps: ['.js', '.jsx', '.ts', '.tsx']
      },
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: ['**/node_modules', '**/.next', '**/out'],
      }
    }
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
}

module.exports = nextConfig