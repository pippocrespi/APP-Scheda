const CACHE_NAME = 'scheda-offline-cache-v1';

const urlsToCache = [
  '/',
  '/APP-Scheda/',
  '/APP-Scheda/index.html',
  '/APP-Scheda/style.css',
  '/APP-Scheda/script.js',
  'https://code.jquery.com/jquery-3.7.1.min.js', // esempio esterno
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  // Aggiungi qui tutte le altre risorse che usi (font, icone, immagini...)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Serve dalla cache, altrimenti prova dal network
      return response || fetch(event.request);
    }).catch(() => {
      // Eventuale fallback offline
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
