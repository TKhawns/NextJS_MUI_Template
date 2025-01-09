"use server";

import { axios } from "@/configs/axios.config";
import { cookies } from "next/headers";

export async function refreshToken() {
	const cookieStore = await cookies();
	const refreshToken = cookieStore.get("refresh_token")?.value.toString();

	if (!refreshToken) {
		throw new Error("Missing refresh token");
	}

	try {
		// Request a new access token
		const response = await axios.post("/auth/refresh", { refreshToken });
		const newAccessToken = response.data.accessToken;

		console.log("Test new token", newAccessToken);

		// Update the cookie securely
		cookieStore.set("access_token", newAccessToken);

		return newAccessToken;
	} catch (error) {
		console.error("Error refreshing token:", error);
		throw new Error("Failed to refresh token");
	}
}
