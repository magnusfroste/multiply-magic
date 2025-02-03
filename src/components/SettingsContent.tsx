import { Button } from "@/components/ui/button";

interface SettingsContentProps {
  selectedTables: number[];
  onTableToggle: (table: number) => void;
  allowedQuestionParts: string[];
  onQuestionPartToggle: (part: string) => void;
}

export function SettingsContent({
  selectedTables,
  onTableToggle,
  allowedQuestionParts,
  onQuestionPartToggle,
}: SettingsContentProps) {
  const allTables = Array.from({ length: 10 }, (_, i) => i + 1);
  const questionParts = [
    { value: "first", label: "First Number" },
    { value: "second", label: "Second Number" },
    { value: "result", label: "Result" },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Multiplication Tables</h3>
        <div className="grid grid-cols-5 gap-2">
          {allTables.map((table) => (
            <Button
              key={table}
              variant={selectedTables.includes(table) ? "default" : "outline"}
              onClick={() => onTableToggle(table)}
              className="w-full"
            >
              {table}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Question Types</h3>
        <div className="grid grid-cols-1 gap-2">
          {questionParts.map(({ value, label }) => (
            <Button
              key={value}
              variant={allowedQuestionParts.includes(value) ? "default" : "outline"}
              onClick={() => onQuestionPartToggle(value)}
              className="w-full"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}