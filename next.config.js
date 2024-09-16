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
  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/feed.xml',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/images/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate, stale-while-revalidate=60',
          },
        ],
      },
    ]
  },
}

// Wrap the config with both withContentlayer and withBundleAnalyzer
module.exports = withContentlayer(withBundleAnalyzer(nextConfig))
