# BEFORE: Contentlayer Skill

## Test Setup
- Date/Time: 2026-01-15
- Current Configuration: Contentlayer2 configured, no dedicated skill
- Current State: Complex content schema but no pattern documentation

## Test Prompt
"Create a new blog post about CSS container queries. Include proper frontmatter with categories, tags, and an excerpt."

## Expected Behavior Analysis

### What Would Happen:
1. Claude would need to understand the frontmatter schema
2. Claude might look at example posts to understand structure
3. **Incomplete frontmatter**: Likely to miss required fields
4. **Incorrect field types**: Might use wrong format for dates, lists, etc.
5. **Missing computed fields knowledge**: Doesn't understand what's auto-generated
6. **Unclear file naming**: Might not follow the blog/YYYY-filename.md pattern
7. User must request corrections for missing/incorrect fields

### Example Output Issues:

**Likely Output:**
```markdown
---
title: CSS Container Queries
summary: An introduction to container queries
date: 2026-01-15
category: CSS
tags: css, responsive
---

# CSS Container Queries

Container queries allow you to style elements based on their container size...
```

**Issues in this output:**
- ✗ Missing required fields: `id`, `lastmod`, `metadesc`
- ✗ Wrong field name: `category` should be `categories` (plural)
- ✗ Wrong format: `tags` should be array `[css, responsive]` not comma-separated
- ✗ Missing `status` field (should default to 'draft')
- ✗ No `theme` field for color customization
- ✗ No image fields (`fileroot`, `medium`, `large`, `ogImage`)
- ✗ Date format might not match expected format
- ✗ File likely created without year prefix in filename

### Tool Calls Expected:
1. `Read` - Read example blog post to understand structure
2. `Write` - Write new blog post with incomplete frontmatter
3. Multiple correction rounds to fix frontmatter

### Issues:
- **Complex schema**: 15+ frontmatter fields, easy to miss some
- **No pattern reference**: Must infer from existing posts
- **Field type confusion**: String vs list vs enum vs date
- **Required vs optional unclear**: Which fields are mandatory?
- **Computed fields mystery**: What does Contentlayer auto-generate?
- **File naming conventions**: Where to save, how to name
- **Image path patterns**: How to structure image references
- **Category/tag validation**: Must match predefined lists

### Quality Metrics:
- **Frontmatter Completeness**: 4/10 (missing many fields)
- **Field Accuracy**: 5/10 (some wrong formats)
- **File Structure**: 6/10 (basic structure but missing conventions)
- **First-Time-Right**: 2/10 (usually needs multiple corrections)

## Raw Notes

Without a dedicated Contentlayer skill:
- Frontmatter schema not documented
- Must reverse-engineer from example posts
- Easy to miss required fields
- Field types and formats unclear
- Computed fields not explained
- File naming conventions not documented
- Image path patterns not clear
- Category and tag lists not referenced

## Current Content Structure

Based on contentlayer.config.js:

**Post Document Type:**
- Required: title, date, lastmod, categories, id
- Optional: summary, metadesc, theme, fileroot, medium, large, ogImage, images, tags, codepen, twitter
- Computed: headings, readingTime, slug, slugAsParams, structuredData
- File pattern: `content/blog/**/*.md`
- Content type: MDX

**Challenges:**
- 15+ frontmatter fields to remember
- Categories must match predefined list
- Tags are free-form but should be consistent
- ID must be unique number
- Date formats must be valid
- Status enum: draft/open/closed
- Image paths follow specific pattern

## Real Scenario Example

**User asks**: "Create a blog post about CSS container queries"

**Without Skill:**
1. Claude searches for example blog post
2. Reads one post, tries to infer structure
3. Creates post with basic frontmatter:
   ```yaml
   title: CSS Container Queries
   date: 2026-01-15
   summary: About container queries
   ```
4. User: "You're missing categories, tags, id, lastmod, and status"
5. Claude: "Let me add those"
6. Adds fields but wrong format:
   ```yaml
   categories: CSS
   tags: css, responsive
   id: 1
   ```
7. User: "Categories should be an array, tags too, and we need a unique ID"
8. Claude: "Let me fix that"
9. Finally correct after 3-4 rounds

**Time wasted**: 10-15min for a task that should take 2min

## Missing Pattern Knowledge

### Frontmatter Template
No documented template showing:
- All available fields
- Required vs optional
- Field types (string, date, list, enum)
- Example values
- Enum options

### File Naming
No documented pattern for:
- Year prefix requirement
- Slug generation rules
- Directory structure
- File extension (.md for MDX)

### Image Handling
No documented pattern for:
- Image file organization
- Path conventions (fileroot, medium, large)
- OG image requirements
- Responsive image patterns

### Computed Fields
No explanation of:
- What's auto-generated (slug, readingTime, headings)
- How slugs are created (year stripped)
- How reading time is calculated
- How headings are extracted for TOC

## Impact of Missing Patterns

### For New Blog Posts
- 10-15min to create properly formatted post
- Multiple correction rounds
- Frustration from repeated fixes
- Inconsistent frontmatter across posts

### For Content Updates
- Unclear which fields to update
- Risk of breaking computed field dependencies
- Inconsistent image paths
- Tag/category inconsistency

### For Content Discovery
- Hard to understand what metadata is available
- Unclear how to query posts
- Missing knowledge of computed fields for features
