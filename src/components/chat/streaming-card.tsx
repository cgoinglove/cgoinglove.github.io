import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function StreamingCard({
  children,
  delay,
  onVisible,
  skeletonClassName,
}: {
  children: React.ReactNode;
  delay: number;
  onVisible?: () => void;
  skeletonClassName?: string;
}) {
  const [phase, setPhase] = useState<"skeleton" | "visible">("skeleton");
  const onVisibleRef = useRef(onVisible);
  onVisibleRef.current = onVisible;

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("visible");
      onVisibleRef.current?.();
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (phase === "skeleton") {
    return (
      <Skeleton
        className={`w-full rounded-lg ${skeletonClassName ?? "h-24"}`}
      />
    );
  }

  return <div className="w-full animate-content-reveal">{children}</div>;
}
