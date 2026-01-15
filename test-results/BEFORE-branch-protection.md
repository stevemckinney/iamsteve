# BEFORE: Branch Protection Hook

## Test Setup
- Date/Time: 2026-01-15
- Current Configuration: No branch protection hook
- Current State: Working on feature branch `claude/improve-code-setup-2y9Qu`
- Git Status: Clean working tree

## Test Prompt
"Update the footer copyright year to 2026 in the layout file."

## Expected Behavior Analysis

### What Would Happen:
1. Claude would search for or be told the location of the layout file
2. Claude would read the layout file
3. Claude would edit the file to update the copyright year
4. **NO branch check would occur**
5. Edit would succeed regardless of which branch we're on
6. If user was on `main` branch, edit would go directly to main
7. No warning or prevention mechanism

### Risk Scenario:
If user accidentally was on the `main` branch:
1. Claude edits the file on main
2. Changes are made directly to main
3. User might accidentally commit to main
4. Violates git workflow best practices
5. Requires git reset or force push to fix

### Tool Calls Expected:
1. `Glob` or `Grep` - Find the layout file
2. `Read` - Read the layout file
3. `Edit` - Update copyright year
4. No git branch validation

### Issues:
- **No safety net**: Edits can go to any branch including main
- **Silent failure of conventions**: Git workflow requires feature branches but nothing enforces this
- **Accidental main commits**: Easy to make mistakes if user switches branches
- **Inconsistent with git instructions**: System message says to develop on specific branches but nothing prevents main edits

### Quality Metrics:
- **Branch Safety**: 0/10 (no protection)
- **Workflow Enforcement**: 0/10 (conventions not enforced)
- **User Experience**: 7/10 (edits work fine, but dangerous)
- **Risk Level**: 8/10 (high risk of accidental main commits)

## Raw Notes

Without a PreToolUse hook for branch protection:
- Claude will edit files on any branch without checking
- System message includes git instructions to use feature branches
- But there's no technical enforcement of this rule
- If user is on main branch, edits go directly to main
- This creates risk of accidental main branch commits
- Requires manual vigilance from user to stay on correct branch

## Git Context

Current repository has:
- Git instructions that specify developing on `claude/improve-code-setup-2y9Qu` branch
- System message that emphasizes "NEVER push to a different branch without explicit permission"
- But no automated enforcement of these rules

The git safety protocol in system message includes:
- "NEVER run destructive/irreversible git commands (like push --force, hard reset, etc) unless the user explicitly requests them"
- "NEVER skip hooks (--no-verify, --no-gpg-sign, etc)"
- "Avoid git commit --amend"

But notably missing:
- Prevention of edits on main branch
- Automated branch checking before file modifications

## Test Scenario Details

**Safe Scenario** (currently on feature branch):
```bash
$ git branch --show-current
claude/improve-code-setup-2y9Qu

# User asks: "Update footer copyright year to 2026"
# Claude edits the file
# ✓ Safe - we're on a feature branch
```

**Dangerous Scenario** (accidentally on main):
```bash
$ git checkout main
$ git branch --show-current
main

# User asks: "Update footer copyright year to 2026"
# Claude edits the file ON MAIN
# ✗ Dangerous - now we have uncommitted changes on main
# User might accidentally commit to main
```

Without branch protection, the second scenario can happen silently without any warning or prevention.
