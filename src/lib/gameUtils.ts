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
    { text: "Fantastiskt! Du blir bättre varje dag!", icon: "🌟" },
    { text: "Snyggt jobbat! Fortsätt lysa!", icon: "⭐" },
    { text: "Otroligt! Du är på väg att bli mattemästare!", icon: "🏆" },
    { text: "Härligt! Hjärnan blir starkare av det här!", icon: "🧠" },
    { text: "Toppen! Du är helt glödhet idag!", icon: "🔥" },
    { text: "Briljant! Du får matte att se lätt ut!", icon: "✨" },
    { text: "Ofattbart bra! Du är en mattstjärna!", icon: "🌈" },
    { text: "Fenomenalt! Fortsätt precis så!", icon: "🎯" },
    { text: "Utmärkt! All träning ger resultat!", icon: "🎨" },
    { text: "Perfekt! Ingen stoppar dig!", icon: "🚀" },
  ];
  return getRandomFromArray(messages);
}

export function getEncouragementMessage(): { text: string; icon: string } {
  const messages = [
    { text: "Inga problem! Vi testar igen!", icon: "🤗" },
    { text: "Du är nära nu! Fortsätt!", icon: "👊" },
    { text: "Nästan där! Det här klarar du!", icon: "💪" },
    { text: "Övning ger färdighet! Kör vidare!", icon: "🌱" },
    { text: "Fortsätt! Varje försök gör dig starkare!", icon: "🎯" },
    { text: "Du lär dig! Det är det viktigaste!", icon: "📚" },
    { text: "Fel hjälper oss att lära! Testa en gång till!", icon: "🌈" },
    { text: "Håll humöret uppe! Nästa går bättre!", icon: "☀️" },
    { text: "Modigt att fortsätta! Nu kör vi igen!", icon: "🦁" },
    { text: "Ge inte upp! Du blir bättre hela tiden!", icon: "🌟" },
  ];
  return getRandomFromArray(messages);
}
