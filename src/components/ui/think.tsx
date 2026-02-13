"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Think({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("size-2 rounded-full bg-primary", className)}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0,
      }}
    />
  );
}
