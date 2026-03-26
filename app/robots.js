import siteMetadata from '@/content/metadata'

export default function robots() {
  return {
    rules: [
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ClaudeBot',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
        ],
        allow: ['/'],
      },
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/_next/image',
          '/_next/data',
          '/*?URL=',
          '/*?_rsc=',
          '/*?PageSpeed=',
        ],
      },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  }
}
