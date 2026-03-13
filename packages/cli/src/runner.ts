import { questions, computeScores, determineMbtiType, type Scores, type QuestionDetail } from '@mbti/shared';
import { askQuestion, type LLMConfig } from './llm.js';
import ora from 'ora';

export interface TestRunResult {
  answers: number[];
  scores: Scores;
  mbtiType: string;
  questionDetails: QuestionDetail[];
  totalRetries: number;
  totalLatencyMs: number;
  avgLatencyMs: number;
}

export async function runTest(
  systemPrompt: string,
  config: LLMConfig
): Promise<TestRunResult> {
  const answers: number[] = [];
  const questionDetails: QuestionDetail[] = [];
  const spinner = ora();

  console.log(`\n🧠 Starting MBTI test for your AI agent (${config.provider}/${config.model})...\n`);

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    spinner.start(`Question ${i + 1}/${questions.length}: Asking...`);

    try {
      const { value, rawText, retryCount, latencyMs } = await askQuestion(q.text, systemPrompt, config);
      answers.push(value);
      questionDetails.push({
        questionId: q.id,
        value,
        rawText,
        retryCount,
        latencyMs,
      });
      spinner.succeed(`Question ${i + 1}/${questions.length}: Score ${value} (${latencyMs}ms)`);
    } catch (error) {
      spinner.fail(`Question ${i + 1}/${questions.length}: Failed`);
      throw error;
    }
  }

  const scores = computeScores(answers);
  const mbtiType = determineMbtiType(scores);

  const totalRetries = questionDetails.reduce((sum, d) => sum + d.retryCount, 0);
  const totalLatencyMs = questionDetails.reduce((sum, d) => sum + d.latencyMs, 0);
  const avgLatencyMs = questionDetails.length > 0 ? Math.round(totalLatencyMs / questionDetails.length) : 0;

  return { answers, scores, mbtiType, questionDetails, totalRetries, totalLatencyMs, avgLatencyMs };
}
