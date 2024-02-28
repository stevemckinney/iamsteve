// eslint-disable-next-line import/no-anonymous-default-export
import { NextResponse } from 'next/server'

export const GET = async (req) => {
  const API_URL = process.env.EMAILOCTOPUS_API_URL
  const API_KEY = process.env.EMAILOCTOPUS_API_KEY
  const API_ROUTE = `${API_URL}campaigns?api_key=${process.env.EMAILOCTOPUS_API_KEY}&limit=12`

  try {
    const res = await fetch(API_ROUTE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()

    return new NextResponse(JSON.stringify(data))
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: JSON.parse(error) }))
  }
}
