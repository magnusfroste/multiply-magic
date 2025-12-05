import { useEffect, useState } from "react";

interface CountdownProps {
  onComplete: () => void;
}

export function Countdown({ onComplete }: CountdownProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div
        key={count}
        className="text-9xl font-bold text-white animate-scale-in"
        style={{
          textShadow: "0 0 40px rgba(255,255,255,0.5)",
        }}
      >
        {count === 0 ? "Go!" : count}
      </div>
    </div>
  );
}
