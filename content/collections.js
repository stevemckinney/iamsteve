const collections = [
  {
    id: 1,
    title: 'Inspiration',
    slug: '/collections/inspiration',
    slugAsParams: 'inspiration',
    icon: 'bulb',
  },
  {
    id: 2,
    title: 'Typography',
    slug: '/collections/typography',
    slugAsParams: 'typography',
    icon: 'type',
  },
  {
    id: 3,
    title: 'Colour',
    slug: '/collections/colour',
    slugAsParams: 'colour',
    icon: 'palette',
  },
  {
    id: 4,
    title: 'UX design',
    slug: '/collections/ux-design',
    slugAsParams: 'ux-design',
    icon: 'cursor',
  },
  {
    id: 5,
    title: 'Code',
    slug: '/collections/code',
    slugAsParams: 'code',
    icon: 'code',
  },
  {
    id: 6,
    title: 'Motion',
    slug: '/collections/motion',
    slugAsParams: 'motion',
    icon: 'play',
  },
  {
    id: 7,
    title: 'CSS',
    slug: '/collections/css',
    slugAsParams: 'css',
    icon: 'css',
  },
  {
    id: 8,
    title: 'Foundry',
    slug: '/collections/foundry',
    slugAsParams: 'foundry',
    icon: 'foundry',
  },
  {
    id: 9,
    title: 'Publication',
    slug: '/collections/publication',
    slugAsParams: 'publication',
    icon: 'publication',
  },
  {
    id: 10,
    title: 'Favourites',
    slug: '/collections/favourites',
    slugAsParams: 'favourites',
    icon: 'bolt',
  },
  {
    id: 11,
    title: 'Resource',
    slug: '/collections/resource',
    slugAsParams: 'resource',
    icon: 'bookmark',
  },
  {
    id: 12,
    title: 'Accessibility',
    slug: '/collections/accessibility',
    slugAsParams: 'accessibility',
    icon: 'accessibility',
  },
]

const defaultKind = 'website'

const kinds = [
  {
    id: 'website',
    title: 'Website',
    icon: 'globe',
  },
  {
    id: 'article',
    title: 'Article',
    icon: 'document',
  },
  {
    id: 'resource',
    title: 'Resource',
    icon: 'book',
  },
  {
    id: 'tool',
    title: 'Tool',
    icon: 'tool',
  },
]

export { collections, kinds, defaultKind }
