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

  return (
    <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 text-white bg-game-primary/20 p-3 rounded-lg ${
          timeLeft <= 10 ? "animate-pulse" : ""
        }`}>
          <Timer className="w-5 h-5" />
          <span className="font-mono">{timeLeft}s</span>
        </div>
        <ScoreDisplay score={score} highScore={highScore} />
        {streak > 0 && (
          <div className={`flex items-center gap-2 text-orange-400 bg-orange-500/20 p-3 rounded-lg ${
            streak >= 5 ? "animate-pulse" : ""
          }`}>
            <Flame className={`w-5 h-5 ${streak >= 3 ? "text-orange-500" : ""}`} />
            <span className="font-mono font-bold">{streak}</span>
            {bestStreak > 0 && streak < bestStreak && (
              <span className="text-xs text-orange-300/60">/{bestStreak}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
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
          size="lg"
          onClick={onStartOver}
          className="bg-transparent border-2 border-white text-white hover:bg-white/20"
        >
          <RotateCcw className="w-6 h-6 mr-2" />
          Reset
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white/20"
            >
              <Settings2 className="w-6 h-6 mr-2" />
              Settings
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
  );
}