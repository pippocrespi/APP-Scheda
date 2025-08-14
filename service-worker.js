const CACHE_NAME = 'scheda-offline-cache-v1';

const urlsToCache = [
  '/APP-Scheda/',
  '/APP-Scheda/index.html',
  '/APP-Scheda/icon-192.png',
  '/APP-Scheda/icon-512.png',

  // CSS
  '/APP-Scheda/css/print.css',
  '/APP-Scheda/css/style.css',

  // JS
  '/APP-Scheda/js/checkValue.js',
  '/APP-Scheda/js/date-time.js',
  '/APP-Scheda/js/exclusiveCheckbox.js',
  '/APP-Scheda/js/fillPDF.js',
  '/APP-Scheda/js/incrementButton.js',
  '/APP-Scheda/js/localization.js',
  '/APP-Scheda/js/pdf.js',

  // Libs
  '/APP-Scheda/libs/jspdf.es.js',
  '/APP-Scheda/libs/jspdf.es.min.js',
  '/APP-Scheda/libs/jspdf.node.js',
  '/APP-Scheda/libs/jspdf.node.min.js',
  '/APP-Scheda/libs/jspdf.plugin.autotable.js',
  '/APP-Scheda/libs/jspdf.plugin.autotable.min.js',
  '/APP-Scheda/libs/jspdf.plugin.autotable.mjs',
  '/APP-Scheda/libs/jspdf.umd.js',
  '/APP-Scheda/libs/jspdf.umd.min.js',
  '/APP-Scheda/libs/pdf-lib.min.js',
  '/APP-Scheda/libs/polyfills.es.js',
  '/APP-Scheda/libs/polyfills.umd.js'
];

// Install: cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch: respond with cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => caches.match('/APP-Scheda/index.html'))
  );
});

// Activate: remove old caches if needed
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});
