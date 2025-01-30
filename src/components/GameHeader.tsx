import { Brain, RotateCcw, Settings2, Swords, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SettingsContent } from "@/components/SettingsContent";

interface GameHeaderProps {
  score: number;
  highScore: number;
  timeLeft: number;
  isTrainingMode: boolean;
  onTrainingModeToggle: () => void;
  onStartOver: () => void;
  selectedTables: number[];
  onTableToggle: (table: number) => void;
  selectedTrainingTable: number;
  allowedQuestionParts: string[];
  onQuestionPartToggle: (part: string) => void;
}

export function GameHeader({
  score,
  highScore,
  timeLeft,
  isTrainingMode,
  onTrainingModeToggle,
  onStartOver,
  selectedTables,
  onTableToggle,
  selectedTrainingTable,
  allowedQuestionParts,
  onQuestionPartToggle,
}: GameHeaderProps) {
  return (
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-white">Space Math!</h1>
      <div className="flex items-center gap-4">
        {!isTrainingMode && (
          <div className={`flex items-center gap-2 text-white bg-game-primary/20 p-3 rounded-lg ${
            timeLeft <= 10 ? 'animate-pulse bg-pink-500/20' : ''
          }`}>
            <Timer className="w-6 h-6" />
            <span className="text-2xl font-bold font-mono">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        )}
        <ScoreDisplay score={score} highScore={highScore} />
        <Button
          variant="outline"
          size="icon"
          onClick={onTrainingModeToggle}
          className="bg-transparent border-white text-white hover:bg-white/20"
          title={isTrainingMode ? "Switch to Test Mode" : "Switch to Training Mode"}
        >
          {isTrainingMode ? <Swords className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onStartOver}
          className="bg-transparent border-white text-white hover:bg-white/20"
          title="Start Over"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent border-white text-white hover:bg-white/20"
              title="Settings"
            >
              <Settings2 className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {isTrainingMode ? "Select Training Table" : "Parent Settings"}
              </SheetTitle>
            </SheetHeader>
            <SettingsContent
              isTrainingMode={isTrainingMode}
              selectedTables={selectedTables}
              onTableToggle={onTableToggle}
              selectedTrainingTable={selectedTrainingTable}
              allowedQuestionParts={allowedQuestionParts}
              onQuestionPartToggle={onQuestionPartToggle}
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}