import { useState, useEffect } from "react";
import { GameCard } from "@/components/GameCard";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Star, Frown, Smile, RotateCcw, Settings2, Brain, Swords } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { TrainingMode } from "@/components/TrainingMode";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type QuestionPart = "first" | "second" | "result";

export default function Index() {
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedTables, setSelectedTables] = useState<number[]>([1, 2, 5, 10]);
  const [isTrainingMode, setIsTrainingMode] = useState(false);
  const [selectedTrainingTable, setSelectedTrainingTable] = useState(5);
  const [questionPart, setQuestionPart] = useState<QuestionPart>("result");
  const [allowedQuestionParts, setAllowedQuestionParts] = useState<QuestionPart[]>(["result"]);
  const [options, setOptions] = useState<number[]>([]);
  const { toast } = useToast();

  const allTables = Array.from({ length: 10 }, (_, i) => i + 1);

  const generateOptions = (correctAnswer: number) => {
    const options = new Set<number>();
    options.add(correctAnswer);
    
    while (options.size < 5) {
      const offset = Math.floor(Math.random() * 5) + 1;
      const isAdd = Math.random() > 0.5;
      const wrongAnswer = isAdd ? correctAnswer + offset : correctAnswer - offset;
      
      if (wrongAnswer > 0) {
        options.add(wrongAnswer);
      }
    }
    
    return Array.from(options).sort((a, b) => a - b);
  };

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

    const correctAnswer = randomNum1 * randomNum2;
    const newOptions = generateOptions(correctAnswer);
    setOptions(newOptions);

    if (allowedQuestionParts.length > 0) {
      const randomPart = allowedQuestionParts[Math.floor(Math.random() * allowedQuestionParts.length)];
      setQuestionPart(randomPart);
    }
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
    let isAnswerCorrect = false;
    let correctAnswer: number;

    switch (questionPart) {
      case "first":
        correctAnswer = num1;
        isAnswerCorrect = userAnswer === correctAnswer;
        break;
      case "second":
        correctAnswer = num2;
        isAnswerCorrect = userAnswer === correctAnswer;
        break;
      case "result":
        correctAnswer = num1 * num2;
        isAnswerCorrect = userAnswer === correctAnswer;
        break;
    }

    console.log('User answer:', userAnswer);
    console.log('Correct answer:', correctAnswer);
    console.log('Question part:', questionPart);
    
    if (isAnswerCorrect) {
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
      let errorMessage = "";
      switch (questionPart) {
        case "first":
          errorMessage = `The first number should be ${num1}`;
          break;
        case "second":
          errorMessage = `The second number should be ${num2}`;
          break;
        case "result":
          errorMessage = `${num1} × ${num2} = ${num1 * num2}`;
          break;
      }
      
      toast({
        title: "Not quite right",
        description: `${errorMessage}. Let's try another one!`,
        duration: 3000,
      });
      setTimeout(generateQuestion, 3000);
    }
  };

  const handleTableToggle = (table: number) => {
    if (isTrainingMode) {
      setSelectedTrainingTable(table);
      setIsTrainingMode(true);
      return;
    }

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

  const handleQuestionPartToggle = (part: QuestionPart) => {
    setAllowedQuestionParts((current) => {
      const updated = current.includes(part)
        ? current.filter((p) => p !== part)
        : [...current, part];
      
      if (updated.length === 0) {
        toast({
          title: "Warning",
          description: "You must keep at least one question type selected",
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

  const handleOptionClick = (value: number) => {
    if (isCorrect !== null) return;
    setAnswer(value.toString());
    setTimeout(() => {
      checkAnswer();
    }, 100);
  };

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
              onClick={() => setIsTrainingMode(!isTrainingMode)}
              className="bg-transparent border-white text-white hover:bg-white/20"
              title={isTrainingMode ? "Switch to Test Mode" : "Switch to Training Mode"}
            >
              {isTrainingMode ? <Swords className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
            </Button>
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
                  <SheetTitle>
                    {isTrainingMode ? "Select Training Table" : "Parent Settings"}
                  </SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <h3 className="mb-4 text-sm font-medium">
                    {isTrainingMode ? "Select a table to practice:" : "Select Multiplication Tables:"}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {allTables.map((table) => (
                      <div key={table} className="flex items-center space-x-2">
                        <Checkbox
                          id={`table-${table}`}
                          checked={isTrainingMode ? selectedTrainingTable === table : selectedTables.includes(table)}
                          onCheckedChange={() => handleTableToggle(table)}
                          disabled={!isTrainingMode && selectedTables.length === 1 && selectedTables.includes(table)}
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

                  {!isTrainingMode && (
                    <div className="mt-8">
                      <h3 className="mb-4 text-sm font-medium">Question Types:</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="first-number"
                            checked={allowedQuestionParts.includes("first")}
                            onCheckedChange={() => handleQuestionPartToggle("first")}
                            disabled={allowedQuestionParts.length === 1 && allowedQuestionParts.includes("first")}
                          />
                          <label htmlFor="first-number">Hide First Number</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="second-number"
                            checked={allowedQuestionParts.includes("second")}
                            onCheckedChange={() => handleQuestionPartToggle("second")}
                            disabled={allowedQuestionParts.length === 1 && allowedQuestionParts.includes("second")}
                          />
                          <label htmlFor="second-number">Hide Second Number</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="result"
                            checked={allowedQuestionParts.includes("result")}
                            onCheckedChange={() => handleQuestionPartToggle("result")}
                            disabled={allowedQuestionParts.length === 1 && allowedQuestionParts.includes("result")}
                          />
                          <label htmlFor="result">Hide Result</label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {isTrainingMode ? (
          <TrainingMode selectedTable={selectedTrainingTable} />
        ) : (
          <>
            <GameCard className="mb-6 animate-float">
              <div className="text-center">
                <div className="text-4xl font-bold mb-6 text-white flex items-center justify-center gap-4">
                  {questionPart === "first" ? (
                    <span className="w-24">?</span>
                  ) : (
                    <span>{num1}</span>
                  )}
                  <span>×</span>
                  {questionPart === "second" ? (
                    <span className="w-24">?</span>
                  ) : (
                    <span>{num2}</span>
                  )}
                  <span>=</span>
                  {questionPart === "result" ? (
                    <span className="w-24">?</span>
                  ) : (
                    <span>{num1 * num2}</span>
                  )}
                </div>
                
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {options.map((option) => (
                    <Button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      disabled={isCorrect !== null}
                      variant="outline"
                      className={`text-xl font-bold ${
                        answer === option.toString()
                          ? isCorrect === true
                            ? "bg-green-500 hover:bg-green-600"
                            : isCorrect === false
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-white/20"
                          : "bg-white/20"
                      } hover:bg-white/30 text-white`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

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
          </>
        )}
      </div>
    </div>
  );
}
