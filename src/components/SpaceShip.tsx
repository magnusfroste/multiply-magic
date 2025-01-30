import { useEffect, useRef } from "react";

interface SpaceShipProps {
  isCorrect: boolean | null;
  isGameActive: boolean;
  score: number;
}

export function SpaceShip({ isCorrect, isGameActive, score }: SpaceShipProps) {
  const shipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shipRef.current) return;
    
    if (isCorrect === true) {
      shipRef.current.style.transform = `translateY(-20px)`;
    } else if (isCorrect === false) {
      shipRef.current.style.transform = `translateY(20px)`;
    }
  }, [isCorrect]);

  if (!isGameActive) return null;

  return (
    <div 
      ref={shipRef}
      className={`
        fixed top-32 left-0 w-20 h-20 
        transition-all duration-500 ease-in-out
        animate-[moveRight_120s_linear]
        ${isCorrect === true ? 'animate-celebrate' : ''}
      `}
      style={{
        filter: `brightness(${1 + score * 0.1})`,
      }}
    >
      <div className="relative w-full h-full">
        {/* Spaceship body */}
        <div className="absolute inset-0 bg-game-primary rounded-full transform rotate-45 animate-float">
          {/* Cockpit */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-game-accent rounded-full"></div>
          {/* Engine flames */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2">
            <div className="w-6 h-2 bg-game-secondary rounded-full animate-pulse"></div>
            <div className="w-4 h-2 bg-game-accent rounded-full animate-pulse delay-75"></div>
          </div>
        </div>
      </div>
    </div>
  );
}