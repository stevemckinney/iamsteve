import Badge from '@/components/badge'

import { getPageView } from '../../../(blog)/blog/views'
import ViewCounter from '../../../(blog)/blog/counter'

export default async function PostViews({ slug }) {
  const initialViews = await getPageView(slug)

  if (typeof initialViews !== 'number') {
    return <ViewCounter slug={slug} initialViews={null} trackView={true} />
  }

  return (
    <Badge size={16} theme="text" iconStart="views">
      <ViewCounter slug={slug} initialViews={initialViews} trackView={true} />
    </Badge>
  )
}
