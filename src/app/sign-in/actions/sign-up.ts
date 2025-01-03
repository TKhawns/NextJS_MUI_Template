import { cookies } from "next/headers";
import { axios } from "../../../configs/axios.config";

// Sign up action with example api.
export const SignUp = async ({
	email,
	password,
}: { email: string; password: string }) => {
	try {
		const response = await axios.post("/auth/login", {
			email: email,
			password: password,
		});
		const cookieStore = await cookies();
		cookieStore.set("access_token", response.data.access_token);
		cookieStore.set("refresh_token", response.data.refresh_token);
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
	}
};
