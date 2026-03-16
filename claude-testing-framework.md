# Claude Code Testing Framework

## Purpose
This framework enables systematic before/after testing of Claude Code configuration changes. Each test measures the impact of adding new hooks, skills, commands, or settings.

## Testing Methodology

### Phase 1: Baseline (BEFORE)
1. Run test prompt without the proposed change
2. Observe and document:
   - Tool calls made
   - Order of operations
   - Quality of responses
   - Errors or issues
   - Time/efficiency metrics
3. Save observations to `test-results/BEFORE-{recommendation-name}.md`

### Phase 2: Implementation
1. Apply the proposed change (add hook/skill/command/setting)
2. Document the exact change made

### Phase 3: Evaluation (AFTER)
1. Run the SAME test prompt with the change in place
2. Observe and document the same metrics as Phase 1
3. Save observations to `test-results/AFTER-{recommendation-name}.md`

### Phase 4: Analysis
1. Compare BEFORE and AFTER results
2. Determine impact level:
   - **High Impact**: Measurable improvement in behavior, quality, or efficiency
   - **Medium Impact**: Noticeable but minor improvement
   - **Low Impact**: No significant change or negligible improvement
   - **Negative Impact**: Made things worse
3. Document findings in `test-results/ANALYSIS-{recommendation-name}.md`

### Phase 5: Decision
- **High/Medium Impact**: Keep the change, commit to repository
- **Low/Negative Impact**: Discard the change, document why

## Test Prompt Design Principles

For each recommendation, design prompts that:
1. **Exercise the specific feature**: The prompt should trigger the hook/skill/command being tested
2. **Represent realistic usage**: Use scenarios that would actually occur in development
3. **Have measurable outcomes**: Can observe concrete differences in behavior
4. **Are repeatable**: Same prompt produces consistent results

## Documentation Structure

### BEFORE-{name}.md
```markdown
# BEFORE: {Recommendation Name}

## Test Setup
- Date/Time:
- Current Configuration: (none, or existing relevant config)

## Test Prompt
[Exact prompt used]

## Observed Behavior
- Tool calls made:
- Order of operations:
- Response quality:
- Issues encountered:
- Time/effort required:

## Raw Notes
[Detailed observations]
```

### AFTER-{name}.md
```markdown
# AFTER: {Recommendation Name}

## Test Setup
- Date/Time:
- Change Applied: [Exact change made]
- Configuration Added: [File paths and key content]

## Test Prompt
[Same exact prompt from BEFORE test]

## Observed Behavior
- Tool calls made:
- Order of operations:
- Response quality:
- Issues encountered:
- Time/effort required:

## Raw Notes
[Detailed observations]
```

### ANALYSIS-{name}.md
```markdown
# ANALYSIS: {Recommendation Name}

## Summary
[1-2 sentence summary of findings]

## Impact Level
[High/Medium/Low/Negative]

## Detailed Comparison

### Differences Observed
1. [Specific difference 1]
2. [Specific difference 2]
...

### Metrics
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Tool calls | X | Y | +/- |
| Response quality | X/10 | Y/10 | +/- |
| Time to complete | Xs | Ys | +/- |

### Qualitative Assessment
[Detailed analysis of whether the change improved Claude's behavior]

## Recommendation
- [ ] Keep change and commit
- [ ] Discard change
- [ ] Needs more testing (describe what)

## Reasoning
[Why we should keep or discard this change]
```

## Test Execution Plan

We will test recommendations in priority order:
1. Post-Edit Formatting Hook
2. Branch Protection Hook
3. Writing Style Skill
4. Accessibility Patterns Skill
5. Next.js/Tailwind Skill
6. ESLint Hook
7. Post Creation Command
8. Enhanced CLAUDE.md
9. Contentlayer Skill
10. Link Validation Hook
