'use client'

import { Section, Subsection, DemoCard, CodeExample } from './section'
import PropsTable from './props-table'

import Badge from '@/components/badge'
import Button from '@/components/button'
import Card from '@/components/card'
import { Chat, ChatMessage } from '@/components/chat'
import Chip from '@/components/chip'
import DateComponent from '@/components/date'
import Icon from '@/components/icon'
import { Modal } from '@/components/modal'
import Notepad from '@/components/notepad'
import Pagination from '@/components/pagination'
import {
  Star,
  Pencil,
  Terminal,
  Envelope,
  Cursor,
  Figma,
} from '@/components/illustration'
import { Button as AriaButton } from 'react-aria-components'

// ─── Badge ────────────────────────────────────────────────────
function BadgeDemo() {
  const themes = [
    'rio',
    'dandelion',
    'lavender',
    'magenta',
    'grass',
    'fern',
    'moss',
    'neutral-01',
    'neutral-02',
    'cornflour',
  ]
  const icons = [
    'pen',
    'code',
    'vector-square',
    'play',
    'css',
    'settings',
    'puzzle',
    'folder',
    'type',
    'palette',
  ]

  return (
    <Section
      id="badge"
      title="Badge"
      description="Icon badge with text label. Supports link and static variants with themed colours."
    >
      <DemoCard>
        <DemoCard.Preview className="flex-col gap-6">
          <Subsection title="Themes">
            <div className="flex flex-wrap gap-4">
              {themes.map((theme, i) => (
                <Badge key={theme} theme={theme} iconStart={icons[i]} size={16}>
                  {theme}
                </Badge>
              ))}
            </div>
          </Subsection>
          <Subsection title="Sizes">
            <div className="flex gap-6">
              <Badge theme="cornflour" iconStart="palette" size={16}>
                Small (16)
              </Badge>
              <Badge theme="cornflour" iconStart="palette" size={24}>
                Large (24)
              </Badge>
            </div>
          </Subsection>
          <Subsection title="As link">
            <div className="flex gap-4">
              <Badge
                theme="rio"
                iconStart="pen"
                size={16}
                href="/category/design"
              >
                Design
              </Badge>
              <Badge
                theme="dandelion"
                iconStart="code"
                size={16}
                href="/category/code"
              >
                Code
              </Badge>
            </div>
          </Subsection>
        </DemoCard.Preview>
        <DemoCard.Split>
          <DemoCard.Docs>
            <PropsTable
              props={[
                {
                  name: 'children',
                  type: 'ReactNode',
                  description: 'Label text',
                },
                {
                  name: 'theme',
                  type: 'string',
                  default: "'cornflour'",
                  description:
                    'Colour theme: rio, dandelion, lavender, magenta, grass, fern, moss, neutral-01, neutral-02, cornflour, text',
                },
                {
                  name: 'size',
                  type: '16 | 24',
                  default: '16',
                  description: 'Icon and badge size',
                },
                {
                  name: 'iconStart',
                  type: 'string',
                  description: 'Icon name from the sprite system',
                },
                {
                  name: 'href',
                  type: 'string',
                  description: 'Makes the badge a link',
                },
                {
                  name: 'className',
                  type: 'string',
                  description: 'Additional CSS classes',
                },
              ]}
            />
          </DemoCard.Docs>
          <DemoCard.Usage>
            <CodeExample>{`<Badge theme="rio" iconStart="pen" size={16} href="/category/design">
  Design
</Badge>`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

// ─── Button ───────────────────────────────────────────────────
function ButtonDemo() {
  return (
    <Section
      id="button"
      title="Button"
      description="Flexible button component that renders as a button, internal link, or external link depending on the href prop."
    >
      <DemoCard>
        <DemoCard.Preview className="gap-4">
          <Button theme="dandelion" className="px-6 py-3 rounded-sm">
            Button
          </Button>
          <Button theme="dandelion" className="px-6 py-3 rounded-sm" href="/">
            Internal link
          </Button>
          <Button
            theme="dandelion"
            className="px-6 py-3 rounded-sm"
            href="#button"
          >
            Anchor link
          </Button>
        </DemoCard.Preview>
        <DemoCard.Split>
          <DemoCard.Docs>
            <PropsTable
              props={[
                {
                  name: 'children',
                  type: 'ReactNode',
                  description: 'Button content',
                },
                {
                  name: 'href',
                  type: 'string',
                  description:
                    'Internal path, anchor, or external URL. Determines rendered element.',
                },
                {
                  name: 'theme',
                  type: 'string',
                  description: "Visual style variant (e.g. 'dandelion')",
                },
                {
                  name: 'className',
                  type: 'string',
                  description: 'Additional CSS classes',
                },
              ]}
            />
          </DemoCard.Docs>
          <DemoCard.Usage>
            <CodeExample>{`<Button theme="dandelion" className="px-6 py-3 rounded-sm">
  Subscribe
</Button>

<Button theme="dandelion" href="/newsletter">
  Go to newsletter
</Button>`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

// ─── Card ─────────────────────────────────────────────────────
const dummyPost = {
  slug: 'how-to-use-colour-in-ui-design',
  date: '2025-11-20',
  title: 'How to use colour in UI design',
  summary:
    'A practical guide to choosing and applying colour palettes that work well across interfaces.',
  categories: ['Design'],
  _id: 'demo-card',
  lastmod: '2025-11-20',
  theme: '#f1e8e4',
  images: false,
  medium: null,
  tags: [],
}

function CardDemo() {
  return (
    <Section
      id="card"
      title="Card"
      description="Content card with four size variants: container, large, medium, and small. Each renders a different layout optimised for the content area."
    >
      <DemoCard>
        <DemoCard.Preview className="flex-col gap-6">
          <Subsection title="Small">
            <div className="max-w-lg">
              <Card size="small" frontmatter={dummyPost} />
            </div>
          </Subsection>
        </DemoCard.Preview>
        <DemoCard.Split>
          <DemoCard.Docs>
            <PropsTable
              props={[
                {
                  name: 'size',
                  type: "'container' | 'large' | 'medium' | 'small'",
                  description: 'Card layout variant',
                },
                {
                  name: 'frontmatter',
                  type: 'object',
                  description:
                    'Post metadata: title, summary, slug, date, categories, etc.',
                },
                {
                  name: 'image',
                  type: 'object',
                  description:
                    'Image data for the card (not used by small variant)',
                },
                {
                  name: 'className',
                  type: 'string',
                  description: 'Additional CSS classes',
                },
              ]}
            />
          </DemoCard.Docs>
          <DemoCard.Usage>
            <CodeExample>{`import Card from '@/components/card'

// Card auto-selects the right layout based on size
<Card size="large" frontmatter={post} image={image} />
<Card size="medium" frontmatter={post} image={image} />
<Card size="small" frontmatter={post} />
<Card size="container" frontmatter={post} image={image} />`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

// ─── Chat ─────────────────────────────────────────────────────
function ChatDemo() {
  return (
    <Section
      id="chat"
      title="Chat"
      description="Apple Messages-style conversation bubbles for MDX content. Supports left (received), right (sent), and AI response alignments."
    >
      <DemoCard>
        <DemoCard.Preview className="flex-col gap-6">
          <Subsection title="With title">
            <div className="max-w-md">
              <Chat title="iMessage">
                <ChatMessage align="left">hello how are you</ChatMessage>
                <ChatMessage align="left">what have you been up to</ChatMessage>
                <ChatMessage align="right">
                  hello I&rsquo;m good thank you
                </ChatMessage>
                <ChatMessage align="right">
                  just working on the blog
                </ChatMessage>
                <ChatMessage align="left">nice, sounds fun</ChatMessage>
              </Chat>
            </div>
          </Subsection>
          <Subsection title="AI responses">
            <div className="max-w-md">
              <Chat title="Claude">
                <ChatMessage align="right">
                  what colour should I use for links?
                </ChatMessage>
                <ChatMessage align="ai">
                  I&rsquo;d recommend a blue with good contrast against your
                  background.
                </ChatMessage>
              </Chat>
            </div>
          </Subsection>
        </DemoCard.Preview>
        <DemoCard.Split>
          <DemoCard.Docs>
            <PropsTable
              props={[
                {
                  name: 'title',
                  type: 'string',
                  description: 'Optional header title for the chat window',
                },
                {
                  name: 'children',
                  type: 'ReactNode',
                  description: 'ChatMessage components',
                },
                {
                  name: 'align',
                  type: "'left' | 'right' | 'ai'",
                  description: 'Message alignment (ChatMessage prop)',
                },
              ]}
            />
          </DemoCard.Docs>
          <DemoCard.Usage>
            <CodeExample>{`\`\`\`chat:iMessage
L: hello how are you
R: hello I'm good thank you
AI: here's a suggestion for you
\`\`\`

L:  left-aligned (received)
R:  right-aligned (sent)
AI: left-aligned, no background (AI response)`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

// ─── Chip ─────────────────────────────────────────────────────
function ChipDemo() {
  const themes = [
    'rio',
    'dandelion',
    'lavender',
    'magenta',
    'grass',
    'fern',
    'moss',
    'neutral-01',
    'neutral-02',
    'cornflour',
  ]
  const icons = [
    'pen',
    'code',
    'vector-square',
    'play',
    'css',
    'settings',
    'puzzle',
    'folder',
    'type',
    'palette',
  ]

  return (
    <Section
      id="chip"
      title="Chip"
      description="Compact tag-like component with icon and tinted background. Similar to Badge but with a filled background style."
    >
      <DemoCard>
        <DemoCard.Preview className="flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            {themes.map((theme, i) => (
              <Chip key={theme} theme={theme} iconStart={icons[i]} size={16}>
                {theme}
              </Chip>
            ))}
          </div>
        </DemoCard.Preview>
        <DemoCard.Docs>
          <PropsTable
            props={[
              {
                name: 'children',
                type: 'ReactNode',
                description: 'Chip label text',
              },
              { name: 'theme', type: 'string', description: 'Colour theme' },
              {
                name: 'size',
                type: '16 | 24',
                default: '16',
                description: 'Icon size',
              },
              {
                name: 'iconStart',
                type: 'string',
                description: 'Icon name',
              },
              {
                name: 'href',
                type: 'string',
                description: 'Makes the chip a link',
              },
            ]}
          />
        </DemoCard.Docs>
      </DemoCard>
    </Section>
  )
}

// ─── Date ─────────────────────────────────────────────────────
function DateDemo() {
  return (
    <Section
      id="date"
      title="Date"
      description="Formats ISO date strings using date-fns. Supports absolute and relative formatting."
    >
      <DemoCard>
        <DemoCard.Preview className="gap-6 items-center">
          <div className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">absolute</span>
            <DateComponent dateString="2024-03-14" className="text-heading" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">relative</span>
            <DateComponent
              dateString="2024-03-14"
              relative
              className="text-heading"
            />
          </div>
        </DemoCard.Preview>
        <DemoCard.Docs>
          <PropsTable
            props={[
              {
                name: 'dateString',
                type: 'string',
                description: 'ISO date string (e.g. 2024-03-14)',
              },
              {
                name: 'relative',
                type: 'boolean',
                default: 'false',
                description: 'Show relative time instead of absolute date',
              },
              {
                name: 'className',
                type: 'string',
                default: "'date'",
                description: 'CSS class name',
              },
            ]}
          />
        </DemoCard.Docs>
      </DemoCard>
    </Section>
  )
}

// ─── Icon component ───────────────────────────────────────────
function IconDemo() {
  return (
    <Section
      id="icon-component"
      title="Icon"
      description="SVG sprite-based icon component. References icons from the generated sprite sheets."
    >
      <DemoCard>
        <DemoCard.Preview className="flex-col gap-6">
          <Subsection title="Variants">
            <div className="flex gap-8 items-center">
              {['default', 'header', 'on-light', 'none'].map((variant) => (
                <div key={variant} className="flex flex-col items-center gap-2">
                  <div
                    className={
                      variant === 'on-light'
                        ? 'bg-fern-800 p-3 rounded-sm'
                        : 'p-3'
                    }
                  >
                    <Icon
                      icon="star"
                      size={24}
                      variant={variant}
                      className={variant === 'none' ? 'text-heading' : ''}
                    />
                  </div>
                  <span className="text-2xs font-mono text-body-60">
                    {variant}
                  </span>
                </div>
              ))}
            </div>
          </Subsection>
          <Subsection title="Aliases">
            <p className="text-sm text-body-80">
              Some icon names are aliased:{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                everything
              </code>
              ,{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                archive
              </code>
              ,{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                all
              </code>{' '}
              &rarr;{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                folder
              </code>
              ;{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                design
              </code>{' '}
              &rarr;{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                pen
              </code>
            </p>
          </Subsection>
        </DemoCard.Preview>
        <DemoCard.Split>
          <DemoCard.Docs>
            <PropsTable
              props={[
                {
                  name: 'icon',
                  type: 'string',
                  description: 'Icon name (filename without extension)',
                },
                {
                  name: 'size',
                  type: '16 | 24',
                  default: '24',
                  description: 'Icon size, must match the sprite folder',
                },
                {
                  name: 'variant',
                  type: "'default' | 'header' | 'on-light' | 'none'",
                  default: "'default'",
                  description:
                    'Colour variant controlling fill via CSS variables',
                },
                {
                  name: 'className',
                  type: 'string',
                  description: 'Additional CSS classes',
                },
              ]}
            />
          </DemoCard.Docs>
          <DemoCard.Usage>
            <CodeExample>{`import Icon from '@/components/icon'

<Icon icon="star" size={24} />
<Icon icon="arrow-right" size={16} variant="header" />`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

// ─── Link ─────────────────────────────────────────────────────
function LinkDemo() {
  return (
    <Section
      id="link"
      title="Link"
      description="Smart link component that auto-detects internal paths, anchor links, and external URLs to render the appropriate element."
    >
      <DemoCard>
        <DemoCard.Preview className="gap-6">
          <span className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">internal</span>
            <a href="/" className="text-link hover:text-link-hover">
              Home page
            </a>
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">anchor</span>
            <a href="#link" className="text-link hover:text-link-hover">
              Jump to section
            </a>
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-2xs font-mono text-body-60">external</span>
            <span className="text-link">Opens in new tab &nearr;</span>
          </span>
        </DemoCard.Preview>
        <DemoCard.Docs>
          <PropsTable
            props={[
              {
                name: 'href',
                type: 'string',
                description:
                  'Internal path (/...), anchor (#...), or external URL',
              },
              {
                name: '...props',
                type: 'HTMLAttributes',
                description:
                  'All standard link/anchor attributes are forwarded',
              },
            ]}
          />
        </DemoCard.Docs>
      </DemoCard>
    </Section>
  )
}

// ─── Modal ────────────────────────────────────────────────────
function ModalDemo() {
  return (
    <Section
      id="modal"
      title="Modal"
      description="Accessible modal dialog using React Aria. Renders as an overlay with backdrop blur and scale animation."
    >
      <DemoCard>
        <DemoCard.Preview className="gap-4">
          <Modal
            content={({ close }) => (
              <div
                className="flex items-center justify-center h-full p-8"
                onClick={close}
              >
                <div
                  className="bg-surface rounded-lg shadow-floating p-8 max-w-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="font-display font-variation-bold text-xl lowercase text-heading mb-2">
                    Example modal
                  </h3>
                  <p className="text-body-80 text-sm mb-4">
                    This modal uses React Aria&rsquo;s DialogTrigger with
                    accessible focus management and keyboard navigation.
                  </p>
                  <AriaButton
                    onPress={close}
                    className="button-dandelion px-4 py-2 rounded-sm font-ui text-sm lowercase cursor-pointer"
                  >
                    Close
                  </AriaButton>
                </div>
              </div>
            )}
          >
            <AriaButton className="button-dandelion px-4 py-2 rounded-sm font-ui text-sm lowercase cursor-pointer">
              Open modal
            </AriaButton>
          </Modal>
        </DemoCard.Preview>
        <DemoCard.Docs>
          <PropsTable
            props={[
              {
                name: 'children',
                type: 'ReactNode',
                description: 'Trigger element (usually a Button)',
              },
              {
                name: 'content',
                type: '({ close }) => ReactNode',
                description:
                  'Render function for modal content, receives close callback',
              },
            ]}
          />
        </DemoCard.Docs>
      </DemoCard>
    </Section>
  )
}

// ─── Notepad ──────────────────────────────────────────────────
function NotepadDemo() {
  return (
    <Section
      id="notepad"
      title="Notepad"
      description="Skeuomorphic notepad container with a dandelion header and paper body. Used for callouts and featured content."
    >
      <DemoCard>
        <DemoCard.Preview className="flex-col max-w-md">
          <Notepad>
            <Notepad.Header>Example notepad</Notepad.Header>
            <Notepad.Body>
              <p className="text-body text-sm">
                This is the notepad body with a decorative torn paper edge along
                the top.
              </p>
              <p className="text-body-80 text-sm">
                Great for callouts, tips, or featured content that needs to
                stand out.
              </p>
            </Notepad.Body>
          </Notepad>
        </DemoCard.Preview>
        <DemoCard.Split>
          <DemoCard.Docs>
            <PropsTable
              props={[
                {
                  name: 'children',
                  type: 'ReactNode',
                  description: 'Notepad.Header and Notepad.Body components',
                },
                {
                  name: 'className',
                  type: 'string',
                  description: 'Additional CSS classes on the wrapper',
                },
              ]}
            />
          </DemoCard.Docs>
          <DemoCard.Usage>
            <CodeExample>{`<Notepad>
  <Notepad.Header>Tips</Notepad.Header>
  <Notepad.Body>
    <p>Your content here</p>
  </Notepad.Body>
</Notepad>`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

// ─── Pagination ───────────────────────────────────────────────
function PaginationDemo() {
  return (
    <Section
      id="pagination"
      title="Pagination"
      description="Previous/next navigation for paginated content with a centred page counter."
    >
      <DemoCard>
        <DemoCard.Preview className="flex-col gap-6">
          <div className="w-full">
            <Pagination total={5} current={3} />
          </div>
        </DemoCard.Preview>
        <DemoCard.Docs>
          <PropsTable
            props={[
              {
                name: 'total',
                type: 'number',
                description: 'Total number of pages',
              },
              {
                name: 'current',
                type: 'number',
                description: 'Current page number',
              },
              {
                name: 'category',
                type: 'string',
                description:
                  'Optional category slug for category-filtered pagination',
              },
            ]}
          />
        </DemoCard.Docs>
      </DemoCard>
    </Section>
  )
}

// ─── Illustrations ────────────────────────────────────────────
function IllustrationDemo() {
  return (
    <Section
      id="illustration"
      title="Illustrations"
      description="SVG illustration components with a theming system for fill and stroke colours. Supports default (warm) and cool variants."
    >
      <DemoCard>
        <DemoCard.Preview className="flex-col gap-6">
          <Subsection title="Illustration tokens">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: 'fill-foreground', var: 'var(--fill-foreground)' },
                { name: 'fill-surface', var: 'var(--fill-surface)' },
                { name: 'fill-surface-100', var: 'var(--fill-surface-100)' },
                { name: 'fill-surface-150', var: 'var(--fill-surface-150)' },
                { name: 'fill-lowlight', var: 'var(--fill-lowlight)' },
                { name: 'fill-subtle', var: 'var(--fill-subtle)' },
                { name: 'fill-muted', var: 'var(--fill-muted)' },
                { name: 'fill-border', var: 'var(--fill-border)' },
              ].map((token) => (
                <div key={token.name} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-xs shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] shrink-0"
                    style={{ backgroundColor: token.var }}
                  />
                  <span className="font-mono text-2xs text-body-80 truncate">
                    {token.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border-light">
              {[
                {
                  name: 'stroke-foreground',
                  var: 'var(--stroke-foreground)',
                },
                { name: 'stroke-surface', var: 'var(--stroke-surface)' },
                { name: 'stroke-lowlight', var: 'var(--stroke-lowlight)' },
                { name: 'stroke-border', var: 'var(--stroke-border)' },
                { name: 'stroke-muted', var: 'var(--stroke-muted)' },
                { name: 'stroke-subtle', var: 'var(--stroke-subtle)' },
                { name: 'stroke-accent', var: 'var(--stroke-accent)' },
                {
                  name: 'stroke-highlight',
                  var: 'var(--stroke-highlight)',
                },
              ].map((token) => (
                <div key={token.name} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-xs shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] shrink-0"
                    style={{ backgroundColor: token.var }}
                  />
                  <span className="font-mono text-2xs text-body-80 truncate">
                    {token.name}
                  </span>
                </div>
              ))}
            </div>
          </Subsection>
          <Subsection title="Examples">
            <div className="flex flex-wrap gap-6 items-end">
              <div className="flex flex-col items-center gap-2">
                <Star width={64} height={64} />
                <span className="font-mono text-2xs text-body-60">Star</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Pencil width={64} height={64} />
                <span className="font-mono text-2xs text-body-60">Pencil</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Terminal width={64} height={64} />
                <span className="font-mono text-2xs text-body-60">
                  Terminal
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Envelope width={64} height={64} />
                <span className="font-mono text-2xs text-body-60">
                  Envelope
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Cursor width={64} height={64} />
                <span className="font-mono text-2xs text-body-60">Cursor</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Figma width={64} height={64} />
                <span className="font-mono text-2xs text-body-60">Figma</span>
              </div>
            </div>
          </Subsection>
          <Subsection title="All illustrations">
            <p className="text-sm text-body-80">
              Brush, Colour, Component, Cursor, Envelope, Figma, Pen,
              PencilMono, Pencil, RulerMono, Safari, Sharpener, Star, Sticky,
              Terminal, Type
            </p>
          </Subsection>
        </DemoCard.Preview>
        <DemoCard.Split>
          <DemoCard.Docs>
            <p className="text-sm text-body-80">
              Each illustration uses CSS custom properties for fill and stroke
              colours, enabling both warm (default) and cool theme variants.
            </p>
          </DemoCard.Docs>
          <DemoCard.Usage>
            <CodeExample>{`import { Pencil, Star, Terminal } from '@/components/illustration'

<Pencil />
<Star />
<Terminal />`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

export {
  BadgeDemo,
  ButtonDemo,
  CardDemo,
  ChatDemo,
  ChipDemo,
  DateDemo,
  IconDemo,
  LinkDemo,
  ModalDemo,
  NotepadDemo,
  PaginationDemo,
  IllustrationDemo,
}
