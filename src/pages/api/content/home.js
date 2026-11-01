// app/api/content/home/route.js
import { homeMarkdown } from '../../../lib/markdown-api.js'

export async function GET() {
  return new Response(await homeMarkdown(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
