import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import DialoguePractice from "@/components/practice/DialoguePractice";
import { Dialogue } from "@/types";

interface PageProps {
	params: { dialogueId: string };
	searchParams: { data?: string };
}

export default async function PracticePage({
	params,
	searchParams,
}: PageProps) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	let dialogue: Dialogue;

	// Case 1: New dialogue from generator (passed via URL)
	if (searchParams.data) {
		try {
			dialogue = JSON.parse(decodeURIComponent(searchParams.data));
		} catch (error) {
			return <div>Invalid dialogue data</div>;
		}
	}
	// Case 2: Existing dialogue from database
	else if (params.dialogueId !== "new") {
		const { data, error } = await supabase
			.from("dialogues")
			.select("*")
			.eq("id", params.dialogueId)
			.single();

		if (error || !data) {
			return <div>Dialogue not found</div>;
		}

		dialogue = {
			id: data.id,
			userId: data.user_id,
			prompt: data.prompt,
			lines: data.lines,
			createdAt: data.created_at,
			isFavorite: data.is_favorite,
		};
	} else {
		return <div>No dialogue found</div>;
	}

	// Update practice stats if user is logged in
	if (session) {
		await supabase.rpc("increment_dialogue_count", {
			user_id: session.user.id,
			language: dialogue.prompt.language,
		});
	}

	return (
		<div className="container mx-auto py-8">
			<DialoguePractice dialogue={dialogue} userId={session?.user.id} />
		</div>
	);
}
