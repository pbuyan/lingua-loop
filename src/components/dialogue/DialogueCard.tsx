import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialogue } from "@/types";

interface DialogueCardProps {
	dialogue: any; // Using any here since the DB format might differ slightly from our type
}

export default function DialogueCard({ dialogue }: DialogueCardProps) {
	// Convert DB format to our type format
	const formattedDialogue: Dialogue = {
		id: dialogue.id,
		userId: dialogue.user_id,
		prompt: dialogue.prompt,
		lines: dialogue.lines,
		createdAt: dialogue.created_at,
		isFavorite: dialogue.is_favorite,
	};

	// Format the date
	const timeAgo = dialogue.created_at
		? formatDistanceToNow(new Date(dialogue.created_at), { addSuffix: true })
		: "";

	return (
		<div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
			<div className="flex justify-between items-start mb-4">
				<div>
					<h3 className="text-lg font-semibold">{dialogue.prompt.topic}</h3>
					<p className="text-sm text-gray-600">
						{dialogue.prompt.language} · {dialogue.prompt.difficulty} ·{" "}
						{dialogue.prompt.tone}
					</p>
					<p className="text-xs text-gray-500 mt-1">Created {timeAgo}</p>
				</div>
				<div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
					{dialogue.lines.length} lines
				</div>
			</div>

			<div className="mb-6">
				<p className="text-sm text-gray-700 line-clamp-2">
					{dialogue.lines[0]?.text}
					{dialogue.lines[0]?.translation && (
						<span className="text-gray-500 italic ml-2">
							({dialogue.lines[0].translation})
						</span>
					)}
				</p>
			</div>

			<Link href={`/practice/${dialogue.id}`}>
				<Button variant="outline" className="w-full">
					Practice This Dialogue
				</Button>
			</Link>
		</div>
	);
}
