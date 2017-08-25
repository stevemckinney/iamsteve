import Headroom from 'headroom.js';
/* global lazysizes */
import lazysizes from 'lazysizes';
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

  const isSearchVisible = () => overlay.classList.contains('visible');

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
      onUnpin() {
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
    document.addEventListener('lazyunveilread', (e) => {
      e.target.parentNode.classList.add('image-loaded');
    });
  }

  const fonts = () => {
    if (!document.documentElement.classList.contains('fonts-stage-1')) {
      const semibold = new FontFaceObserver('Averta', { weight: 600 });

      Promise.all([semibold.load()]).then(() => {
        document.documentElement.className += ' fonts-stage-1';
        Cookies.set('exp_fonts-stage-1', true, { expires: 365 });

        const regular = new FontFaceObserver('Averta', { weight: 400 });
        const italic = new FontFaceObserver('Averta', { weight: 300, style: 'italic' });
        const light = new FontFaceObserver('Averta', { weight: 300 });

        Promise.all([regular.load(), italic.load(), light.load()]).then(() => {
          document.documentElement.className += ' fonts-stage-2';
          Cookies.set('exp_fonts-stage-2', true, { expires: 365 });
        });
      });
    }
  }

  return {
    toggler: toggler(),
    headroom: header(),
    fonts: fonts(),
    images: lazy(),
    worker: worker()
  }
}());
