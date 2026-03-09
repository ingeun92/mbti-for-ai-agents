'use client';

import { useState } from 'react';

interface Props {
  id: string;
  mbtiResult: string;
}

export default function CopyButton({ id, mbtiResult }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/result/${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-semibold text-sm transition-colors duration-200"
    >
      {copied ? 'Copied!' : `Copy Link`}
    </button>
  );
}
