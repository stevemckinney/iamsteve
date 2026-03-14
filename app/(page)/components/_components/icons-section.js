'use client'

import { useState } from 'react'
import { TabList, TabPanel, Tab, Tabs } from 'react-aria-components'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'
import { Section } from './section'

const icons16 = [
  'about',
  'airplane',
  'align-centre',
  'align-left',
  'align-right',
  'all',
  'angle-down',
  'angle-left',
  'angle-right',
  'angle-up',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'autolayout-h',
  'autolayout-v',
  'blog',
  'bolt',
  'book',
  'box',
  'buy-coffee',
  'calendar',
  'caret-down',
  'caret-left',
  'caret-right',
  'caret-up',
  'category',
  'checkbox',
  'checkmark',
  'checkmark-underline',
  'clipboard',
  'clipboard-success',
  'close',
  'code',
  'collections',
  'comment',
  'component',
  'component-instance',
  'contact',
  'copy',
  'copy-alternate',
  'copy-success',
  'css',
  'cursor',
  'date',
  'design',
  'download',
  'dropdown',
  'enlarge',
  'envelope',
  'expand',
  'external',
  'external-1',
  'folder',
  'font',
  'font-outline',
  'frame',
  'home',
  'link',
  'move',
  'navigation',
  'newsletter',
  'note',
  'note-pencil',
  'note-plus',
  'notepad',
  'palette',
  'pen',
  'person',
  'play',
  'plus',
  'puzzle',
  'rectangle',
  'save',
  'saved',
  'search',
  'search-small',
  'settings',
  'shadow',
  'shapes',
  'share',
  'sidebar-left',
  'sidebar-right',
  'star',
  'time',
  'timer',
  'type',
  'vector-square',
  'views',
]

const icons24 = [
  'accessibility',
  'airplane',
  'align-centre',
  'align-left',
  'align-right',
  'all',
  'angle-down',
  'angle-left',
  'angle-right',
  'angle-up',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'bee',
  'bolt',
  'book',
  'bookmark',
  'box',
  'bulb',
  'calendar',
  'caret-down',
  'caret-left',
  'caret-right',
  'caret-up',
  'checkmark',
  'checkmark-underline',
  'clipboard',
  'clipboard-success',
  'clock-reverse',
  'close',
  'code',
  'collections',
  'comment',
  'component',
  'copy',
  'css',
  'cursor',
  'design',
  'download',
  'enlarge',
  'envelope',
  'external',
  'folder',
  'font',
  'font-outline',
  'foundry',
  'frame',
  'home',
  'link',
  'move',
  'navigation',
  'note',
  'note-pencil',
  'note-plus',
  'notepad',
  'palette',
  'pen',
  'person',
  'play',
  'plus',
  'publication',
  'puzzle',
  'rectangle',
  'search',
  'settings',
  'shadow',
  'shapes',
  'share',
  'sidebar-bottom',
  'sidebar-bottom-closed',
  'sidebar-left',
  'sidebar-left-closed',
  'sidebar-right',
  'sidebar-right-closed',
  'square-info',
  'star',
  'star-square',
  'timer',
  'type',
  'vector-square',
  'views',
  'website',
]

function IconGrid({ icons, size }) {
  const [copied, setCopied] = useState(null)

  const handleCopy = (name) => {
    navigator.clipboard?.writeText(`<Icon icon="${name}" size={${size}} />`)
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
      {icons.map((name) => (
        <button
          key={name}
          type="button"
          className={cn(
            'flex flex-col items-center gap-1.5 p-2 rounded-sm',
            'transition-colors duration-150 hover:bg-surface-02',
            copied === name && 'bg-fern-0'
          )}
          onClick={() => handleCopy(name)}
          title={name}
        >
          <Icon
            icon={name}
            size={size}
            variant="none"
            className="text-heading"
          />
          <span className="text-2xs text-body-60 truncate w-full text-center">
            {name}
          </span>
        </button>
      ))}
    </div>
  )
}

export default function IconsSection() {
  return (
    <Section
      id="icons"
      title="Icons"
      description="SVG sprite system with two sizes. Click any icon to copy the JSX usage. Icons support four variants: default, header, on-light, and none."
    >
      <Tabs className="flex flex-col gap-4">
        <TabList
          className="flex gap-1 bg-surface-02 p-1 rounded-sm w-fit"
          aria-label="Icon sizes"
        >
          <Tab
            id="icons-16"
            className="px-4 py-2 text-sm font-display font-variation-bold lowercase rounded-xs cursor-pointer transition-colors duration-150 outline-none selected:bg-surface selected:shadow-reduced selected:text-heading text-body-80 hover:text-heading"
          >
            16px
          </Tab>
          <Tab
            id="icons-24"
            className="px-4 py-2 text-sm font-display font-variation-bold lowercase rounded-xs cursor-pointer transition-colors duration-150 outline-none selected:bg-surface selected:shadow-reduced selected:text-heading text-body-80 hover:text-heading"
          >
            24px
          </Tab>
        </TabList>

        <TabPanel
          id="icons-16"
          className="bg-surface rounded-lg shadow-placed p-4"
        >
          <IconGrid icons={icons16} size={16} />
        </TabPanel>

        <TabPanel
          id="icons-24"
          className="bg-surface rounded-lg shadow-placed p-4"
        >
          <IconGrid icons={icons24} size={24} />
        </TabPanel>
      </Tabs>
    </Section>
  )
}
