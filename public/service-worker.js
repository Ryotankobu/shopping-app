/* eslint-env serviceworker */

const CACHE_NAME = "todo-app-cache-v1";
const urlsToCache = ["/", "/index.html", "/App.js", "/App.css"];

// Install Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch from Cache
self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached resource or fetch from the network
      return response || fetch(event.request);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
