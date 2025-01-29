import { useState, useEffect } from "react";
import { GameCard } from "@/components/GameCard";
import { NumberInput } from "@/components/NumberInput";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Star, Frown, Smile, RotateCcw, Settings2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Index() {
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedTables, setSelectedTables] = useState<number[]>([1, 2, 5, 10]);
  const { toast } = useToast();

  const allTables = Array.from({ length: 10 }, (_, i) => i + 1);

  const generateQuestion = () => {
    if (selectedTables.length === 0) {
      toast({
        title: "No tables selected",
        description: "Please select at least one multiplication table in settings.",
        duration: 3000,
      });
      return;
    }

    const randomNum1 = selectedTables[Math.floor(Math.random() * selectedTables.length)];
    const randomNum2 = allTables[Math.floor(Math.random() * allTables.length)];
    setNum1(randomNum1);
    setNum2(randomNum2);
    setAnswer("");
    setIsCorrect(null);
  };

  const startOver = () => {
    setScore(0);
    setAnswer("");
    setIsCorrect(null);
    generateQuestion();
    toast({
      title: "Game Reset!",
      description: "Let's start a new game!",
      duration: 2000,
    });
  };

  const checkAnswer = () => {
    const userAnswer = parseInt(answer);
    const correctAnswer = num1 * num2;
    
    if (userAnswer === correctAnswer) {
      setIsCorrect(true);
      setScore(score + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
      toast({
        title: "Correct! 🎉",
        description: "Keep up the great work!",
        duration: 2000,
      });
      setTimeout(generateQuestion, 1500);
    } else {
      setIsCorrect(false);
      toast({
        title: "Not quite right",
        description: `${num1} × ${num2} = ${correctAnswer}. Let's try another one!`,
        duration: 3000,
      });
      setTimeout(generateQuestion, 3000);
    }
  };

  const handleTableToggle = (table: number) => {
    setSelectedTables((current) => {
      const updated = current.includes(table)
        ? current.filter((t) => t !== table)
        : [...current, table].sort((a, b) => a - b);
      
      if (updated.length === 0) {
        toast({
          title: "Warning",
          description: "You must keep at least one table selected",
          duration: 3000,
        });
        return current;
      }
      return updated;
    });
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="min-h-screen bg-game-background p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Space Math!</h1>
          <div className="flex items-center gap-4">
            <ScoreDisplay score={score} highScore={highScore} />
            <Button 
              variant="outline" 
              size="icon"
              onClick={startOver}
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
                  <SheetTitle>Parent Settings</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <h3 className="mb-4 text-sm font-medium">Select Multiplication Tables:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {allTables.map((table) => (
                      <div key={table} className="flex items-center space-x-2">
                        <Checkbox
                          id={`table-${table}`}
                          checked={selectedTables.includes(table)}
                          onCheckedChange={() => handleTableToggle(table)}
                          disabled={selectedTables.length === 1 && selectedTables.includes(table)}
                        />
                        <label
                          htmlFor={`table-${table}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {table}x Table
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <GameCard className="mb-6 animate-float">
          <div className="text-center">
            <div className="text-4xl font-bold mb-6 text-white flex items-center justify-center gap-4">
              <span>{num1}</span>
              <span>×</span>
              <span>{num2}</span>
              <span>=</span>
              <NumberInput
                value={answer}
                onChange={setAnswer}
                className="w-24"
                placeholder="?"
                disabled={isCorrect !== null}
              />
            </div>
            
            {isCorrect === null && (
              <Button 
                onClick={checkAnswer}
                className="bg-game-primary hover:bg-game-secondary transition-colors"
                disabled={!answer}
              >
                Check Answer
              </Button>
            )}

            {isCorrect !== null && (
              <div className={`flex items-center justify-center gap-2 text-xl font-bold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                {isCorrect ? (
                  <>
                    <Smile className="w-6 h-6" />
                    <span>Great job!</span>
                  </>
                ) : (
                  <>
                    <Frown className="w-6 h-6" />
                    <span>Keep trying!</span>
                  </>
                )}
              </div>
            )}
          </div>
        </GameCard>

        <div className="flex justify-center gap-2">
          {[...Array(score)].map((_, i) => (
            <Star key={i} className="w-6 h-6 text-yellow-400 animate-celebrate" />
          ))}
        </div>
      </div>
    </div>
  );
}