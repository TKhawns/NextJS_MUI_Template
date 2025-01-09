import { CoffeeType } from "@/lib/types";
import { Typography } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Button } from "@mui/material";
import { StyledCard } from "./coffee-card";
import { StyledCardContent } from "./coffee-content";

function CoffeeItem({ coffee }: { coffee: CoffeeType }) {
	return (
		<StyledCard
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
			}}
		>
			<CardMedia
				component="img"
				height="300"
				image={coffee.image}
				alt={coffee.title}
				sx={{
					objectFit: "cover",
					filter: "brightness(70%)",
					transition: "transform 0.3s ease",
				}}
			/>
			<StyledCardContent>
				<Typography variant="h6" gutterBottom>
					{coffee.title}
				</Typography>
				<Typography variant="body2" gutterBottom>
					{coffee.description}
				</Typography>
				<Typography variant="body2">
					Ingredients: {coffee.ingredients.join(", ")}
				</Typography>
				<Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
					Order Now
				</Button>
			</StyledCardContent>
		</StyledCard>
	);
}

export default CoffeeItem;
