import ScrollBooster from 'scrollbooster';

const home = (function home() {
  function isTouchDevice() {
    // Checks for existence in all browsers and IE 10/11 & Surface
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }
  const setupSB = (container) => {
    // init flickity
    const content = container.querySelector('.scroll')

    console.log(content);

    const sb = new ScrollBooster({
      viewport: container,
      content,
      bounce: true,
      textSelection: true,
      emulateScroll: true,
      onUpdate: (data) => {
        content.style.transform = `translate(
          ${-data.position.x}px
        )`
        // and also metrics: data.viewport['width'|'height'] and data.cotent['width'|'height']
      }
    });

    console.log(sb);
  }

  return {
    scrollbooster: () => {
      const rows = document.querySelectorAll('.posts');
      const pagination = document.querySelectorAll('.js-pagination');

      if (!isTouchDevice()) {
        for (let i = 0; i < rows.length; i += 1) {
          console.log(`for ${rows[i]}`);
          setupSB(rows[i]);
        }
      }
      else {
        for (const paging of pagination) {
          paging.parentNode.removeChild(paging);
        }
      }
    }
  }
}());

home.scrollbooster();
