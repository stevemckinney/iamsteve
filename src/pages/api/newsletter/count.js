// app/api/newsletter/count/route.js: the list’s subscriber count, open to
// other sites. The site’s own pages read it at build. Next.js cached the
// EmailOctopus response for a day; here Vercel’s cache keeps the response
// for that long, through its s-maxage
import {
  EMAILOCTOPUS_API_URL,
  EMAILOCTOPUS_API_KEY,
  EMAILOCTOPUS_LIST_ID,
} from 'astro:env/server'

export const prerender = false

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export const GET = async () => {
  try {
    const res = await fetch(
      `${EMAILOCTOPUS_API_URL}lists/${EMAILOCTOPUS_LIST_ID}?api_key=${EMAILOCTOPUS_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await res.json()

    if (res.ok) {
      // EmailOctopus returns counts object with subscribed, unsubscribed, and pending
      const subscriberCount = data.counts?.subscribed || 700

      return Response.json(
        { count: subscriberCount },
        {
          headers: {
            'Cache-Control':
              'public, s-maxage=86400, stale-while-revalidate=172800',
            ...cors,
          },
        }
      )
    } else {
      if (import.meta.env.DEV) {
        console.error('Failed to fetch subscriber count:', data.error?.message)
      }
      // Return fallback count on error
      return Response.json({ count: 700 }, { headers: cors })
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Subscriber count error:', error.message)
    }
    // Return fallback count on error
    return Response.json({ count: 700 }, { headers: cors })
  }
}

export const OPTIONS = () => new Response(null, { status: 204, headers: cors })

// What Next.js answers for HEAD and the methods the route doesn’t handle
export const HEAD = GET

export const ALL = () => new Response(null, { status: 405 })
