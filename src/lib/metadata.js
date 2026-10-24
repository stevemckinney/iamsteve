// Page metadata, resolved the way Next.js combined app/layout.js’s metadata
// with each page’s. A route passes the object its Next.js page exported
// (title, description, alternates, robots, openGraph, twitter) and gets
// back the values the head renders.
//
// Next.js’s rules, as production shows them:
// - The page’s title goes through the template; no title uses the default
// - alternates, robots, openGraph and twitter each replace the root’s whole
//   object when a page sets them
// - A relative canonical or og:url resolves against the page’s path
// - og:title falls back to the resolved title
// - twitter fills a missing title, description and images from openGraph
// - Only the home page gets app/opengraph-image.png
// - A description set to undefined leaves none, rather than the root’s
import siteMetadata from '@/content/metadata'

const site = siteMetadata.siteUrl

const description =
  'A blog by Steve McKinney about the design and build of websites. Bridging the gap between your design tool and code, with a focus on typography, CSS and visual craft.'

// app/layout.js
export const root = {
  title: {
    default: 'iamsteve • design & code blog',
    template: '%s • iamsteve',
  },
  description,
  alternates: {
    canonical: './',
    types: { 'application/rss+xml': `${site}/feed.xml` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    description,
    url: './',
    siteName: 'iamsteve',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/images/twitter-card.png',
        width: 1200,
        height: 600,
        alt: 'iamsteve — design and code blog',
      },
    ],
  },
  twitter: {
    title: 'iamsteve.me • design & code blog',
    card: 'summary_large_image',
    site: '@irsteve',
    creator: '@irsteve',
  },
}

// app/opengraph-image.png and app/opengraph-image.alt.txt, trailing newline
// and all
const homeImage = {
  url: '/opengraph-image.png',
  type: 'image/png',
  width: 2400,
  height: 1350,
  alt: 'Exploring web design craft. Tips and tutorials about the design and build of web interfaces.\n',
}

const absolute = (url) => new URL(url, site).href

// The home page is the site URL itself; production’s ./ gave /index, which
// redirects
function resolveUrl(url, pathname) {
  if (url !== './') return absolute(url)
  return pathname === '/' ? site : `${site}${pathname}`
}

function resolveTitle(title) {
  if (title === undefined || title === null) return root.title.default
  if (typeof title === 'object') return title.absolute
  return root.title.template.replace('%s', title)
}

function robotsContent({ index, follow, googleBot, ...rules }) {
  return [
    index === undefined ? null : index ? 'index' : 'noindex',
    follow === undefined ? null : follow ? 'follow' : 'nofollow',
    ...Object.entries(rules).map(([rule, value]) => `${rule}:${value}`),
  ]
    .filter(Boolean)
    .join(', ')
}

function resolveImages(images = []) {
  return [images]
    .flat()
    .map((image) =>
      typeof image === 'string'
        ? { url: absolute(image) }
        : { ...image, url: absolute(image.url) }
    )
}

export function resolveMetadata(page = {}, { pathname, notFound = false }) {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  const title = resolveTitle(page.title)

  // A missing page gets a single noindex and no canonical
  const robots = notFound ? { index: false } : page.robots ?? root.robots

  const alternates = page.alternates ?? root.alternates
  const canonical =
    !notFound && alternates.canonical !== undefined
      ? resolveUrl(alternates.canonical, path)
      : undefined

  const inheritsOpenGraph = page.openGraph === undefined
  const openGraph = { ...(page.openGraph ?? root.openGraph) }
  openGraph.title ??= title
  if (openGraph.url) openGraph.url = resolveUrl(openGraph.url, path)
  if (notFound) delete openGraph.url
  openGraph.images = resolveImages(
    inheritsOpenGraph && path === '/' ? homeImage : openGraph.images
  )

  const twitter = { ...(page.twitter ?? root.twitter) }
  twitter.title ??= openGraph.title
  twitter.description ??=
    openGraph.description || (page.description ?? description)
  twitter.images = twitter.images
    ? resolveImages(twitter.images)
    : openGraph.images

  return {
    title,
    description: 'description' in page ? page.description : description,
    robots: robotsContent(robots),
    googlebot: robots.googleBot ? robotsContent(robots.googleBot) : undefined,
    canonical,
    alternates: Object.entries(alternates.types ?? {}).map(([type, href]) => ({
      type,
      href: absolute(href),
    })),
    openGraph,
    twitter,
  }
}
