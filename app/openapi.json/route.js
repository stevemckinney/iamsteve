import siteMetadata from '@/content/metadata'

export const revalidate = 86400
export const dynamic = 'force-static'

const base = siteMetadata.siteUrl

const markdownResponse = (description) => ({
  description,
  headers: {
    Vary: {
      description:
        'Includes `Accept` so caches keep the markdown and HTML variants apart.',
      schema: { type: 'string' },
    },
  },
  content: {
    'text/markdown': {
      schema: {
        type: 'string',
        description: 'Markdown with YAML frontmatter.',
      },
    },
  },
})

const errorResponse = (description) => ({
  description,
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
    },
  },
})

const slugParameter = {
  name: 'slug',
  in: 'path',
  required: true,
  description: 'The final path segment of the URL, without a leading slash.',
  schema: { type: 'string' },
  example: 'kerning-vs-tracking',
}

const spec = {
  openapi: '3.1.0',
  info: {
    title: 'iamsteve.me',
    version: '1.0.0',
    summary: 'Read articles as markdown and subscribe to the newsletter.',
    description: `The public HTTP surface of [iamsteve.me](${base}).

Every HTML page that has a markdown representation can also be requested with
an \`Accept: text/markdown\` header, or by appending \`.md\` to the URL. Those
responses send \`Vary: Accept, Accept-Encoding\` so shared caches keep the two
representations apart.

Errors are always JSON in the shape described by the \`Error\` schema, with a
stable \`code\`, a human readable \`message\`, and a \`hint\` describing how to
recover.`,
    contact: {
      name: 'Steve McKinney',
      url: `${base}/contact`,
      email: siteMetadata.email,
    },
    license: {
      name: 'MIT',
      url: `${siteMetadata.siteRepo}/blob/main/LICENSE`,
    },
  },
  servers: [{ url: base, description: 'Production' }],
  externalDocs: {
    description: 'LLM-friendly index of the site',
    url: `${base}/llms.txt`,
  },
  tags: [
    { name: 'content', description: 'Articles, notes and pages as markdown' },
    { name: 'newsletter', description: 'Newsletter subscription and archive' },
    { name: 'discovery', description: 'Machine-readable indexes and feeds' },
  ],
  paths: {
    '/api/content/home': {
      get: {
        tags: ['content'],
        operationId: 'getHomeMarkdown',
        summary: 'Homepage as markdown',
        description:
          'Latest and most-read articles, with links to the rest of the site. Also served for `GET /` when the request accepts `text/markdown`.',
        responses: {
          200: markdownResponse('Markdown index of the site.'),
        },
      },
    },
    '/api/content/{slug}': {
      get: {
        tags: ['content'],
        operationId: 'getArticleMarkdown',
        summary: 'Blog article as markdown',
        description:
          'The source markdown for a blog article, with custom components flattened. Also served for `GET /blog/{slug}` when the request accepts `text/markdown`.',
        parameters: [slugParameter],
        responses: {
          200: markdownResponse('The article body with YAML frontmatter.'),
          404: {
            description: 'No article with that slug.',
            content: {
              'text/markdown': {
                schema: {
                  type: 'string',
                  description:
                    'A markdown 404 listing where to look next, including the sitemap and llms.txt.',
                },
              },
            },
          },
        },
      },
    },
    '/api/content/notes/{slug}': {
      get: {
        tags: ['content'],
        operationId: 'getNoteMarkdown',
        summary: 'Note as markdown',
        description:
          'Also served for `GET /notes/{slug}` when the request accepts `text/markdown`.',
        parameters: [slugParameter],
        responses: {
          200: markdownResponse('The note body with YAML frontmatter.'),
          404: {
            description: 'No note with that slug.',
            content: {
              'text/markdown': { schema: { type: 'string' } },
            },
          },
        },
      },
    },
    '/api/content/pages/{slug}': {
      get: {
        tags: ['content'],
        operationId: 'getPageMarkdown',
        summary: 'Standalone page as markdown',
        description:
          'Pages such as `about` and `uses`. Also served for `GET /{slug}` when the request accepts `text/markdown`.',
        parameters: [{ ...slugParameter, example: 'about' }],
        responses: {
          200: markdownResponse('The page body with YAML frontmatter.'),
          404: {
            description: 'No page with that slug.',
            content: {
              'text/markdown': { schema: { type: 'string' } },
            },
          },
        },
      },
    },
    '/api/content/collections/{slug}': {
      get: {
        tags: ['content'],
        operationId: 'getCollectionMarkdown',
        summary: 'Collection listing as markdown',
        description:
          'Every curated link filed under one collection. Also served for `GET /collections/{slug}` when the request accepts `text/markdown`.',
        parameters: [{ ...slugParameter, example: 'colour' }],
        responses: {
          200: markdownResponse('The entry with YAML frontmatter.'),
          404: {
            description: 'No collection with that slug.',
            content: {
              'text/markdown': { schema: { type: 'string' } },
            },
          },
        },
      },
    },
    '/api/newsletter': {
      post: {
        tags: ['newsletter'],
        operationId: 'subscribe',
        summary: 'Subscribe to the newsletter',
        description:
          'The list is double opt-in, so the address receives a confirmation email before it is added. Confirm the person actually wants this before calling it.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SubscribeRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Subscription created and confirmation email sent.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { success: { type: 'boolean', const: true } },
                  required: ['success'],
                },
              },
            },
          },
          400: errorResponse(
            'Missing or malformed body (`EMAIL_REQUIRED`, `INVALID_JSON`), or the address is already subscribed (`MEMBER_EXISTS_WITH_EMAIL_ADDRESS`).'
          ),
          500: errorResponse('The newsletter provider could not be reached.'),
        },
      },
    },
    '/api/newsletter/count': {
      get: {
        tags: ['newsletter'],
        operationId: 'getSubscriberCount',
        summary: 'Subscriber count',
        description:
          'Falls back to a floor value rather than erroring when the provider is unavailable, because it only drives display copy.',
        responses: {
          200: {
            description: 'Current confirmed subscriber count.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { count: { type: 'integer', minimum: 0 } },
                  required: ['count'],
                },
              },
            },
          },
        },
      },
    },
    '/api/campaigns': {
      get: {
        tags: ['newsletter'],
        operationId: 'listCampaigns',
        summary: 'Recent newsletter issues',
        responses: {
          200: {
            description: 'The twelve most recent issues.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Campaign' },
                    },
                  },
                },
              },
            },
          },
          500: errorResponse(
            'The newsletter provider is unavailable or unconfigured.'
          ),
        },
      },
    },
    '/llms.txt': {
      get: {
        tags: ['discovery'],
        operationId: 'getLlmsTxt',
        summary: 'LLM-friendly content index',
        responses: {
          200: {
            description: 'Best and most recent articles, with markdown links.',
            content: { 'text/plain': { schema: { type: 'string' } } },
          },
        },
      },
    },
    '/feed.xml': {
      get: {
        tags: ['discovery'],
        operationId: 'getFeed',
        summary: 'RSS feed of posts and notes',
        responses: {
          200: {
            description: 'RSS 2.0 feed.',
            content: { 'application/rss+xml': { schema: { type: 'string' } } },
          },
        },
      },
    },
    '/sitemap.xml': {
      get: {
        tags: ['discovery'],
        operationId: 'getSitemap',
        summary: 'Sitemap of every indexable URL',
        responses: {
          200: {
            description: 'urlset sitemap.',
            content: { 'application/xml': { schema: { type: 'string' } } },
          },
        },
      },
    },
    '/.well-known/api-catalog': {
      get: {
        tags: ['discovery'],
        operationId: 'getApiCatalog',
        summary: 'RFC 9727 API catalog',
        responses: {
          200: {
            description: 'A linkset describing the APIs this site offers.',
            content: {
              'application/linkset+json': { schema: { type: 'object' } },
            },
          },
        },
      },
    },
    '/.well-known/agent-skills/index.json': {
      get: {
        tags: ['discovery'],
        operationId: 'getAgentSkills',
        summary: 'Agent skills index',
        responses: {
          200: {
            description: 'Skills an agent can load to work with this site.',
            content: { 'application/json': { schema: { type: 'object' } } },
          },
        },
      },
    },
    '/openapi.json': {
      get: {
        tags: ['discovery'],
        operationId: 'getOpenapi',
        summary: 'This description document',
        responses: {
          200: {
            description: 'The OpenAPI description of this API.',
            content: { 'application/json': { schema: { type: 'object' } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Error: {
        type: 'object',
        description: 'The shape every API error uses.',
        properties: {
          error: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description:
                  'Stable, machine-readable identifier for the failure.',
                examples: ['EMAIL_REQUIRED', 'NOT_FOUND'],
              },
              message: {
                type: 'string',
                description: 'What went wrong, in plain English.',
              },
              hint: {
                type: 'string',
                description: 'What to do about it.',
              },
              status: {
                type: 'integer',
                description: 'The HTTP status code, repeated for convenience.',
              },
              documentation: {
                type: 'string',
                format: 'uri',
                description: 'Where the API is described.',
              },
            },
            required: ['code', 'message', 'hint', 'status'],
          },
        },
        required: ['error'],
      },
      SubscribeRequest: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'The address to subscribe.',
          },
          name: { type: 'string', description: 'First name, optional.' },
          source: {
            type: 'string',
            description:
              'Free-form label for where the subscription came from.',
          },
        },
        required: ['email'],
      },
      Campaign: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          subject: { type: 'string' },
          status: { type: 'string', examples: ['SENT'] },
          sent_at: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
}

export async function GET() {
  return new Response(JSON.stringify(spec, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
