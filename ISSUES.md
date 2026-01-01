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

## Notes

- Issues are ordered by priority (medium → low)
- TypeScript migration was intentionally excluded per maintainer preference
- All critical bugs were fixed in PR #[number]
