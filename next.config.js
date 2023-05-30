const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  compress: false,
  sassOptions: {
    includePaths: [
      path.join(__dirname, './node_modules/breakpoint-sass/stylesheets/'),
      path.join(__dirname, 'css'),
      path.join(__dirname, 'components'),
    ],
  },
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['pages', 'components', 'lib', 'layouts', 'scripts'],
  },
  experimental: { esmExternals: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    quality: 100,
  },
  // <meta name="content-security-policy" content="script-src 'self' https://codepen.io 'unsafe-eval'; object-src 'self'; img-src 'self' data:;">
  async headers() {
    return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'Content-Security-Policy',
              value:
                "default-src 'self' 'https://codepen.io'; image-src 'https://codepen.io'; script-src 'self' 'https://codepen.io' 'https://use.typekit.net'; font-src 'self' 'https://codepen.io' 'https://use.typekit.net'",
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
          ],
        },
      ];
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                      prefixIds: false,
                      mergePaths: false,
                    },
                  },
                },
              ]
            }
          }
        }
      ],
    })

    if (!dev && !isServer) {
      // Replace React with Preact only in client production build
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
})
