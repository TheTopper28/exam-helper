const CACHE_NAME = "revision-cache-v1";

const ASSETS = [
  "index.html",
  "login.html",
  "formulas.html",
  "style.css",
  "auth.css",
  "formulas.css",
  "script.js",
  "auth.js",
  "icon-192.png",
  "icon-512.png"
];

// install
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// fetch
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
