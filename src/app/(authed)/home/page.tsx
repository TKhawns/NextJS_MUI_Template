import { getQueryClient } from "@/app/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import { getAllCoffeeList, getAllProductList } from "./actions/get-all-coffee";
import CoffeeList from "./coffee-list";

export default function Home() {
	const queryClient = getQueryClient();

	try {
		queryClient.prefetchQuery({
			queryKey: ["coffee"],
			queryFn: async () => {
				const coffeeData = await getAllCoffeeList();
				// console.log("Coffee response:", coffeeData); // Debug log
				return coffeeData;
			},
		});

		queryClient.prefetchQuery({
			queryKey: ["products"],
			queryFn: async () => {
				const productData = await getAllProductList();
				console.log("Product response:", productData); // Debug log
				return productData;
			},
		});
	} catch (e) {
		console.error("Something went wrong!");
	}
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CoffeeList />;
		</HydrationBoundary>
	);
}
