import { Showcase, ShowcaseBlock } from './_showcase'

const typeScale = [
  { name: '7xl', size: '5.5rem', sample: 'Display heading' },
  { name: '6xl', size: '4rem', sample: 'Large heading' },
  { name: '5xl', size: '3rem', sample: 'Section heading' },
  { name: '4xl', size: '2.5rem', sample: 'Page title' },
  { name: '3xl', size: '2rem', sample: 'Subsection heading' },
  { name: '2xl', size: '1.5rem', sample: 'Card title' },
  { name: 'xl', size: '1.3125rem', sample: 'Large body text' },
  { name: 'lg', size: '1.125rem', sample: 'Medium body text' },
  { name: 'base', size: '1rem', sample: 'Default body text' },
  { name: 'sm', size: '0.875rem', sample: 'Small text' },
  { name: 'xs', size: '0.75rem', sample: 'Caption text' },
  { name: '2xs', size: '0.625rem', sample: 'Micro text' },
]

const fontVariations = [
  { name: 'font-variation-bold', label: 'Bold', weight: 'wght 700, wdth 100' },
  {
    name: 'font-variation-extrabold',
    label: 'Extrabold',
    weight: 'wght 750, wdth 100',
  },
  {
    name: 'font-variation-medium',
    label: 'Medium',
    weight: 'wght 800, wdth 100',
  },
  { name: 'font-ui', label: 'UI', weight: 'wght 500, wdth 100, lowercase' },
]

export default function TypographySection() {
  return (
    <Showcase
      title="Typography"
      description="Three font families with a custom type scale. The display font (Roc Grotesk) uses variable font settings for weight control."
    >
      <ShowcaseBlock title="Font families" className="flex-col gap-6">
        <div className="flex flex-col gap-1 w-full">
          <span className="text-2xs font-mono text-body-60">
            font-display &middot; Roc Grotesk Variable
          </span>
          <p className="font-display font-variation-bold text-3xl lowercase text-heading">
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <span className="text-2xs font-mono text-body-60">
            font-sans &middot; Elza
          </span>
          <p className="font-sans text-xl text-heading">
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <span className="text-2xs font-mono text-body-60">
            font-mono &middot; Covik Sans Mono
          </span>
          <p className="font-mono text-lg text-heading">
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      </ShowcaseBlock>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-display font-variation-bold text-lg lowercase text-heading">
            Type scale
          </h3>
        </div>
        <div className="bg-surface rounded-lg shadow-placed overflow-hidden">
          {typeScale.map((item, i) => (
            <div
              key={item.name}
              className={`flex items-baseline gap-4 px-6 py-3 ${
                i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
              }`}
            >
              <span className="font-mono text-2xs text-body-60 w-16 shrink-0 tabular-nums">
                {item.name}
              </span>
              <span className="font-mono text-2xs text-body-60 w-20 shrink-0">
                {item.size}
              </span>
              <span
                className={`text-heading text-${item.name} truncate font-display font-variation-bold lowercase`}
              >
                {item.sample}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ShowcaseBlock
        title="Font variations"
        description="Variable font settings used with the display font."
        className="flex-col gap-4"
      >
        {fontVariations.map((v) => (
          <div key={v.name} className="flex flex-col gap-1 w-full">
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xs text-code-text bg-code-bg px-1.5 py-0.5 rounded">
                {v.name}
              </span>
              <span className="text-2xs text-body-60">{v.weight}</span>
            </div>
            <p
              className={`font-display ${v.name} text-2xl lowercase text-heading`}
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        ))}
      </ShowcaseBlock>
    </Showcase>
  )
}
