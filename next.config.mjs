/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/client-matriz',
  assetPrefix: '/client-matriz/',
  
  experimental: {
    optimizeCss: true
  }
};

export default nextConfig;