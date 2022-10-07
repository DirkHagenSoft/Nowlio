const CACHE_NAME = `my-sample-app-cache-v1`;

var URLS = [ // Add URL you want to cache in this list.
'/Nowlio/index.html',
'/Nowlio/core.html',
'/Nowlio/1.svg',
'/Nowlio/2.svg',
'/Nowlio/3.svg',
'/Nowlio/4.svg',
'/Nowlio/5.svg',
'/Nowlio/6.svg',
'/Nowlio/7.svg',
'/Nowlio/8.svg',
'/Nowlio/9.svg',
'/Nowlio/10.svg',
'/Nowlio/11.svg',
'/Nowlio/42.svg',
'/Nowlio/43.svg',
'/Nowlio/44.svg',
'/Nowlio/45.svg',
'/Nowlio/46.svg',
'/Nowlio/47.svg',
'/Nowlio/48.svg',
'/Nowlio/49.svg',
'/Nowlio/50.svg',
'/Nowlio/51.svg',
'/Nowlio/52.svg',
'/Nowlio/53.svg'
]

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(URLS);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    try {
      // Try to fetch the resource from the network.
      const fetchResponse = await fetch(event.request);

      // Save the resource in the cache.
      cache.put(event.request, fetchResponse.clone());

      // And return it.
      return fetchResponse;
    } catch (e) {
      // Fetching didn't work get the resource from the cache.
      const cachedResponse = await cache.match(event.request);

      // And return it.
      return cachedResponse;
    }
  })());
});