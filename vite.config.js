// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       // Customize file extensions and aliases as needed
//       "@": "/src",
//     },
//     // You can also configure file extensions here
//     // extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      manifest: {
        name: "Karon",
        short_name: "Karon",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Add workbox options here if needed
      },
    }),
  ],
});
