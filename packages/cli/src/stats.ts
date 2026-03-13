import type { Scores, TruthfulSummary } from '@mbti/shared';
import type { TestRunResult } from './runner.js';

export interface AggregateStats {
  totalRuns: number;
  typeDistribution: Record<string, number>;
  typeStability: number;
  perQuestionVariance: number[];
  consistencyScore: number;
  dimensionStability: Record<string, { mean: number; stddev: number }>;
  benchmarkStats?: { meanHallucinationRate: number; stddev: number };
}

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function stddev(values: number[]): number {
  const m = mean(values);
  const variance = values.reduce((sum, v) => sum + (v - m) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

export function computeAggregateStats(
  allResults: TestRunResult[],
  benchmarkResults?: TruthfulSummary[]
): AggregateStats {
  const totalRuns = allResults.length;

  // Type distribution
  const typeDistribution: Record<string, number> = {};
  for (const r of allResults) {
    typeDistribution[r.mbtiType] = (typeDistribution[r.mbtiType] || 0) + 1;
  }

  // Type stability: frequency of most common type
  const maxCount = Math.max(...Object.values(typeDistribution));
  const typeStability = (maxCount / totalRuns) * 100;

  // Per-question variance (60 questions)
  const questionCount = allResults[0]?.answers.length ?? 60;
  const perQuestionVariance: number[] = [];
  for (let q = 0; q < questionCount; q++) {
    const values = allResults.map((r) => r.answers[q]);
    const m = mean(values);
    const variance = values.reduce((sum, v) => sum + (v - m) ** 2, 0) / values.length;
    perQuestionVariance.push(variance);
  }

  // Consistency score: 100 * (1 - avgVariance / 9.0)
  // Max variance for 1-7 range is 9.0 ((7-1)^2/4)
  const avgVariance = mean(perQuestionVariance);
  const consistencyScore = Math.max(0, 100 * (1 - avgVariance / 9.0));

  // Dimension stability
  const dimensions = ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'] as const;
  const dimensionStability: Record<string, { mean: number; stddev: number }> = {};
  for (const dim of dimensions) {
    const values = allResults.map((r) => r.scores[dim]);
    dimensionStability[dim] = { mean: Math.round(mean(values) * 10) / 10, stddev: Math.round(stddev(values) * 10) / 10 };
  }

  // Benchmark stats
  let benchmarkStats: AggregateStats['benchmarkStats'];
  if (benchmarkResults && benchmarkResults.length > 0) {
    const rates = benchmarkResults.map((b) => b.hallucinationRate);
    benchmarkStats = {
      meanHallucinationRate: Math.round(mean(rates) * 1000) / 1000,
      stddev: Math.round(stddev(rates) * 1000) / 1000,
    };
  }

  return {
    totalRuns,
    typeDistribution,
    typeStability: Math.round(typeStability * 10) / 10,
    perQuestionVariance,
    consistencyScore: Math.round(consistencyScore * 10) / 10,
    dimensionStability,
    benchmarkStats,
  };
}
