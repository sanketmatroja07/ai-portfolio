"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  variant?: "words" | "chars";
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  children,
  className,
  variant = "words",
  delay = 0,
  as: Tag = "h1",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const units = variant === "chars" ? children.split("") : children.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={children}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + i * (variant === "chars" ? 0.03 : 0.08),
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {unit}
            {variant === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
