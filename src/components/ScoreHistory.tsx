import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';

interface ScoreData {
  id: number;
  score: number;
  timestamp: string;
}

const mockScoreData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  score: Math.floor(Math.random() * 50),
  timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString()
}));

export function ScoreHistory() {
  const { data: scores } = useQuery({
    queryKey: ['scores'],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      return mockScoreData;
    },
  });

  if (!scores) return null;

  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-semibold mb-4">Score History</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={scores}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={{ fill: '#8B5CF6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}