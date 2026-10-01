import Anthropic from '@anthropic-ai/sdk'
import { catalogue, question, read, within } from '@/lib/search-ai'
import { resolve } from '@/lib/search-tree'

// Claude, through Vercel’s AI Gateway. On Vercel the deployment pays with its
// own OIDC token, so there is no key to keep; anywhere else it takes an
// AI_GATEWAY_API_KEY.
const gateway = 'https://ai-gateway.vercel.sh'

// Each match goes out as a line of JSON as soon as Claude has written it, so
// the menu can show the first while the rest are still on their way
async function* matches(stream, node) {
  const seen = new Set()
  const pick = (line) => {
    const match = read(line)
    if (!match || seen.has(match.slug) || !within(node, match)) return null
    seen.add(match.slug)
    return `${JSON.stringify(match)}\n`
  }

  let text = ''
  try {
    for await (const event of stream) {
      if (event.type !== 'content_block_delta') continue
      if (event.delta.type !== 'text_delta') continue
      text += event.delta.text
      const lines = text.split('\n')
      text = lines.pop()
      for (const line of lines) {
        const match = pick(line)
        if (match) yield match
      }
    }
    const match = pick(text)
    if (match) yield match
  } catch (error) {
    // The menu keeps whatever arrived; this only says the rest never will
    if (!stream.aborted) console.error('AI search failed', error)
    yield `${JSON.stringify({ error: true })}\n`
  }
}

export async function POST(request) {
  const { query, scope } = (await request.json().catch(() => null)) ?? {}
  const term = typeof query === 'string' ? query.trim() : ''
  if (term.length < 2 || term.length > 200) {
    return Response.json(
      { error: 'A search is 2 to 200 characters' },
      { status: 400 }
    )
  }

  const apiKey =
    process.env.AI_GATEWAY_API_KEY ||
    request.headers.get('x-vercel-oidc-token') ||
    process.env.VERCEL_OIDC_TOKEN
  if (!apiKey) {
    return Response.json({ error: 'AI search is not set up' }, { status: 503 })
  }

  const node = Array.isArray(scope) ? resolve(scope) : null
  const client = new Anthropic({ apiKey, baseURL: gateway, timeout: 30_000 })
  const stream = client.messages.stream(
    {
      model: 'anthropic/claude-opus-5.5',
      // Thinking is always on, and is paid out of this too
      max_tokens: 4096,
      // Picking from a list is light work, and every second of it shows
      output_config: { effort: 'low' },
      system: [
        {
          type: 'text',
          text: catalogue().prompt,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: question(term, node) }],
    },
    // A reader who has moved on stops the answer, and what it costs
    { signal: request.signal }
  )

  return new Response(
    ReadableStream.from(matches(stream, node)).pipeThrough(
      new TextEncoderStream()
    ),
    {
      headers: {
        'Content-Type': 'application/x-ndjson; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    }
  )
}
