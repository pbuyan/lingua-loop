"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DialoguePrompt, Language, DifficultyLevel, ToneType } from "@/types";
import { Loader2 } from "lucide-react";

export default function DialogueGenerator() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [prompt, setPrompt] = useState<DialoguePrompt>({
		topic: "",
		language: "French",
		difficulty: "Beginner",
		tone: "Casual",
	});

	const languages: Language[] = [
		"French",
		"Spanish",
		"German",
		"Italian",
		"Japanese",
		"Mandarin",
		"Portuguese",
		"Russian",
	];

	const difficulties: DifficultyLevel[] = [
		"Beginner",
		"Intermediate",
		"Advanced",
	];
	const tones: ToneType[] = [
		"Casual",
		"Formal",
		"Business",
		"Academic",
		"Slang",
	];

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setPrompt((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch("/api/dialogues", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(prompt),
			});

			if (!response.ok) {
				throw new Error("Failed to generate dialogue");
			}

			const dialogue = await response.json();
			router.push(
				`/practice/${dialogue.id || "new"}?data=${encodeURIComponent(JSON.stringify(dialogue))}`,
			);
		} catch (error) {
			console.error("Error generating dialogue:", error);
			alert("Failed to generate dialogue. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-6">Create a Practice Dialogue</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1">Topic</label>
					<Input
						name="topic"
						value={prompt.topic}
						onChange={handleChange}
						placeholder="e.g., Ordering food at a restaurant"
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">Language</label>
					<select
						name="language"
						value={prompt.language}
						onChange={handleChange}
						className="block w-full rounded-md border border-gray-300 py-2 px-3"
						required
					>
						{languages.map((lang) => (
							<option key={lang} value={lang}>
								{lang}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">
						Difficulty Level
					</label>
					<select
						name="difficulty"
						value={prompt.difficulty}
						onChange={handleChange}
						className="block w-full rounded-md border border-gray-300 py-2 px-3"
						required
					>
						{difficulties.map((level) => (
							<option key={level} value={level}>
								{level}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">Tone</label>
					<select
						name="tone"
						value={prompt.tone}
						onChange={handleChange}
						className="block w-full rounded-md border border-gray-300 py-2 px-3"
						required
					>
						{tones.map((tone) => (
							<option key={tone} value={tone}>
								{tone}
							</option>
						))}
					</select>
				</div>

				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Generating...
						</>
					) : (
						"Generate Dialogue"
					)}
				</Button>
			</form>
		</div>
	);
}
