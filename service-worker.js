const CACHE_NAME = 'scheda-offline-cache-v1';

const urlsToCache = [
  '/APP-Scheda/',
  '/APP-Scheda/index.html',
  '/APP-Scheda/icon-192.png',
  '/APP-Scheda/icon-512.png',
  'https://code.jquery.com/jquery-3.7.1.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => caches.match('/APP-Scheda/index.html'))
  );
});
