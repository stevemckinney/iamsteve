// eslint-disable-next-line import/no-anonymous-default-export
import { NextResponse } from 'next/server'

export const GET = async (req) => {
  const { data } = await req.json()

  const API_URL = process.env.EMAILOCTOPUS_API_URL
  const API_KEY = process.env.EMAILOCTOPUS_API_KEY
  const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID

  const config = {
    api_key: API_KEY,
    limit: 12,
  }

  const API_ROUTE = `${API_URL}campaigns`

  try {
    const res = await fetch(API_ROUTE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })

    return new NextResponse(JSON.stringify({ res }))
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: JSON.parse(error) }))
  }
}
