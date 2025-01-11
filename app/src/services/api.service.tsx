import axios from "axios";
import tokens from "./tokens.service";

const baseURL = process.env.NODE_ENV === "production"
  ? "https://stockish-backend.onrender.com/api"  // Your production backend URL
  : "/api";  // Use the proxy in development (handled by Vite)

// Create the axios instance
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
	(config) => {
		const token = tokens.getToken();
		if (token) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default instance;
