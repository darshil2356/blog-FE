import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Existing Next.js config options
  reactStrictMode: true, // optional but recommended

  // Add rewrites to proxy API requests to your backend
  async rewrites() {
    return [
      {
        source: '/api/:path*', // frontend calls /api/...
        destination: 'https://blog-be-rho.vercel.app/api/:path*', // your Vercel backend
      },
    ];
  },
};

export default nextConfig;
