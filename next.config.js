const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['app', 'components', 'lib', 'scripts'],
  },
  images: {
    formats: ['image/avif', 'image/webp']
  },
}

module.exports = withContentlayer(nextConfig);
