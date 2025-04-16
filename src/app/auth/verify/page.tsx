import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyEmail({
	searchParams,
}: {
	searchParams: { message: string };
}) {
	const message =
		searchParams?.message || "Check your email to verify your account";

	return (
		<div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow text-center">
			<h1 className="text-2xl font-bold mb-6">Verify Your Email</h1>

			<div className="mb-6">
				<div className="bg-blue-50 text-blue-700 p-4 rounded-md">{message}</div>
			</div>

			<Link href="/auth/sign-in">
				<Button>Back to Sign In</Button>
			</Link>
		</div>
	);
}
