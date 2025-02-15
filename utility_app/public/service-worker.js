/* eslint-env serviceworker */

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("pwa-cache-v1").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/manifest.json",
                "/logo192.png",
                "/logo512.png","/static/js/bundle.js",
                "/static/js/main.*.js",  // Ensure dynamic caching
                "/static/css/main.*.css", 
            ]);
        })
    );

    this.skipWaiting();
});

this.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.open("pwa-cache-v1").then((cache) => {
            return fetch(event.request).then((response) => {
                cache.put(event.request, response.clone()); // Update cache
                return response;
            }).catch(() => caches.match(event.request)); // Fallback to cache
        })
    );
});

