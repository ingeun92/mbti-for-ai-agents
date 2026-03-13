<div align="center">

# MBTI for AI Agents

**Discover your AI agent's personality type**

[![npm version](https://img.shields.io/npm/v/ai-mbti-test)](https://www.npmjs.com/package/ai-mbti-test)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green)](https://nodejs.org)

Through 60 carefully designed questions, measure your AI agent's unique thinking patterns,
decision-making style, and communication preferences across 4 dimensions.

`E/I` `S/N` `T/F` `J/P`

Plus: **TruthfulQA benchmark** for hallucination measurement and **--repeat** for test-retest reliability.

</div>

---

## How It Works

```
1. Get questions  →  2. AI agent answers  →  3. Compute MBTI  →  4. Benchmark  →  5. View results
```

1. Run `npx ai-mbti-test questions` to get 60 MBTI questions as JSON
2. Your AI agent reads and answers each question (score 1-7)
3. Run `npx ai-mbti-test compute` with the answers to calculate the MBTI type
4. (Optional) TruthfulQA benchmark automatically measures hallucination rate
5. Results are submitted to the web dashboard and a shareable URL is provided

> [!NOTE]
> **No API key required.** Your AI agent answers the questions directly. Only the final results are submitted to the server.

---

## Quick Start

> [!TIP]
> **No setup required.** Just run `npx ai-mbti-test` from any directory — it downloads and runs automatically. No need to create a project folder or install globally.

### Try It with Your AI Agent

Open your AI agent (Claude Code, Cursor, GitHub Copilot, etc.) and paste this prompt:

```
Take the AI MBTI personality test.
Run `npx ai-mbti-test questions` to get the questions, answer each with a score (1-7)
based on your tendencies, then run `npx ai-mbti-test compute` with your answers
and `--prompt` describing yourself.
```

That's it — your agent handles the rest.

### Manual Steps (No API Key Needed)

If you prefer running the commands yourself:

```bash
# Step 1: Get the 60 MBTI questions
npx ai-mbti-test questions

# Step 2: Your AI agent reads the questions and answers each with a score (1-7)
# Step 3: Submit the answers to compute the result
npx ai-mbti-test compute \
  --prompt "You are a helpful coding assistant" \
  --answers "5,3,4,6,2,5,4,3,..."   # 60 comma-separated values
```

### With API Key (Automated)

If you want to test a specific model programmatically without manual interaction:

```bash
npx ai-mbti-test run --prompt "You are a helpful coding assistant that writes clean, efficient code"
```

The `run` command auto-detects `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or `GOOGLE_API_KEY` from your environment. After the MBTI test, a **TruthfulQA benchmark** (15 factual questions) automatically runs to measure hallucination rate.

```bash
# Manual API key
npx ai-mbti-test run \
  --prompt "You are a creative storyteller with vivid imagination" \
  --apiKey "sk-..." \
  --provider openai \
  --model "gpt-4o"

# Repeat test 3 times for consistency measurement
npx ai-mbti-test run --prompt "You are a helpful assistant" --repeat 3

# Skip TruthfulQA benchmark
npx ai-mbti-test run --prompt "You are a helpful assistant" --skip-benchmark
```

---

## CLI Commands

### `ai-mbti-test questions`

Output all 60 MBTI questions as JSON. No options required.

### `ai-mbti-test compute`

Compute MBTI result from pre-answered questions. No API key needed.

| Option | Required | Description |
|--------|----------|-------------|
| `--prompt <text>` | **Yes** | System prompt for your AI agent |
| `--answers <values>` | **Yes** | Comma-separated answers (60 values, each 1-7) |
| `--baseUrl <url>` | No | Backend server URL |
| `--modelProvider <name>` | No | Model provider (e.g. openai, anthropic, google) |
| `--modelName <name>` | No | Model name (e.g. gpt-4o, claude-sonnet-4-20250514) |
| `--modelVersion <ver>` | No | Model version |
| `--agentName <name>` | No | Agent name (user-defined) |
| `--temperature <number>` | No | Temperature used during the test |

### `ai-mbti-test run`

Run MBTI test by calling an LLM API directly. Requires API key. Includes TruthfulQA benchmark by default.

| Option | Required | Description |
|--------|----------|-------------|
| `--prompt <text>` | **Yes** | System prompt for your AI agent |
| `--provider <name>` | No | LLM provider: `openai`, `anthropic`, `google` (auto-detected from env) |
| `--apiKey <key>` | No | API key (auto-detected from env) |
| `--model <name>` | No | Model name (auto-detected from env or provider default) |
| `--apiBase <url>` | No | Custom API base URL for OpenAI-compatible endpoints |
| `--baseUrl <url>` | No | Backend server URL |
| `--agentName <name>` | No | Agent name (user-defined) |
| `--repeat <number>` | No | Number of test repetitions, 1-20 (default: 1) |
| `--skip-benchmark` | No | Skip TruthfulQA benchmark |

### Environment Variable Auto-Detection (for `run` command)

| Provider | API Key Env Var | Model Env Var | Default Model |
|----------|----------------|---------------|---------------|
| OpenAI | `OPENAI_API_KEY` | `OPENAI_MODEL` | `gpt-4o-mini` |
| Anthropic | `ANTHROPIC_API_KEY` | `ANTHROPIC_MODEL`, `CLAUDE_MODEL` | `claude-sonnet-4-20250514` |
| Google | `GOOGLE_API_KEY`, `GEMINI_API_KEY` | `GOOGLE_MODEL`, `GEMINI_MODEL` | `gemini-2.0-flash` |

---

## Usage Examples

<details>
<summary><b>For AI Agents (No API Key)</b></summary>

```bash
# Step 1: Get questions
npx ai-mbti-test questions
# Returns JSON array: [{ "id": 1, "text": "When presented with..." }, ...]

# Step 2: AI agent answers each question (1-7), then compute
npx ai-mbti-test compute \
  --prompt "You are a senior software engineer who values clean architecture" \
  --answers "5,6,4,5,3,5,5,3,3,4,5,3,4,3,5,3,3,4,4,5,3,3,4,3,3,3,4,5,3,5,3,3,5,4,5,4,3,5,4,5,5,5,4,5,4,2,5,3,3,3,5,2,2,2,5,3,4,3,3,3"
```

</details>

<details>
<summary><b>With API Key (Automated)</b></summary>

```bash
# Anthropic Claude
export ANTHROPIC_API_KEY="sk-ant-..."
npx ai-mbti-test run --prompt "You are a thoughtful research assistant"

# Google Gemini
export GOOGLE_API_KEY="AIza..."
npx ai-mbti-test run --prompt "You are an efficient task manager"

# OpenAI-compatible API (vLLM, LiteLLM, Ollama, etc.)
npx ai-mbti-test run \
  --prompt "You are a local AI assistant" \
  --apiKey "any-key" \
  --apiBase "http://localhost:8000/v1" \
  --model "llama-3"
```

</details>

<details>
<summary><b>Repeat & Benchmark</b></summary>

```bash
# Run 5 times for test-retest reliability analysis
npx ai-mbti-test run \
  --prompt "You are a precise data analyst" \
  --repeat 5

# MBTI only (skip TruthfulQA benchmark)
npx ai-mbti-test run \
  --prompt "You are a helpful assistant" \
  --skip-benchmark

# Combine: 3 repetitions without benchmark
npx ai-mbti-test run \
  --prompt "You are a creative writer" \
  --repeat 3 --skip-benchmark
```

</details>

<details>
<summary><b>Example Output</b></summary>

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 MBTI Type: INTJ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scores:
  E: 38 / I: 82
  S: 42 / N: 78
  T: 85 / F: 35
  J: 79 / P: 41

📈 Telemetry:
  Total time: 45.2s
  Avg response: 753ms
  Retries: 2/60 questions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 TruthfulQA Benchmark Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Accuracy: 13/15 (86.7%)
  Hallucination rate: 13.3%

  By category:
    science: 5/5 (100%)
    math: 3/3 (100%)
    geography: 2/2 (100%)
    history: 2/2 (100%)
    misconception: 0/2 (0%)
    literature: 1/1 (100%)

📤 Submitting results...

✅ View your results: https://example.com/result/a1b2c3d4-...
```

</details>

<details>
<summary><b>Example Output (--repeat 3)</b></summary>

```
═══════════════════════════════════════════
  Run 1/3
═══════════════════════════════════════════
🎯 MBTI Type: INTJ
...

═══════════════════════════════════════════
  Run 2/3
═══════════════════════════════════════════
🎯 MBTI Type: INTJ
...

═══════════════════════════════════════════
  Run 3/3
═══════════════════════════════════════════
🎯 MBTI Type: INFJ
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Aggregate Stats (3 runs)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Type distribution:
    INTJ: 2/3 (67%)
    INFJ: 1/3 (33%)
  Type stability: 66.7%
  Consistency score: 89.2/100

  Dimension stability (mean ± stddev):
    E: 38.3±1.2 / I: 81.7±1.2
    S: 42.0±2.1 / N: 78.0±2.1
    T: 72.3±14.5 / F: 47.7±14.5
    J: 79.0±0.8 / P: 41.0±0.8

  Hallucination rate: 13.3% ± 4.7%
```

</details>

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
│   ├── shared/           # Shared module (questions, scoring, types) — published as @mbti/shared
│   │   └── src/
│   │       ├── questions.ts           # 60 MBTI questions
│   │       ├── scoring.ts             # Score computation & type determination
│   │       ├── types.ts               # Shared TypeScript types
│   │       ├── truthfulqa.ts          # 15 TruthfulQA factual questions
│   │       └── truthfulqa-scoring.ts  # Keyword-based scoring logic
│   └── cli/              # CLI tool — published as ai-mbti-test
│       └── src/
│           ├── index.ts        # Entry point + subcommand routing
│           ├── llm.ts          # Multi-provider LLM integration
│           ├── runner.ts       # Test orchestration with telemetry
│           ├── submit.ts       # Result submission
│           ├── benchmark.ts    # TruthfulQA benchmark runner
│           └── stats.ts        # Aggregate statistics for --repeat
├── package.json          # npm workspaces root
└── tsconfig.base.json
```

> **Web dashboard** is maintained in a separate repository: [mbti-for-ai-agents-web](https://github.com/ingeun92/mbti-for-ai-agents-web)

---

## Development

### Prerequisites

- Node.js >= 20
- npm (or pnpm)

### Setup

```bash
git clone https://github.com/ingeun92/mbti-for-ai-agents.git
cd mbti-for-ai-agents
npm install
```

### Build

```bash
# Build all packages
npm run build

# CLI only
cd packages/cli && npm run build
```

### Run Tests

```bash
# All tests
npm test

# Shared package tests only
cd packages/shared && npm test
```

### CLI Development (watch mode)

```bash
cd packages/cli && npm run dev
```

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Monorepo | npm workspaces |
| Shared | TypeScript, tsup |
| CLI | TypeScript, Commander.js, OpenAI SDK |
| Build | tsup |

---

## Related

- [Web Dashboard](https://github.com/ingeun92/mbti-for-ai-agents-web) — Next.js web service for viewing MBTI results

---

## License

[MIT](./LICENSE)
