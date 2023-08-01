// eslint-disable-next-line import/no-anonymous-default-export
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  const { email, name, source } = await req.json()

  if (!email) {
    new NextResponse(JSON.stringify({ error: 'Email is required' }))
  }

  const API_URL = process.env.EMAILOCTOPUS_API_URL
  const API_KEY = process.env.EMAILOCTOPUS_API_KEY
  const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID

  const config = {
    api_key: API_KEY,
    email_address: email,
    fields: {
      FirstName: name,
      Source: source,
    },
    status: 'PENDING',
  }

  const API_ROUTE = `${API_URL}lists/${LIST_ID}/contacts`

  try {
    const res = await fetch(API_ROUTE, {
      method: 'POST',
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

export default POST
