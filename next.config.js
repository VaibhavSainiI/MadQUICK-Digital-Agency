/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration for Netlify
  images: {
    unoptimized: true,
  },
  
  // Ensure compatibility
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
};

module.exports = nextConfig;