import type { NextConfig } from "next";


const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',        // Allows all domains (easier for development)
      },
    ],
  },
};

module.exports = nextConfig;

