"use server";

import { axiosClient } from "@/configs/axios.config";
import { cookies } from "next/headers";

// Get new access token by refresh token.
export async function getNewAccessToken() {
	const cookieStore = await cookies();
	const refreshToken = cookieStore.get("refresh_token")?.value.toString();

	if (!refreshToken) {
		throw new Error("Missing refresh token");
	}

	try {
		const response = await axiosClient.post("/auth/refresh", { refreshToken });

		// This must be included: new accessToken and new refreshToken.
		console.log("Test new tokens", response.data);
		return response.data;
	} catch (error) {
		console.error("Error refreshing token:", error);
		throw new Error("Failed to refresh token");
	}
}
