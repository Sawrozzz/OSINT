/* eslint-disable @typescript-eslint/no-explicit-any */
export type TargetType = "company" | "individual";

export interface ScanResult {
  id: number;
  category: string;
  source: string;
  confidence_score: number;
  relevance_level: string;
  data: Record<string, any>;
}

export interface SearchSession {
  id: number;
  query: string;
  status: "pending" | "processing" | "completed" | "failed";
  target_type: TargetType;
}
