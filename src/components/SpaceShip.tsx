import { useEffect, useRef } from "react";

interface SpaceShipProps {
  isCorrect: boolean | null;
  isGameActive: boolean;
  score: number;
}

export function SpaceShip({ isCorrect, isGameActive, score }: SpaceShipProps) {
  const shipRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const baseY = 80; // Starting position (40% of container height)
  const maxY = 160; // Maximum downward position
  const fallDuration = 5000; // 5 seconds to fall

  useEffect(() => {
    if (!shipRef.current || !isGameActive) return;

    const applyGravity = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / fallDuration, 1);
      
      // Calculate vertical position with quadratic easing for more natural gravity
      const currentY = baseY + (progress * progress * (maxY - baseY));
      
      if (shipRef.current) {
        // Only modify the Y transform, preserve the X position
        const currentX = shipRef.current.getBoundingClientRect().left;
        shipRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }

      if (progress < 1 && isGameActive) {
        animationFrameRef.current = requestAnimationFrame(applyGravity);
      }
    };

    // Start gravity animation
    animationFrameRef.current = requestAnimationFrame(applyGravity);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isGameActive]);

  useEffect(() => {
    if (!shipRef.current) return;
    
    // Reset gravity animation when answer is given
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    startTimeRef.current = undefined;
    
    if (isCorrect === true) {
      // Move ship up for correct answer
      const currentX = shipRef.current.getBoundingClientRect().left;
      shipRef.current.style.transform = `translate(${currentX}px, ${baseY - 40}px)`;
      shipRef.current.style.transition = 'transform 0.5s ease-out';
      
      // After the lift animation, resume gravity
      setTimeout(() => {
        startTimeRef.current = undefined;
        if (isGameActive) {
          animationFrameRef.current = requestAnimationFrame((timestamp) => {
            startTimeRef.current = timestamp;
            const applyGravity = (t: number) => {
              const elapsed = t - timestamp;
              const progress = Math.min(elapsed / fallDuration, 1);
              const currentY = (baseY - 40) + (progress * progress * (maxY - (baseY - 40)));
              const currentX = shipRef.current?.getBoundingClientRect().left || 0;
              
              if (shipRef.current) {
                shipRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
              }

              if (progress < 1 && isGameActive) {
                animationFrameRef.current = requestAnimationFrame(applyGravity);
              }
            };
            animationFrameRef.current = requestAnimationFrame(applyGravity);
          });
        }
      }, 500);
    } else if (isCorrect === false) {
      // Drop ship quickly for wrong answer
      const currentX = shipRef.current.getBoundingClientRect().left;
      shipRef.current.style.transform = `translate(${currentX}px, ${maxY}px)`;
      shipRef.current.style.transition = 'transform 0.3s ease-in';
    }
  }, [isCorrect, isGameActive]);

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
          absolute left-0 w-20 h-20 
          ${isCorrect === true ? 'animate-celebrate' : ''}
        `}
        style={{
          filter: `brightness(${1 + score * 0.1})`,
          transform: `translateY(${baseY}px)`, // Set initial position
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