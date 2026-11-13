// app/api/newsletter/route.js: adds an address to the EmailOctopus list as
// pending, so EmailOctopus asks the subscriber to confirm it
import {
  EMAILOCTOPUS_API_URL,
  EMAILOCTOPUS_API_KEY,
  EMAILOCTOPUS_LIST_ID,
} from 'astro:env/server'

export const prerender = false

export const POST = async ({ request }) => {
  // Next.js answers a body that isn’t JSON, or is null, with an empty 500.
  // Astro would look for a 500 page instead
  const body = await request.json().catch(() => undefined)
  if (body == null) return new Response(null, { status: 500 })

  const { email, name, source } = body

  if (!email) {
    return Response.json({ error: 'Email is required' }, { status: 400 })
  }

  const config = {
    api_key: EMAILOCTOPUS_API_KEY,
    email_address: email,
    fields: {
      FirstName: name,
      Source: source,
    },
    status: 'PENDING',
  }

  const API_ROUTE = `${EMAILOCTOPUS_API_URL}lists/${EMAILOCTOPUS_LIST_ID}/contacts`

  try {
    const res = await fetch(API_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })

    const data = await res.json()

    if (res.ok) {
      return Response.json({ success: true })
    } else if (data.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      return Response.json(
        { error: 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS' },
        { status: 400 }
      )
    } else {
      if (import.meta.env.DEV) {
        console.error(
          'Subscription error:',
          data.error?.message || 'Unknown error'
        )
      }
      return Response.json(
        { error: data.error?.message || 'Subscription failed' },
        { status: res.status }
      )
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Subscription error:', error.message)
    }
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// What Next.js answers for the methods the route doesn’t handle
export const OPTIONS = () =>
  new Response(null, { status: 204, headers: { Allow: 'OPTIONS, POST' } })

export const ALL = () => new Response(null, { status: 405 })
