const { withContentlayer } = require('next-contentlayer')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  swcMinify: true,
  reactStrictMode: false,
  experimental: {
    webpackBuildWorker: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  staticPageGenerationTimeout: 240,
  eslint: {
    dirs: ['app', 'components', 'lib', 'scripts'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Add the async rewrites function here
  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/feed.xml',
      },
    ]
  },
}

// Wrap the config with both withContentlayer and withBundleAnalyzer
module.exports = withContentlayer(withBundleAnalyzer(nextConfig))
