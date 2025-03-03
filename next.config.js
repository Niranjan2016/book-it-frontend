/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  fastRefresh: true,
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  images: {
    domains: ['www.europeanbusinessreview.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'localhost',
      'encrypted-tbn0.gstatic.com',
      'images.unsplash.com',
      'www.unesco.org',
      'miro.medium.com',
      'img.freepik.com',
      'plutuseducation.com',  // Added new domain
      'www.itsholidaysltd.com'
    ],
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