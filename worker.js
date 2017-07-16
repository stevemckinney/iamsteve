(function (window, document, undefined) {
  'use strict';
  
  // This is the service worker code that lives at the root (sw.js)
  
  // You have to supply a name for your cache, this will
  // allow us to remove an old one to avoid hitting disk
  // space limits and displaying old resources
  var cacheName = 'v3';
  
  // Assets to cache
  var url = 'https://dev.iamsteve.me';
  var assetsToCache = [url + '/dist/css/global.css', url + '/dist/js/global.js', url + '/dist/js/home.js', url + '/dist/js/blog.js', url + '/dist/js/blog.js', url + '/dist/images/lettering.svg', url + '/dist/images/rio-osc.svg', url + '/assets/fonts/averta/avertastd-semibold-webfont.woff2', url + '/assets/fonts/averta/avertastd-regular-webfont.woff2'];
  
  self.addEventListener('install', function(event) {
    // waitUntil() ensures that the Service Worker will not
    // install until the code inside has successfully occurred
    event.waitUntil(
      // Create cache with the name supplied above and
      // return a promise for it
      caches.open(cacheName).then(function(cache) {
          // Important to `return` the promise here to have `skipWaiting()`
          // fire after the cache has been updated.
          return cache.addAll(assetsToCache);
      }).then(function() {
        // `skipWaiting()` forces the waiting ServiceWorker to become the
        // active ServiceWorker, triggering the `onactivate` event.
        // Together with `Clients.claim()` this allows a worker to take effect
        // immediately in the client(s).
        return self.skipWaiting();
      })
    );
  });
  
  // Activate event
  // Be sure to call self.clients.claim()
  self.addEventListener('activate', function(event) {
  	// `claim()` sets this worker as the active worker for all clients that
  	// match the workers scope and triggers an `oncontrollerchange` event for
  	// the clients.
  	return self.clients.claim();
  });
  
  self.addEventListener('fetch', function(event) {
    // Ignore non-get request like when accessing the admin panel
    if (event.request.method !== 'GET') { return; }
    // Don't try to handle non-secure assets because fetch will fail
    if (/http:/.test(event.request.url)) { return; }
  
    // Here's where we cache all the things!
    event.respondWith(
      // Open the cache created when install
      caches.open(cacheName).then(function(cache) {
        // Go to the network to ask for that resource
        return fetch(event.request).then(function(networkResponse) {
          // Add a copy of the response to the cache (updating the old version)
          cache.put(event.request, networkResponse.clone());
          // Respond with it
          return networkResponse;
        }).catch(function() {
          // If there is no internet connection, try to match the request
          // to some of our cached resources
          return cache.match(event.request);
        })
      })
    );
  });
})(window, document);