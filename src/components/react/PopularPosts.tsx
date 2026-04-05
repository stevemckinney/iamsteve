import { useState } from 'react'
import {
  Select,
  SelectValue,
  Button,
  Popover,
  ListBox,
  ListBoxItem,
} from 'react-aria-components'

import Icon from './Icon'

interface Post {
  slug: string
  title: string
  categories: string[]
  date: string
  summary?: string
  theme?: string
  large?: string
  medium?: string
}

const categoryConfig: Record<string, { accent: string; link: string; linkText: string; icon: string; theme: string }> = {
  Design: {
    accent: 'text-rio hover:text-rio-hover',
    link: '/category/design',
    linkText: 'Explore design',
    icon: 'pen',
    theme: 'rio',
  },
  Code: {
    accent: 'text-dandelion hover:text-dandelion-hover',
    link: '/category/code',
    linkText: 'Explore code',
    icon: 'code',
    theme: 'dandelion',
  },
  All: {
    accent: 'text-cornflour hover:text-cornflour-hover',
    link: '/blog',
    linkText: 'View the archive',
    icon: 'folder',
    theme: 'cornflour',
  },
}

const categories = ['Design', 'Code', 'All']

function BadgeIcon({ icon, size = 24, theme }: { icon: string; size?: number; theme: string }) {
  const themeClasses: Record<string, string> = {
    rio: 'bg-rio-100 dark:bg-rio-900 ring-rio-200 dark:ring-rio-800',
    dandelion: 'bg-dandelion-100 dark:bg-dandelion-900 ring-dandelion-200 dark:ring-dandelion-800',
    cornflour: 'bg-cornflour-100 dark:bg-cornflour-900 ring-cornflour-200 dark:ring-cornflour-800',
  }
  return (
    <span className={`inline-flex items-center justify-center rounded-md p-1 ring-1 ${themeClasses[theme] || ''}`}>
      <Icon icon={icon} size={size} variant="header" />
    </span>
  )
}

export default function PopularPosts({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState<string>('Design')

  const filteredPosts = category === 'All'
    ? posts.slice(0, 6)
    : posts.filter((p) => p.categories.includes(category)).slice(0, 6)

  const config = categoryConfig[category]

  return (
    <>
      <header className="col-start-content-start col-end-content-end flex justify-between items-baseline md:items-center sm:px-4 md:px-8 sm:-mx-4 md:-mx-8 sm:bg-canvas sm:bg-[url(/images/texture.png)] sm:bg-size-[172px_auto] sm:bg-blend-multiply sm:-mt-4.5 md:-mt-5.5">
        <h2
          className="font-display text-heading text-2xl md:text-5xl font-variation-bold lowercase inline-flex gap-2"
          id="popular-posts"
        >
          Popular in{' '}
          <Select
            selectedKey={category}
            onSelectionChange={(key) => setCategory(key as string)}
            aria-label="Category"
          >
            <Button
              className={`${config.accent} relative inline-flex items-center gap-1 cursor-pointer lowercase before:absolute before:-inset-2 before:rounded-sm before:transition-colors before:duration-200 before:ease-out hover:before:bg-[color-mix(in_oklch,currentcolor,transparent_94%)]`}
            >
              <SelectValue>{() => category}</SelectValue>
              <Icon icon="angle-down" size={24} variant="none" />
            </Button>

            <Popover className="min-w-56 bg-surface backdrop-blur-md p-1 rounded shadow-picked opacity-100 transition-opacity duration-200 ease-out data-[entering]:opacity-0 data-[exiting]:opacity-0">
              <ListBox className="outline-none flex flex-col gap-px">
                {categories.map((cat) => (
                  <ListBoxItem
                    key={cat}
                    id={cat}
                    className="relative flex items-center gap-3 pl-2 pr-4 py-2 select-none rounded-[12px] font-ui text-xl cursor-pointer outline-none data-[hovered]:bg-surface-02 data-[hovered]:z-10 focus-visible:-outline-offset-2 data-[selected]:bg-surface-02 dark:data-[selected]:shadow-[0_0_0_1px_var(--color-fern-1200),inset_0_1px_var(--color-fern-1000)]"
                  >
                    <BadgeIcon icon={categoryConfig[cat].icon} size={24} theme={categoryConfig[cat].theme} />
                    {cat}
                  </ListBoxItem>
                ))}
              </ListBox>
            </Popover>
          </Select>
        </h2>

        <a
          href={config.link}
          className="flex gap-1 text-base md:text-xl font-ui lowercase transition duration-200 hover:text-link-hover"
        >
          {config.linkText}
        </a>
      </header>
      <div className="grid col-margin sm:col-content gap-4 md:gap-8 max-sm:grid-flow-col max-sm:auto-cols-auto max-sm:overflow-auto max-sm:snap-x max-sm:snap-always max-sm:overscroll-x-contain md:grid-cols-2 xl:grid-cols-3 max-sm:px-8 max-sm:py-8 max-sm:-my-8">
        {filteredPosts.map((post) => (
          <a
            key={post.slug}
            href={post.slug}
            className="group/card bg-surface active:bg-surface-pressed bg-clip-padding rounded-lg shadow-placed hover:shadow-picked active:shadow-reduced active:scale-[.99375] transition duration-200 flex flex-col overflow-hidden p-8 gap-4"
          >
            <h3 className="text-heading text-balance font-display text-xl md:text-2xl font-variation-bold lowercase leading-none m-0">
              {post.title}
            </h3>
            {post.summary && (
              <p className="text-ui-body text-sm line-clamp-3 m-0">{post.summary}</p>
            )}
          </a>
        ))}
      </div>
    </>
  )
}
