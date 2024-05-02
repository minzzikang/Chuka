import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dev-dist",
  },
  plugins: [
    react(),
    tsConfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      manifest: {
        name: "chuka",
        short_name: "chuka",
        description: "chukachuka",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon/android-chrome-192x192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any",
          },
          {
            src: "icon/android-chrome-192x192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "icon/android-chrome-512x512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any",
          },
          {
            src: "icon/android-chrome-512x512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  // 추가한 부분 => 수정 필요함(소켓 안됨..)
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5000,
    hmr: {
      host: "localhost",
      protocol: "wss",
    },
  },
});
