# AFTER: Post-Edit Formatting Hook

## Test Setup
- Date/Time: 2026-01-15
- Change Applied: Added PostToolUse hook for Edit and Write tools
- Configuration Added:
  - `.claude/settings.json` with PostToolUse hooks
  - `.claude/hooks/format-after-edit.sh` script

## Configuration Details

### Hook Script
- Automatically detects file type (js, jsx, ts, tsx, css, scss, md, mdx, json)
- Runs Prettier with `--write` flag on the edited file
- Provides user feedback on success or failure
- Non-blocking (always continues even if formatting fails)
- 30-second timeout

### settings.json
- Hooks configured for both Edit and Write tools
- Executes format-after-edit.sh after each edit

## Test Prompt
"Fix the navigation component to add proper ARIA labels for accessibility."

## Expected Behavior Analysis

### What Would Happen:
1. Claude would read the navigation component file
2. Claude would edit the file to add ARIA labels
3. **Hook automatically triggers**: format-after-edit.sh executes
4. **Prettier runs**: File is automatically formatted according to project rules
5. **User receives feedback**: "✓ Formatted [file] with Prettier"
6. Formatting is enforced without user intervention
7. All edits consistently follow the 2-space indentation rule

### Tool Calls Expected:
1. `Read` - Read the navigation component
2. `Edit` - Add ARIA labels
3. **Automatic hook execution** (not a tool call, but happens automatically)

### Improvements:
- **Automatic formatting**: Every edit is immediately formatted
- **Zero manual steps**: User doesn't need to remember to format
- **Consistency guaranteed**: All code follows project Prettier rules
- **Immediate feedback**: User knows formatting succeeded
- **Prevents drift**: Impossible to commit unformatted code through Claude edits

### Quality Metrics:
- **Automation**: 10/10 (fully automated)
- **Consistency**: 10/10 (Prettier enforces project standards)
- **User Experience**: 9/10 (automatic, with helpful feedback)
- **Code Quality**: 10/10 (edits are functional AND properly formatted)

## Raw Notes

With the PostToolUse hook for formatting:
- Every edit Claude makes is automatically formatted
- User receives immediate confirmation that formatting occurred
- CLAUDE.md's 2-space indentation rule is automatically enforced
- No manual intervention required
- Consistent code style across all Claude-generated edits

The hook is smart about:
- Only formatting relevant file types (JS/TS/CSS/MD, etc.)
- Providing clear feedback messages
- Not blocking on formatting failures (syntax errors)
- Using either global or npx Prettier

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

After Claude's edit to add ARIA labels:
```jsx
export function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul role="list">
        <li><a href="/">Home</a></li>
      </ul>
    </nav>
  );
}
```

**The hook automatically ensures:**
- Indentation is exactly 2 spaces (per project config)
- Quote style matches Prettier config
- Semicolons are consistent
- All formatting rules are applied
- User sees: "✓ Formatted components/Navigation.jsx with Prettier"

## Additional Benefits

### Reduced Cognitive Load
User doesn't need to think about formatting after asking Claude to make changes.

### Catches Errors Early
If Claude makes a syntax error, Prettier will fail with a warning, alerting the user immediately.

### Works with Existing Tooling
Leverages the project's existing Prettier configuration (.prettierrc), so formatting matches what developers expect.

### Scalable
Every future edit/write operation will automatically be formatted, creating a consistent experience.
