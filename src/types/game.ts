export type QuestionPart = "first" | "second" | "result";

export interface GameState {
  num1: number;
  num2: number;
  selectedAnswer: number | null;
  score: number;
  highScore: number;
  isCorrect: boolean | null;
  selectedTables: number[];
  questionPart: QuestionPart;
  allowedQuestionParts: QuestionPart[];
  options: number[];
  timeLeft: number;
  isGameActive: boolean;
  streak: number;
  bestStreak: number;
  showCountdown: boolean;
}

export interface ScoreEntry {
  id: number;
  score: number;
  timestamp: string;
}
