import { GoogleGenerativeAI } from "@google/generative-ai";
import { EvidenceItem, AnalysisResult } from "../types";
import { getGeminiApiKey } from "./apiKey";

const AI_TIMEOUT_MS = 15000;

function getClient(): GoogleGenerativeAI {
  const key = getGeminiApiKey();
  if (!key) throw new Error("Missing API Key. Please click 'Set API Key'.");
  return new GoogleGenerativeAI(key);
}

/**
 * TYPO-PROOF PARSER:
 * This function handles the "Correction Layer" by searching for 
 * known typos and fixing them before the JSON is returned to the UI.
 */
function typoProofParse(text: string): AnalysisResult {
  // 1. Initial cleaning of markdown artifacts
  let cleanText = text.replace(/```json|```/gi, "").trim();

  // 2. REGEX LAYER: Force-correct known persistent typos
  cleanText = cleanText
    .replace(/\bIternal\b/g, "Internal")    // Fixes 'Iternal'
    .replace(/\bHgh\b/gi, "High")           // Fixes 'Hgh' (case insensitive)
    .replace(/\bTe statement\b/g, "The statement")
    .replace(/\bTis statement\b/g, "This statement")
    .replace(/\bTe evidence\b/g, "The evidence");

  try {
    return JSON.parse(cleanText);
  } catch (e) {
    // Fallback if the string is still slightly malformed
    const match = cleanText.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Critical parsing failure");
  }
}

export const analyzeEvidence = async (evidence: EvidenceItem): Promise<AnalysisResult> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const genAI = getClient();
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
      You are LexiPro, a senior forensic legal AI. 
      Analyze this evidence for a medical malpractice dossier: "${evidence.content}"
      
      CRITICAL INSTRUCTIONS:
      - Use perfect professional English.
      - NEVER use "Iternal" (use "Internal").
      - NEVER use "Hgh" (use "High").
      - NEVER use "Te" or "Tis" (use "The" or "This").
      
      OUTPUT JSON: { "summary": "...", "liability": "...", "reasoning": "...", "statutes": [] }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    clearTimeout(timeoutId);

    // Return the results through the Typo-Proof filter
    return typoProofParse(response.text());

  } catch (error: any) {
    console.error("Analysis Failed:", error);
    return {
      summary: "Forensic analysis failed to initialize.",
      liability: "Service Error",
      reasoning: "The system encountered a model mismatch. Please try again.",
      statutes: ["Error 404/429"]
    };
  }
};
