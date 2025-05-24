import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // disables ALL ESLint checks during build
  },
  experimental: {
    
  },
};

export default nextConfig;