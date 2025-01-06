"use client";

import { CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
	background: "rgba(0, 0, 0, 0.5)",
	color: "white",
	padding: "20px",
	position: "absolute",
	bottom: "0",
	width: "100%",
	textAlign: "center",
	borderRadius: "0 0 15px 15px",
}));
