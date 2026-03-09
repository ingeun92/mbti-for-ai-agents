#!/usr/bin/env node
import { Command } from 'commander';
import { detectProvider, detectModel, type Provider, type LLMConfig } from './llm.js';
import { runTest } from './runner.js';
import { submitResult } from './submit.js';

const SUPPORTED_PROVIDERS = ['openai', 'anthropic', 'google'] as const;

const program = new Command();

program
  .name('ai-mbti-test')
  .description('Test your AI agent\'s MBTI personality type')
  .version('0.1.0')
  .requiredOption('--prompt <prompt>', 'System prompt for your AI agent')
  .option('--provider <provider>', 'LLM provider: openai, anthropic, google (auto-detected from env)')
  .option('--apiKey <key>', 'API key (auto-detected from env: OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_API_KEY)')
  .option('--apiBase <url>', 'Custom API base URL for OpenAI-compatible endpoints')
  .option('--model <model>', 'Model name (default varies by provider)')
  .option('--baseUrl <url>', 'Backend API base URL', 'http://localhost:3000')
  .action(async (options) => {
    try {
      const { prompt, baseUrl } = options;

      // Resolve LLM config: auto-detect or use manual overrides
      let provider: Provider;
      let apiKey: string;

      if (options.apiKey) {
        // Manual API key provided — use explicit provider or default to openai
        apiKey = options.apiKey;
        provider = (options.provider as Provider) || 'openai';
      } else {
        // Auto-detect from environment variables
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

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🎯 MBTI Type: ${result.mbtiType}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\nScores:');
      const { scores } = result;
      console.log(`  E: ${scores.E} / I: ${scores.I}`);
      console.log(`  S: ${scores.S} / N: ${scores.N}`);
      console.log(`  T: ${scores.T} / F: ${scores.F}`);
      console.log(`  J: ${scores.J} / P: ${scores.P}`);

      // Submit to backend
      try {
        console.log('\n📤 Submitting results...');
        const resultUrl = await submitResult(baseUrl, prompt, result.answers);
        console.log(`\n✅ View your results: ${resultUrl}`);
      } catch (submitError) {
        console.log('\n⚠️  Could not submit to server (results shown above are still valid)');
        if (submitError instanceof Error) {
          console.log(`   Reason: ${submitError.message}`);
        }
      }
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
