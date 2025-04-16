import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialogue } from "@/types";

export default async function FavoritesPage() {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return (
			<div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow text-center">
				<h1 className="text-2xl font-bold mb-4">Sign in to view favorites</h1>
				<p className="text-gray-600 mb-6">
					You need to sign in to view and manage your favorite dialogues.
				</p>
				<Link href="/auth/sign-in">
					<Button>Sign In</Button>
				</Link>
			</div>
		);
	}

	const { data: favoriteDialogues, error } = await supabase
		.from("dialogues")
		.select("*")
		.eq("user_id", session.user.id)
		.eq("is_favorite", true)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching favorites:", error);
		return <div>Error loading favorite dialogues</div>;
	}

	return (
		<div className="max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-8">Your Favorite Dialogues</h1>

			{favoriteDialogues && favoriteDialogues.length > 0 ? (
				<div className="grid gap-4">
					{favoriteDialogues.map((dialogue) => (
						<DialogueCard key={dialogue.id} dialogue={dialogue} />
					))}
				</div>
			) : (
				<div className="bg-white p-6 rounded-lg shadow text-center">
					<h2 className="text-xl font-semibold">Fix</h2>
				</div>
			)}
		</div>
	);
}
