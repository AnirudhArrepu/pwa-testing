/* eslint-env serviceworker */

const CACHE_NAME = "pwa-cache-v1";

const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/logo192.png",
    "/logo512.png",
    "/static/js/bundle.js",
    "/static/js/main.*.js",
    "/static/css/main.*.css", 
];

// 🔹 INSTALL: Cache only essential static assets
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );

    this.skipWaiting(); // Activate service worker immediately
});

// 🔹 ACTIVATE: Remove old caches
this.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME) // Delete old caches
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
    this.clients.claim(); // Take control of all open tabs
});

// 🔹 FETCH: Prioritize network, fallback to cache
this.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // Save new response to cache
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            })
            .catch(() => caches.match(event.request) || caches.match("/index.html")) // Offline fallback
    );
});
