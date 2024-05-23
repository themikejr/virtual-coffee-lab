// Version 0.0.1
self.addEventListener("install", (event) => {
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Claim control over all clients as soon as the service worker is activated.
  event.waitUntil(self.clients.claim());
});
