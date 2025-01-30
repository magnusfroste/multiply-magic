import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/GameCard";

interface GameOverProps {
  score: number;
  onStartOver: () => void;
}

export function GameOver({ score, onStartOver }: GameOverProps) {
  return (
    <GameCard className="mb-6">
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Time's Up!</h2>
        <p className="text-white mb-4">Final Score: {score}</p>
        <Button onClick={onStartOver} className="bg-game-primary hover:bg-game-primary/80">
          Play Again
        </Button>
      </div>
    </GameCard>
  );
}