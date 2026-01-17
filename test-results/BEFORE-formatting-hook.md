# BEFORE: Post-Edit Formatting Hook

## Test Setup
- Date/Time: 2026-01-15
- Current Configuration: No .claude directory, no hooks configured
- Current State: CLAUDE.md exists with style guidelines, but no automated enforcement

## Test Prompt
"Fix the navigation component to add proper ARIA labels for accessibility."

## Expected Behavior Analysis

### What Would Happen:
1. Claude would read the navigation component file
2. Claude would edit the file to add ARIA labels
3. File would be saved with the edits
4. **NO automatic formatting would occur**
5. Claude might mention running Prettier, but wouldn't automatically do it
6. If the component had inconsistent spacing or formatting before the edit, it would remain inconsistent
7. User would need to manually run `npm run format` or Prettier separately

### Tool Calls Expected:
1. `Read` - Read the navigation component
2. `Edit` - Add ARIA labels
3. Potentially `Bash` - If Claude proactively runs Prettier (but not guaranteed)

### Issues:
- **Inconsistent formatting**: Edits might not match the project's 2-space indentation style
- **Manual step required**: User needs to remember to format after edits
- **Potential formatting drift**: If user forgets to format, code quality degrades over time
- **No feedback loop**: User doesn't get immediate confirmation that code is properly formatted

### Quality Metrics:
- **Automation**: 0/10 (completely manual)
- **Consistency**: 5/10 (depends on Claude's natural formatting, no enforcement)
- **User Experience**: 6/10 (requires manual intervention)
- **Code Quality**: 7/10 (edits are functional but might not be formatted)

## Raw Notes

Without a PostToolUse hook for formatting:
- Claude makes valid edits but doesn't automatically format
- Formatting is left to the user to handle manually
- This creates friction in the development workflow
- Can lead to inconsistent code style if formatting is forgotten
- No guarantee that CLAUDE.md's 2-space indentation rule is followed

The current CLAUDE.md mentions "Use 2 spaces for indentation" but there's no automated enforcement of this rule after edits.

## Test Scenario Details

Let's say the navigation component currently looks like:
```jsx
export function Navigation() {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
    </nav>
  )
}
```

After Claude's edit to add ARIA labels, it might become:
```jsx
export function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul role="list">
        <li><a href="/">Home</a></li>
      </ul>
    </nav>
  )
}
```

But there's no guarantee:
- Indentation is exactly 2 spaces
- Quote style is consistent (single vs double)
- Formatting matches Prettier rules
- Trailing commas, semicolons, etc. follow project standards
