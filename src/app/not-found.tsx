"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/effects/MagneticButton";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        >
          <h1 className="text-8xl sm:text-9xl font-bold gradient-text mb-2 select-none">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
            Page not found
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            But my projects do.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <MagneticButton>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <Home size={16} />
              Go Home
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all"
            >
              View Projects
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}
