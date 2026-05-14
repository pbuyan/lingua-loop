import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DialogueGenerator from "@/components/dialogue/DialogueGenerator";
import UserStats from "@/components/user/UserStats";
import MorganStanley from "@/components/MorganStanley";

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
			<MorganStanley />
		</div>
	);
}
