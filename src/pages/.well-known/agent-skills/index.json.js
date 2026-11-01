// app/.well-known/agent-skills/index.json/route.js: the agent skills
// index, with a digest of each skill file in public/
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import siteMetadata from '@/content/metadata'

const skills = [
  {
    name: 'get-article-as-markdown',
    type: 'skill',
    description: 'Fetch an iamsteve.me blog article or note as plain markdown.',
    file: 'get-article-as-markdown/SKILL.md',
  },
  {
    name: 'subscribe-newsletter',
    type: 'skill',
    description: 'Subscribe an email address to the iamsteve.me newsletter.',
    file: 'subscribe-newsletter/SKILL.md',
  },
  {
    name: 'list-articles',
    type: 'skill',
    description: 'List published iamsteve.me articles and notes for discovery.',
    file: 'list-articles/SKILL.md',
  },
]

async function digest(filePath) {
  const buffer = await readFile(filePath)
  return createHash('sha256').update(buffer).digest('hex')
}

export async function GET() {
  const base = siteMetadata.siteUrl
  const skillsDir = path.join(
    process.cwd(),
    'public',
    '.well-known',
    'agent-skills'
  )

  const entries = await Promise.all(
    skills.map(async (skill) => ({
      name: skill.name,
      type: skill.type,
      description: skill.description,
      url: `${base}/.well-known/agent-skills/${skill.file}`,
      sha256: await digest(path.join(skillsDir, skill.file)),
    }))
  )

  const index = {
    $schema:
      'https://raw.githubusercontent.com/cloudflare/agent-skills-discovery-rfc/main/schema/v0.2.0/agent-skills-index.schema.json',
    version: '0.2.0',
    publisher: {
      name: siteMetadata.title,
      url: base,
    },
    skills: entries,
  }

  return new Response(JSON.stringify(index, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}
