import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'logo-192.png', 'logo-512.png'],
      manifest: {
        name: 'Mikia App',
        short_name: 'Mikia',
        description: 'App de interactiva de trivia y memoria',
        theme_color: '#33d9b2',
        icons: [
          {
            src: './logo-192.png',  // Updated path
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './logo-512.png',  // Updated path
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      manifestFilename: 'manifest.json',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,gif,ttf}'], 
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',  // Falls back to network first, then cache
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',  // Loads from cache first, then updates in background
            options: {
              cacheName: 'static-resources',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',  // Caches images for offline use
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
        ],
      },
    })
  ],
  base: '/mikiapwa/',  // Ensure this matches your GitHub Pages project name
});
