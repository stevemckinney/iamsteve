// /blog/<slug>.md, which proxy.js rewrote to /api/content/<slug>
export { getStaticPaths, GET } from '../api/content/[slug].js'
