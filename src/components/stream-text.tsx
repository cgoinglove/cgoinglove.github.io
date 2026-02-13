import { useState, useEffect, useRef, useMemo } from "react";
import { Streamdown } from "streamdown";
import { createCodePlugin } from "@streamdown/code";

const codePlugin = createCodePlugin({
  themes: ["github-light", "github-light"],
});

interface StreamTextProps {
  text: string;
  speed?: number;
  onDone?: () => void;
}

export function StreamText({ text, speed = 30, onDone }: StreamTextProps) {
  const [len, setLen] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const doneRef = useRef(false);

  useEffect(() => {
    if (len >= text.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDoneRef.current?.();
      }
      return;
    }
    const t = setTimeout(() => setLen((l) => l + 1), speed);
    return () => clearTimeout(t);
  }, [len, text.length, speed]);

  const isDone = len >= text.length;
  const plugins = useMemo(() => ({ code: codePlugin }), []);

  return (
    <div className={isDone ? "" : "streaming-cursor"}>
      <Streamdown
        className="stream-text"
        mode={isDone ? "static" : "streaming"}
        plugins={plugins}
        isAnimating={!isDone}
      >
        {text.slice(0, len)}
      </Streamdown>
    </div>
  );
}
