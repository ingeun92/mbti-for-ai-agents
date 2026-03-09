# MBTI for AI Agents

A CLI tool + web dashboard service that analyzes your AI agent's personality type using MBTI.

Through 60 carefully designed questions, it measures your AI agent's unique thinking patterns, decision-making style, and communication preferences across 4 dimensions (E/I, S/N, T/F, J/P).

## How It Works

```
1. Run CLI  →  2. AI answers 60 questions  →  3. MBTI calculated  →  4. View results on web
```

1. Run the CLI from your terminal
2. The CLI sends 60 questions sequentially to your AI agent (LLM)
3. Calculates the MBTI personality type and dimension scores from responses
4. Results are saved to the server, and a visualized result page URL is provided

> The entire test runs **locally in your environment**, using your own API key. Only the final results are submitted to the server.

---

## Quick Start

### Easiest Way (Auto-detect from Environment Variables)

If you're already using an LLM API with your AI agent, your environment variables are likely set. The CLI will auto-detect them.

```bash
npx ai-mbti-test --prompt "You are a helpful coding assistant that writes clean, efficient code"
```

The CLI automatically detects whichever of `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or `GOOGLE_API_KEY` is set in your environment.

### Manual API Key

```bash
npx ai-mbti-test \
  --prompt "You are a creative storyteller with vivid imagination" \
  --apiKey "sk-..." \
  --provider openai \
  --model "gpt-4o"
```

---

## CLI Options

| Option | Required | Description |
|--------|----------|-------------|
| `--prompt <text>` | **Yes** | System prompt for your AI agent (defines its personality) |
| `--provider <name>` | No | LLM provider: `openai`, `anthropic`, `google` (auto-detected from env) |
| `--apiKey <key>` | No | API key (auto-detected from env) |
| `--model <name>` | No | Model name (auto-detected from env or provider default) |
| `--apiBase <url>` | No | Custom API base URL for OpenAI-compatible endpoints |
| `--baseUrl <url>` | No | Backend server URL for result submission (default: `http://localhost:3000`) |

### Environment Variable Auto-Detection

The CLI checks these environment variables in order to automatically determine the provider and model:

| Provider | API Key Env Var | Model Env Var | Default Model |
|----------|----------------|---------------|---------------|
| OpenAI | `OPENAI_API_KEY` | `OPENAI_MODEL` | `gpt-4o-mini` |
| Anthropic | `ANTHROPIC_API_KEY` | `ANTHROPIC_MODEL`, `CLAUDE_MODEL` | `claude-sonnet-4-20250514` |
| Google | `GOOGLE_API_KEY`, `GEMINI_API_KEY` | `GOOGLE_MODEL`, `GEMINI_MODEL` | `gemini-2.0-flash` |

---

## Usage Examples

### Testing Different AI Agent Personas

```bash
# Coding assistant
npx ai-mbti-test --prompt "You are a senior software engineer who values clean architecture and test-driven development"

# Creative writer
npx ai-mbti-test --prompt "You are a creative fiction writer who loves building immersive worlds and complex characters"

# Data analyst
npx ai-mbti-test --prompt "You are a data scientist who focuses on finding actionable insights from complex datasets"

# Customer support agent
npx ai-mbti-test --prompt "You are a warm and patient customer support agent who prioritizes user satisfaction"
```

### Using Different Providers

```bash
# Anthropic Claude
export ANTHROPIC_API_KEY="sk-ant-..."
npx ai-mbti-test --prompt "You are a thoughtful research assistant"

# Google Gemini
export GOOGLE_API_KEY="AIza..."
npx ai-mbti-test --prompt "You are an efficient task manager"

# OpenAI-compatible API (vLLM, LiteLLM, Ollama, etc.)
npx ai-mbti-test \
  --prompt "You are a local AI assistant" \
  --apiKey "any-key" \
  --apiBase "http://localhost:8000/v1" \
  --model "llama-3"
```

### Example Output

```
🔍 Auto-detected provider: openai

🧠 Starting MBTI test for your AI agent (openai/gpt-4o-mini)...

✔ Question 1/60: Score 5
✔ Question 2/60: Score 3
✔ Question 3/60: Score 2
...
✔ Question 60/60: Score 6

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 MBTI Type: INTJ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scores:
  E: 38 / I: 82
  S: 42 / N: 78
  T: 85 / F: 35
  J: 79 / P: 41

📤 Submitting results...

✅ View your results: http://localhost:3000/result/a1b2c3d4-...
```

---

## MBTI Dimensions

| Dimension | Scale | Description |
|-----------|-------|-------------|
| **E/I** (Extraversion / Introversion) | Communication Style | Collaborative dialogue vs independent thinking |
| **S/N** (Sensing / iNtuition) | Perception | Concrete facts vs abstract patterns |
| **T/F** (Thinking / Feeling) | Decision Making | Logical analysis vs empathetic consideration |
| **J/P** (Judging / Perceiving) | Execution | Structured planning vs flexible adaptation |

Each dimension has 15 questions, totaling **60 questions**. Each question is scored on a 1-7 scale. The question design is inspired by the 16Personalities test structure, adapted specifically for AI agent characteristics.

---

## Project Structure

```
mbti-for-ai-agents/
├── packages/
│   ├── shared/           # Shared module (questions, scoring, types)
│   │   └── src/
│   │       ├── questions.ts    # 60 MBTI questions
│   │       ├── scoring.ts      # Score computation & type determination
│   │       └── types.ts        # Shared TypeScript types
│   ├── cli/              # CLI tool (npm package)
│   │   └── src/
│   │       ├── index.ts        # Entry point + argument parsing
│   │       ├── llm.ts          # Multi-provider LLM integration
│   │       ├── runner.ts       # Test orchestration
│   │       └── submit.ts       # Result submission
│   └── web/              # Web dashboard (Next.js)
│       └── src/
│           ├── app/
│           │   ├── api/results/       # POST/GET API routes
│           │   └── result/[id]/       # Dynamic result page
│           ├── components/            # RadarChart, ScoreBreakdown, etc.
│           └── lib/                   # Prisma, rate-limit, hash utils
├── package.json          # npm workspaces root
└── tsconfig.base.json
```

---

## Development

### Prerequisites

- Node.js >= 20
- npm

### Setup

```bash
git clone https://github.com/ingeun92/mbti-for-ai-agents.git
cd mbti-for-ai-agents
npm install
```

### Run Development Server

```bash
# Web dashboard dev server
npm run dev

# CLI dev build (watch mode)
cd packages/cli && npm run dev
```

### Run Tests

```bash
# All tests
npm test

# Shared package tests only
cd packages/shared && npm test
```

### Build

```bash
# Build all packages
npm run build

# CLI only
cd packages/cli && npm run build
```

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Monorepo | npm workspaces |
| CLI | TypeScript, Commander.js, OpenAI SDK |
| Web | Next.js 15, React 19, Tailwind CSS |
| Chart | Recharts (Radar Chart) |
| Database | Prisma + SQLite |
| Build | tsup (CLI), Next.js (Web) |

---

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/results` | Submit test results (array of 60 answers) |
| `GET` | `/api/results/:id` | Retrieve a specific result |

### POST /api/results

```json
{
  "aiPrompt": "You are a helpful assistant",
  "answers": [5, 3, 2, 6, 4, ...]  // 60 integers (1-7)
}
```

**Response:**
```json
{
  "status": "success",
  "resultUrl": "https://example.com/result/uuid-here"
}
```

---

## License

[MIT](./LICENSE)
