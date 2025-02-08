
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

  if (!scores) return null;

  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-semibold mb-4">Score History</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={scores} margin={{ top: 5, right: 20, bottom: 20, left: 20 }}>
          <XAxis 
            dataKey="timestamp" 
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
            tick={{ fontSize: 12 }}
          />
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
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    scoreHistory = [...scoreHistory, newEntry];
    // Update the query cache immediately after modifying the data
    const queryClient = useQueryClient();
    queryClient.setQueryData(['scores'], scoreHistory);
  }
};
