import type { QuestionConfig } from "@/types";
import { Button } from "../ui/button";

export function SuggestionChips({
  questions,
  onSelect,
}: {
  questions: QuestionConfig[];
  onSelect: (question: QuestionConfig) => void;
}) {
  return (
    <div className="relative animate-block-in">
      <div className="flex flex-wrap gap-2 justify-end">
        {questions.map((q, i) => (
          <Button
            key={q.id}
            onClick={() => onSelect(q)}
            className="rounded-full text-xs active:scale-95 font-medium animate-suggest-wiggle"
            style={{ animationDelay: `${0.8 + i * 0.1}s` }}
          >
            {q.shortLabel}
          </Button>
        ))}
      </div>
    </div>
  );
}
