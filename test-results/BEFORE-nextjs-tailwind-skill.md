# BEFORE: Next.js/Tailwind Skill

## Test Setup
- Date/Time: 2026-01-15
- Current Configuration: CLAUDE.md mentions Next.js App Router and Tailwind, but no dedicated skill
- Current State: Guidelines say "Prefer Next.js App Router" and "Strictly tailwindcss, do not use @apply"

## Test Prompt
"Create a reusable Card component for displaying blog post previews with an image, title, excerpt, and read time. Make it work with our Next.js app."

## Expected Behavior Analysis

### What Would Happen:
1. Claude would check CLAUDE.md for guidelines
2. Claude would create a component
3. Might use client component when server component would work
4. Might forget to optimize images with Next.js Image
5. Might use @apply despite guideline against it
6. **Unclear patterns**: App Router conventions not fully documented
7. **Component structure uncertain**: File organization, naming, exports
8. User might need to request specific Next.js features

### Example Output Issues:

**Likely Output:**
```tsx
// components/Card.tsx
'use client';

import Image from 'next/image';

export default function Card({ post }: { post: Post }) {
  return (
    <div className="card">
      <img src={post.image} alt={post.title} />
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <span>{post.readTime} min read</span>
    </div>
  );
}

// Corresponding CSS
// card.css
.card {
  @apply rounded-lg shadow-md p-4;
}
```

**Issues in this output:**
- ✗ Uses 'use client' directive unnecessarily (should be server component)
- ✗ Uses regular `<img>` instead of Next.js `<Image>` for optimization
- ✗ Created separate CSS file with @apply (violates strict Tailwind rule)
- ✗ Used default export instead of named export
- ✗ Component name "Card" is not descriptive enough per guidelines
- ✗ No proper TypeScript types defined
- ✗ Inconsistent with component naming conventions

### Tool Calls Expected:
1. `Read` - Read CLAUDE.md for guidelines
2. `Write` - Write the Card component
3. Potentially multiple back-and-forth to fix issues

### Issues:
- **Client vs Server unclear**: When to use 'use client' not documented
- **Next.js Image patterns**: Optimization features not explained
- **@apply usage**: Rule says "do not use @apply" but no explanation of why or alternatives
- **Component conventions**: Naming (Card vs PostCard) not clear
- **File structure**: Where components go, how to organize not documented
- **TypeScript patterns**: Type definitions, interfaces not standardized
- **Link patterns**: When to use next/link vs regular links not covered

### Quality Metrics:
- **Next.js Optimization**: 4/10 (missing Image optimization, unnecessary client component)
- **Tailwind Best Practices**: 3/10 (used @apply against guidelines)
- **Component Structure**: 5/10 (basic structure but missing conventions)
- **TypeScript Quality**: 6/10 (basic types but not comprehensive)
- **Performance**: 5/10 (not leveraging Next.js features)

## Raw Notes

Without a dedicated Next.js/Tailwind skill:
- High-level guidelines exist but not detailed patterns
- "Prefer Next.js App Router" - but WHAT does that mean in practice?
- "Do not use @apply" - but HOW to structure utility classes instead?
- Component naming conventions mentioned but not enforced
- Image optimization patterns not documented
- Server vs client component decision tree not clear
- Link usage patterns not documented
- Layout and metadata conventions not explained

## Current CLAUDE.md Coverage

The guidelines include:
- Use 2 spaces for indentation
- Prefer Next.js App Router
- Strictly tailwindcss, do not use @apply
- Component naming: "Navigation" not "Nav", "Card" not "ContentCard"

**Problem**: These are rules but not patterns:
- "App Router" → but WHICH App Router conventions?
- "Do not use @apply" → but HOW to organize utility classes?
- No examples showing correct Next.js component structure
- No patterns for Image, Link, font optimization
- No guidance on server vs client components
- No examples of proper Tailwind utility usage
- No responsive design patterns

## Real Scenario Example

**User asks**: "Create a Card component for blog post previews"

**Claude thinks**:
- Need to create a component
- Check CLAUDE.md: "Prefer Next.js App Router", "Do not use @apply"
- Hmm, App Router... I'll make it a client component to be safe
- Images... I'll use Next.js Image (good)
- Oh wait, or maybe regular img? Let me use img (mistake)
- Styling... "do not use @apply"... okay I'll use inline classes
- Actually let me create a CSS file with @apply anyway (violates guideline)
- Component name... "Card" seems fine
- Export... default export is standard (doesn't match conventions)

**Result**: Component works but:
- Uses 'use client' unnecessarily (bad for performance)
- Used regular img (no optimization)
- Created CSS with @apply (violates guidelines)
- Naming might not match conventions
- Not leveraging Next.js features fully

**User**: "Can you use Next.js Image for optimization?"
**Claude**: "Sure, let me update that"
**User**: "This should be a server component, remove 'use client'"
**Claude**: "Okay, removing that"
**User**: "Don't use @apply, use utility classes directly"
**Claude**: "Let me update the styling"

Multiple rounds needed to align with best practices.
