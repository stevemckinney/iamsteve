# GitHub Issues to Create

Copy and paste these into GitHub issues:

---

## Issue 1: Remove console.log statements from production code

**Labels:** `enhancement`, `code-quality`

### Problem
Console logs are present in production code across 19 files, including API routes and components.

### Impact
- Larger production bundle
- Potential exposure of sensitive data in browser console
- Unprofessional appearance

### Files to clean
- `app/api/newsletter/route.js` (lines 8, 13, 41, 44, 50, 57)
- `app/api/revalidate.js`
- `components/error-boundary.js`
- Script files (lower priority as dev-only)

### Solution
Either:
1. Remove console statements entirely, or
2. Wrap in environment checks:
```javascript
if (process.env.NODE_ENV !== 'production') {
  console.log(...)
}
```

### Priority
Medium - professional polish and bundle optimization

---

## Issue 2: Add pagination edge case handling (404 for invalid pages)

**Labels:** `bug`, `UX`

### Problem
Navigating to `/blog/page/999` (when only 10 pages exist) shows an empty page instead of returning a 404.

### Impact
- Poor user experience
- Broken URLs could be indexed by search engines
- Confusing for users who land on empty pages

### Files affected
- `components/pagination.js`
- `app/(blog)/blog/page.js`
- `app/(blog)/category/[slug]/page/[page]/page.js`

### Solution
Add validation in page components:
```javascript
if (pageNumber > pagination.total || pageNumber < 1 || isNaN(pageNumber)) {
  notFound()
}
```

### Priority
Medium - affects user experience

---

## Issue 3: Re-enable React Strict Mode

**Labels:** `enhancement`, `maintenance`

### Problem
React Strict Mode is disabled in `next.config.js:62`
```javascript
reactStrictMode: false,
```

### Impact
Strict Mode helps catch:
- Unsafe lifecycle methods
- Legacy API usage
- Unexpected side effects
- Potential issues before they become bugs

### Solution
1. Change to `reactStrictMode: true`
2. Test thoroughly for any warnings
3. Fix any issues that appear

### Note
If there's a specific reason it was disabled, document it in the config file.

### Priority
Low - preventative maintenance

---

## Issue 4: Remove unused state in newsletter form

**Labels:** `enhancement`, `code-quality`

### Problem
`components/newsletter-form.js:12` has unused state:
```javascript
const [subscriberCount, setSubscriberCount] = useState(700)
```
`setSubscriberCount` is never called - the count is hardcoded.

### Solution
Either:
1. Fetch real subscriber count from EmailOctopus API
2. Replace with a const variable:
```javascript
const subscriberCount = 700
```

### Priority
Low - minor code cleanup

---

## Issue 5: Fix duplicate class name in newsletter form

**Labels:** `bug`, `code-quality`

### Problem
`components/newsletter-form.js:150` has duplicate class:
```javascript
className="button-dandelion select-none ... button-dandelion ..."
```

### Solution
Remove the duplicate `button-dandelion` class.

### Priority
Low - cosmetic issue, no functional impact

---

## Issue 6: Improve contact form honeypot implementation

**Labels:** `enhancement`, `security`

### Problem
`components/contact-form.js:97` uses `type="radio"` for honeypot:
```javascript
<input type="radio" name="title" id="title" />
```

### Impact
Radio buttons without options are unusual. Bots typically auto-fill text fields, making `type="text"` more effective.

### Solution
```javascript
<input type="text" name="title" id="title" tabIndex="-1" />
```

### Priority
Low - minor security improvement

---

## Issue 7: Investigate and reduce static generation timeout

**Labels:** `performance`, `investigation`

### Problem
`next.config.js:77` has unusually high timeout:
```javascript
staticPageGenerationTimeout: 240, // 4 minutes!
```

### Impact
- Very slow builds
- Might indicate underlying performance issues

### Investigation needed
Why do builds take so long?
- Slow content processing?
- Large number of pages?
- External API calls during build?
- Contentlayer processing bottleneck?

### Solution
1. Profile build performance
2. Optimize slow operations
3. Reduce timeout to reasonable value (30-60s)

### Priority
Low - investigate when time allows

---

## Issue 8: Add input validation to image loader

**Labels:** `enhancement`, `bug`

### Problem
`lib/utils/image-loader.js` doesn't validate inputs:
```javascript
export default function imageLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 100}`
}
```

### Impact
- Could generate malformed URLs
- No handling of undefined/null values

### Solution
```javascript
export default function imageLoader({ src, width, quality }) {
  if (!src || typeof width !== 'number') {
    console.warn('Invalid image loader params:', { src, width, quality })
    return src
  }
  return `${src}?w=${width}&q=${quality || 100}`
}
```

### Priority
Low - edge case handling

---

## Issue 9: Consider stricter Content Security Policy headers

**Labels:** `security`, `enhancement`

### Problem
`next.config.js` CSP includes weak directives:
```javascript
script-src 'self' 'unsafe-eval' 'unsafe-inline' ...
style-src 'self' 'unsafe-inline' ...
```

### Impact
`'unsafe-eval'` and `'unsafe-inline'` significantly weaken XSS protection.

### Solution (larger refactor)
Use nonces or hashes instead of `unsafe-inline`:
```javascript
// Generate nonce per request
const nonce = crypto.randomBytes(16).toString('base64')
script-src 'self' 'nonce-${nonce}'
```

### Priority
Low - requires significant refactoring, investigate when security review is needed

---

## Issue 10: Migrate contact form to Cloudflare Email Workers

**Labels:** `enhancement`, `migration`, `cloudflare`

### Problem
Contact form currently disabled (`FORM_DISABLED = true` in `components/contact-form.js:11`) due to Netlify Forms dependency. Site has moved to Next.js and needs a new email solution.

### Current state
- Form uses Netlify Forms (`data-netlify="true"`)
- Has good spam prevention (honeypot, rate limiting, minimum word count)
- Uses Radix UI Form and Toast components

### Impact
- Contact form is unavailable to users
- Cannot receive contact submissions

### Solution
Migrate to Cloudflare Email Workers:
1. Set up Cloudflare Email Routing (free, domain already on Cloudflare DNS)
2. Create Cloudflare Worker to handle form submissions
3. Add Cloudflare Turnstile for spam prevention (free, privacy-friendly)
4. Update `components/contact-form.js` to POST to Worker endpoint
5. Keep existing rate limiting and honeypot as defence-in-depth

### Files affected
- `components/contact-form.js`
- New: Cloudflare Worker for email handling

### Benefits
- Free solution (Workers free tier: 100k requests/day)
- No external service costs
- Better spam prevention with Turnstile
- Faster response times (edge deployment)

### Priority
Medium &ndash; restores user-facing functionality

---

## Issue 11: Migrate view tracking from Supabase to Cloudflare D1

**Labels:** `enhancement`, `migration`, `cloudflare`, `performance`

### Problem
Currently using Supabase for simple view counting feature. Opportunity to reduce dependencies and costs by migrating to Cloudflare D1.

### Current state
- Supabase database with single table: `page_views` (slug, view_count)
- One RPC function for atomic increments
- Server actions for reading/incrementing view counts
- Minimal usage: ~2 SELECT queries + 1 RPC per blog page view

### Impact
- External dependency on Supabase
- Additional service costs
- More complex setup than needed

### Solution
Migrate to Cloudflare D1 (SQLite database):

**Database schema:**
```sql
CREATE TABLE page_views (
  slug TEXT PRIMARY KEY,
  view_count INTEGER DEFAULT 0
);
```

**Migration steps:**
1. Create D1 database via Cloudflare dashboard
2. Export data from Supabase (simple CSV or SQL dump)
3. Import to D1
4. Create D1 client wrapper (replace Supabase client)
5. Update `app/(blog)/blog/views.js` and `app/(blog)/blog/increment.js`
6. Test thoroughly before switching
7. Remove Supabase dependencies from `package.json`

### Files affected
- `lib/supabase.js` → replace with D1 client
- `lib/supabase-admin.js` → remove
- `app/(blog)/blog/views.js` → update queries
- `app/(blog)/blog/increment.js` → update to use D1
- `app/page.js` → verify cached view counts work
- `package.json` → remove `@supabase/ssr` and `@supabase/supabase-js`

### Benefits
- Free tier: 100k reads/day, 50k writes/day (plenty for this use case)
- Global replication automatically
- Simpler codebase (direct SQL vs Supabase SDK)
- One less external service to manage
- Lower latency (edge deployment)

### Data volume
Estimated <1000 rows (one per blog post), minimal writes, mostly reads

### Priority
Low &ndash; nice-to-have optimization, current solution works

---

## Issue 12: Evaluate Astro migration (long-term)

**Labels:** `investigation`, `migration`, `performance`, `architecture`

### Context
Long-term consideration to migrate from Next.js to Astro for better Cloudflare Pages compatibility and improved performance.

### Current challenges with Next.js on Cloudflare
- Limited Next.js support on Cloudflare Pages (edge runtime only)
- No Node.js runtime support (sharp image optimization won't work)
- Some middleware and dynamic API limitations
- Next.js heavily optimized for Vercel, not Cloudflare

### Benefits of Astro migration
- First-class Cloudflare Pages support
- Native D1 integration
- Simpler, faster builds
- Better performance (less JavaScript shipped)
- Content Collections work similarly to Contentlayer
- Can use React islands selectively if needed
- Drop ~200KB of React + Radix dependencies

### Migration estimate
**Reusable (90%):**
- MDX content files (Contentlayer → Astro Content Collections)
- Tailwind styles
- Most component logic

**Needs rewriting:**
- React components → Astro components
- Radix UI → Native HTML or lightweight alternatives
- Some build configuration

### Files affected
Essentially entire codebase, but content is preserved

### Recommended approach
1. Wait until ready to fully commit to Cloudflare
2. Complete Issues #10 and #11 first (contact form + D1 migration)
3. Evaluate Astro with small prototype
4. Migrate incrementally or do full rewrite

### Alternative
Stay on Next.js + Vercel, use Cloudflare only for email/database/CDN (hybrid approach)

### Priority
Very low &ndash; future consideration, no immediate need

---

## Issue 13: Remove Radix UI dependencies (if migrating to Astro)

**Labels:** `enhancement`, `dependencies`, `migration`

### Context
If migrating to Astro (see Issue #12), consider removing Radix UI dependencies in favour of simpler alternatives.

### Current Radix UI usage
- `@radix-ui/react-form` &ndash; Contact form (`components/contact-form.js`)
- `@radix-ui/react-toast` &ndash; Success notifications (`components/contact-form.js`)
- `@radix-ui/react-navigation-menu` &ndash; Main navigation (`components/navigation.js`)
- `@radix-ui/react-dialog` &ndash; Modal (`components/modal.js`)
- `@radix-ui/react-select` &ndash; Category dropdown (`components/category/select.js`)

**Already commented out:**
- `@radix-ui/react-dropdown-menu`
- Duplicate select usage

### Impact
Current bundle includes ~200KB of React + Radix for relatively simple interactions

### Alternatives for Astro
**Option 1: Native HTML + CSS (recommended)**
- Native `<form>` validation (already doing most of this)
- Native `<dialog>` element for modals
- Native `<select>` for dropdowns
- Lightweight toast library like `sonner` (2KB, framework-agnostic)
- CSS-based navigation dropdown

**Option 2: Web components**
- Shoelace (framework-agnostic web components)
- DaisyUI (Tailwind-based components)

**Option 3: Keep React islands**
- Use React components selectively in Astro
- Defeats the "reduce dependencies" goal

### Benefits
- Significantly smaller bundle size
- Simpler codebase
- No React dependency needed
- Faster page loads

### Prerequisites
- Astro migration (Issue #12) must be in progress or completed

### Priority
Very low &ndash; only relevant if migrating to Astro

---

## Notes

- Issues are ordered by priority (medium → low)
- TypeScript migration was intentionally excluded per maintainer preference
- All critical bugs were fixed in PR #[number]
- Issues #10-13 are long-term Cloudflare migration planning items
