import { questions, computeScores, determineMbtiType, type Scores } from '@mbti/shared';
import { askQuestion, type LLMConfig } from './llm.js';
import ora from 'ora';

export interface TestRunResult {
  answers: number[];
  scores: Scores;
  mbtiType: string;
}

export async function runTest(
  systemPrompt: string,
  config: LLMConfig
): Promise<TestRunResult> {
  const answers: number[] = [];
  const spinner = ora();

  console.log(`\n🧠 Starting MBTI test for your AI agent (${config.provider}/${config.model})...\n`);

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    spinner.start(`Question ${i + 1}/${questions.length}: Asking...`);

    try {
      const value = await askQuestion(q.text, systemPrompt, config);
      answers.push(value);
      spinner.succeed(`Question ${i + 1}/${questions.length}: Score ${value}`);
    } catch (error) {
      spinner.fail(`Question ${i + 1}/${questions.length}: Failed`);
      throw error;
    }
  }

  const scores = computeScores(answers);
  const mbtiType = determineMbtiType(scores);

  return { answers, scores, mbtiType };
}
