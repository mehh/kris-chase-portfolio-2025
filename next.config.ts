import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
