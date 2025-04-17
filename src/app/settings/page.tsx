import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserProfile from "@/components/user/UserProfile";

export default async function SettingsPage() {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect("/auth/sign-in");
	}

	return (
		<div className="max-w-md mx-auto">
			<h1 className="text-3xl font-bold mb-8">Account Settings</h1>
			<UserProfile user={session.user} />

			<div className="mt-8 space-y-4">
				<h2 className="text-xl font-semibold">Danger Zone</h2>
				<form action="/auth/sign-out" method="post">
					<button
						type="submit"
						className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
					>
						Sign Out
					</button>
				</form>
			</div>
		</div>
	);
}
