// app/api/campaigns/route.js: the newsletter’s last 12 campaigns, as
// EmailOctopus sends them. /newsletter and /thanks list them at build
// through src/lib/campaigns.js, so nothing on the site calls this; it stays
// for anything outside that does
import { EMAILOCTOPUS_API_URL, EMAILOCTOPUS_API_KEY } from 'astro:env/server'

export const prerender = false

export const GET = async () => {
  if (!EMAILOCTOPUS_API_URL || !EMAILOCTOPUS_API_KEY) {
    return Response.json(
      { error: 'API configuration missing' },
      { status: 500 }
    )
  }

  const API_ROUTE = `${EMAILOCTOPUS_API_URL}campaigns?api_key=${EMAILOCTOPUS_API_KEY}&limit=12`

  try {
    const res = await fetch(API_ROUTE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (!res.ok) {
      return Response.json(
        { error: data.error?.message || 'Failed to fetch campaigns' },
        { status: res.status }
      )
    }

    return Response.json(data)
  } catch (error) {
    return Response.json(
      { error: error.message || 'Failed to fetch campaigns' },
      { status: 500 }
    )
  }
}

// What Next.js answers for HEAD, OPTIONS and the methods the route doesn’t
// handle
export const HEAD = GET

export const OPTIONS = () =>
  new Response(null, {
    status: 204,
    headers: { Allow: 'GET, HEAD, OPTIONS' },
  })

export const ALL = () => new Response(null, { status: 405 })
