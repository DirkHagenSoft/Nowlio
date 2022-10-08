const CACHE_NAME = `my-sample-app-cache-v1`;

var URLS = [ // Add URL you want to cache in this list.
'index.html',
'core.html',
'1.svg',
'2.svg',
'3.svg',
'4.svg',
'5.svg',
'6.svg',
'7.svg',
'8.svg',
'9.svg',
'10.svg',
'11.svg',
'42.svg',
'43.svg',
'44.svg',
'45.svg',
'46.svg',
'47.svg',
'48.svg',
'49.svg',
'50.svg',
'51.svg',
'52.svg',
'53.svg',
'back-preview.jpg',
'back.jpeg',
'bell.svg',
'bestseller.png',
'bluebackground-preview.jpg',
'bluebackground.jpg',
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
'newdesktop-preview.jpg',
'newdesktop.jpg',
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
'yellow.svg',
'app.html?a=1',
'app.html?a=2',
'app.html?a=3',
'app.html?a=4',
'app.html?a=5',
'app.html?a=6',
'app.html?a=7',
'app.html?a=8',
'app.html?a=9',
'app.html?a=10',
'app.html?a=11'
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