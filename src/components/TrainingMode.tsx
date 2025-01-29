import { useState } from "react";
import { GameCard } from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface TrainingModeProps {
  selectedTable: number;
}

export function TrainingMode({ selectedTable }: TrainingModeProps) {
  const [currentNumber, setCurrentNumber] = useState(1);
  
  const nextNumber = () => {
    setCurrentNumber(current => current < 10 ? current + 1 : 1);
  };

  const previousNumber = () => {
    setCurrentNumber(current => current > 1 ? current - 1 : 10);
  };

  return (
    <GameCard className="mb-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Training: {selectedTable}x Table</h2>
        <div className="flex items-center justify-between gap-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={previousNumber}
            className="bg-transparent border-white text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="text-4xl font-bold text-white">
            {selectedTable} × {currentNumber} = {selectedTable * currentNumber}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextNumber}
            className="bg-transparent border-white text-white hover:bg-white/20"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </GameCard>
  );
}