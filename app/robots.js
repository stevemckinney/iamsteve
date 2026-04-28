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
          '/blog/drafts',
          '/_next/image',
          '/_next/data',
          '/search?q=',
          '/*?URL=',
          '/*?_rsc=',
          '/*?PageSpeed=',
          '/*?utm_source=',
          '/*?utm_medium=',
          '/*?utm_campaign=',
          '/*?utm_term=',
          '/*?utm_content=',
          '/*?fbclid=',
          '/*?ref=',
        ],
      },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  }
}
