"use client";

import { useReducedMotion } from "framer-motion";

const icons = [
  { emoji: "🧠", size: 32, x: "10%", y: "20%", delay: 0 },
  { emoji: "⚡", size: 24, x: "85%", y: "15%", delay: 2 },
  { emoji: "🔮", size: 28, x: "75%", y: "65%", delay: 4 },
  { emoji: "🚀", size: 26, x: "15%", y: "70%", delay: 1 },
  { emoji: "💡", size: 22, x: "50%", y: "10%", delay: 3 },
  { emoji: "⚙️", size: 20, x: "90%", y: "45%", delay: 5 },
  { emoji: "📊", size: 24, x: "30%", y: "80%", delay: 2.5 },
  { emoji: "🤖", size: 30, x: "65%", y: "30%", delay: 1.5 },
];

export function FloatingIcons({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ""}`} aria-hidden="true">
      {icons.map((icon, i) => (
        <span
          key={i}
          className="absolute animate-float select-none"
          style={{
            left: icon.x,
            top: icon.y,
            fontSize: icon.size,
            animationDelay: `${icon.delay}s`,
            animationDuration: `${6 + i * 0.8}s`,
            opacity: 0.12,
            filter: "blur(0.5px)",
          }}
        >
          {icon.emoji}
        </span>
      ))}
    </div>
  );
}
