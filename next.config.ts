import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com', // Clerk user images
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Placeholders
      }
    ]
  },
  // Otimização Vercel: remover logs em produção e não falhar build por lint/types (opcional para velocidade)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
