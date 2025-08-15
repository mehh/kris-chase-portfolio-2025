import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/listen",
        destination: "/resume",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
