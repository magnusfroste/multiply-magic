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

  const allTablesSelected = selectedTables.length === 10;
  const allQuestionTypesSelected = allowedQuestionParts.length === 3;

  const handleSelectAllTables = () => {
    allTables.forEach((table) => {
      if (!selectedTables.includes(table)) {
        onTableToggle(table);
      }
    });
  };

  const handleClearTables = () => {
    // Keep at least one table selected (the first one)
    selectedTables.slice(1).forEach((table) => {
      onTableToggle(table);
    });
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Multiplication Tables</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelectAllTables}
              disabled={allTablesSelected}
              className="text-xs h-7"
            >
              Select All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearTables}
              disabled={selectedTables.length <= 1}
              className="text-xs h-7"
            >
              Clear
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {allTablesSelected 
            ? "✨ All tables selected (random mode). Tap to focus on specific ones!" 
            : `Practicing ${selectedTables.length} table${selectedTables.length !== 1 ? 's' : ''}`}
        </p>
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
        <p className="text-sm text-muted-foreground mb-3">
          {allQuestionTypesSelected 
            ? "🎲 Random mode active. Tap to choose specific types!" 
            : `${allowedQuestionParts.length} type${allowedQuestionParts.length !== 1 ? 's' : ''} selected`}
        </p>
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