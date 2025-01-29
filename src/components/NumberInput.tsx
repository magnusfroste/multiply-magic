import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function NumberInput({ value, onChange, className, placeholder, disabled }: NumberInputProps) {
  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn("text-2xl text-center font-bold bg-white/20 border-2 border-white/30 text-white placeholder:text-white/50", className)}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}