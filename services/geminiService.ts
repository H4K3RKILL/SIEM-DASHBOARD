
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MOCK_GEMINI_UNAVAILABLE_MSG } from '../constants';

// IMPORTANT: The API key is obtained from the environment variable `process.env.API_KEY`.
// This variable is assumed to be pre-configured and accessible in the execution environment.
const API_KEY_ENV = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY_ENV) {
  ai = new GoogleGenAI({ apiKey: API_KEY_ENV });
} else {
  console.warn("Gemini API key (API_KEY) is not set in environment variables. AI features will be disabled or mocked.");
}

const GEMINI_MODEL = 'gemini-2.5-flash-preview-04-17';

export const getAnalysisForAlert = async (alertTitle: string, alertDescription: string): Promise<string> => {
  if (!ai) {
    // If you want to provide a more detailed mock response for UI testing when API key is not available:
    // return Promise.resolve(`Mock AI Analysis for: ${alertTitle}\nDescription: ${alertDescription}\n\n- This is a simulated response.\n- Step 1: Verify the alert.\n- Step 2: Check related logs.\n- Step 3: Escalate if necessary.`);
    return Promise.resolve(MOCK_GEMINI_UNAVAILABLE_MSG);
  }

  const prompt = `
    You are a helpful security analyst assistant. Provide a concise analysis for the following security alert.
    Focus on:
    1. A brief explanation of what this alert type generally means.
    2. Potential impact or risks.
    3. Recommended initial investigation steps for a SOC analyst (2-3 actionable bullet points).
    Keep the response clear, professional, and brief (around 100-150 words).

    Alert Title: "${alertTitle}"
    Alert Description: "${alertDescription}"

    Analysis:
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      // No thinkingConfig for this model or if not needed for this task
      // config: { thinkingConfig: { thinkingBudget: 0 } } // only for gemini-2.5-flash-preview-04-17 if low latency is critical and quality trade-off acceptable
    });
    
    // Directly access the text property as per guidance
    const text = response.text;
    if (!text) {
        throw new Error("No text content received from Gemini API.");
    }
    return text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
             return `Error: The Gemini API key is not valid. Please check your configuration. (Details: ${error.message})`;
        }
         return `Error generating AI analysis: ${error.message}. Please try again later or check the console for more details.`;
    }
    return "An unknown error occurred while fetching AI analysis.";
  }
};

// Example of how to parse JSON if responseMimeType: "application/json" was used (NOT for this function)
// const parseJsonResponse = (responseText: string): any => {
//   let jsonStr = responseText.trim();
//   const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
//   const match = jsonStr.match(fenceRegex);
//   if (match && match[2]) {
//     jsonStr = match[2].trim();
//   }
//   try {
//     return JSON.parse(jsonStr);
//   } catch (e) {
//     console.error("Failed to parse JSON response from Gemini:", e);
//     throw new Error("Received malformed JSON response from AI.");
//   }
// };
