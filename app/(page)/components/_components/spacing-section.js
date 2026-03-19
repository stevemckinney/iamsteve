import { Showcase, ShowcaseBlock } from './_showcase'

const radii = [
  { name: 'none', value: '0', css: 'rounded-none' },
  { name: 'xs', value: '0.25rem', css: 'rounded-xs' },
  { name: 'sm', value: '0.5rem', css: 'rounded-sm' },
  { name: 'md', value: '1rem', css: 'rounded-md' },
  { name: 'lg', value: '1.5rem', css: 'rounded-lg' },
  { name: 'xl', value: '2rem', css: 'rounded-xl' },
  { name: 'full', value: '999rem', css: 'rounded-full' },
]

const spacingSteps = [
  0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 24,
]

export default function SpacingSection() {
  return (
    <Showcase
      title="Spacing & radius"
      description="Spacing follows Tailwind defaults with a few custom additions. Border radius uses a custom scale."
    >
      <ShowcaseBlock title="Border radius" className="gap-6 items-end">
        {radii.map((r) => (
          <div key={r.name} className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 bg-fern-400 ${r.css}`} />
            <div className="flex flex-col items-center">
              <span className="font-mono text-2xs text-heading">{r.name}</span>
              <span className="text-2xs text-body-60">{r.value}</span>
            </div>
          </div>
        ))}
      </ShowcaseBlock>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-display font-variation-bold text-lg lowercase text-heading">
            Spacing scale
          </h3>
          <p className="text-body-80 text-sm max-w-prose">
            Common spacing values used across the design system. Shown in rem
            with pixel equivalents.
          </p>
        </div>
        <div className="bg-surface rounded-lg shadow-placed overflow-hidden">
          {spacingSteps.map((step, i) => (
            <div
              key={step}
              className={`flex items-center gap-4 px-6 py-2 ${
                i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
              }`}
            >
              <span className="font-mono text-2xs text-body-60 w-10 shrink-0 tabular-nums text-right">
                {step}
              </span>
              <span className="font-mono text-2xs text-body-60 w-16 shrink-0">
                {step * 0.25}rem
              </span>
              <span className="font-mono text-2xs text-body-60 w-12 shrink-0">
                {step * 4}px
              </span>
              <div className="flex-1">
                <div
                  className="h-3 bg-fern-400 rounded-xs"
                  style={{ width: `${Math.min(step * 4, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Showcase>
  )
}
