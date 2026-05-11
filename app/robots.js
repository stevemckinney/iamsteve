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
                                ],
            },
                ],
          sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    }
}
