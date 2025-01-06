import { dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import { getQueryClient } from "../get-query-client";
import { getAllCoffeeList } from "./actions/get-all-coffee";
import CoffeeList from "./coffee-list";

export default function Home() {
	const queryClient = getQueryClient();

	try {
		queryClient.prefetchQuery({
			queryKey: ["coffee"],
			queryFn: async () => {
				const coffeeData = await getAllCoffeeList();
				console.log("Coffee response:", coffeeData); // Debug log
				return coffeeData;
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
