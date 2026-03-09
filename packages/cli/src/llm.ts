import OpenAI from 'openai';

export type Provider = 'openai' | 'anthropic' | 'google';

export interface LLMConfig {
  provider: Provider;
  apiKey: string;
  model: string;
  apiBase?: string;
}

const PROVIDER_ENV_KEYS: Record<Provider, string[]> = {
  openai: ['OPENAI_API_KEY'],
  anthropic: ['ANTHROPIC_API_KEY'],
  google: ['GOOGLE_API_KEY', 'GEMINI_API_KEY'],
};

const DEFAULT_MODELS: Record<Provider, string> = {
  openai: 'gpt-4o-mini',
  anthropic: 'claude-sonnet-4-20250514',
  google: 'gemini-2.0-flash',
};

const MODEL_ENV_KEYS: Record<Provider, string[]> = {
  openai: ['OPENAI_MODEL'],
  anthropic: ['ANTHROPIC_MODEL', 'CLAUDE_MODEL'],
  google: ['GOOGLE_MODEL', 'GEMINI_MODEL'],
};

const PROVIDER_BASE_URLS: Record<Provider, string | undefined> = {
  openai: undefined, // uses OpenAI SDK default
  anthropic: 'https://api.anthropic.com/v1/',
  google: 'https://generativelanguage.googleapis.com/v1beta/openai/',
};

/**
 * Auto-detect LLM provider from environment variables.
 * Returns the first provider whose API key is found.
 */
export function detectProvider(): { provider: Provider; apiKey: string } | null {
  for (const [provider, envKeys] of Object.entries(PROVIDER_ENV_KEYS)) {
    for (const envKey of envKeys) {
      const apiKey = process.env[envKey];
      if (apiKey) {
        return { provider: provider as Provider, apiKey };
      }
    }
  }
  return null;
}

/**
 * Detect model from environment variables, falling back to provider default.
 * Checks provider-specific env vars (e.g., OPENAI_MODEL, ANTHROPIC_MODEL)
 * so the CLI automatically uses the same model the user's AI agent is using.
 */
export function detectModel(provider: Provider): string {
  const envKeys = MODEL_ENV_KEYS[provider];
  for (const envKey of envKeys) {
    const model = process.env[envKey];
    if (model) return model;
  }
  return DEFAULT_MODELS[provider];
}

export function getProviderBaseUrl(provider: Provider): string | undefined {
  return PROVIDER_BASE_URLS[provider];
}

/**
 * All supported providers use the OpenAI-compatible chat completions API.
 * - OpenAI: native
 * - Anthropic: via their OpenAI-compatible endpoint
 * - Google: via their OpenAI-compatible endpoint
 */
export async function askQuestion(
  question: string,
  systemPrompt: string,
  config: LLMConfig
): Promise<number> {
  const baseURL = config.apiBase || getProviderBaseUrl(config.provider);
  const client = new OpenAI({ apiKey: config.apiKey, baseURL });

  const maxRetries = 2;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await client.chat.completions.create({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: `${systemPrompt}\n\nYou are taking a personality test. For each question, respond with ONLY a single integer from 1 to 7. Do not include any other text, explanation, or punctuation. Just the number.`,
          },
          {
            role: 'user',
            content: question,
          },
        ],
        temperature: 0.7,
        max_tokens: 5,
      });

      const text = response.choices[0]?.message?.content?.trim() ?? '';
      const value = parseInt(text, 10);

      if (isNaN(value) || value < 1 || value > 7) {
        if (attempt < maxRetries) continue;
        throw new Error(`Invalid response after ${maxRetries + 1} attempts: "${text}"`);
      }

      return value;
    } catch (error) {
      if (attempt < maxRetries && !(error instanceof Error && error.message.includes('Invalid response'))) {
        continue;
      }
      throw error;
    }
  }

  throw new Error('Unreachable');
}
