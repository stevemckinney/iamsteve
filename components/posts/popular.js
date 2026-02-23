'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Select,
  SelectValue,
  Button,
  Popover,
  ListBox,
  ListBoxItem,
} from 'react-aria-components'

import Card from '@/components/card'
import Icon from '@/components/icon'
import { BadgeIcon } from '@/components/badge'

const categoryConfig = {
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

export default function PopularPosts({ posts }) {
  const [category, setCategory] = useState('Design')

  const filteredPosts =
    category === 'All'
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
            onSelectionChange={setCategory}
            aria-label="Category"
          >
            <Button
              className={`${config.accent} relative inline-flex items-center gap-1 cursor-pointer lowercase before:absolute before:-inset-2 before:rounded-sm before:transition-colors before:duration-200 before:ease-out hover:before:bg-[color-mix(in_oklch,currentcolor,transparent_94%)]`}
            >
              <SelectValue>{() => category}</SelectValue>
              <Icon
                icon="angle-down"
                size={24}
                variant="none"
                aria-hidden="true"
              />
            </Button>

            <Popover className="min-w-56 bg-surface backdrop-blur-md p-1 rounded shadow-picked opacity-100 transition-opacity duration-200 ease-out data-[entering]:opacity-0 data-[exiting]:opacity-0">
              <ListBox className="outline-none flex flex-col gap-px">
                {categories.map((cat) => (
                  <ListBoxItem
                    key={cat}
                    id={cat}
                    className="relative flex items-center gap-3 pl-2 pr-4 py-2 select-none rounded-[12px] font-ui text-xl cursor-pointer outline-none data-[hovered]:bg-surface-02 data-[hovered]:z-10 focus-visible:-outline-offset-2 data-[selected]:bg-surface-02 dark:data-[selected]:shadow-[0_0_0_1px_var(--color-fern-1200),inset_0_1px_var(--color-fern-1000)]"
                  >
                    <BadgeIcon
                      icon={categoryConfig[cat].icon}
                      size={24}
                      theme={categoryConfig[cat].theme}
                    />
                    {cat}
                  </ListBoxItem>
                ))}
              </ListBox>
            </Popover>
          </Select>
        </h2>

        <Link
          href={config.link}
          className="flex gap-1 text-base md:text-xl font-ui lowercase transition duration-200 hover:text-link-hover"
        >
          {config.linkText}
        </Link>
      </header>
      <div className="grid col-margin sm:col-content gap-4 md:gap-8 max-sm:grid-flow-col max-sm:auto-cols-auto max-sm:overflow-auto max-sm:snap-x max-sm:snap-always max-sm:overscroll-x-contain md:grid-cols-2 xl:grid-cols-3 max-sm:px-8 max-sm:py-8 max-sm:-my-8">
        {filteredPosts.map((post) => (
          <Card
            size="container"
            frontmatter={post}
            image={false}
            key={post._id}
            className="max-sm:w-[calc(100vw-48px)] max-sm:snap-center md:col-span-1"
          />
        ))}
      </div>
    </>
  )
}
