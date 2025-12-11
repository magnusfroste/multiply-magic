import { QueryClient } from "@tanstack/react-query";
import { ScoreEntry } from "@/types/game";

const QUERY_KEY = ["scores"];
const STORAGE_KEY = "matte-kul-scores";
const HIGH_SCORE_KEY = "matte-kul-high-score";

// Load from localStorage on init
const loadScores = (): ScoreEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

let scoreHistory: ScoreEntry[] = loadScores();

export const scoreStorage = {
  getScores: (): ScoreEntry[] => scoreHistory,

  addScore: (score: number, queryClient: QueryClient): void => {
    const newEntry: ScoreEntry = {
      id: scoreHistory.length + 1,
      score,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: "2-digit", 
        minute: "2-digit" 
      }),
    };
    scoreHistory = [...scoreHistory, newEntry];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scoreHistory));
    queryClient.setQueryData(QUERY_KEY, scoreHistory);
  },

  clearScores: (queryClient: QueryClient): void => {
    scoreHistory = [];
    localStorage.removeItem(STORAGE_KEY);
    queryClient.setQueryData(QUERY_KEY, scoreHistory);
  },

  getHighScore: (): number => {
    try {
      const stored = localStorage.getItem(HIGH_SCORE_KEY);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  },

  setHighScore: (score: number): void => {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
  },

  getQueryKey: () => QUERY_KEY,
};
