// app/robots.js, written out the way Next.js serialised it
import siteMetadata from '@/content/metadata'

const rules = [
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
]

export function GET() {
  let content = ''
  for (const rule of rules) {
    for (const agent of [rule.userAgent].flat()) {
      content += `User-Agent: ${agent}\n`
    }
    for (const path of rule.allow ?? []) content += `Allow: ${path}\n`
    for (const path of rule.disallow ?? []) content += `Disallow: ${path}\n`
    content += '\n'
  }
  content += `Sitemap: ${siteMetadata.siteUrl}/sitemap.xml\n`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
