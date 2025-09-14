import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ⚠️ This will completely disable ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
