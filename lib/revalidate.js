import siteMetadata from '@/content/metadata'

export async function triggerRevalidation(path) {
  const revalidateUrl = `${siteMetadata.siteUrl}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}&path=${path}`

  const response = await fetch(revalidateUrl, { method: 'POST' })

  if (response.ok) {
    console.log('Revalidation triggered successfully')
  } else {
    console.error('Revalidation failed')
  }
}
