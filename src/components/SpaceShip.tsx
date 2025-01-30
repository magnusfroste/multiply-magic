import { useEffect, useRef } from "react";

interface SpaceShipProps {
  isCorrect: boolean | null;
  isGameActive: boolean;
  score: number;
}

export function SpaceShip({ isCorrect, isGameActive, score }: SpaceShipProps) {
  const shipRef = useRef<HTMLDivElement>(null);
  const baseY = 0; // Base vertical position

  useEffect(() => {
    if (!shipRef.current) return;
    
    // Get the current horizontal position from the ongoing animation
    const currentX = shipRef.current.style.transform.match(/translateX\((.*?)\)/)?.[1] || '0px';
    
    if (isCorrect === true) {
      shipRef.current.style.transform = `translateX(${currentX}) translateY(-20px)`;
    } else if (isCorrect === false) {
      shipRef.current.style.transform = `translateX(${currentX}) translateY(20px)`;
    } else {
      shipRef.current.style.transform = `translateX(${currentX}) translateY(${baseY}px)`;
    }
  }, [isCorrect]);

  if (!isGameActive) return null;

  return (
    <div className="w-full h-[200px] relative mb-8 bg-game-background border-4 border-game-primary/30 rounded-lg overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}>
      </div>
      
      {/* Stars background */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '15px 15px'
        }}>
      </div>

      {/* Spaceship */}
      <div 
        ref={shipRef}
        className={`
          absolute top-1/2 -translate-y-1/2 left-0 w-20 h-20 
          transition-transform duration-500 ease-in-out
          ${isGameActive ? 'animate-moveRight' : ''}
          ${isCorrect === true ? 'animate-celebrate' : ''}
        `}
        style={{
          filter: `brightness(${1 + score * 0.1})`,
          transform: `translateX(0) translateY(${baseY}px)`,
          animation: isGameActive ? 'moveRight 120s linear forwards' : 'none'
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
    </div>
  );
}