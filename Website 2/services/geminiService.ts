import { GoogleGenerativeAI, Type } from "@google/generative-ai";
import { EvidenceItem, AnalysisResult } from "../types";
import { getGeminiApiKey } from "./apiKey";

function getClient(): GoogleGenerativeAI {
  const key = getGeminiApiKey();
  if (!key) {
    throw new Error(
      "Missing Gemini API key. Click 'Set API Key' and paste your key to run live analysis."
    );
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
    if (firstObj !== -1 && lastObj !== -1 && lastObj > firstObj) {
      const slice = candidate.slice(firstObj, lastObj + 1);
      return JSON.parse(slice);
    }
    throw new Error("Failed to parse Gemini JSON response.");
  }
}

export const analyzeEvidence = async (evidence: EvidenceItem): Promise<AnalysisResult> => {
  try {
    const genAI = getClient();
    // Updated to gemini-1.5-flash for higher rate limits on free tier
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash" 
    });

    const prompt = `
      You are LexiPro, a specialized forensic legal AI. 
      Analyze the following raw evidence snippet from a medical malpractice dossier.

      METADATA:
      - Type: ${evidence.type}
      - Timestamp: ${evidence.timestamp}
      - ID: ${evidence.id}

      CONTENT: "${evidence.content}"

      TASK: Perform a deep forensic analysis. Identify contradictions, standard of care violations, or credibility issues.

      OUTPUT REQUIREMENTS (JSON):
      1. summary: A professional summary (max 2 sentences).
      2. liability: A short risk assessment (e.g., "High Risk: Failure to Rescue").
      3. reasoning: Detailed 'Chain-of-Thought' explanation.
      4. statutes: List 2-3 specific medical-legal terms or protocols.
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const text = result.response.text();
    if (!text) throw new Error("No response from AI");
    
    return safeJsonParse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      summary: "Analysis interrupted.",
      liability: "System Error",
      reasoning: error instanceof Error ? error.message : "The forensic engine could not complete the request.",
      statutes: ["Error"],
    };
  }
};
