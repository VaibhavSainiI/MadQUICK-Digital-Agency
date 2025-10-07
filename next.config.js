/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  images: {
    unoptimized: true,
    domains: [],
  },

  // External packages for server components
  serverExternalPackages: ['mongoose'],

  // Environment configuration
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },

  // Webpack configuration for compatibility
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;
