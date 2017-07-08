import Headroom from 'headroom.js';
import lazysizes from 'lazysizes';
import FontFaceObserver from 'fontfaceobserver';
import './modernizr';
import './load-svg';

const Cookies = require('js-cookie');

/* global Promise, lazysizes */
const iamsteve = (function iamsteve() {
  // Variables
  const toggleSearchEl = document.querySelectorAll('.toggle-search');
  const search = document.querySelector('.form-search');

  // Private
  const toggleSearch = function toggleSearch(e) {
    this.classList.toggle('active');
    search.classList.toggle('visible');

    const field = document.getElementById('keywords');

    search.addEventListener('transitionend', () => {
      field.focus();
    }, true);

    e.preventDefault();
  };

  // Public
  const toggler = function toggler() {
    for (const toggle of toggleSearchEl) {
      toggle.addEventListener('click', toggleSearch, false);
    }
  };

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
      }
    };
    const h = new Headroom(el, options);

    h.init();
  };

  const lazy = () => {
    document.addEventListener('lazyunveilread', (e) => {
      e.target.parentNode.classList.add('image-loaded');
    });
  };

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
  };

  return {
    toggler: toggler(),
    headroom: header(),
    fonts: fonts(),
    images: lazy()
  };
}());
