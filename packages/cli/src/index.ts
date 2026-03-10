#!/usr/bin/env node
import { Command } from 'commander';
import { questions, computeScores, determineMbtiType, type Scores } from '@mbti/shared';
import { detectProvider, detectModel, type Provider, type LLMConfig } from './llm.js';
import { runTest } from './runner.js';
import { submitResult } from './submit.js';

const SUPPORTED_PROVIDERS = ['openai', 'anthropic', 'google'] as const;

function displayResult(mbtiType: string, scores: Scores): void {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🎯 MBTI Type: ${mbtiType}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\nScores:');
  console.log(`  E: ${scores.E} / I: ${scores.I}`);
  console.log(`  S: ${scores.S} / N: ${scores.N}`);
  console.log(`  T: ${scores.T} / F: ${scores.F}`);
  console.log(`  J: ${scores.J} / P: ${scores.P}`);
}

async function trySubmit(baseUrl: string, prompt: string, answers: number[]): Promise<void> {
  try {
    console.log('\n📤 Submitting results...');
    const resultUrl = await submitResult(baseUrl, prompt, answers);
    console.log(`\n✅ View your results: ${resultUrl}`);
  } catch (submitError) {
    console.log('\n⚠️  Could not submit to server (results shown above are still valid)');
    if (submitError instanceof Error) {
      console.log(`   Reason: ${submitError.message}`);
    }
  }
}

const program = new Command();

program
  .name('ai-mbti-test')
  .description('Test your AI agent\'s MBTI personality type')
  .version('0.1.0');

// Subcommand: questions
program
  .command('questions')
  .description('Output all MBTI test questions as JSON (for AI agents to answer directly)')
  .action(() => {
    const output = questions.map((q) => ({
      id: q.id,
      text: q.text,
    }));
    console.log(JSON.stringify(output, null, 2));
  });

// Subcommand: compute
program
  .command('compute')
  .description('Compute MBTI result from pre-answered questions (no API key needed)')
  .requiredOption('--prompt <prompt>', 'System prompt for your AI agent')
  .requiredOption('--answers <answers>', 'Comma-separated answers (60 values, each 1-7)')
  .option('--baseUrl <url>', 'Backend API base URL', 'http://localhost:3000')
  .action(async (options) => {
    try {
      const { prompt, baseUrl } = options;

      const answers = options.answers.split(',').map((s: string) => {
        const n = parseInt(s.trim(), 10);
        if (isNaN(n) || n < 1 || n > 7) {
          throw new Error(`Invalid answer value: "${s.trim()}". Each answer must be an integer from 1 to 7.`);
        }
        return n;
      });

      if (answers.length !== questions.length) {
        throw new Error(`Expected ${questions.length} answers, got ${answers.length}.`);
      }

      const scores = computeScores(answers);
      const mbtiType = determineMbtiType(scores);

      displayResult(mbtiType, scores);
      await trySubmit(baseUrl, prompt, answers);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\n❌ Error: ${error.message}`);
      } else {
        console.error('\n❌ An unexpected error occurred');
      }
      process.exit(1);
    }
  });

// Subcommand: run (original API-key-based flow)
program
  .command('run')
  .description('Run MBTI test by calling an LLM API directly (requires API key)')
  .requiredOption('--prompt <prompt>', 'System prompt for your AI agent')
  .option('--provider <provider>', 'LLM provider: openai, anthropic, google (auto-detected from env)')
  .option('--apiKey <key>', 'API key (auto-detected from env: OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_API_KEY)')
  .option('--apiBase <url>', 'Custom API base URL for OpenAI-compatible endpoints')
  .option('--model <model>', 'Model name (default varies by provider)')
  .option('--baseUrl <url>', 'Backend API base URL', 'http://localhost:3000')
  .action(async (options) => {
    try {
      const { prompt, baseUrl } = options;

      let provider: Provider;
      let apiKey: string;

      if (options.apiKey) {
        apiKey = options.apiKey;
        provider = (options.provider as Provider) || 'openai';
      } else {
        const detected = detectProvider();
        if (!detected) {
          console.error('❌ No API key found. Set one of these environment variables:');
          console.error('   - OPENAI_API_KEY (for OpenAI)');
          console.error('   - ANTHROPIC_API_KEY (for Anthropic/Claude)');
          console.error('   - GOOGLE_API_KEY or GEMINI_API_KEY (for Google/Gemini)');
          console.error('   Or pass --apiKey manually.');
          process.exit(1);
        }
        provider = (options.provider as Provider) || detected.provider;
        apiKey = detected.apiKey;
        console.log(`🔍 Auto-detected provider: ${provider}`);
      }

      if (!SUPPORTED_PROVIDERS.includes(provider)) {
        console.error(`❌ Unsupported provider: ${provider}. Supported: ${SUPPORTED_PROVIDERS.join(', ')}`);
        process.exit(1);
      }

      const model = options.model || detectModel(provider);

      const config: LLMConfig = {
        provider,
        apiKey,
        model,
        apiBase: options.apiBase || undefined,
      };

      const result = await runTest(prompt, config);

      displayResult(result.mbtiType, result.scores);
      await trySubmit(baseUrl, prompt, result.answers);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\n❌ Error: ${error.message}`);
      } else {
        console.error('\n❌ An unexpected error occurred');
      }
      process.exit(1);
    }
  });

program.parse();
