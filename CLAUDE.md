# iamsteve.me Claude guidelines

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. General coding

- Use 2 spaces for indentation
- Prefer Next.js App Router
- Strictly tailwindcss, do not use @apply and where something may have regular CSS look to convert to tailwind. When writing class names prefer kebab-case.

## Naming

- Keep names to 1-3 words. Prefer `getUser` over `getUserFromDatabase`.
- Let the module/class name carry context — don't repeat it in function names.
- Use verb+noun for exported/public functions; single verbs are fine for private/internal ones.
- Never use phase-based or implementation-detail names.
- Other examples include: `Navigation` not `Nav`, `Card` not `ContentCard`, `Link` not `TextLink`.

### Favour succinct names when

- The function's context (class, module, file) already provides meaning — e.g., user.activate() not user.activateUserAccount()
- The function does one obvious thing — save(), parse(), reset()
- The abbreviation is universally understood — init, auth, config, db
- The scope is small/local — helper functions within a narrow scope can be shorter

### Favour descriptive names when

- The function is part of a public API or widely imported — readers won't have surrounding context
- There's genuine ambiguity — process() could mean anything; processPayment() is clearer
- The function has side effects or non-obvious behaviour — deleteAndNotify() is safer than delete()
- Multiple similar functions exist — findById vs findByEmail need the distinction

Studies show single-letter names are terrible for comprehension, but names that are too long crowd working memory. The sweet spot is 2–3 words that capture the action and, if needed, the target — e.g., fetchUser, validateInput, renderPage.

## 6. Writing style

- Hanging lists and punctuation
- Avoid punctuating titles where possible
- MUST use sentence case, do not deviate unless it is a name or proper noun
  In HTML, “curly quotes” are typically these Unicode characters (with their HTML entity and numeric forms):
- Use British English

## 7. Dashes

Use the correct type of dash when necessary.

- Use an en dash (&ndash;) mainly for ranges and relationships.
- Use an em dash (&mdash;) to create a strong pause—stronger than a comma, less formal than parentheses, and often more dramatic than a semicolon.
- Separate an em dash with thin spaces (&thinsp;). eg: This is a sentence worthy of using the correct dash&thinsp;—&thinsp;because you can create the right feel.

### Quotes

MUST use the correct quote. For contractions you should use a curly quote (this is a curly quote ’) not a straight quote (this is a straight quote '). example one: `I’ve` not `I've`. example two: `Doesn’t` not `Doesn't`.

| Character | Name                        | Unicode  | HTML entity | Numeric entity          |
| --------- | --------------------------- | -------- | ----------- | ----------------------- |
| ‘         | Left single quotation mark  | `U+2018` | `&lsquo;`   | `&#8216;` or `&#x2018;` |
| ’         | Right single quotation mark | `U+2019` | `&rsquo;`   | `&#8217;` or `&#x2019;` |
| “         | Left double quotation mark  | `U+201C` | `&ldquo;`   | `&#8220;` or `&#x201C;` |
| ”         | Right double quotation mark | `U+201D` | `&rdquo;`   | `&#8221;` or `&#x201D;` |

## 8. A11y checklist

- Keyboard navigation works
- Screen reader friendly
- Color contrast should be AA
- Focus indicators visible
- Alt text on images
- Form labels present
- Heading hierarchy logical

## 9. When to break rules

- Framework components: Complex state management
- Client-side JS: Real-time features, heavy interactions
- Longer names: When brevity hurts clarity
- ARIA: When semantic HTML isn’t sufficient

## 10. Icons

SVG icons are served as a sprite system. Source SVGs live in `public/icon/16/` and `public/icon/24/`. Run `node scripts/generate-icon-sprite.js` after adding or changing any SVG — this regenerates `components/icon/sprite-16.js` and `components/icon/sprite-24.js`.

Use the `Icon` component:

```jsx
import Icon from '@/components/icon'

<Icon icon="external" size={16} />
<Icon icon="arrow-right" size={24} />
```

- `icon` — filename without extension, lowercased (e.g. `expand`, `external`, `arrow-right`)
- `size` — `16` or `24` (must match the folder the SVG lives in); defaults to `24`
- `variant` — `default` | `header` | `on-light` | `none`; controls colour via CSS classes

Some icon names are aliased: `everything`, `archive`, `all`, `folder` → `folder`; `design`, `pen` → `pen`.

The sprite is mounted once via `components/icon/sprite.js` and icons are referenced with `<use xlinkHref="#name-size" />`.

### Icon stroke and fill

- Use `stroke-2` for all icon strokes. `stroke-4` is reserved for emphasis only (e.g. the search icon line).
- Stroke line utilities: `sl-r` (round cap + round join, most common), `sl-s` (round cap + square join). Defined in `css/utilities.css`.
- Fill classes: `fill-(--icon-fill)` for themed fill, `fill-currentcolor` to inherit, `fill-none` for outline-only icons.

## Class merging

Always use `cn()` from `@/lib/utils` (wraps clsx + tailwind-merge). Never concatenate class strings manually.

```jsx
import { cn } from '@/lib/utils'

cn('base-classes', conditional && 'conditional-classes', className)
```

## Typography

Three font families loaded via Adobe TypeKit:

- `font-display` — roc-grotesk-variable (headings, display text)
- `font-sans` — elza (body text, default)
- `font-mono` — covik-sans-mono (code)

Custom utilities:

- `font-ui` — display font with lowercase transform, `'wdth' 100, 'wght' 500`
- `font-mono` — lining numbers, proportional nums, `'salt'` feature

Font weight via variation settings (not standard font-weight):

- `font-variation-bold` (wght 700)
- `font-variation-extrabold` (wght 750)
- `font-variation-medium` (wght 800)

## Semantic colours

Prefer semantic tokens over raw colour scales in components. The raw scales (fern, dandelion, rio, cornflour, grass, moss, lavender, magenta, neutral-01/02/03) exist in `css/primitives.css` but are for building tokens, not direct use.

Common semantic classes:

- Text: `text-heading`, `text-body`, `text-secondary`, `text-tertiary`
- Surfaces: `bg-canvas`, `bg-surface`, `bg-surface-02`, `bg-surface-03`, `bg-surface-04`
- Borders: `border-medium`, `border-strong`
- Code: `bg-code-bg`, `text-code-text`
- Navigation: `text-nav-active`, `text-toc-active`

All tokens support light/dark mode via `light-dark()` in `css/theme.css`.

## Layout and grid

The site uses a custom CSS grid with named column lines defined in `css/utilities.css`:

- `col-content` — main content width (1344px max)
- `col-container` — outer container (1920px max)
- `col-page` — full page width
- `col-prose` — narrower reading width
- `col-margin` — margin columns

Uses CSS subgrid extensively. For responsive behaviour in card-like components, prefer container queries (`@md`, `@container`) over media queries.

## Shadows

Semantic shadow scale defined in `css/utilities.css`:

- `shadow-subtle` — minimal outline-based
- `shadow-reduced` — light, layered
- `shadow-placed` — standard elevation
- `shadow-picked` — active/focused state
- `shadow-floating` — modals, floating elements
- `shadow-dandelion-*` — button-specific variants (reduced, placed, picked)

## Border radius

Custom scale defined in `css/primitives.css`:

- `radius-xs` (0.25rem), `radius-sm` (0.5rem), `radius` (1rem), `radius-lg` (1.5rem), `radius-xl` (2rem), `radius-full` (999rem)

## Images

Use the `Image` wrapper from `@/components/image` (wraps next/image). Standard blur placeholder pattern:

```jsx
import Image from '@/components/image'
;<Image
  src="/images/example.png"
  width={592}
  height={368}
  placeholder="blur"
  blurDataURL="data:image/gif;base64,R0lGODlh..."
  alt="Descriptive alt text"
/>
```

## Links

Use `Link` from `@/components/link`. It auto-detects internal routes (`/`-prefixed → next/link) vs external URLs (plain `<a>` with `rel="noopener noreferrer"`), and handles anchor links (`#`-prefixed).

```jsx
import Link from '@/components/link'

<Link href="/blog">Internal</Link>
<Link href="https://example.com">External</Link>
```

## Component conventions

- Server components by default. Only add `'use client'` when hooks or interactivity require it.
- Use react-aria-components for accessible modals, menus, and popovers.
- Standard transition: `transition duration-200` with `ease-in`, `ease-out`, or `ease-linear`.

## Content structure

Blog posts live in `content/blog/*.md`, notes in `content/notes/*.md`, pages in `content/pages/*.md`. Categories are defined in `content/categories.js`, collections in `content/collections.js`.

Key frontmatter fields for posts: `title`, `date`, `lastmod`, `summary`, `metadesc`, `ogImage`, `categories[]`, `tags[]`, `status` (draft/open/closed), `theme`, `large`, `medium`, `fileroot`, `id`.

## 12. You might not need an effect

It's important useEffect is avoided where possible and only used if absolutely necessary. Reference: https://react.dev/learn/you-might-not-need-an-effect
