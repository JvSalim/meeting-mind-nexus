
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
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
