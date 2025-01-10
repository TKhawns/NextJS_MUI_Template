import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { getNewAccessToken } from "./lib/actions/refresh_token";
import { getExpireTimeToken } from "./utils";

// // Option 1: This middleware navigate to sign-in page if token is expired.
// export default async function authMiddleware(request: NextRequest) {
// 	const cookieStore = await cookies();
// 	const accessToken = cookieStore.get("access_token");

// 	if (!accessToken) {
// 		console.log("The token is expired");
// 		return NextResponse.redirect(new URL("/sign-in", request.url));
// 	}

// 	// Else if access token is invalid ?
// 	// TODO

// 	return NextResponse.next();
// }

// Option 2: This middleware auto get new access_token if it is expired.
export default async function authMiddleware(request: NextRequest) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("access_token");
	const refreshToken = cookieStore.get("refresh_token");

	// If two tokens are expired at the same time, it will be removed from cookie and undefined. => must direct to sign-in page.
	if (!accessToken && !refreshToken) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	// It will be called 1 time though many APIs in this screen.
	if (!accessToken) {
		const newTokens = await getNewAccessToken();
		cookieStore.set("access_token", newTokens.accessToken, {
			httpOnly: true,
			expires: getExpireTimeToken(newTokens.accessToken),
		});
		// cookieStore.set("refresh_token", newTokens.refreshToken, {
		// 	httpOnly: true,
		// 	expires: getExpireTimeToken(newTokens.refreshToken),
		// });
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/home"],
};
