export type Language =
	| "French"
	| "Spanish"
	| "German"
	| "Italian"
	| "Japanese"
	| "Mandarin"
	| "Portuguese"
	| "Russian";

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export type ToneType = "Casual" | "Formal" | "Business" | "Academic" | "Slang";

export interface DialoguePrompt {
	topic: string;
	language: Language;
	difficulty: DifficultyLevel;
	tone: ToneType;
	participants?: number; // Default: 2
}

export interface DialogueLine {
	speaker: string;
	text: string;
	translation: string;
}

export interface Dialogue {
	id?: string;
	userId?: string;
	prompt: DialoguePrompt;
	lines: DialogueLine[];
	createdAt?: string;
	isFavorite?: boolean;
}

export interface UserStats {
	dialoguesCompleted: number;
	languagesPracticed: Record<Language, number>;
	totalPracticeTime: number;
}

export type PracticeMode = "Roleplay" | "ListenRepeat";
