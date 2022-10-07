const CACHE_NAME = `my-sample-app-cache-v1`;

var URLS = [ // Add URL you want to cache in this list.
'/PWAPP/index.html',
'/PWAPP/core.html',
'/PWAPP/1.html',
'/PWAPP/2.html',
'/PWAPP/3.html',
'/PWAPP/4.html',
'/PWAPP/5.html',
'/PWAPP/6.html',
'/PWAPP/7.html',
'/PWAPP/8.html',
'/PWAPP/9.html',
'/PWAPP/10.html',
'/PWAPP/11.html',
'/PWAPP/42.html',
'/PWAPP/43.html',
'/PWAPP/44.html',
'/PWAPP/45.html',
'/PWAPP/46.html',
'/PWAPP/47.html',
'/PWAPP/48.html',
'/PWAPP/49.html',
'/PWAPP/50.html',
'/PWAPP/51.html',
'/PWAPP/52.html',
'/PWAPP/53.html'
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