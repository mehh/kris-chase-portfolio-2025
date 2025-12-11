// CRITICAL: Set this BEFORE any imports to prevent Tailwind native binding issues
// This must be set at the very top of the file, before any module loading
// NAPI_RS_FORCE_WASI is the actual env var that @tailwindcss/oxide checks
if (typeof process !== 'undefined') {
  process.env.NAPI_RS_FORCE_WASI = "1";
  process.env.TAILWIND_DISABLE_NATIVE = "1";
}

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
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprod.blob.core.windows.net',
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
