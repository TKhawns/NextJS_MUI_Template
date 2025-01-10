"use client";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { getAllCoffeeList } from "./actions/get-all-coffee";
import CoffeeItem from "./components/coffee-item";
import Loading from "./loading";

function CoffeeList() {
	// Example: Use hook `useSuspenseQuery` to query data from API, result will be passed to { data, isLoading } props.
	// This `queryKey` have to be same with `queryKey` in prefetchQuery.
	const { data: coffeeData, isLoading: coffeeLoading } = useSuspenseQuery({
		queryKey: ["coffee"],
		queryFn: () => getAllCoffeeList(),
	});

	return (
		<Box
			sx={{
				padding: 4,
				background: "#f5f5f5",
				minHeight: "100vh",
				width: "100%",
			}}
		>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Suspense fallback={<Loading />}>
					{coffeeData?.map((coffee) => (
						<Box
							key={coffee.id}
							sx={{
								flex: "1 0 100%",
								sm: "1 0 48%",
								md: "1 0 30%",
							}}
						>
							<CoffeeItem coffee={coffee} />
						</Box>
					))}
				</Suspense>
			</Grid>
		</Box>
	);
}

export default CoffeeList;
