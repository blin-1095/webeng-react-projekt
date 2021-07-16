// Service Worker Cache
//
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open('pwa-cache')
            .then(cache => cache.match(event.request))
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('pwa-cache')
            .then(cache => cache.addAll([
                './',
                './index.html',
                './pwa.webmanifest',
                './service-worker.js',
                './components/app.jsx',
                './css/app.css',
                './css/icons.css',
                './js/app.js',
                './js/map.js',
                './js/routes.js',
                './js/routingMachine.js',
                './js/wikiAPI.js',
                './pages/404.jsx',
                './pages/about.jsx',
                './pages/home.jsx',
                './static/icons/128x128.png',
                './static/icons/144x144.png',
                './static/icons/152x152.png',
                './static/icons/192x192.png',
                './static/icons/256x256.png',
                './static/icons/512x512.png',
                './static/icons/apple-touc-icon.png',
                './static/icons/favicon.png',
                './static/icons/Mapedia.png'
            ]))
            .then(() => self.skipWaiting())
    );
});