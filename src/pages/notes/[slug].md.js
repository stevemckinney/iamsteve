// /notes/<slug>.md, which proxy.js rewrote to /api/content/notes/<slug>
export { getStaticPaths, GET } from '../api/content/notes/[slug].js'
