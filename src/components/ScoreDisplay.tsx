import { Trophy } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  highScore: number;
}

export function ScoreDisplay({ score, highScore }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-4 text-white">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <span className="text-xl font-bold">{score}</span>
      </div>
      <div className="text-sm opacity-75">High Score: {highScore}</div>
    </div>
  );
}