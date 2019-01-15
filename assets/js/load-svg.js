/* eslint-disable */
const loadSVG = (function loadSVG() {
/* eslint-enable */
  const distPath = `${document.location.origin}/dist/images`;
  let loaded = false;

  // Private
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  // https://davidwalsh.name/javascript-debounce-function
  /* eslint-disable */
  const debounce = function debounce(func, wait, immediate) {
    let timeout;

    return function debounce() {
      const context = this;
      const args = arguments;

      const later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  /* eslint-enable */

  // Check to see if the window is wide enough to fit the image
  const room = function room() {
    if (window.matchMedia('(min-width: 600px)').matches) {
      return true;
    }

    return false;
  };

  const getSubscribeImage = debounce(() => {
    if (room() && loaded === false) {
      const ajax = new XMLHttpRequest();
      ajax.open('GET', `${distPath}/subscribe.svg`, true);
      ajax.send();

      ajax.onload = function insertImage() {
        loaded = true;
        document.body.insertAdjacentHTML('afterbegin', ajax.responseText);
      };
    }
  }, 1000);

  // Public
  const dogs = function dogs() {
    const container = document.querySelector('.rio-osc');

    if (container) {
      const ajax = new XMLHttpRequest();
      ajax.open('GET', `${distPath}/rio-osc.svg`, true);
      ajax.send();
      ajax.onload = function insertImage() {
        container.innerHTML = ajax.responseText;
      };
    }
  };

  const subscribe = function subscribe() {
    const images = document.querySelectorAll('.subscribe-image');

    console.log(images);

    if (images) {
      for (const image of images) {
        console.log(image);
        getSubscribeImage();
        window.addEventListener('resize', getSubscribeImage, false);
      }
    }
  };

  return {
    dogs: dogs(),
    sub: subscribe()
  };
}());
