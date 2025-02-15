/* eslint-env serviceworker */

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("pwa-cache").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/manifest.json",
                "/logo192.png",
                "/logo512.png",
                "../src/Admin-Page/Admin.js",
                "../src/Home-Page/Home.js"
            ]);
        })
    );

    this.skipWaiting();
});

this.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
