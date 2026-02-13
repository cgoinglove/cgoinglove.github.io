import { Think } from "@/components/ui/think";
import { StreamingMessage } from "@/components/chat/streaming-message";
import type { Message, QuestionConfig } from "@/types";
import { cn } from "@/lib/utils";
import { SuggestionChips } from "./suggestion-chips";

export function MessageBubble({
  message,
  onAllDone,
  onScroll,
  availableQuestions,
  onSelectQuestion,
  isProcessing,
  isLast,
}: {
  message: Message;
  onAllDone?: () => void;
  isLast?: boolean;
  onScroll?: () => void;
  availableQuestions?: QuestionConfig[];
  onSelectQuestion: (question: QuestionConfig) => void;
  isProcessing?: boolean;
}) {
  return (
    <div className={cn("flex flex-col", isLast && "pb-36")}>
      <div
        className={cn(
          "flex gap-2.5 ",
          message.role === "user" ? "justify-end" : "justify-start",
        )}
      >
        <div
          className={cn(
            "min-w-0",
            message.role === "user"
              ? "bg-foreground text-background rounded-2xl rounded-br-xs px-4 py-2.5 fade-in duration-1000 animate-in"
              : "w-full",
          )}
        >
          {message.role === "assistant" ? (
            <div className="w-full">
              {message.state === "thinking" && (
                <div className="text-sm leading-relaxed">
                  <Think />
                </div>
              )}
              {message.state === "complete" && message.steps && (
                <StreamingMessage
                  steps={message.steps}
                  onAllDone={onAllDone}
                  onScroll={onScroll}
                />
              )}
            </div>
          ) : (
            <p className="text-sm">{message.content}</p>
          )}
        </div>
      </div>
      {/* Suggestion chips */}
      {availableQuestions &&
        availableQuestions.length > 0 &&
        !isProcessing &&
        isLast && (
          <div className="flex justify-end mt-4">
            <SuggestionChips
              questions={availableQuestions}
              onSelect={onSelectQuestion}
            />
          </div>
        )}
    </div>
  );
}
