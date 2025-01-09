import { refreshToken } from "@/lib/actions/refresh-token";
import Axios from "axios";
import { cookies } from "next/headers";
import { AppConfig } from "./config";

const axios = Axios.create({
	baseURL: AppConfig.apiBase,
	withCredentials: true,
});

// Prevent multiple calls to renew the API.
let isRefreshing = false;
// Stack to store requests waiting for the new access token.
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to notify all subscribers with the new access token.
const onAccessTokenRefreshed = (newAccessToken: string) => {
	refreshSubscribers.forEach((callback) => callback(newAccessToken));
	refreshSubscribers = [];
};

// Function to add subscribers waiting for the new token.
const addRefreshSubscriber = (callback: (token: string) => void) => {
	refreshSubscribers.push(callback);
};

// Request interceptor to add token to request headers.
axios.interceptors.request.use(
	async (config) => {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("access_token")?.value?.toString();
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		console.log("DEBUG: error from axios config token.");
		Promise.reject(error);
	},
);

// Response interceptor to handle 401 errors.
axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Check if error is due to 401 and the request hasn't already been retried.
		if (isRefreshing) {
			// Wait for the token to be refreshed.
			return new Promise((resolve, reject) => {
				addRefreshSubscriber((newAccessToken: string) => {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					resolve(axios(originalRequest));
				});
			});
		}

		isRefreshing = true;

		try {
			// Change to server action.
			const newAccessToken = await refreshToken();

			// Notify all waiting subscribers with the new token.
			onAccessTokenRefreshed(newAccessToken);

			isRefreshing = false;

			// Retry the original request with the new token.
			originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
			return axios(originalRequest);
		} catch (refreshError) {
			isRefreshing = false;
			refreshSubscribers = [];

			// Reject all queued requests.
			refreshSubscribers.forEach(async (callback) =>
				callback(await Promise.reject(refreshError)),
			);

			return Promise.reject(refreshError);
		}
	},
);

export { axios };
