import { GoogleGenerativeAI } from "@google/generative-ai";
import { EvidenceItem, AnalysisResult } from "../types";
import { getGeminiApiKey } from "./apiKey";

function getClient(): GoogleGenerativeAI {
  const key = getGeminiApiKey();
  if (!key) {
    throw new Error("Missing Gemini API key. Please set it in the dashboard.");
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
    // Using the stable 2026 preview identifier
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // --- STEP 1: INITIAL GENERATION ---
    const generationPrompt = `
      You are LexiPro, a forensic legal AI. Analyze this medical evidence: "${evidence.content}"
      Return a JSON object with: summary, liability, reasoning, statutes.
    `;

    const initialResult = await model.generateContent(generationPrompt);
    const firstDraft = initialResult.response.text();

    // --- STEP 2: THE AI AUDIT (SELF-CORRECTION) ---
    const auditPrompt = `
      You are a senior legal editor. Review the following AI forensic analysis for typos and professionalism.
      
      CORE REQUIREMENTS:
      1. Correct "Iternal" to "Internal".
      2. Correct "Hgh" to "High".
      3. Ensure sentences start with "The" (not "Te").
      4. Ensure legal citations (like 42 CFR § 482.23) are perfectly formatted.
      
      DRAFT TO AUDIT:
      ${firstDraft}

      Return ONLY the final, corrected JSON object.
    `;

    const finalResult = await model.generateContent(auditPrompt);
    const cleanedText = finalResult.response.text();
    
    return safeJsonParse(cleanedText) as AnalysisResult;

  } catch (error) {
    console.error("Critical AI Failure:", error);
    // Fallback object prevents the 'blank navy screen' crash
    return {
      summary: "Forensic analysis failed to initialize.",
      liability: "Service Offline",
      reasoning: "The AI engine encountered an error. Please check your API key and connection.",
      statutes: ["Error 404/429"]
    };
  }
};
