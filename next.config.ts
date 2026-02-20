import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wallpapercave.com',
      },
      {
        protocol: 'https',
        hostname: 'pngimg.com',
      },
      {
        protocol: 'https',
        hostname: 'media.newindianexpress.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
    ],
  },
};

export default nextConfig;
