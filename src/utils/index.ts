import { jwtDecode } from "jwt-decode";

// To validate number, currency, string,...

// Get expire time at miliseconds of token using in expireTime in cookie next/headers.
export function getExpireTimeToken(token: string) {
	const exp = jwtDecode(token).exp || 0;
	return new Date(exp * 1000);
}

// Function delay to testing in development.
export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));
