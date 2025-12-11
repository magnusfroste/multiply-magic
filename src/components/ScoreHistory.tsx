import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { scoreStorage } from "@/lib/scoreStorage";

export function ScoreHistory() {
  const { data: scores } = useQuery({
    queryKey: scoreStorage.getQueryKey(),
    queryFn: scoreStorage.getScores,
  });

  if (!scores || scores.length === 0) return null;

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
            dot={{ fill: "#8B5CF6", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
