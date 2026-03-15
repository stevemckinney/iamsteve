import React from 'react'
import { Section, Subsection, Preview, CodeExample } from './section'

const examples = [
  {
    token: '--color-heading',
    light: 'fern-1100',
    dark: 'fern-0',
    lightVar: 'var(--color-fern-1100)',
    darkVar: 'var(--color-fern-0)',
  },
  {
    token: '--color-body',
    light: 'fern-1100',
    dark: 'fern-200',
    lightVar: 'var(--color-fern-1100)',
    darkVar: 'var(--color-fern-200)',
  },
  {
    token: '--color-link',
    light: 'fern-800',
    dark: 'dandelion-300',
    lightVar: 'var(--color-fern-800)',
    darkVar: 'var(--color-dandelion-300)',
  },
  {
    token: '--color-canvas',
    light: 'neutral-01-150',
    dark: 'fern-1300',
    lightVar: 'var(--color-neutral-01-150)',
    darkVar: 'var(--color-fern-1300)',
  },
  {
    token: '--color-surface',
    light: 'white',
    dark: 'fern-1100 (30%)',
    lightVar: 'rgb(255 255 255)',
    darkVar: 'color-mix(in oklch, fern-1100, transparent 70%)',
  },
]

export default function DarkModeSection() {
  return (
    <Section
      id="dark-mode"
      title="Dark mode"
      description="The theme uses CSS light-dark() for automatic dark mode. Tokens resolve to different primitives based on the colour scheme preference."
    >
      <Subsection title="How it works">
        <Preview className="flex-col gap-4">
          <div className="flex flex-col gap-2 text-sm text-body-80">
            <p>
              The root element sets{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                color-scheme: light dark
              </code>{' '}
              enabling the CSS{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                light-dark()
              </code>{' '}
              function throughout the theme.
            </p>
            <p>
              Semantic tokens in{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                theme.css
              </code>{' '}
              map to different primitive values for each mode. No{' '}
              <code className="font-mono text-code-text bg-code-bg px-1 py-0.5 rounded text-xs">
                dark:
              </code>{' '}
              prefix classes are needed for token-based styles.
            </p>
          </div>
        </Preview>
      </Subsection>

      <Subsection
        title="Token mapping examples"
        description="How semantic tokens resolve differently in light and dark modes."
      >
        <div className="bg-surface rounded-lg shadow-placed overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] text-sm">
            <div className="px-4 py-2 bg-surface-02 font-display font-variation-bold text-heading lowercase">
              Token
            </div>
            <div className="px-4 py-2 bg-surface-02 font-display font-variation-bold text-heading lowercase text-center">
              Light
            </div>
            <div className="px-4 py-2 bg-surface-02 font-display font-variation-bold text-heading lowercase">
              Light value
            </div>
            <div className="px-4 py-2 bg-surface-02 font-display font-variation-bold text-heading lowercase text-center">
              Dark
            </div>
            <div className="px-4 py-2 bg-surface-02 font-display font-variation-bold text-heading lowercase">
              Dark value
            </div>
            {examples.map((ex, i) => (
              <React.Fragment key={ex.token}>
                <div
                  className={`px-4 py-2 font-mono text-xs text-heading ${
                    i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
                  }`}
                >
                  {ex.token.replace('--color-', '')}
                </div>
                <div
                  className={`px-4 py-2 flex justify-center ${
                    i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-xs shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]"
                    style={{ backgroundColor: ex.lightVar }}
                  />
                </div>
                <div
                  className={`px-4 py-2 font-mono text-2xs text-body-60 ${
                    i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
                  }`}
                >
                  {ex.light}
                </div>
                <div
                  className={`px-4 py-2 flex justify-center ${
                    i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
                  }`}
                >
                  <div className="w-6 h-6 rounded-xs shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] bg-fern-1100" />
                </div>
                <div
                  className={`px-4 py-2 font-mono text-2xs text-body-60 ${
                    i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'
                  }`}
                >
                  {ex.dark}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Subsection>

      <Subsection title="Syntax">
        <CodeExample>{`/* In theme.css - tokens auto-switch between modes */
@theme {
  --color-heading: light-dark(
    var(--color-fern-1100),  /* light mode */
    var(--color-fern-0)      /* dark mode */
  );
}

/* In components - just use the token */
<h1 className="text-heading">No dark: prefix needed</h1>

/* For one-off overrides, use Tailwind dark: */
<div className="bg-white dark:bg-fern-1100">
  Inline override
</div>`}</CodeExample>
      </Subsection>
    </Section>
  )
}
