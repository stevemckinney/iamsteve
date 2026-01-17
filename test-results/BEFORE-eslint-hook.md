# BEFORE: ESLint Hook

## Test Setup
- Date/Time: 2026-01-15
- Current Configuration: ESLint configured in package.json, but no automatic running
- Current State: Formatting hook exists, but no linting hook

## Test Prompt
"Update the Navigation component to add a new menu item for the About page."

## Expected Behavior Analysis

### What Would Happen:
1. Claude would read the Navigation component
2. Claude would edit the file to add the menu item
3. **Formatting hook runs**: File is automatically formatted
4. **NO linting occurs**: ESLint doesn't run automatically
5. **Lint errors might be introduced**: Unused variables, missing types, etc.
6. User discovers errors later when running build or manual lint
7. Must fix errors in separate step

### Example Output Issues:

**Likely Scenario:**
```tsx
// User asks: "Add About menu item"
// Claude edits navigation.tsx
export function Navigation() {
  const router = useRouter(); // Added but might be unused
  const aboutLink = '/about'; // Might violate naming conventions

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href={aboutLink}>About</Link>
    </nav>
  );
}

// After edit:
// ✓ File is formatted (formatting hook)
// ✗ ESLint not run, potential issues not caught:
//   - Unused variable 'router'
//   - Const should be 'ABOUT_LINK' (naming convention)
//   - Missing TypeScript types somewhere
```

### Tool Calls Expected:
1. `Read` - Read Navigation component
2. `Edit` - Add About menu item
3. **Formatting hook runs** (automatic)
4. No linting feedback

### Issues:
- **Delayed error discovery**: Lint errors found at build time, not edit time
- **Context switching**: Must fix errors later, losing context
- **Build failures**: CI/CD might fail on lint errors
- **Manual linting**: User must remember to run `npm run lint`
- **Inconsistent quality**: Some edits have lint errors, others don't

### Quality Metrics:
- **Early Error Detection**: 0/10 (errors found at build, not edit)
- **Development Flow**: 6/10 (interrupted by later lint failures)
- **Code Quality**: 7/10 (functional but might have style issues)
- **Time to Fix**: Baseline (fix errors in separate step)

## Raw Notes

Without PostToolUse ESLint hook:
- Formatting happens automatically (good)
- Linting happens manually or at build time (delayed)
- Errors discovered after losing edit context
- Must run `npm run lint` separately
- Build might fail due to lint errors
- CI/CD pipeline catches issues late in process

## Project ESLint Context

Current setup:
- ESLint configured with flat config (`eslint.config.mjs`)
- Script available: `npm run lint`
- Runs during build: `npm run build` includes lint check
- No automatic linting during development

## Real Scenario Example

**User asks**: "Add About menu item to Navigation"

**What happens**:
1. Claude edits navigation.tsx
2. Formatting hook runs ✓
3. File looks good, properly formatted
4. User later runs build: `npm run build`
5. **Build fails**: ESLint errors discovered
   - Unused import
   - Naming convention violation
   - Missing type annotation
6. User must ask Claude to fix lint errors
7. Another edit round, context switch
8. Finally passes lint

**Time wasted**: 5-10min to fix errors that could have been caught immediately

## Impact of Delayed Discovery

### During Development
- Developer edits code
- Looks good (formatted nicely)
- Assumes it's correct
- Continues working

### At Build Time
- Runs `npm run build`
- Build fails with lint errors
- Must context switch back
- Fix errors
- Re-run build
- Hope there are no more errors

### In CI/CD
- Push to remote
- CI runs
- Build fails on lint
- Must fix and push again
- Delays deployment

All of this could be prevented by catching lint errors at edit time.
