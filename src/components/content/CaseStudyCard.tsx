"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CaseStudy } from "@/lib/types";
import { getProjectBySlug } from "@/data/projects";
import { TiltCard } from "@/components/effects/TiltCard";
import { SpotlightCard } from "@/components/effects/SpotlightCard";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const project = getProjectBySlug(caseStudy.projectSlug);

  return (
    <TiltCard className="relative rounded-xl" maxTilt={5} scale={1.02}>
      <SpotlightCard className="rounded-xl" spotlightColor="rgba(59, 130, 246, 0.06)">
        <Link
          href={`/case-studies/${caseStudy.slug}`}
          aria-label={`Read case study: ${caseStudy.title}`}
          className="group block rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-blue-300/50 dark:hover:border-blue-700/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              {project && (
                <span className="text-xs font-medium gradient-text mb-1 block">
                  {project.title}
                </span>
              )}
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:gradient-text transition-colors duration-300">
                {caseStudy.title}
              </h3>
            </div>
            <ArrowUpRight
              size={16}
              className="text-zinc-400 group-hover:text-blue-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 mt-1"
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
                className="px-2.5 py-1 text-xs rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-800/30"
              >
                {h}
              </span>
            ))}
          </div>
        </Link>
      </SpotlightCard>
    </TiltCard>
  );
}
