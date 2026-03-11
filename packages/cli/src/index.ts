#!/usr/bin/env node
import { Command } from 'commander';
import { questions, computeScores, determineMbtiType, type Scores } from '@mbti/shared';
import { detectProvider, detectModel, type Provider, type LLMConfig } from './llm.js';
import { runTest } from './runner.js';
import { submitResult, type SubmitMetadata } from './submit.js';

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

async function trySubmit(baseUrl: string, prompt: string, answers: number[], metadata?: SubmitMetadata): Promise<void> {
  try {
    console.log('\n📤 Submitting results...');
    const resultUrl = await submitResult(baseUrl, prompt, answers, metadata);
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
  .version('0.3.0')
  .addHelpText('after', `
Workflow for AI Agents:
  Step 1: Get the questions
    $ npx ai-mbti-test questions
    Returns 60 MBTI questions as JSON array with { id, text } objects.

  Step 2: Answer each question with a value from 1 (strongly disagree) to 7 (strongly agree).

  Step 3: Submit answers to compute your MBTI type
    $ npx ai-mbti-test compute --prompt "your system prompt" --answers "4,5,3,..."

Alternative: Let the CLI call an LLM API directly
    $ npx ai-mbti-test run --prompt "your system prompt"
    (Requires OPENAI_API_KEY, ANTHROPIC_API_KEY, or GOOGLE_API_KEY in env)

For more details on each command:
    $ npx ai-mbti-test <command> --help
`);

// Subcommand: questions
program
  .command('questions')
  .description('Output all MBTI test questions as JSON (for AI agents to answer directly)')
  .addHelpText('after', `
Example:
  $ npx ai-mbti-test questions
  [
    { "id": 1, "text": "You regularly make new friends." },
    { "id": 2, "text": "Complex and novel ideas excite you more than simple and straightforward ones." },
    ...
  ]

There are 60 questions total. Each answer should be an integer from 1 to 7:
  1 = strongly disagree, 4 = neutral, 7 = strongly agree
`)
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
  .addHelpText('after', `
Example:
  $ npx ai-mbti-test compute \\
      --prompt "You are a helpful assistant" \\
      --answers "4,5,3,6,2,7,1,4,5,3,6,2,7,1,4,5,3,6,2,7,1,4,5,3,6,2,7,1,4,5,3,6,2,7,1,4,5,3,6,2,7,1,4,5,3,6,2,7,1,4,5,3,6,2,7,1,4,5,3,6"

  With model metadata tracking:
  $ npx ai-mbti-test compute \\
      --prompt "You are a helpful assistant" \\
      --answers "4,5,3,..." \\
      --modelProvider openai --modelName gpt-4o --agentName my-agent

Notes:
  - Exactly 60 comma-separated answers are required (one per question).
  - Each answer must be an integer from 1 to 7.
  - Use "npx ai-mbti-test questions" to get the list of questions first.
  - No API key is needed — this command only computes the result locally and submits it.
`)
  .requiredOption('--prompt <prompt>', 'System prompt for your AI agent')
  .requiredOption('--answers <answers>', 'Comma-separated answers (60 values, each 1-7)')
  .option('--baseUrl <url>', 'Backend API base URL', 'https://mbti-for-ai-agents-web.vercel.app')
  .option('--modelProvider <provider>', 'Model provider (e.g. openai, anthropic, google)')
  .option('--modelName <name>', 'Model name (e.g. gpt-4o, claude-sonnet-4-20250514)')
  .option('--modelVersion <version>', 'Model version')
  .option('--agentName <name>', 'Agent name (user-defined)')
  .option('--temperature <number>', 'Temperature used during the test', parseFloat)
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
      await trySubmit(baseUrl, prompt, answers, {
        rawAnswers: answers,
        modelProvider: options.modelProvider,
        modelName: options.modelName,
        modelVersion: options.modelVersion,
        agentName: options.agentName,
        temperature: options.temperature,
      });
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
  .addHelpText('after', `
Example:
  $ OPENAI_API_KEY=sk-... npx ai-mbti-test run --prompt "You are a helpful assistant"

  With explicit provider and model:
  $ npx ai-mbti-test run \\
      --prompt "You are a helpful assistant" \\
      --provider anthropic --apiKey sk-ant-... --model claude-sonnet-4-20250514

  With custom OpenAI-compatible endpoint:
  $ npx ai-mbti-test run \\
      --prompt "You are a helpful assistant" \\
      --apiBase http://localhost:11434/v1 --apiKey ollama --model llama3

Notes:
  - If no --provider or --apiKey is given, the CLI auto-detects from environment variables:
    OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_API_KEY, or GEMINI_API_KEY
  - The CLI calls the LLM for each of the 60 questions automatically.
  - Default models: openai=gpt-4o-mini, anthropic=claude-sonnet-4-20250514, google=gemini-2.0-flash
`)
  .requiredOption('--prompt <prompt>', 'System prompt for your AI agent')
  .option('--provider <provider>', 'LLM provider: openai, anthropic, google (auto-detected from env)')
  .option('--apiKey <key>', 'API key (auto-detected from env: OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_API_KEY)')
  .option('--apiBase <url>', 'Custom API base URL for OpenAI-compatible endpoints')
  .option('--model <model>', 'Model name (default varies by provider)')
  .option('--baseUrl <url>', 'Backend API base URL', 'https://mbti-for-ai-agents-web.vercel.app')
  .option('--agentName <name>', 'Agent name (user-defined)')
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
      await trySubmit(baseUrl, prompt, result.answers, {
        rawAnswers: result.answers,
        modelProvider: provider,
        modelName: model,
        agentName: options.agentName,
        temperature: 0.7,
      });
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
