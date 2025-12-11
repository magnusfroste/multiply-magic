import { Star } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { GameHeader } from "@/components/GameHeader";
import { GameQuestion } from "@/components/GameQuestion";
import { GameOver } from "@/components/GameOver";
import { Countdown } from "@/components/Countdown";
import { ScoreHistory } from "@/components/ScoreHistory";
import { useGameLogic } from "@/hooks/useGameLogic";
import { getSuccessMessage, getEncouragementMessage } from "@/lib/gameUtils";

export default function Index() {
  const {
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
    handleOptionClick,
    startOver,
    handleCountdownComplete,
    handleTableToggle,
    handleQuestionPartToggle,
  } = useGameLogic();

  return (
    <div className="min-h-screen bg-game-background p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="w-full max-w-lg mx-auto">
          {/* App Logo & Name */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/logo.png" alt="Matte Kul" className="w-12 h-12 rounded-xl" />
            <h1 className="text-2xl font-bold text-white">Multiply Magic</h1>
          </div>

          <GameHeader
            score={score}
            highScore={highScore}
            timeLeft={timeLeft}
            streak={streak}
            bestStreak={bestStreak}
            onStartOver={startOver}
            selectedTables={selectedTables}
            onTableToggle={handleTableToggle}
            allowedQuestionParts={allowedQuestionParts}
            onQuestionPartToggle={handleQuestionPartToggle}
          />

          {!isGameActive ? (
            <GameOver score={score} onStartOver={startOver} />
          ) : showCountdown ? (
            <GameCard className="mb-6">
              <Countdown onComplete={handleCountdownComplete} />
            </GameCard>
          ) : (
            <>
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

              <div className="flex justify-center gap-2 mb-8">
                {[...Array(score)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 animate-celebrate" />
                ))}
              </div>
            </>
          )}

          <GameCard className="mt-8">
            <ScoreHistory />
          </GameCard>

          {/* Footer */}
          <footer className="mt-8 text-center text-white/60 text-sm">
            <p>
              Skapad av <span className="text-white/80 font-medium">Magnus Froste</span>
            </p>
            <p className="mt-1">
              <a
                href="https://github.com/magnusfroste"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/90 underline underline-offset-2 transition-colors"
              >
                Open Source på GitHub
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
