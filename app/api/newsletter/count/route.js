import { NextResponse } from 'next/server'

const API_URL = process.env.EMAILOCTOPUS_API_URL
const API_KEY = process.env.EMAILOCTOPUS_API_KEY
const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID

export const GET = async () => {
  try {
    const res = await fetch(`${API_URL}lists/${LIST_ID}?api_key=${API_KEY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache for 24 hours to avoid hitting rate limits
      next: { revalidate: 86400 },
    })

    const data = await res.json()

    if (res.ok) {
      // EmailOctopus returns counts object with subscribed, unsubscribed, and pending
      const subscriberCount = data.counts?.subscribed || 700

      return NextResponse.json(
        { count: subscriberCount },
        {
          status: 200,
          headers: {
            'Cache-Control':
              'public, s-maxage=86400, stale-while-revalidate=172800',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      )
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to fetch subscriber count:', data.error?.message)
      }
      // Return fallback count on error
      return NextResponse.json(
        { count: 700 },
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      )
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Subscriber count error:', error.message)
    }
    // Return fallback count on error
    return NextResponse.json(
      { count: 700 },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  }
}

export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
