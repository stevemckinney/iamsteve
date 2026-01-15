---
name: accessibility-patterns
description: Comprehensive accessibility patterns for building WCAG 2.1 AA compliant components with keyboard navigation, screen reader support, and focus management
keywords: [accessibility, a11y, ARIA, keyboard, focus, screen reader, modal, dialog, button, form, navigation, menu, wcag]
patterns:
  - Building modals or dialogs
  - Creating forms with validation
  - Navigation components
  - Interactive elements (buttons, links)
  - Focus management
  - Keyboard interactions
---

# Accessibility Patterns Skill

This skill provides comprehensive accessibility implementation patterns for building WCAG 2.1 Level AA compliant components, with focus on keyboard navigation, screen reader support, and inclusive design.

## When to Use This Skill

Activate this skill when:
- Creating interactive UI components (modals, menus, forms)
- Building navigation systems
- Implementing keyboard interactions
- Adding ARIA attributes
- Managing focus states
- Ensuring screen reader compatibility
- Fixing accessibility issues

## Core Principles

### The A11y Checklist
Every component should satisfy:
- ✓ Keyboard navigation works (Tab, Shift+Tab, Arrow keys, Escape, Enter)
- ✓ Screen reader friendly (proper ARIA, semantic HTML, announcements)
- ✓ Color contrast meets AA standard (4.5:1 for normal text, 3:1 for large text)
- ✓ Focus indicators visible (outline or custom focus styles)
- ✓ Alt text on images (descriptive, not decorative)
- ✓ Form labels present (visible labels, proper associations)
- ✓ Heading hierarchy logical (h1 → h2 → h3, no skipping levels)

### Progressive Enhancement
1. Start with semantic HTML
2. Add keyboard interaction
3. Include ARIA when semantic HTML isn't sufficient
4. Test with keyboard only
5. Test with screen reader

## Modal/Dialog Pattern

Modals are one of the most complex accessible components. Here's the complete pattern:

### Complete Accessible Modal

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save currently focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the modal
    modalRef.current?.focus();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Cleanup
    return () => {
      document.body.style.overflow = '';
      // Restore focus to trigger element
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key closes modal
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Tab key trapping
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modal = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-white p-6 shadow-xl"
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {title}
        </h2>

        <div className="mb-6">{children}</div>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close dialog"
        >
          Close
        </button>
      </div>
    </>
  );

  return createPortal(modal, document.body);
}
```

### Key Accessibility Features

1. **ARIA Attributes**
   - `role="dialog"` identifies as dialog
   - `aria-modal="true"` indicates modal behavior
   - `aria-labelledby` points to title for screen readers
   - `aria-label` on close button describes action

2. **Focus Management**
   - Save previous focus on open
   - Focus modal immediately on open
   - Restore focus to trigger on close
   - Modal container is focusable with `tabIndex={-1}`

3. **Keyboard Interactions**
   - Escape key closes modal
   - Tab key trapped within modal (focus cycle)
   - Shift+Tab works in reverse

4. **Screen Reader Support**
   - Backdrop has `aria-hidden="true"` (not announced)
   - Title properly associated with dialog
   - Close button has descriptive label

5. **Visual Considerations**
   - Focus indicators on interactive elements
   - Backdrop provides visual context
   - Body scroll prevented when open

## Form Pattern

### Accessible Form with Validation

```tsx
'use client';

import { useState } from 'react';

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation logic
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Name field */}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-medium">
          Name
          <span className="text-red-600" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          aria-required="true"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
          onBlur={() => setTouched({ ...touched, name: true })}
        />
        {errors.name && touched.name && (
          <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email field */}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium">
          Email
          <span className="text-red-600" aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-required="true"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
          onBlur={() => setTouched({ ...touched, email: true })}
        />
        {errors.email && touched.email && (
          <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Send message
      </button>
    </form>
  );
}
```

### Form Accessibility Features

1. **Labels**
   - Every input has associated `<label>` with `htmlFor`
   - Labels visible (not placeholder-only)
   - Required indicator with `aria-label="required"`

2. **Validation**
   - `aria-invalid` indicates validation state
   - `aria-describedby` links to error message
   - Error messages have `role="alert"` (announced)
   - Errors shown only after field touched

3. **Required Fields**
   - Visual indicator (* with label)
   - `required` attribute for native validation
   - `aria-required="true"` for screen readers

4. **Focus Management**
   - Clear focus indicators (`focus:ring-2`)
   - Logical tab order
   - Focus offset on buttons

## Button vs Link Pattern

### When to Use Each

**Use `<button>` for:**
- Actions (submit, open, close, toggle)
- JavaScript interactions
- State changes

**Use `<a>` for:**
- Navigation to URLs
- Downloads
- Anchor links

### Accessible Button

```tsx
// Interactive button
<button
  onClick={handleClick}
  aria-label="Close menu"
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <CloseIcon aria-hidden="true" />
</button>

// Disabled button (avoid if possible, show why disabled instead)
<button
  onClick={handleSubmit}
  disabled={isSubmitting}
  aria-busy={isSubmitting}
  aria-disabled={isSubmitting}
>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>
```

### Accessible Link

```tsx
// Navigation link
<a
  href="/blog/css-grid"
  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  Read more about CSS Grid
</a>

// Link that looks like button (use sparingly)
<a
  href="/signup"
  role="button"
  className="inline-block px-6 py-2 bg-blue-600 text-white"
>
  Sign up
</a>
```

### Button/Link Accessibility Features

1. **Purpose Clear from Label**
   - "Close menu" not just "Close"
   - "Read more about CSS Grid" not just "Read more"
   - Context included in link text or aria-label

2. **Icon-Only Buttons**
   - Always have `aria-label`
   - Icon has `aria-hidden="true"`

3. **Loading States**
   - Use `aria-busy` during async operations
   - Update button text to indicate loading

4. **Focus Indicators**
   - Visible outline or ring
   - High contrast with background

## Keyboard Navigation Patterns

### Common Keyboard Interactions

| Element | Keys | Behavior |
|---------|------|----------|
| Button | Enter, Space | Activate button |
| Link | Enter | Navigate to URL |
| Modal | Escape | Close modal |
| Modal | Tab | Cycle through focusable elements (trapped) |
| Menu | Arrow Up/Down | Navigate menu items |
| Menu | Escape | Close menu |
| Checkbox | Space | Toggle checked state |
| Radio | Arrow keys | Select option |

### Focus Management Checklist

- [ ] Focus moved to component when opened
- [ ] Focus trapped within component (modals, menus)
- [ ] Escape key closes component
- [ ] Focus returned to trigger element when closed
- [ ] Tab order is logical
- [ ] Focusable elements have visible focus indicators

## Color Contrast Requirements

### WCAG 2.1 Level AA

**Normal Text (< 24px or < 19px bold):**
- Contrast ratio: 4.5:1 minimum
- Example: #222222 text on #FFFFFF background = 16.9:1 ✓

**Large Text (≥ 24px or ≥ 19px bold):**
- Contrast ratio: 3:1 minimum
- Example: #767676 text on #FFFFFF background = 4.7:1 ✓

**UI Components and Graphics:**
- Contrast ratio: 3:1 minimum
- Applies to: Form borders, focus indicators, icons

### Tools
- Chrome DevTools: Color picker shows contrast ratio
- Browser extensions: WAVE, axe DevTools
- Online: WebAIM Contrast Checker

### Common Pitfalls

✗ Light grey text on white: #CCCCCC on #FFFFFF = 1.6:1 (fails)
✓ Dark grey text on white: #666666 on #FFFFFF = 5.7:1 (passes)

✗ Blue link on black: #0066FF on #000000 = 8.6:1 but low contrast with surrounding text
✓ Blue link with underline: Visual distinction beyond colour alone

## Screen Reader Patterns

### ARIA Landmarks

```tsx
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    {/* nav content */}
  </nav>
</header>

<main role="main" aria-labelledby="page-title">
  <h1 id="page-title">Page Title</h1>
  {/* main content */}
</main>

<aside role="complementary" aria-label="Related articles">
  {/* sidebar */}
</aside>

<footer role="contentinfo">
  {/* footer content */}
</footer>
```

### Live Regions

```tsx
// Status messages (not interrupting)
<div role="status" aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Error alerts (interrupting)
<div role="alert" aria-live="assertive" aria-atomic="true">
  {errorMessage}
</div>

// Loading states
<div role="status" aria-live="polite" aria-busy="true">
  Loading...
</div>
```

### Visually Hidden Text

```tsx
// Utility class for screen reader only text
<span className="sr-only">
  Opens in new window
</span>

// CSS
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Image Accessibility

### Alt Text Guidelines

```tsx
// Informative image
<img
  src="/chart.png"
  alt="Bar chart showing 60% increase in mobile traffic from 2023 to 2024"
/>

// Decorative image
<img
  src="/decoration.png"
  alt=""
  role="presentation"
/>

// Linked image
<a href="/profile">
  <img src="/avatar.jpg" alt="View Jane's profile" />
</a>

// Complex image (requires longer description)
<figure>
  <img
    src="/complex-chart.png"
    alt="Sales data comparison chart"
    aria-describedby="chart-description"
  />
  <figcaption id="chart-description">
    Detailed description of sales data...
  </figcaption>
</figure>
```

### Alt Text Rules

- Informative images: Describe the information
- Decorative images: Use empty alt (`alt=""`)
- Linked images: Describe the link destination
- Complex images: Use `aria-describedby` for long descriptions
- Don't say "image of" or "picture of" (implied)
- Be concise but descriptive

## Heading Hierarchy

### Correct Structure

```tsx
<h1>Page Title</h1>

<h2>Section One</h2>
<p>Content...</p>

<h3>Subsection 1.1</h3>
<p>Content...</p>

<h3>Subsection 1.2</h3>
<p>Content...</p>

<h2>Section Two</h2>
<p>Content...</p>
```

### Rules

- Only one `<h1>` per page
- Don't skip levels (h1 → h3 is wrong)
- Headings create document outline
- Screen readers navigate by headings
- Visual styling separate from semantic level

## Anti-Patterns

### ✗ Div Buttons
```tsx
// Wrong: div that acts like button
<div onClick={handleClick}>Click me</div>

// Right: actual button
<button onClick={handleClick}>Click me</button>
```

### ✗ Placeholder as Label
```tsx
// Wrong: no visible label
<input type="text" placeholder="Enter your name" />

// Right: proper label
<label htmlFor="name">Name</label>
<input type="text" id="name" placeholder="e.g., John Smith" />
```

### ✗ Poor Focus Management
```tsx
// Wrong: modal opens, focus stays on trigger
<Modal isOpen={isOpen}>{content}</Modal>

// Right: focus moved to modal on open
// (See complete Modal pattern above)
```

### ✗ Missing Keyboard Support
```tsx
// Wrong: only mouse events
<div onClick={handleOpen}>Open</div>

// Right: keyboard events too
<button onClick={handleOpen} onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleOpen();
  }
}}>
  Open
</button>

// Better: use <button> which has keyboard support built-in
<button onClick={handleOpen}>Open</button>
```

## Testing Checklist

### Keyboard Testing
- [ ] Tab through entire page
- [ ] Tab order is logical
- [ ] All interactive elements reachable
- [ ] Focus indicators visible
- [ ] No keyboard traps (except intentional like modals)
- [ ] Escape key closes overlays
- [ ] Enter/Space activates buttons

### Screen Reader Testing
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] All content announced properly
- [ ] Headings create clear structure
- [ ] Landmarks help navigation
- [ ] Form fields properly labeled
- [ ] Error messages announced
- [ ] State changes announced (loading, errors)

### Visual Testing
- [ ] Zoom to 200% (content still usable)
- [ ] Contrast meets AA standard
- [ ] Focus indicators visible
- [ ] Color not sole means of conveying information

## Integration with Other Skills

- **Next.js/Tailwind Skill**: Apply Tailwind focus utilities (focus:ring, focus:outline)
- **Writing Style Skill**: Alt text follows British English and content guidelines
- **Component Patterns**: Build accessible versions of common components

## Quick Reference

### ARIA Attributes Reference

| Attribute | Usage |
|-----------|-------|
| `role="dialog"` | Modal, dialog |
| `role="alert"` | Error messages, important updates |
| `role="status"` | Non-critical status messages |
| `role="navigation"` | Navigation regions |
| `role="button"` | Element that acts as button |
| `aria-label` | Provide label when none visible |
| `aria-labelledby` | Point to element that labels this one |
| `aria-describedby` | Point to element that describes this one |
| `aria-hidden="true"` | Hide from screen readers |
| `aria-live="polite"` | Announce changes when convenient |
| `aria-live="assertive"` | Announce changes immediately |
| `aria-modal="true"` | Indicate modal behavior |
| `aria-expanded` | Expanded/collapsed state |
| `aria-current="page"` | Current page in navigation |
| `aria-invalid` | Invalid form field |
| `aria-required` | Required form field |
| `aria-busy` | Loading/processing state |

### Focus Utilities (Tailwind)

```tsx
// Basic outline
focus:outline-none focus:ring-2 focus:ring-blue-500

// With offset
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2

// Visible focus indicator (custom)
focus-visible:ring-2 focus-visible:ring-blue-500
```
