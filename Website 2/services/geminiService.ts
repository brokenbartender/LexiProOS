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
 * THE ULTIMATE TYPO-PROOF PARSER:
 * This layer forcefully corrects "AI slop" tokens that persistent prompts fail to fix.
 */
function typoProofParse(text: string): AnalysisResult {
  // 1. Initial cleaning of markdown artifacts
  let cleanText = text.replace(/```json|```/gi, "").trim();

  // 2. EXPANDED REGEX LAYER: Force-correct known persistent typos
  cleanText = cleanText
    .replace(/\bTe\b/g, "The")               // Fixes "Te" -> "The"
    .replace(/\btis\b/gi, "this")           // Fixes "tis" -> "this"
    .replace(/\bPtential\b/gi, "Potential") // Fixes "Ptential" -> "Potential"
    .replace(/\bIternal\b/gi, "Internal")   // Fixes "Iternal" -> "Internal"
    .replace(/\bHgh\b/gi, "High")           // Fixes "Hgh" -> "High"
    .replace(/\bTe statement\b/gi, "The statement")
    .replace(/\bTe evidence\b/gi, "The evidence");

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
      
      CRITICAL ACCURACY INSTRUCTIONS:
      - Use perfect, professional legal English.
      - Ensure the word "The" is always spelled correctly.
      - Ensure "Potential" and "Internal" are spelled correctly.
      
      OUTPUT JSON: { "summary": "...", "liability": "...", "reasoning": "...", "statutes": [] }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    clearTimeout(timeoutId);

    // Return the results through the expanded filter
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
