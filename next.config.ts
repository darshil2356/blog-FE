import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Existing Next.js config options
  reactStrictMode: true, // optional but recommended

  // Add rewrites to proxy API requests to your backend
  async rewrites() {
    return [
      {
        source: '/api/:path*', // frontend calls /api/...
        destination: 'https://blog-239msq077-darshil2356s-projects.vercel.app/api/:path*', // your Vercel backend
      },
    ];
  },
};

export default nextConfig;
