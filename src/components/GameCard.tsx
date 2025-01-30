import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GameCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GameCard({ children, className }: GameCardProps) {
  return (
    <Card className={cn("p-6 min-h-[300px] bg-white/10 backdrop-blur-lg border-2 border-white/20 shadow-xl", className)}>
      {children}
    </Card>
  );
}