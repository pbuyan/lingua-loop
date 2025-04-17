import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
	const supabase = createRouteHandlerClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { data, error } = await supabase
			.from("user_stats")
			.select("*")
			.eq("user_id", session.user.id)
			.single();

		if (error) throw error;

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching user stats:", error);
		return NextResponse.json(
			{ error: "Failed to fetch statistics" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	const supabase = createRouteHandlerClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { practiceTime, language } = await request.json();

		// First get current stats
		const { data: currentStats, error: fetchError } = await supabase
			.from("user_stats")
			.select("*")
			.eq("user_id", session.user.id)
			.single();

		if (fetchError && fetchError.code !== "PGRST116") {
			throw fetchError;
		}

		// If no stats yet, create new entry
		if (!currentStats) {
			const languages = {};
			if (language) {
				languages[language] = 1;
			}

			const { error } = await supabase.from("user_stats").insert({
				user_id: session.user.id,
				total_practice_time: practiceTime || 0,
				languages_practiced: languages,
			});

			if (error) throw error;
		}
		// Otherwise update existing stats
		else {
			const updatedTime =
				(currentStats.total_practice_time || 0) + (practiceTime || 0);

			let languageStats = currentStats.languages_practiced || {};
			if (language) {
				languageStats = {
					...languageStats,
					[language]: (languageStats[language] || 0) + 1,
				};
			}

			const { error } = await supabase
				.from("user_stats")
				.update({
					total_practice_time: updatedTime,
					languages_practiced: languageStats,
					updated_at: new Date().toISOString(),
				})
				.eq("user_id", session.user.id);

			if (error) throw error;
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error updating user stats:", error);
		return NextResponse.json(
			{ error: "Failed to update statistics" },
			{ status: 500 },
		);
	}
}
