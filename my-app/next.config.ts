import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add CORS configuration
  async headers() {
    return [
      {
        source: '/api/video',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET',
          },
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
  
  // Webpack configuration
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false,
      path: require.resolve('path-browserify')
    }
    return config
  }
};

export default nextConfig;