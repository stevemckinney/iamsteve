# AFTER: ESLint Hook

## Test Setup
- Date/Time: 2026-01-15
- Change Applied: Added PostToolUse ESLint hook
- Configuration Added:
  - `.claude/hooks/eslint-after-edit.sh`
  - Updated `.claude/settings.json` with ESLint hook

## Configuration Details

### Hook Script
- Runs ESLint on edited JavaScript/TypeScript files
- Checks file extension (.js, .jsx, .ts, .tsx, .mjs, .cjs)
- Uses `npx eslint` with JSON output format
- Parses error and warning counts
- Provides immediate feedback
- Non-blocking (always continues)
- 30-second timeout

### settings.json
- ESLint hook runs AFTER formatting hook
- Order: Format first, then lint
- Applied to both Edit and Write tools

## Test Prompt
"Update the Navigation component to add a new menu item for the About page."

## Expected Behavior Analysis

### What Would Happen:
1. Claude would read the Navigation component
2. Claude would edit the file to add the menu item
3. **Formatting hook runs**: File is automatically formatted
4. **ESLint hook runs**: File is immediately linted
5. **Immediate feedback**: User sees lint results right away
6. **Fix errors immediately**: Can address issues while context is fresh
7. No build failures from lint errors

### Example Output Quality:

**Good Edit (No Lint Issues):**
```tsx
// User asks: "Add About menu item"
// Claude edits navigation.tsx properly
export function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}

// After edit:
// ✓ File is formatted (formatting hook)
// ✓ ESLint runs (eslint hook)
// User sees: "✓ ESLint passed for navigation.tsx"
```

**Edit with Lint Issues (Caught Immediately):**
```tsx
// User asks: "Add About menu item with router"
// Claude edits navigation.tsx
import { useRouter } from 'next/navigation';

export function Navigation() {
  const router = useRouter(); // Declared but not used

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}

// After edit:
// ✓ File is formatted (formatting hook)
// ✓ ESLint runs (eslint hook)
// User sees: "⚠️  ESLint found 1 error(s) in navigation.tsx. Run: npm run lint"
// Claude: "I see there's an unused variable. Let me fix that."
// Fixes immediately while context is fresh
```

### Tool Calls Expected:
1. `Read` - Read Navigation component
2. `Edit` - Add About menu item
3. **Formatting hook runs** (automatic)
4. **ESLint hook runs** (automatic)
5. Potentially one more edit to fix lint issues if any

### Improvements:
- **Immediate error detection**: Lint errors caught at edit time, not build time
- **Context preservation**: Fix errors while editing, not later
- **Prevents build failures**: CI/CD won't fail on lint issues
- **Faster feedback loop**: Know about issues in seconds, not minutes
- **Better code quality**: Encourages fixing issues immediately

### Quality Metrics:
- **Early Error Detection**: 10/10 (errors found at edit time)
- **Development Flow**: 9/10 (smooth, no interruption)
- **Code Quality**: 10/10 (lint-compliant code)
- **Time to Fix**: Much faster (fix in same edit session)

## Raw Notes

With PostToolUse ESLint hook:
- Formatting runs first (clean code)
- ESLint runs second (validate code)
- Errors reported immediately
- User can ask Claude to fix issues right away
- No surprise build failures
- CI/CD pipeline sees clean code

## Comparison with BEFORE

**Without Hook:**
1. Edit file
2. Format automatically ✓
3. Assume code is good
4. Later: Build fails on lint error
5. Context switch back to fix
6. Another edit round
7. Re-run build

**With Hook:**
1. Edit file
2. Format automatically ✓
3. Lint automatically ✓
4. See immediate feedback
5. Fix any issues while editing
6. Build succeeds first time

## Hook Execution Order

The hooks run in sequence:
1. **PreToolUse**: Branch protection (blocks if on main)
2. **Tool executes**: Edit/Write happens
3. **PostToolUse #1**: Formatting hook runs
4. **PostToolUse #2**: ESLint hook runs

This order is intentional:
- Format before lint (consistent style before checking rules)
- Both run automatically (zero manual steps)
- Both provide feedback (user stays informed)

## Real Scenario Example

**User asks**: "Add About menu item to Navigation"

**With ESLint Hook:**
1. Claude edits navigation.tsx
2. Formatting hook: "✓ Formatted navigation.tsx with Prettier"
3. ESLint hook: "✓ ESLint passed for navigation.tsx"
4. User: "Perfect!"
5. Continues working confidently

**Alternative (with lint error):**
1. Claude edits navigation.tsx (introduces unused import)
2. Formatting hook: "✓ Formatted navigation.tsx"
3. ESLint hook: "⚠️  ESLint found 1 error(s) in navigation.tsx"
4. Claude: "I see there's an unused import. Let me remove that."
5. Edits again to fix
6. Formatting hook: "✓ Formatted navigation.tsx"
7. ESLint hook: "✓ ESLint passed for navigation.tsx"
8. Fixed immediately, no build failure later

## Additional Benefits

### Prevents Build Failures
- Local builds pass first time
- CI/CD pipeline doesn't fail on lint
- No red builds in GitHub Actions
- Faster deployment

### Preserves Context
- Fix errors while working on the feature
- Don't need to remember what you were doing
- All changes in one logical unit
- Clean git history

### Educational
- See what ESLint rules are triggered
- Learn best practices through feedback
- Understand project conventions
- Improve code quality over time

### Works with Existing Setup
- Uses project's ESLint config
- No new rules or configuration needed
- Respects .eslintignore
- Same behavior as `npm run lint`

## Hook Configuration Details

### File Type Detection
Only lints relevant files:
- .js, .jsx (JavaScript)
- .ts, .tsx (TypeScript)
- .mjs (ES modules)
- .cjs (CommonJS modules)

Skips:
- .md, .mdx (markdown)
- .json (data)
- .css (styles)
- Other non-JS/TS files

### Error Reporting
Parses ESLint JSON output to show:
- Error count
- Warning count
- File name
- Suggestion to run full lint for details

### Non-Blocking Behavior
Always continues (never blocks):
- If ESLint not available: warns, continues
- If file not found: warns, continues
- If lint errors: reports, continues
- If lint passes: confirms, continues

This ensures the hook never breaks the workflow.

## Performance Considerations

### Hook Speed
- Only lints single edited file (fast)
- Uses ESLint cache if available
- 30-second timeout (plenty of time)
- Runs in parallel with user thinking

### Impact on Workflow
- Minimal delay (1-3 seconds typically)
- User sees results immediately
- No waiting for builds
- Faster than manual lint

## Integration with Build Process

### Local Development
```bash
npm run dev  # No lint required, already linted on edit
```

### Build Process
```bash
npm run build  # Lint still runs (catches any missed files)
```

### CI/CD
- Builds pass more often (lint errors caught locally)
- Faster feedback loop
- Less failed builds
- More confident deployments
