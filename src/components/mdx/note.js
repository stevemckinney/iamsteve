// components/mdx-note.js, for content/notes
import { sharedComponents, figureComponents } from './index.js'

import NoteH2 from './note-h2.astro'
import NoteH3 from './note-h3.astro'
import NoteH4 from './note-h4.astro'
import NoteP from './note-p.astro'

export const noteComponents = {
  ...sharedComponents,
  ...figureComponents,
  h2: NoteH2,
  h3: NoteH3,
  h4: NoteH4,
  p: NoteP,
}
