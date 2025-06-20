const CACHE_NAME = 'mylink-cache-v1';
const OFFLINE_URL = 'offline.html';
const PRECACHE_ASSETS = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'links.json',
  'manifest.json',
  OFFLINE_URL,
  'assets/avatar.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(cached =>
      cached || fetch(request).then(res => {
        if (request.url.startsWith(self.location.origin)) {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, resClone));
        }
        return res;
      }).catch(() => cached)
    )
  );
});
