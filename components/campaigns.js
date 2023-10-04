import { NextResponse } from 'next/server'

const Campaigns = async () => {
  const getCampaigns = async () => {
    const API_URL = process.env.EMAILOCTOPUS_API_URL
    const API_KEY = process.env.EMAILOCTOPUS_API_KEY
    const API_ROUTE = `${API_URL}campaigns?api_key=${process.env.EMAILOCTOPUS_API_KEY}&limit=12`

    const data = await fetch(API_ROUTE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return new NextResponse(JSON.stringify({ data }))
  }

  const data = getCampaigns()

  return JSON.stringify(data)
}

export default Campaigns
