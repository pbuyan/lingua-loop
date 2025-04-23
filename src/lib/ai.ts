import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Dialogue, DialoguePrompt, DialogueLine } from "@/types";

// === 1) Validate API key up front ===
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
	throw new Error("GEMINI_API_KEY environment variable is required");
}
const genAI = new GoogleGenerativeAI(apiKey);

// === 2) Helper to pull JSON out of the model’s response ===
function extractJson(text: string): { lines: DialogueLine[] } {
	// Try fenced JSON first…
	const fenceMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
	const rawMatch = fenceMatch?.[1] ?? text.match(/{[\s\S]*}/)?.[0];

	if (!rawMatch) {
		throw new Error("No JSON payload found in AI response");
	}
	return JSON.parse(rawMatch);
}

export async function generateDialogue(
	prompt: DialoguePrompt,
): Promise<Dialogue> {
	// === 3) Build a clean system prompt ===
	const systemPrompt = [
		"You are a language learning assistant that creates realistic dialogues.",
		`Generate a dialogue between two people in ${prompt.language} about "${prompt.topic}".`,
		`The dialogue should be at ${prompt.difficulty} level and use a ${prompt.tone} tone.`,
		"Format as JSON with the following structure:",
		"{",
		'  "lines": [',
		'    {"speaker": "A", "text": "[text in target language]", "translation": "[English translation]"},',
		'    {"speaker": "B", "text": "[text in target language]", "translation": "[English translation]"}',
		"  ]",
		"}",
		"Create 5–10 lines of dialogue that sound natural and realistic.",
	].join("\n");

	try {
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
		const result = await model.generateContent(systemPrompt);

		// === 4) Await the full text response ===
		const raw = result.response.text();
		const parsed = extractJson(raw);

		// === 5) Return with full type safety ===
		return {
			prompt,
			lines: parsed.lines,
		};
	} catch (err: unknown) {
		console.error("🛑 Error in generateDialogue:", err);
		const msg = err instanceof Error ? err.message : String(err);
		throw new Error(`Failed to generate dialogue: ${msg}`);
	}
}
