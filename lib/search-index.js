import {
  allPosts,
  allNotes,
  allPages,
  allCollections,
} from 'content-collections'
import { searchItems } from '@/lib/search-items'

let built = null

// content-collections data is fixed at build time, so this only needs doing
// once per process — react's cache() is request-scoped and rebuilt every time.
export function buildIndex() {
  built ??= searchItems({ allPosts, allNotes, allPages, allCollections })
  return built
}
