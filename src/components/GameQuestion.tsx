import { Button } from "@/components/ui/button";
import { Smile, Frown } from "lucide-react";

interface GameQuestionProps {
  num1: number;
  num2: number;
  questionPart: string;
  options: number[];
  isCorrect: boolean | null;
  selectedAnswer: number | null;
  isGameActive: boolean;
  onOptionClick: (value: number) => void;
  getSuccessMessage: () => { text: string; icon: string };
  getEncouragementMessage: () => { text: string; icon: string };
}

export function GameQuestion({
  num1,
  num2,
  questionPart,
  options,
  isCorrect,
  selectedAnswer,
  isGameActive,
  onOptionClick,
  getSuccessMessage,
  getEncouragementMessage,
}: GameQuestionProps) {
  const correctAnswer = (() => {
    switch (questionPart) {
      case "first":
        return num1;
      case "second":
        return num2;
      case "result":
        return num1 * num2;
      default:
        return num1 * num2;
    }
  })();

  return (
    <div className="text-center">
      <div className="text-4xl font-bold mb-6 text-white flex items-center justify-center gap-4">
        {questionPart === "first" ? (
          <div className="flex items-center gap-2">
            <span className="w-24">{selectedAnswer !== null ? selectedAnswer : "?"}</span>
            {isCorrect === false && (
              <span className="text-green-500">{correctAnswer}</span>
            )}
          </div>
        ) : (
          <span>{num1}</span>
        )}
        <span>×</span>
        {questionPart === "second" ? (
          <div className="flex items-center gap-2">
            <span className="w-24">{selectedAnswer !== null ? selectedAnswer : "?"}</span>
            {isCorrect === false && (
              <span className="text-green-500">{correctAnswer}</span>
            )}
          </div>
        ) : (
          <span>{num2}</span>
        )}
        <span>=</span>
        {questionPart === "result" ? (
          <div className="flex items-center gap-2">
            <span className="w-24">{selectedAnswer !== null ? selectedAnswer : "?"}</span>
            {isCorrect === false && (
              <span className="text-green-500">{correctAnswer}</span>
            )}
          </div>
        ) : (
          <span>{num1 * num2}</span>
        )}
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-5 gap-1.5 md:gap-3 mb-4">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onOptionClick(option)}
            disabled={isCorrect !== null}
            variant="outline"
            className={`text-2xl font-bold aspect-square min-h-[50px] md:min-h-[80px] select-none active:scale-95 touch-manipulation ${
              selectedAnswer === option
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
        <div className={`flex items-center justify-center gap-2 text-xl font-bold ${isCorrect ? "text-green-400" : "text-amber-400"}`}>
          {isCorrect ? (
            <>
              <Smile className="w-6 h-6" />
              <span className="animate-bounce">
                {getSuccessMessage().icon} {getSuccessMessage().text}
              </span>
            </>
          ) : (
            <>
              <Frown className="w-6 h-6" />
              <span>
                {getEncouragementMessage().icon} {getEncouragementMessage().text}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}