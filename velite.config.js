import { defineCollection, defineConfig, s } from 'velite';

import remarkGfm from 'remark-gfm';
import smartypants from 'remark-smartypants';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import stringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import remarkCodeTitles from './lib/remark-code-title';

const slugify = input =>
	input
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
const count = s.object({ total: s.number(), posts: s.number() }).default({ total: 0, posts: 0 });

const computedFields = data => ({
	...data,
	slugAsParams: data.slug
		.split('/')
		.slice(1)
		.join('/'),
});

const categories = defineCollection({
	name: 'Category',
	pattern: 'categories/index.yml',
	schema: s
		.object({
			name: s.string().max(32),
			slug: s.slug('global'),
			description: s
				.string()
				.max(120)
				.optional(),
			count,
		})
		.transform(data => ({
			...data,
			slugAsParams: data.slug
				.split('/')
				.slice(1)
				.join('/'),
		})),
});

const pages = defineCollection({
	pages: {
		name: 'Page', // collection type name
		pattern: 'pages/**/*.md', // content files glob pattern
		schema: s
			.object({
				title: s.string().max(99), // Zod primitive type
				slug: s.slug('global'), // validate format, unique in posts collection
				description: s.string().max(60),
				metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
				excerpt: s.excerpt(), // excerpt of markdown content
				content: s.mdx(), // transform markdown to html
			})
			// more additional fields (computed fields)
			.transform(data => ({
				...data,
				slugAsParams: data.slug
					.split('/')
					.slice(1)
					.join('/'),
			})),
	},
});

const posts = defineCollection({
	name: 'Post', // collection type name
	pattern: 'blog/**/*.md', // content files glob pattern
	schema: s
		.object({
			title: s.string('global').max(99), // Zod primitive type
			slug: s.slug('global'), // validate format, unique in posts collection
			date: s.isodate(), // input Date-like string, output ISO Date string.
			large: s.image().optional(), // input image relpath, output image object with blurImage.
			medium: s.image().optional(),
			theme: s.string(),
			metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
			excerpt: s.excerpt(), // excerpt of markdown content
			content: s.mdx(), // transform markdown to html
			codepen: s.boolean().optional(),
			twitter: s.boolean().optional(),
			categories: s.array(s.string()).default(['Website']),
			status: s.union([s.literal('draft'), s.literal('open'), s.literal('closed')]).default('draft'),
			body: s.mdx(),
			// reevaluate
			metadesc: s.string().optional(),
			summary: s.string().optional(),
			// unused beyond here
			fileroot: s.string('posts'),
			id: s.number('posts'),
			images: s.array(s.string()).optional(),
		})
		// more additional fields (computed fields)
		.transform(data => ({
			...data,
			permalink: `/blog/${data.slug.replace(/^(blog\/)(?:\d{4}-)?/, '$1')}`,
			slugAsParams: `${data.slug.replace(/^(blog\/)(?:\d{4}-)?/, '$1')}`,
		})),
});

export default defineConfig({
	root: 'content',
	output: {
		data: '.velite',
		assets: 'public/static',
		base: '/static/',
		name: '[name]-[hash:6].[ext]',
		clean: true,
	},
	collections: { posts },
	mdx: {
		remarkPlugins: [remarkGfm, remarkCodeTitles, smartypants, remarkRehype],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ['fragment'],
						ariaHidden: true,
						tabIndex: -1,
					},
				},
			],
			[rehypePrism, { ignoreMissing: true }],
		],
	},
});
