import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://stockish-backend.onrender.com",
        changeOrigin: true,
        secure: true,
        ws: false,
      },
    },
  },
});
