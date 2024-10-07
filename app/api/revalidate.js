import { revalidatePath } from 'next/cache'

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  if (!path) {
    return new Response('Path is required', { status: 400 })
  }

  revalidatePath(path)
  return new Response('Revalidated', { status: 200 })
}
