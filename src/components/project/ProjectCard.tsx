"use client";

import Link from "next/link";
import { ArrowUpRight, Box, Globe, Smartphone, Terminal, BookOpen, Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/types";
import { TechStack } from "./TechStack";

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

  const hoverProps = prefersReducedMotion
    ? {}
    : { whileHover: { y: variant === "featured" ? -4 : -3 } };

  if (variant === "featured") {
    return (
      <motion.div {...hoverProps} transition={{ duration: 0.2, ease: "easeOut" }}>
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View ${project.title}`}
          className="group relative block rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
        >
          <div
            className={cn(
              "h-48 bg-gradient-to-br flex items-center justify-center",
              project.gradient
            )}
          >
            <Icon className="w-16 h-16 text-white/30" aria-hidden="true" />
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <ArrowUpRight
                size={16}
                className="text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-1 shrink-0"
                aria-hidden="true"
              />
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
              {project.shortDescription}
            </p>
            <TechStack technologies={project.technologies.slice(0, 5)} />
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div {...hoverProps} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title}`}
        className="group block rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
      >
        <div
          className={cn(
            "h-32 bg-gradient-to-br flex items-center justify-center",
            project.gradient
          )}
        >
          <Icon className="w-10 h-10 text-white/30" aria-hidden="true" />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between mb-1.5">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight
              size={14}
              className="text-zinc-400 group-hover:text-blue-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-0.5 shrink-0"
              aria-hidden="true"
            />
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
            {project.shortDescription}
          </p>
          <TechStack technologies={project.technologies.slice(0, 4)} />
        </div>
      </Link>
    </motion.div>
  );
}
