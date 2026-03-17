"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

function useCountUp(target: number, duration: number, start: boolean, skip: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (skip) {
      setCount(target);
      return;
    }
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start, skip]);

  return count;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[\d]/g, "");
  const isNumeric = !isNaN(numericValue) && numericValue > 0;
  const count = useCountUp(
    isNumeric ? numericValue : 0,
    1000,
    isInView,
    !!prefersReducedMotion
  );
  const [countDone, setCountDone] = useState(false);

  useEffect(() => {
    if (isNumeric && count === numericValue && isInView) {
      setCountDone(true);
    }
  }, [count, numericValue, isNumeric, isInView]);

  const fillPercent = isNumeric ? Math.min((numericValue / 15) * 100, 100) : 50;
  const circumference = 2 * Math.PI * 18;
  const dashOffset = circumference - (fillPercent / 100) * circumference;

  return (
    <div
      ref={ref}
      className="relative flex items-center gap-4 rounded-xl glass p-5 overflow-hidden group"
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/5 to-cyan-500/5" />

      {icon && (
        <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
          {/* Progress ring */}
          <svg
            className="absolute inset-0 w-12 h-12 -rotate-90"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-zinc-200 dark:text-zinc-800"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="url(#ring-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={isInView ? dashOffset : circumference}
              className="transition-all duration-1000 ease-out"
              style={{
                transitionDelay: "0.3s",
              }}
            />
            <defs>
              <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div
            animate={countDone && !prefersReducedMotion ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          >
            {icon}
          </motion.div>
        </div>
      )}
      <div className="relative z-10">
        <p className="text-2xl sm:text-3xl font-bold gradient-text tabular-nums">
          {isNumeric ? `${count}${suffix}` : value}
        </p>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      </div>
    </div>
  );
}
