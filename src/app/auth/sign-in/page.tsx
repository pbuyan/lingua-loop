import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function SignIn() {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		redirect("/dashboard");
	}

	return (
		<div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
			<h1 className="text-2xl font-bold mb-6">Sign In</h1>

			<form action="/auth/sign-in" method="post" className="space-y-4">
				<div>
					<label htmlFor="email" className="block text-sm font-medium mb-1">
						Email
					</label>
					<Input
						id="email"
						name="email"
						type="email"
						required
						placeholder="your.email@example.com"
					/>
				</div>

				<div>
					<label htmlFor="password" className="block text-sm font-medium mb-1">
						Password
					</label>
					<Input
						id="password"
						name="password"
						type="password"
						required
						placeholder="••••••••"
					/>
				</div>

				<Button type="submit" className="w-full">
					Sign In
				</Button>
			</form>

			<div className="mt-6 text-center">
				<p className="text-sm text-gray-600">
					Don&apos;t have an account?{" "}
					<Link href="/auth/sign-up" className="text-blue-600 hover:underline">
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}
