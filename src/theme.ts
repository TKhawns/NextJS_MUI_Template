"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		fontFamily: "var(--font-roboto)",
	},
	cssVariables: true, // To use CSS theme variables.
});

export default theme;
