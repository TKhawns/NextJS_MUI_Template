"use server";

import { getExpireTimeToken } from "@/utils";
import axios from "axios";
import { cookies } from "next/headers";
import { axiosClient } from "../../../configs/axios.config";

// Sign up action with example api.
export const signIn = async (email: string, password: string) => {
	try {
		const response = await axiosClient.post("/user/login", {
			email: email,
			password: password,
		});
		const cookieStore = await cookies();
		cookieStore.set("access_token", response.data.accessToken, {
			httpOnly: true,
			expires: getExpireTimeToken(response.data.accessToken),
		});
		cookieStore.set("refresh_token", response.data.refreshToken, {
			httpOnly: true,
			expires: getExpireTimeToken(response.data.refreshToken),
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log("Login failed from call api.");
		if (axios.isAxiosError(error)) {
			console.log(error.response?.data);
			return error.response?.data;
		}
		return { error };
	}
};
