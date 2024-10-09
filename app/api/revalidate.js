import { revalidatePath } from 'next/cache'

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')

  if (secret !== process.env.REVALIDATION_SECRET) {
    console.error('Invalid secret attempt')
    return new Response('Invalid secret', { status: 401 })
  }

  if (!path) {
    console.error('No path specified for revalidation')
    return new Response('Path is required', { status: 400 })
  }

  try {
    await revalidatePath(path)
    console.log(`Successfully revalidated: ${path}`)
    return new Response('Revalidated', { status: 200 })
  } catch (error) {
    console.error('Revalidation error:', error)
    return new Response('Revalidation failed', { status: 500 })
  }
}
