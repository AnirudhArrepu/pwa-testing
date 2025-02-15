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
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request)
                .then((networkResponse) => {
                    return caches.open("pwa-cache-v1").then((cache) => {
                        cache.put(event.request, networkResponse.clone()); // Cache new request
                        return networkResponse;
                    });
                })
                .catch(() => {
                    return caches.match("/index.html"); // Fallback to index.html if offline
                });
        })
    );
});
