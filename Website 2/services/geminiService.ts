import { GoogleGenerativeAI } from "@google/generative-ai";
import { EvidenceItem, AnalysisResult } from "../types";
import { getGeminiApiKey } from "./apiKey";

// Sets a hard limit so the UI doesn't spin forever if the AI hangs
const AI_TIMEOUT_MS = 15000; 

function getClient(): GoogleGenerativeAI {
  const key = getGeminiApiKey();
  if (!key) throw new Error("Missing API Key. Please click 'Set API Key'.");
  return new GoogleGenerativeAI(key);
}

// Robust JSON cleaner to handle 2026-specific AI formatting quirks
function safeJsonParse(text: string): any {
  try {
    const clean = text.replace(/```json|```/gi, "").trim();
    return JSON.parse(clean);
  } catch (e) {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Invalid AI format");
  }
}

export const analyzeEvidence = async (evidence: EvidenceItem): Promise<AnalysisResult> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const genAI = getClient();
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
      Perform a medical-legal forensic analysis on this evidence: "${evidence.content}"
      Return a JSON object: { "summary": "...", "liability": "...", "reasoning": "...", "statutes": [] }
      Ensure the risk level (liability) is listed as "High", "Medium", or "Low".
    `;

    // Step 1: Generate with a hard timeout signal
    const result = await model.generateContent(prompt);
    const response = await result.response;
    clearTimeout(timeoutId);

    return safeJsonParse(response.text());

  } catch (error: any) {
    console.error("Analysis Failed:", error);
    // If it's a timeout or error, we show this instead of a loading spinner
    return {
      summary: "The forensic engine is temporarily unresponsive.",
      liability: "Service Timeout",
      reasoning: "The 2026 API threshold was reached. Try clicking analyze again.",
      statutes: ["Connection Error"]
    };
  }
};
