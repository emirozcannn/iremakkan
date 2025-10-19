import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ build'te lint hataları yüzünden durmasın
  },
  // experimental: { turbo: false }, // ❌ artık geçersiz, kaldırıldı
};

export default nextConfig;
