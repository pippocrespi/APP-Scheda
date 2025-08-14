const CACHE_NAME = 'scheda-offline-cache-v1';

const urlsToCache = [
  '/APP-Scheda/',
  '/APP-Scheda/index.html',
  '/APP-Scheda/icon-192.png',
  '/APP-Scheda/icon-512.png',

  //css
  '/APP-Scheda/css/',
  '/APP-Scheda/css/print.css',
  '/APP-Scheda/css/style.css',

  //js
  '/APP-Scheda/js/',
  '/APP-Scheda/js/checkValue.js',
  '/APP-Scheda/js/date-time.js',
  '/APP-Scheda/js/exclusiveCheckbox.js',
  '/APP-Scheda/js/fillPDF.js',
  '/APP-Scheda/js/incrementButton.js',
  '/APP-Scheda/js/localization.js',
  '/APP-Scheda/js/pdf.js',

  //libs
  '/APP-Scheda/libs/',
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
  '/APP-Scheda/libs/polyfills.umd.js',



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
