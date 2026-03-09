# MBTI for AI Agents

AI 에이전트의 성격 유형을 MBTI로 분석하는 CLI 도구 + 웹 대시보드 서비스입니다.

60개의 문항을 통해 AI 에이전트가 가진 고유한 사고 방식, 의사결정 패턴, 소통 스타일을 4가지 차원(E/I, S/N, T/F, J/P)으로 측정합니다.

## How It Works

```
1. CLI 실행  →  2. AI가 60문항 응답  →  3. MBTI 산출  →  4. 웹에서 결과 확인
```

1. 사용자가 터미널에서 CLI를 실행합니다
2. CLI가 사용자의 AI 에이전트(LLM)에게 60개 문항을 순차적으로 질문합니다
3. 응답을 기반으로 MBTI 성격 유형과 차원별 점수를 산출합니다
4. 결과가 서버에 저장되고, 시각화된 결과 페이지 URL이 제공됩니다

> 모든 테스트 과정은 **사용자의 로컬 환경**에서 진행되며, 사용자의 API 키를 그대로 사용합니다. 서버에는 최종 결과만 전송됩니다.

---

## Quick Start

### 가장 간단한 방법 (환경변수 자동 감지)

이미 AI 에이전트에서 LLM API를 사용하고 있다면, 환경변수가 설정되어 있을 것입니다. CLI가 자동으로 감지합니다.

```bash
npx ai-mbti-test --prompt "You are a helpful coding assistant that writes clean, efficient code"
```

CLI가 `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY` 중 설정된 것을 자동으로 찾아 사용합니다.

### API 키를 직접 지정하는 방법

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
| `--prompt <text>` | **Yes** | AI 에이전트의 시스템 프롬프트 (성격을 정의하는 지시문) |
| `--provider <name>` | No | LLM 프로바이더: `openai`, `anthropic`, `google` (환경변수에서 자동 감지) |
| `--apiKey <key>` | No | API 키 (환경변수에서 자동 감지) |
| `--model <name>` | No | 모델명 (환경변수 또는 프로바이더 기본값 사용) |
| `--apiBase <url>` | No | OpenAI 호환 API 엔드포인트 URL |
| `--baseUrl <url>` | No | 결과 제출 서버 URL (기본: `http://localhost:3000`) |

### 환경변수 자동 감지

CLI는 다음 환경변수를 순서대로 확인하여 프로바이더와 모델을 자동 결정합니다:

| Provider | API Key 환경변수 | Model 환경변수 | 기본 모델 |
|----------|-----------------|---------------|----------|
| OpenAI | `OPENAI_API_KEY` | `OPENAI_MODEL` | `gpt-4o-mini` |
| Anthropic | `ANTHROPIC_API_KEY` | `ANTHROPIC_MODEL`, `CLAUDE_MODEL` | `claude-sonnet-4-20250514` |
| Google | `GOOGLE_API_KEY`, `GEMINI_API_KEY` | `GOOGLE_MODEL`, `GEMINI_MODEL` | `gemini-2.0-flash` |

---

## Usage Examples

### 다양한 AI 에이전트 테스트하기

```bash
# 코딩 어시스턴트
npx ai-mbti-test --prompt "You are a senior software engineer who values clean architecture and test-driven development"

# 창작 작가
npx ai-mbti-test --prompt "You are a creative fiction writer who loves building immersive worlds and complex characters"

# 데이터 분석가
npx ai-mbti-test --prompt "You are a data scientist who focuses on finding actionable insights from complex datasets"

# 고객 상담원
npx ai-mbti-test --prompt "You are a warm and patient customer support agent who prioritizes user satisfaction"
```

### 다양한 프로바이더 사용

```bash
# Anthropic Claude
export ANTHROPIC_API_KEY="sk-ant-..."
npx ai-mbti-test --prompt "You are a thoughtful research assistant"

# Google Gemini
export GOOGLE_API_KEY="AIza..."
npx ai-mbti-test --prompt "You are an efficient task manager"

# OpenAI 호환 API (vLLM, LiteLLM, Ollama 등)
npx ai-mbti-test \
  --prompt "You are a local AI assistant" \
  --apiKey "any-key" \
  --apiBase "http://localhost:8000/v1" \
  --model "llama-3"
```

### 실행 결과 예시

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
| **E/I** (Extraversion / Introversion) | 소통 스타일 | 협업적 대화 vs 독립적 사고 |
| **S/N** (Sensing / iNtuition) | 인지 방식 | 구체적 사실 vs 추상적 패턴 |
| **T/F** (Thinking / Feeling) | 판단 기준 | 논리적 분석 vs 공감적 고려 |
| **J/P** (Judging / Perceiving) | 실행 방식 | 체계적 계획 vs 유연한 적응 |

각 차원당 15개 문항, 총 **60개 문항**으로 구성되어 있습니다. 각 문항은 1~7점 척도로 측정되며, 16Personalities 테스트 구조를 참고하여 AI 에이전트 특성에 맞게 설계되었습니다.

---

## Project Structure

```
mbti-for-ai-agents/
├── packages/
│   ├── shared/           # 공유 모듈 (문항, 점수 산출, 타입)
│   │   └── src/
│   │       ├── questions.ts    # 60개 MBTI 문항
│   │       ├── scoring.ts      # 점수 산출 및 유형 판정
│   │       └── types.ts        # 공유 TypeScript 타입
│   ├── cli/              # CLI 도구 (npm 패키지)
│   │   └── src/
│   │       ├── index.ts        # Entry point + argument parsing
│   │       ├── llm.ts          # Multi-provider LLM integration
│   │       ├── runner.ts       # Test orchestration
│   │       └── submit.ts       # Result submission
│   └── web/              # 웹 대시보드 (Next.js)
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
# 웹 대시보드 개발 서버
npm run dev

# CLI 개발 빌드 (watch mode)
cd packages/cli && npm run dev
```

### Run Tests

```bash
# 전체 테스트
npm test

# shared 패키지 테스트만
cd packages/shared && npm test
```

### Build

```bash
# 전체 빌드
npm run build

# CLI만 빌드
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
| `POST` | `/api/results` | 테스트 결과 제출 (60개 응답 배열) |
| `GET` | `/api/results/:id` | 특정 결과 조회 |

### POST /api/results

```json
{
  "aiPrompt": "You are a helpful assistant",
  "answers": [5, 3, 2, 6, 4, ...] // 60개 정수 (1-7)
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

MIT
