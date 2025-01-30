import { Checkbox } from "@/components/ui/checkbox";

interface SettingsContentProps {
  isTrainingMode: boolean;
  selectedTables: number[];
  onTableToggle: (table: number) => void;
  selectedTrainingTable: number;
  allowedQuestionParts: string[];
  onQuestionPartToggle: (part: string) => void;
}

export function SettingsContent({
  isTrainingMode,
  selectedTables,
  onTableToggle,
  selectedTrainingTable,
  allowedQuestionParts,
  onQuestionPartToggle,
}: SettingsContentProps) {
  const allTables = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="py-4">
      <h3 className="mb-4 text-sm font-medium">
        {isTrainingMode ? "Select a table to practice:" : "Select Multiplication Tables:"}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {allTables.map((table) => (
          <div key={table} className="flex items-center space-x-2">
            <Checkbox
              id={`table-${table}`}
              checked={isTrainingMode ? selectedTrainingTable === table : selectedTables.includes(table)}
              onCheckedChange={() => onTableToggle(table)}
              disabled={!isTrainingMode && selectedTables.length === 1 && selectedTables.includes(table)}
            />
            <label
              htmlFor={`table-${table}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {table}x Table
            </label>
          </div>
        ))}
      </div>

      {!isTrainingMode && (
        <div className="mt-8">
          <h3 className="mb-4 text-sm font-medium">Question Types:</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="first-number"
                checked={allowedQuestionParts.includes("first")}
                onCheckedChange={() => onQuestionPartToggle("first")}
                disabled={allowedQuestionParts.length === 1 && allowedQuestionParts.includes("first")}
              />
              <label htmlFor="first-number">Hide First Number</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="second-number"
                checked={allowedQuestionParts.includes("second")}
                onCheckedChange={() => onQuestionPartToggle("second")}
                disabled={allowedQuestionParts.length === 1 && allowedQuestionParts.includes("second")}
              />
              <label htmlFor="second-number">Hide Second Number</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="result"
                checked={allowedQuestionParts.includes("result")}
                onCheckedChange={() => onQuestionPartToggle("result")}
                disabled={allowedQuestionParts.length === 1 && allowedQuestionParts.includes("result")}
              />
              <label htmlFor="result">Hide Result</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}