'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'
import { Showcase } from './_showcase'

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
        className="flex items-center justify-center w-full h-full min-h-[40px]"
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
        'flex items-center justify-center w-full h-full min-h-[40px] rounded-xs cursor-pointer',
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

function SizeToggle({ activeSize, onChange, only16Count, only24Count }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex rounded-md overflow-hidden border border-neutral-01-300/20 dark:border-neutral-01-700/20">
        <button
          type="button"
          className={cn(
            'px-3 py-1.5 text-xs font-mono cursor-pointer transition-colors',
            activeSize === 16
              ? 'bg-fern-600 text-white dark:bg-fern-500'
              : 'bg-surface text-body-60 hover:bg-neutral-01-100 dark:hover:bg-neutral-01-800'
          )}
          onClick={() => onChange(16)}
        >
          16px
        </button>
        <button
          type="button"
          className={cn(
            'px-3 py-1.5 text-xs font-mono cursor-pointer transition-colors border-l border-neutral-01-300/20 dark:border-neutral-01-700/20',
            activeSize === 24
              ? 'bg-fern-600 text-white dark:bg-fern-500'
              : 'bg-surface text-body-60 hover:bg-neutral-01-100 dark:hover:bg-neutral-01-800'
          )}
          onClick={() => onChange(24)}
        >
          24px
        </button>
      </div>
      <span className="text-2xs text-body-40">
        {activeSize === 16
          ? `${only16Count} icons only in this set`
          : `${only24Count} icons only in this set`}{' '}
        &middot;{' '}
        {activeSize === 16
          ? `${only24Count} missing`
          : `${only16Count} missing`}
      </span>
    </div>
  )
}

export default function IconsSection() {
  const [copied, setCopied] = useState(null)
  const [activeSize, setActiveSize] = useState(16)

  const handleCopy = (name, size) => {
    navigator.clipboard?.writeText(`<Icon icon="${name}" size={${size}} />`)
    setCopied(`${name}-${size}`)
    setTimeout(() => setCopied(null), 1500)
  }

  const only16 = allIcons.filter((n) => set16.has(n) && !set24.has(n))
  const only24 = allIcons.filter((n) => !set16.has(n) && set24.has(n))
  const activeSet = activeSize === 16 ? set16 : set24

  return (
    <Showcase
      title="Icons"
      description={`SVG sprite system with ${allIcons.length} unique icons across two sizes. Toggle between sizes to compare coverage. Click to copy JSX.`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-display font-variation-bold text-lg lowercase text-heading">
            Icon specimen
          </h3>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <SizeToggle
            activeSize={activeSize}
            onChange={setActiveSize}
            only16Count={only16.length}
            only24Count={only24.length}
          />
          {/* Grid key */}
          <div className="flex items-center gap-4 text-2xs text-body-60">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full border border-dashed border-neutral-01-300/25 dark:border-neutral-01-700/25" />
              <span>Missing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-xs bg-fern-100 dark:bg-fern-1100" />
              <span>Copied</span>
            </div>
          </div>
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            }}
          >
            {allIcons.map((name) => {
              const available = activeSet.has(name)

              return (
                <div
                  key={name}
                  className={cn(
                    'flex flex-col border-r border-b border-neutral-01-300/10 dark:border-neutral-01-700/10',
                    !available && 'bg-rio-100/20 dark:bg-rio-1100/10'
                  )}
                >
                  <div className="flex items-center justify-center px-3 pt-3 pb-1">
                    <IconCell
                      name={name}
                      size={activeSize}
                      available={available}
                      copied={copied === `${name}-${activeSize}`}
                      onCopy={handleCopy}
                    />
                  </div>
                  <div className="px-2 pb-2.5 pt-0.5">
                    <span
                      className={cn(
                        'block text-center font-mono text-2xs truncate',
                        available
                          ? 'text-body-60'
                          : 'text-rio-400 dark:text-rio-600'
                      )}
                    >
                      {name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-display font-variation-bold text-lg lowercase text-heading">
            Missing from 16px
          </h3>
          <p className="text-body-80 text-sm max-w-prose">{`${only24.length} icons only available at 24px.`}</p>
        </div>
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
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-display font-variation-bold text-lg lowercase text-heading">
            Missing from 24px
          </h3>
          <p className="text-body-80 text-sm max-w-prose">{`${only16.length} icons only available at 16px.`}</p>
        </div>
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
      </div>
    </Showcase>
  )
}
