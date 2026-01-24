import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hubspot-credentials-na1.s3.amazonaws.com',
        pathname: '/prod/badges/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Enable compression
  compress: true,

  // Power optimizations
  poweredByHeader: false,

  // Strict mode for better performance detection
  reactStrictMode: true,

};

export default nextConfig;
