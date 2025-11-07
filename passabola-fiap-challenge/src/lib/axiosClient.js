import axios from "axios";

// Helper to read cookie by name in the browser
function readCookie(name) {
	if (typeof document === "undefined") return null;
	const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
	return match ? decodeURIComponent(match[2]) : null;
}

// Get token from cookie (preferred) or localStorage (fallback)
function getToken() {
	if (typeof window === "undefined") return null;
	const tokenFromCookie = readCookie("token");
	if (tokenFromCookie) return tokenFromCookie;
	try {
		return localStorage.getItem("token");
	} catch (e) {
		return null;
	}
}

// Create axios instance
const api = axios.create({
	// If you use a separate API host, set NEXT_PUBLIC_API_URL in .env and it will be used here.
	baseURL: process.env.NEXT_PUBLIC_API_URL || "",
	// include credentials when making cross-site requests (optional)
	withCredentials: true,
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers = config.headers || {};
			// Only set Authorization if not already provided
			if (
				!config.headers["Authorization"] &&
				!config.headers["authorization"]
			) {
				config.headers["Authorization"] = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default api;
