![iamsteve.me banner](/app/opengraph-image.png)

# iamsteve.me design & code blog
A design and code blog using Next.js with App Router.

## Quick start
<details>
<summary>Development setup</summary>

First, run the development server:

```bash
pnpm build
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
</details>

## Creating posts
<details>
<summary>How to create and manage blog posts</summary>

### Starting a new post
1. Create a new branch:
```bash
git checkout -b post/your-post-name
```

2. Generate the post:
```bash
node ./scripts/compose.js
```

3. Follow the prompts for:
   - Post title
   - File extension (md or mdx)
   - Post status (open, draft, closed)

### Post structure
Posts can be created in two formats:

1. Single file:
```
content/blog/0177-your-post-title.mdx
```

2. Directory with index file (for posts with assets):
```
content/blog/0177-your-post-title/
  ├─ index.mdx
  ├─ image.png
  └─ other-assets/
```

### Post id system
- IDs are automatically managed:
  - `compose.js` scans existing posts to assign the next available ID
  - GitHub Actions handle ID conflicts during pull requests
  - Pre-merge-commit hook ensures ID uniqueness when merging

### Publishing workflow
1. Create your post on a new branch
2. Make your changes and commit
3. Create a pull request
4. The system will automatically:
   - Check for ID conflicts
   - Update IDs if needed
   - Handle merging safely
</details>

## Post configuration
<details>
<summary>Frontmatter and image requirements</summary>

Example frontmatter:
```yaml
---
title: "Visual design tips you can apply immediately"
date: "2017-07-04T11:51:00+00:00"
lastmod: "2019-10-04T07:24:49+00:00"
summary: "Add a little extra polish to any of your designs with these tips."
metadesc: "When designing there are things you can rely upon regardless of the situation."
theme: "#fff7e0"
tags: ["Design"]
categories: ["Design"]
images: ["/images/blog/visual-design-tips-featured-image.png"]
large: "/images/blog/visual-design-tips-featured-image.png"
medium: "/images/blog/visual-design-tips-featured-image-medium.png"
ogImage: "/opengraph-image.png"
status: "open"
id: 164
fileroot: "visual-design-tips-you-can-apply-immediately"
---
```

### Field descriptions
- `large`: Main image (592x368 SVG)
- `medium`: Medium image (384x240 SVG)
- `ogImage`: Custom post opengraph image (optional)
- `status`: Post status (open, draft, closed)
- `id`: Unique post identifier (managed automatically)
- `fileroot`: Slug used for image naming
- `images`: Legacy field (not in use)
</details>

<details>
<summary>Collections</summary>
The collections script helps manage design and development resource links. It supports both individual entries and bulk imports.

### Adding individual collections
Run the script without arguments for interactive mode:

```bash
node scripts/compose-collection.js
```

You'll be prompted for:
- Title: Name of the resource
- URL: Web address
- Collection: Category (e.g., Inspiration, Typography, UX Design)
- Kind: Type of resource (website, article, resource, or tool)
- Extension: File format (md or mdx)

Example output:
```bash
Title: Awesome Design System
URL: https://design-system-example.com
Collection: Inspiration
Kind: website
Extension: md
Collection item generated successfully at content/collections/design-system-example.md
```

### Bulk import
To import multiple items, create a JSON file with your collections and pass it to the script:

```bash
node scripts/compose-collection.js bookmarks.json
```

JSON file structure:
```json
[
  {
    "title": "Example Site",
    "url": "https://example.com",
    "collection": "Inspiration",
    "kind": "website",
    "extension": "md"
  }
]
```

Example output:
```bash
Created: example
Created: another-example
Import complete: 2 items processed
```

#### Fields:
- `title`: Resource name (required)
- `url`: Web address (required)
- `collection`: Category name (required)
- `kind`: Type of resource (optional, defaults to 'website')
  - Options: website, article, resource, tool
- `extension`: File format (optional, defaults to 'md')
  - Options: md, mdx

The script automatically:
- Generates unique filenames from URLs
- Prevents duplicate entries
- Creates properly formatted markdown files
- Adds timestamps

</details>

## Credits
<details>
<summary>Acknowledgements</summary>

The codebase started from the excellent [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) and has since evolved from that.
</details>
