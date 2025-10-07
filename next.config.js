/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify specific configuration
  trailingSlash: true,
  
  // Image optimization for Netlify
  images: {
    unoptimized: true,
  },
  
  // Disable edge runtime for Netlify compatibility
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;