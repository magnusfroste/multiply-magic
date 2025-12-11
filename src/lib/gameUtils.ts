import { QuestionPart } from "@/types/game";

export const ALL_TABLES = Array.from({ length: 10 }, (_, i) => i + 1);

export const DEFAULT_TIME = 60;

export function generateOptions(correctAnswer: number): number[] {
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
}

export function calculateCorrectAnswer(
  num1: number,
  num2: number,
  questionPart: QuestionPart
): number {
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
}

export function getRandomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getSuccessMessage(): { text: string; icon: string } {
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
    { text: "Perfect! You're unstoppable!", icon: "🚀" },
  ];
  return getRandomFromArray(messages);
}

export function getEncouragementMessage(): { text: string; icon: string } {
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
    { text: "Never give up! You're getting better!", icon: "🌟" },
  ];
  return getRandomFromArray(messages);
}
