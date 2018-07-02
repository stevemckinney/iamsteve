import Headroom from 'headroom.js';
import 'lazysizes';
import FontFaceObserver from 'fontfaceobserver';
import './modernizr';
import './load-svg';

const Cookies = require('js-cookie');

/* global Promise */
const iamsteve = (function iamsteve() {
  // Variables
  const toggleSearchEl = document.querySelectorAll('.toggle-search');
  const overlay = document.querySelector('.overlay-search');
  const field = document.getElementById('keywords');
  const currentPath = window.location.pathname;
  const cacheButton = document.querySelector('.button-offline');
  const cacheButtonText = document.querySelector('.button-text');
  const imageArray = document.querySelectorAll('img');
  const meta = document.querySelector('.single-meta');
  const doc = document.documentElement;

  // Text
  const copy = {
    worker: {
      initial: 'Save for offline',
      fail: 'Couldn’t save',
      win: 'Available offline'
    }
  };

  // Private
  const toggleSearch = function toggleSearch(e) {
    for (const toggle of toggleSearchEl) {
      toggle.classList.toggle('active');
    }

    overlay.classList.toggle('hiding');
    overlay.classList.toggle('showing');

    overlay.addEventListener('transitionend', () => {
      // Only focus on the element if it contains the relevant
      // class name that means it’s actually visible
      if (overlay.classList.contains('showing')) {
        field.focus();
      }
      else {
        field.blur();
      }
    }, true);

    e.preventDefault();
  }

  const isSearchVisible = () => overlay.classList.contains('showing');

  // Public
  const toggler = function toggler() {
    for (const toggle of toggleSearchEl) {
      toggle.addEventListener('click', toggleSearch, false);
    }
  }

  // Test if service workers are supported
  const worker = () => {
    if ('serviceWorker' in navigator) {
      // Attempt to register it
      navigator.serviceWorker.register('/worker.js').then(() => {
        // Success Message
        console.log('ServiceWorker succesfully registered');
      }).catch((err) => {
        // Error Message
        console.log('ServiceWorker registration failed: ', err);
      });

      // Event listener
      if (cacheButton) {
        cacheButtonText.textContent = copy.worker.initial;

        cacheButton.addEventListener('click', (event) => {
          event.preventDefault();
          // Build an array of the page-specific resources.
          const pageResources = [currentPath];

          // Add images to the array
          for (const image of imageArray) {
            pageResources.push(image.src);
          }

          // Open the unique cache for this URL
          caches.open(`offline-${currentPath}`).then((cache) => {
            const updateCache = cache.addAll(pageResources);

            // Update UI to indicate success
            updateCache.then(() => {
              cacheButtonText.textContent = copy.worker.win;
              cacheButton.classList.add('secondary');
            });

            // Or catch any errors if it doesn't succeed
            updateCache.catch(() => {
              cacheButtonText.textContent = copy.worker.fail;

              setTimeout(() => {
                cacheButtonText.textContent = copy.worker.initial;
              }, 2000);
            });
          });
        });
      }
    }
    else if (!('serviceWorker' in navigator) && cacheButton) {
      // If service worker isn't available we'd like to adjust the layout
      cacheButton.parentNode.remove();
      meta.classList.add('single-meta-no-sw');
    }
  }

  const header = () => {
    const el = document.querySelector('.header');
    const options = {
      tolerance: {
        up: 12,
        down: 12
      },
      classes: {
        initial: 'header',
        pinned: 'header-pinned',
        unpinned: 'header-unpinned',
        top: 'header-top',
        notTop: 'header-not-top',
        bottom: 'header-bottom',
        notBottom: 'header-not-bottom'
      },
      onUnpin: function onUnpin() {
        if (isSearchVisible()) {
          this.elem.classList.remove(this.classes.unpinned);
          this.elem.classList.add(this.classes.pinned);
        }
        else {
          this.elem.classList.add(this.classes.unpinned);
          this.elem.classList.remove(this.classes.pinned);
        }
      }
    };
    const h = new Headroom(el, options);

    h.init();
  }

  const lazy = () => {
    document.addEventListener('lazyloaded', (e) => {
      e.target.parentNode.classList.add('image-loaded');
      e.target.parentNode.classList.remove('loading');
    });
  }

  const fonts = () => {
    Cookies.set('exp_css', true, { expires: 365 });

    if (!doc.classList.contains('fonts-stage-1')) {
      const semibold = new FontFaceObserver('AvertaW', { weight: 600 });

      Promise.all([semibold.load()]).then(() => {
        doc.className += ' fonts-stage-1';
        Cookies.set('exp_fonts-stage-1', true, { expires: 365 });

        const regular = new FontFaceObserver('AvertaW', { weight: 400 });
        const italic = new FontFaceObserver('AvertaW', { weight: 300, style: 'italic' });
        const light = new FontFaceObserver('AvertaW', { weight: 300 });

        Promise.all([regular.load(), italic.load(), light.load()]).then(() => {
          doc.className += ' fonts-stage-2';
          Cookies.set('exp_fonts-stage-2', true, { expires: 365 });
        });
      }).catch((err) => {
        doc.className += ' fonts-failed';
      });
    }
  }

  return {
    init: function init() {
      // Initialise everything
      toggler();
      header();
      fonts();
      lazy();
      worker();
    }
  }
}());

iamsteve.init();
