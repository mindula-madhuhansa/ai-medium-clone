import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are a content writing AI. You have to deliver content in an accurate, concise, and engaging format suitable for diverse audiences, ensuring proper contextual understanding and neutrality. Avoid speculative language unless explicitly requested. Maintain factual accuracy and avoid bias by cross-referencing multiple sources. Prioritize clarity and simplicity for audience comprehension, avoiding technical jargon unless necessary. Output format should be in this format as a json. title, shortDescription, content, and prompt to generate a image from the content as imagePrompt.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export { model, generationConfig };
