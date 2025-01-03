import Axios from "axios";
import { cookies } from "next/headers";
import { AppConfig } from "./app.config";

const axios = Axios.create({
	baseURL: AppConfig.apiBase,
	withCredentials: true,
});

// Prevent multiple call renew API.
let isRefreshing = false;
// Stack store list requests is waiting access_token.
let refreshSubscribers: ((token: string) => void)[] = [];

// Request interceptor to add token to request headers
axios.interceptors.request.use(
	async (config) => {
		// TODO: pass the token to header auth.
		const accessToken = (await cookies()).get("access_token")?.value.toString();
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Response interceptor intercepting 401 responses, refreshing token and retrying the request
axios.interceptors.response.use(
	(response) => response,
	// If 401 authen error.
	async (error) => {
		const originalRequest = error.config;
		// Wait for exist renew access_token from other.
		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				refreshSubscribers.push((access_token: string) => {
					originalRequest.headers.Authorization = `Bearer ${access_token}`;
					resolve(axios(originalRequest));
				});
			});
		}

		// Renew token if no-one is renewing.
		isRefreshing = true;
		try {
			// Get new access token using refresh token.
			const refreshToken = (await cookies())
				.get("refresh_token")
				?.value.toString();
			const response = await axios.post("/api/auth/refresh", {
				refreshToken: refreshToken,
			});
			const newAccessToken = response.data.access_token;

			// Call fail and original requests in stack.
			refreshSubscribers.forEach((callback) => callback(newAccessToken));
			refreshSubscribers = [];
			isRefreshing = false;

			originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
			return axios(originalRequest);
		} catch (refreshError) {
			isRefreshing = false;
			refreshSubscribers = [];
			return Promise.reject(refreshError);
		}
	},
);

export { axios };
