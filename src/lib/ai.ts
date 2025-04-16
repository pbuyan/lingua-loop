import { GoogleGenerativeAI } from "@google/generative-ai";
import { Dialogue, DialoguePrompt } from "@/types";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateDialogue(
	prompt: DialoguePrompt,
): Promise<Dialogue> {
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	const systemPrompt = `
    You are a language learning assistant that creates realistic dialogues.
    Generate a dialogue between two people in ${prompt.language} about "${prompt.topic}".
    The dialogue should be at ${prompt.difficulty} level and use a ${prompt.tone} tone.
    Format as JSON with the following structure:
    { 
      "lines": [
        {"speaker": "A", "text": "[${prompt.language} text]", "translation": "[English translation]"},
        {"speaker": "B", "text": "[${prompt.language} text]", "translation": "[English translation]"}
      ]
    }
    Create 5-10 lines of dialogue that sound natural and realistic.
  `;

	try {
		const result = await model.generateContent(systemPrompt);
		const textResult = result.response.text();

		// Parse the JSON from the text response
		// We need to extract the JSON part from the text which might contain markdown formatting
		const jsonMatch =
			textResult.match(/```json\s*([\s\S]*?)\s*```/) ||
			textResult.match(/{[\s\S]*}/);

		let parsedData;
		if (jsonMatch && jsonMatch[1]) {
			parsedData = JSON.parse(jsonMatch[1]);
		} else if (jsonMatch) {
			parsedData = JSON.parse(jsonMatch[0]);
		} else {
			throw new Error("Failed to parse AI response as JSON");
		}

		return {
			prompt,
			lines: parsedData.lines,
		};
	} catch (error) {
		console.error("Error generating dialogue:", error);
		throw new Error("Failed to generate dialogue");
	}
}
