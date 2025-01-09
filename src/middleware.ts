import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export default async function authMiddleware(request: NextRequest) {
	// const cookieStore = await cookies();
	// const accessToken = cookieStore.get("access_token")?.value.toString() || "";

	// if (accessToken === "") return;

	// const exp = jwtDecode(accessToken).exp || 0;
	// Check if token is expired.
	// if (Date.now() >= exp * 1000) {
	// 	console.log("expired token.");
	// 	return NextResponse.redirect(new URL("/sign-in", request.url));
	// }

	return NextResponse.next();
}

export const config = {
	matcher: ["/home"],
};
