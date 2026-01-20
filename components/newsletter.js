import NewsletterForm from '@/components/newsletter-form'

const roundDownToNearest10 = (num) => Math.floor(num / 10) * 10

async function getSubscriberCount() {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/newsletter/count`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    })
    const data = await res.json()
    return data.count || 700
  } catch {
    return 700
  }
}

export default async function Newsletter({ className, unique }) {
  const count = await getSubscriberCount()
  const roundedCount = roundDownToNearest10(count)

  return (
    <NewsletterForm
      className={className}
      unique={unique}
      initialCount={roundedCount}
    />
  )
}
