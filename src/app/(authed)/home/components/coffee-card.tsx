"use client";

import { styled } from "@mui/material/styles";

import { Card } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
	position: "relative",
	borderRadius: "15px",
	overflow: "hidden",
	boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
	"&:hover": {
		transform: "translateY(-5px)",
		boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
		transition: "all 0.3s ease",
	},
}));
