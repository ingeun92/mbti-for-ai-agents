'use client';

interface Props {
  scores: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
}

interface DimensionPair {
  left: keyof Props['scores'];
  right: keyof Props['scores'];
}

const PAIRS: DimensionPair[] = [
  { left: 'E', right: 'I' },
  { left: 'S', right: 'N' },
  { left: 'T', right: 'F' },
  { left: 'J', right: 'P' },
];

export default function ScoreBreakdown({ scores }: Props) {
  return (
    <div className="space-y-4">
      {PAIRS.map(({ left, right }) => {
        const leftVal = scores[left];
        const rightVal = scores[right];
        const total = leftVal + rightVal;
        const leftPct = total > 0 ? Math.round((leftVal / total) * 100) : 50;
        const rightPct = 100 - leftPct;
        const dominant = leftVal >= rightVal ? left : right;

        return (
          <div key={`${left}${right}`} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span
                className={`font-bold text-base w-6 text-center ${dominant === left ? 'text-violet-400' : 'text-gray-500'}`}
              >
                {left}
              </span>
              <div className="flex-1 mx-3 flex items-center gap-1">
                {/* Left bar segment */}
                <div className="flex-1 flex justify-end">
                  <div
                    className="h-3 rounded-l-full transition-all duration-500"
                    style={{
                      width: `${leftPct}%`,
                      backgroundColor: dominant === left ? '#8b5cf6' : '#374151',
                    }}
                  />
                </div>
                {/* Center divider */}
                <div className="w-px h-5 bg-gray-600 flex-shrink-0" />
                {/* Right bar segment */}
                <div className="flex-1 flex justify-start">
                  <div
                    className="h-3 rounded-r-full transition-all duration-500"
                    style={{
                      width: `${rightPct}%`,
                      backgroundColor: dominant === right ? '#8b5cf6' : '#374151',
                    }}
                  />
                </div>
              </div>
              <span
                className={`font-bold text-base w-6 text-center ${dominant === right ? 'text-violet-400' : 'text-gray-500'}`}
              >
                {right}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 px-9">
              <span>{leftPct}%</span>
              <span>{rightPct}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
