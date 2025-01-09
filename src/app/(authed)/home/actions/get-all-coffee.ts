"use server";

import { axios } from "@/configs/axios.config";
import { CoffeeType } from "@/lib/types";

// Example API.
export const getAllCoffeeList = async () => {
	const delay = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	try {
		await delay(3000); // Delay for 3 seconds
		const response = await fetch("https://api.sampleapis.com/coffee/hot", {
			method: "GET",
		});

		const res = await response.json();
		// console.log("Test response from network api: ", res);
		return res as CoffeeType[];
	} catch (error) {
		console.log(error);
	}
};

export const getAllProductList = async () => {
	try {
		const response = await axios.get("/user/product-list");

		const res = await response.data;
		console.log("Test products from network api: ", res);
		return res;
	} catch (error) {
		console.log(error);
		return null;
	}
};
