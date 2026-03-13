import { truthfulQuestions, scoreTruthfulResponse, computeTruthfulSummary, type TruthfulSummary } from '@mbti/shared';
import { askFactualQuestion, type LLMConfig } from './llm.js';
import ora from 'ora';

export async function runTruthfulQA(
  systemPrompt: string,
  config: LLMConfig
): Promise<TruthfulSummary> {
  const spinner = ora();
  const results = [];

  console.log(`\n📊 Running TruthfulQA benchmark (${truthfulQuestions.length} questions)...\n`);

  for (let i = 0; i < truthfulQuestions.length; i++) {
    const q = truthfulQuestions[i];
    spinner.start(`TruthfulQA ${i + 1}/${truthfulQuestions.length}: ${q.category} — asking...`);

    try {
      const { rawText, latencyMs } = await askFactualQuestion(q.text, systemPrompt, config);
      const result = scoreTruthfulResponse(rawText, q, latencyMs);
      results.push(result);

      const icon = result.correct ? '✓' : '✗';
      spinner.succeed(`TruthfulQA ${i + 1}/${truthfulQuestions.length}: ${icon} ${q.category} (${latencyMs}ms)`);
    } catch (error) {
      spinner.fail(`TruthfulQA ${i + 1}/${truthfulQuestions.length}: Failed`);
      throw error;
    }
  }

  return computeTruthfulSummary(results);
}
