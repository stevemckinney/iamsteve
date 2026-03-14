'use client'

import React, { useState } from 'react'
import { TabList, TabPanel, Tab, Tabs } from 'react-aria-components'
import { Section, Subsection, Preview, CodeExample } from './section'
import PropsTable from './props-table'
import Icon from '@/components/icon'
import Image from '@/components/image'
import { Chat, ChatMessage } from '@/components/chat'

// ─── Shortcut ─────────────────────────────────────────────────
function ShortcutDemo() {
  const specialKeys = {
    cmd: { symbol: '\u2318', label: 'Command' },
    shift: { symbol: '\u21E7', label: 'Shift' },
    opt: { symbol: '\u2325', label: 'Option' },
    ctrl: { symbol: '\u2303', label: 'Control' },
    tab: { symbol: '\u21E5', label: 'Tab' },
    esc: { symbol: '\u238B', label: 'Esc' },
    delete: { symbol: '\u232B', label: 'Delete' },
    return: { symbol: '\u21B5', label: 'Return' },
    space: { symbol: '\u2423', label: 'Space' },
  }

  return (
    <Section
      id="shortcut"
      title="Shortcut"
      description="Renders keyboard shortcuts with proper symbols for modifier keys. Supports all macOS modifier keys and common special keys."
    >
      <Subsection title="Examples">
        <Preview className="flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-2xs font-mono text-body-60">Single keys</span>
            <div className="flex gap-4">
              {[
                'cmd',
                'shift',
                'opt',
                'ctrl',
                'tab',
                'esc',
                'delete',
                'return',
              ].map((key) => (
                <kbd
                  key={key}
                  className="relative flex flex-col gap-2 min-w-12 items-center justify-center px-2 py-2 bg-neutral-01-100 shadow-picked rounded-sm text-fern-900"
                >
                  <span className="text-2xl leading-none">
                    {specialKeys[key].symbol}
                  </span>
                  <span className="text-xs leading-none font-sans">
                    {specialKeys[key].label}
                  </span>
                </kbd>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xs font-mono text-body-60">
              Combinations
            </span>
            <kbd className="flex gap-2" aria-label="Command S" role="text">
              <kbd className="relative flex flex-col gap-2 min-w-20 items-end justify-between px-2 py-2 bg-neutral-01-100 shadow-picked rounded-sm text-fern-900">
                <span className="text-2xl leading-none">{'\u2318'}</span>
                <span className="text-xs leading-none font-sans">Command</span>
              </kbd>
              <kbd className="relative flex flex-col gap-2 min-w-12 items-center justify-center px-2 py-2 bg-neutral-01-100 shadow-picked rounded-sm text-fern-900">
                <span className="text-2xl leading-none">S</span>
              </kbd>
            </kbd>
          </div>
        </Preview>
      </Subsection>

      <Subsection title="Key mapping">
        <div className="bg-surface rounded-lg shadow-placed overflow-hidden">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-0 p-4">
            {Object.entries(specialKeys).map(([key, { symbol, label }]) => (
              <div key={key} className="flex items-center gap-2 py-1.5">
                <span className="text-lg w-6 text-center">{symbol}</span>
                <span className="font-mono text-xs text-body-60">{key}</span>
              </div>
            ))}
          </div>
        </div>
      </Subsection>

      <CodeExample>{`{/* In MDX posts */}
<Shortcut>cmd S</Shortcut>
<Shortcut>cmd shift P</Shortcut>
<Shortcut>ctrl alt delete</Shortcut>`}</CodeExample>
    </Section>
  )
}

// ─── ComparisonImages ─────────────────────────────────────────
function ComparisonImagesDemo() {
  return (
    <Section
      id="comparison-images"
      title="ComparisonImages"
      description="Segmented control for toggling between image states. Commonly used for before/after comparisons in blog posts. Built with accessible tab roles."
    >
      <Subsection title="Features">
        <Preview className="flex-col gap-2">
          <ul className="text-sm text-body-80 list-inside list-[square] flex flex-col gap-1">
            <li>Segmented control with up to 5 options</li>
            <li>Smooth opacity crossfade transitions</li>
            <li>Keyboard navigation (Enter/Space to cycle)</li>
            <li>ARIA tablist, tab, and tabpanel roles</li>
            <li>Optional context label</li>
            <li>Default option support</li>
          </ul>
        </Preview>
      </Subsection>

      <PropsTable
        props={[
          {
            name: 'children',
            type: 'ReactNode',
            description: 'Image components to compare (one per option)',
          },
          {
            name: 'description',
            type: 'string',
            default: "'Compare states'",
            description: 'Accessible label for the region',
          },
          {
            name: 'options',
            type: 'array',
            default: "[{label:'Before'},{label:'After'}]",
            description:
              'Array of {label, value?, default?} for the segmented control',
          },
          {
            name: 'contextLabel',
            type: 'string',
            description: 'Optional label shown beside the segmented control',
          },
        ]}
      />

      <CodeExample>{`{/* In MDX - basic before/after */}
<Images compare={true} options={[
  { label: 'Before' },
  { label: 'After', default: true }
]}>
  <Image src="/images/blog/before.png" width={960} height={540} />
  <Image src="/images/blog/after.png" width={960} height={540} />
</Images>

{/* Multiple states with context label */}
<Images compare={true}
  options={[
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' }
  ]}
  contextLabel="Progression"
>
  <Image src="/images/blog/step1.png" width={960} height={540} />
  <Image src="/images/blog/step2.png" width={960} height={540} />
  <Image src="/images/blog/step3.png" width={960} height={540} />
</Images>`}</CodeExample>
    </Section>
  )
}

// ─── Blockquote ───────────────────────────────────────────────
function BlockquoteDemo() {
  return (
    <Section
      id="blockquote"
      title="Blockquote"
      description="Custom blockquote with three style variants. The default markdown blockquote renders with a cornflour border."
    >
      <Subsection title="Variants">
        <Preview className="flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">
              default (markdown &gt;)
            </span>
            <blockquote className="border-l-2 border-l-cornflour-500 pl-4 -ml-4">
              <p className="text-body-80">
                A standard markdown blockquote with a cornflour left border.
              </p>
            </blockquote>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">notice</span>
            <blockquote className="border-l-2 border-l-fern-500 pl-4 -ml-4">
              <p className="text-body-80">
                A notice-style callout with a fern border. Good for tips and
                important notes.
              </p>
            </blockquote>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">
              afterthought
            </span>
            <blockquote className="md:text-lg lg:text-xl border-l border-l-neutral-01-500/20 pl-4 mb-3 text-lg text-ui-body/60 italic">
              <p>A lighter, italic aside for tangential thoughts.</p>
            </blockquote>
          </div>
        </Preview>
      </Subsection>

      <CodeExample>{`{/* Standard markdown blockquote */}
> This renders with cornflour border

{/* Styled variants via JSX */}
<Blockquote style="notice">
  Important tip here
</Blockquote>

<Blockquote style="afterthought">
  A tangential thought
</Blockquote>`}</CodeExample>
    </Section>
  )
}

// ─── Gallery ──────────────────────────────────────────────────
function GalleryDemo() {
  return (
    <Section
      id="gallery"
      title="Gallery"
      description="Grid-based image gallery for showing collections of icons, screenshots, or examples. Uses a 6-column dense grid."
    >
      <CodeExample>{`{/* In MDX */}
<Gallery>
  <GalleryFigure className="col-span-2">
    <Image src="/images/example.png" width={200} height={200} />
    <GalleryFigcaption>
      Caption with optional [link](/)
    </GalleryFigcaption>
  </GalleryFigure>
  <GalleryFigure className="col-span-4">
    <Image src="/images/wide.png" width={400} height={200} />
  </GalleryFigure>
</Gallery>`}</CodeExample>

      <PropsTable
        props={[
          {
            name: 'Gallery',
            type: 'wrapper',
            description: '6-column dense grid container',
          },
          {
            name: 'GalleryFigure',
            type: 'figure',
            description:
              'Grid item with surface background and shadow. Use className for col-span.',
          },
          {
            name: 'GalleryFigcaption',
            type: 'figcaption',
            description: 'Caption below the figure content',
          },
        ]}
      />
    </Section>
  )
}

// ─── LinkFigma / LinkGithub ───────────────────────────────────
function LinkButtonsDemo() {
  return (
    <Section
      id="link-buttons"
      title="LinkFigma & LinkGithub"
      description="Styled button-like links with service icons. Used in blog posts to link to source files or demos."
    >
      <Preview className="gap-4">
        <span className="flex flex-1 justify-center items-center gap-2 select-none font-ui text-base/tight lowercase text-center button-dandelion max-w-fit">
          <Icon icon="figma" size={16} className="text-current shrink-0" />
          View in Figma
        </span>
        <span className="flex flex-1 justify-center items-center gap-2 select-none font-ui text-base/tight lowercase text-center button-dandelion max-w-fit">
          <Icon icon="github" size={16} className="text-current shrink-0" />
          View on GitHub
        </span>
      </Preview>

      <CodeExample>{`{/* In MDX posts */}
<LinkFigma href="https://figma.com/...">
  View in Figma
</LinkFigma>

<LinkGithub href="https://github.com/...">
  View on GitHub
</LinkGithub>`}</CodeExample>
    </Section>
  )
}

// ─── Demo ─────────────────────────────────────────────────────
function DemoComponentDemo() {
  return (
    <Section
      id="demo"
      title="Demo"
      description="Iframe embed for live demos and interactive examples. Supports custom zoom scaling for responsive previews."
    >
      <PropsTable
        props={[
          {
            name: 'src',
            type: 'string',
            description: 'URL to embed in the iframe',
          },
          {
            name: 'className',
            type: 'string',
            description:
              'Container classes (defaults to dark background with padding)',
          },
          {
            name: 'zoom',
            type: 'string',
            default: "'.5'",
            description: 'CSS scale factor for the iframe content',
          },
        ]}
      />

      <CodeExample>{`{/* In MDX posts */}
<Demo src="https://example.com/demo" />

{/* Custom zoom for larger content */}
<Demo src="/demos/responsive" zoom=".75" />`}</CodeExample>
    </Section>
  )
}

// ─── Remark plugins ───────────────────────────────────────────
function RemarkPluginsDemo() {
  return (
    <Section
      id="remark-plugins"
      title="Remark plugins"
      description="Custom remark and rehype plugins that transform MDX content during build."
    >
      <Tabs className="flex flex-col gap-4">
        <TabList
          className="flex gap-1 bg-surface-02 p-1 rounded-sm w-fit"
          aria-label="Plugin documentation"
        >
          <Tab
            id="remark-chat-tab"
            className="px-4 py-2 text-sm font-display font-variation-bold lowercase rounded-xs cursor-pointer transition-colors duration-150 outline-none selected:bg-surface selected:shadow-reduced selected:text-heading text-body-80 hover:text-heading"
          >
            remark-chat
          </Tab>
          <Tab
            id="remark-code-title-tab"
            className="px-4 py-2 text-sm font-display font-variation-bold lowercase rounded-xs cursor-pointer transition-colors duration-150 outline-none selected:bg-surface selected:shadow-reduced selected:text-heading text-body-80 hover:text-heading"
          >
            remark-code-title
          </Tab>
          <Tab
            id="rehype-heading-links-tab"
            className="px-4 py-2 text-sm font-display font-variation-bold lowercase rounded-xs cursor-pointer transition-colors duration-150 outline-none selected:bg-surface selected:shadow-reduced selected:text-heading text-body-80 hover:text-heading"
          >
            rehype-heading-links
          </Tab>
        </TabList>

        <TabPanel id="remark-chat-tab" className="flex flex-col gap-4">
          <Preview className="flex-col gap-3">
            <p className="text-sm text-body-80">
              Transforms{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                chat
              </code>{' '}
              code blocks into Chat/ChatMessage JSX components. Consecutive
              lines with the same alignment are merged.
            </p>
          </Preview>
          <CodeExample>{`\`\`\`chat title="Claude"
L: hello how are you
L: what have you been up to
R: hello I'm good thank you
AI: here's a suggestion for you
\`\`\`

Prefixes:
  L:  → left-aligned (received message)
  R:  → right-aligned (sent message)
  AI: → AI response (no background, bordered)`}</CodeExample>
        </TabPanel>

        <TabPanel id="remark-code-title-tab" className="flex flex-col gap-4">
          <Preview className="flex-col gap-3">
            <p className="text-sm text-body-80">
              Adds a title bar above code blocks when a filename is specified
              after the language. Wraps both title and code in a container div.
            </p>
          </Preview>
          <CodeExample>{`\`\`\`javascript:utils.js
// This gets a title bar showing "utils.js"
export function add(a, b) {
  return a + b
}
\`\`\`

// Syntax: \`\`\`language:filename
// The colon separates the language from the title`}</CodeExample>
        </TabPanel>

        <TabPanel id="rehype-heading-links-tab" className="flex flex-col gap-4">
          <Preview className="flex-col gap-3">
            <p className="text-sm text-body-80">
              Automatically wraps h2&ndash;h6 headings with anchor links and a
              link icon. Requires rehype-slug to run first to generate heading
              IDs.
            </p>
          </Preview>
          <CodeExample>{`{/* Input markdown */}
## My heading

{/* Output HTML */}
<h2 id="my-heading">
  <a href="#my-heading" class="fragment-link">
    <svg class="fragment-icon">...</svg>
  </a>
  My heading
</h2>`}</CodeExample>
        </TabPanel>
      </Tabs>
    </Section>
  )
}

export {
  ShortcutDemo,
  ComparisonImagesDemo,
  BlockquoteDemo,
  GalleryDemo,
  LinkButtonsDemo,
  DemoComponentDemo,
  RemarkPluginsDemo,
}
