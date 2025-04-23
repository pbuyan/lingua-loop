"use client";

import { useState, useEffect } from "react";
import type { Dialogue, PracticeMode } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, HeartOff, Play, RefreshCw, Mic, MicOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import PracticeTimer from "./PracticeTimer";

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
	const [isListening, setIsListening] = useState(false);
	const [speechRecognition, setSpeechRecognition] = useState<any>(null);
	const [userSpeech, setUserSpeech] = useState<string>("");
	const [practiceComplete, setPracticeComplete] = useState(false);

	// For speech synthesis
	const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

	// Initialize speech recognition if available
	useEffect(() => {
		if (
			(typeof window !== "undefined" && "SpeechRecognition" in window) ||
			"webkitSpeechRecognition" in window
		) {
			const SpeechRecognition =
				window.SpeechRecognition || window.webkitSpeechRecognition;
			const recognition = new SpeechRecognition();

			// Map language to BCP 47 language tag for speech recognition
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

			recognition.lang = langMap[dialogue.prompt.language] || "en-US";
			recognition.continuous = false;
			recognition.interimResults = true;

			recognition.onresult = (event) => {
				const transcript = event.results[0][0].transcript;
				setUserSpeech(transcript);
			};

			recognition.onend = () => {
				setIsListening(false);
			};

			setSpeechRecognition(recognition);
		}
	}, [dialogue.prompt.language]);

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

	const toggleListening = () => {
		if (!speechRecognition) return;

		if (isListening) {
			speechRecognition.stop();
			setIsListening(false);
		} else {
			setUserSpeech("");
			speechRecognition.start();
			setIsListening(true);
		}
	};

	const completePractice = () => {
		setPracticeComplete(true);
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

				<div className="flex items-center space-x-4">
					<PracticeTimer language={dialogue.prompt.language} />

					<div className="flex space-x-2">
						{userId && (
							<Button
								variant="outline"
								size="icon"
								onClick={toggleFavorite}
								title={
									isFavorite ? "Remove from favorites" : "Add to favorites"
								}
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

					<div className="mt-6">
						<Button onClick={completePractice} className="w-full">
							Complete Practice
						</Button>
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

								{activeLineIndex === index && (
									<div className="mt-3 pt-3 border-t border-gray-200">
										<div className="flex justify-between items-center mb-2">
											<span className="text-sm font-medium">Your Turn</span>
											<Button
												variant="outline"
												size="sm"
												onClick={(e) => {
													e.stopPropagation();
													toggleListening();
												}}
												className={isListening ? "bg-red-50 text-red-600" : ""}
											>
												{isListening ? (
													<>
														<MicOff className="h-4 w-4 mr-1" />
														Stop
													</>
												) : (
													<>
														<Mic className="h-4 w-4 mr-1" />
														Record
													</>
												)}
											</Button>
										</div>

										{userSpeech && (
											<div className="text-sm p-2 bg-gray-100 rounded mt-2">
												<p className="italic">{userSpeech}</p>
											</div>
										)}
									</div>
								)}
							</div>
						))}
					</div>

					<div className="mt-6">
						<Button onClick={completePractice} className="w-full">
							Complete Practice
						</Button>
					</div>
				</TabsContent>
			</Tabs>

			{practiceComplete && (
				<div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
					<h3 className="text-lg font-semibold text-green-800">
						Practice Completed!
					</h3>
					<p className="text-green-700 mb-4">
						Great job with your language practice.
					</p>

					<div className="flex space-x-3">
						<Button
							variant="outline"
							onClick={() => setPracticeComplete(false)}
						>
							Practice Again
						</Button>
						<Button onClick={() => (window.location.href = "/dashboard")}>
							Back to Dashboard
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
