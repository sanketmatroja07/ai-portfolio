"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  speed = 30,
  reverse = false,
  className,
  pauseOnHover = true,
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const direction = reverse ? "reverse" : "normal";

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className ?? ""}`}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        className="flex w-max gap-4"
        style={{
          animation: prefersReducedMotion
            ? "none"
            : `marquee ${speed}s linear infinite`,
          animationDirection: direction,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {/* Original + duplicate for seamless loop */}
        <div className="flex shrink-0 gap-4">{children}</div>
        <div className="flex shrink-0 gap-4" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
