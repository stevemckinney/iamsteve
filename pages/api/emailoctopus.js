// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  console.log('here api');
  const { email, name, source } = req.body

  console.log('req', req.body)

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const API_KEY = process.env.EMAILOCTOPUS_API_KEY
    const listID = `76319206-f1ef-11eb-96e5-06b4694bee2a`
    const route = `https://emailoctopus.com/api/1.6/lists/${listID}/contacts`

    const response = await fetch(route, {
      body: JSON.stringify({
        api_key: API_KEY,
        email_address: email,
        fields: {
          FirstName: name,
          Source: source,
        },
        status: 'PENDING',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (response.status >= 400) {
      return res.status(500).json({ error: `There was an error subscribing to the list.` })
    }

    return res.status(201).json({ error: '' })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
