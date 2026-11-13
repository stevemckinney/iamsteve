// components/button/copy-link.js: copy a note’s link, and show the tick and
// “Copied” for two seconds. As in Next, a second copy doesn’t restart them
const hidden = ['opacity-0', 'scale-75']

function show(button, copied) {
  const [link, done] = button.querySelectorAll('svg')
  link.classList[copied ? 'add' : 'remove'](...hidden)
  done.classList[copied ? 'remove' : 'add'](...hidden)
  button.lastElementChild.textContent = copied ? 'Copied' : 'Copy link'
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy-link]')
  if (!button) return

  await navigator.clipboard.writeText(button.dataset.copyLink)
  show(button, true)
  setTimeout(() => show(button, false), 2000)
})
