"use client";

import { useState, useRef, useEffect } from "react";
import { Dialogue, DialogueLine, PracticeMode } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, HeartOff, Play, Save, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DialoguePracticeProps {
	dialogue: Dialogue;
	userId?: string;
}

export default function DialoguePractice({
	dialogue,
	userId,
}: DialoguePracticeProps) {
	const [mode, setMode] = useState<PracticeMode>("Roleplay");
	const [currentSpeaker, setCurrentSpeaker] = useState<string>("A");
	const [isFavorite, setIsFavorite] = useState(dialogue.isFavorite || false);
	const [showTranslation, setShowTranslation] = useState<
		Record<number, boolean>
	>({});
	const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);

	// For speech synthesis
	const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

	const toggleTranslation = (index: number) => {
		setShowTranslation((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	const toggleFavorite = async () => {
		if (!userId || !dialogue.id) {
			alert("Please sign in to save favorites");
			return;
		}

		try {
			const { error } = await supabase
				.from("dialogues")
				.update({ is_favorite: !isFavorite })
				.eq("id", dialogue.id);

			if (error) throw error;
			setIsFavorite(!isFavorite);
		} catch (error) {
			console.error("Error toggling favorite:", error);
			alert("Failed to update favorite status");
		}
	};

	const speakText = (text: string, language: string) => {
		if (!synth) return;

		// Map language to BCP 47 language tag
		const langMap: Record<string, string> = {
			French: "fr-FR",
			Spanish: "es-ES",
			German: "de-DE",
			Italian: "it-IT",
			Japanese: "ja-JP",
			Mandarin: "zh-CN",
			Portuguese: "pt-PT",
			Russian: "ru-RU",
		};

		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = langMap[language] || "en-US";
		synth.speak(utterance);
	};

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h2 className="text-2xl font-bold">{dialogue.prompt.topic}</h2>
					<p className="text-gray-600">
						{dialogue.prompt.language} · {dialogue.prompt.difficulty} ·{" "}
						{dialogue.prompt.tone}
					</p>
				</div>

				<div className="flex space-x-2">
					{userId && (
						<Button
							variant="outline"
							size="icon"
							onClick={toggleFavorite}
							title={isFavorite ? "Remove from favorites" : "Add to favorites"}
						>
							{isFavorite ? (
								<Heart className="h-4 w-4 fill-red-500 stroke-red-500" />
							) : (
								<HeartOff className="h-4 w-4" />
							)}
						</Button>
					)}

					<Button
						variant="outline"
						size="icon"
						onClick={() => (window.location.href = "/dashboard")}
						title="Create new dialogue"
					>
						<RefreshCw className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<Tabs defaultValue="roleplay" className="mb-6">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="roleplay" onClick={() => setMode("Roleplay")}>
						Roleplay
					</TabsTrigger>
					<TabsTrigger value="listen" onClick={() => setMode("ListenRepeat")}>
						Listen & Repeat
					</TabsTrigger>
				</TabsList>

				<TabsContent value="roleplay" className="mt-4">
					<div className="mb-4">
						<div className="flex space-x-2">
							<Button
								variant={currentSpeaker === "A" ? "default" : "outline"}
								onClick={() => setCurrentSpeaker("A")}
							>
								Speaker A
							</Button>
							<Button
								variant={currentSpeaker === "B" ? "default" : "outline"}
								onClick={() => setCurrentSpeaker("B")}
							>
								Speaker B
							</Button>
						</div>
						<p className="text-sm text-gray-600 mt-2">
							You'll play the role of Speaker {currentSpeaker}
						</p>
					</div>

					<div className="space-y-4 mt-6">
						{dialogue.lines.map((line, index) => (
							<div
								key={index}
								className={`p-3 rounded-lg ${
									line.speaker === currentSpeaker
										? "bg-blue-50 border border-blue-200"
										: "bg-gray-50"
								}`}
							>
								<div className="flex justify-between items-start mb-1">
									<span className="font-bold">Speaker {line.speaker}</span>

									<div className="flex space-x-2">
										<button
											onClick={() => toggleTranslation(index)}
											className="text-xs text-blue-600 hover:underline"
										>
											{showTranslation[index] ? "Hide" : "Show"} Translation
										</button>

										<button
											onClick={() =>
												speakText(line.text, dialogue.prompt.language)
											}
											className="text-gray-500 hover:text-gray-700"
											title="Listen"
										>
											<Play className="h-4 w-4" />
										</button>
									</div>
								</div>

								<p>{line.text}</p>

								{showTranslation[index] && (
									<p className="mt-1 text-gray-600 text-sm italic">
										{line.translation}
									</p>
								)}
							</div>
						))}
					</div>
				</TabsContent>

				<TabsContent value="listen" className="mt-4">
					<p className="text-sm text-gray-600 mb-4">
						Listen to each line and practice your pronunciation by repeating it.
					</p>

					<div className="space-y-4">
						{dialogue.lines.map((line, index) => (
							<div
								key={index}
								className={`p-3 rounded-lg ${
									activeLineIndex === index
										? "bg-green-50 border border-green-200"
										: "bg-gray-50"
								}`}
								onClick={() => setActiveLineIndex(index)}
							>
								<div className="flex justify-between items-start mb-1">
									<span className="font-bold">Speaker {line.speaker}</span>

									<div className="flex space-x-2">
										<button
											onClick={() => toggleTranslation(index)}
											className="text-xs text-blue-600 hover:underline"
										>
											{showTranslation[index] ? "Hide" : "Show"} Translation
										</button>

										<button
											onClick={() =>
												speakText(line.text, dialogue.prompt.language)
											}
											className="text-gray-500 hover:text-gray-700"
											title="Listen"
										>
											<Play className="h-4 w-4" />
										</button>
									</div>
								</div>

								<p>{line.text}</p>

								{showTranslation[index] && (
									<p className="mt-1 text-gray-600 text-sm italic">
										{line.translation}
									</p>
								)}
							</div>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
