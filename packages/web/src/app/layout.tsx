import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MBTI for AI Agents',
  description: 'Discover the personality type of your AI agent through MBTI analysis',
  openGraph: {
    title: 'MBTI for AI Agents',
    description: 'Discover the personality type of your AI agent through MBTI analysis',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <header className="border-b border-gray-800">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-white">
              MBTI for AI Agents
            </a>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-800 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
            <p>MBTI for AI Agents - Discover your AI&apos;s personality</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
