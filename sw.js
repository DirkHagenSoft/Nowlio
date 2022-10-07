const CACHE_NAME = `my-sample-app-cache-v1`;

var URLS = [ // Add URL you want to cache in this list.
'/PWAPP/index.html',
'/PWAPP/core.html',
'/PWAPP/1.svg',
'/PWAPP/2.svg',
'/PWAPP/3.svg',
'/PWAPP/4.svg',
'/PWAPP/5.svg',
'/PWAPP/6.svg',
'/PWAPP/7.svg',
'/PWAPP/8.svg',
'/PWAPP/9.svg',
'/PWAPP/10.svg',
'/PWAPP/11.svg',
'/PWAPP/42.svg',
'/PWAPP/43.svg',
'/PWAPP/44.svg',
'/PWAPP/45.svg',
'/PWAPP/46.svg',
'/PWAPP/47.svg',
'/PWAPP/48.svg',
'/PWAPP/49.svg',
'/PWAPP/50.svg',
'/PWAPP/51.svg',
'/PWAPP/52.svg',
'/PWAPP/53.svg'
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