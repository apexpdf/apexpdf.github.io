// APEXPDF service worker v2.
// Rule: the app shell (HTML) is NETWORK-FIRST — always fresh when online,
// cache is offline fallback only. v1 was cache-first and trapped old pages.
const C = 'apexpdf-v2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './favicon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(C).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Navigations (the page itself): fresh copy when online.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(C).then(c => c.put('./index.html', copy));
        }
        return res;
      }).catch(() =>
        caches.match(req).then(r => r || caches.match('./index.html').then(r2 => r2 || caches.match('./')))
      )
    );
    return;
  }

  // Static assets: serve cached instantly, refresh in background.
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.ok && req.url.startsWith(self.location.origin)) {
          const copy = res.clone();
          caches.open(C).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
