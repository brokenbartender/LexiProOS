import { GoogleGenerativeAI } from "@google/generative-ai";
import { EvidenceItem, AnalysisResult } from "../types";
import { getGeminiApiKey } from "./apiKey";

function getClient(): GoogleGenerativeAI {
  const key = getGeminiApiKey();
  if (!key) {
    throw new Error("Missing API Key. Please set it in the dashboard.");
  }
  return new GoogleGenerativeAI(key);
}

function safeJsonParse(text: string): any {
  const trimmed = text.trim();
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = (fenceMatch?.[1] ?? trimmed).trim();
  try {
    return JSON.parse(candidate);
  } catch {
    const firstObj = candidate.indexOf('{');
    const lastObj = candidate.lastIndexOf('}');
    if (firstObj !== -1 && lastObj !== -1) {
      return JSON.parse(candidate.slice(firstObj, lastObj + 1));
    }
    throw new Error("Failed to parse AI response.");
  }
}

export const analyzeEvidence = async (evidence: EvidenceItem): Promise<AnalysisResult> => {
  try {
    const genAI = getClient();
    // Using the stable 2026 preview identifier for Gemini 3
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `Analyze this medical-legal evidence: ${evidence.content}. 
    Return JSON with fields: summary, liability, reasoning, statutes.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return safeJsonParse(response.text());

  } catch (error) {
    console.error("AI Error:", error);
    // CRITICAL FIX: Returning a valid object instead of throwing prevents the blank screen crash
    return {
      summary: "Forensic analysis failed to initialize.",
      liability: "Service Error",
      reasoning: "The system encountered a model mismatch or API limit. Please check your console.",
      statutes: ["Error 404/429"]
    };
  }
};
