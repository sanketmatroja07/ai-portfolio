"use client";

import { useReducedMotion } from "framer-motion";

export function GradientMesh({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900" />

      {/* Animated orbs */}
      <div
        className={`absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-blue-400/20 dark:bg-blue-500/10 blur-[100px] ${
          prefersReducedMotion ? "" : "animate-mesh-drift-1"
        }`}
      />
      <div
        className={`absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-[100px] ${
          prefersReducedMotion ? "" : "animate-mesh-drift-2"
        }`}
      />
      <div
        className={`absolute top-1/3 right-1/4 w-[40vw] h-[40vw] rounded-full bg-violet-400/15 dark:bg-violet-500/8 blur-[120px] ${
          prefersReducedMotion ? "" : "animate-mesh-drift-3"
        }`}
      />

      {/* Noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] noise-overlay" />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 dot-grid opacity-40 dark:opacity-20" />
    </div>
  );
}
