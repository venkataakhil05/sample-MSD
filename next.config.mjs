/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // Always include the repository name as the base path to ensure consistency
  // between local development and GitHub Pages deployment.
  basePath: isProd ? '/MS-Dhoni-website' : '',
  images: {
    unoptimized: true,
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
      {
        protocol: 'https',
        hostname: 's3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dnaindia.com',
      },
    ],
  },
  experimental: {
    turbopack: {
      resolveAlias: {
        gsap: 'gsap/dist/gsap',
      },
    },
  },
  webpack: (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        gsap: 'gsap/dist/gsap',
      };
    }
    return config;
  },
};

export default nextConfig;
