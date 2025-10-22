// vite.config.ts
import { defineConfig } from "file:///C:/Users/juan/code/playcon/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/juan/code/playcon/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/juan/code/playcon/node_modules/vite-plugin-pwa/dist/index.js";
import mkcert from "file:///C:/Users/juan/code/playcon/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["vite.svg", "logo-192.png", "logo-512.png"],
      manifest: {
        name: "PHK",
        short_name: "PHK",
        description: "App de interactiva de trivia y memoria",
        theme_color: "#2563eb",
        icons: [
          {
            src: "./logo-192.png",
            // Updated path
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "./logo-512.png",
            // Updated path
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      manifestFilename: "manifest.json",
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,gif,ttf,jpg}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            // Falls back to network first, then cache
            options: {
              cacheName: "html-cache"
            }
          },
          {
            urlPattern: ({ request }) => request.destination === "script" || request.destination === "style",
            handler: "StaleWhileRevalidate",
            // Loads from cache first, then updates in background
            options: {
              cacheName: "static-resources"
            }
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            // Caches images for offline use
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60
                // Cache for 30 days
              }
            }
          }
        ]
      }
    })
  ],
  base: "/playcon/"
  // Ensure this matches your GitHub Pages project name
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqdWFuXFxcXGNvZGVcXFxccGxheWNvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcanVhblxcXFxjb2RlXFxcXHBsYXljb25cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2p1YW4vY29kZS9wbGF5Y29uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xyXG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBta2NlcnQoKSxcclxuICAgIFZpdGVQV0Eoe1xyXG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuICAgICAgaW5jbHVkZUFzc2V0czogWyd2aXRlLnN2ZycsICdsb2dvLTE5Mi5wbmcnLCAnbG9nby01MTIucG5nJ10sXHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgbmFtZTogJ1BISycsXHJcbiAgICAgICAgc2hvcnRfbmFtZTogJ1BISycsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdBcHAgZGUgaW50ZXJhY3RpdmEgZGUgdHJpdmlhIHkgbWVtb3JpYScsXHJcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjMjU2M2ViJyxcclxuICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICcuL2xvZ28tMTkyLnBuZycsICAvLyBVcGRhdGVkIHBhdGhcclxuICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcclxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJy4vbG9nby01MTIucG5nJywgIC8vIFVwZGF0ZWQgcGF0aFxyXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgbWFuaWZlc3RGaWxlbmFtZTogJ21hbmlmZXN0Lmpzb24nLFxyXG4gICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLHBuZyxzdmcsZ2lmLHR0ZixqcGd9J10sIFxyXG4gICAgICAgIHJ1bnRpbWVDYWNoaW5nOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybFBhdHRlcm46ICh7IHJlcXVlc3QgfSkgPT4gcmVxdWVzdC5kZXN0aW5hdGlvbiA9PT0gJ2RvY3VtZW50JyxcclxuICAgICAgICAgICAgaGFuZGxlcjogJ05ldHdvcmtGaXJzdCcsICAvLyBGYWxscyBiYWNrIHRvIG5ldHdvcmsgZmlyc3QsIHRoZW4gY2FjaGVcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ2h0bWwtY2FjaGUnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdXJsUGF0dGVybjogKHsgcmVxdWVzdCB9KSA9PiByZXF1ZXN0LmRlc3RpbmF0aW9uID09PSAnc2NyaXB0JyB8fCByZXF1ZXN0LmRlc3RpbmF0aW9uID09PSAnc3R5bGUnLFxyXG4gICAgICAgICAgICBoYW5kbGVyOiAnU3RhbGVXaGlsZVJldmFsaWRhdGUnLCAgLy8gTG9hZHMgZnJvbSBjYWNoZSBmaXJzdCwgdGhlbiB1cGRhdGVzIGluIGJhY2tncm91bmRcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ3N0YXRpYy1yZXNvdXJjZXMnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdXJsUGF0dGVybjogKHsgcmVxdWVzdCB9KSA9PiByZXF1ZXN0LmRlc3RpbmF0aW9uID09PSAnaW1hZ2UnLFxyXG4gICAgICAgICAgICBoYW5kbGVyOiAnQ2FjaGVGaXJzdCcsICAvLyBDYWNoZXMgaW1hZ2VzIGZvciBvZmZsaW5lIHVzZVxyXG4gICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnaW1hZ2UtY2FjaGUnLFxyXG4gICAgICAgICAgICAgIGV4cGlyYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDUwLFxyXG4gICAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogMzAgKiAyNCAqIDYwICogNjAsIC8vIENhY2hlIGZvciAzMCBkYXlzXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgXSxcclxuICBiYXNlOiAnL3BsYXljb24vJywgIC8vIEVuc3VyZSB0aGlzIG1hdGNoZXMgeW91ciBHaXRIdWIgUGFnZXMgcHJvamVjdCBuYW1lXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBRLFNBQVMsb0JBQW9CO0FBQ3ZTLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxZQUFZO0FBR25CLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLGVBQWUsQ0FBQyxZQUFZLGdCQUFnQixjQUFjO0FBQUEsTUFDMUQsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQTtBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUE7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGtCQUFrQjtBQUFBLE1BQ2xCLFNBQVM7QUFBQSxRQUNQLGNBQWMsQ0FBQyx3Q0FBd0M7QUFBQSxRQUN2RCxnQkFBZ0I7QUFBQSxVQUNkO0FBQUEsWUFDRSxZQUFZLENBQUMsRUFBRSxRQUFRLE1BQU0sUUFBUSxnQkFBZ0I7QUFBQSxZQUNyRCxTQUFTO0FBQUE7QUFBQSxZQUNULFNBQVM7QUFBQSxjQUNQLFdBQVc7QUFBQSxZQUNiO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLFlBQVksQ0FBQyxFQUFFLFFBQVEsTUFBTSxRQUFRLGdCQUFnQixZQUFZLFFBQVEsZ0JBQWdCO0FBQUEsWUFDekYsU0FBUztBQUFBO0FBQUEsWUFDVCxTQUFTO0FBQUEsY0FDUCxXQUFXO0FBQUEsWUFDYjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxZQUFZLENBQUMsRUFBRSxRQUFRLE1BQU0sUUFBUSxnQkFBZ0I7QUFBQSxZQUNyRCxTQUFTO0FBQUE7QUFBQSxZQUNULFNBQVM7QUFBQSxjQUNQLFdBQVc7QUFBQSxjQUNYLFlBQVk7QUFBQSxnQkFDVixZQUFZO0FBQUEsZ0JBQ1osZUFBZSxLQUFLLEtBQUssS0FBSztBQUFBO0FBQUEsY0FDaEM7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsTUFBTTtBQUFBO0FBQ1IsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
