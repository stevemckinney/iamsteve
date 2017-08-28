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
  const currentPath = window.location.pathname;
  const cacheButton = document.querySelector('.link-offline');
  const imageArray = document.querySelectorAll('img');

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

      // Event listener
      if (cacheButton) {
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
            // Or catch any errors if it doesn't succeed
            updateCache.then(() => {
              console.log('Article is now available offline.');
            }).catch(() => {
              console.log('Article could not be saved offline.');
            });
          });
        });
      }
    }
    else {
      if (cacheButton) cacheButton.remove();
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
  
  const fader = () => {
    const links = document.querySelectorAll('a[href]');
    const body = document.querySelector('body');
    
    body.style.transition = 'opacity .4s ease-out';
    
    for (const link of links) {
      
      link.addEventListener('click', function(event) {
        const go = this.href;
        event.preventDefault();
        
        body.style.opacity = 0;
        
        setTimeout(() => {
          window.location = go;
        }, 400);
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
