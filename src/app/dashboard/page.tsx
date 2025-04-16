import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DialogueGenerator from "@/components/dialogue/DialogueGenerator";
import UserStats from "@/components/user/UserStats";

export default async function Dashboard() {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: stats } = await supabase
		.from("user_stats")
		.select("*")
		.eq("user_id", session?.user.id)
		.single();

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Language Practice Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="md:col-span-2">
					<DialogueGenerator />
				</div>

				<div>
					{session ? (
						<UserStats stats={stats} />
					) : (
						<div className="bg-white p-6 rounded-lg shadow">
							<h2 className="text-lg font-semibold mb-2">
								Sign in to track progress
							</h2>
							<p className="text-gray-600 mb-4">
								Create an account to save your favorite dialogues and track your
								learning progress.
							</p>
							{/* <button
								onClick={() => redirect("/auth/sign-in")}
								className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
							>
								Sign In
							</button> */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
