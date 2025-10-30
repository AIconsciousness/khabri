/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Disable image optimization to save memory
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Reduce memory usage
  webpack: (config) => {
    config.cache = false; // Disable webpack cache
    return config;
  },
  // Reduce build memory
  experimental: {
    workerThreads: false,
    cpus: 1
  }
}

module.exports = nextConfig
