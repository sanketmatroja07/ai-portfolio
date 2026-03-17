"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({
  children,
  className,
  glowColor = "from-blue-500 via-cyan-500 to-violet-500",
}: GlowCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`relative group ${className ?? ""}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Glow border - animated conic gradient */}
      <motion.div
        className={`absolute -inset-[1px] rounded-[inherit] bg-gradient-to-r ${glowColor} opacity-0 blur-sm transition-opacity duration-500 ${
          prefersReducedMotion ? "" : "animate-gradient-rotate"
        }`}
        animate={{ opacity: isHovering ? 0.7 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className={`absolute -inset-[1px] rounded-[inherit] bg-gradient-to-r ${glowColor} opacity-0 transition-opacity duration-500 ${
          prefersReducedMotion ? "" : "animate-gradient-rotate"
        }`}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Card content sits on top */}
      <div className="relative rounded-[inherit] bg-white dark:bg-zinc-900">
        {children}
      </div>
    </div>
  );
}
