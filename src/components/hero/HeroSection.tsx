"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { GradientMesh } from "@/components/effects/GradientMesh";
import { MagneticButton } from "@/components/effects/MagneticButton";

export function HeroSection() {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden -mt-16 pt-16">
      <GradientMesh />

      <motion.div
        style={{ opacity: prefersReducedMotion ? 1 : heroOpacity }}
        className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-glow-pulse" />
                Open to Opportunities
              </span>
            </motion.div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              I build AI <span className="gradient-text">that ships.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed"
            >
              Full-stack AI engineer. I&apos;ve built fraud detection engines,
              recommendation systems, NLP pipelines, and LLM-powered tools
              — all shipped to production with real architectures, not demos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticButton>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:shadow-lg active:scale-[0.98]"
                >
                  View My Work
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="/resume"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all active:scale-[0.98]"
                >
                  <Download size={15} />
                  Resume
                </a>
              </MagneticButton>
            </motion.div>

            {/* Credibility line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="mt-6 text-xs text-zinc-400 dark:text-zinc-500"
            >
              14 projects &middot; 5 full-stack platforms &middot; 30+ technologies &middot; Python, TypeScript, React, FastAPI
            </motion.p>
          </div>

          {/* Right: Photo */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            style={{ y: prefersReducedMotion ? 0 : photoY }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-full bg-blue-500/15 dark:bg-blue-400/10 blur-3xl animate-glow-pulse" />
              <div className="absolute -inset-2 rounded-full border border-blue-200/40 dark:border-blue-800/30" />

              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl shadow-blue-500/10 ring-1 ring-white/20 dark:ring-zinc-700/30">
                <Image
                  src="/photo.png"
                  alt="Sanket Matroja"
                  fill
                  className="object-cover"
                  style={{ filter: "sepia(0.35) hue-rotate(180deg) saturate(1.4) brightness(1.02)" }}
                  priority
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/5 to-cyan-500/5 mix-blend-color" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
