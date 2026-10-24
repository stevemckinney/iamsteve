// Notepad with its header and body attached, so MDX content and .astro
// templates can write <Notepad.Header> and <Notepad.Body> as React did
import Notepad from './notepad.astro'
import Header from './notepad-header.astro'
import Body from './notepad-body.astro'

export default Object.assign(Notepad, { Header, Body })
