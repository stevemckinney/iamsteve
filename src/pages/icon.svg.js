// app/icon.svg, which Next.js serves from app/ until the cutover moves it to
// public/ (a copy in both would clash in the Next.js build)
import fs from 'fs'

export const GET = () =>
  new Response(fs.readFileSync('app/icon.svg'), {
    headers: { 'Content-Type': 'image/svg+xml' },
  })
