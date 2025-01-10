import Axios from "axios";
import { cookies } from "next/headers";
import { AppConfig } from "./config";

const axiosClient = Axios.create({
	baseURL: AppConfig.apiBase,
	withCredentials: true,
});

// Request interceptor to add token to request headers.
axiosClient.interceptors.request.use(
	async (config) => {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("access_token")?.value.toString();
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

export { axiosClient };
