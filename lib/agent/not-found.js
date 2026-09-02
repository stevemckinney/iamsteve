/**
 * Recovery pointers served with every 404 and 410, so an agent that lands on a
 * dead URL can find its way back without guessing. Shared by the HTML
 * not-found page, the markdown 404s, and the proxy.
 *
 * Kept free of Node built-ins and framework imports because `proxy.js` runs
 * this on the edge runtime.
 */
export const recoveryLinks = [
  { href: '/', title: 'Homepage', description: 'Latest and popular articles' },
  {
    href: '/blog',
    title: 'Blog archive',
    description: 'Every published article',
  },
  { href: '/notes', title: 'Notes', description: 'Shorter, in-progress posts' },
  {
    href: '/sitemap.xml',
    title: 'Sitemap',
    description: 'Every indexable URL on the site',
  },
  {
    href: '/llms.txt',
    title: 'llms.txt',
    description: 'Curated index of the best articles, with markdown links',
  },
  {
    href: '/openapi.json',
    title: 'OpenAPI description',
    description: 'The public API surface, machine readable',
  },
  {
    href: '/.well-known/api-catalog',
    title: 'API catalog',
    description: 'RFC 9727 catalog of the APIs this site offers',
  },
]

function recoveryMarkdown(origin, pathname, status, heading, opening) {
  const links = recoveryLinks
    .map(
      (link) => `- [${link.title}](${origin}${link.href}): ${link.description}`
    )
    .join('\n')

  return `---
title: "${heading}"
status: ${status}
url: ${origin}${pathname}
---

# ${heading}

${opening}

## Where to look next

${links}

## Markdown representations

Blog posts, notes, pages and collection entries are available as markdown two
ways. Request the HTML URL with an \`Accept: text/markdown\` header, or append
\`.md\` to it.

- \`${origin}/api/content/{slug}\` for a blog article
- \`${origin}/api/content/notes/{slug}\` for a note
- \`${origin}/api/content/pages/{slug}\` for a standalone page
- \`${origin}/api/content/collections/{slug}\` for a collection listing
`
}

/** A 404 an agent can act on, as markdown. */
export function notFoundMarkdown(origin, pathname) {
  return recoveryMarkdown(
    origin,
    pathname,
    404,
    '404 Not Found',
    `There is no content at \`${pathname}\` on iamsteve.me.`
  )
}

/** A 410 an agent can act on. Stop asking for this URL, try these instead. */
export function goneMarkdown(origin, pathname) {
  return recoveryMarkdown(
    origin,
    pathname,
    410,
    '410 Gone',
    `\`${pathname}\` has been permanently removed from iamsteve.me and will not come back. Do not retry it.`
  )
}
