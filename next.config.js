
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['lucide-react', 'framer-motion'],
  images: {
    domains: ['localhost'],
  },
  experimental: {
    esmExternals: true,
  },
}

module.exports = nextConfig
