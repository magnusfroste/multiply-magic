import { QueryClient } from "@tanstack/react-query";
import { ScoreEntry } from "@/types/game";

const QUERY_KEY = ["scores"];

// In-memory score storage
let scoreHistory: ScoreEntry[] = [];

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
    queryClient.setQueryData(QUERY_KEY, scoreHistory);
  },

  clearScores: (queryClient: QueryClient): void => {
    scoreHistory = [];
    queryClient.setQueryData(QUERY_KEY, scoreHistory);
  },

  getQueryKey: () => QUERY_KEY,
};
