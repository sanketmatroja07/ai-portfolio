"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CaseStudy } from "@/lib/types";
import { getProjectBySlug } from "@/data/projects";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const project = getProjectBySlug(caseStudy.projectSlug);
  const prefersReducedMotion = useReducedMotion();

  const hoverProps = prefersReducedMotion ? {} : { whileHover: { y: -3 } };

  return (
    <motion.div {...hoverProps} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Link
        href={`/case-studies/${caseStudy.slug}`}
        aria-label={`Read case study: ${caseStudy.title}`}
        className="group block rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-md p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            {project && (
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 block">
                {project.title}
              </span>
            )}
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {caseStudy.title}
            </h3>
          </div>
          <ArrowUpRight
            size={16}
            className="text-zinc-400 group-hover:text-blue-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1"
            aria-hidden="true"
          />
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-4">
          {caseStudy.problem}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {caseStudy.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="px-2 py-0.5 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            >
              {h}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
