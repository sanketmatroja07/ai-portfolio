"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const initialized = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const checkTouch = () => {
      setIsTouch(true);
      window.removeEventListener("touchstart", checkTouch);
    };
    window.addEventListener("touchstart", checkTouch, { once: true });

    const onMove = (e: MouseEvent) => {
      if (!initialized.current) {
        initialized.current = true;
        setVisible(true);
      }
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, [data-magnetic]")
      ) {
        setHovering(true);
      }
    };
    const onHoverEnd = () => setHovering(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onHoverStart);
    document.addEventListener("mouseout", onHoverEnd);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onHoverStart);
      document.removeEventListener("mouseout", onHoverEnd);
      window.removeEventListener("touchstart", checkTouch);
    };
  }, [cursorX, cursorY, prefersReducedMotion]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      {/* Outer glow ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 56 : clicking ? 24 : 40,
            height: hovering ? 56 : clicking ? 24 : 40,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-full border-2 border-white/80"
        />
      </motion.div>
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: clicking ? 12 : 6,
            height: clicking ? 12 : 6,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full bg-white"
        />
      </motion.div>
    </>
  );
}
