"use client";

import {
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	Link,
} from "@mui/material";

import {
	Box,
	FormControl,
	FormLabel,
	TextField,
	Typography,
} from "@mui/material";
import { CustomCard } from "../styles/custom-card";
import { SignUpContainer } from "../styles/sign-in-container";

// Example form login.
export default function SignInForm() {
	return (
		<SignUpContainer direction="column" justifyContent="space-between">
			<CustomCard variant="outlined">
				<Typography
					component="h1"
					variant="h4"
					sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
				>
					Sign in
				</Typography>
				<Box
					component="form"
					sx={{ display: "flex", flexDirection: "column", gap: 2 }}
				>
					<FormControl>
						<FormLabel htmlFor="email">Email</FormLabel>
						<TextField
							required
							fullWidth
							id="email"
							placeholder="your@email.com"
							name="email"
							autoComplete="email"
							variant="outlined"
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="password">Password</FormLabel>
						<TextField
							required
							fullWidth
							name="password"
							placeholder="••••••"
							type="password"
							id="password"
							autoComplete="new-password"
							variant="outlined"
						/>
					</FormControl>
					<FormControlLabel
						control={<Checkbox value="allowExtraEmails" color="primary" />}
						label="I want to receive updates via email."
					/>
					<Button type="submit" fullWidth variant="contained">
						Sign up
					</Button>
				</Box>
				<Divider>
					<Typography sx={{ color: "text.secondary" }}>or</Typography>
				</Divider>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<Button fullWidth variant="outlined">
						Sign up with Google
					</Button>
					<Button fullWidth variant="outlined">
						Sign up with Facebook
					</Button>
					<Typography sx={{ textAlign: "center" }}>
						Already have an account?{" "}
						<Link
							href="/material-ui/getting-started/templates/sign-in/"
							variant="body2"
							sx={{ alignSelf: "center" }}
						>
							Sign in
						</Link>
					</Typography>
				</Box>
			</CustomCard>
		</SignUpContainer>
	);
}
