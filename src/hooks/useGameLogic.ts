import { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QuestionPart } from "@/types/game";
import { 
  ALL_TABLES, 
  DEFAULT_TIME, 
  generateOptions, 
  calculateCorrectAnswer, 
  getRandomFromArray 
} from "@/lib/gameUtils";
import { scoreStorage } from "@/lib/scoreStorage";
import { playCorrectSound, playIncorrectSound } from "@/lib/sounds";
import { celebrateHighScore } from "@/lib/confetti";

export function useGameLogic() {
  const queryClient = useQueryClient();
  
  // Game state
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => scoreStorage.getHighScore());
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedTables, setSelectedTables] = useState<number[]>([...ALL_TABLES]);
  const [questionPart, setQuestionPart] = useState<QuestionPart>("result");
  const [allowedQuestionParts, setAllowedQuestionParts] = useState<QuestionPart[]>(["first", "second", "result"]);
  const [options, setOptions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [isGameActive, setIsGameActive] = useState(true);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showCountdown, setShowCountdown] = useState(true);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && !showCountdown && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Background color changes
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
  }, [isGameActive, showCountdown, timeLeft]);

  // Save score when game ends
  useEffect(() => {
    if (!isGameActive && score > 0) {
      scoreStorage.addScore(score, queryClient);
      if (score >= highScore && score > 0) {
        celebrateHighScore();
      }
    }
  }, [isGameActive, score, highScore, queryClient]);

  const generateQuestion = useCallback(() => {
    if (!isGameActive) return;

    if (selectedTables.length === 0) {
      console.warn("No tables selected");
      return;
    }

    const randomNum1 = getRandomFromArray(selectedTables);
    const randomNum2 = getRandomFromArray(ALL_TABLES);
    setNum1(randomNum1);
    setNum2(randomNum2);
    setSelectedAnswer(null);
    setIsCorrect(null);

    let correctAnswer: number;
    if (allowedQuestionParts.length > 0) {
      const randomPart = getRandomFromArray(allowedQuestionParts);
      setQuestionPart(randomPart);
      correctAnswer = calculateCorrectAnswer(randomNum1, randomNum2, randomPart);
    } else {
      correctAnswer = randomNum1 * randomNum2;
    }

    const newOptions = generateOptions(correctAnswer);
    setOptions(newOptions);
  }, [isGameActive, selectedTables, allowedQuestionParts]);

  const checkAnswer = useCallback((selectedValue: number) => {
    if (!isGameActive) return;

    const correctAnswer = calculateCorrectAnswer(num1, num2, questionPart);
    const isAnswerCorrect = selectedValue === correctAnswer;
    
    setIsCorrect(isAnswerCorrect);
    setSelectedAnswer(selectedValue);

    if (isAnswerCorrect) {
      playCorrectSound();
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        scoreStorage.setHighScore(newScore);
      }
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      setTimeout(generateQuestion, 1500);
    } else {
      playIncorrectSound();
      setStreak(0);
      setTimeout(generateQuestion, 2000);
    }
  }, [isGameActive, num1, num2, questionPart, score, highScore, streak, bestStreak, generateQuestion]);

  const handleOptionClick = useCallback((value: number) => {
    if (isCorrect !== null || !isGameActive) return;
    setSelectedAnswer(value);
    checkAnswer(value);
  }, [isCorrect, isGameActive, checkAnswer]);

  const startOver = useCallback(() => {
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimeLeft(DEFAULT_TIME);
    setIsGameActive(true);
    setStreak(0);
    setShowCountdown(true);
  }, []);

  const handleCountdownComplete = useCallback(() => {
    setShowCountdown(false);
    generateQuestion();
  }, [generateQuestion]);

  const handleTableToggle = useCallback((table: number) => {
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
  }, []);

  const handleQuestionPartToggle = useCallback((part: QuestionPart) => {
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
  }, []);

  return {
    // State
    num1,
    num2,
    selectedAnswer,
    score,
    highScore,
    isCorrect,
    selectedTables,
    questionPart,
    allowedQuestionParts,
    options,
    timeLeft,
    isGameActive,
    streak,
    bestStreak,
    showCountdown,
    
    // Actions
    handleOptionClick,
    startOver,
    handleCountdownComplete,
    handleTableToggle,
    handleQuestionPartToggle,
  };
}
