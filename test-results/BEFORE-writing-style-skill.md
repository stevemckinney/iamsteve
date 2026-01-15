# BEFORE: Writing Style Skill

## Test Setup
- Date/Time: 2026-01-15
- Current Configuration: CLAUDE.md has detailed writing style guidelines but no dedicated skill
- Current State: Writing conventions buried in CLAUDE.md general guidelines

## Test Prompt
"Write a new blog post introduction about CSS grid layouts. The post should explain how grid has changed responsive design. Make sure the writing follows our house style."

## Expected Behavior Analysis

### What Would Happen:
1. Claude would read CLAUDE.md to understand the house style
2. Claude would write the introduction
3. Claude might use straight quotes instead of curly quotes
4. Claude might use hyphens instead of proper em dashes
5. Claude might use American spelling instead of British English
6. **Style violations likely**: Complex rules about quotes/dashes not naturally remembered
7. User would need to manually review and fix typography

### Example Output Issues:

**Likely Output (with issues):**
```markdown
# CSS grid layouts

CSS Grid has revolutionized web design - it's made responsive layouts easier than ever before. In this post, we'll explore how Grid changed the way we think about layout design. You won't need complex frameworks anymore.
```

**Issues in this output:**
- ✗ Title not in sentence case ("layouts" should be "Layouts")
- ✗ Straight apostrophes ('s, we'll) instead of curly quotes ('s, we'll)
- ✗ Single hyphen (-) instead of em dash with thin spaces (&mdash;&thinsp;)
- ✗ Straight quote in "won't" instead of curly quote
- ✗ Missing attention to hanging punctuation rules

### Tool Calls Expected:
1. `Read` - Read CLAUDE.md
2. `Write` - Write the blog post introduction
3. Potentially multiple back-and-forth if user catches issues

### Issues:
- **Complex rules not internalized**: Curly quotes, em dashes, thin spaces are easy to forget
- **CLAUDE.md is dense**: Writing guidelines are one section among many
- **No dedicated focus**: Style rules mixed with coding guidelines
- **Manual verification required**: User must check every quote and dash
- **Inconsistent application**: Claude might remember some rules but not others
- **Character codes not obvious**: Using &rsquo;, &mdash;, &thinsp; requires specific knowledge

### Quality Metrics:
- **Style Accuracy**: 4/10 (likely to miss typography details)
- **Consistency**: 5/10 (might apply some rules but not others)
- **User Experience**: 5/10 (requires manual review and fixes)
- **First-Time-Right**: 3/10 (usually needs revisions)

## Raw Notes

Without a dedicated writing style skill:
- Complex typography rules are easy to overlook
- CLAUDE.md mentions the rules but they're not emphasized
- Claude might remember "British English" but forget curly quotes
- Em dashes with thin spaces are particularly easy to miss
- Character entity requirements (&rsquo; vs ') not naturally used
- User must manually review all content for style compliance

## Current CLAUDE.md Coverage

The writing style section includes:
- Hanging lists and punctuation
- Avoid punctuating titles where possible
- MUST use sentence case
- Use British English
- En dash (&ndash;) for ranges and relationships
- Em dash (&mdash;) with thin spaces (&thinsp;) for pauses
- Curly quotes table with Unicode, HTML entity, and numeric forms
- Examples: "I've" not "I've", "Doesn't" not "Doesn't"

**Problem**: These rules are comprehensive but:
- Buried in a larger guidelines document
- Not activated as targeted knowledge for writing tasks
- Easy to miss when focusing on content creation
- No pattern examples for common scenarios

## Real Scenario Example

**User asks**: "Write an introduction about CSS Grid"

**Claude thinks**:
- Need to write about CSS Grid
- Check CLAUDE.md for guidelines
- See "Use British English" → ✓ Remember this
- See "Use sentence case" → ✓ Remember this
- Scroll past complex quote/dash table → ✗ Likely skip or forget
- Focus on content quality and technical accuracy
- Write introduction with straight quotes and hyphens
- User: "Can you fix the quotes to be curly quotes?"
- Claude: "Oh yes, let me update those"
- Multiple rounds of fixes needed
