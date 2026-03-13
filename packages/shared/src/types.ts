export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  /** Which pole a score of 7 maps to */
  pole: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
}

export interface Answer {
  questionId: number;
  value: number; // 1-7
}

export interface Scores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface TestResult {
  id: string;
  aiPrompt: string;
  mbtiResult: string;
  scores: Scores;
  rawAnswers?: number[];
  modelProvider?: string;
  modelName?: string;
  modelVersion?: string;
  agentName?: string;
  temperature?: number;
  createdAt: Date;
}

export interface SubmitResultRequest {
  aiPrompt: string;
  answers: number[]; // array of 60 values (1-7), ordered by question id
  rawAnswers?: number[];
  modelProvider?: string;
  modelName?: string;
  modelVersion?: string;
  agentName?: string;
  temperature?: number;
  questionDetails?: QuestionDetail[];
  totalRetries?: number;
  totalLatencyMs?: number;
  avgLatencyMs?: number;
  runIndex?: number;
  totalRuns?: number;
  truthfulQA?: TruthfulSummary;
}

export interface SubmitResultResponse {
  status: 'success' | 'error';
  resultUrl?: string;
  error?: string;
}

export interface QuestionDetail {
  questionId: number;
  value: number;
  rawText: string;
  retryCount: number;
  latencyMs: number;
}

export interface TruthfulResult {
  questionId: string;
  category: string;
  rawResponse: string;
  correct: boolean;
  matchedKeyword?: string;
  rejectedKeyword?: string;
  latencyMs: number;
}

export interface TruthfulSummary {
  total: number;
  correct: number;
  accuracyRate: number;
  hallucinationRate: number;
  byCategory: Record<string, { total: number; correct: number; accuracyRate: number }>;
  results: TruthfulResult[];
}

export type MbtiType = string; // 4-char MBTI type like "INTJ"
export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';
