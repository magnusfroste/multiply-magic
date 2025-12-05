import { Flame, RotateCcw, Settings2, Timer, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { isSoundMuted, toggleMute } from "@/lib/sounds";
import { Button } from "@/components/ui/button";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SettingsContent } from "@/components/SettingsContent";
import { ScoreHistory } from "@/components/ScoreHistory";

interface GameHeaderProps {
  score: number;
  highScore: number;
  timeLeft: number;
  streak: number;
  bestStreak: number;
  onStartOver: () => void;
  selectedTables: number[];
  onTableToggle: (table: number) => void;
  allowedQuestionParts: string[];
  onQuestionPartToggle: (part: string) => void;
}

export function GameHeader({
  score,
  highScore,
  timeLeft,
  streak,
  bestStreak,
  onStartOver,
  selectedTables,
  onTableToggle,
  allowedQuestionParts,
  onQuestionPartToggle,
}: GameHeaderProps) {
  const [muted, setMuted] = useState(isSoundMuted());
  
  const handleMuteToggle = () => {
    const newMuted = toggleMute();
    setMuted(newMuted);
  };

  const timePercentage = (timeLeft / 60) * 100;
  const getTimerColor = () => {
    if (timeLeft <= 10) return "bg-red-500";
    if (timeLeft <= 20) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="mb-8 flex flex-col gap-4">
      {/* Progress bar */}
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getTimerColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${timePercentage}%` }}
        />
      </div>
      
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`flex items-center gap-2 text-white bg-game-primary/20 p-2 rounded-lg ${
            timeLeft <= 10 ? "animate-pulse" : ""
          }`}>
            <Timer className="w-4 h-4" />
            <span className="font-mono text-sm">{timeLeft}s</span>
          </div>
          <ScoreDisplay score={score} highScore={highScore} />
          {streak > 0 && (
            <div className={`flex items-center gap-2 text-orange-400 bg-orange-500/20 p-2 rounded-lg ${
              streak >= 5 ? "animate-pulse" : ""
            }`}>
              <Flame className={`w-4 h-4 ${streak >= 3 ? "text-orange-500" : ""}`} />
              <span className="font-mono font-bold text-sm">{streak}</span>
              {bestStreak > 0 && streak < bestStreak && (
                <span className="text-xs text-orange-300/60">/{bestStreak}</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={handleMuteToggle}
            className="bg-transparent border-2 border-white text-white hover:bg-white/20"
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onStartOver}
            className="bg-transparent border-2 border-white text-white hover:bg-white/20"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-2 border-white text-white hover:bg-white/20"
                title="Settings"
              >
                <Settings2 className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SettingsContent
                selectedTables={selectedTables}
                onTableToggle={onTableToggle}
                allowedQuestionParts={allowedQuestionParts}
                onQuestionPartToggle={onQuestionPartToggle}
              />
              <div className="mt-8">
                <ScoreHistory />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}