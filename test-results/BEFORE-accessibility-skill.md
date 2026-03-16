# BEFORE: Accessibility Patterns Skill

## Test Setup
- Date/Time: 2026-01-15
- Current Configuration: CLAUDE.md has A11y checklist but no dedicated skill
- Current State: Accessibility requirements listed but not expanded with patterns

## Test Prompt
"Create a modal component for displaying article previews. Make sure it's accessible."

## Expected Behavior Analysis

### What Would Happen:
1. Claude would check CLAUDE.md and see the A11y checklist
2. Claude would create a modal component
3. Claude might remember some basics (ARIA labels, keyboard nav)
4. **Likely to miss**: Focus trap, Escape key, focus restoration, announcement to screen readers
5. **Quality varies**: Might add `role="dialog"` but forget `aria-modal="true"`
6. **Incomplete patterns**: Basic accessibility but missing important details
7. User would need to prompt for specific improvements

### Example Output Issues:

**Likely Output:**
```tsx
export function ArticleModal({ isOpen, article, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal" role="dialog">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
      </div>
    </div>
  );
}
```

**Issues in this output:**
- ✗ No `aria-modal="true"`
- ✗ No `aria-labelledby` or `aria-label`
- ✗ No focus trap (can tab out of modal to content behind)
- ✗ No focus management (focus not moved to modal on open)
- ✗ No Escape key handler
- ✗ No click outside to close
- ✗ Close button not properly labeled
- ✗ Focus not restored to trigger element on close
- ✗ No inert handling for background content
- ✗ Modal content not announced to screen readers

### Tool Calls Expected:
1. `Read` - Read CLAUDE.md for guidelines
2. `Write` - Write the modal component
3. Potentially multiple rounds as user requests improvements

### Issues:
- **Checklist vs Patterns**: CLAUDE.md has checklist but not HOW to implement
- **Missing details**: Hard to remember all ARIA attributes needed
- **No examples**: Don't see what good accessible modals look like
- **Focus management complexity**: One of the hardest parts, easy to forget
- **Keyboard interaction patterns**: Escape, Tab trapping, etc. not documented
- **Screen reader considerations**: Announcements, live regions not in checklist

### Quality Metrics:
- **Accessibility Compliance**: 5/10 (basic but incomplete)
- **ARIA Usage**: 4/10 (some attributes, missing key ones)
- **Keyboard Navigation**: 3/10 (might work partially)
- **Screen Reader Experience**: 4/10 (missing announcements)
- **Focus Management**: 2/10 (likely forgotten)

## Raw Notes

Without a dedicated accessibility skill:
- CLAUDE.md checklist is helpful but high-level
- Specific implementation patterns not documented
- Easy to forget ARIA attributes like aria-modal, aria-labelledby
- Focus management is complex and not detailed in checklist
- Keyboard interactions (Escape, Tab trap) often overlooked
- Screen reader announcements and live regions not covered
- No examples showing complete, accessible components

## Current CLAUDE.md Coverage

The A11y checklist includes:
- Keyboard navigation works
- Screen reader friendly
- Color contrast should be AA
- Focus indicators visible
- Alt text on images
- Form labels present
- Heading hierarchy logical

**Problem**: These are high-level requirements, not implementation guidance:
- "Keyboard navigation works" → but HOW to implement focus traps?
- "Screen reader friendly" → but WHICH ARIA attributes for modals?
- No mention of focus management patterns
- No keyboard interaction patterns documented
- No ARIA attribute reference
- No complete component examples

## Real Scenario Example

**User asks**: "Create a modal component for article previews"

**Claude thinks**:
- Need to create a modal
- Check CLAUDE.md: "Keyboard navigation works, Screen reader friendly"
- ✓ Add role="dialog" (good start)
- ✓ Add close button
- Write basic modal component
- ✗ Forget aria-modal="true"
- ✗ Don't implement focus trap
- ✗ No Escape key handler
- ✗ No focus management

**User tests**:
- Tabs through page, can tab behind modal (bad UX)
- Press Escape, nothing happens
- Screen reader announces modal but poorly
- Closes modal, focus lost in page

**User**: "Can you add focus trapping and Escape key handling?"
**Claude**: "Sure, let me add those"
**User**: "Also manage focus when opening/closing"
**Claude**: "Okay, adding that too"

Multiple rounds needed to get fully accessible modal.
