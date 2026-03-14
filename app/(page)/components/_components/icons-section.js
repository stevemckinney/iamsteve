'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'
import { Section, Subsection } from './section'

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

const set16 = new Set(icons16)
const set24 = new Set(icons24)
const allIcons = [...new Set([...icons16, ...icons24])].sort()

function IconCell({ name, size, available, copied, onCopy }) {
  if (!available) {
    return (
      <div
        className="flex items-center justify-center w-full h-full"
        title={`No ${size}px version`}
      >
        <span className="w-3 h-3 rounded-full border border-dashed border-neutral-01-300/25 dark:border-neutral-01-700/25" />
      </div>
    )
  }

  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center w-full h-full rounded-xs cursor-pointer',
        'transition-colors duration-100',
        'hover:bg-fern-100/40 dark:hover:bg-fern-1100/40',
        copied && 'bg-fern-100 dark:bg-fern-1100'
      )}
      onClick={() => onCopy(name, size)}
      title={`Copy <Icon icon="${name}" size={${size}} />`}
    >
      <Icon icon={name} size={size} variant="none" className="text-heading" />
    </button>
  )
}

export default function IconsSection() {
  const [copied, setCopied] = useState(null)

  const handleCopy = (name, size) => {
    navigator.clipboard?.writeText(`<Icon icon="${name}" size={${size}} />`)
    setCopied(`${name}-${size}`)
    setTimeout(() => setCopied(null), 1500)
  }

  const only16 = allIcons.filter((n) => set16.has(n) && !set24.has(n))
  const only24 = allIcons.filter((n) => !set16.has(n) && set24.has(n))

  return (
    <Section
      id="icons"
      title="Icons"
      description={`SVG sprite system with ${allIcons.length} unique icons across two sizes. Click to copy JSX. Dashed circles indicate a missing size.`}
    >
      <Subsection title="Icon specimen">
        {/* Grid key */}
        <div className="flex items-center gap-4 text-2xs text-body-60 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full border border-dashed border-neutral-01-300/25 dark:border-neutral-01-700/25" />
            <span>Missing size</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-xs bg-fern-100 dark:bg-fern-1100" />
            <span>Copied</span>
          </div>
          <span className="text-body-40">
            {only16.length} only 16px &middot; {only24.length} only 24px
          </span>
        </div>

        {/* Specimen grid */}
        <div
          className="rounded-lg overflow-hidden shadow-placed bg-surface"
          style={{
            '--icon-fill': 'transparent',
            '--icon-fill-bg': 'transparent',
          }}
        >
          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))',
            }}
          >
            {allIcons.map((name) => {
              const has16 = set16.has(name)
              const has24 = set24.has(name)
              const isMissingSomething = !has16 || !has24

              return (
                <div
                  key={name}
                  className={cn(
                    'flex flex-col border-r border-b border-neutral-01-300/10 dark:border-neutral-01-700/10',
                    isMissingSomething && 'bg-rio-100/20 dark:bg-rio-1100/10'
                  )}
                >
                  {/* Icon pair area */}
                  <div className="flex items-center justify-center gap-3 px-3 pt-4 pb-2 min-h-[52px]">
                    <IconCell
                      name={name}
                      size={16}
                      available={has16}
                      copied={copied === `${name}-16`}
                      onCopy={handleCopy}
                    />
                    <div className="w-px h-6 bg-neutral-01-300/10 dark:bg-neutral-01-700/10" />
                    <IconCell
                      name={name}
                      size={24}
                      available={has24}
                      copied={copied === `${name}-24`}
                      onCopy={handleCopy}
                    />
                  </div>
                  {/* Size labels */}
                  <div className="flex justify-center gap-3 px-3">
                    <span
                      className={cn(
                        'text-center text-[9px] uppercase tracking-wider',
                        has16
                          ? 'text-body-40'
                          : 'text-rio-400 dark:text-rio-600'
                      )}
                    >
                      16
                    </span>
                    <span className="w-px" />
                    <span
                      className={cn(
                        'text-center text-[9px] uppercase tracking-wider',
                        has24
                          ? 'text-body-40'
                          : 'text-rio-400 dark:text-rio-600'
                      )}
                    >
                      24
                    </span>
                  </div>
                  {/* Icon name */}
                  <div className="px-2 pb-3 pt-1">
                    <span className="block text-center font-mono text-2xs text-body-60 truncate">
                      {name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Subsection>

      <Subsection
        title="Missing from 16px"
        description={`${only24.length} icons only available at 24px.`}
      >
        <div className="flex flex-wrap gap-1.5">
          {only24.map((name) => (
            <span
              key={name}
              className="font-mono text-2xs text-rio-600 bg-rio-100/50 dark:text-rio-300 dark:bg-rio-1100/30 px-2 py-1 rounded-xs"
            >
              {name}
            </span>
          ))}
        </div>
      </Subsection>

      <Subsection
        title="Missing from 24px"
        description={`${only16.length} icons only available at 16px.`}
      >
        <div className="flex flex-wrap gap-1.5">
          {only16.map((name) => (
            <span
              key={name}
              className="font-mono text-2xs text-rio-600 bg-rio-100/50 dark:text-rio-300 dark:bg-rio-1100/30 px-2 py-1 rounded-xs"
            >
              {name}
            </span>
          ))}
        </div>
      </Subsection>
    </Section>
  )
}
