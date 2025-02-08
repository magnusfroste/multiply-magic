import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface ScoreData {
  id: number;
  score: number;
  timestamp: string;
}

// We'll keep scores in memory since we don't have a backend
let scoreHistory: ScoreData[] = [];

export function ScoreHistory() {
  const queryClient = useQueryClient();

  const { data: scores } = useQuery({
    queryKey: ['scores'],
    queryFn: () => scoreHistory,
  });

  // Export this function to be used in Index.tsx
  const addScore = (newScore: number) => {
    const newEntry = {
      id: scoreHistory.length + 1,
      score: newScore,
      timestamp: new Date().toLocaleDateString()
    };
    scoreHistory = [...scoreHistory, newEntry];
    queryClient.setQueryData(['scores'], scoreHistory);
  };

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

// Export the addScore function
export const scoreHistoryUtils = {
  addScore: (score: number) => {
    const newEntry = {
      id: scoreHistory.length + 1,
      score: score,
      timestamp: new Date().toLocaleDateString()
    };
    scoreHistory = [...scoreHistory, newEntry];
  }
};
