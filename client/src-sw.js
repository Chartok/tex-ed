const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

const initServiceWorker = async () => {
  try {
    precacheAndRoute(self.__WB_MANIFEST);

    const pageCache = new CacheFirst({
      cacheName: 'page-cache',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    });

    warmStrategyCache({
    urls: ['/index.html', '/'],
    strategy: pageCache,
    });

    registerRoute(({ request }) => request.mode === 'navigate', pageCache);

    // Define assetCache strategy
    const assetCache = new CacheFirst({
      cacheName: 'asset-cache',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
          maxEntries: 50,
        }),
      ],
    });

    // Cache requests like images, fonts, etc. using a Cache First strategy
    registerRoute(({ request }) => request.destination !== 'document', assetCache);
  } catch (error) {
    console.error('There was an error in the service worker configuration');
    throw error;
  }
};

initServiceWorker();
