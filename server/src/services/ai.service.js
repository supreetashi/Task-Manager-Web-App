import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const suggestTaskDetails = async(roughTitle) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are helping a user organize their task manager app.
Given this rough task title, generate:
1. A clear, actionable description (1-2 sentences)
2. A suggested priority: LOW, MEDIUM, or HIGH

Rough title: "${roughTitle}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    properties: {
                        description: { type: "string" },
                        priority: {
                            type: "string",
                            enum: ["LOW", "MEDIUM", "HIGH"],
                        },
                    },
                    required: ["description", "priority"],
                },
            },
        });

        return JSON.parse(response.text);
    } catch (err) {
        if (err.status === 429) {
            const rateLimitError = new Error("AI service is busy, please try again in a moment");
            rateLimitError.status = 429;
            throw rateLimitError;
        }
        throw err;
    }
};