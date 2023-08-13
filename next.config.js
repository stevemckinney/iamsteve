const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  swcMinify: true,
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  staticPageGenerationTimeout: 120,
  experimental: {
    serverActions: true,
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'scripts'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

// https://github.com/vercel/next.js/issues/48177
function withSplitSVGr(config) {
  return Object.assign({}, config, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      })

      config.module.rules.push({
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
        resourceQuery: /svgr/, // *.svg?svgr
      })

      if (typeof config.webpack === 'function') {
        return config.webpack(config, options)
      }

      return config
    },
  })
}

module.exports = withSplitSVGr(withContentlayer(nextConfig))
