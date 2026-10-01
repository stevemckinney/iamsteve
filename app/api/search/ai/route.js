import Anthropic from '@anthropic-ai/sdk'
import { catalogue, question, read, within } from '@/lib/search-ai'
import { resolve } from '@/lib/search-tree'

// Claude, through Vercel’s AI Gateway, on a key of its own. The key is the
// switch: without AI_GATEWAY_API_KEY there is no AI search, and the menu is
// as it was. The key’s monthly budget is kept by the gateway, which turns it
// away once the month is spent, however many functions are asking.
const gateway = 'https://ai-gateway.vercel.sh'

// What the gateway says once the key’s budget for the month is spent
const spent = (error) =>
  error instanceof Anthropic.APIError &&
  error.type === 'quota_for_entity_exceeded'

// Whether there is budget left this month. The key’s id lets the budget be
// read before anyone asks; without it, the first refusal has to tell. A
// budget that cannot be read is still kept by the gateway, so the menu
// carries on.
async function hasBudget(key) {
  const id = process.env.AI_GATEWAY_API_KEY_ID
  if (!id) return true
  // The id as the dashboard shows it, with or without the prefix
  const entity = `api_key_id_${id.replace(/^api_key_id_/, '')}`
  try {
    const response = await fetch(
      `${gateway}/v1/quotas?quotaEntityId=${entity}`,
      { headers: { Authorization: `Bearer ${key}` }, cache: 'no-store' }
    )
    if (!response.ok) return true
    const quota = await response.json()
    return !quota.active || quota.currentSpend < quota.limitAmount
  } catch {
    return true
  }
}

// Whether the menu offers AI search at all, read once a page load. A few
// minutes at the CDN keeps the gateway from being asked on every visit.
export async function GET() {
  const key = process.env.AI_GATEWAY_API_KEY
  return Response.json(
    { on: !!key && (await hasBudget(key)) },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=300',
      },
    }
  )
}

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
    // A spent month turns AI search off, so the menu goes back to how it was
    if (spent(error)) {
      yield `${JSON.stringify({ off: true })}\n`
      return
    }
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

  const apiKey = process.env.AI_GATEWAY_API_KEY
  if (!apiKey) return Response.json({ off: true }, { status: 503 })

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
