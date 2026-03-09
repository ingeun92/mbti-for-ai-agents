import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { mbtiDescriptions } from '@/lib/mbti-descriptions';
import RadarChart from '@/components/RadarChart';
import ScoreBreakdown from '@/components/ScoreBreakdown';
import TypeDescription from '@/components/TypeDescription';
import CopyButton from '@/components/CopyButton';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const test = await prisma.test.findUnique({ where: { id } });

  if (!test) return { title: 'Result Not Found' };

  const info = mbtiDescriptions[test.mbtiResult];
  const title = `AI Agent MBTI: ${test.mbtiResult} - ${info?.title ?? ''}`;
  const description = `This AI agent's personality type is ${test.mbtiResult}. ${info?.description?.slice(0, 120) ?? ''}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const { id } = await params;
  const test = await prisma.test.findUnique({ where: { id } });

  if (!test) notFound();

  const scores = JSON.parse(test.scores) as {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };

  const info = mbtiDescriptions[test.mbtiResult];

  return (
    <div className="space-y-10 py-6">
      {/* Hero: MBTI Type */}
      <section className="text-center space-y-3">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
          AI Agent Personality Type
        </p>
        <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tight bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent leading-none py-2">
          {test.mbtiResult}
        </h1>
        {info && (
          <p className="text-2xl font-semibold text-gray-300">{info.title}</p>
        )}
      </section>

      {/* Type Description */}
      <TypeDescription mbtiType={test.mbtiResult} />

      {/* Radar Chart */}
      <section className="bg-gray-800/30 rounded-2xl border border-gray-700 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Personality Radar</h2>
        <RadarChart scores={scores} />
      </section>

      {/* Score Breakdown */}
      <section className="bg-gray-800/30 rounded-2xl border border-gray-700 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Dimension Breakdown</h2>
        <ScoreBreakdown scores={scores} />
      </section>

      {/* AI Prompt Used */}
      <section className="rounded-2xl border border-gray-700/50 bg-gray-900/50 p-5 space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          System Prompt Analyzed
        </p>
        <p className="text-gray-400 text-sm leading-relaxed break-words">
          {test.aiPrompt}
        </p>
      </section>

      {/* Share Section */}
      <section className="rounded-2xl border border-violet-700/30 bg-violet-900/10 p-6 space-y-4 text-center">
        <h2 className="text-lg font-semibold text-white">Share This Result</h2>
        <p className="text-gray-400 text-sm">
          Show the world what personality type your AI agent is.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <code className="flex-1 max-w-md text-xs text-gray-300 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 break-all font-mono">
            /result/{id}
          </code>
          <CopyButton id={id} mbtiResult={test.mbtiResult} />
        </div>
      </section>

      {/* Footer note */}
      <p className="text-center text-gray-600 text-xs">
        Tested on{' '}
        {new Date(test.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </div>
  );
}
