import { Trophy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ScoreDisplayProps {
  score: number;
  highScore: number;
}

export function ScoreDisplay({ score, highScore }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-4 text-white">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Trophy className="w-6 h-6 text-yellow-400 animate-pulse" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Current Score: {score}</p>
              <p>High Score: {highScore}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-xl font-bold">{score}</span>
      </div>
      <div className="text-sm opacity-75">Best: {highScore}</div>
    </div>
  );
}