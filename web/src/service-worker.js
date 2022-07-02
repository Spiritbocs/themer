import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

// Precache all of the assets generated by the build process.
// Their URLs are injected into the manifest variable below.
precacheAndRoute(self.__WB_MANIFEST);

// Cache image resources in public/.
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin &&
    (url.pathname.endsWith('.png') || url.pathname.endsWith('.ico')),
  new StaleWhileRevalidate({ cacheName: 'images' }),
);

// Since the app only contains static content, we can skip the waiting phase so
// that subsequent loads get the fresh assets (no need to close all tabs to
// allow the previous worker to deactivate).
self.skipWaiting();
