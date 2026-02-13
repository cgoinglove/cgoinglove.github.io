import { useState, useRef, useCallback } from "react";
import { StreamText } from "@/components/stream-text";
import { DataBlock } from "@/components/data-block";
import { StreamingCard } from "@/components/chat/streaming-card";
import type { ContentStep, BlockData } from "@/types";

const skeletonHeightMap: Record<BlockData["type"], string> = {
  profile: "h-72 max-w-md mx-auto p-5",
  work: "h-32",
  opensource: "h-64",
  service: "h-96",
  project: "h-28",
  contact: "h-12",
  email: "h-12",
};

// ─── StepContent ─────────────────────────────────────────────
// Streams text → shows blocks (skeleton → reveal) → calls onDone

function StepContent({
  step,
  onDone,
  onScroll,
}: {
  step: ContentStep;
  onDone: () => void;
  onScroll?: () => void;
}) {
  const [textDone, setTextDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const firedRef = useRef(false);

  const fireDone = useCallback(() => {
    if (!firedRef.current) {
      firedRef.current = true;
      setTimeout(() => onDoneRef.current(), 300);
    }
  }, []);

  const handleTextDone = useCallback(() => {
    setTextDone(true);
    onScroll?.();
    if (!step.blocks || step.blocks.length === 0) {
      fireDone();
    }
  }, [step.blocks, onScroll, fireDone]);

  return (
    <div className="w-full">
      <div className="text-sm leading-relaxed">
        <StreamText text={step.text} speed={8} onDone={handleTextDone} />
      </div>
      {textDone && step.blocks && step.blocks.length > 0 && (
        <div className="mt-2 w-full space-y-2 px-2 md:px-6 py-2">
          {step.blocks.map((block, i) => (
            <StreamingCard
              key={i}
              delay={800 + i * 300}
              onVisible={i === step.blocks!.length - 1 ? fireDone : onScroll}
              skeletonClassName={skeletonHeightMap[block.type]}
            >
              <DataBlock block={block} />
            </StreamingCard>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── StreamingMessage ────────────────────────────────────────
// Renders steps one by one. Each step streams, then next begins.

export function StreamingMessage({
  steps,
  onAllDone,
  onScroll,
}: {
  steps: ContentStep[];
  onAllDone?: () => void;
  onScroll?: () => void;
}) {
  const [visibleCount, setVisibleCount] = useState(1);
  const onAllDoneRef = useRef(onAllDone);
  onAllDoneRef.current = onAllDone;
  const doneRef = useRef(false);

  const handleStepDone = useCallback(
    (i: number) => {
      if (i < steps.length - 1) {
        setVisibleCount(i + 2);
        onScroll?.();
      } else {
        if (!doneRef.current) {
          doneRef.current = true;
          setTimeout(() => onAllDoneRef.current?.(), 200);
        }
      }
    },
    [steps.length, onScroll],
  );

  return (
    <div className="space-y-3 w-full">
      {steps.slice(0, visibleCount).map((step, i) => (
        <StepContent
          key={i}
          step={step}
          onDone={() => handleStepDone(i)}
          onScroll={onScroll}
        />
      ))}
    </div>
  );
}
