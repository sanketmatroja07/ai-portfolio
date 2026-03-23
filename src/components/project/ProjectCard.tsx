"use client";

import Link from "next/link";
import { ArrowUpRight, Box, Globe, Smartphone, Terminal, BookOpen, Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/types";
import { TechStack } from "./TechStack";
import { TiltCard } from "@/components/effects/TiltCard";
import { SpotlightCard } from "@/components/effects/SpotlightCard";

const typeIcons: Record<string, React.ElementType> = {
  web: Globe,
  api: Terminal,
  mobile: Smartphone,
  cli: Terminal,
  library: BookOpen,
  platform: Layers,
};

interface ProjectCardProps {
  project: Project;
  variant?: "grid" | "featured";
}

export function ProjectCard({ project, variant = "grid" }: ProjectCardProps) {
  const Icon = typeIcons[project.type] || Box;
  const prefersReducedMotion = useReducedMotion();

  if (variant === "featured") {
    return (
      <TiltCard className="relative rounded-2xl" maxTilt={6} scale={1.03}>
        <SpotlightCard className="rounded-2xl" spotlightColor="rgba(59, 130, 246, 0.06)">
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`View ${project.title}`}
            className="group relative block rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-blue-300/50 dark:hover:border-blue-700/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
          >
            <div
              className={cn(
                "h-48 flex items-center justify-center relative overflow-hidden",
                !project.screenshots?.length && `bg-gradient-to-br ${project.gradient}`
              )}
            >
              {project.screenshots?.length ? (
                <img
                  src={project.screenshots[0].url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              ) : null}
              <motion.div
                initial={false}
                whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.4 }}
                className={cn("relative", project.screenshots?.length && "opacity-0 group-hover:opacity-100 transition-opacity")}
              >
                <Icon className={cn("w-16 h-16", project.screenshots?.length ? "text-white" : "text-white/30")} aria-hidden="true" />
              </motion.div>
              {/* Shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:gradient-text transition-colors duration-300">
                  {project.title}
                </h3>
                <ArrowUpRight
                  size={16}
                  className="text-zinc-400 group-hover:text-blue-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 mt-1 shrink-0"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                {project.shortDescription}
              </p>
              <TechStack technologies={project.technologies.slice(0, 5)} />
            </div>
          </Link>
        </SpotlightCard>
      </TiltCard>
    );
  }

  return (
    <TiltCard className="relative rounded-xl" maxTilt={5} scale={1.02}>
      <SpotlightCard className="rounded-xl" spotlightColor="rgba(59, 130, 246, 0.05)">
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View ${project.title}`}
          className="group block rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-blue-300/50 dark:hover:border-blue-700/30 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
        >
          <div
            className={cn(
              "h-32 flex items-center justify-center relative overflow-hidden",
              !project.screenshots?.length && `bg-gradient-to-br ${project.gradient}`
            )}
          >
            {project.screenshots?.length ? (
              <img
                src={project.screenshots[0].url}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            ) : null}
            <Icon className={cn("w-10 h-10 relative", project.screenshots?.length ? "text-white drop-shadow" : "text-white/30")} aria-hidden="true" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between mb-1.5">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white group-hover:gradient-text transition-colors duration-300">
                {project.title}
              </h3>
              <ArrowUpRight
                size={14}
                className="text-zinc-400 group-hover:text-blue-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-0.5 shrink-0"
                aria-hidden="true"
              />
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
              {project.shortDescription}
            </p>
            <TechStack technologies={project.technologies.slice(0, 4)} />
          </div>
        </Link>
      </SpotlightCard>
    </TiltCard>
  );
}
