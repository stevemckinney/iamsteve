// components/fragment-links.js: clicking a heading’s fragment puts its
// link in the address bar and copies it
for (const fragment of document.querySelectorAll('.fragment')) {
  fragment.style.cursor = 'pointer'
  fragment.addEventListener('click', (event) => {
    const heading = event.target.closest('h2, h3, h4, h5, h6')
    if (!heading?.id) return

    history.replaceState(null, '', `#${heading.id}`)
    navigator.clipboard?.writeText(window.location.href)
  })
}
