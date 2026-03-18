import { Showcase, ShowcaseBlock } from './_showcase'

const shadows = [
  {
    name: 'subtle',
    css: 'shadow-subtle',
    description: 'Minimal elevation, barely visible',
  },
  {
    name: 'reduced',
    css: 'shadow-reduced',
    description: 'Light elevation, resting state',
  },
  {
    name: 'placed',
    css: 'shadow-placed',
    description: 'Standard elevation, cards and panels',
  },
  {
    name: 'picked',
    css: 'shadow-picked',
    description: 'Emphasised elevation, hover state',
  },
  {
    name: 'floating',
    css: 'shadow-floating',
    description: 'Maximum elevation, popovers and modals',
  },
]

export default function ShadowsSection() {
  return (
    <Showcase
      title="Shadows"
      description="A five-step elevation system using layered box shadows with border effects. Each level adapts between light and dark modes."
    >
      <ShowcaseBlock className="gap-8 items-start py-10 justify-center">
        {shadows.map((shadow) => (
          <div key={shadow.name} className="flex flex-col items-center gap-3">
            <div className={`w-24 h-24 bg-surface rounded-lg ${shadow.css}`} />
            <div className="flex flex-col items-center">
              <span className="font-mono text-xs text-heading">
                {shadow.name}
              </span>
              <span className="text-2xs text-body-60 text-center max-w-24">
                {shadow.description}
              </span>
            </div>
          </div>
        ))}
      </ShowcaseBlock>
    </Showcase>
  )
}
