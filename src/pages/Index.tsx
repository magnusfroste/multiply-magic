import { useState, useEffect } from "react";
import { GameCard } from "@/components/GameCard";
import { NumberInput } from "@/components/NumberInput";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Star, Frown, Smile } from "lucide-react";

export default function Index() {
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { toast } = useToast();

  const generateQuestion = () => {
    // Start with easier numbers (1,2,5,10) and gradually increase difficulty
    const numbers = score < 5 ? [1, 2, 5, 10] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const randomNum1 = numbers[Math.floor(Math.random() * numbers.length)];
    const randomNum2 = numbers[Math.floor(Math.random() * numbers.length)];
    setNum1(randomNum1);
    setNum2(randomNum2);
    setAnswer("");
    setIsCorrect(null);
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

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="min-h-screen bg-game-background p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Space Math!</h1>
          <ScoreDisplay score={score} highScore={highScore} />
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