import './modernizr';

const Flickity = require('flickity');

/* global Modernizr */
const home = (function () {
  // With multiple, and having custom pagination, you need to initialise using
  // the parent as a reference, https://github.com/metafizzy/flickity/issues/319
  const setupFlickity = (container) => {
    // init flickity
    const scroll = container.querySelector('.scroll');
  
    // Pagination
    const left = container.querySelector('.paginate-left');
    const right = container.querySelector('.paginate-right');
  
    // Has flickity reached the first or last item?
    // If so add or remove the relevant class name
    // reference: https://github.com/metafizzy/flickity/issues/220
    const disabled = 'disabled';
  
    const flickity = new Flickity(scroll,
      {
        cellAlign: 'left',
        freeScroll: true,
        prevNextButtons: false,
        pageDots: false,
        contain: false,
        imagesLoaded: true,
        dragThreshold: 24,
        groupCells: true,
        percentPosition: false
      });
  
    // Initial state means left should be disabled
    left.classList.add(disabled);
  
    left.addEventListener('click', () => flickity.previous());
  
    right.addEventListener('click', () => flickity.next());
  
    flickity.on('cellSelect', () => {
      const i = flickity.selectedIndex;
  
      if (i === flickity.cells.length - 1) right.classList.add(disabled);
      else right.classList.remove(disabled);
  
      if (i === 0) left.classList.add(disabled);
      else left.classList.remove(disabled);
    });
  };
  
  
  // Find all rows of posts, loop through them and setup flickity
  return {
    const flickities = () => {
      const rows = document.querySelectorAll('.posts');
      const pagination = document.querySelectorAll('.js-pagination');
    
      if (!Modernizr.touchevents) {
        for (let i = 0; i < rows.length; i += 1) {
          setupFlickity(rows[i]);
        }
      }
      else {
        for (let ii = 0; ii < pagination.length; ii += 1) {
          pagination[ii].parentNode.removeChild(pagination[ii]);
        }
      }
    };
  }
})();

home.flickities();