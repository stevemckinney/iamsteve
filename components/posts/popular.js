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

const categoryConfig = {
  Design: {
    accent: 'text-rio',
    link: '/category/design',
    linkText: 'Explore design',
    icon: 'design',
  },
  Code: {
    accent: 'text-dandelion',
    link: '/category/code',
    linkText: 'Explore code',
    icon: 'code',
  },
  Everything: {
    accent: 'text-cornflour',
    link: '/blog',
    linkText: 'View the archive',
    icon: 'folder',
  },
}

const categories = ['Design', 'Code', 'Everything']

export default function PopularPosts({ posts }) {
  const [category, setCategory] = useState('Design')

  const filteredPosts =
    category === 'Everything'
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
              className={`${config.accent} inline-flex items-center gap-1 cursor-pointer lowercase`}
            >
              <SelectValue>{() => category}</SelectValue>
              <Icon
                icon="angle-down"
                size={24}
                variant="none"
                aria-hidden="true"
              />
            </Button>

            <Popover className="bg-surface p-2 rounded-lg shadow-lg entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out">
              <ListBox className="outline-none">
                {categories.map((cat) => (
                  <ListBoxItem
                    key={cat}
                    id={cat}
                    className="relative flex items-center gap-2 px-3 py-2 rounded-md text-lg font-ui lowercase text-faded-02 font-medium focus:bg-neutral-01-50 data-[selected]:text-text outline-none select-none cursor-pointer"
                  >
                    <Icon
                      icon={categoryConfig[cat].icon}
                      size={24}
                      variant="none"
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
