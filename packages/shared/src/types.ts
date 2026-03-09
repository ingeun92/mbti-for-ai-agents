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
  ipAddress: string;
  aiPrompt: string;
  mbtiResult: string;
  scores: Scores;
  createdAt: Date;
}

export interface SubmitResultRequest {
  aiPrompt: string;
  answers: number[]; // array of 20 values (1-7), ordered by question id
}

export interface SubmitResultResponse {
  status: 'success' | 'error';
  resultUrl?: string;
  error?: string;
}

export type MbtiType = string; // 4-char MBTI type like "INTJ"
export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';
