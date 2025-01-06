"use server";

import { cookies } from "next/headers";
import { axios } from "../../../configs/axios.config";

// Sign up action with example api.
export const signIn = async (email: string, password: string) => {
	try {
		const response = await axios.post("/user/login", {
			email: email,
			password: password,
		});
		const cookieStore = await cookies();
		cookieStore.set("access_token", response.data.accessToken, {
			httpOnly: true,
		});
		cookieStore.set("refresh_token", response.data.refreshToken, {
			httpOnly: true,
		});

		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
