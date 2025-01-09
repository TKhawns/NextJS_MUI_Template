"use client";

import {
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	Link,
} from "@mui/material";

import { inputStyle } from "@/constants";
import { SignInSchema, SignInSchemaType } from "@/lib/validations/app-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	FormControl,
	FormLabel,
	TextField,
	Typography,
} from "@mui/material";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "../actions/sign-in";
import { CustomCard } from "./custom-card";
import { SignUpContainer } from "./sign-in-container";

export default function SignInForm() {
	// Example of react-hook-form validate sign-in fields.
	const {
		register,
		formState: { errors, isValid },
	} = useForm<SignInSchemaType>({
		resolver: zodResolver(SignInSchema),
		mode: "all",
	});

	const signInHandler = async (_previousState: string, formData: FormData) => {
		try {
			const data = {
				email: formData.get("email") as string,
				password: formData.get("password") as string,
			};
			const res = await signIn(data.email, data.password);
			console.log("test response:", res);

			return res;
		} catch (error) {
			console.log(error);
			return error as string;
		}
	};
	const [state, signInAction, isPendding] = useActionState(
		signInHandler,
		"null",
	);
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
					sx={{ display: "flex", flexDirection: "column", gap: 3 }}
					action={signInAction}
				>
					<FormControl>
						<FormLabel htmlFor="email">Email</FormLabel>
						<TextField
							required
							id="email"
							placeholder="your@email.com"
							{...register("email")}
							slotProps={{
								htmlInput: {
									style: inputStyle,
								},
							}}
							sx={{
								"& .MuiOutlinedInput-root": {
									height: "45px",
								},
								"& .MuiFormHelperText-root": {
									fontSize: "0.8rem", // Adjust font size
									color: "red", // Change the text color (or any color of your choice)
								},
								"&:-webkit-autofill": {
									WebkitBoxShadow: "none !important",
									WebkitTextFillColor: "inherit",
									caretColor: "inherit",
								},
							}}
							helperText={errors.email?.message}
						/>
					</FormControl>

					<FormControl>
						<FormLabel htmlFor="password">Password</FormLabel>
						<TextField
							required
							type="password"
							id="password"
							placeholder="........."
							{...register("password")}
							sx={{
								"& .MuiOutlinedInput-root": {
									height: "45px",
								},
								"& .MuiFormHelperText-root": {
									fontSize: "0.8rem", // Adjust font size
									color: "red", // Change the text color (or any color of your choice)
								},
							}}
							helperText={errors.password?.message}
						/>
					</FormControl>
					<FormControlLabel
						control={<Checkbox value="allowExtraEmails" color="primary" />}
						label="I want to receive updates via email."
					/>
					<Button
						type="submit"
						disabled={!isValid}
						fullWidth
						variant="contained"
					>
						{isPendding ? "Signing" : "Sign in"}
					</Button>
				</Box>
				<Divider>
					<Typography sx={{ color: "text.secondary" }}>or</Typography>
				</Divider>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<Button fullWidth variant="outlined">
						Sign up with Google
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
