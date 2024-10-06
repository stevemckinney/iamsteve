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
        source: '/feed.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=60',
          },
        ],
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/blog/entry/horizontal‑scrolling‑responsive‑menu',
        destination: '/blog/horizontal-scrolling-responsive-menu',
        permanent: true,
      },
      {
        source: '/blog/about_version_six',
        destination: '/blog/about-version-six',
        permanent: true,
      },
      {
        source: '/blog/compass_mixins_you_should_know_about',
        destination: '/blog/compass-mixins-you-should-know-about',
        permanent: true,
      },
      {
        source: '/downloads',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/entry/buttons',
        destination: '/blog/buttons',
        permanent: true,
      },
      {
        source: '/blog/my_svg_workflow_from_awkward_to_simple',
        destination: '/blog/my-svg-workflow-from-awkward-to-simple',
        permanent: true,
      },
      {
        source: '/blog/typekit-gems',
        destination: '/blog/typekit-gems-number-one',
        permanent: true,
      },
      {
        source: '/blog/stop-headroom.js-hiding-when-your-navigation-is-open',
        destination: '/blog/stop-headroom-hiding-when-your-navigation-is-open',
        permanent: true,
      },
      {
        source: '/blog/inline_block',
        destination: '/blog/inline-block',
        permanent: true,
      },
      {
        source: '/blog/entry/inline_block',
        destination: '/blog/inline-block',
        permanent: true,
      },
      {
        source: '/blog/using_scale_color_in_sass',
        destination: '/blog/using-scale-color-in-sass',
        permanent: true,
      },
      {
        source: '/blog/entry/using_scale_color_in_sass',
        destination: '/blog/using-scale-color-in-sass',
        permanent: true,
      },
      {
        source: '/blog/create_a_sass_button_element_mixin',
        destination: '/blog/create-a-sass-button-element-mixin',
        permanent: true,
      },
      {
        source: '/blog/entry/create_a_sass_button_element_mixin',
        destination: '/blog/create-a-sass-button-element-mixin',
        permanent: true,
      },
      {
        source: '/blog/entry/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/rss',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/public/feed',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/feed',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/feeds',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/blog/feed',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/static/favicon.ico',
        destination: '/favicon.ico',
        permanent: true,
      },
      {
        source: '/apple-touch-icon-precomposed.png',
        destination: '/static/apple-touch-icon.png',
        permanent: true,
      },
      {
        source: '/android.png',
        destination: '/static/favicon.png',
        permanent: true,
      },
      // Junk redirects
      {
        source: '/:path(ads.txt|admin.php|wp-login.php|wp-info.php|mailer.php|inputs.php|404.php|403.php|xmlrpc.php|xml.php)',
        destination: 'https://google.com',
        permanent: true,
      },
      {
        source: '/:path(wp-content|wp-admin|wp-includes|vendor|wp-json)/:slug*',
        destination: 'https://google.com',
        permanent: true,
      },
      {
        source: '/.env',
        destination: 'https://google.com',
        permanent: true,
      },
      {
        source: '/login.php',
        destination: 'https://google.com',
        permanent: true,
      },
    ]
  },
}

// Wrap the config with both withContentlayer and withBundleAnalyzer
module.exports = withContentlayer(withBundleAnalyzer(nextConfig))
