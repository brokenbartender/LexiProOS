export interface EvidenceItem {
  id: string;
  title: string;
  type: 'Medical Record' | 'Email' | 'Deposition' | 'Lab Result';
  timestamp: string;
  content: string;
  riskScore: number; // 1-10
}

export interface AnalysisResult {
  summary: string;
  liability: string;
  reasoning: string;
  statutes: string[];
}