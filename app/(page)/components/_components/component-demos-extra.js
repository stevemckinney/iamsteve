'use client'

import { Section, Subsection, DemoCard, CodeExample } from './section'
import PropsTable from './props-table'
import Icon from '@/components/icon'
import Social from '@/components/social'

// ─── Category ─────────────────────────────────────────────────
function CategoryDemo() {
  return (
    <Section
      id="category"
      title="Category"
      description="Renders a category badge with its themed icon and colour. Looks up metadata from the categories content file."
    >
      <DemoCard>
        <DemoCard.Preview className="flex-col gap-4">
          <Subsection title="Available categories">
            <div className="rounded-sm overflow-hidden">
              {[
                { title: 'Design', theme: 'rio', icon: 'pen' },
                { title: 'Quick tip', theme: 'dandelion', icon: 'bolt' },
                {
                  title: 'Typography',
                  theme: 'neutral-02',
                  icon: 'type',
                },
                { title: 'Colour', theme: 'cornflour', icon: 'palette' },
                { title: 'Resources', theme: 'fern', icon: 'settings' },
                { title: 'UX design', theme: 'grass', icon: 'cursor' },
                {
                  title: 'Visual design',
                  theme: 'lavender',
                  icon: 'vector-square',
                },
                { title: 'Code', theme: 'dandelion', icon: 'code' },
                { title: 'Animation', theme: 'magenta', icon: 'play' },
                { title: 'CSS', theme: 'grass', icon: 'css' },
                { title: 'Patterns', theme: 'fern', icon: 'puzzle' },
                { title: 'JavaScript', theme: 'magenta', icon: 'note' },
              ].map((cat, i) => (
                <div
                  key={cat.title}
                  className={`flex items-center gap-4 px-4 py-2 ${
                    i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
                  }`}
                >
                  <Icon
                    icon={cat.icon}
                    size={16}
                    variant="none"
                    className="text-heading shrink-0"
                  />
                  <span className="text-sm text-heading w-28">{cat.title}</span>
                  <span className="font-mono text-2xs text-body-60">
                    {cat.theme}
                  </span>
                </div>
              ))}
            </div>
          </Subsection>
        </DemoCard.Preview>
        <DemoCard.Split>
          <DemoCard.Docs>
            <PropsTable
              props={[
                {
                  name: 'children',
                  type: 'string',
                  description: 'Category title (must match a categories entry)',
                },
                {
                  name: 'size',
                  type: '16 | 24',
                  default: '16',
                  description: 'Icon and badge size',
                },
                {
                  name: 'badge',
                  type: 'boolean',
                  default: 'true',
                  description: 'Render as badge (true) or plain link (false)',
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
            <CodeExample>{`import Category from '@/components/category'

{/* As a badge (default) */}
<Category>Design</Category>
<Category>Code</Category>

{/* As a plain link */}
<Category badge={false}>Typography</Category>

{/* Different sizes */}
<Category size={24}>Visual design</Category>`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

// ─── CodePen ──────────────────────────────────────────────────
function CodePenDemo() {
  return (
    <Section
      id="codepen"
      title="CodePen"
      description="Embeds CodePen pens as iframes. Replaces the external CodePen embed script for better reliability."
    >
      <DemoCard>
        <DemoCard.Split>
          <DemoCard.Docs>
            <PropsTable
              props={[
                {
                  name: 'slug',
                  type: 'string',
                  description: 'CodePen pen ID (required)',
                },
                {
                  name: 'user',
                  type: 'string',
                  default: "'stevemckinney'",
                  description: 'CodePen username',
                },
                {
                  name: 'height',
                  type: 'number',
                  default: '520',
                  description: 'Iframe height in pixels',
                },
                {
                  name: 'defaultTab',
                  type: 'string',
                  default: "'result'",
                  description: "Default tab: 'result', 'html', 'css', 'js'",
                },
                {
                  name: 'themeId',
                  type: 'string',
                  default: "'23161'",
                  description: 'CodePen theme ID',
                },
                {
                  name: 'title',
                  type: 'string',
                  default: "'CodePen'",
                  description: 'Accessible iframe title',
                },
                {
                  name: 'editable',
                  type: 'boolean',
                  default: 'false',
                  description: 'Whether the embed is editable',
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
            <CodeExample>{`<CodePen
  slug="b513dec968b7749537ccbb8fd951532d"
  title="Lazy loading images"
  height={468}
  themeId="31700"
  editable={true}
/>`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

// ─── Figure ───────────────────────────────────────────────────
function FigureDemo() {
  return (
    <Section
      id="figure"
      title="Figure"
      description="Figure component system for images in posts. Supports optional drop shadow, zoom-to-enlarge via modal, and figure numbering."
    >
      <DemoCard>
        <DemoCard.Preview className="flex-col gap-2">
          <Subsection title="Components">
            <div className="rounded-sm overflow-hidden">
              {[
                {
                  name: 'Figure',
                  description:
                    'Wrapper with optional imageShadow and enlargeable props',
                },
                {
                  name: 'Figcaption',
                  description:
                    'Styled caption with mono font and tight tracking',
                },
                {
                  name: 'Fig',
                  description: 'Figure number label, renders as "Fig. X"',
                },
                {
                  name: 'FigureModal',
                  description:
                    'Wraps a figure to make it zoom-to-enlarge on click',
                },
              ].map((comp, i) => (
                <div
                  key={comp.name}
                  className={`flex items-start gap-4 px-4 py-3 ${
                    i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
                  }`}
                >
                  <span className="font-mono text-xs text-heading w-32 shrink-0 pt-0.5">
                    {comp.name}
                  </span>
                  <span className="text-sm text-body-80">
                    {comp.description}
                  </span>
                </div>
              ))}
            </div>
          </Subsection>
        </DemoCard.Preview>
        <DemoCard.Split>
          <DemoCard.Docs>
            <PropsTable
              props={[
                {
                  name: 'imageShadow',
                  type: 'boolean',
                  description: 'Adds drop-shadow-image to child images',
                },
                {
                  name: 'enlargeable',
                  type: 'boolean',
                  description: 'Wraps in FigureModal for click-to-zoom',
                },
                {
                  name: 'src',
                  type: 'string',
                  description: 'Image source URL (used by FigureModal)',
                },
                {
                  name: 'alt',
                  type: 'string',
                  description: 'Image alt text (used by FigureModal)',
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
            <CodeExample>{`{/* In MDX posts */}
<Figure enlargeable src="/images/blog/example.png" alt="Example">
  <Image src="/images/blog/example.png" alt="Example" width={960} height={540} />
  <Figcaption>An example image with zoom</Figcaption>
</Figure>

{/* Figure numbering */}
<Fig>1</Fig> {/* Renders: "Fig. 1" */}`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

// ─── ContactForm ──────────────────────────────────────────────
function ContactFormDemo() {
  return (
    <Section
      id="contact-form"
      title="ContactForm"
      description="Accessible contact form built with React Aria components. Includes name, email, and message fields with validation, rate limiting, and honeypot spam protection."
    >
      <DemoCard>
        <DemoCard.Split>
          <DemoCard.Docs>
            <Subsection title="Features">
              <ul className="text-sm text-body-80 list-inside list-[square] flex flex-col gap-1">
                <li>
                  React Aria Form, TextField, Label, Input, TextArea,
                  FieldError, Button
                </li>
                <li>Client-side rate limiting (max 5 submissions per hour)</li>
                <li>Minimum word count validation (8 words)</li>
                <li>Honeypot field for spam prevention</li>
                <li>Toast notification on success</li>
                <li>Netlify Forms integration</li>
              </ul>
            </Subsection>
          </DemoCard.Docs>
          <DemoCard.Usage>
            <CodeExample>{`import ContactForm from '@/components/contact-form'

{/* In MDX pages */}
<ContactForm />`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

// ─── NewsletterForm ───────────────────────────────────────────
function NewsletterFormDemo() {
  return (
    <Section
      id="newsletter-form"
      title="NewsletterForm"
      description="Email subscription form with name and email fields. Uses container queries for responsive layout."
    >
      <DemoCard>
        <DemoCard.Split>
          <DemoCard.Docs>
            <PropsTable
              props={[
                {
                  name: 'className',
                  type: 'string',
                  default: "'w-full'",
                  description: 'Container CSS classes',
                },
                {
                  name: 'unique',
                  type: 'string',
                  default: "'footer'",
                  description:
                    'Unique identifier for input IDs (prevents collisions when multiple forms exist)',
                },
                {
                  name: 'initialCount',
                  type: 'number',
                  default: '700',
                  description: 'Subscriber count to display',
                },
              ]}
            />
          </DemoCard.Docs>
          <DemoCard.Usage>
            <CodeExample>{`import NewsletterForm from '@/components/newsletter-form'

<NewsletterForm unique="sidebar" />

{/* The Newsletter async wrapper fetches the real subscriber count */}
import Newsletter from '@/components/newsletter'
<Newsletter unique="footer" />`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

// ─── Social ───────────────────────────────────────────────────
function SocialDemo() {
  return (
    <Section
      id="social"
      title="Social"
      description="Social media link list with icons. Links to X, Figma, GitHub, LinkedIn, and Mastodon."
    >
      <DemoCard>
        <DemoCard.Preview>
          <Social />
        </DemoCard.Preview>
        <DemoCard.Usage>
          <CodeExample>{`import Social from '@/components/social'

<Social />`}</CodeExample>
        </DemoCard.Usage>
      </DemoCard>
    </Section>
  )
}

// ─── Placeholder ──────────────────────────────────────────────
function PlaceholderDemo() {
  return (
    <Section
      id="placeholder"
      title="Placeholder"
      description="Generates deterministic coloured placeholder images for posts without a featured image. The colour is seeded from the slug hash so it's consistent."
    >
      <DemoCard>
        <DemoCard.Preview className="flex-col gap-3">
          <Subsection title="Colour generation">
            <p className="text-sm text-body-80">
              Uses a hash of the post slug to pick from 10 placeholder colours
              defined in{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                theme.css
              </code>{' '}
              as{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                --placeholder-color-0
              </code>{' '}
              through{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                --placeholder-color-9
              </code>
              .
            </p>
            <div className="flex gap-2">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-xs shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]"
                  style={{
                    backgroundColor: `var(--placeholder-color-${i})`,
                  }}
                  title={`--placeholder-color-${i}`}
                />
              ))}
            </div>
          </Subsection>
        </DemoCard.Preview>
        <DemoCard.Docs>
          <PropsTable
            props={[
              {
                name: 'category',
                type: "'Design' | 'Code'",
                description: 'Determines which default SVG image to show',
              },
              {
                name: 'slug',
                type: 'string',
                description:
                  'Post slug, used to generate a deterministic colour',
              },
              {
                name: 'alt',
                type: 'string',
                description: 'Image alt text',
              },
              {
                name: 'width',
                type: 'number',
                default: '384',
                description: 'Image width',
              },
              {
                name: 'height',
                type: 'number',
                default: '240',
                description: 'Image height',
              },
              {
                name: 'href',
                type: 'string',
                description: 'Makes the placeholder a link',
              },
              {
                name: 'className',
                type: 'string',
                description: 'Additional CSS classes',
              },
            ]}
          />
        </DemoCard.Docs>
      </DemoCard>
    </Section>
  )
}

// ─── Table of Contents ────────────────────────────────────────
function TableOfContentsDemo() {
  return (
    <Section
      id="table-of-contents"
      title="Table of contents"
      description="Collapsible table of contents with sticky behaviour. Uses IntersectionObserver to highlight the active heading and smooth-scrolls to sections."
    >
      <DemoCard>
        <DemoCard.Split>
          <DemoCard.Docs>
            <Subsection title="Features">
              <ul className="text-sm text-body-80 list-inside list-[square] flex flex-col gap-1">
                <li>
                  Sticky positioning with scroll detection via
                  useSyncExternalStore
                </li>
                <li>Collapsible on mobile, always visible on desktop</li>
                <li>Active heading tracking with IntersectionObserver</li>
                <li>Nested heading hierarchy (h2 with h3 children)</li>
                <li>Branch-line indicators for visual hierarchy</li>
                <li>Backdrop blur when sticky on mobile</li>
              </ul>
            </Subsection>
            <PropsTable
              props={[
                {
                  name: 'nestedHeadings',
                  type: 'array',
                  description:
                    'Hierarchical heading structure from createNestedHeadings()',
                },
                {
                  name: 'headings',
                  type: 'array',
                  description: 'Flat list of all headings',
                },
                {
                  name: 'open',
                  type: 'boolean',
                  default: 'false',
                  description: 'Initial open/closed state',
                },
              ]}
            />
          </DemoCard.Docs>
          <DemoCard.Usage>
            <CodeExample>{`import { Collapsible } from '@/components/table-of-contents'
import { createNestedHeadings } from '@/components/table-of-contents/create-nested-headings'

const nested = createNestedHeadings(post.headings)

<Collapsible
  nestedHeadings={nested}
  headings={post.headings}
/>`}</CodeExample>
          </DemoCard.Usage>
        </DemoCard.Split>
      </DemoCard>
    </Section>
  )
}

export {
  CategoryDemo,
  CodePenDemo,
  FigureDemo,
  ContactFormDemo,
  NewsletterFormDemo,
  SocialDemo,
  PlaceholderDemo,
  TableOfContentsDemo,
}
