'use client';

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

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

export default function RadarChart({ scores }: Props) {
  const data = [
    { dimension: 'E', value: scores.E, fullMark: 35 },
    { dimension: 'N', value: scores.N, fullMark: 35 },
    { dimension: 'F', value: scores.F, fullMark: 35 },
    { dimension: 'P', value: scores.P, fullMark: 35 },
    { dimension: 'I', value: scores.I, fullMark: 35 },
    { dimension: 'S', value: scores.S, fullMark: 35 },
    { dimension: 'T', value: scores.T, fullMark: 35 },
    { dimension: 'J', value: scores.J, fullMark: 35 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#374151" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: '#9ca3af', fontSize: 14, fontWeight: 600 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 35]}
          tick={false}
          axisLine={false}
        />
        <Radar
          name="Score"
          dataKey="value"
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '8px',
          }}
          labelStyle={{ color: '#e5e7eb' }}
          itemStyle={{ color: '#8b5cf6' }}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
