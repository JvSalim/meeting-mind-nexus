
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  transpilePackages: ['lucide-react'],
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
