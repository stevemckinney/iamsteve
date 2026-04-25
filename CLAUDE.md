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
- Keep it short but not purposefully abbreviated: `Navigation` not `Nav`, `Card` not `ContentCard`, `Link` not `TextLink`.

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

## 12. You might not need an effect
It's important useEffect is avoided where possible and only used if absolutely necessary. reference: https://react.dev/learn/you-might-not-need-an-effect
