import { answer, gateway, spent } from '@/lib/search-ai'
import { resolve } from '@/lib/search-tree'

// The key is the switch: without AI_GATEWAY_API_KEY there is no AI search,
// and the menu is as it was. The key’s monthly budget is kept by the
// gateway, which turns it away once the month is spent, however many
// functions are asking.

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
// an answer cut short still keeps what came before
async function* lines(matches, signal) {
  try {
    for await (const match of matches) yield `${JSON.stringify(match)}\n`
  } catch (error) {
    // The menu keeps whatever arrived; this only says the rest never will.
    // A spent month is expected, so it is not worth a line in the logs.
    if (!signal.aborted && !spent(error)) {
      console.error('AI search failed', error)
    }
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

  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json({ off: true }, { status: 503 })
  }

  const node = Array.isArray(scope) ? resolve(scope) : null
  const matches = answer(term, node, { signal: request.signal })

  return new Response(
    ReadableStream.from(lines(matches, request.signal)).pipeThrough(
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
