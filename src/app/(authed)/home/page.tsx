import { getQueryClient } from "@/app/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import { getAllCoffeeList } from "./actions/get-all-coffee";
import CoffeeList from "./coffee-list";

export default function Home() {
	const queryClient = getQueryClient();

	// Example: prefetchQuery to get data from API.
	try {
		queryClient.prefetchQuery({
			queryKey: ["coffee"],
			queryFn: async () => {
				const coffeeData = await getAllCoffeeList();
				return coffeeData;
			},
		});
	} catch (e) {
		console.error("Something went wrong from prefetch data!");
	}
	return (
		// Have to wrap children component by HydrationBoundary to apply prefetch.
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CoffeeList />;
		</HydrationBoundary>
	);
}
