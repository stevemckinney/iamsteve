// components/posts/popular.js: the most viewed posts, with a select for
// Design, Code or All. The cards stay Astro’s: each list arrives as a named
// slot of static HTML, and the island shows the one chosen
import { Fragment, useState } from 'react'
import {
  Select,
  SelectValue,
  Button,
  Popover,
  ListBox,
  ListBoxItem,
} from 'react-aria-components'

import { cn } from '@/lib/utils'
import Icon from './icon.jsx'
import Locale from './locale.jsx'

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

// BadgeIcon from components/badge.js, in the three themes the options use
const badgeThemes = {
  rio: {
    dark: 'dark:bg-rio-300 dark:ring-1 dark:ring-rio-300 dark:group-hover/badge:ring-rio-100',
    text: 'text-[light-dark(var(--color-rio-500),var(--color-rio-900))]',
  },
  dandelion: {
    dark: 'dark:bg-dandelion-300 dark:ring-1 dark:ring-dandelion-200 dark:group-hover/badge:ring-dandelion-0',
    text: 'text-[light-dark(var(--color-dandelion-600),var(--color-dandelion-900))]',
  },
  cornflour: {
    dark: 'dark:bg-cornflour-500 dark:ring-1 dark:ring-cornflour-300 dark:group-hover/badge:ring-cornflour-100',
    text: 'text-[light-dark(var(--color-cornflour-700),var(--color-cornflour-900))]',
  },
}

function BadgeIcon({ icon, theme }) {
  return (
    <span
      className={cn(
        'flex-[0_0_auto] bg-surface',
        badgeThemes[theme].dark,
        'shadow-reduced dark:shadow-none',
        'group-hover/badge:shadow-picked',
        'group-active/badge:shadow-reduced',
        'flex items-center justify-center',
        'transition-all duration-100 ease-linear',
        'w-8 h-8 rounded-sm',
        badgeThemes[theme].text
      )}
    >
      <Icon className="text-current" icon={icon} size={24} variant="default" />
    </span>
  )
}

export default function Popular({ design, code, all }) {
  const [category, setCategory] = useState('Design')
  const lists = { Design: design, Code: code, All: all }
  const config = categoryConfig[category]

  return (
    <Locale>
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
                    className="relative flex items-center gap-3 pl-2 pr-4 py-2 select-none rounded-[12px] font-ui text-xl cursor-pointer outline-none data-[focused]:bg-surface-02 data-[focused]:z-10 focus-visible:-outline-offset-2 data-[selected]:bg-surface-02 dark:data-[selected]:shadow-[0_0_0_1px_var(--color-fern-1200),inset_0_1px_var(--color-fern-1000)]"
                  >
                    <BadgeIcon
                      icon={categoryConfig[cat].icon}
                      theme={categoryConfig[cat].theme}
                    />
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
        {/* Keyed, so a new choice swaps the slot’s HTML in whole */}
        <Fragment key={category}>{lists[category]}</Fragment>
      </div>
    </Locale>
  )
}
