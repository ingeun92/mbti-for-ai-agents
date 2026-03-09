import { mbtiDescriptions } from '@/lib/mbti-descriptions';

interface Props {
  mbtiType: string;
}

export default function TypeDescription({ mbtiType }: Props) {
  const info = mbtiDescriptions[mbtiType];
  if (!info) return null;

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-1">{info.title}</h3>
      <p className="text-gray-300 mb-4 leading-relaxed">{info.description}</p>
      <div className="flex flex-wrap gap-2">
        {info.traits.map((trait) => (
          <span
            key={trait}
            className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm font-medium"
          >
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
}
