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
				changeOrigin: false,
				secure: false,  //set to true in production
				ws: true,
			},
		},
	},
});
