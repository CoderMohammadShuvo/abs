import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  typescript: {
    // ⚠️ Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
} as NextConfig;

export default nextConfig;
