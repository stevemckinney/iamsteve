import { allPosts } from 'contentlayer/generated'

export async function GET() {
  // Get a sample post to test RSS body
  const post = allPosts
    .filter((post) => post.status === 'open')
    .find((post) => post.fileroot === 'using-analytics-again-with-simple-analytics')

  if (!post) {
    return new Response('Post not found', { status: 404 })
  }

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>RSS Body Test - ${post.title}</title>
  <style>
    body { font-family: system-ui; max-width: 800px; margin: 40px auto; padding: 0 20px; }
    .info { background: #f0f9ff; padding: 15px; border-left: 4px solid #0ea5e9; margin-bottom: 20px; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    pre { background: #1f2937; color: #f9fafb; padding: 15px; overflow-x: auto; }
  </style>
</head>
<body>
  <h1>RSS Body Test</h1>

  <div class="info">
    <strong>Post:</strong> ${post.title}<br>
    <strong>Has rssBody:</strong> ${post.body.rssBody ? 'Yes ✅' : 'No ❌'}
  </div>

  <h2>RSS Body HTML</h2>
  <div class="content">
    ${post.body.rssBody || 'rssBody not generated'}
  </div>

  <h2>Raw Source (for comparison)</h2>
  <pre>${post.body.raw.slice(0, 500)}...</pre>
</body>
</html>`

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
