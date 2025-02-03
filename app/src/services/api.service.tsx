import axios from "axios";
import tokens from "./tokens.service";

const baseURL = process.env.NODE_ENV === "production"
  ? "https://stockish.onrender.com/api"  // Production backend URL
  : ""; // Do nothing for development, or handle it in a different way if needed

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
