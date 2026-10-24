// The newsletter’s past issues, read from EmailOctopus once per build with
// the request app/api/campaigns/route.js makes. The Next.js page fetched it
// after load, so its HTML only had the loading state. Missing env values or
// a failed request give no issues, as the route’s errors did
let campaigns

export function getCampaigns() {
  campaigns ??= read()
  return campaigns
}

async function read() {
  const url = import.meta.env.EMAILOCTOPUS_API_URL
  const key = import.meta.env.EMAILOCTOPUS_API_KEY
  if (!url || !key) return []

  try {
    const response = await fetch(`${url}campaigns?api_key=${key}&limit=12`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    return (response.ok && data.data) || []
  } catch {
    return []
  }
}
