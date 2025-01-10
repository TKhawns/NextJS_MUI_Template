"use server";

import { axiosClient } from "@/configs/axios.config";
import { CoffeeType } from "@/lib/types";
import { delay } from "@/utils";

// Example API.
export const getAllCoffeeList = async () => {
	try {
		await delay(2000); // Delay for 3 seconds to test the skeleton suspense.
		const response = await axiosClient.get(
			"https://api.sampleapis.com/coffee/hot",
		);
		return response.data as CoffeeType[];
	} catch (error) {
		console.log(error);
	}
};

// Example: get from localhost auth.
// export const getAllProductList = async () => {
// 	try {
// 		const response = await axios.get("/user/product-list");

// 		const res = await response.data;
// 		console.log("Test products from network api: ", res);
// 		return res;
// 	} catch (error) {
// 		console.log(error);
// 		return null;
// 	}
// };
