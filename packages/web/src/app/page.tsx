const MBTI_TYPES = [
  { type: 'INTJ', label: 'Architect', color: 'bg-violet-900/40 border-violet-700/50 text-violet-300' },
  { type: 'INTP', label: 'Logician', color: 'bg-violet-900/40 border-violet-700/50 text-violet-300' },
  { type: 'ENTJ', label: 'Commander', color: 'bg-violet-900/40 border-violet-700/50 text-violet-300' },
  { type: 'ENTP', label: 'Debater', color: 'bg-violet-900/40 border-violet-700/50 text-violet-300' },
  { type: 'INFJ', label: 'Advocate', color: 'bg-emerald-900/40 border-emerald-700/50 text-emerald-300' },
  { type: 'INFP', label: 'Mediator', color: 'bg-emerald-900/40 border-emerald-700/50 text-emerald-300' },
  { type: 'ENFJ', label: 'Protagonist', color: 'bg-emerald-900/40 border-emerald-700/50 text-emerald-300' },
  { type: 'ENFP', label: 'Campaigner', color: 'bg-emerald-900/40 border-emerald-700/50 text-emerald-300' },
  { type: 'ISTJ', label: 'Logistician', color: 'bg-sky-900/40 border-sky-700/50 text-sky-300' },
  { type: 'ISFJ', label: 'Defender', color: 'bg-sky-900/40 border-sky-700/50 text-sky-300' },
  { type: 'ESTJ', label: 'Executive', color: 'bg-sky-900/40 border-sky-700/50 text-sky-300' },
  { type: 'ESFJ', label: 'Consul', color: 'bg-sky-900/40 border-sky-700/50 text-sky-300' },
  { type: 'ISTP', label: 'Virtuoso', color: 'bg-amber-900/40 border-amber-700/50 text-amber-300' },
  { type: 'ISFP', label: 'Adventurer', color: 'bg-amber-900/40 border-amber-700/50 text-amber-300' },
  { type: 'ESTP', label: 'Entrepreneur', color: 'bg-amber-900/40 border-amber-700/50 text-amber-300' },
  { type: 'ESFP', label: 'Entertainer', color: 'bg-amber-900/40 border-amber-700/50 text-amber-300' },
];

const STEPS = [
  {
    number: '1',
    title: 'Install & Run CLI',
    description: 'Run the CLI tool with your AI agent\'s system prompt and API key. No setup required — just npx.',
    icon: '⚙️',
    accent: 'from-violet-500 to-purple-600',
    border: 'border-violet-700/40',
    bg: 'bg-violet-900/20',
  },
  {
    number: '2',
    title: 'AI Takes the Test',
    description: 'The tool sends structured MBTI questionnaire prompts to your agent and collects its responses automatically.',
    icon: '🤖',
    accent: 'from-sky-500 to-cyan-600',
    border: 'border-sky-700/40',
    bg: 'bg-sky-900/20',
  },
  {
    number: '3',
    title: 'View Results',
    description: 'Get a detailed personality profile with your agent\'s MBTI type, trait scores, and a shareable results URL.',
    icon: '📊',
    accent: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-700/40',
    bg: 'bg-emerald-900/20',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-8 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-400 text-sm mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Personality analysis for AI agents
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            What&apos;s Your AI
          </span>
          <br />
          <span className="text-white">Agent&apos;s MBTI?</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed">
          Run a single CLI command to discover the personality type of any AI agent.
          Understand how your agent thinks, decides, and interacts — through the lens of MBTI.
        </p>

        {/* CLI Command Block */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="rounded-xl border border-gray-700 bg-gray-900 overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              <span className="ml-3 text-gray-500 text-xs font-mono">terminal</span>
            </div>
            <div className="px-5 py-4 text-left">
              <p className="font-mono text-sm sm:text-base">
                <span className="text-gray-500 select-none">$ </span>
                <span className="text-emerald-400">npx</span>
                <span className="text-white"> ai-mbti-test</span>
                <span className="text-sky-400"> --prompt</span>
                <span className="text-amber-300"> &quot;You are a helpful assistant...&quot;</span>
                <span className="text-sky-400"> --apiKey</span>
                <span className="text-amber-300"> &quot;sk-...&quot;</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">How It Works</h2>
          <p className="text-gray-400">Three simple steps to uncover your agent&apos;s personality</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className={`relative rounded-2xl border ${step.border} ${step.bg} p-6 space-y-4 backdrop-blur-sm`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${step.accent} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {step.number}
                </div>
                <div className="text-3xl">{step.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What It Does Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Why Analyze Your Agent?</h2>
          <p className="text-gray-400 leading-relaxed">
            Every AI agent has a unique personality shaped by its system prompt, training, and design.
            By applying the MBTI framework, you can gain structured insight into how your agent approaches
            problems, communicates, and makes decisions.
          </p>
          <ul className="space-y-3">
            {[
              'Compare personalities across different agent configurations',
              'Understand strengths and blind spots in your agent\'s behavior',
              'Share results with your team or the AI community',
              'Track personality shifts as you refine your prompts',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-300">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs">✓</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-700 bg-gray-900/50 p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Sample Output</h3>
          <div className="space-y-2 font-mono text-sm">
            <p className="text-gray-500"># Analyzing agent personality...</p>
            <p className="text-gray-300">Running questionnaire <span className="text-sky-400">[36/36]</span></p>
            <p className="text-gray-300">Processing responses...</p>
            <p className="text-gray-500 mt-3"># Results</p>
            <p><span className="text-gray-400">Type:   </span><span className="text-violet-400 font-bold">INTJ</span> <span className="text-gray-500">(Architect)</span></p>
            <p><span className="text-gray-400">E/I:    </span><span className="text-sky-400">Introvert</span> <span className="text-gray-500">78%</span></p>
            <p><span className="text-gray-400">S/N:    </span><span className="text-sky-400">Intuitive</span> <span className="text-gray-500">85%</span></p>
            <p><span className="text-gray-400">T/F:    </span><span className="text-sky-400">Thinking</span> <span className="text-gray-500">91%</span></p>
            <p><span className="text-gray-400">J/P:    </span><span className="text-sky-400">Judging</span> <span className="text-gray-500">72%</span></p>
            <p className="text-gray-300 mt-3">View full report: <span className="text-emerald-400 underline">https://mbti.ai/r/abc123</span></p>
          </div>
        </div>
      </section>

      {/* MBTI Types Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">All 16 Personality Types</h2>
          <p className="text-gray-400">Which one is your AI agent?</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MBTI_TYPES.map(({ type, label, color }) => (
            <div
              key={type}
              className={`rounded-xl border ${color} p-4 text-center space-y-1 hover:scale-105 transition-transform duration-200`}
            >
              <div className="text-lg font-bold">{type}</div>
              <div className="text-xs opacity-70">{label}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm">
          Color groups: <span className="text-violet-400">Analysts</span> · <span className="text-emerald-400">Diplomats</span> · <span className="text-sky-400">Sentinels</span> · <span className="text-amber-400">Explorers</span>
        </p>
      </section>
    </div>
  );
}
