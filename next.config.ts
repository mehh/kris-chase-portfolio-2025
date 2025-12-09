import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp.krischase.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'krischase.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/how-i-operate",
        permanent: true,
      },
      {
        source: "/homes",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
