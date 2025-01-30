import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: { unoptimized: true },
  basePath: '/frontend_mentor_5-5_space-tourism-website-main',
  assetPrefix: '/frontend_mentor_5-5_space-tourism-website-main',
};

export default nextConfig;
