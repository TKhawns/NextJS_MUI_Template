import { z } from "zod";

export const SignInSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6, { message: "Password must be 6 or more characters long." }),
});

export const SingupSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6),
		confirmPassword: z.string().min(6),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
