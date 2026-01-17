---
name: writing-style
description: British English, curly quotes, proper dashes, and house typography standards for iamsteve.me content
keywords: [writing, content, blog, post, article, copy, text, typography, quote, dash, punctuation, British, English]
patterns:
  - Writing blog content
  - Creating articles or posts
  - Editing copy or text
  - Typography corrections
  - Content creation
---

# Writing Style Skill

This skill defines the house writing style for iamsteve.me, focusing on British English, proper typography, and content formatting conventions.

## When to Use This Skill

Activate this skill when:
- Writing blog posts, articles, or content
- Creating page copy or microcopy
- Editing existing content
- Reviewing content for style compliance
- Working with MDX or Markdown files in `/content` directory

## British English

**Always use British English spelling and grammar:**

### Common Differences
| British | American |
|---------|----------|
| colour | color |
| behaviour | behavior |
| centre | center |
| optimise | optimize |
| analyse | analyze |
| whilst | while |
| amongst | among |

### Grammar
- Use "have got" instead of "just have": "I've got a solution" not "I just have a solution"
- Collective nouns are plural: "The team are" not "The team is"
- Dates: day/month/year format preferred in prose

## Curly Quotes (Smart Quotes)

**CRITICAL: Always use curly quotes, never straight quotes.**

### Character Reference Table

| Character | Name | Unicode | HTML Entity | Numeric Entity | When to Use |
|-----------|------|---------|-------------|----------------|-------------|
| ' | Left single quotation | U+2018 | `&lsquo;` | `&#8216;` | Start of single quote |
| ' | Right single quotation | U+2019 | `&rsquo;` | `&#8217;` | End of single quote, apostrophes |
| " | Left double quotation | U+201C | `&ldquo;` | `&#8220;` | Start of double quote |
| " | Right double quotation | U+201D | `&rdquo;` | `&#8221;` | End of double quote |

### Apostrophes and Contractions

**Always use right single quotation (') for apostrophes:**

✓ Correct:
- I've been working on this
- Doesn't make sense
- We're learning about Grid
- It's important to understand

✗ Wrong (straight quotes):
- I've been working on this
- Doesn't make sense
- We're learning about Grid
- It's important to understand

### Quotations

**Use proper opening and closing quotes:**

✓ Correct:
- He said, "Grid is powerful."
- The "grid-template-areas" property
- Use 'single quotes' for quotes within quotes

✗ Wrong:
- He said, "Grid is powerful."
- The "grid-template-areas" property
- Use 'single quotes' for nested quotes

## Dashes

**Use the correct dash type for each situation.**

### En Dash (&ndash;) – Range and Relationships

**Use for:**
- Ranges: "2020&ndash;2025", "Monday&ndash;Friday"
- Relationships: "parent&ndash;child", "London&ndash;Paris flight"
- Score/results: "5&ndash;3 victory"

**Format**: No spaces around en dash

✓ Correct:
- The 2020&ndash;2025 period
- CSS&ndash;in&ndash;JS approach
- Pages 10&ndash;15

✗ Wrong:
- The 2020-2025 period (hyphen)
- CSS - in - JS approach (spaced hyphens)
- Pages 10-15 (hyphen)

### Em Dash (&mdash;) – Strong Pause

**Use for:**
- Strong pauses (stronger than comma, less formal than parentheses)
- Dramatic breaks in thought
- Emphasis or interruption

**CRITICAL FORMAT**: Separate with thin spaces (&thinsp;)

✓ Correct:
- This is a sentence&thinsp;—&thinsp;with proper em dashes.
- Grid is powerful&thinsp;—&thinsp;more than you might think&thinsp;—&thinsp;for responsive design.

✗ Wrong:
- This is a sentence—with improper dashes. (no thin spaces)
- Grid is powerful - more than you think - for design. (hyphens)
- This is a sentence -- with double hyphens. (not a dash)

### Hyphen (-) – Compound Words

**Use regular hyphens only for:**
- Compound words: "well-known", "front-end", "self-aware"
- Prefixes: "pre-CSS Grid era", "re-render"
- Line breaks (automatic)

## Sentence Case

**MUST use sentence case for all headings and titles.**

✓ Correct:
- CSS grid layouts have changed everything
- How to use grid template areas
- Why responsive design matters

✗ Wrong:
- CSS Grid Layouts Have Changed Everything (title case)
- How To Use Grid Template Areas (title case)
- WHY RESPONSIVE DESIGN MATTERS (all caps)

**Exception**: Proper nouns and names keep their capitalization:
- "Using CSS Grid with Next.js" (Next.js is a proper noun)
- "Tailwind CSS and modern design" (Tailwind CSS is a proper noun)

## Punctuation

### Titles and Headings
**Avoid punctuation in titles where possible:**

✓ Correct:
- CSS grid layouts
- How grid changed design
- Understanding grid template areas

✗ Wrong:
- CSS Grid Layouts.
- How Grid Changed Design!
- Understanding Grid Template Areas...

**Exception**: Question titles can have question marks:
- How does CSS Grid work?
- Should you use Grid or Flexbox?

### Hanging Lists and Punctuation

**For lists, use hanging punctuation format:**

✓ Correct:
```markdown
Key benefits:
- Improved layout control
- Better responsive behaviour
- Simplified code structure
```

✗ Wrong:
```markdown
Key benefits:
- Improved layout control.
- Better responsive behaviour.
- Simplified code structure.
```

**Exception**: If list items are complete sentences, use periods:
```markdown
Here's what happened:
- Grid revolutionised responsive design. It made complex layouts simple.
- Developers embraced the new approach. Frameworks became less necessary.
```

## Common Patterns

### Blog Post Introduction
```markdown
# CSS grid layouts have changed responsive design

Grid has revolutionised how we approach layout on the web. It's made complex responsive designs simple&thinsp;—&thinsp;something that previously required frameworks or complex calculations. We'll explore how Grid changed everything.
```

**Key elements:**
- ✓ Sentence case title
- ✓ Curly apostrophes (It's, we'll)
- ✓ Em dash with thin spaces
- ✓ British spelling (revolutionised)
- ✓ No title punctuation

### Content with Quotes
```markdown
Sarah described Grid as "a game changer" for her team's workflow. They'd struggled with float-based layouts&thinsp;—&thinsp;those dark days are over.
```

**Key elements:**
- ✓ Curly double quotes around quotation
- ✓ Curly apostrophe in "They'd"
- ✓ Em dash with thin spaces
- ✓ British vocabulary choices

### Technical Content
```markdown
The `grid-template-areas` property lets you name grid regions. It's particularly useful for responsive layouts&thinsp;—&thinsp;you can rearrange named areas at different breakpoints.
```

**Key elements:**
- ✓ Code in backticks (straight quotes OK in code)
- ✓ Curly apostrophe in "It's"
- ✓ Em dash with thin spaces
- ✓ British spelling (summarise, colour, behaviour, etc.)

## Anti-Patterns

### ✗ Straight Quotes
```markdown
Don't write: "I've been using Grid"
Write: "I've been using Grid"
```

### ✗ Wrong Dashes
```markdown
Don't write: Grid is powerful - more than you think.
Write: Grid is powerful&thinsp;—&thinsp;more than you think.

Don't write: The 2020-2025 period
Write: The 2020&ndash;2025 period
```

### ✗ American Spelling
```markdown
Don't write: Grid has changed the way we organize layouts and optimize for different sizes.
Write: Grid has changed the way we organise layouts and optimise for different sizes.
```

### ✗ Title Case
```markdown
Don't write: How CSS Grid Changed Responsive Design
Write: How CSS grid changed responsive design
```

## Entity Reference Quick Guide

**For content files (MDX/Markdown), use HTML entities:**

| Character | Entity | Use Case |
|-----------|--------|----------|
| ' | `&rsquo;` | Apostrophes, single close quote |
| ' | `&lsquo;` | Single open quote |
| " | `&ldquo;` | Double open quote |
| " | `&rdquo;` | Double close quote |
| – | `&ndash;` | En dash (ranges) |
| — | `&mdash;` | Em dash (pauses) |
|   | `&thinsp;` | Thin space (around em dash) |

**Example in MDX:**
```markdown
It&rsquo;s clear that Grid&thinsp;—&thinsp;introduced in 2017&ndash;2018&thinsp;—&thinsp;has &ldquo;revolutionised&rdquo; layout design.
```

## Integration with Other Skills

- **Accessibility Skill**: Ensure proper semantic HTML accompanies well-written content
- **Next.js/Tailwind Skill**: Apply writing style to component content and props
- **Contentlayer Skill**: Follow these conventions in frontmatter and MDX content

## Checklist Before Publishing Content

- [ ] British English spelling throughout
- [ ] All apostrophes are curly quotes (&rsquo;)
- [ ] All quotations use proper curly quotes (&ldquo;, &rdquo;)
- [ ] Em dashes have thin spaces: `&thinsp;&mdash;&thinsp;`
- [ ] En dashes used for ranges with no spaces: `&ndash;`
- [ ] Titles in sentence case
- [ ] No unnecessary punctuation in titles
- [ ] List punctuation follows hanging style
- [ ] No straight quotes or regular hyphens used as dashes
