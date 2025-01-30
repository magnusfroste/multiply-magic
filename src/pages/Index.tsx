import { useState, useEffect } from "react";
import { GameCard } from "@/components/GameCard";
import { Star } from "lucide-react";
import { TrainingMode } from "@/components/TrainingMode";
import { GameHeader } from "@/components/GameHeader";
import { GameQuestion } from "@/components/GameQuestion";
import { GameOver } from "@/components/GameOver";

type QuestionPart = "first" | "second" | "result";

export default function Index() {
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedTables, setSelectedTables] = useState<number[]>([1, 2, 5, 10]);
  const [isTrainingMode, setIsTrainingMode] = useState(false);
  const [selectedTrainingTable, setSelectedTrainingTable] = useState(5);
  const [questionPart, setQuestionPart] = useState<QuestionPart>("result");
  const [allowedQuestionParts, setAllowedQuestionParts] = useState<QuestionPart[]>(["result"]);
  const [options, setOptions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isGameActive, setIsGameActive] = useState(true);

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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && timeLeft > 0 && !isTrainingMode) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      if (timeLeft === 10) {
        document.body.style.background = "linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)";
        document.body.style.transition = "background 0.5s ease-in-out";
      }
      
      if (timeLeft === 0) {
        document.body.style.background = "linear-gradient(135deg, #2D1B69 0%, #1E1B4B 100%)";
      }
    }
    return () => {
      clearInterval(timer);
      document.body.style.background = "linear-gradient(135deg, #2D1B69 0%, #1E1B4B 100%)";
    };
  }, [isGameActive, timeLeft, isTrainingMode]);

  const generateQuestion = () => {
    if (!isGameActive) return;
    
    if (selectedTables.length === 0) {
      console.warn("No tables selected");
      return;
    }

    const randomNum1 = selectedTables[Math.floor(Math.random() * selectedTables.length)];
    const randomNum2 = allTables[Math.floor(Math.random() * allTables.length)];
    setNum1(randomNum1);
    setNum2(randomNum2);
    setSelectedAnswer(null);
    setIsCorrect(null);

    let correctAnswer: number;
    if (allowedQuestionParts.length > 0) {
      const randomPart = allowedQuestionParts[Math.floor(Math.random() * allowedQuestionParts.length)];
      setQuestionPart(randomPart);
      
      switch (randomPart) {
        case "first":
          correctAnswer = randomNum1;
          break;
        case "second":
          correctAnswer = randomNum2;
          break;
        case "result":
          correctAnswer = randomNum1 * randomNum2;
          break;
        default:
          correctAnswer = randomNum1 * randomNum2;
      }
    } else {
      correctAnswer = randomNum1 * randomNum2;
    }

    const newOptions = generateOptions(correctAnswer);
    setOptions(newOptions);
  };

  const checkAnswer = (selectedValue: number) => {
    if (!isGameActive) return;

    let correctAnswer: number;
    switch (questionPart) {
      case "first":
        correctAnswer = num1;
        break;
      case "second":
        correctAnswer = num2;
        break;
      case "result":
        correctAnswer = num1 * num2;
        break;
      default:
        correctAnswer = num1 * num2;
    }

    const isAnswerCorrect = selectedValue === correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(score + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
      setTimeout(generateQuestion, 1500);
    } else {
      setScore((prev) => Math.max(0, prev - 1));
      setTimeout(generateQuestion, 2000);
    }
  };

  const handleOptionClick = (value: number) => {
    if (isCorrect !== null || !isGameActive) return;
    setSelectedAnswer(value);
    checkAnswer(value);
  };

  const startOver = () => {
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimeLeft(120);
    setIsGameActive(true);
    generateQuestion();
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
        console.warn("You must keep at least one table selected");
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
        console.warn("You must keep at least one question type selected");
        return current;
      }
      return updated;
    });
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const getSuccessMessage = () => {
    const messages = [
      { text: "Fantastic job! You're getting better every day!", icon: "🌟" },
      { text: "Excellent work! Keep shining bright!", icon: "⭐" },
      { text: "Amazing! You're becoming a math champion!", icon: "🏆" },
      { text: "Wonderful! Your brain is growing stronger!", icon: "🧠" },
      { text: "Spectacular! You're on fire today!", icon: "🔥" },
      { text: "Brilliant! You make math look easy!", icon: "✨" },
      { text: "Incredible! You're a math superstar!", icon: "🌈" },
      { text: "Outstanding! Keep up the great work!", icon: "🎯" },
      { text: "Superb! Your hard work is paying off!", icon: "🎨" },
      { text: "Perfect! You're unstoppable!", icon: "🚀" }
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getEncouragementMessage = () => {
    const messages = [
      { text: "Don't worry! Let's try again together!", icon: "🤗" },
      { text: "You're getting closer! Keep trying!", icon: "👊" },
      { text: "Almost there! You can do this!", icon: "💪" },
      { text: "Practice makes perfect! Let's continue!", icon: "🌱" },
      { text: "Keep going! Every attempt makes you stronger!", icon: "🎯" },
      { text: "You're learning! That's what matters!", icon: "📚" },
      { text: "Mistakes help us learn! Try once more!", icon: "🌈" },
      { text: "Stay positive! You'll get it next time!", icon: "☀️" },
      { text: "You're brave to keep trying! Let's go again!", icon: "🦁" },
      { text: "Never give up! You're getting better!", icon: "🌟" }
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen bg-game-background p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="w-full max-w-lg mx-auto">
          <GameHeader
            score={score}
            highScore={highScore}
            timeLeft={timeLeft}
            isTrainingMode={isTrainingMode}
            onTrainingModeToggle={() => setIsTrainingMode(!isTrainingMode)}
            onStartOver={startOver}
            selectedTables={selectedTables}
            onTableToggle={handleTableToggle}
            selectedTrainingTable={selectedTrainingTable}
            allowedQuestionParts={allowedQuestionParts}
            onQuestionPartToggle={handleQuestionPartToggle}
          />

          {!isGameActive ? (
            <GameOver score={score} onStartOver={startOver} />
          ) : (
            <>
              {isTrainingMode ? (
                <TrainingMode selectedTable={selectedTrainingTable} />
              ) : (
                <GameCard className="mb-6 animate-float">
                  <GameQuestion
                    num1={num1}
                    num2={num2}
                    questionPart={questionPart}
                    options={options}
                    isCorrect={isCorrect}
                    selectedAnswer={selectedAnswer}
                    isGameActive={isGameActive}
                    onOptionClick={handleOptionClick}
                    getSuccessMessage={getSuccessMessage}
                    getEncouragementMessage={getEncouragementMessage}
                  />
                </GameCard>
              )}

              <div className="flex justify-center gap-2">
                {[...Array(score)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 animate-celebrate" />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}