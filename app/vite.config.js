import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://stockish-backend.onrender.com", // Your production backend URL
        changeOrigin: true,  // Set to true to change the origin header for external API
        secure: true,        // Set to true for production (if your API uses HTTPS with a valid certificate)
        ws: false,            // Optional, only if using WebSockets
      },
    },
  },
});
