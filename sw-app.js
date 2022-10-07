const CACHE_NAME = `my-sample-app-cache-v1`;

var URLS = [ // Add URL you want to cache in this list.
'bell.svg',
'bestseller.png',
'bestsellerecommerce.jpg',
'bestsellerecommerce.png',
'bestsellerecommerce.svg',
'close.svg',
'desktop.css',
'ecommercechart.svg',
'fullview.svg',
'green.svg',
'holzapp.svg',
'home.png',
'home.svg',
'icon512.png',
'mindmap1.svg',
'mindmap2.svg',
'mindmapheight.svg',
'mindmapmap2.svg',
'plusicon.svg',
'privatnotes.svg',
'projectmanagement.svg',
'projectmanagementsmall.svg',
'rechnung.svg',
'red.svg',
'settings.png',
'settings.svg',
'settings1.png',
'settings22.png',
'smallview.svg',
'stickynote.svg',
'stickynote1.svg',
'stickynote2.svg',
'stickynote3.svg',
'stickynote4.svg',
'stickynote5.svg',
'styles.css',
'tableecommerce.svg',
'user.png',
'user.svg',
'yellow.svg'
]



// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // cache.addAll(URLS);
    // cache.add('1.svg',);
    for(let i = 0; i < URLS.length; i++)
    {
      console.log(URLS[i]);
      cache.add(URLS[i]);
      console.log("--->" + URLS[i]);
    }
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