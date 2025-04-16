import { NextResponse } from "next/server";
import { generateDialogue } from "@/lib/ai";
import { supabase } from "@/lib/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { DialoguePrompt } from "@/types";

export async function POST(request: Request) {
	try {
		const prompt: DialoguePrompt = await request.json();

		// Validate prompt data
		if (
			!prompt.topic ||
			!prompt.language ||
			!prompt.difficulty ||
			!prompt.tone
		) {
			return NextResponse.json(
				{ error: "Missing required dialogue parameters" },
				{ status: 400 },
			);
		}

		// Generate dialogue using AI
		const dialogue = await generateDialogue(prompt);

		// Store in database if user is authenticated
		const supabase = createRouteHandlerClient({ cookies });
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (session) {
			const { data, error } = await supabase
				.from("dialogues")
				.insert({
					user_id: session.user.id,
					prompt: prompt,
					lines: dialogue.lines,
					is_favorite: false,
				})
				.select("id")
				.single();

			if (error) {
				console.error("Error storing dialogue:", error);
			} else if (data) {
				dialogue.id = data.id;
				dialogue.userId = session.user.id;
			}
		}

		return NextResponse.json(dialogue);
	} catch (error) {
		console.error("Error in dialogue generation:", error);
		return NextResponse.json(
			{ error: "Failed to generate dialogue" },
			{ status: 500 },
		);
	}
}
