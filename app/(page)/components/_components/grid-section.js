import { Section, Subsection, Preview, CodeExample } from './section'

const gridRegions = [
  {
    name: 'margin',
    class: 'col-margin',
    description: 'Full width including margins',
  },
  {
    name: 'container',
    class: 'col-container',
    description: 'Main content container',
  },
  {
    name: 'content',
    class: 'col-content',
    description: 'Content area (narrower than container)',
  },
  {
    name: 'prose',
    class: 'col-prose',
    description: 'Reading width for body text',
  },
  { name: 'page', class: 'col-page', description: 'Page-level content area' },
]

const breakpoints = [
  { name: 'xs', value: '360px', description: 'Mobile-first custom breakpoint' },
  { name: 'sm', value: '640px', description: 'Small devices' },
  { name: 'md', value: '768px', description: 'Medium devices' },
  { name: 'lg', value: '1024px', description: 'Large devices' },
  { name: 'xl', value: '1280px', description: 'Extra-large devices' },
  { name: '2xl', value: '1536px', description: 'Wide screens' },
]

const gridConfigs = [
  {
    name: '--grid-6',
    cols: 6,
    description: 'Mobile layout, all named regions collapsed',
  },
  {
    name: '--grid-12',
    cols: 12,
    description: 'Tablet layout with container margins',
  },
  {
    name: '--grid-12-wide',
    cols: 12,
    description: 'Wider 12-column with prose inset',
  },
  {
    name: '--grid-16-narrow',
    cols: 16,
    description: 'Desktop narrow with full region nesting',
  },
  { name: '--grid-16', cols: 16, description: 'Full desktop layout' },
]

export default function GridSection() {
  return (
    <Section
      id="grid"
      title="Grid & layout"
      description="A responsive named-column grid system with five breakpoint configurations. Named regions allow components to span semantic content areas."
    >
      <Subsection
        title="Named regions"
        description="Grid areas that can be targeted with utility classes for column placement."
      >
        <div className="bg-surface rounded-lg shadow-placed overflow-hidden">
          {gridRegions.map((region, i) => (
            <div
              key={region.name}
              className={`flex items-center gap-4 px-6 py-3 ${
                i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
              }`}
            >
              <span className="font-mono text-xs text-code-text bg-code-bg px-1.5 py-0.5 rounded w-36 shrink-0">
                {region.class}
              </span>
              <span className="font-mono text-2xs text-body-60 w-64 shrink-0">
                {region.name}-start / {region.name}-end
              </span>
              <span className="text-sm text-body-80">{region.description}</span>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection
        title="Grid configurations"
        description="Responsive grid definitions applied via the .layout class at different breakpoints."
      >
        <div className="bg-surface rounded-lg shadow-placed overflow-hidden">
          {gridConfigs.map((config, i) => (
            <div
              key={config.name}
              className={`flex items-center gap-4 px-6 py-3 ${
                i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
              }`}
            >
              <span className="font-mono text-xs text-heading w-40 shrink-0">
                {config.name}
              </span>
              <span className="font-mono text-2xs text-body-60 w-16 shrink-0">
                {config.cols} cols
              </span>
              <span className="text-sm text-body-80">{config.description}</span>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Breakpoints">
        <Preview className="gap-3 flex-col">
          {breakpoints.map((bp) => (
            <div key={bp.name} className="flex items-center gap-4">
              <span className="font-mono text-xs text-heading w-10 shrink-0">
                {bp.name}
              </span>
              <span className="font-mono text-2xs text-body-60 w-16 shrink-0">
                {bp.value}
              </span>
              <div className="flex-1 h-3 bg-surface-02 rounded-xs overflow-hidden">
                <div
                  className="h-full bg-fern-400 rounded-xs"
                  style={{ width: `${(parseInt(bp.value) / 1536) * 100}%` }}
                />
              </div>
              <span className="text-2xs text-body-60 w-40 shrink-0">
                {bp.description}
              </span>
            </div>
          ))}
        </Preview>
      </Subsection>

      <Subsection title="Grid variables">
        <div className="bg-surface rounded-lg shadow-placed p-6 flex flex-col gap-2">
          {[
            { name: '--grid-container', value: '1920px' },
            { name: '--grid-content', value: '1344px' },
            { name: '--grid-margin', value: 'calc(48px - var(--grid-gutter))' },
            { name: '--grid-gutter', value: '32px' },
            { name: '--grid-gap', value: '32px' },
          ].map((v) => (
            <div key={v.name} className="flex items-center gap-4">
              <span className="font-mono text-xs text-code-text bg-code-bg px-1.5 py-0.5 rounded">
                {v.name}
              </span>
              <span className="font-mono text-2xs text-body-60">{v.value}</span>
            </div>
          ))}
        </div>
      </Subsection>

      <CodeExample>{`{/* Using named grid regions */}
<div className="col-content">Full content width</div>
<div className="col-prose">Narrower reading width</div>
<div className="col-container">Container width</div>

{/* Using start/end positions */}
<div className="col-start-prose-start col-end-prose-end">
  Custom span within prose
</div>`}</CodeExample>
    </Section>
  )
}
