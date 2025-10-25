/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Temporarily ignore ESLint errors during builds to unblock deploys
    ignoreDuringBuilds: true,
  },
  
  // Optimize image loading
  images: {
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/muhammad-ibrahim-tariq-b9126932b',
        permanent: true,
      },
      {
        source: '/nuch',
        destination: 'https://nuch-ai-article-summarizer.vercel.app/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
