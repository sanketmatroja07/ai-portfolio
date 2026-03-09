"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

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
    800,
    isInView,
    !!prefersReducedMotion
  );

  return (
    <div ref={ref} className="flex items-center gap-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5">
      {icon && (
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" aria-hidden="true">
          {icon}
        </div>
      )}
      <div>
        <p className="text-2xl font-bold text-zinc-900 dark:text-white tabular-nums">
          {isNumeric ? `${count}${suffix}` : value}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      </div>
    </div>
  );
}
