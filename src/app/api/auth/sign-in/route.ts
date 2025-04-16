import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const formData = await request.formData();
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const supabase = createRouteHandlerClient({ cookies });

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return NextResponse.redirect(
			new URL(`/auth/sign-in?error=${error.message}`, request.url),
		);
	}

	return NextResponse.redirect(new URL("/dashboard", request.url));
}
