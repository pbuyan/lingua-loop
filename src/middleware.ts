import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define routes that need authentication
const protectedRoutes = ["/dashboard", "/favorites", "/practice"];
// const protectedRoutes = [];

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	// Check if the request is for a protected route
	const isProtectedRoute = protectedRoutes.some((route) =>
		req.nextUrl.pathname.startsWith(route),
	);

	// If it's a protected route and user is not logged in, redirect to login
	if (isProtectedRoute && !session) {
		// Allow access to /practice/new with data parameter (for demo purposes)
		if (
			req.nextUrl.pathname.startsWith("/practice/") &&
			req.nextUrl.searchParams.has("data")
		) {
			return res;
		}

		const redirectUrl = new URL("/auth/sign-in", req.url);
		redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
		return NextResponse.redirect(redirectUrl);
	}

	return res;
}

// Specify paths for the middleware to run on
export const config = {
	matcher: ["/dashboard/:path*", "/favorites/:path*", "/practice/:path*"],
};
