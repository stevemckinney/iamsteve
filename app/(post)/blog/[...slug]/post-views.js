import { getPageView } from '../../../(blog)/blog/views'
import ViewCounter from '../../../(blog)/blog/counter'

export default async function PostViews({ slug }) {
  const initialViews = await getPageView(slug)
  return (
    <ViewCounter slug={slug} initialViews={initialViews} trackView={true} />
  )
}
