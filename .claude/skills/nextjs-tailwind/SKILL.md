---
name: nextjs-tailwind
description: Next.js App Router patterns with Tailwind CSS v4, covering server components, client components, Image optimization, and utility-first styling
keywords: [nextjs, next, app router, component, tailwind, css, styling, image, link, layout, metadata, server, client]
patterns:
  - Creating Next.js components
  - Using Tailwind CSS utilities
  - Optimizing images
  - Building layouts
  - Managing metadata
---

# Next.js + Tailwind CSS Skill

This skill defines patterns for building with Next.js 16 App Router and Tailwind CSS v4, focusing on server components, performance optimization, and utility-first styling.

## When to Use This Skill

Activate this skill when:
- Creating Next.js components
- Building page layouts
- Styling with Tailwind CSS
- Optimizing images or fonts
- Using Next.js Link for navigation
- Setting up metadata
- Deciding between server and client components

## Core Principles

### Server Components First
- **Default to server components** (no 'use client' directive)
- Only use 'use client' when you need:
  - React hooks (useState, useEffect, etc.)
  - Event handlers (onClick, onChange, etc.)
  - Browser APIs (localStorage, window, etc.)
  - Third-party libraries that require client-side

### Tailwind Utility Classes Only
- **NEVER use @apply directive**
- Write utility classes directly in className
- Use template literals for conditional classes
- Component variants via props, not CSS classes

### Performance First
- Use Next.js Image for all images
- Use next/link for all internal navigation
- Leverage server components for data fetching
- Optimize fonts with next/font

## Server vs Client Components

### Server Component (Default)

```tsx
// app/components/post-card.tsx
// NO 'use client' directive

import Image from 'next/image';
import Link from 'next/link';

interface PostCardProps {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  readTime: number;
}

export function PostCard({ title, excerpt, image, slug, readTime }: PostCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600">
            {title}
          </h3>

          <p className="mb-4 text-gray-600 line-clamp-2">
            {excerpt}
          </p>

          <span className="text-sm text-gray-500">
            {readTime} min read
          </span>
        </div>
      </Link>
    </article>
  );
}
```

**Why Server Component:**
- No interactivity (just displays data)
- No state management needed
- No event handlers
- Can be rendered on server for better performance

### Client Component (When Needed)

```tsx
// app/components/search-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchForm() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />

      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
}
```

**Why Client Component:**
- Uses useState for form state
- Uses event handlers (onSubmit, onChange)
- Uses useRouter for navigation
- Requires client-side interactivity

## Component Naming and Structure

### Naming Conventions

**Keep names short but not purposefully abbreviated:**
- ✓ `Navigation` (not `Nav`)
- ✓ `Card` (not `ContentCard`)
- ✓ `Link` (not `TextLink`)
- ✓ `PostCard` (descriptive when needed)

**File naming:**
- Use kebab-case: `post-card.tsx`, `navigation.tsx`
- Match component name in file: `export function PostCard`

### Component Structure

```
app/
  components/
    post-card.tsx         // Reusable component
    navigation.tsx        // Layout component
    search-form.tsx       // Interactive component
  blog/
    [slug]/
      page.tsx           // Route page
    page.tsx             // Route page
  layout.tsx             // Root layout
```

### Export Pattern

```tsx
// ✓ Named exports (preferred)
export function PostCard() { }
export function Navigation() { }

// ✗ Default exports (avoid)
export default function PostCard() { }
```

## Next.js Image Optimization

### Basic Image

```tsx
import Image from 'next/image';

// Fixed dimensions
<Image
  src="/images/post.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  className="rounded-lg"
/>

// Fill container (responsive)
<div className="relative aspect-video w-full">
  <Image
    src="/images/post.jpg"
    alt="Descriptive alt text"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
  />
</div>
```

### Image Best Practices

1. **Always use Image component** (not `<img>`)
2. **Always provide alt text** (accessibility)
3. **Use sizes prop for responsive images**
4. **Use priority for above-fold images**
5. **Use object-cover for fill images**

### Sizes Prop Guide

```tsx
// Full width on mobile, half width on tablet, third width on desktop
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

// Always full width
sizes="100vw"

// Fixed width
sizes="800px"
```

## Link Patterns

### Internal Links

```tsx
import Link from 'next/link';

// Basic link
<Link href="/blog" className="text-blue-600 hover:text-blue-800">
  Blog
</Link>

// Dynamic route
<Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800">
  {post.title}
</Link>

// With entire card clickable
<Link href={`/blog/${post.slug}`} className="block">
  <article>...</article>
</Link>
```

### External Links

```tsx
// External link with security
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:text-blue-800"
>
  External Link
  <span className="sr-only">Opens in new window</span>
</a>
```

## Tailwind CSS Patterns

### NO @apply Directive

```tsx
// ✗ WRONG - Never do this
<style jsx>{`
  .card {
    @apply rounded-lg shadow-md p-4;
  }
`}</style>

// ✓ RIGHT - Use utility classes directly
<div className="rounded-lg shadow-md p-4">
```

### Utility Class Organization

**Order classes logically:**
1. Layout (display, position, flex, grid)
2. Spacing (padding, margin)
3. Sizing (width, height)
4. Typography (font, text)
5. Colors (bg, text, border)
6. Effects (shadow, opacity)
7. States (hover, focus, active)

```tsx
// Example: Well-organized classes
<button className="
  inline-flex items-center justify-center
  px-6 py-3 gap-2
  rounded-lg
  text-base font-medium text-white
  bg-blue-600 border border-transparent
  shadow-sm
  hover:bg-blue-700
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Button Text
</button>
```

### Responsive Utilities

```tsx
// Mobile-first responsive design
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2 sm:gap-6
  lg:grid-cols-3 lg:gap-8
">
  {posts.map(post => <PostCard key={post.id} {...post} />)}
</div>
```

### Conditional Classes

```tsx
// Using template literals
<button className={`
  px-4 py-2 rounded-lg
  ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}
  ${isDisabled && 'opacity-50 cursor-not-allowed'}
`}>
  Button
</button>

// Or use a helper like clsx
import clsx from 'clsx';

<button className={clsx(
  'px-4 py-2 rounded-lg',
  isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800',
  isDisabled && 'opacity-50 cursor-not-allowed'
)}>
  Button
</button>
```

### Component Variants via Props

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children }: ButtonProps) {
  return (
    <button className={clsx(
      // Base styles
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',

      // Size variants
      size === 'sm' && 'px-3 py-1.5 text-sm',
      size === 'md' && 'px-4 py-2 text-base',
      size === 'lg' && 'px-6 py-3 text-lg',

      // Color variants
      variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      variant === 'ghost' && 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
    )}>
      {children}
    </button>
  );
}
```

## Layout Patterns

### Root Layout

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'iamsteve.me',
    template: '%s | iamsteve.me'
  },
  description: 'Design, code, and content by Steve McKinney',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={inter.className}>
      <body className="bg-white text-gray-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-gray-200">
            <Navigation />
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-gray-200 py-8">
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}
```

### Page with Metadata

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        {post.title}
      </h1>

      <div className="prose prose-lg">
        {post.content}
      </div>
    </article>
  );
}
```

## Common Patterns

### Container

```tsx
// Centered container with max width
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {children}
</div>

// Content container for prose
<div className="mx-auto max-w-3xl px-4">
  {children}
</div>
```

### Grid Layouts

```tsx
// Responsive grid
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// Auto-fit grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Flexbox Layouts

```tsx
// Horizontal stack with spacing
<div className="flex items-center gap-4">
  {children}
</div>

// Vertical stack
<div className="flex flex-col gap-6">
  {children}
</div>

// Space between
<div className="flex items-center justify-between">
  <div>{left}</div>
  <div>{right}</div>
</div>
```

### Typography

```tsx
// Heading hierarchy
<h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">
<h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
<h3 className="text-2xl font-bold text-gray-900 lg:text-3xl">
<h4 className="text-xl font-semibold text-gray-900 lg:text-2xl">

// Body text
<p className="text-base text-gray-600 leading-relaxed">

// Small text
<span className="text-sm text-gray-500">
```

## TypeScript Patterns

### Component Props

```tsx
// Interface for props
interface CardProps {
  title: string;
  description?: string;  // Optional
  children: React.ReactNode;
  variant?: 'default' | 'featured';
}

export function Card({
  title,
  description,
  children,
  variant = 'default'
}: CardProps) {
  return <div>...</div>;
}
```

### Page Props

```tsx
interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  return <div>...</div>;
}
```

## Anti-Patterns

### ✗ Using @apply

```tsx
// WRONG - Never use @apply
<style jsx>{`
  .button {
    @apply px-4 py-2 bg-blue-600 text-white rounded;
  }
`}</style>
```

### ✗ Unnecessary Client Components

```tsx
// WRONG - No need for 'use client' here
'use client';

export function PostCard({ post }) {
  return <article>...</article>;
}
```

### ✗ Regular img Tag

```tsx
// WRONG - Use Next.js Image instead
<img src="/image.jpg" alt="Description" />

// RIGHT
<Image src="/image.jpg" alt="Description" width={800} height={600} />
```

### ✗ Inline Styles

```tsx
// WRONG - Use Tailwind utilities
<div style={{ padding: '16px', backgroundColor: '#f0f0f0' }}>

// RIGHT
<div className="p-4 bg-gray-100">
```

## Integration with Other Skills

- **Accessibility Skill**: Apply focus utilities, ARIA attributes, semantic HTML
- **Writing Style Skill**: British English in content, proper quotes in text
- **Contentlayer Skill**: MDX content with Next.js App Router

## Quick Reference

### Spacing Scale

- `p-1` = 4px (0.25rem)
- `p-2` = 8px (0.5rem)
- `p-4` = 16px (1rem)
- `p-6` = 24px (1.5rem)
- `p-8` = 32px (2rem)

### Breakpoints

- `sm:` = 640px
- `md:` = 768px
- `lg:` = 1024px
- `xl:` = 1280px
- `2xl:` = 1536px

### Common Class Patterns

```tsx
// Card
"rounded-lg bg-white p-6 shadow-sm"

// Button
"rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2"

// Input
"w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2"

// Container
"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
```
