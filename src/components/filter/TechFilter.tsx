"use client";

import { cn } from "@/lib/utils";
import { Technology } from "@/lib/types";

interface TechFilterProps {
  technologies: Technology[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function TechFilter({ technologies, selected, onChange }: TechFilterProps) {
  const toggle = (slug: string) => {
    if (selected.includes(slug)) {
      onChange(selected.filter((s) => s !== slug));
    } else {
      onChange([...selected, slug]);
    }
  };

  return (
    <div role="group" aria-label="Filter by technology" className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <button
          key={tech.slug}
          onClick={() => toggle(tech.slug)}
          aria-pressed={selected.includes(tech.slug)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-zinc-950",
            selected.includes(tech.slug)
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800"
              : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          )}
        >
          <span className="text-[0.7em]" aria-hidden="true">{tech.icon}</span>
          {tech.name}
          {tech.projectCount > 0 && (
            <span className="text-[10px] opacity-60">({tech.projectCount})</span>
          )}
        </button>
      ))}
    </div>
  );
}
