import { UserStats as UserStatsType } from "@/types";

interface UserStatsProps {
	stats: UserStatsType | null;
}

export default function UserStats({ stats }: UserStatsProps) {
	if (!stats) {
		return (
			<div className="bg-white p-6 rounded-lg shadow">
				<h2 className="text-xl font-semibold mb-4">Your Stats</h2>
				<p className="text-gray-600">Start practicing to see your stats!</p>
			</div>
		);
	}

	const languageEntries = stats.languagesPracticed
		? Object.entries(stats.languagesPracticed).sort((a, b) => b[1] - a[1])
		: [];

	return (
		<div className="bg-white p-6 rounded-lg shadow">
			<h2 className="text-xl font-semibold mb-4">Your Stats</h2>

			<div className="space-y-4">
				<div>
					<p className="text-gray-600 text-sm">Total Dialogues</p>
					<p className="text-2xl font-bold">{stats.dialoguesCompleted}</p>
				</div>

				<div>
					<p className="text-gray-600 text-sm mb-2">Languages</p>
					{languageEntries.length > 0 ? (
						<div className="space-y-2">
							{languageEntries.map(([language, count]) => (
								<div
									key={language}
									className="flex justify-between items-center"
								>
									<span>{language}</span>
									<span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
										{count} {count === 1 ? "dialogue" : "dialogues"}
									</span>
								</div>
							))}
						</div>
					) : (
						<p className="text-gray-500">No languages practiced yet</p>
					)}
				</div>
			</div>
		</div>
	);
}
