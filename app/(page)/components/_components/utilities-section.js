'use client'

import { Showcase, ShowcaseBlock, CodeExample } from './_showcase'

const customUtilities = [
  {
    name: 'button-dandelion',
    description:
      'Full button styling with gradient background, layered shadows, and hover/active states. The primary action button.',
    example:
      '<button className="button-dandelion px-8 py-3">Subscribe</button>',
  },
  {
    name: 'frame / frame-24 / frame-40',
    description:
      'Border-image based decorative frames with SVG rounded corners. Used on main content areas.',
    example: '<div className="frame frame-24">Framed content</div>',
  },
  {
    name: 'frame-outset-top-sm / md',
    description:
      'Negative outset on frame top edge, creating an overlapping visual effect.',
    example: '<div className="frame frame-24 frame-outset-top-md">...</div>',
  },
  {
    name: 'col-margin',
    description: 'Spans the full grid from margin-start to margin-end.',
    example: '<div className="col-margin">Full width</div>',
  },
  {
    name: 'col-container',
    description: 'Spans from container-start to container-end.',
    example: '<div className="col-container">Container width</div>',
  },
  {
    name: 'content-grid',
    description: 'Masonry-style grid with auto-fill columns at 288px minimum.',
    example: '<div className="content-grid">Auto-fill grid</div>',
  },
  {
    name: 'drop-shadow-placed',
    description:
      'Filter-based drop shadow matching the placed elevation. Used on images and illustrations.',
    example: '<img className="drop-shadow-placed" />',
  },
  {
    name: 'drop-shadow-image',
    description: 'Filter-based drop shadow for image elements.',
    example: '<img className="drop-shadow-image" />',
  },
  {
    name: 'bg-rule',
    description: 'Inline SVG background of a dashed horizontal rule.',
    example: '<div className="bg-rule h-px" />',
  },
  {
    name: 'bg-dash-image',
    description:
      'Dash pattern background, auto-switches between light and dark variants.',
    example: '<div className="bg-dash-image" />',
  },
  {
    name: 'font-ui',
    description: 'Display font at UI weight with lowercase text-transform.',
    example: '<span className="font-ui">Navigation label</span>',
  },
  {
    name: 'font-variation-bold',
    description: 'Variable font setting: wdth 100, wght 700.',
    example: '<h2 className="font-display font-variation-bold">Heading</h2>',
  },
  {
    name: 'font-variation-extrabold',
    description: 'Variable font setting: wdth 100, wght 750.',
    example:
      '<h1 className="font-display font-variation-extrabold">Display</h1>',
  },
  {
    name: 'font-variation-medium',
    description: 'Variable font setting: wdth 100, wght 800.',
    example:
      '<span className="font-display font-variation-medium">Label</span>',
  },
  {
    name: 'slc-r / slc-s / slc-b',
    description: 'SVG stroke-linecap utilities: round, square, butt.',
    example: '<path className="slc-r" />',
  },
  {
    name: 'sl-r / sl-s',
    description: 'SVG stroke-linejoin utilities: round, square.',
    example: '<path className="sl-r" />',
  },
]

export default function UtilitiesSection() {
  return (
    <Showcase
      title="Custom utilities"
      description="Tailwind @utility directives that extend the design system beyond standard Tailwind classes."
    >
      <ShowcaseBlock title="Button" className="gap-4 items-center">
        <button className="button-dandelion px-8 py-3 font-ui text-base/tight lowercase select-none cursor-pointer">
          button-dandelion
        </button>
      </ShowcaseBlock>
      <CodeExample>{`{/* Primary action button with full styling */}
<button className="button-dandelion px-8 py-3 font-ui text-base/tight lowercase">
  Subscribe
</button>`}</CodeExample>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-display font-variation-bold text-lg lowercase text-heading">
            All custom utilities
          </h3>
        </div>
        <div className="bg-surface rounded-lg shadow-placed overflow-hidden">
          {customUtilities.map((util, i) => (
            <div
              key={util.name}
              className={`flex flex-col gap-1 px-6 py-3 ${
                i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
              }`}
            >
              <span className="font-mono text-xs text-code-text bg-code-bg px-1.5 py-0.5 rounded w-fit">
                {util.name}
              </span>
              <span className="text-sm text-body-80">{util.description}</span>
            </div>
          ))}
        </div>
      </div>
    </Showcase>
  )
}
