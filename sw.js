// Service Worker mínimo para Los Mayorga PWA.
// Su único propósito es cumplir el requisito técnico que exigen los navegadores
// (Chrome/Edge/Android) para poder ofrecer la instalación nativa de la app.
// No cachea nada todavía: cada visita sigue trayendo los datos más frescos
// del Google Sheet, tal cual funciona hoy la app.

const CACHE_NAME = 'mayorga-shell-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Passthrough: deja pasar todos los pedidos de red normalmente.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('Sin conexión. Volvé a intentar cuando tengas señal.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    })
  );
});
