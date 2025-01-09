"use client";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { getAllCoffeeList, getAllProductList } from "./actions/get-all-coffee";
import CoffeeItem from "./components/coffee-item";
import Loading from "./loading";

function CoffeeList() {
	const { data: coffeeData, isLoading: coffeeLoading } = useSuspenseQuery({
		queryKey: ["coffee"],
		queryFn: () => getAllCoffeeList(),
	});
	const { data: productData, isLoading: productLoading } = useSuspenseQuery({
		queryKey: ["products"],
		queryFn: () => getAllProductList(),
	});

	if (coffeeData === undefined) return <Loading />;

	useEffect(() => {
		console.log(productData);
	}, []);

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
				{coffeeData.map((coffee) => (
					<Box
						key={coffee.id}
						sx={{
							flex: "1 0 100%",
							sm: "1 0 48%",
							md: "1 0 30%",
						}}
					>
						<Suspense fallback={<Loading />}>
							<CoffeeItem coffee={coffee} />
						</Suspense>
					</Box>
				))}
			</Grid>
		</Box>
	);
}

export default CoffeeList;
